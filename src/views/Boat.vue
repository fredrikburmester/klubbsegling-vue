<template>
	<div id="boat" class="wrapper">
		<div v-if="!loading" class="hero min-h-screen items-start pt-8">
			<div class="flex flex-col hero-content lg:flex-row-reverse items-start">
				<img v-if="image" :src="image" class="max-w-sm rounded-lg shadow-2xl" />
				<div class="sm:justify-start">
					<h1 class="mb-5 text-5xl font-bold">{{ boat.name }}</h1>
					<p class="mb-5">{{ boat.description || '' }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { API_URL } from '../store/actions/auth'
import { API } from '../api/API.ts'

export default {
	name: 'Boat',
	data() {
		return {
			image: null,
			loading: true,
			boat: null,
		}
	},
	beforeMount() {
		API('boats', this.$route.params.id)
			.then((boat) => {
				this.boat = boat
				this.loading = false
				this.image = API_URL + boat.image.url
			})
			.catch((err) => {
				console.log(err)
			})
	},
	methods: {},
}
</script>

<style>
.wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>