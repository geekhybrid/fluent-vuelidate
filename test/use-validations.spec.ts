import { useValidator } from '../src/use-validations';
import { Model, useTestModel } from './model';
import assert from 'assert';

describe('#public API', () => {
    it('should initialise all fields to untouched', () => {
        const instance = useTestModel();
        const validator = useValidator<Model>(instance);

        assert.deepEqual(Object.keys(validator.fields), Object.keys(instance));
        assert.equal(
            Object.values(validator.fields).every((field) => field.isUntouched === true),
            true,
            'initialises all fields to be untouched.',
        );
    });

    it('should return validator for string, number, array types', () => {
        const instance = useTestModel();
        const validator = useValidator<Model>(instance);

        const numberValidator = validator.for('age');
        const stringValidator = validator.for('lastName');
        const arrayValidator = validator.for('wallets');

        assert.notEqual(numberValidator, undefined);
        assert.notEqual(stringValidator, undefined);
        assert.notEqual(arrayValidator, undefined);
    });

    it('builder should set builder fields', () => {
        const validator = useValidator<Model>(useTestModel());

        const numberValidator = validator.for('age');
        assert.notEqual(numberValidator.next, undefined);
        assert.notEqual(numberValidator.model, undefined);
        assert.notEqual(numberValidator.fields, undefined);

        assert.notEqual(validator.fields, undefined);
        assert.notEqual(validator.for, undefined);
        assert.notEqual(validator.model, undefined);
    });

    it('#isValid() checks for untouched fields and validates them', () => {});
});
