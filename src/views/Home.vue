<template>
	<div v-if="!loading" class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
		<h1 class="font text-sm mt-4 opacity-50">Välj vy</h1>

		<div class="w-full shadow stats mt-4">
			<div
				class="stat cursor-pointer"
				:class="{ 'bg-gray-100': active == 'currentRaces' }"
				@click="setThisYearRacesInView"
			>
				<div class="stat-title">Seglatser i år</div>
				<div class="stat-value text-info">{{ currentRaces.length }}</div>
				<div class="stat-desc">{{ thisYear }}</div>
			</div>
			<div
				class="stat cursor-pointer"
				:class="{ 'bg-gray-100': active == 'registeredRaces' }"
				@click="setRegisteredRacesInView"
			>
				<div class="stat-title">Registrerad</div>
				<div class="stat-value text-primary">{{ registeredRaces.length }}</div>
				<div class="stat-desc"></div>
			</div>
		</div>
		<h1 class="font-bold text-2xl mt-4">Seglatser i år</h1>
		<Races :key="changeView" :races-in-view="racesInView" />
	</div>
</template>

<script>
import Races from '../components/Races.vue'
import { API } from '../api/API.ts'
export default {
	name: 'Home',
	components: {
		Races,
	},
	data() {
		return {
			boats: null,
			races: null,
			me: this.$store.getters.getProfile,
			currentRaces: [],
			registeredRaces: [],
			racesInView: [],
			changeView: false,
			active: 'currentRaces',
			loading: true,
		}
	},
	computed: {
		thisYear() {
			var now = new Date()
			return now.getFullYear()
		},
	},
	async mounted() {
		console.log(this.me)
		var today = new Date()
		var year = today.getFullYear()

		API(
			'races',
			null,
			`created_at_gte=${year}-01-01&created_at_lte=${year}-12-31&_sort=name:DESC`,
			true
		).then((res) => {
			this.currentRaces = res
			API('races', null, `registrations.crew_members.id=${this.me.id}`, true).then((res) => {
				this.registeredRaces = res
				this.loading = false
			})
		})
	},
	methods: {
		setRegisteredRacesInView() {
			this.racesInView = this.registeredRaces
			this.changeView = !this.changeView
			this.active = 'registeredRaces'
		},
		setThisYearRacesInView() {
			this.racesInView = this.currentRaces
			this.changeView = !this.changeView
			this.active = 'currentRaces'
		},
	},
}
</script>

<style>
.wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>
