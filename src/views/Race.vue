<template>
	<div class="wrapper">
		<div v-if="error || loading">
			{{ error }}
		</div>
		<div v-else class="flex flex-col w-screen overflow-hidden">
			<div v-if="images.length > 0" class="carousel rounded-0 h-64 shadow-xl">
				<div v-for="i in images" :key="i.id" class="carousel-item">
					<figure>
						<img class="max-h-64" :src="getImageURL(i.formats.small.url)" />
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
							<th>{{ r.boat.name }}</th>
							<td>{{ r.handicap_system.name }}</td>
							<td>
								<kbd
									v-for="m in r.crew_members"
									:key="m.id"
									class="kbd kbd-sm bg-gray-100 text-black px-2 mr-2"
									>{{ m.name }}
								</kbd>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="flex space-x-4 h-20 place-content-start ml-6">
				<label
					for="register-modal"
					class="btn btn-primary text-base-content modal-button"
					@click="loadRegisterOptions()"
				>
					Registrera
				</label>
				<input id="register-modal" type="checkbox" class="modal-toggle" />
				<div class="modal m-0">
					<div class="modal-box m-0">
						<p>Vilken båt vill du registrera med?</p>
						<div v-if="userOptionsLoaded">
							<select
								v-model="selectedBoat"
								class="select select-bordered select w-full max-w-xs mb-4"
							>
								<option v-for="b in userBoats" :key="b.id" :value="b.id">
									{{ b.name }}
								</option>
							</select>
							<p>Välj handikappsystem</p>
							<select
								v-model="hsys"
								class="select select-bordered select w-full max-w-xs mb-4"
							>
								<option v-for="h in handicap_systems" :key="h.id" :value="h.id">
									{{ h.name }}
								</option>
							</select>
							<p>Välj gastar</p>
							<VueMultiselect
								v-model="crew"
								:options="userOptions"
								:multiple="true"
								track-by="value"
								:close-on-select="false"
								label="label"
								class="mb-4"
							>
							</VueMultiselect>
						</div>
						<div
							v-else
							class="boarder border-slate-500 shadow rounded-md h-16 animate-pulse"
						></div>
						<div class="modal-action flex justify-start">
							<label for="register-modal" class="btn btn-primary" @click="register()"
								>Registrera</label
							>
							<label for="register-modal" class="btn">Avbryt</label>
						</div>
					</div>
				</div>
				<label
					for="un-register-modal"
					class="btn modal-button text-base-100"
					@click="loadRegisterOptions()"
				>
					Avregistrera
				</label>
				<input id="un-register-modal" type="checkbox" class="modal-toggle" />
				<div class="modal m-0">
					<div class="modal-box m-0">
						<p>Vilken båt vill du avregistrera?</p>
						<div v-if="userOptionsLoaded">
							<select
								v-model="selectedBoat"
								class="select select-bordered select w-full max-w-xs mb-4"
							>
								<option v-for="b in userBoats" :key="b.id" :value="b.id">
									{{ b.name }}
								</option>
							</select>
						</div>
						<div
							v-else
							class="boarder border-slate-500 shadow rounded-md h-16 animate-pulse"
						></div>
						<div class="modal-action flex justify-start">
							<label
								for="un-register-modal"
								class="btn btn-error"
								@click="unregister()"
								>Avregistrera</label
							>
							<label for="un-register-modal" class="btn">Avbryt</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { API_URL } from '../store/actions/auth'
import { registerForFace } from '../api/registerForRace'
import { unRegisterForRace } from '../api/unRegisterForRace'
import { createToast } from 'mosha-vue-toastify'
import VueMultiselect from 'vue-multiselect'
import 'mosha-vue-toastify/dist/style.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import { API } from '../api/API.ts'

export default {
	name: 'Race',
	components: { VueMultiselect },
	data() {
		return {
			race: null,
			name: null,
			description: null,
			images: [],
			API_URL: API_URL,
			img: '',
			userBoats: [],
			id: null,
			boats: [],
			crew: null,
			userOptions: [],
			handicap_systems: [
				{ name: 'Hcp', id: 1 },
				{ name: 'Hcp_FC_DWS', id: 2 },
				{ name: 'Hcp_FC_NoDWS', id: 3 },
				{ name: 'Hcp_SH_DWS', id: 4 },
				{ name: 'Hcp_SH_NoDWS', id: 5 },
			],
			hsys: '',
			selectedBoat: null,
			userOptionsLoaded: false,
			me: this.$store.getters.getProfile,
			raceId: this.$route.params.id,
			registrations: [],
			error: null,
			loading: true,
		}
	},
	async beforeMount() {
		API('boats', null, `sailors.username=${this.me.username}`, true).then((boats) => {
			this.userBoats = boats
		})

		API('users', null, null, true).then((us) => {
			for (var i in us) {
				this.userOptions.push({
					value: us[i].id,
					label: us[i].name,
				})
			}
		})
		API('registrations', null, `race=${this.$route.params.id}`, true).then((res) => {
			this.registrations = res
		})
	},
	async mounted() {
		API('races', this.$route.params.id, null, true).then((res) => {
			this.race = res
			this.images = this.race.images
			this.id = this.race.id
			this.loading = false
		})
	},
	methods: {
		async register() {
			registerForFace(this.me, this.selectedBoat, this.crew, this.raceId, this.hsys)
				.then((res) => {
					createToast(res, {
						type: 'success',
					})
					API('registrations', null, `race=${this.$route.params.id}`).then((res) => {
						this.registrations = res
					})
				})
				.catch((err) => {
					createToast(err, {
						type: 'danger',
					})
				})
		},
		async unregister() {
			unRegisterForRace(this.selectedBoat)
				.then((res) => {
					createToast(res, {
						type: 'success',
					})
					API('registrations', null, `race=${this.$route.params.id}`).then((res) => {
						this.registrations = res
					})
				})
				.catch((err) => {
					createToast(err, {
						type: 'danger',
					})
				})
		},
		loadRegisterOptions() {
			API('users', null, null, true).then((users) => {
				this.users = users
				this.userOptionsLoaded = true
			})
		},
		getImageURL(url) {
			return `${this.API_URL}${url}`
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