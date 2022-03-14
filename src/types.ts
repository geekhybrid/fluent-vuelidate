import { Ref } from 'vue';

export type Validator<TModel> = {
    model: TModel;
    properties: FieldStates<TModel>;
};

export enum FieldState {
    Valid = 'Valid',
    Invalid = 'Invalid',
    Untouched = 'Untouched',
    Dirty = 'Dirty',
}

export type ArrayValidator<TModel, TElementType> = Field<TModel> & {
    model: TModel;
    failWhenAny: (predicate: (item: TElementType) => boolean) => ArrayValidator<TModel, TElementType>;
};

export type StringValidator<TModel> = Field<TModel> & {
    isRequired: () => StringValidator<TModel>;
    isEquals: (comparer: string) => StringValidator<TModel>;
    isEmail: () => StringValidator<TModel>;
    hasLength: (fixedLength: number) => StringValidator<TModel>;
    hasMinLength: (minLength: number) => StringValidator<TModel>;
    hasMaxLength: (maxLength: number) => StringValidator<TModel>;
};

export type NumberValidator<TModel> = Field<TModel> & {
    isRequired: () => NumberValidator<TModel>;
    isEquals: (comparer: number) => NumberValidator<TModel>;
    isLessThan: (comparer: number) => NumberValidator<TModel>;
    isLessOrEquals: (comparer: number) => NumberValidator<TModel>;
    isGreaterThan: (comparer: number) => NumberValidator<TModel>;
    isGreaterOrEquals: (comparer: number) => NumberValidator<TModel>;
    isWithinRange: (min: number, max: number) => NumberValidator<TModel>;
};

export type FieldValidator<TPropertyType, T> = TPropertyType extends string
    ? StringValidator<T>
    : TPropertyType extends number
    ? NumberValidator<T>
    : ArrayValidator<T, TPropertyType extends (infer ElementType)[] ? ElementType : never>;

export type FieldValidationResult = {
    field: string;
    rule: string;
    state: FieldState;
};

export enum Extremes {
    minimum = 'Minimum',
    maximum = 'Maximum',
}

export type ValidationAction = <TModel, TArgument extends any = {}>(
    model: TModel,
    propertyName: string,
    args?: TArgument,
) => FieldValidationResult;

export type FieldValidity = {
    notValid: boolean;
};

export interface ModelValidationCollection extends Record<string, ValidationAction[]> {}

export type Field<TModel> = {
    isValid: () => boolean;
    next: ValidationBuilder<TModel>;
    validator: Validator<TModel>;
};

export type ValidationBuilder<T> = {
    field: <TPropertyName extends keyof T, TPropertyType extends T[TPropertyName]>(
        property: TPropertyName,
    ) => FieldValidator<TPropertyType, T>;
    isValid: boolean;
    fieldStates: Ref<FieldStates<T>>;
    model: T;
};

export interface ModelState {
    onPropertyRuleActionCompleted(result: FieldValidationResult): void;
    isValid: Ref<boolean>;
    fieldStates: { [field: string]: FieldState };
    errorFields: { [propertyName: string]: FieldValidationResult[] };
}

export type FieldStates<TModel> = {
    [property in keyof TModel]: FieldValidity;
};
