/**
 * @module botframework-streaming
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export class TransportDisconnectedEvent {
    /**
     * A new and empty TransportDisconnectedEvent.
     */
    public static Empty: TransportDisconnectedEvent = new TransportDisconnectedEvent();
    
    /**
     * The reason the disconnection event fired, in plain text.
     */
    public reason: string;

    /**
     * Indicates a transport disconnected with the reason provided via the constructor.
     * This class is used for communicating disconnection events between the
     * PayloadReceiver and PayloadSender.
     * @param reason The reason the disconnection event fired, in plain text.
     */
    public constructor(reason?: string) {
        this.reason = reason;
    }
}
