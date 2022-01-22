<template>
	<div
		class="lg:flex lg:justify-around lg:flex-row container sm:mx-auto mt-12 lg:mt-32 lg:px-14 pb-48"
	>
		<div class="lg:mx-12 self-center px-8">
			<h1 class="mb-5 text-5xl font-bold text-left">Klubbsegling</h1>
			<p class="mb-5">Välkommen till Sveriges bästa hemsida för <br />seglingsentusiaster!</p>
		</div>
		<form
			class="lg:card lg:shadow-2xl lg:rounded-3xl lg:w-2/5 form-control"
			@submit.prevent="login"
		>
			.
			<div class="card-body">
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
			</div>
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
