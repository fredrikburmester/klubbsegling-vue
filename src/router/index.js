import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Races from '../views/Races.vue'
import Race from '../views/Race.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
	{
		path: '/',
		name: 'Hem',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/races',
		name: 'Seglingar',
		component: Races,
	},
	{
		path: '/race/:id',
		name: 'Segling',
		component: Race,
	},
	{
		path: '/profile',
		name: 'Profil',
		component: Profile,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Registrera',
		component: Register,
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		meta: {
			requiresAuth: true,
			is_admin: true,
		},
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath },
			})
		} else {
			let user = JSON.parse(localStorage.getItem('user'))
			if (to.matched.some((record) => record.meta.is_admin)) {
				if (user.is_admin == 1) {
					next()
				} else {
					next({ name: 'Home' })
				}
			} else {
				next()
			}
		}
	} else if (to.matched.some((record) => record.meta.guest)) {
		if (localStorage.getItem('jwt') == null) {
			next()
		} else {
			next({ name: 'Home' })
		}
	} else {
		next()
	}
})

export default router
