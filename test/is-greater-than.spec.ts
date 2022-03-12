import { FieldState } from "../src/types";
import { Model, useTestModel } from "./model";
import { expect } from "chai";
import { useGreaterthan } from "../src/validation-actions/is-greater-than";

describe('is-greater-than', function () {
    it('should compare number literals', function () {
        var model = useTestModel();

        expect(useGreaterthan<Model>(model, "age", model.age - 1).state).to.equal(FieldState.Invalid);
        expect(useGreaterthan<Model>(model, "age", model.age).state).to.equal(FieldState.Invalid);
        expect(useGreaterthan<Model>(model, "age", model.age + 1).state).to.equal(FieldState.Valid);
    });
});