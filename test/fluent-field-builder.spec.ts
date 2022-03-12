import { createStringValidator } from "../src/field-types/string-field-type";
import { ModelValidationCollection } from "../src/types";
import assert from "assert";
import { FieldState } from "../src/types";
import { Model, useTestModel } from "./model";
import { expect } from "chai";
import { useIsEquals } from "../src/validation-actions/is-equals";
import { useIsRequired } from "../src/validation-actions/is-required";

const model = useTestModel();

describe('string fields validation', function () {
  describe("#isRequired()", () => {
    it('should add isRequired in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "firstName", collection);

      assert.notEqual(validation.isRequired(), undefined);
      assert.equal(collection["firstName"].length, 1);
    });
    it('#isRequired() should return valid when string is not empty', function () {
      var model = useTestModel();
      
      expect(useIsRequired<Model>(model, "firstName").state).to.equal(FieldState.Valid);
    });
    it('#isRequired() should return invalid when string is undefined', function () {
        var model = {} as Model;

        expect(useIsRequired<Model>(model, "firstName").state).to.equal(FieldState.Invalid);
    });
  })

  describe("#isEquals()", () => {
    it('should add isEquals() in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "firstName", collection);

      assert.notEqual(validation.isEquals("TEST"), undefined);
      assert.equal(collection["firstName"].length, 1);
    });

    it('#isEquals() should return invalid if string does not exactly match field', () => {
      expect(useIsEquals<Model>(model, "firstName", "NOT_VALID").state).to.equal(FieldState.Invalid);
      expect(useIsEquals<Model>(model, "firstName", model.firstName).state).to.equal(FieldState.Valid);
      var testModel = useTestModel();
      const cases: Record<string, FieldState> = {};
      cases[testModel.firstName] = FieldState.Valid;
      cases["not-valid-firstname"] = FieldState.Invalid;


      for (const testCase in cases) {
        const collection: ModelValidationCollection = {};
        var validation = createStringValidator(model, "firstName", collection);
        validation.isEquals(testCase);
        
        assert.equal(collection["firstName"][0](testModel, "firstName", testCase).state, cases[testCase]);
      }})
  })

  describe("#isEmail()", () => {
    it('should add isEmail() in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "email", collection);

      assert.notEqual(validation.isEmail(), undefined);
      assert.equal(collection["email"].length, 1);
    });

    it('#isEmail() should match complete email', () => {
      var testModel = useTestModel();
      const cases: Record<string, FieldState> = {};
      cases["hocahaenyi17@gmail.com"] = FieldState.Valid;
      cases["hocahaenyi17"] = FieldState.Invalid;
      cases["hocahaenyi17@"] = FieldState.Invalid;
      cases["hocahaenyi17@gmail"] = FieldState.Invalid;

      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "email", collection);
      validation.isEmail();

      for (const testCase in cases) {
        testModel.email = testCase;
        assert.equal(collection["email"][0](testModel, "email").state, cases[testCase]);
      }
    });
  });

  describe("#hasLength()", () => {
    it('should add hasLength() in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "firstName", collection);

      assert.notEqual(validation.hasLength(5), undefined);
      assert.equal(collection["firstName"].length, 1);
    });

    it('#hasLength() should be valid if string.length is equals passed length', () => {
      var testModel = useTestModel();
      const cases: Record<string, FieldState> = {};
      cases["USD"] = FieldState.Valid;
      cases["GBPZ"] = FieldState.Invalid;

      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(testModel, "currencyCode", collection);
      validation.hasLength(3);

      for (const testCase in cases) {
        testModel.currencyCode = testCase;
        testModel.firstName = "Renaming";
                    
        assert.equal(collection["currencyCode"][0](testModel, "currencyCode").state, cases[testCase]);
      }
    });
  })
  describe("#isEmail()", () => {
    it('should add isEmail() in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "email", collection);

      assert.notEqual(validation.isEmail(), undefined);
      assert.equal(collection["email"].length, 1);
    });

    it('#isEmail() should match complete email', () => {
      var testModel = useTestModel();
      const cases: Record<string, FieldState> = {};
      cases["hocahaenyi17@gmail.com"] = FieldState.Valid;
      cases["hocahaenyi17"] = FieldState.Invalid;
      cases["hocahaenyi17@"] = FieldState.Invalid;
      cases["hocahaenyi17@gmail"] = FieldState.Invalid;

      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "email", collection);
      validation.isEmail();

      for (const testCase in cases) {
        testModel.email = testCase;
        assert.equal(collection["email"][0](testModel, "email").state, cases[testCase]);
      }
    });
  });

  describe("#hasMinLength()", () => {
    it('should add hasMinLength() in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "firstName", collection);

      assert.notEqual(validation.hasMinLength(5), undefined);
      assert.equal(collection["firstName"].length, 1);
    });

    it('#hasMinLength() should be valid if length is at least the minimum value', () => {
      var testModel = useTestModel();
      const cases: Record<string, FieldState> = {};
      cases["pass"] = FieldState.Invalid;
      cases["passwords"] = FieldState.Valid;

      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(testModel, "password", collection);
      validation.hasMinLength(6);

      for (const testCase in cases) {
        testModel.password = testCase;
                    
        assert.equal(collection["password"][0](testModel, "password").state, cases[testCase]);
      }
    });
  })

  describe("#hasMaxLength()", () => {
    it('should add hasMaxLength() in builder', function () {
      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(model, "firstName", collection);

      assert.notEqual(validation.hasMaxLength(5), undefined);
      assert.equal(collection["firstName"].length, 1);
    });

    it('#hasMinLength() should be valid if length is at least the minimum value', () => {
      var testModel = useTestModel();
      const cases: Record<string, FieldState> = {};
      cases["pass"] = FieldState.Valid;
      cases["passwords"] = FieldState.Invalid;

      const collection: ModelValidationCollection = {};
      var validation = createStringValidator(testModel, "password", collection);
      validation.hasMaxLength(6);

      for (const testCase in cases) {
        testModel.password = testCase;
                    
        assert.equal(collection["password"][0](testModel, "password").state, cases[testCase]);
      }
    });
  })
});