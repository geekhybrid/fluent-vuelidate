export interface Model {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    currencyCode: string;
    wallets: string[];
}

export const useTestModel = (): Model => {
    return {
        firstName: 'fluent',
        lastName: 'vuelidate',
        age: 29,
        currencyCode: 'GBP',
        wallets: ['BTC', 'Algo'],
    } as Model;
};
