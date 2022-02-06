<template>
    <div v-if="loaded" class="wrapper max-w-2xl px-6 pt-12 justify-self-center w-full mb-6">
        <h1 class="text-3xl font-bold mb-2">Rapportering för {{ race.name }}</h1>
        <p class="text-sm text-gray-500 italic">Rapportering sker per delsegling</p>
        <label class="label">
            <span class="label-text">Välj delsegling:</span>
        </label>
        <select v-model="selectedPartRace" name="" id="" class="select select-bordered w-full max-w-xs mb-4" @change="log">
            <option :value="r" v-for="r in race.partRaces">{{ r.name }}</option>
        </select>
        <div v-if="selectedPartRace">
            <h1 class="text-xl mt-4 font-bold">Start och målgång</h1>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Start</span>
                </label>
                <input v-model="start" type="time" placeholder="" class="input input-bordered w-32" />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Mål</span>
                </label>
                <input v-model="finish" type="time" placeholder="" class="input input-bordered w-32" />
            </div>
            <h1 class="text-xl mt-4 font-bold mb-2">Rundningspunkter</h1>
            <MarkReport v-for="mark in selectedPartRace.marks" :mark="mark" :registrations="race.registrations.data" :key="mark.id" />
            <button disabled class="btn btn-success my-4">Rapportera</button>
        </div>
    </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import MarkReport from '@/components/MarkReport.vue'

export default {
    name: 'Report',
    component: {
        MarkReport,
    },
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
            selectedPartRace: '',
        }
    },
    async mounted() {
        console.log(this.me)
        const race = await this.strapi.find('races', {
            populate: ['registrations.boat.crew', 'partRaces.marks.mark'],
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
        log() {
            console.log(this.selectedPartRace)
        },
    },
    components: { MarkReport },
}
</script>
