<template>
	<div class="card shadow-xl image-full mt-4">
		<figure v-if="hasImages">
			<img :src="headerUrl" />
		</figure>
		<div class="justify-end card-body">
			<h2 class="card-title">{{ race.name }}</h2>
			<p>
				{{ race.description || '' }}
			</p>
			<router-link :to="`/race/${race.id}`">
				<div class="card-actions">
					<button class="btn btn-primary">Läs mer</button>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import { API_URL } from '../store/actions/auth'
export default {
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
		}
	},
	computed: {
		headerUrl() {
			return API_URL + this.race.images[0].formats.medium.url
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
	},
}
</script>
