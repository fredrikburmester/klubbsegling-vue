<template>
    <div v-if="!loading" class="wrapper flex flex-col flex-1 max-w-sm md:max-w-2xl justify-self-center pt-6 px-6">
        <h1 class="text-5xl font-bold leading-relaxed">{{ race.name }}</h1>
        <p class="italic text-gray-500">Publicerad: {{ formatDate(race.publishedAt) || '' }}</p>
        <hr class="my-4" />
        <p class="font-bold">Beskrivning:</p>
        <p class="mb-2">
            {{ race.description || '' }}
        </p>
        <p class="font-bold">Datum:</p>
        <p class="mb-2">{{ race.start }} - {{ race.end }}</p>
        <div class="shadow stats mt-6 overflow-x-scroll">
            <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title">Registrerade Båtar</div>
                <div class="stat-value">{{ registrations?.length }}st</div>
            </div>
            <div class="stat">
                <div class="stat-figure text-secondary"></div>
                <div class="stat-title">Sträcka</div>
                <div class="stat-value">Obestämt</div>
                <div class="stat-desc">Distans</div>
            </div>
        </div>
        <p class="mt-6 mb-2 font-bold">Delseglingar:</p>
        <div class="overflow-x-auto">
            <table v-if="race.partRaces" class="table table-zebra">
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Lägsta SRS</th>
                        <th>SRS intervall</th>
                        <th>Första start</th>
                        <th>Grupp intervall</th>
                        <th>Grupp storlek</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pr in race.partRaces" :key="pr.id">
                        <th class="font-normal">
                            {{ pr.name }}
                        </th>
                        <td>{{ pr.lowestSRS || '' }}</td>
                        <td>{{ pr.SRSInterval || '' }}</td>
                        <td>{{ pr.firstStart || '' }}</td>
                        <td>{{ pr.groupIntervalMinutes || '' }}</td>
                        <td>{{ pr.groupSize || '' }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>Inga delseglingar än...</p>
        </div>

        <p class="mt-6 mb-2 font-bold">Deltagare:</p>
        <div class="overflow-x-auto">
            <table class="table table-zebra">
                <thead>
                    <tr>
                        <th>Båtnamn</th>
                        <th>Handikap</th>
                        <th>Crew</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in registrations" :key="r.id">
                        <th>
                            <router-link class="underline" :to="`/boat/${r.attributes.boat.data.id}`">
                                {{ r.attributes.boat.data.attributes.boatName }}
                            </router-link>
                        </th>
                        <td>{{ r.attributes.handicapSystem.data.attributes.name }}</td>
                        <td>
                            <kbd v-for="u in r.attributes.crew.data" :key="u.id" class="kbd kbd-sm bg-gray-100 text-black px-2 mr-2">{{ u.attributes.firstName }} {{ u.attributes.lastName }}</kbd>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex space-x-4 place-content-start my-6">
            <label v-if="!registered" for="register-modal" class="btn btn-primary text-base-content modal-button" @click="loadRegisterOptions()"> Registrera </label>
            <label v-else for="register-modal" class="btn btn-primary text-base-content modal-button" @click="loadRegisterOptions()" disabled> Registrera </label>
            <input id="register-modal" type="checkbox" class="modal-toggle" />
            <div class="modal m-0">
                <div class="modal-box m-0">
                    <p>Vilken båt vill du registrera med?</p>
                    <div v-if="userOptionsLoaded">
                        <select v-model="selectedBoat" class="select select-bordered select w-full max-w-xs mb-4">
                            <option v-for="b in userBoats" :key="b.id" :value="b.id">
                                {{ b.attributes.boatName }}
                            </option>
                        </select>
                        <p>Välj handikappsystem</p>
                        <select v-model="selectedHsys" class="select select-bordered select w-full max-w-xs mb-4">
                            <option v-for="h in handicap_systems" :key="h.id" :value="h.id">
                                {{ h.name }}
                            </option>
                        </select>
                        <p>Välj gastar</p>
                        <VueMultiselect v-model="selectedUsers" :options="userOptions" :multiple="true" track-by="value" :close-on-select="false" label="label" class="mb-4"> </VueMultiselect>
                    </div>
                    <div v-else class="boarder border-slate-500 shadow rounded-md h-16 animate-pulse"></div>
                    <div class="modal-action flex justify-start">
                        <label for="register-modal" class="btn btn-primary" @click="register()">Registrera</label>
                        <label for="register-modal" class="btn">Avbryt</label>
                    </div>
                </div>
            </div>
            <div v-if="registrations?.length > 0">
                <label for="un-register-modal" class="btn modal-button text-base-100">Avregistrera</label>
                <input id="un-register-modal" type="checkbox" class="modal-toggle" />
                <div class="modal m-0">
                    <div class="modal-box m-0">
                        <p class="mb-4 font-bold">Är du säker på att du vill avregistrera dig från {{ race.name }}?</p>
                        <p>Du kan alltid återregistrera dig om registreringen inte har stängt.</p>
                        <div class="modal-action flex justify-start">
                            <label for="un-register-modal" class="btn btn-error" @click="unregister()">Avregistrera</label>
                            <label for="un-register-modal" class="btn">Avbryt</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoadingArticle v-else />
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import 'mosha-vue-toastify/dist/style.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import { registerForRace, unRegisterFromRace } from '@/api/API'
import LoadingArticle from '@/components/LoadingArticle.vue'

export default {
    name: 'Race',
    components: {
        VueMultiselect,
        LoadingArticle,
    },
    data() {
        return {
            me: this.$store.getters.getProfile,
            race: null,
            raceId: this.$route.params.id,
            userBoats: [],
            users: [],
            boats: [],
            selectedUsers: [],
            userOptions: [],
            handicap_systems: [
                { name: 'Hcp', id: 1 },
                { name: 'Hcp_FC_DWS', id: 2 },
                { name: 'Hcp_FC_NoDWS', id: 3 },
                { name: 'Hcp_SH_DWS', id: 4 },
                { name: 'Hcp_SH_NoDWS', id: 5 },
            ],
            selectedHsys: '',
            selectedBoat: null,
            userOptionsLoaded: false,
            registrations: [],
            registered: false,
            myRegistration: null,
            raceHasImages: false,
            loading: true,
        }
    },
    async mounted() {
        // Get the Race
        await this.strapi
            .find('races', {
                populate: '*',
                filters: {
                    id: {
                        $eq: this.$route.params.id,
                    },
                },
            })
            .then(res => {
                this.race = res.data[0].attributes
            })

        // Get all registrations for this race
        await this.strapi
            .find('registrations', {
                populate: '*',
                filters: {
                    race: {
                        id: {
                            $eq: this.$route.params.id,
                        },
                    },
                },
            })
            .then(res => {
                console.log(res.data)
                if (res.data.length != 0) {
                    this.registrations = res.data
                }

                // Check if the user is registered for this race
                this.registered = this.checkIfRegistered()
            })

        // Get all boats for my user for the registration
        await this.strapi
            .find('boats', {
                populate: '*',
                filters: {
                    owners: {
                        id: {
                            $eq: this.me.id,
                        },
                    },
                },
            })
            .then(res => {
                this.userBoats = res.data
            })

        // Check if this race has images
        this.raceHasImages = !!this.race.images.data
        this.loading = false
    },
    methods: {
        checkIfRegistered() {
            console.log('Checking reg', this.registrations)
            for (let r of this.registrations) {
                for (let c of r.attributes.crew.data) {
                    if (c.id == this.me.id) {
                        this.myRegistration = r
                        this.registered = true
                    }
                }
            }
            return false
        },
        async register() {
            await registerForRace(this.raceId, this.selectedBoat, this.selectedUsers, this.selectedHsys, this.me.id)
            await this.getRegistrations()
        },
        async getRegistrations() {
            await this.strapi
                .find('registrations', {
                    populate: '*',
                    filters: {
                        race: {
                            id: {
                                $eq: this.$route.params.id,
                            },
                        },
                    },
                })
                .then(res => {
                    // Check if the user is registered for this race
                    this.registrations = res.data
                })
                .then(() => {
                    this.checkIfRegistered()
                })
        },
        async unregister() {
            await unRegisterFromRace(this.myRegistration.id)
            await this.getRegistrations()
        },
        async loadRegisterOptions() {
            this.users = await this.strapi.find('users')
            this.userOptions = []
            for (var i in this.users) {
                this.userOptions.push({
                    value: this.users[i].id,
                    label: this.users[i].firstName + ' ' + this.users[i].lastName,
                })
            }

            this.userOptionsLoaded = true
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('sv-SE')
        },
    },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.modal {
    margin: 0 !important;
}
.multiselect__tags {
    width: 100% !important;
}
</style>
