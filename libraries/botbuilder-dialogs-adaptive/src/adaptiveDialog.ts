/**
 * @module botbuilder-planning
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import {
    TurnContext, BotTelemetryClient, NullTelemetryClient, ActivityTypes,
    RecognizerResult
} from 'botbuilder-core';
import {
    Dialog, DialogInstance, DialogReason, DialogTurnResult, DialogTurnStatus, DialogEvent,
    DialogContext, StateMap, DialogConfiguration, DialogContainer
} from 'botbuilder-dialogs';
import {
    AdaptiveEventNames, SequenceContext, ActionChangeList, ActionChangeType, AdaptiveDialogState
} from './sequenceContext';
import { Rule } from './rules';
import { Recognizer } from './recognizers';

export interface AdaptiveDialogConfiguration extends DialogConfiguration {
    /**
     * (Optional) planning rules to evaluate for each conversational turn.
     */
    rules?: Rule[];

    /**
     * (Optional) recognizer used to analyze any message utterances.
     */
    recognizer?: Recognizer;

    /**
     * (Optional) actions to initialize the dialogs plan with.
     */
    actions?: Dialog[];
}

export class AdaptiveDialog<O extends object = {}> extends DialogContainer<O> {
    private readonly changeKey = Symbol('changes');

    private installedDependencies = false;

    /**
     * Creates a new `AdaptiveDialog` instance.
     * @param dialogId (Optional) unique ID of the component within its parents dialog set.
     * @param actions (Optional) actions to initialize the dialogs plan with.
     */
    constructor(dialogId?: string, actions?: Dialog[]) {
        super(dialogId);
        if (Array.isArray(actions)) { Array.prototype.push.apply(this.actions, actions) }
    }

    /**
     * Planning rules to evaluate for each conversational turn.
     */
    public readonly rules: Rule[] = [];

    /**
     * Actions to initialize the dialogs plan with.
     */
    public readonly actions: Dialog[] = [];

    /**
     * (Optional) recognizer used to analyze any message utterances.
     */
    public recognizer?: Recognizer;

    /**
     * (Optional) flag that determines whether the dialog automatically ends when the plan is out
     * of actions. Defaults to `false` for the root dialog and `true` for child dialogs.
     */
    public autoEndDialog?: boolean;

    public set telemetryClient(client: BotTelemetryClient) {
        super.telemetryClient = client ? client : new NullTelemetryClient();
        this.dialogs.telemetryClient = client;
    }

    public addRule(rule: Rule): this {
        this.rules.push(rule);
        return this;
    }

    protected onInstallDependencies(): void {
        // Install any actions
        this.actions.forEach((action) => this.dialogs.add(action));

        // Install each rules actions
        this.rules.forEach((rule) => {
            rule.actions.forEach((action) => this.dialogs.add(action));
        });
    }

    //---------------------------------------------------------------------------------------------
    // Base Dialog Overrides
    //---------------------------------------------------------------------------------------------

    protected onComputeID(): string {
        return `adaptive[${this.bindingPath()}]`;
    }

    public async beginDialog(dc: DialogContext, options?: O): Promise<DialogTurnResult> {
        // Install dependencies on first access
        if (!this.installedDependencies) {
            this.installedDependencies = true;
            this.onInstallDependencies();
        }

        // Persist options to dialog state
        const state: AdaptiveDialogState<O> = dc.activeDialog.state;
        state.options = options || {} as O;

        // Initialize 'result' with any initial value
        if (state.options.hasOwnProperty('value')) {
            const value = options['value'];
            const clone = Array.isArray(value) || typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value;
            state.result = clone;
        }

        // Evaluate rules and queue up action changes
        const event: DialogEvent = { name: AdaptiveEventNames.beginDialog, value: options, bubble: false };
        await this.onDialogEvent(dc, event);

        // Continue action execution
        return await this.continueActions(dc);
    }

    public async continueDialog(dc: DialogContext): Promise<DialogTurnResult> {
        // Continue action execution
        return await this.continueActions(dc);
    }

    protected async onPreBubbleEvent(dc: DialogContext, event: DialogEvent): Promise<boolean> {
        const sequence = this.toSequenceContext(dc);

        // Process event and queue up any potential interruptions
        return await this.processEvent(sequence, event, true);
    }

    protected async onPostBubbleEvent(dc: DialogContext, event: DialogEvent): Promise<boolean> {
        const sequence = this.toSequenceContext(dc);

        // Process event and queue up any potential interruptions
        return await this.processEvent(sequence, event, false);
    }

    public async resumeDialog(dc: DialogContext, reason: DialogReason, result?: any): Promise<DialogTurnResult> {
        // Containers are typically leaf nodes on the stack but the dev is free to push other dialogs
        // on top of the stack which will result in the container receiving an unexpected call to
        // resumeDialog() when the pushed on dialog ends.
        // To avoid the container prematurely ending we need to implement this method and simply
        // ask our inner dialog stack to re-prompt.
        await this.repromptDialog(dc.context, dc.activeDialog);

        return Dialog.EndOfTurn;
    }

