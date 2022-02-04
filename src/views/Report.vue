<template>
    <div v-if="loaded" class="wrapper max-w-2xl px-6 pt-12 justify-self-center w-full mb-6">
        <h1 class="text-3xl font-bold mb-2">Rapportera tid</h1>
        <h1 class="text-xl font-bold italic text-gray-500 mb-4">{{ race.name }}</h1>
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
            <input v-model="start" type="time" placeholder="" class="input input-bordered w-24" />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Mål</span>
            </label>
            <input v-model="finish" type="time" placeholder="" class="input input-bordered w-24" />
        </div>
        <button disabled class="btn btn-success my-4">Rapportera</button>
    </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
    name: 'Report',
    data() {
        return {
            me: this.$store.getters.getProfile,
            race: null,
            loaded: false,
            boat: '',
            start: '',
            finish: '',
            boatInFront: '',
            boatBehind: '',
            markReports: {},
        }
    },
    async mounted() {
        console.log(this.me)
        const race = await this.strapi.find('races', {
            populate: ['registrations.boat.crew', 'partRaces'],
            filters: {
                $and: [
                    {
                        id: {
                            $eq: this.$route.params.id,
                        },
                    },
                    {
                        registrations: {
                            crew: {
                                id: {
                                    $eq: this.me.id,
                                },
                            },
                        },
                    },
                ],
            },
        })

        if (race.data.length == 0) {
            this.$router.push('/')
            createToast('Du är inte registrerad.', {
                type: 'danger',
            })
        }

        console.log(race.data)
        this.race = race.data[0].attributes
        this.loaded = true
    },
    methods: {
        async sendReport() {
            await strapi.create('restaurants', {
                name: '',
            })
        },
    },
}
</script>
