import { ArrayValidator, FieldValidator, ModelValidationCollection } from '../types';
import { useFailWhenAny } from '../validation-actions/fail-when-any';

export const createArrayValidator = <TModel extends Record<string, any>, TElementType>(
    model: TModel,
    property: string,
    validations: ModelValidationCollection,
): FieldValidator<TElementType[], TModel> => {
    if (!validations[property]) {
        validations[property] = [];
    }

    const _validator = {} as ArrayValidator<TModel, TElementType>;

    _validator.failWhenAny = (predicate: (item: TElementType) => boolean) => {
        validations[property].push(() => useFailWhenAny<TModel, TElementType>(model, property, predicate));
        return _validator;
    };

    return _validator;
};
