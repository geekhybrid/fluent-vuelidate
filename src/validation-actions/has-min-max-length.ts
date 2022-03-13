import { Extremes, FieldState, ValidationAction } from '../types';

export const useLimitedLength: ValidationAction = <TModel extends Record<string, any>, TArgument>(
    model: TModel,
    propertyName: string,
    args: TArgument,
) => {
    const property = model[propertyName];
    const { limit, type } = args as unknown as { limit: number; type: Extremes };

    return {
        rule: `${propertyName} is invalid.`,
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
