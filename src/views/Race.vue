<template>
    <div v-if="!loading" class="wrapper flex flex-col flex-1 max-w-sm md:max-w-xl justify-self-center mt-8 px-6">
        <!-- <div v-if="raceHasImages" class="carousel rounded-0 h-64 shadow-xl">
                <div v-for="i in race.images.data" :key="i.id" class="carousel-item">
                    <figure>
                        <img class="max-h-64" :src="getImageURL(i)" />
                    </figure>
                </div>
            </div> -->
        <div class="mt-6">
            <h2 class="text-5xl font-bold">{{ race.name }}</h2>
            <p class="mt-2 italic text-gray-500">Publicerad: {{ race.publishedAt || '' }}</p>
            <p class="mt-2">
                {{ race.description || '' }}
            </p>
            <p class="mt-2 font-bold">{{ race.start }} - {{ race.end }}</p>
        </div>
        <div class="shadow stats mt-6 overflow-x-scroll">
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
        <h1 class="mt-6 mb-2 text-lg font-bold">Delseglingar:</h1>
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
                        <th>
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

        <h1 class="mt-6 mb-2 text-lg font-bold">Deltagare:</h1>
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
        <div class="flex space-x-4 place-content-start my-6">
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
                        <p class="mb-4">Är du säker på att du vill avregistrera dig från {{ race.name }}? Du kan alltid återregistrera dig om registreringen inte har stängt.</p>
                        <div class="modal-action flex justify-start">
                            <label for="un-register-modal" class="btn btn-error" @click="unregister()">Avregistrera</label>
                            <label for="un-register-modal" class="btn">Avbryt</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="h-screen"></div>
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
            myRegistrations: [],
            raceHasImages: false,
            loading: true,
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

        const registrations = await this.strapi.find('registrations', {
            populate: '*',
            filters: {
                race: {
                    id: {
                        $eq: this.$route.params.id,
                    },
                },
            },
        })

        this.race = race.data[0].attributes
        this.registrations = registrations.data

        // this.registrations = await getAllRegistrations(this.race.id)
        this.myRegistrations = await getMyRegistrations()
        this.userBoats = await getUserBoats(this.me.id)
        this.raceHasImages = !!this.race.images.data

        this.loading = false
    },
    methods: {
        async register() {
            var registered = await registerForRace(this.raceId, this.selectedBoat, this.selectedUsers, this.selectedHsys, this.me.id)
            if (registered) {
                this.registrations = await getAllRegistrations()
                this.myRegistrations = await getMyRegistrations()
            }
        },
        async unregister() {
            await unRegisterFromRace(this.myRegistrations[0].id)
            this.registrations = await getAllRegistrations()
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
}
.multiselect__tags {
    width: 100% !important;
}
</style>
