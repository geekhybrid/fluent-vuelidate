import { FieldState, FieldValidationResult } from '../types';

export const useHasLength = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
    fixedLength: number,
): FieldValidationResult => {
    const property = model[propertyName];

    return {
        rule: `${propertyName} is invalid.`,
        field: propertyName,
        state: property && property.length === fixedLength ? FieldState.Valid : FieldState.Invalid,
    };
};
