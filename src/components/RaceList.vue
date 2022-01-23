<template>
	<div v-if="loaded" class="pt-2 pb-6">
		<RaceCard v-for="race in races" :key="race.id" :race="race" />
	</div>
	<div v-else class="wrapper justify-self-center md:max-w-2xl">
		<LoadingCard v-for="i in 5" :key="i" />
	</div>
	<div
		v-if="loaded & (races.length === 0)"
		class="wrapper justify-self-center md:max-w-2xl"
	>
		<h1 class="font-bold text-xl">
			<span class="text-2xl">🤷🏻‍♂️ </span>Här var det tomt...
		</h1>
	</div>
</template>

<script>
import { API } from '@/api/API'
import RaceCard from '../components/RaceCard.vue'
import LoadingCard from './LoadingCard.vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
	name: 'RaceList',
	components: {
		RaceCard,
		LoadingCard,
	},
	props: {
		query: {
			type: String,
			required: false,
			default: '',
		},
	},
	data() {
		return {
			races: [],
			loaded: false,
		}
	},
	mounted() {
		API('races', null, this.query, true)
			.then((races) => {
				this.races = races
				this.loaded = true
			})
			.catch((err) => {
				console.error(err)
				createToast('Någonting gick snett...', {
					type: 'danger',
					timeout: 3000,
					position: 'top-right',
				})
			})
	},
}
</script>
