<template>
    <div id="header">
        <div class="fixed top-0 w-screen left-0 navbar shadow-lg bg-base-100 text-base-content z-50">
            <img id="navbar-logo" class="rounded-full w-10 h-10 ml-2 cursor-pointer" src="/img/klubbsegling/logo.png" alt="logo" @click="goToHome" />
            <div class="breadcrumbs md:hidden mx-4 text-gray-700">
                <ul>
                    <li>
                        <router-link to="/"> <font-awesome-icon icon="home" class="mr-2" />Hem </router-link>
                    </li>
                    <li v-for="r in $route.meta.breadcrumbs" :key="r.name">
                        <router-link :to="r.path"> <font-awesome-icon :icon="r.icon" class="mr-2" />{{ r.name }} </router-link>
                    </li>
                </ul>
            </div>
            <div class="flex-none hidden px-2 mx-2 md:flex">
                <div class="flex items-stretch">
                    <router-link id="home" class="btn btn-sm rounded-btn mx-2" :class="activeButton('Hem')" to="/"><font-awesome-icon icon="home" class="mr-2" />Hem</router-link>
                    <router-link id="races" class="btn btn-sm rounded-btn mx-2" :class="activeButton('Seglingar')" to="/races"><font-awesome-icon icon="flag" class="mr-2" />Tävlingar</router-link>
                    <router-link id="clubs" class="btn btn-sm rounded-btn mx-2" :class="activeButton('Klubbar')" to="/clubs"><font-awesome-icon icon="anchor" class="mr-2" />Klubbar</router-link>
                    <router-link id="articles" class="btn btn-sm rounded-btn mx-2" :class="activeButton('Blogg')" to="/articles"><font-awesome-icon icon="rss" class="mr-2" />Blogg</router-link>
                    <router-link id="profile" class="btn btn-sm rounded-btn mx-2" :class="activeButton('Profil')" to="/profile"><font-awesome-icon icon="user" class="mr-2" />Profil</router-link>
                </div>
            </div>

            <div class="md:hidden ml-auto">
                <div class="btn border-0 bg-transparent text-base-content hover:bg-primary" @click="open = !open">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </div>
            </div>
        </div>
        <MobileNav :open="open" @close-nav="open = false" />
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
    mounted() {},
    methods: {
        activeButton(id) {
            if (this.$route.name == id) {
                return 'btn-primary text-base-content'
            } else {
                return 'btn-ghost'
            }
        },
        activeButtonDropdown(id) {
            if (this.$route.name == id) {
                return 'btn-primary text-base-content'
            } else {
                return 'btn-ghost'
            }
        },
        closeNav() {
            this.open = false
        },
        goToHome() {
            this.$router.push('/')
        },
    },
}
</script>

<style>
#bottom-nav {
    z-index: 100;
    --tw-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
