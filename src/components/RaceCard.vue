<template>
	<div class="card shadow lg:card-side my-4">
		<div class="card-body">
			<h1 class="text-left text-xl font-bold">{{ race.name }}</h1>
			<p class="text-left">{{ formatDate(race.start) }} - {{ formatDate(race.end) }}</p>
			<div class="justify-start card-actions">
				<router-link
					class="btn bg-primary border-0 hover:bg-primary-focus text-base-content"
					:to="`/race/${race.id}`"
				>
					Visa mer
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 ml-2 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						></path>
					</svg>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		race: {
			type: Object,
			default: () => {},
		},
	},
	data: function () {
		return {
			occ: '',
		}
	},
	methods: {
		formatDate(date) {
			if (date !== undefined) {
				date = new Date(date)
				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			} else return '-'
		},
		loggedIn() {
			return this.$store.getters.isAuthenticated
		},
		getUser() {
			return this.$store.getters.getProfile
		},
	},
}
</script>
