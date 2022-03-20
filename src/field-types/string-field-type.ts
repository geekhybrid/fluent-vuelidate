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
    _validator.isRequired = (message?: string) => {
        validations[property].push(() => useIsRequired(model, property, message));
        return _validator;
    };

    _validator.isEquals = (comparer: string, message?: string) => {
        validations[property].push(() => useIsEquals(model, property, comparer, message));
        return _validator;
    };

    _validator.isEmail = (message?: string) => {
        validations[property].push(() => useIsEmail(model, property, message));
        return _validator;
    };

    _validator.hasLength = (fixedLen: number, message?: string) => {
        validations[property].push(() => useHasLength(model, property, fixedLen, message));
        return _validator;
    };

    _validator.hasMinLength = (minLength: number, message?: string) => {
        validations[property].push(() =>
            useLimitedLength(model, property, { limit: minLength, type: Extremes.minimum }, message),
        );
        return _validator;
    };

    _validator.hasMaxLength = (maxLength: number, message?: string) => {
        validations[property].push(() =>
            useLimitedLength(model, property, { limit: maxLength, type: Extremes.maximum }, message),
        );
        return _validator;
    };

    return _validator as FieldValidator<string, TModel>;
};
