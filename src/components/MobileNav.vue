<template>
	<div class="fixed top-0 left-0 h-screen w-screen">
		<div class="p-2">
			<div class="card shadow-2xl lg:card-side bg-white text-primary-content z-100">
				<div class="card-body">
					<div class="flex flex-col">
						<router-link
							v-for="item in menuItems"
							:key="item"
							:to="item.route"
							class="py-4 hover:bg-gray-300 rounded-lg"
						>
							<span class="p-4 pr-8 text-black" @click="$emit('close-nav')">
								<font-awesome-icon :icon="item.icon" class="" />
								{{ item.text }}
							</span>
						</router-link>
					</div>
				</div>
				<hr class="mx-8" />
				<div class="py-8 flex flex-row justify-around">
					<p class="text-black">Om oss</p>
					<p class="text-black">Mer</p>
				</div>
			</div>
		</div>
		<div
			class="fixed top-0 left-0 h-screen w-screen bg-gray-200 opacity-50 z-99"
			@click="$emit('close-nav')"
		></div>
	</div>
</template>
<script>
export default {
	name: 'MobileNav',
	props: {
		active: {
			type: String,
			default: 'Home',
		},
	},
	emits: ['close-nav'],
	data() {
		return {
			menuItems: [
				{
					text: 'Hem',
					icon: 'home',
					route: '/',
				},
				{
					text: 'Seglingar',
					icon: 'flag',
					route: '/races',
				},
				{
					text: 'Profil',
					icon: 'user',
					route: '/profile',
				},
			],
		}
	},
	methods: {
		close() {
			this.$emit('close', true)
		},
	},
}
</script>
<style></style>