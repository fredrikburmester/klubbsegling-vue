<template>
	<div class="pt-2 pb-6">
		<RaceCard2 v-for="race in races" :key="race.id" :race="race" />
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
	props: {
		racesInView: {
			type: Array,
			required: false,
			default: () => [],
		},
		incomingYear: {
			type: String,
			required: false,
			default: '2022',
		},
	},
	data() {
		return {
			races: this.racesInView,
			loaded: false,
		}
	},
	async mounted() {
		if (this.races.length == 0) {
			this.races = await getRaces()
			setTimeout(() => (this.loaded = true), 400)
		}
	},
}
</script>

