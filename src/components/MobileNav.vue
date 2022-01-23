<template>
	<transition name="slide">
		<div v-show="open" class="fixed top-0 left-0 w-screen bg-base-100 z-50">
			<div class="fixed top-0 left-0 h-screen w-screen" @click="$emit('close-nav')"></div>
			<div class="">
				<div class="card rounded-none shadow-lg lg:card-side text-primary-content">
					<div class="card-body">
						<div class="flex flex-col">
							<div v-for="item in menuItems" :key="item" @click="$emit('close-nav')">
								<router-link :to="item.route" class="">
									<div class="py-4 hover:bg-primary rounded-lg">
										<span class="px-4 text-base-content">
											<font-awesome-icon :icon="item.icon" class="mr-4" />
											{{ item.text }}
										</span>
									</div>
								</router-link>
							</div>
						</div>
					</div>
					<hr class="mx-8 border-base-content opacity-10" />
					<div class="py-8 flex flex-row justify-around">
						<p class="text-base-content">Om oss</p>
						<p class="text-base-content">Mer</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
export default {
	name: 'MobileNav',
	props: {
		active: {
			type: String,
			default: 'Home',
		},
		open: {
			type: Boolean,
			default: false,
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
					text: 'Alla Seglingar',
					icon: 'flag',
					route: '/races',
				},
				{
					text: 'Klubbar',
					icon: 'anchor',
					route: '/clubs',
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

<style>
.slide-enter-active,
.slide-leave-active {
	transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateY(-400px);
}
</style>
