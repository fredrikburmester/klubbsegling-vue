<template>
	<div>
		<div v-if="!loading">
			<div class="p-6">
				<div class="text-left">
					<div class="mt-4">
						<h2 class="card-title">{{ me.username }}</h2>
						<p>
							{{ me.about || null }}
						</p>
						<h1 class="my-2 font-bold">Mina Båtar</h1>
						<div class="overflow-x-auto">
							<table class="table w-full">
								<thead>
									<tr>
										<th>Name</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="boat in boats" :key="boat.id">
										<th>
											<router-link :to="`/boats/${boat.id}`">{{
												boat.name
											}}</router-link>
										</th>
									</tr>
								</tbody>
							</table>
							<AddBoatForm :boats="boats" @boats="onBoats" />
						</div>
					</div>
				</div>
				<button class="btn btn-error my-4" @click="logout">Logga ut</button>
			</div>
		</div>
	</div>
</template>

<script>
import { AUTH_LOGOUT } from '../store/actions/auth'
import { API_URL } from '../store/actions/auth'
import axios from 'axios'
import AddBoatForm from '../components/AddBoatForm.vue'

export default {
	components: {
		AddBoatForm,
	},
	data() {
		return {
			me: this.$store.getters.getProfile,
			loading: true,
			boats: [],
		}
	},
	async mounted() {
		console.log(process.env.NODE_ENV)
		var self = this
		try {
			await axios
				.get(`${API_URL}/boats?sailors.username=${this.me.username}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					},
				})
				.then((response) => {
					self.boats = response.data
				})
			this.loading = false
		} catch (error) {
			this.error = error
			if (process.env.NODE_ENV === 'development') {
				console.log(error)
			}
		}
	},
	methods: {
		logout: function () {
			this.$store.dispatch(AUTH_LOGOUT).then(() => {
				if (this.$route.params.nextUrl != null) {
					this.$router.push(this.$route.params.nextUrl)
				} else {
					this.$router.push('/')
				}
			})
		},
		onBoats(value) {
			// Add the new boat to the table
			this.boats.push(value)
		},
	},
}
</script>
