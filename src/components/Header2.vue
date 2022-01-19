<template>
	<div>
		<div class="bg-white shadow-lg transition-all">
			<nav class="px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
				<div class="flex items-center justify-between">
					<router-link
						to="/"
						class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400"
					>
						<div class="w-8 flex content-center">
							<img class="mask mask-circle" src="/img/klubbsegling/logo.png" />
						</div>
					</router-link>
					<!-- Mobile menu button -->
					<div class="flex md:hidden" @click="showMenu = !showMenu">
						<button
							type="button"
							class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
						>
							<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
								<path
									fill-rule="evenodd"
									d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
								></path>
							</svg>
						</button>
					</div>
				</div>

				<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
				<transition>
					<div
						:class="showMenu ? 'flex' : 'hidden'"
						class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
					>
						<div
							class="text-lg font-bold text-gray-800 hover:text-blue-400 bg-primary p-2 rounded-box"
						>
							<router-link to="/">Hem</router-link>
						</div>
						<div class="text-lg font-bold text-gray-800 hover:text-blue-400">
							<router-link to="/races">Tävlingar</router-link>
						</div>
						<div class="text-lg font-bold text-gray-800 hover:text-blue-400">
							<router-link to="/profile">Profil</router-link>
						</div>
					</div>
				</transition>
			</nav>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Header',
	data() {
		return {
			showMenu: false,
		}
	},
}
</script>