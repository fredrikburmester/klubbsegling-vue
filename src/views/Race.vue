<template>
    <div v-if="!loading" class="wrapper">
        <div class="flex flex-col w-screen overflow-hidden">
            <div v-if="raceHasImages" class="carousel rounded-0 h-64 shadow-xl">
                <div v-for="i in race.images.data" :key="i.id" class="carousel-item">
                    <figure>
                        <img class="max-h-64" :src="getImageURL(i)" />
                    </figure>
                </div>
            </div>
            <div class="mx-6 mt-6">
                <h2 class="text-5xl font-bold">{{ race.name }}</h2>
                <p class="mt-2">
                    {{ race.description || '' }}
                </p>
            </div>
            <div class="shadow stats mt-6 mx-4 overflow-x-scroll">
                <div class="stat">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title">Registrerade Båtar</div>
                    <div class="stat-value">{{ registrations.length }}st</div>
                </div>
                <div class="stat">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title">Sträcka</div>
                    <div class="stat-value">Obestämt</div>
                    <div class="stat-desc">Distans</div>
                </div>
            </div>
            <h1 class="mt-6 ml-6 text-lg font-bold">Deltagare:</h1>
            <div class="overflow-x-auto my-4 mx-6">
                <table class="table w-full table-zebra">
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
                                    {{ r.attributes.boat.data.attributes.name }}
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
            <div class="flex space-x-4 h-20 place-content-start ml-6">
                <label for="register-modal" class="btn btn-primary text-base-content modal-button" @click="loadRegisterOptions()"> Registrera </label>
                <input id="register-modal" type="checkbox" class="modal-toggle" />
                <div class="modal m-0">
                    <div class="modal-box m-0">
                        <p>Vilken båt vill du registrera med?</p>
                        <div v-if="userOptionsLoaded">
                            <select v-model="selectedBoat" class="select select-bordered select w-full max-w-xs mb-4">
                                <option v-for="b in userBoats" :key="b.id" :value="b.id">
                                    {{ b.attributes.name }}
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
                <div v-if="registrations.length > 0">
                    <label for="un-register-modal" class="btn modal-button text-base-100"> Avregistrera </label>
                    <input id="un-register-modal" type="checkbox" class="modal-toggle" />
                    <div class="modal m-0">
                        <div class="modal-box m-0">
                            <p class="mb-4">Är du säker</p>
                            <div class="modal-action flex justify-start">
                                <label for="un-register-modal" class="btn btn-error" @click="unregister()">Avregistrera</label>
                                <label for="un-register-modal" class="btn">Avbryt</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API_URL, IMG_URL } from '../store/actions/auth'
import VueMultiselect from 'vue-multiselect'
import 'mosha-vue-toastify/dist/style.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import { getAllRegistrations, getRace, getUserBoats, getAllUsers, registerForRace, getRegisteredRaces, unRegisterFromRace, getMyRegistrations } from '@/api/API'

export default {
    name: 'Race',
    components: { VueMultiselect },
    data() {
        return {
            race: null,
            API_URL: API_URL,
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
            me: this.$store.getters.getProfile,
            raceId: this.$route.params.id,
            registrations: [],
            loading: true,
            raceHasImages: false,
            selectedUnRegisterRace: null,
        }
    },
    async mounted() {
        const race = await getRace(this.$route.params.id)
        this.race = race.attributes

        this.registrations = await getAllRegistrations(this.race.id)
        this.myRegistrations = await getMyRegistrations()
        this.userBoats = await getUserBoats(this.me.id)
        this.raceHasImages = !!this.race.images.data

        console.log('Races: ', this.race)
        console.log('All registrations: ', this.registrations)
        console.log('My registrations: ', this.myRegistrations)
        console.log('User boats: ', this.userBoats)

        this.loading = false
    },
    methods: {
        async register() {
            var registered = await registerForRace(this.raceId, this.selectedBoat, this.selectedUsers, this.selectedHsys, this.me.id)
            if (registered) {
                this.registrations = await getAllRegistrations()
            }
        },
        async unregister() {
            await unRegisterFromRace(this.race.id)
        },
        async loadRegisterOptions() {
            this.users = await getAllUsers()

            for (var i in this.users) {
                this.userOptions.push({
                    value: this.users[i].id,
                    label: this.users[i].firstName + ' ' + this.users[i].lastName,
                })
            }

            this.userOptionsLoaded = true
        },
        getImageURL(image) {
            if (!!image.attributes.formats.large) {
                return `${IMG_URL}${image.attributes.formats.large.url}`
            } else if (!!image.attributes.formats.medium) {
                return `${IMG_URL}${image.attributes.formats.medium.url}`
            } else if (!!image.attributes.formats.small) {
                return `${IMG_URL}${image.attributes.formats.small.url}`
            } else if (!!image.attributes.formats.thumbnail) {
                return `${IMG_URL}${image.attributes.formats.thumbnail.url}`
            }
        },
    },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.modal {
    margin: 0 !important;
}
.wrapper {
    width: 100%;
    min-height: 100vh;
}
.multiselect__tags {
    width: 100% !important;
}
</style>
