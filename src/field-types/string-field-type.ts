import { Extremes, FieldValidator, ModelValidationCollection, StringValidator } from '../types';
import { useIsEmail } from '.././validation-actions/is-email';
import { useIsRequired } from '../validation-actions/is-required';
import { useIsEquals } from '../validation-actions/is-equals';
import { useHasLength } from '../validation-actions/has-length';
import { useLimitedLength } from '../validation-actions/has-min-max-length';

export const createStringValidator = <TModel extends Record<string, any>>(
    model: TModel,
    property: string,
    validations: ModelValidationCollection,
): FieldValidator<string, TModel> => {
    if (!validations[property]) {
        validations[property] = [];
    }

    const _validator = {} as StringValidator<TModel>;
    _validator.isRequired = () => {
        validations[property].push(useIsRequired);
        return _validator;
    };

    _validator.isEquals = (comparer: string) => {
        validations[property].push(() => useIsEquals(model, property, comparer));
        return _validator;
    };

    _validator.isEmail = () => {
        validations[property].push(useIsEmail);
        return _validator;
    };

    _validator.hasLength = (fixedLen: number) => {
        validations[property].push(() => useHasLength(model, property, fixedLen));
        return _validator;
    };

    _validator.hasMinLength = (minLength: number) => {
        validations[property].push(() =>
            useLimitedLength(model, property, { limit: minLength, type: Extremes.minimum }),
        );
        return _validator;
    };

    _validator.hasMaxLength = (maxLength: number) => {
        validations[property].push(() =>
            useLimitedLength(model, property, { limit: maxLength, type: Extremes.maximum }),
        );
        return _validator;
    };

    return _validator as FieldValidator<string, TModel>;
};
