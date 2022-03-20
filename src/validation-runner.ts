import { FieldState, FieldStateController, ModelValidationCollection } from './types';

export const runValidations = (validations: ModelValidationCollection, fieldStateController: FieldStateController) => {
    Object.keys(validations).forEach((field) => {
        const validationResults = validations[field].map((action) => action());
        const isValid = validationResults.every((field) => field.state === FieldState.Valid);

        fieldStateController.set(field, {
            isValid,
            errors: validationResults
                .filter((result) => result.state === FieldState.Invalid)
                .map((state) => state.error),
            isUntouched: false,
            notValid: !isValid,
        });
    });
};
