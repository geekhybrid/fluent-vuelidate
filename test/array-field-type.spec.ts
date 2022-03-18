import assert from 'assert';
import { FieldState } from '../dist/types';
import { createArrayValidator } from '../src/field-types/array-field-type';
import { ModelValidationCollection } from '../src/types';
import { Model, useTestModel } from './model';

const model = useTestModel();

describe('array validation', function () {
    describe('#failWhenAny()', () => {
        it('should add failWhenAny in builder', function () {
            const collection: ModelValidationCollection = {};
            const validation = createArrayValidator<Model, string>(model, 'wallets', collection);

            assert.notEqual(
                validation.failWhenAny((_) => true),
                undefined,
            );
            assert.equal(collection['wallets'].length, 1);
        });

        it('failWhenAny should be invalid if any elements returns true for the predicate', function () {
            const collection: ModelValidationCollection = {};
            const testModel = useTestModel();
            testModel.wallets = ['USD', 'BTC', 'ETH'];

            var validator = createArrayValidator<Model, string>(testModel, 'wallets', collection);
            validator.failWhenAny((item) => item === 'ETH');

            assert.equal(collection['wallets'][0]().state, FieldState.Invalid);
        });
        it('failWhenAny should be valid if no elements returns true for the predicate', function () {
            const collection: ModelValidationCollection = {};
            const testModel = useTestModel();
            testModel.wallets = ['USD', 'BTC'];

            var validator = createArrayValidator<Model, string>(testModel, 'wallets', collection);
            validator.failWhenAny((item) => item === 'ETH');

            assert.equal(collection['wallets'][0]().state, FieldState.Valid);
        });
    });
});
