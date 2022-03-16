import { useFieldValidationFactory } from './field-type-factory';
import {
    FieldState,
    FieldStateCollection,
    FieldValidator,
    ModelValidationCollection,
    ValidationBuilder,
} from './types';

/**
 * Sets the field that can be used to check if a model is valid or not.
 * @param fieldValidator field validator
 * @param fieldStateCollection key-value store of all fields in the model and their current validation state
 * @param runValidationsCallback a callback to be run if some fields are untouched. Returns a boolean representing if the final state
 * of the model is valid or not.
 */
const setIsValidGetter = <TModel, TPropertyName extends keyof TModel, TPropertyType extends TModel[TPropertyName]>(
    fieldValidator: FieldValidator<TPropertyType, TModel>,
    fieldStateCollection: FieldStateCollection,
    runValidationsCallback: () => boolean,
) => {
    fieldValidator.isValid = () => {
        var hasUntouchedFields = Object.values(fieldStateCollection).some((state) => state === FieldState.Untouched);
        if (hasUntouchedFields) return runValidationsCallback();
        return Object.values(fieldStateCollection).every((state) => state === FieldState.Valid);
    };
};

/**
 * Returns an instance of the validation builder.
 * @param instance An instance of the model to be validated
 * @returns ValidationBuilder<T>
 */
export const useValidation = <TModel extends Record<string, any>>(instance: TModel): ValidationBuilder<TModel> => {
    const builder = {} as ValidationBuilder<TModel>;
    const modelValidations: ModelValidationCollection = {};
    const fieldStateCollection: FieldStateCollection = {};
    const runValidations = () => true;

    const fieldValidation = <TPropertyName extends keyof TModel, TPropertyType extends TModel[TPropertyName]>(
        property: TPropertyName,
    ): FieldValidator<TPropertyType, TModel> => {
        var fieldValidator = useFieldValidationFactory<TModel>(
            instance,
            property as string,
            modelValidations,
        ) as FieldValidator<TPropertyType, TModel>;

        setIsValidGetter(fieldValidator, fieldStateCollection, runValidations);
        fieldValidator.next = builder;
        fieldValidator.fieldsState = fieldStateCollection;
        return fieldValidator;
    };

    builder.for = fieldValidation;
    builder.model = instance;
    return builder;
};
