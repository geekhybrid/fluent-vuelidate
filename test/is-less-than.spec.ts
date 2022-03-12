import { FieldState } from "../src/types";
import { Model, useTestModel } from "./model";
import { expect } from "chai";
import { useLessThan } from "../src/validation-actions/is-less-than";

describe('is-less-than', function () {
    it('should compare number literals', function () {
        var model = useTestModel();

        expect(useLessThan<Model>(model, "age", model.age - 1).state).to.equal(FieldState.Valid);
        expect(useLessThan<Model>(model, "age", model.age).state).to.equal(FieldState.Invalid);
        expect(useLessThan<Model>(model, "age", model.age + 1).state).to.equal(FieldState.Invalid);
    });
});