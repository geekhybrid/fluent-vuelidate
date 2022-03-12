import { FieldState, ValidationAction } from "../types";

export const useIsEmail: ValidationAction = <TModel extends Record<string, any>>(model: TModel, propertyName: string) => {
    var emailExpression = /^[a-zA-Z0-9.!#$%&’"*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    const property = model[propertyName];
    return {
        rule: `${propertyName} is invalid.`,
        field: propertyName,
        state: property && emailExpression.test(property) ? FieldState.Valid : FieldState.Invalid
    }
}