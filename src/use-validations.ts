import { reactive } from 'vue';
import { computed, watch } from 'vue';
import { useFieldStateController } from './field-state-controller';
import { useFieldValidationFactory } from './field-type-factory';
import { FieldValidator, ModelValidationCollection, ValidationBuilder } from './types';
import { runValidations } from './validation-runner';

/**
 * Returns an instance of the validation builder.
 * @param instance An instance of the model to be validated
 * @returns ValidationBuilder<T>
 */
export const useValidator = <TModel extends Record<string, any>>(instance: TModel): ValidationBuilder<TModel> => {
    const builder = {} as ValidationBuilder<TModel>;
    const modelValidations: ModelValidationCollection = {};
    const { fieldStateController, fieldStates } = useFieldStateController(instance);

    const isValid = computed(() => {
        const hasUntouchedFields = fieldStateController.hasUntouchedFields();
        if (hasUntouchedFields) {
            runValidations(modelValidations, fieldStateController);
        }
        return fieldStateController.areAllFieldsValid();
    });

    const fieldValidation = <TPropertyName extends keyof TModel, TPropertyType extends TModel[TPropertyName]>(
        property: TPropertyName,
    ): FieldValidator<TPropertyType, TModel> => {
        const fieldValidator = useFieldValidationFactory<TModel>(
            instance,
            property as string,
            modelValidations,
        ) as FieldValidator<TPropertyType, TModel>;

        instance = reactive<TModel>(instance);

        watch(instance, () => modelValidations[property as string].forEach((action) => action()), {
            flush: 'sync',
            immediate: true,
        });

        fieldValidator.isValid = isValid;
        fieldValidator.fields = fieldStates;
        fieldValidator.next = builder;
        fieldValidator.model = instance;
        return fieldValidator;
    };

    builder.isValid = isValid;
    builder.fields = fieldStates;
    builder.for = fieldValidation;
    builder.model = instance;
    return builder;
};
