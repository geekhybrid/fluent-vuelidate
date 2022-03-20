# Introduction

Vuelidate is a great library! Not BUTS.

`Fluent-vuelidate` serves the same purpose by closely knitting a fluent, typescripted API around your validation flows.

**Npm Installation**
```
npm install fluent-vuelidate
```

Check this out.

What if we could do validations like this

```ts
const validator = useValidator<LoginCredentials>(credentials)
        .for('password').isRequired().next
        .for('userName').isEmail();
````
Or like this

```ts
const validator = useValidator<LoginCredentials>(credentials.value)
    .for('password')
        .isRequired('Password is required')
        .hasMinLength(5, 'Password must have length of 5 characters.').next
        .hasMaxLength(100, 'Password over 100 characters must never be used for crypto wallets.').next
    .for('userName').isEmail('Please enter a valid email.');
```

And our template could look like this...

```html
<label>Username</label>
<input v-model="credentials.userName" style="width: 500px" />
<div v-if="form.userName.notValid">
   <p class="error" v-for="error in form.userName.errors" :key="error">{{  error }}</p>
</div>
```

## Code Editor Benefits

### Auto-Complete
![image](https://user-images.githubusercontent.com/39003759/159159839-4926e428-ad1e-49e8-9bd4-ace3770e2f81.png)

### Type checking
![image](https://user-images.githubusercontent.com/39003759/159159885-2b39cc65-e545-486f-8fc5-daaf32517c35.png)
![image](https://user-images.githubusercontent.com/39003759/159159918-43c21381-dae9-4cb1-b055-48671f6d0b8a.png)


### Full Sample
```vue
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
                .hasMaxLength(100, 'Password over 100 characters must never be used for crypto wallets.').next
            .for('userName').isEmail('Please enter a valid email.');

        const submit = () => {
            if (validator.isValid.value === true) {
                //callAPI or show a fancy loader. :)
            }
        };

        return {
            form: validator.fields,
            credentials: validator.model,
            submit,
        };
    },
});

</script>
```

## Validation API

|               | string        | number          | array |
|---------------|---------------|-----------------|-------------
| isRequired    | ✔️            | ✔️             |       
| isEquals      | ✔️            | ✔️             |
| hasLength     | ✔️            |                |
| hasMinLength  | ✔️            |                 |
| hasMaxLength  | ✔️            |  ✔️            |         
| isLessThan:   |               | ✔️            |
| isLessOrEquals:  |            | ✔️            |
| isGreaterThan:   |            |  ✔️            |
| isGreaterOrEquals|            |  ✔️            |
| isWithinRange:   |            |  ✔️            |
| failWhenAny      |            |                 |✔️
```
