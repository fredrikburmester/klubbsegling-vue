<template>
	<div class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
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
