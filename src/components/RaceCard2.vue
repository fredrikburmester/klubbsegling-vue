<template>
	<div>
		<div
			v-show="!hasImages || imageLoaded"
			class="border border-blue-300 card shadow-xl image-full mt-4 h-56"
		>
			<figure v-if="hasImages">
				<img :src="headerUrl" @load="onImgLoad" />
			</figure>
			<div class="justify-end card-body h-56">
				<h2 class="card-title">{{ race.name }}</h2>
				<p class="max-h-12 overflow-hidden">
					{{ race.description || '' }}
				</p>
				<router-link :to="`/race/${race.id}`">
					<div class="card-actions">
						<button class="btn btn-primary">Läs mer</button>
					</div>
				</router-link>
			</div>
		</div>
		<LoadingRaceCard v-if="!imageLoaded && hasImages" />
	</div>
</template>

<script>
import { API_URL } from '../store/actions/auth'
import LoadingRaceCard from '../components/LoadingRaceCard.vue'
import Race from '../views/Race.vue'

export default {
	components: {
		LoadingRaceCard,
	},
	props: {
		race: {
			type: Object,
			default: () => {},
		},
	},
	data: function () {
		return {
			occ: '',
			hasImages: this.race.images.length > 0,
			images: this.race.images,
			imageLoaded: false,
		}
	},
	computed: {
		headerUrl() {
			return API_URL + this.race.images[0].formats.small.url
		},
	},
	mounted() {},
	methods: {
		formatDate(date) {
			if (date !== undefined) {
				date = new Date(date)
				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			} else return '-'
		},
		loggedIn() {
			return this.$store.getters.isAuthenticated
		},
		getUser() {
			return this.$store.getters.getProfile
		},
		onImgLoad() {
			this.imageLoaded = true
		},
	},
}
</script>
