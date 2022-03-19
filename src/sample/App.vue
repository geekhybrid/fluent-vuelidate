<template>
    <h1>{{ header }}</h1>
    <small v-if="form.password.notValid">Error</small>
    <button @click="submit">Submit</button>
</template>

<script lang="ts" src="./App.ts" />