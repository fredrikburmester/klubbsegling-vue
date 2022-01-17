<template>
	<div>
		<div class="form-control m-6" @submit.prevent="login">
			<h1 class="font-bold text-xl">Logga in</h1>
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
			<button class="btn btn-primary my-4" type="submit">Login</button>
		</div>
	</div>
</template>
<script>
import { AUTH_REQUEST } from '../store/actions/auth'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		login: function () {
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
					this.toast('Välkommen!', 'default')
				}
			})
		},
		toast: function (msg, type = 'success', timeout = 3000, position = 'top-right') {
			createToast(msg, {
				type: type,
				timeout: timeout,
				position: position,
			})
		},
	},
}
</script>
