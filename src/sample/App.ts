import { defineComponent, ref} from 'vue';
import { useValidator } from '..';
type LoginCredentials = {
    userName: string;
    password: string;
};
export default defineComponent({
    setup() {
        const credentials = ref<LoginCredentials>({
            userName: '',
            password: '',
        });

        const validator = useValidator<LoginCredentials>(credentials.value)
            .for('password')
                .isRequired('Password is required')
                .hasMinLength(5, 'Password must have length of 5 characters.').next
            .for('userName').isEmail('Please enter a valid email.');

        const submit = () => {
            if (validator.isValid.value === true) {
                // Call API
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
