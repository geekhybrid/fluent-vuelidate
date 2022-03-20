<template>
    <label>Username</label>
    <input v-model="credentials.userName" style="width: 500px" />
    <div v-if="form.userName.notValid">
        <p class="error" v-for="error in form.userName.errors" :key="error">{{  error }}</p>
    </div>
    <br>

    <label>Password</label>
    <input v-model="credentials.password" style="width: 500px" />
    <div v-if="form.password.notValid">
        <p class="error" v-for="error in form.password.errors" :key="error">{{  error }}</p>
    </div>
    <button @click="submit">Submit</button>
</template>

<script lang="ts" src="./App.ts" />
<style scoped>
    .error {
        color: red;
    }
</style>


<script lang="ts">
import { defineComponent, ref } from 'vue';
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
                console.log('Is Valid');
            } else {
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

</script>