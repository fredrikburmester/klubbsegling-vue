<template>
	<div v-if="loaded" class="wrapper overflow-x-scroll">
		<vue-json-pretty :data="club"> </vue-json-pretty>
	</div>
</template>

<script>
import { API } from '@/api/API'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
	name: 'Club',
	components: {
		VueJsonPretty,
	},
	data() {
		return {
			id: this.$route.params.id,
			club: {},
			loaded: false,
		}
	},
	mounted() {
		API('clubs', this.id, null, true).then((club) => {
			this.club = club
			this.loaded = true
		})
	},
}
</script>
