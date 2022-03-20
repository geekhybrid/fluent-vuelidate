import { defineComponent } from 'vue';
import { useValidator } from '..';
type LoginCredentials = {
    userName: string;
    password: string;
};
export default defineComponent({
    setup() {
        const credentials = {
            userName: '',
            password: '',
        };
        const validator = useValidator<LoginCredentials>(credentials)
            .for('password').isRequired().next
            .for('userName').isEmail();

        const submit = () => {
            if (validator.isValid.value) {
                console.log('Is Valid');
            }else {
                console.log('is invalid');
            }
        };
        return {
            header: 'Fluent-Vuelidate Sample',
            form: validator.fields,
            credentials: validator.model,
            canExecute: validator.isValid,
            submit,
        };
    },
});
