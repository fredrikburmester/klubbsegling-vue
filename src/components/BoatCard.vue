<template>
	<div
		v-show="!hasImages || imageLoaded"
		class="border border-blue-300 card shadow-xl image-full mt-4 h-94"
	>
		<figure v-if="hasImage">
			<img :src="thumbnail" @load="onImgLoad" />
		</figure>
		<div class="justify-end card-body h-56">
			<h2 class="card-title">{{ boat.name }}</h2>
			<p v-if="!!boat.owner" class="max-h-12 overflow-hidden">
				{{ boat.owner.name }}
			</p>
			<router-link :to="`/profile/boat/${boat.id}`">
				<div class="card-actions">
					<button class="btn btn-primary">Mer info</button>
				</div>
			</router-link>
		</div>
	</div>
	<LoadingboatCard v-if="!imageLoaded && hasImages" />
</template>

<script>
import { API_URL } from '../store/actions/auth'

export default {
	name: 'Profile',
	props: {
		boat: {
			type: Object,
			required: true,
			default: () => {},
		},
	},
	data() {
		return {
			hasImage: !!this.boat.image,
			imageLoaded: false,
		}
	},
	computed: {
		thumbnail() {
			return API_URL + this.boat.image.formats.small.url
		},
	},
	mounted() {
		console.log(this.boat)
	},
	methods: {
		onImgLoad() {
			this.imageLoaded = true
		},
	},
}
</script>

<style>
.card.image-full:before {
	opacity: 0.3;
}
</style>