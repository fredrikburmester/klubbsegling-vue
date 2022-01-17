<template>
	<div class="home p-5 bg-white"></div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			boats: null,
			races: null,
		}
	},
	async mounted() {
		this.races = await getRaces()
	},
	methods: {},
}
</script>
