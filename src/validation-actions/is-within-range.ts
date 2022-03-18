import { FieldState, FieldValidationResult } from '../types';

export const useIsWithinRange = <TModel extends Record<string, any>, TArgument>(
    model: TModel,
    propertyName: string,
    comparer: TArgument,
): FieldValidationResult => {
    const property = model[propertyName];
    const { max, min } = comparer as unknown as { min: number; max: number };

    return {
        rule: `${propertyName} is invalid.`,
        field: propertyName,
        state: property >= min && property <= max ? FieldState.Valid : FieldState.Invalid,
    };
};
