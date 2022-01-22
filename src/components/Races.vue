<template>
	<div v-if="loaded" class="pt-2 pb-6">
		<RaceCard2 v-for="race in races" :key="race.id" :race="race" />
	</div>
	<div v-else class="wrapper justify-self-center md:max-w-2xl">
		<LoadingCard v-for="i in 10" :key="i" />
	</div>
</template>

<script>
import { getRaces } from '../api/getRaces'
import RaceCard2 from '../components/RaceCard2.vue'
import LoadingCard from './LoadingCard.vue'

export default {
	name: 'Races',
	components: {
		RaceCard2,
		LoadingCard,
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
		} else {
			this.loaded = true
		}
	},
}
</script>

