import { createArrayValidator } from './field-types/array-field-type';
import { createNumberValidator } from './field-types/number-field-type';
import { createStringValidator } from './field-types/string-field-type';
import { ModelValidationCollection } from './types';

export const useFieldValidationFactory = <TModel extends Record<string, any>>(
    instance: TModel,
    propertyName: string,
    validations: ModelValidationCollection,
) => {
    const type = typeof instance[propertyName];
    if (type == 'string') return createStringValidator<TModel>(instance, propertyName, validations);
    if (type == 'number') return createNumberValidator<TModel>(instance, propertyName, validations);
    type T = typeof type;
    return createArrayValidator<TModel, T>(instance, propertyName, validations);
};
