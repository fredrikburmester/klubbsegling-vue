<template>
    <div class="register-container lg:flex lg:justify-around lg:flex-row container sm:mx-auto lg:px-14 pb-16">
        <div class="lg:mx-12 self-center px-8">
            <h1 class="mb-5 text-5xl font-bold text-left">Klubbsegling</h1>
            <p class="mb-5">
                Välkommen till Sveriges bästa hemsida för
                <br />seglingsentusiaster!
            </p>
        </div>
        <form class="lg:card lg:shadow-2xl lg:rounded-3xl lg:w-2/6 form-control self-center" @submit.prevent="login">
            .
            <div class="card-body">
                <label class="label">Användarnamn</label>
                <input v-model="username" class="input input-bordered" required type="text" placeholder="ex. förnamnefternamn" />
                <label class="label">E-post</label>
                <input v-model="email" class="input input-bordered" required type="email" placeholder="ex. förnamn.efternamn@gmail.com" />
                <label class="label">Förnamn</label>
                <input v-model="firstName" class="input input-bordered" required type="text" placeholder="Förnamn" />
                <label class="label">Efternamn</label>
                <input v-model="lastName" class="input input-bordered" required type="text" placeholder="Efternamn" />
                <label class="label">Lösenord</label>
                <div class="relative">
                    <input v-model="password" class="input input-bordered w-full" required :type="showPassword ? 'text' : 'password'" placeholder="lösenord" />
                    <button @click="showPassword = !showPassword" class="absolute top-0 right-0 rounded-l-none btn btn-primary"><font-awesome-icon icon="eye" class="" /></button>
                </div>
                <hr />

                <button v-if="loading" class="btn btn-primary my-4 loading" type="submit"></button>
                <button v-else class="btn btn-primary my-4" type="submit" disabled>Registrera</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        nextUrl: {
            type: String,
            default: '/',
        },
    },
    data() {
        return {
            name: '',
            username: this.$route.params._username || '',
            email: '',
            password: this.$route.params._password || '',
            password_confirmation: '',
            is_admin: null,
            loading: false,
            showPassword: false,
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()

            if (this.password === this.password_confirmation && this.password.length > 0) {
                let url = 'http://localhost:3000/register'
                this.$http
                    .post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin,
                    })
                    .then(response => {
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        localStorage.setItem('jwt', response.data.token)

                        if (localStorage.getItem('jwt') != null) {
                            this.$emit('loggedIn')
                            if (this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl)
                            } else {
                                this.$router.push('/')
                            }
                        }
                    })
                    .catch(err => {
                        if (process.env.NODE_ENV === 'development') {
                            console.error(err)
                        }
                    })
            } else {
                this.password = ''
                this.passwordConfirm = ''

                return alert('Passwords do not match')
            }
        },
    },
}
</script>

<style>
.register-container {
    min-height: calc(100vh - 4rem - 240px);
}
</style>
