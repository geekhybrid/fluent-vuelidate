import { Field, FieldValidator, ModelValidationCollection } from '../types';
import { useIsRequired } from '../validation-actions/is-required';
import { useIsEquals } from '../validation-actions/is-equals';
import { useLessThan } from '../validation-actions/is-less-than';
import { useLessthanOrEquals } from '../validation-actions/is-less-than-or-equals';
import { useGreaterthan } from '../validation-actions/is-greater-than';
import { useGreathanOrEquals } from '../validation-actions/is-greater-than-or-equals';
import { useIsWithinRange } from '../validation-actions/is-within-range';

export type NumberValidator<TModel> = Field<TModel> & {
    isRequired: () => NumberValidator<TModel>;
    isEquals: (comparer: number) => NumberValidator<TModel>;
    isLessThan: (comparer: number) => NumberValidator<TModel>;
    isLessOrEquals: (comparer: number) => NumberValidator<TModel>;
    isGreaterThan: (comparer: number) => NumberValidator<TModel>;
    isGreaterOrEquals: (comparer: number) => NumberValidator<TModel>;
    isWithinRange: (min: number, max: number) => NumberValidator<TModel>;
};

export const createNumberValidator = <TModel extends { [property: string]: any }>(
    model: TModel,
    property: string,
    validations: ModelValidationCollection,
): FieldValidator<number, TModel> => {
    if (!validations[property]) {
        validations[property] = [];
    }

    const _validator = {} as NumberValidator<TModel>;
    _validator.isRequired = () => {
        validations[property].push(useIsRequired);
        return _validator;
    };

    _validator.isEquals = (comparer: number) => {
        validations[property].push(() => useIsEquals(model, property, comparer));
        return _validator;
    };

    _validator.isLessThan = (comparer: number) => {
        validations[property].push(() => useLessThan(model, property, comparer));
        return _validator;
    };

    _validator.isLessOrEquals = (comparer: number) => {
        validations[property].push(() => useLessthanOrEquals(model, property, comparer));
        return _validator;
    };

    _validator.isGreaterThan = (comparer: number) => {
        validations[property].push(() => useGreaterthan(model, property, comparer));
        return _validator;
    };

    _validator.isGreaterOrEquals = (comparer: number) => {
        validations[property].push(() => useGreathanOrEquals(model, property, comparer));
        return _validator;
    };

    _validator.isWithinRange = (min: number, max: number) => {
        validations[property].push(() => useIsWithinRange(model, property, { min, max }));
        return _validator;
    };

    return _validator as FieldValidator<number, TModel>;
};
