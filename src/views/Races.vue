<template>
	<div class="races px-6">
		<div v-if="error || !loaded">
			{{ error }}
		</div>
		<div v-else>
			<div v-for="race in races" :key="race.id">
				<RaceCard :race="race" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import RaceCard from '../components/RaceCard.vue'
import { API_URL } from '../store/actions/auth'
import { getRaces } from '../api/races'

export default {
	name: 'Races',
	components: {
		RaceCard,
	},
	data() {
		return {
			races: [],
			error: null,
			loaded: false,
		}
	},
	async mounted() {
		this.races = await getRaces()
		this.loaded = true
	},
}
</script>
