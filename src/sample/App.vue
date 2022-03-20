<template>
    <h1>{{ header }}</h1>
    <input v-model="credentials.userName" style="width: 500px" />
    <small v-if="form.userName.notValid">Invalid user name</small>
    <button @click="submit">Submit</button>
</template>

<script lang="ts" src="./App.ts" />