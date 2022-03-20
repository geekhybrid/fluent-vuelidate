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

`password` and `username` are typesafe arguments and not mere string literals.

And our template could look like this...

```html
<label>Username</label>
<input v-model="credentials.userName" style="width: 500px" />
<div v-if="form.userName.notValid">
   <p class="error" v-for="error in form.userName.errors" :key="error">{{  error }}</p>
</div>
```

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


```ts
type ArrayValidator<TModel, TElementType> = Field<TModel> & {
    failWhenAny: (predicate: (item: TElementType) => boolean, message?: string) => ArrayValidator<TModel, TElementType>;
};

type StringValidator<TModel> = Field<TModel> & {
    isRequired: (error?: string) => StringValidator<TModel>;
    isEquals: (comparer: string, error?: string) => StringValidator<TModel>;
    isEmail: (error?: string) => StringValidator<TModel>;
    hasLength: (fixedLength: number, error?: string) => StringValidator<TModel>;
    hasMinLength: (minLength: number, error?: string) => StringValidator<TModel>;
    hasMaxLength: (maxLength: number, error?: string) => StringValidator<TModel>;
};

type NumberValidator<TModel> = Field<TModel> & {
    isRequired: (error?: string) => NumberValidator<TModel>;
    isEquals: (comparer: number, error?: string) => NumberValidator<TModel>;
    isLessThan:         (comparer: number, error?: string) => NumberValidator<TModel>;
    isLessOrEquals:  (comparer: number, error?: string) => NumberValidator<TModel>;
    isGreaterThan:      (comparer: number, error?: string) => NumberValidator<TModel>;
    isGreaterOrEquals:  (comparer: number, error?: string) => NumberValidator<TModel>;
    isWithinRange:      (min: number, max: number, error?: string) => NumberValidator<TModel>;
};
```
