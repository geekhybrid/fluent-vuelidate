import { FieldState, FieldValidationResult } from '../types';

export const useIsRequired = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
): FieldValidationResult => {
    return {
        rule: `${propertyName} is required`,
        field: propertyName,
        state:
            model[propertyName] && (model[propertyName] as string).length > 0 ? FieldState.Valid : FieldState.Invalid,
    };
};
