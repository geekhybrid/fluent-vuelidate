import { Extremes, FieldState, FieldValidationResult } from '../types';

export const useLimitedLength = <TModel extends Record<string, any>>(
    model: TModel,
    propertyName: string,
    limits: { limit: number; type: Extremes },
    message?: string,
): FieldValidationResult => {
    const property = model[propertyName];
    const { limit, type } = limits;

    return {
        error: message ? message : `${propertyName} is invalid.`,
        field: propertyName,
        state:
            type === Extremes.minimum
                ? property.length >= limit
                    ? FieldState.Valid
                    : FieldState.Invalid
                : property.length <= limit
                ? FieldState.Valid
                : FieldState.Invalid,
    };
};
