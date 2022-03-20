import { FieldState, FieldValidationResult } from '../types';

export const useIsEquals = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
    comparer: number | string,
    message?: string,
): FieldValidationResult => {
    const property = model[propertyName];

    return {
        error: message ? message : `${propertyName} is invalid.`,
        field: propertyName,
        state: property && comparer === property ? FieldState.Valid : FieldState.Invalid,
    };
};
