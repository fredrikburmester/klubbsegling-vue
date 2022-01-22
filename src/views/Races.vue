<template>
	<div class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
		<RaceList />
	</div>
</template>

<script>
import RaceList from '../components/RaceList.vue'

export default {
	name: 'Races',
	components: {
		RaceList,
	},
}
</script>

<style>
.wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>
