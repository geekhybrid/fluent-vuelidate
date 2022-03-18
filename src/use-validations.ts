import { ref } from 'vue';
import { computed, reactive, Ref, watch } from 'vue';
import { useFieldValidationFactory } from './field-type-factory';
import {
    FieldState,
    FieldStates,
    FieldValidator,
    FieldValidity,
    ModelValidationCollection,
    ValidationBuilder,
} from './types';

const runValidations = <TModel>(validations: ModelValidationCollection, fieldStates: Ref<FieldStates<TModel>>) => {
    console.log('Running validations', validations, fieldStates);
};

const initialiseFieldStates = <TModel>(model: TModel) => {
    const _initialStates: Record<string, FieldValidity> = {};

    Object.keys(model).forEach((field) => {
        _initialStates[field] = {
            isValid: false,
            notValid: true,
        };
    });

    return ref<FieldStates<TModel>>(_initialStates as FieldStates<TModel>);
};

/**
 * Returns an instance of the validation builder.
 * @param instance An instance of the model to be validated
 * @returns ValidationBuilder<T>
 */
export const useValidator = <TModel extends Record<string, any>>(instance: TModel): ValidationBuilder<TModel> => {
    const builder = {} as ValidationBuilder<TModel>;
    const modelValidations: ModelValidationCollection = {};
    const fieldStateCollection = initialiseFieldStates(instance);

    const fieldValidation = <TPropertyName extends keyof TModel, TPropertyType extends TModel[TPropertyName]>(
        property: TPropertyName,
    ): FieldValidator<TPropertyType, TModel> => {
        var fieldValidator = useFieldValidationFactory<TModel>(
            instance,
            property as string,
            modelValidations,
        ) as FieldValidator<TPropertyType, TModel>;

        watch(instance[property], () => modelValidations[property as string].forEach((action) => action()));

        fieldValidator.isValid = computed(() => {
            var hasUntouchedFields = Object.values(fieldStateCollection).some(
                (field) => field === FieldState.Untouched,
            );
            if (hasUntouchedFields) {
                runValidations(modelValidations, fieldStateCollection.value);
            }
            return Object.values(fieldStateCollection).every((field) => field === FieldState.Valid);
        });

        fieldValidator.fields = fieldStateCollection.value; //Test
        fieldValidator.next = builder; //Test
        fieldValidator.model = instance; //Test
        fieldValidator.fields = fieldStateCollection.value;
        return fieldValidator;
    };

    builder.for = fieldValidation; //Test
    builder.model = instance; //Test
    return builder; //Test
};
