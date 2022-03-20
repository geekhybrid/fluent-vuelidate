import { FieldState, FieldValidationResult } from '../types';

export const useGreaterthan = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
    comparer: number,
    message?: string,
): FieldValidationResult => {
    const property = model[propertyName];

    return {
        error: message ? message : `${propertyName} is invalid.`,
        field: propertyName,
        state: property && property > comparer ? FieldState.Valid : FieldState.Invalid,
    };
};
