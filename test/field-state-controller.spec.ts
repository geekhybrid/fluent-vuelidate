import { useFieldStateController } from '../src/field-state-controller';
import { useTestModel } from './model';
import assert from 'assert';
import { FieldValidity } from '../src/types';

describe('field-state-controller', () => {
    const testModel = useTestModel();

    it('initialises fields to untouched state', () => {
        const { fieldStateController, fieldStates } = useFieldStateController(testModel);

        assert.equal(fieldStateController.hasUntouchedFields(), true);
        assert.equal(
            Object.values<FieldValidity>(fieldStates).every((field) => field.isUntouched),
            true,
        );
    });

    it('areAllFieldsValid should return true if all fields are valid', () => {
        const { fieldStateController } = useFieldStateController(testModel);
        Object.keys(testModel).forEach((field) =>
            fieldStateController.set(field, {
                isValid: true,
                isUntouched: false,
                errors: [],
                notValid: false,
            }),
        );

        assert.equal(fieldStateController.areAllFieldsValid(), true);
    });

    it('hasUntouchedFields should return true if any fields is in untouched state', () => {
        const { fieldStateController } = useFieldStateController(testModel);
        Object.keys(testModel).forEach((field) =>
            fieldStateController.set(field, {
                isValid: false,
                isUntouched: true,
                errors: [],
                notValid: false,
            }),
        );

        assert.equal(fieldStateController.hasUntouchedFields(), true);
    });

    it('set should set field validity', () => {
        const expectedValidity = {
            isValid: false,
            isUntouched: true,
            errors: [],
            notValid: false,
        };

        const { fieldStateController, fieldStates } = useFieldStateController(testModel);
        fieldStateController.set('age', expectedValidity);

        assert.deepEqual(fieldStates.age, expectedValidity);
    });
});
