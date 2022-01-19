<template>
	<div>
		<div v-if="!loading">
			<div class="p-6 z-0">
				<div class="text-left z-0">
					<h2 class="card-title text-2xl z-0">{{ me.name }}</h2>
					<p>
						{{ me.about || null }}
					</p>
					<h1 class="mt-4 font-bold z-0">Mina Båtar</h1>

					<div v-for="b in boats" :key="b.id" class="w-full shadow stats mt-4 h-32">
						<router-link :to="`/boat/${b.id}`">
							<div class="card card-side card-bordered overflow-x-auto">
								<figure v-if="getBoatImage(b)" class="z-0">
									<img class="h-36 z-0" :src="getBoatImage(b)" />
								</figure>
								<div class="card-body">
									<div class="stat-title">{{ getOwnerName(b) }}</div>
									<div class="stat-value text-lg">{{ b.name }}</div>
								</div>
							</div>
						</router-link>
					</div>
					<div v-for="b in boats" :key="b.id" class="w-full shadow stats mt-4 z-0">
						<router-link :to="`/boat/${b.id}`">
							<div class="stat">
								<div class="stat-figure text-info">
									<div class="avatar">
										<div
											v-if="getBoatImage(b)"
											class="w-16 h-16 p-1 mask mask-squircle bg-base-100 z-0"
										>
											<img
												:src="getBoatImage(b)"
												alt="No image"
												class="mask mask-circle z-0"
											/>
										</div>
									</div>
								</div>
								<div class="stat-title">{{ getOwnerName(b) }}</div>
								<div class="stat-value text-lg">{{ b.name }}</div>
							</div>
						</router-link>
					</div>
					<AddBoatForm class="mt-4" :boats="boats" @boats="onBoats" />
				</div>
				<button class="btn btn-error my-4 w-full" @click="logout">Logga ut</button>
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
					this.loading = false
				})
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
		getOwnerName(boat) {
			// return boat.owner.name
			if (!!boat.owner) {
				return boat.owner.name
			} else {
				return 'No owner'
			}
		},
		getBoatImage(boat) {
			if (!!boat.image) {
				return `${API_URL}${boat.image.url}`
			} else {
				return null
			}
		},
	},
}
</script>
<style>
* {
	z-index: '0 !important';
}
</style>