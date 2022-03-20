Introduction

Vuelidate is great! Not BUTS.

This library tries to achieve the same purpose by closely knitting a fluent, typescripted API around your validation flows.

Check this out.

What if we could do validations like this

```ts
const validator = useValidator<LoginCredentials>(credentials)
        .for('password').isRequired().next
        .for('userName').isEmail();
````

'password' and 'username' are typesafe arguments and not mere string literals.

And our template could look like this...

```html
<input v-model="credentials.userName" style="width: 500px" />
<small v-if="form.userName.notValid">Invalid user name</small>
```

One or more validations may fail for a single field.
