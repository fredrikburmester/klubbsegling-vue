<template>
	<div class="">
		<div class="mt-16 grid">
			<router-view> </router-view>
		</div>
		<Header v-if="!$route.meta.hideNavigation" />
		<Footer class="" />
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
	components: {
		Header,
		Footer,
	},
	computed: {},
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
