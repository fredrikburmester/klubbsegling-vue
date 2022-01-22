<template>
	<div v-if="!loading" class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
		<h1 class="font text-sm mt-4 opacity-50">Välj vy</h1>

		<div class="w-full shadow stats mt-4">
			<div
				class="stat cursor-pointer"
				:class="{ 'bg-gray-100': active == 'thisYear' }"
				@click="
					setActive(
						`created_at_gte=${getCurrentYear}-01-01&created_at_lte=${getCurrentYear}-12-31&_sort=name:DESC`,
						'thisYear'
					)
				"
			>
				<div class="stat-title">Seglatser i år</div>
				<div class="stat-value text-info">{{ racesThisYear }}</div>
				<div class="stat-desc">{{ getCurrentYear }}</div>
			</div>
			<div
				class="stat cursor-pointer"
				:class="{ 'bg-gray-100': active == 'registered' }"
				@click="setActive(`registrations.crew_members.id=${me.id}`, 'registered')"
			>
				<div class="stat-title">Registrerad</div>
				<div class="stat-value text-primary">{{ registeredRaces }}</div>
				<div class="stat-desc"></div>
			</div>
		</div>
		<!-- <h1 class="font-bold text-2xl mt-4">Seglatser i år</h1> -->
		<RaceList :key="updateList" :query="raceListQuery" />
	</div>
</template>

<script>
import RaceList from '../components/RaceList.vue'
import { API } from '../api/API.ts'

export default {
	name: 'Home',
	components: {
		RaceList,
	},
	data() {
		return {
			me: this.$store.getters.getProfile,
			active: 'thisYear',
			racesThisYear: 0,
			registeredRaces: 0,
			raceListQuery: '',
			boats: 0,
			loading: true,
			updateList: false,
		}
	},
	computed: {
		getCurrentYear() {
			var now = new Date()
			return now.getFullYear()
		},
	},
	mounted() {
		// Get races this year
		API(
			'races/count',
			null,
			`created_at_gte=${this.getCurrentYear}-01-01&created_at_lte=${this.getCurrentYear}-12-31&_sort=name:DESC`,
			true
		).then((nrOfRaces) => {
			this.racesThisYear = nrOfRaces
			API('races/count', null, `registrations.crew_members.id=${this.me.id}`, true)
				.then((registeredRaces) => {
					this.registeredRaces = registeredRaces
					this.loading = false
				})
				.catch((err) => {
					console.log(err)
				})
		})
	},
	methods: {
		setActive(query, current) {
			console.log(query, current)
			this.raceListQuery = query
			this.active = current
			this.updateList = !this.updateList
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
