<template>
    <div>
        Completely unappealing login form to demonstrate validations.
    </div>
    <h1>{{ header }}</h1>
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