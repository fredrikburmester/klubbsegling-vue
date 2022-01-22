<template>
	<div class="wrapper px-6">
		<Races />
	</div>
</template>

<script>
import Races from '../components/Races.vue'

export default {
	name: 'RacesView',
	components: {
		Races,
	},
}
</script>

<style>
.wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>
