<template>
	<div class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
		<ClubCard v-for="c in clubs" :key="c.id" :club="c" />
	</div>
</template>

<script>
import ClubCard from '../components/ClubCard.vue'

import { API } from '../api/API.ts'

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
		API('clubs', null, null, true).then((clubs) => {
			this.clubs = clubs
		})
	},
}
</script>
