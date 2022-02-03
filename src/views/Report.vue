<template>
    <div v-if="loaded" class="max-w-2xl px-6 pt-6 justify-self-center w-full mb-6">
        <h1 class="text-3xl font-bold mb-2">Rapportera tid</h1>
        <h1 class="text-xl font-bold italic text-gray-500 mb-4">för {{ race.name }}</h1>
        <label class="label">
            <span class="label-text">Delsegling</span>
        </label>
        <select name="" id="" class="select select-bordered w-full max-w-xs mb-4">
            <option value="" v-for="r in race.partRaces">{{ r.name }}</option>
        </select>

        <div class="form-control">
            <label class="label">
                <span class="label-text">Start</span>
            </label>
            <input type="time" placeholder="" class="input input-bordered w-24" />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Mål</span>
            </label>
            <input type="time" placeholder="" class="input input-bordered w-24" />
        </div>
        <button disabled class="btn btn-success my-4">Rapportera</button>
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
        const race = await this.strapi.find('races', {
            populate: '*',
            filters: {
                id: {
                    $eq: this.$route.params.id,
                },
            },
        })
        console.log(race.data)
        this.race = race.data[0].attributes
        this.loaded = true
    },
    methods: {
        //
    },
}
</script>
