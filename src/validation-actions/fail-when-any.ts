import { FieldState, FieldValidationResult } from '../types';

export const useFailWhenAny = <TModel extends Record<string, any>, TElementType>(
    model: TModel,
    propertyName: string,
    callback: (item: TElementType) => boolean,
    message?: string,
): FieldValidationResult => {
    const value = model[propertyName];
    if (!Array.isArray(value)) throw TypeError(`${propertyName} is not an array to be used with an array validator.`);

    const _callback = callback as unknown as (pred: object) => boolean;

    return {
        error: message ? message : `${propertyName} is invalid.`,
        field: propertyName,
        state: value && value.some((element) => _callback(element)) ? FieldState.Invalid : FieldState.Valid,
    };
};
