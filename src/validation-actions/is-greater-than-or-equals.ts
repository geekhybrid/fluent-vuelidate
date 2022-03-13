import { FieldState, ValidationAction } from '../types';

export const useGreathanOrEquals: ValidationAction = <TModel extends Record<string, any>, TArgument>(
    model: TModel,
    propertyName: string,
    comparer: TArgument,
) => {
    const property = model[propertyName];

    return {
        rule: `${propertyName} is invalid.`,
        field: propertyName,
        state: property && property >= comparer ? FieldState.Valid : FieldState.Invalid,
    };
};
