import { FieldState, ValidationAction } from '../types';

export const useFailWhenAny: ValidationAction = <TModel extends Record<string, any>, TArgument>(
    model: TModel,
    propertyName: string,
    callback: TArgument,
) => {
    const value = model[propertyName];
    if (!Array.isArray(value)) throw TypeError(`${propertyName} is not an array to be used with an array validator.`);

    const _callback = callback as unknown as (pred: object) => Boolean;

    return {
        rule: `${propertyName} is invalid.`,
        field: propertyName,
        state: value && value.some((element) => _callback(element)) ? FieldState.Invalid : FieldState.Valid,
    };
};