    public async repromptDialog(context: TurnContext, instance: DialogInstance): Promise<void> {
        // Forward to current sequence action
        const state = instance.state as AdaptiveDialogState<O>;
        if (state.actions && state.actions.length > 0) {
            // We need to mockup a DialogContext so that we can call repromptDialog() for the active action
            const actionDC: DialogContext = new DialogContext(this.dialogs, context, state.actions[0], new StateMap({}), new StateMap({}));
            await actionDC.repromptDialog();
        }
    }

    public createChildContext(dc: DialogContext): DialogContext | undefined {
        const state: AdaptiveDialogState<O> = dc.activeDialog.state;
        if (Array.isArray(state.actions) && state.actions.length > 0) {
            const action = new SequenceContext(this.dialogs, dc, state.actions[0], state.actions, this.changeKey);
            action.parent = dc;
            return action;
        } else {
            return undefined;
        }
    }

    public configure(config: AdaptiveDialogConfiguration): this {
        return super.configure(this);
    }

    //---------------------------------------------------------------------------------------------
    // Event Processing
    //---------------------------------------------------------------------------------------------

    protected async processEvent(sequence: SequenceContext, event: DialogEvent, preBubble: boolean): Promise<boolean> {
        // Look for triggered rule
        let handled = await this.queueFirstMatch(sequence, event, preBubble);
        if (handled) {
            return true;
        }

        // Perform default processing
        if (preBubble) {
            switch (event.name) {
            case AdaptiveEventNames.beginDialog:
                if (this.actions.length > 0) {
                    // Initialize plan with actions
                    const changes: ActionChangeList = {
                        changeType: ActionChangeType.insertActions,
                        actions: []
                    };
                    this.actions.forEach((action) => {
                        changes.actions.push({
                            dialogId: action.id,
                            dialogStack: []
                        });
                    });
                    sequence.queueChanges(changes);
                    handled = true;
                } else {
                    // Emit leading ActivityReceived event
                    handled = await this.processEvent(sequence, { name: AdaptiveEventNames.activityReceived, bubble: false }, true);
                }
                break;
            case AdaptiveEventNames.activityReceived:
                const activity = sequence.context.activity;
                if (activity.type === ActivityTypes.Message) {
                    // Recognize utterance
                    const recognized = await this.onRecognize(sequence.context);
                    sequence.state.setValue('turn.recognized', recognized);

                    // Emit leading RecognizedIntent event
                    handled = await this.processEvent(sequence, { name: AdaptiveEventNames.recognizedIntent, value: recognized, bubble: false }, true);
                } else if (activity.type === ActivityTypes.Event) {
                    // Emit leading edge named event that was received
                    handled = await this.processEvent(sequence, { name: activity.name, value: activity.value, bubble: false }, true);
                } else if (activity.type === ActivityTypes.ConversationUpdate && Array.isArray(activity.membersAdded)) {
                    // Filter members added
                    const membersAdded = activity.membersAdded.filter((value) => value.id !== activity.recipient.id);
                    if (membersAdded.length > 0) {
                        // Emit leading ConversationMembersAdded event
                        sequence.state.setValue('turn.membersAdded', membersAdded);
                        handled = await this.processEvent(sequence, { name: AdaptiveEventNames.conversationMembersAdded, value: membersAdded, bubble: false}, true);
                    }
                }
                break;
            }
        } else {
            switch (event.name) {
            case AdaptiveEventNames.beginDialog:
                // Emit trailing ActivityReceived event
                handled = await this.processEvent(sequence, { name: AdaptiveEventNames.activityReceived, bubble: false }, false);
                break;
            case AdaptiveEventNames.activityReceived:
                const activity = sequence.context.activity;
                const membersAdded = sequence.state.getValue('turn.membersAdded');
                if (activity.type === ActivityTypes.Message) {
                    // Clear any recognizer results
                    sequence.state.setValue('turn.recognized', undefined);

                    // Do we have an empty sequence?
                    if (sequence.actions.length == 0) {
                        // Emit trailing UnknownIntent event
                        handled = await this.processEvent(sequence, { name: AdaptiveEventNames.unknownIntent, bubble: false }, false);
                    } else {
                        handled = false;
                    }
                } else if (activity.type === ActivityTypes.Event) {
                    // Emit trailing edge of named event that was received
                    handled = await this.processEvent(sequence, { name: activity.name, value: activity.value, bubble: false }, false);
                } else if (activity.type === ActivityTypes.ConversationUpdate && Array.isArray(membersAdded)) {
                    // Emit trailing ConversationMembersAdded event
                    handled = await this.processEvent(sequence, { name: AdaptiveEventNames.conversationMembersAdded, value: membersAdded, bubble: false}, false);
                }
                break;
            }
        }

        return handled;
    }

