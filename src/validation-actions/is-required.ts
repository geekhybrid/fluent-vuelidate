import { FieldState, FieldValidationResult } from '../types';

export const useIsRequired = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
    message?: string,
): FieldValidationResult => {
    return {
        error: message ? message : `${propertyName} is invalid.`,
        field: propertyName,
        state:
            model[propertyName] && (model[propertyName] as string).length > 0 ? FieldState.Valid : FieldState.Invalid,
    };
};
