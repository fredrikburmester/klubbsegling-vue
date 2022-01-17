<template>
	<div>
		<Header />
		<router-view />
	</div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	components: {
		// NavBar,
		Header,
	},
	computed: {
		loggedIn() {
			return this.$store.getters.isAuthenticated
		},
		isLoginOrRegister() {
			return this.$route.name != 'Login' && this.$route.name != 'Registrera'
		},
	},
}
</script>

<style></style>
