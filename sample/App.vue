<template>
    <h1>{{ header }}</h1>
    <small v-if="form.password.notValid">Error</small>
</template>

<script lang="ts" src="./App.ts" />