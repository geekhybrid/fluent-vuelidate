import { FieldValidator, ModelValidationCollection, NumberValidator } from '../types';
import { useIsRequired } from '../validation-actions/is-required';
import { useIsEquals } from '../validation-actions/is-equals';
import { useLessThan } from '../validation-actions/is-less-than';
import { useLessthanOrEquals } from '../validation-actions/is-less-than-or-equals';
import { useGreaterthan } from '../validation-actions/is-greater-than';
import { useGreathanOrEquals } from '../validation-actions/is-greater-than-or-equals';
import { useIsWithinRange } from '../validation-actions/is-within-range';

export const createNumberValidator = <TModel extends Record<string, any>>(
    model: TModel,
    property: string,
    validations: ModelValidationCollection,
): FieldValidator<number, TModel> => {
    if (!validations[property]) {
        validations[property] = [];
    }

    const _validator = {} as NumberValidator<TModel>;
    _validator.isRequired = (message?: string) => {
        validations[property].push(() => useIsRequired(model, property, message));
        return _validator;
    };

    _validator.isEquals = (comparer: number, message?: string) => {
        validations[property].push(() => useIsEquals(model, property, comparer, message));
        return _validator;
    };

    _validator.isLessThan = (comparer: number, message?: string) => {
        validations[property].push(() => useLessThan(model, property, comparer, message));
        return _validator;
    };

    _validator.isLessOrEquals = (comparer: number, message?: string) => {
        validations[property].push(() => useLessthanOrEquals(model, property, comparer, message));
        return _validator;
    };

    _validator.isGreaterThan = (comparer: number, message?: string) => {
        validations[property].push(() => useGreaterthan(model, property, comparer, message));
        return _validator;
    };

    _validator.isGreaterOrEquals = (comparer: number, message?: string) => {
        validations[property].push(() => useGreathanOrEquals(model, property, comparer, message));
        return _validator;
    };

    _validator.isWithinRange = (min: number, max: number, message?: string) => {
        validations[property].push(() => useIsWithinRange(model, property, { min, max }, message));
        return _validator;
    };

    return _validator as FieldValidator<number, TModel>;
};
