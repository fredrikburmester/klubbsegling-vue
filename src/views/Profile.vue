<template>
	<div v-if="!loading" class="wrapper md:max-w-2xl justify-self-center grid px-6">
		<div v-if="!!profilePicture" class="avatar px-6 pt-12 justify-self-center">
			<div class="mb-8 rounded-full w-32 h-32">
				<img :src="profilePicture" />
			</div>
		</div>
		<div v-else class="avatar placeholder px-6 pt-12 justify-self-center">
			<div class="bg-neutral-focus text-neutral-content rounded-full w-32 h-32">
				<span class="text-3xl">{{ me.name[0] }}</span>
			</div>
		</div>
		<h2 class="card-title text-2xl text-center mt-4">{{ me.name }}</h2>
		<p class="text-center">
			{{ me.about || null }}
		</p>
		<h1 class="mt-4 font-bold">Mina Båtar</h1>
		<BoatCard v-for="b in userBoats" :key="b.id" :boat="b" />

		<AddBoatForm class="mt-4" :userboats="userBoats" @newBoat="onNewBoat" />
	</div>
	<button id="logout" class="btn btn-error mb-6 mt-12 w-48 ml-auto mr-auto" @click="logout">
		Logga ut
	</button>
</template>

<script>
import { AUTH_LOGOUT } from '../store/actions/auth'
import { API_URL } from '../store/actions/auth'
import { getBoatsOfUser } from '../api/getBoatsOfUser'
import AddBoatForm from '../components/AddBoatForm.vue'
import { API } from '../api/API'
import qs from 'qs'
import BoatCard from '../components/BoatCard.vue'

export default {
	components: {
		AddBoatForm,
		BoatCard,
	},
	data() {
		return {
			me: this.$store.getters.getProfile,
			loading: true,
			userBoats: [],
			imageLoading: true,
		}
	},
	computed: {
		profilePicture() {
			return this.me.image ? API_URL + this.me.image.formats.small.url : null
		},
	},
	mounted() {
		const query = qs.stringify({
			_where: {
				_or: [[{ 'sailors.id': this.me.id }], [{ 'owner.id': this.me.id }]],
			},
		})
		API('boats', null, query, this.me.id).then((boats) => {
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
.min-height-inherit {
	min-height: inherit;
}
@media (max-width: 640px) {
	#logout {
		width: 90vw;
		margin-left: 5vw;
		left: 0;
	}
}
#logout {
}
</style>