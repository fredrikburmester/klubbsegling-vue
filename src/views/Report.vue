<template>
    <div v-if="loaded" class="max-w-2xl px-6 pt-6 justify-self-center w-full">
        <h1 class="text-3xl font-bold mb-4">Rapportera tid</h1>
        <h1 class="text-xl font-bold">{{ race.name }}</h1>
        <p>Vilken deltävling vill du rapportera för?</p>
        <select name="" id="">
            <option value="" v-for="i in 10">hej</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'Report',
    data() {
        return {
            race: null,
            loaded: false,
        }
    },
    async mounted() {
        const race = await this.strapi.findOne('races', this.$route.params.id)
        this.race = race.data.attributes
        this.loaded = true
        console.log(this.race)
    },
    methods: {
        //
    },
}
</script>
