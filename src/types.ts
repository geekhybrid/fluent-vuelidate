import { ComputedRef, Ref } from 'vue';

export enum FieldState {
    Valid = 'Valid',
    Invalid = 'Invalid',
    Untouched = 'Untouched',
    Dirty = 'Dirty',
}

export type ArrayValidator<TModel, TElementType> = Field<TModel> & {
    failWhenAny: (predicate: (item: TElementType) => boolean, message?: string) => ArrayValidator<TModel, TElementType>;
};

export type StringValidator<TModel> = Field<TModel> & {
    isRequired: (error?: string) => StringValidator<TModel>;
    isEquals: (comparer: string, error?: string) => StringValidator<TModel>;
    isEmail: (error?: string) => StringValidator<TModel>;
    hasLength: (fixedLength: number, error?: string) => StringValidator<TModel>;
    hasMinLength: (minLength: number, error?: string) => StringValidator<TModel>;
    hasMaxLength: (maxLength: number, error?: string) => StringValidator<TModel>;
};

export type NumberValidator<TModel> = Field<TModel> & {
    isRequired: (error?: string) => NumberValidator<TModel>;
    isEquals: (comparer: number, error?: string) => NumberValidator<TModel>;
    isLessThan: (comparer: number, error?: string) => NumberValidator<TModel>;
    isLessOrEquals: (comparer: number, error?: string) => NumberValidator<TModel>;
    isGreaterThan: (comparer: number, error?: string) => NumberValidator<TModel>;
    isGreaterOrEquals: (comparer: number, error?: string) => NumberValidator<TModel>;
    isWithinRange: (min: number, max: number, error?: string) => NumberValidator<TModel>;
};

export type FieldValidator<TPropertyType, T> = TPropertyType extends string
    ? StringValidator<T>
    : TPropertyType extends number
    ? NumberValidator<T>
    : ArrayValidator<T, TPropertyType extends (infer ElementType)[] ? ElementType : never>;

export type FieldValidationResult = {
    field: string;
    error: string;
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
    errors: string[];
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
