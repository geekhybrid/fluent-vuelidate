import { FieldState, FieldValidationResult } from '../types';

export const useIsWithinRange = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
    comparer: { min: number; max: number },
    message?: string,
): FieldValidationResult => {
    const property = model[propertyName];
    const { max, min } = comparer;

    return {
        error: message ? message : `${propertyName} is invalid.`,
        field: propertyName,
        state: property >= min && property <= max ? FieldState.Valid : FieldState.Invalid,
    };
};
