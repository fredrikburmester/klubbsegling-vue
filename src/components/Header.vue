<template>
	<div>
		<div class="navbar shadow-lg bg-white text-neutral-content">
			<img
				id="navbar-logo"
				class="rounded-full w-10 h-10 ml-2"
				:src="require('@/assets/klubbsegling/logo.png')"
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
		</div>
		<div
			class="navbar fixed sm:hidden bg-white text-neutral-content justify-center bottom-0 z-10 w-screen"
		>
			<div class="sm:hidden px-2 mx-2 w-screen justify-center">
				<div class="flex items-stretch justify-around w-screen">
					<router-link
						id="home"
						to="/"
						class="btn btn-sm rounded-btn"
						:class="activeButton('Hem')"
					>
						<font-awesome-icon icon="home" class="mx-2" />
					</router-link>
					<router-link
						id="races"
						to="/races"
						class="btn btn-sm rounded-btn"
						:class="activeButton('Seglingar')"
					>
						<font-awesome-icon icon="flag" class="mx-2" />
					</router-link>
					<router-link
						id="profile"
						to="/profile"
						class="btn btn-sm rounded-btn"
						:class="activeButton('Profil')"
					>
						<font-awesome-icon icon="user" class="mx-2" />
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// export component with name Navbar2
export default {
	name: 'Header2',
	data() {
		return {
			active: true,
		}
	},
	computed: {
		loggedIn() {
			return this.$store.getters.isAuthenticated
		},
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
	},
}
</script>