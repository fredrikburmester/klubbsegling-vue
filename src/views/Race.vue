<template>
	<div class="wrapper">
		<div v-if="error || loading">
			{{ error }}
		</div>
		<div v-else class="flex flex-col overflow-auto mb-20">
			<figure class="px-6 pt-5">
				<img :src="img" class="rounded-xl" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{{ name }}</h2>
				<p class="my-2">
					{{ description }}
				</p>
			</div>
			<div class="shadow stats mx-4 h-auto">
				<div class="stat">
					<div class="stat-figure text-secondary"></div>
					<div class="stat-title">Registrerade Båtar</div>
					<div class="stat-value">38st</div>
				</div>
				<div class="stat">
					<div class="stat-figure text-secondary"></div>
					<div class="stat-title">Sträcka</div>
					<div class="stat-value">4</div>
					<div class="stat-desc">Distans</div>
				</div>
			</div>
			<div class="w-screen justify-start">
				<ul class="steps steps-vertical w-screen p-6">
					<li class="step step-primary">Registrering</li>
					<li class="step step-primary">Registering stänger</li>
					<li class="step step-primary">Gruppindelning</li>
					<li class="step">Seglats</li>
				</ul>
			</div>
			<div class="overflow-x-auto my-4 mx-6">
				<h1 class="my-2">Deltagare:</h1>
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
							<td>{{ r.boat.name }}</td>
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
			<div class="w-screen flex space-x-4 h-20 place-content-center m-0">
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
						<div v-if="optionsLoaded">
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
					class="btn btn-error text-base-content modal-button"
					@click="loadRegisterOptions()"
				>
					Avregistrera
				</label>
				<input id="un-register-modal" type="checkbox" class="modal-toggle" />
				<div class="modal m-0">
					<div class="modal-box m-0">
						<p>Vilken båt vill du avregistrera?</p>
						<div v-if="optionsLoaded">
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
import axios from 'axios'
import { API_URL } from '../store/actions/auth'
import { registerForFace } from '../api/registerForRace'
import { unRegisterForRace } from '../api/unRegisterForRace'
import { createToast } from 'mosha-vue-toastify'
import { getUsers } from '../api/users'
import { getRegistrations } from '../api/getRegistrations'
import { getBoatsOfUser } from '../api/getBoatsOfUser.js'
import { getAllUsers } from '../api/getAllUsers.js'
import VueMultiselect from 'vue-multiselect'
import 'mosha-vue-toastify/dist/style.css'
import 'vue-multiselect/dist/vue-multiselect.css'

export default {
	name: 'Race',
	components: { VueMultiselect },
	data() {
		return {
			race: null,
			name: null,
			description: null,
			error: null,
			loading: true,
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
			optionsLoaded: false,
			me: this.$store.getters.getProfile,
			raceId: this.$route.params.id,
			registrations: [],
		}
	},
	async beforeMount() {
		this.userBoats = await getBoatsOfUser(this.me)
		console.log(this.userBoats)
		getAllUsers().then((us) => {
			for (var i in us) {
				this.userOptions.push({
					value: us[i].id,
					label: us[i].name,
				})
			}
		})
		console.log(this.userOptions)
		getRegistrations(this.$route.params.id).then((res) => {
			console.log('reg:', res)
			this.registrations = res
		})
	},
	async mounted() {
		try {
			const response = await axios.get(`${API_URL}/races/${this.$route.params.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			const race = response.data
			this.race = race
			this.name = !!race.name ? race.name : 'Saknar namn'
			this.description = !!race.description ? race.description : 'Saknar beskrivning'
			this.img = race.images.length != 0 ? API_URL + race.images[0].url : ''
			this.id = race.id

			this.loading = false
		} catch (error) {
			this.error = error
		}
	},
	methods: {
		async register() {
			console.log(
				'register fields:',
				this.me,
				this.selectedBoat,
				this.crew,
				this.raceId,
				this.hsys
			)
			registerForFace(this.me, this.selectedBoat, this.crew, this.raceId, this.hsys)
				.then((res) => {
					createToast(res, {
						type: 'success',
					})
					getRegistrations(this.$route.params.id).then((res) => {
						console.log('reg:', res)
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
					getRegistrations(this.$route.params.id).then((res) => {
						console.log('reg:', res)
						this.registrations = res
					})
				})
				.catch((err) => {
					createToast(err, {
						type: 'danger',
					})
				})
		},
		async loadRegisterOptions() {
			this.users = await getUsers()
			this.optionsLoaded = true
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