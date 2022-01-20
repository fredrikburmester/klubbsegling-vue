<template>
	<div class="wrapper">
		<div v-if="!loading">
			<div class="p-6 z-0">
				<div class="text-left z-0">
					<h2 class="card-title text-2xl z-0">{{ me.name }}</h2>
					<p>
						{{ me.about || null }}
					</p>
					<h1 class="mt-4 font-bold z-0">Mina Båtar</h1>

					<div v-for="b in userBoats" :key="b.id" class="w-full shadow stats mt-4 h-32">
						<router-link :to="`/boat/${b.id}`">
							<div class="card card-side card-bordered overflow-x-auto">
								<div
									v-if="imageLoading"
									class="w-24 h-32 flex justify-center content-center"
								>
									<button
										class="btn btn-lg bg-white text-black border-0 btn-circle loading h-auto"
									></button>
								</div>
								<figure v-if="getBoatImage(b)">
									<img
										v-show="!imageLoading"
										class="h-32"
										:src="getBoatImage(b)"
										@load="imageLoaded"
									/>
								</figure>
								<div class="card-body">
									<div class="stat-title">{{ getOwnerName(b) }}</div>
									<div class="stat-value text-lg">{{ b.name }}</div>
								</div>
							</div>
						</router-link>
					</div>
					<AddBoatForm class="mt-4" :userboats="userBoats" @newBoat="onNewBoat" />
				</div>
				<button class="btn btn-error my-4 w-full" @click="logout">Logga ut</button>
			</div>
		</div>
	</div>
</template>

<script>
import { AUTH_LOGOUT } from '../store/actions/auth'
import { API_URL } from '../store/actions/auth'
import { getBoatsOfUser } from '../api/getBoatsOfUser'
import AddBoatForm from '../components/AddBoatForm.vue'

export default {
	components: {
		AddBoatForm,
	},
	data() {
		return {
			me: this.$store.getters.getProfile,
			loading: true,
			userBoats: [],
			imageLoading: true,
		}
	},
	mounted() {
		getBoatsOfUser(this.me).then((boats) => {
			this.userBoats = boats
			this.loading = false
		})
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
		onNewBoat(value) {
			// Add the new boat to the table
			this.userBoats.push(value)
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
				this.imageLoading = false
				return null
			}
		},
		imageLoaded() {
			this.imageLoading = false
		},
	},
}
</script>
<style>
* {
	z-index: '0 !important';
}
.wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>