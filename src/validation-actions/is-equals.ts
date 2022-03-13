import { FieldState, ValidationAction } from '../types';

export const useIsEquals: ValidationAction = <TModel extends Record<string, any>, TArgument>(
    model: TModel,
    propertyName: string,
    comparer: TArgument,
) => {
    const property = model[propertyName];

    return {
        rule: `${propertyName} is invalid.`,
        field: propertyName,
        state: property && comparer === property ? FieldState.Valid : FieldState.Invalid,
    };
};
