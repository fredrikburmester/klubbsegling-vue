<template>
	<div class="wrapper px-6 pt-2 pb-6">
		<div v-for="c in clubs" :key="c.id">
			<ClubCard :club="c" />
		</div>
	</div>
</template>

<script>
import ClubCard from '../components/ClubCard.vue'

import { API } from '../api/api'

export default {
	name: 'Clubs',
	components: {
		ClubCard,
	},
	data() {
		return {
			clubs: [],
		}
	},
	beforeMount() {
		API('clubs').then((clubs) => {
			this.clubs = clubs
		})
	},
}
</script>