import assert from 'assert';
import { ModelValidationCollection } from '../src/types';
import { FieldState } from '../src/types';
import { createNumberValidator } from '../src/field-types/number-field-type';
import { Model, useTestModel } from './model';
import { useIsEquals } from '../src/validation-actions/is-equals';
import { useIsRequired } from '../src/validation-actions/is-required';

const model = useTestModel();

describe('number validation', function () {
    describe('#isRequired()', () => {
        it('should add isRequired in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isRequired(), undefined);
            assert.equal(collection['age'].length, 1);
        });
        it('#isRequired() should return invalid when number is undefined', function () {
            const model = {} as Model;

            assert.equal(useIsRequired<Model>(model, 'age').state, FieldState.Invalid);
        });
    });

    describe('#isEquals()', () => {
        it('should add isEquals() in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isEquals(model.age), undefined);
            assert.equal(collection['age'].length, 1);
        });

        it('#isEquals() should return if numbers are the same', () => {
            assert.equal(useIsEquals(model, 'age', model.age + 1).state, FieldState.Invalid);
            assert.equal(useIsEquals(model, 'age', model.age).state, FieldState.Valid);
            const testModel = useTestModel();
            const cases: Record<string, FieldState> = {};
            cases[testModel.age] = FieldState.Valid;
            cases[34] = FieldState.Invalid;

            for (const testCase in cases) {
                const collection: ModelValidationCollection = {};
                const validation = createNumberValidator(model, 'age', collection);
                validation.isEquals(Number.parseInt(testCase));

                assert.equal(collection['age'][0]().state, cases[testCase]);
            }
        });
    });

    describe('#comparison operators', () => {
        it('should add isLessThan() in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isLessThan(5), undefined);
            assert.equal(collection['age'].length, 1);
        });
        it('should add isLessOrEquals() in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isLessOrEquals(5), undefined);
            assert.equal(collection['age'].length, 1);
        });

        it('should add isGreaterThan() in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isGreaterThan(5), undefined);
            assert.equal(collection['age'].length, 1);
        });

        it('should add isGreaterOrEquals() in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isGreaterOrEquals(5), undefined);
            assert.equal(collection['age'].length, 1);
        });

        it('should add isWithinRange() in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(model, 'age', collection);

            assert.notEqual(validation.isWithinRange(5, 10), undefined);
            assert.equal(collection['age'].length, 1);
        });

        it('#isLessThan() should be valid if number is less than comparer', () => {
            const testModel = useTestModel();

            const cases: Record<number, FieldState> = {};
            cases[testModel.age - 5] = FieldState.Valid;
            cases[testModel.age + 5] = FieldState.Invalid;

            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(testModel, 'age', collection);
            validation.isLessThan(testModel.age);

            for (const testCase in cases) {
                testModel.age = Number.parseInt(testCase);

                assert.equal(collection['age'][0]().state, cases[testCase]);
            }
        });

        it('#isLessThanOrEquals() should be valid if number is less than or equals comparer', () => {
            const testModel = useTestModel();

            const cases: Record<number, FieldState> = {};
            cases[testModel.age] = FieldState.Valid;
            cases[testModel.age - 5] = FieldState.Valid;
            cases[testModel.age + 5] = FieldState.Invalid;

            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(testModel, 'age', collection);
            validation.isLessOrEquals(testModel.age);

            for (const testCase in cases) {
                testModel.age = Number.parseInt(testCase);

                assert.equal(collection['age'][0]().state, cases[testCase]);
            }
        });

        it('#isGreaterThan() should be valid if number is greater than', () => {
            const testModel = useTestModel();

            const cases: Record<number, FieldState> = {};
            cases[testModel.age] = FieldState.Invalid;
            cases[testModel.age - 5] = FieldState.Invalid;
            cases[testModel.age + 5] = FieldState.Valid;

            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(testModel, 'age', collection);
            validation.isGreaterThan(testModel.age);

            for (const testCase in cases) {
                testModel.age = Number.parseInt(testCase);

                assert.equal(collection['age'][0]().state, cases[testCase]);
            }
        });

        it('#isGreaterOrEquals() should be valid if number is greater than or equals comparer', () => {
            const testModel = useTestModel();

            const cases: Record<number, FieldState> = {};
            cases[testModel.age] = FieldState.Valid;
            cases[testModel.age - 5] = FieldState.Invalid;
            cases[testModel.age + 5] = FieldState.Valid;

            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(testModel, 'age', collection);
            validation.isGreaterOrEquals(testModel.age);

            for (const testCase in cases) {
                testModel.age = Number.parseInt(testCase);

                assert.equal(collection['age'][0]().state, cases[testCase]);
            }
        });

        it('#isWithinRange() should be valid if within min and max inclusive', () => {
            const testModel = useTestModel();

            const cases: Record<number, FieldState> = {};
            cases[testModel.age] = FieldState.Valid;
            cases[testModel.age - 2] = FieldState.Valid;
            cases[testModel.age + 5] = FieldState.Valid;
            cases[testModel.age + 6] = FieldState.Invalid;
            cases[testModel.age - 3] = FieldState.Invalid;

            const collection: ModelValidationCollection = {};
            const validation = createNumberValidator(testModel, 'age', collection);
            validation.isWithinRange(testModel.age - 2, testModel.age + 5);

            for (const testCase in cases) {
                testModel.age = Number.parseInt(testCase);

                assert.equal(collection['age'][0]().state, cases[testCase]);
            }
        });
    });
});
