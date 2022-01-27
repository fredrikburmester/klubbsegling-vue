<template>
    <div class="flex flex-col justify-self-center text-center h-96 mt-52 mb-12">
        <h1 class="mb-4 text-5xl font-bold">404</h1>
        <h2 clas="mb-4">Kunde inte hitta sidan</h2>
        <router-link to="/" class="mt-4"
            ><span class="underline"><font-awesome-icon icon="home" class="mr-2" />Gå hem</span></router-link
        >
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
}
</script>

<style></style>
