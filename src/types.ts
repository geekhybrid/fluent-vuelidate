import { ComputedRef, Ref } from 'vue';

export enum FieldState {
    Valid = 'Valid',
    Invalid = 'Invalid',
    Untouched = 'Untouched',
    Dirty = 'Dirty',
}

export type ArrayValidator<TModel, TElementType> = Field<TModel> & {
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

export type RunValidationCallback = () => FieldValidationResult;

export type FieldValidity = {
    notValid: boolean;
    isValid: boolean;
    isUntouched: boolean;
};

export interface ModelValidationCollection extends Record<string, RunValidationCallback[]> {}

export type Field<TModel> = {
    isValid: ComputedRef<boolean>;
    model: TModel;
    next: ValidationBuilder<TModel>;
    fields: FieldStates<TModel>;
};

export type ValidationBuilder<T> = {
    for: <TPropertyName extends keyof T, TPropertyType extends T[TPropertyName]>(
        property: TPropertyName,
    ) => FieldValidator<TPropertyType, T>;
    isValid: ComputedRef<boolean>;
    model: T;
    fields: FieldStates<T>;
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

export type FieldStateController = {
    set: (field: string, validity: FieldValidity) => void;
    hasUntouchedFields: () => boolean;
    areAllFieldsValid: () => boolean;
};