    protected async onRecognize(context: TurnContext): Promise<RecognizerResult> {
        const { text, value } = context.activity;
        const noneIntent: RecognizerResult = {
            text: text || '',
            intents: { 'None': { score: 0.0 } },
            entities: {}
        };

        // Check for submission of an adaptive card
        if (!text && typeof value == 'object' && typeof value['intent'] == 'string') {
            // Map submitted values to a recognizer result
            const recognized: RecognizerResult = {
                text: '',
                intents: {},
                entities: {}
            };
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    if (key == 'intent') {
                        recognized.intents[value[key]] = { score: 1.0 };
                    } else {
                        recognized.entities[key] = [value[key]];
                    }
                }
            }

            return recognized;
        } else if (this.recognizer) {
            // Call recognizer as normal and filter to top intent
            let topIntent: string;
            let topScore = -1;
            const recognized = await this.recognizer.recognize(context);
            for (const key in recognized.intents) {
                if (recognized.intents.hasOwnProperty(key)) {
                    if (topIntent == undefined) {
                        topIntent = key;
                        topScore = recognized.intents[key].score;
                    } else if (recognized.intents[key].score > topScore) {
                        delete recognized.intents[topIntent];
                        topIntent = key;
                        topScore = recognized.intents[key].score;
                    } else {
                        delete recognized.intents[key];
                    }
                }
            }

            return recognized;
        } else {
            return noneIntent;
        }
    }

    private async queueFirstMatch(sequence: SequenceContext, event: DialogEvent, preBubble: boolean): Promise<boolean> {
        for (let i = 0; i < this.rules.length; i++) {
            const changes = await this.rules[i].evaluate(sequence, event, preBubble);
            if (changes && changes.length > 0) {
                sequence.queueChanges(changes[0]);
                return true;
            }
        }

        return false;
    }

    //---------------------------------------------------------------------------------------------
    // Action Execution
    //---------------------------------------------------------------------------------------------

    protected async continueActions(dc: DialogContext): Promise<DialogTurnResult> {
        // Apply any queued up changes
        const sequence = this.toSequenceContext(dc);
        await sequence.applyChanges();

        // Get a unique instance ID for the current stack entry.
        // - We need to do this because things like cancellation can cause us to be removed
        //   from the stack and we want to detect this so we can stop processing actions.
        const instanceId = this.getUniqueInstanceId(sequence);

        // Create context for active action
        const action = this.createChildContext(sequence) as SequenceContext;
        if (action) {
            // Continue current action
            console.log(`running action: ${action.actions[0].dialogId}`);
            let result = await action.continueDialog();

            // Start action if not continued
            if (result.status == DialogTurnStatus.empty && this.getUniqueInstanceId(sequence) == instanceId) {
                const nextAction = action.actions[0];
                result = await action.beginDialog(nextAction.dialogId, nextAction.options);
            }

            // Increment turns action count
            // - This helps dialogs being resumed from an interruption to determine if they
            //   should re-prompt or not.
            const actionCount = sequence.state.getValue('turn.actionCount');
            sequence.state.setValue('turn.actionCount', typeof actionCount == 'number' ? actionCount + 1 : 1);

            // Is the action waiting for input or were we cancelled?
            if (result.status == DialogTurnStatus.waiting || this.getUniqueInstanceId(sequence) != instanceId) {
                return result;
            }

            // End current action
            await this.endCurrentAction(sequence);

            // Execute next action
            // - We call continueDialog() on the root dialog to ensure any changes queued up
            //   by the previous actions are applied.
            let root: DialogContext = sequence;
            while (root.parent) {
                root = root.parent;
            }
            return await root.continueDialog();
        } else {
            return await this.onEndOfActions(sequence);
        }
    }

    protected async endCurrentAction(sequence: SequenceContext): Promise<boolean> {
        if (sequence.actions.length > 0) {
            sequence.actions.shift();
            if (sequence.actions.length == 0) {
                return await sequence.emitEvent(AdaptiveEventNames.sequenceEnded, undefined, false);
            }
        }

        return false;
    }

    protected async onEndOfActions(sequence: SequenceContext): Promise<DialogTurnResult> {
        // End dialog and return result
        if (sequence.activeDialog) {
            if (this.shouldEnd(sequence)) {
                const state: AdaptiveDialogState<O> = sequence.activeDialog.state;
                return await sequence.endDialog(state.result);
            } else {
                return Dialog.EndOfTurn;
            }
        } else {
            return { status: DialogTurnStatus.cancelled };
        }
    }

    private getUniqueInstanceId(dc: DialogContext): string {
        return dc.stack.length > 0 ? `${dc.stack.length}:${dc.activeDialog.id}` : '';
    }

    private shouldEnd(dc: DialogContext): boolean {
        if (this.autoEndDialog == undefined) {
            return (dc.parent != null);
        } else {
            return this.autoEndDialog;
        }
    }

    private toSequenceContext(dc: DialogContext): SequenceContext<O> {
        const state: AdaptiveDialogState<O> = dc.activeDialog.state;
        if (!Array.isArray(state.actions)) { state.actions = [] }
        const sequence = new SequenceContext(dc.dialogs, dc, { dialogStack: dc.stack }, state.actions, this.changeKey);
        sequence.parent = dc.parent;
        return sequence;
    }
}
