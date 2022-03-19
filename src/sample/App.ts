import { defineComponent } from 'vue';
import { useValidator } from '..';
type LoginCredentials = {
    userName: string;
    password: string;
};
export default defineComponent({
    setup() {
        const credentials = {
            userName: 'hocahaenyi17@gmail.com',
            password: 'cheesebehinddedoor',
        };
        const validator = useValidator<LoginCredentials>(credentials)
            .for('password')
            .isRequired()
            .next.for('userName')
            .isEmail();

        const submit = () => {
            if (validator.isValid.value) {
                console.log('Is invalid');
            }
        };
        return {
            header: 'Fluent-Vuelidate Sample',
            form: validator.fields,
            canExecute: validator.isValid,
            submit,
        };
    },
});
