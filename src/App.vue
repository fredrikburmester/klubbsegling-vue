<template>
	<div>
		<Header v-if="!$route.meta.hideNavigation" />
		<router-view />
	</div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	components: {
		Header,
	},
	computed: {},
}
</script>

