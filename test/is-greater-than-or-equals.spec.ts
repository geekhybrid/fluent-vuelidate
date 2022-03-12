import { FieldState } from "../src/types";
import { Model, useTestModel } from "./model";
import { expect } from "chai";
import { useGreathanOrEquals } from "../src/validation-actions/is-greater-than-or-equals";

describe('is-greather-than-or-equals', function () {
    it('should compare number literals', function () {
        var model = useTestModel();

        expect(useGreathanOrEquals<Model>(model, "age", model.age - 1).state).to.equal(FieldState.Invalid);
        expect(useGreathanOrEquals<Model>(model, "age", model.age).state).to.equal(FieldState.Valid);
        expect(useGreathanOrEquals<Model>(model, "age", model.age + 1).state).to.equal(FieldState.Valid);
    });
});