<template>
	<div>
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
				<table :key="race.participants" class="table w-full table-zebra">
					<thead>
						<tr>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="participant in race.participants" :key="participant.id">
							<td>{{ participant.name }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="w-screen flex space-x-4 h-20 place-content-center m-0">
				<label
					for="register-modal"
					class="btn btn-primary text-white modal-button"
					@click="loadRegisterOptions()"
				>
					Registrera
				</label>
				<input id="register-modal" type="checkbox" class="modal-toggle" />
				<div class="modal m-0">
					<div class="modal-box m-0">
						<p>Vilken båt vill du registrera med?</p>
						<div v-if="optionsLoaded">
							<select class="select select-bordered select w-full max-w-xs mt-4">
								<option v-for="boat in boats" :key="boat.id">
									{{ boat.name }}
								</option>
							</select>
							<select class="select select-bordered select w-full max-w-xs mt-4">
								<option v-for="value in type" :key="value">
									{{ value }}
								</option>
							</select>
							<Multiselect
								v-model="crew"
								mode="tags"
								:searchable="true"
								:close-on-select="false"
								:create-option="true"
								:options="users"
							/>
						</div>
						<div
							v-else
							class="boarder border-slate-500 shadow rounded-md h-16 animate-pulse"
						></div>
						<div class="modal-action flex justify-start">
							<label for="register-modal" class="btn btn-primary">Registrera</label>
							<label for="register-modal" class="btn">Avbryt</label>
						</div>
					</div>
				</div>
				<button class="btn" @click="unregister(user, race)">Avregistrera</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../store/actions/auth'
import { register_for_race } from '../api/register_for_race'
import { un_register_for_race } from '../api/un_register_from_race'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { getUsers } from '../api/users'
import Multiselect from '@vueform/multiselect'

export default {
	name: 'Race',
	components: { Multiselect },
	data() {
		return {
			race: null,
			name: null,
			description: null,
			error: null,
			loading: true,
			API_URL: API_URL,
			img: '',
			user: null,
			id: null,
			boats: [],
			crew: null,
			users: null,
			type: ['Hcp', 'Hcp_FC_DWS', 'Hcp_FC_NoDWS', 'Hcp_SH_DWS', 'Hcp_SH_NoDWS'],
			selectedBoat: null,
			optionsLoaded: false,
		}
	},
	// async created() {
	// 	this.users = await getUsers()
	// 	console.log(this.users)
	// },
	async mounted() {
		try {
			const response = await axios.get(`${API_URL}/races/${this.$route.params.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			console.log('Getting race data:', response.data)
			const race = response.data
			this.race = race
			this.name = !!race.name ? race.name : 'Saknar namn'
			this.description = !!race.description ? race.description : 'Saknar beskrivning'
			this.img = race.images.length != 0 ? API_URL + race.images[0].url : ''
			this.id = race.id
			this.user = JSON.parse(localStorage.getItem('user'))

			this.users = await getUsers()

			this.loading = false
		} catch (error) {
			this.error = error
		}
	},
	methods: {
		async register(user, race) {
			var res = await register_for_race(user, race)
			console.log(res.length, this.race.participants.length)
			if (res.length == this.race.participants.length + 1) {
				this.race.participants = res
				this.toast('Du är registrerad!')
			} else {
				this.toast('Någonting gick snett... Är du redan registrerad?', 'warning')
			}
		},
		async unregister(user, race) {
			var res = await un_register_for_race(user, race)
			if (res.length == this.race.participants.length - 1) {
				this.race.participants = res
				this.toast('Du är avregistrerad!', 'info')
			} else {
				this.toast('Någonting gick snett...', 'warning')
			}
		},
		toast: function (msg, type = 'success', transition = 'slide') {
			createToast(msg, {
				type: type,
				transition: transition,
			})
		},
		async loadRegisterOptions() {
			this.users = await getUsers()
			console.log(this.users)
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
</style>