/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Converter } from 'botbuilder-dialogs-declarative';
import { EnumExpression } from '../expressionProperties';

export class EnumExpressionConverter implements Converter {
    private _enumValue: object;

    public constructor(enumValue: object) {
        this._enumValue = enumValue;
    }

    public convert(value: string): EnumExpression {
        if (typeof value == 'string') {
            if (this._enumValue.hasOwnProperty(value)) {
                return new EnumExpression(this._enumValue[value as string]);
            }
            return new EnumExpression(`=${ value }`)
        }
        return new EnumExpression(value);
    }
}