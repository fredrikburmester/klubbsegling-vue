<template>
    <div class="wrapper lg:flex lg:justify-around lg:flex-row container sm:mx-auto lg:px-14">
        <div class="lg:mx-12 self-center px-8">
            <h1 class="mb-5 text-5xl font-bold text-left">Klubbsegling</h1>
            <p class="mb-5">
                Välkommen till Sveriges bästa hemsida för
                <br />seglingsentusiaster!
            </p>
            <router-link to="/articles">
                <div to="/articles" class="btn btn-primary">Läs vår blogg</div>
            </router-link>
        </div>
        <form class="h-96 lg:card lg:shadow-2xl lg:rounded-3xl lg:w-2/6 form-control self-center" @submit.prevent="login">
            .
            <div class="card-body">
                <label class="label">Användarnamn</label>
                <input v-model="username" class="input input-bordered" required type="text" placeholder="användarnamn" />
                <label class="label">Lösenord</label>
                <div class="relative">
                    <input v-model="password" class="input input-bordered w-full" required :type="showPassword ? 'text' : 'password'" placeholder="lösenord" />
                    <button @click="showPassword = !showPassword" class="absolute top-0 right-0 rounded-l-none btn btn-primary"><font-awesome-icon icon="eye" class="" /></button>
                </div>
                <hr />

                <button v-if="loading" class="btn btn-primary my-4 loading" type="submit"></button>
                <button v-else class="btn btn-primary my-4" type="submit">Logga in</button>
                <router-link :to="{ name: 'Registrera', params: { _username: this.username, _password: this.password } }">
                    <button class="underline text-gray-500">Registrera</button>
                </router-link>
            </div>
        </form>
    </div>
</template>
<script>
import { AUTH_REQUEST } from '../store/actions/auth'

export default {
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            showPassword: false,
        }
    },
    methods: {
        login() {
            this.loading = true
            const user = {
                identifier: this.username,
                password: this.password,
            }
            this.$store
                .dispatch(AUTH_REQUEST, user)
                .then(() => {
                    this.strapi.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl)
                    } else {
                        this.$router.push('/')
                    }
                })
                .catch(msg => {
                    console.log(msg)
                    console.log(msg.error)
                    this.loading = false
                })
        },
    },
}
</script>
