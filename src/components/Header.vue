<template>
	<div>
		<MobileNav :open="open" @close-nav="open = false" />
		<div class="navbar shadow-lg bg-white text-neutral-content">
			<img
				id="navbar-logo"
				class="rounded-full w-10 h-10 ml-2"
				src="@/assets/klubbsegling/logo.png"
				alt="logo"
			/>
			<span class="ml-4 text-lg font-bold text-black">klubbsegling</span>
			<div class="flex-none hidden px-2 mx-2 sm:flex">
				<div class="flex items-stretch">
					<router-link
						id="home"
						class="btn btn-sm rounded-btn mx-2"
						:class="activeButton('Hem')"
						to="/"
						><font-awesome-icon icon="home" class="mr-2" />Hem</router-link
					>
					<router-link
						id="races"
						class="btn btn-sm rounded-btn mx-2"
						:class="activeButton('Seglingar')"
						to="/races"
						><font-awesome-icon icon="flag" class="mr-2" />Tävlingar</router-link
					>
					<router-link
						id="profile"
						class="btn btn-sm rounded-btn mx-2"
						:class="activeButton('Profil')"
						to="/profile"
						><font-awesome-icon icon="profile" class="mr-2" />Profil</router-link
					>
				</div>
			</div>

			<div class="md:hidden ml-auto">
				<div
					class="btn bg-white border-0 focus:bg-white text-black hover:bg-white"
					@click="open = !open"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MobileNav from './MobileNav.vue'

// export component with name Navbar2
export default {
	name: 'Header',
	components: {
		MobileNav,
	},
	data() {
		return {
			open: false,
		}
	},
	computed: {
		// ...mapGetters({
		// 	loggedIn: 'isAuthenticated',
		// }),
	},
	methods: {
		activeButton(id) {
			if (this.$route.name == id) {
				return 'btn-primary text-white'
			} else {
				return 'text-black btn-ghost'
			}
		},
		activeButtonDropdown(id) {
			if (this.$route.name == id) {
				return 'btn-primary text-white'
			} else {
				return 'text-black btn-ghost'
			}
		},
		closeNav() {
			this.open = false
		},
	},
}
</script>

<style>
#bottom-nav {
	z-index: 100;
	--tw-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
		var(--tw-shadow);
}
.slide-fade-enter-active {
	transition: all 0.2s ease;
}
.slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(10px);
	opacity: 0;
}
</style>