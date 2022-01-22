<template>
	<div class="wrapper">
		<div class="races px-6 pt-2 pb-6">
			<div>
				<div v-for="race in races" :key="race.id">
					<RaceCard2 :race="race" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getRaces } from '../api/getRaces'
import RaceCard2 from '../components/RaceCard2.vue'

export default {
	name: 'Races',
	components: {
		RaceCard2,
	},
	data() {
		return {
			races: [],
			loaded: false,
		}
	},
	async mounted() {
		this.races = await getRaces()
		setTimeout(() => (this.loaded = true), 400)
	},
}
</script>

<style>
.wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>
