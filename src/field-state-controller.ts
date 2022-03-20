import { ref } from 'vue';
import { FieldStateController, FieldStates, FieldValidity } from './types';

const setAllFieldsToUntouchedState = <TModel>(instance: TModel, fieldStates: FieldStates<TModel>) => {
    Object.keys(instance).forEach((field) => {
        fieldStates[field as unknown as keyof TModel] = {
            isUntouched: true,
            isValid: false,
            notValid: false,
        };
    });
};

const areAllFieldsValid = <TModel>(fieldStates: FieldStates<TModel>) => {
    return Object.values<FieldValidity>(fieldStates).every((field: FieldValidity) => field.isValid === true);
};

const hasUntouchedFields = <TModel>(fieldStates: FieldStates<TModel>) => {
    return Object.values<FieldValidity>(fieldStates).some((field: FieldValidity) => field.isUntouched === true);
};

const set = <TModel>(field: keyof TModel, validity: FieldValidity, fieldStates: FieldStates<TModel>) => {
    fieldStates[field] = validity;
};

export const useFieldStateController = <TModel>(
    instance: TModel,
): {
    fieldStateController: FieldStateController;
    fieldStates: FieldStates<TModel>;
} => {
    const reffieldStates = ref<FieldStates<TModel>>({} as FieldStates<TModel>);
    const fieldStates = reffieldStates.value;
    setAllFieldsToUntouchedState(instance, fieldStates);

    const controller = {} as FieldStateController;
    controller.areAllFieldsValid = () => areAllFieldsValid(fieldStates);
    controller.hasUntouchedFields = () => hasUntouchedFields(fieldStates);
    controller.set = (field: string, validity: FieldValidity) =>
        set(field as unknown as keyof TModel, validity, fieldStates);

    return {
        fieldStateController: ref<FieldStateController>(controller).value,
        fieldStates: fieldStates,
    };
};
