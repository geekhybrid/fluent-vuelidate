import { FieldState } from "../src/types";
import { Model, useTestModel } from "./model";
import { expect } from "chai";
import { useLessthanOrEquals } from "../src/validation-actions/is-less-than-or-equals";

describe('is-less-than-or-equals', function () {
    it('should compare number literals', function () {
        var model = useTestModel();

        expect(useLessthanOrEquals<Model>(model, "age", model.age - 1).state).to.equal(FieldState.Valid);
        expect(useLessthanOrEquals<Model>(model, "age", model.age).state).to.equal(FieldState.Valid);
        expect(useLessthanOrEquals<Model>(model, "age", model.age + 1).state).to.equal(FieldState.Invalid);
    });
});