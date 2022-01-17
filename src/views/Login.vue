<template>
	<div class="container sm:mx-auto mt-48 px-10">
		<h1 class="text-5xl font-bold mb-5 text-center">Klubbsegling</h1>
		<form class="form-control" @submit.prevent="login">
			<label class="label">Användarnamn</label>
			<input
				v-model="username"
				class="input input-bordered"
				required
				type="text"
				placeholder="användarnamn"
			/>
			<label class="label">Lösenord</label>
			<input
				v-model="password"
				class="input input-bordered"
				required
				type="password"
				placeholder="lösenord"
			/>
			<hr />

			<button v-if="loading" class="btn btn-primary my-4 loading" type="submit"></button>
			<button v-else class="btn btn-primary my-4" type="submit">Login</button>
		</form>
	</div>
</template>
<script>
import { AUTH_REQUEST } from '../store/actions/auth'

export default {
	data() {
		return {
			email: '',
			password: '',
			loading: false,
		}
	},
	methods: {
		login: function () {
			this.loading = true
			const { username, password } = this
			const user = {
				identifier: username,
				password: password,
			}
			this.$store.dispatch(AUTH_REQUEST, user).then(() => {
				this.$emit('loggedIn')
				if (this.$route.params.nextUrl != null) {
					this.$router.push(this.$route.params.nextUrl)
				} else {
					this.$router.push('/')
				}
			})
		},
	},
}
</script>
