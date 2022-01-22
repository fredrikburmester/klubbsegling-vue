<template>
	<div
		v-show="loaded || !hasImages"
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
	<LoadingCard v-if="!loaded && hasImages" />
</template>

<script>
import { API_URL } from '../store/actions/auth'
import LoadingCard from '../components/LoadingCard.vue'

export default {
	components: {
		LoadingCard,
	},
	props: {
		race: {
			type: Object,
			default: () => {},
		},
	},
	data: function () {
		return {
			hasImages: this.race.images.length > 0,
			images: this.race.images,
			loaded: false,
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
			this.loaded = true
		},
	},
}
</script>
