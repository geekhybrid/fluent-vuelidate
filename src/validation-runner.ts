import { FieldState, FieldStateController, ModelValidationCollection } from './types';

export const runValidations = (validations: ModelValidationCollection, fieldStateController: FieldStateController) => {
    Object.keys(validations).forEach((field) => {
        const isFieldValid = validations[field].every((action) => action().state === FieldState.Valid);
        fieldStateController.set(field, {
            isValid: isFieldValid,
            isUntouched: false,
            notValid: !isFieldValid,
        });
    });
};
