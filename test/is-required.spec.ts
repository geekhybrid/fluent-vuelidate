import { FieldState } from "../src/types";
import assert from "assert";
import { Model, useTestModel } from "./model";
import { useIsRequired } from "../src/validation-actions/is-required";

describe('is-required', function () {
    describe('#string-fields', () => {
        it('is valid when string is not empty', function () {
            var model = useTestModel();
    
            assert.equal(useIsRequired<Model>(model, "firstName").state, FieldState.Valid);
        });
        it('is in-valid when string is undefined', function () {
            var model = {} as Model;
    
            assert.equal(useIsRequired<Model>(model, "firstName").state, FieldState.Invalid);
        });
    });

    describe('#number-fields', () => {
        it('is valid when string is not empty', function () {
            var model = useTestModel();
    
            assert.equal(useIsRequired<Model>(model, "firstName").state, FieldState.Valid);
        });
        it('is in-valid when string is undefined', function () {
            var model = {} as Model;
    
            assert.equal(useIsRequired<Model>(model, "firstName").state, FieldState.Invalid);
        });
    });
});