import { FieldState, ValidationAction } from '../types';

export const useHasLength: ValidationAction = <TModel extends Record<string, any>, TArgument>(
  model: TModel,
  propertyName: string,
  fixedLength: TArgument,
) => {
  const property = model[propertyName];

  return {
    rule: `${propertyName} is invalid.`,
    field: propertyName,
    state: property && property.length === fixedLength ? FieldState.Valid : FieldState.Invalid,
  };
};
