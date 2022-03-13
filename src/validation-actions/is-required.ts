import { FieldState, ValidationAction } from '../types';

export const useIsRequired: ValidationAction = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
) => {
    return {
        rule: `${propertyName} is required`,
        field: propertyName,
        state:
            model[propertyName] && (model[propertyName] as string).length > 0 ? FieldState.Valid : FieldState.Invalid,
    };
};
