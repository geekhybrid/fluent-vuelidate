export interface Model {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    currencyCode: string;
}

export const useTestModel = (): Model => {
    return {
        firstName: "fluent",
        lastName: "vuelidate",
        age: 29,
        currencyCode: 'GBP'
    } as Model;
}