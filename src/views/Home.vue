<template>
	<div class="wrapper px-6 pt-6 pb-6">
		<h1 class="font-bold text-2xl mt-4">Din statistik</h1>

		<div class="w-full shadow stats mt-4">
			<div class="stat">
				<div class="stat-title">Antal seglatser</div>
				<div class="stat-value text-primary">2</div>
				<div class="stat-desc">Som du deltagit i</div>
			</div>
			<div class="stat">
				<div class="stat-title">Senaste placering</div>
				<div class="stat-value">6a</div>
				<div class="stat-desc text-info">Segling 1</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-info"></div>
				<div class="stat-title">Båtar</div>
				<div class="stat-value text-info">1st</div>
				<div class="stat-desc"></div>
			</div>
		</div>
		<h1 class="font-bold text-2xl mt-4">Seglatser i år</h1>
		<div class="lg:flex lg:flex-wrap">
			<div v-for="r in currentRaces" :key="r.id" class="lg:mr-4 lg:w-3/12">
				<RaceCard2 :race="r" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../store/actions/auth'
import RaceCard from '../components/RaceCard.vue'
import RaceCard2 from '../components/RaceCard2.vue'
export default {
	name: 'Home',
	components: {
		RaceCard2,
	},
	data() {
		return {
			boats: null,
			races: null,
			me: this.$store.getters.getProfile,
			currentRaces: [],
		}
	},
	async beforeMount() {
		var today = new Date()
		var year = today.getFullYear()

		await axios
			.get(
				`${API_URL}/races?created_at_gte=${year}-01-01&created_at_lte=${year}-12-31&_sort=name:DESC`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					},
				}
			)
			.then((res) => {
				this.currentRaces = res.data
				console.log(res.data)
			})
	},
	async mounted() {
		// axios get from API_URL
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
