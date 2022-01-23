import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const Profile = () => import('../views/Profile.vue')
import Races from '../views/Races.vue'
import Clubs from '../views/Clubs.vue'
import Race from '../views/Race.vue'
import Boat from '../views/Boat.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import 'mosha-vue-toastify/dist/style.css'
import PageNotFound from '../views/PageNotFound.vue'

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
		meta: {
			requiresAuth: true,
			breadcrumbs: [{ name: 'Seglingar', path: '/races', icon: 'flag' }],
		},
	},
	{
		path: '/clubs',
		name: 'Klubbar',
		component: Clubs,
		meta: {
			requiresAuth: true,
			breadcrumbs: [{ name: 'Klubbar', path: '/clubs', icon: 'anchor' }],
		},
	},
	{
		path: '/race/:id',
		name: 'Segling',
		component: Race,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{ name: 'Seglingar', path: '/races', icon: 'flag' },
				{ name: 'Segling', path: '/races/:id', icon: 'calendar' },
			],
		},
	},
	{
		path: '/profile',
		name: 'Profil',
		component: Profile,
		meta: {
			requiresAuth: true,
			breadcrumbs: [{ name: 'Profil', path: '/profile', icon: 'user' }],
		},
	},
	{
		path: '/profile/boat/:id',
		name: 'Min Båt',
		component: Boat,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{ name: 'Profil', path: '/profile', icon: 'user' },
				{ name: 'Båt', path: '/profile/boat/:id', icon: 'ship' },
			],
		},
	},
	{
		path: '/boat/:id',
		name: 'Båt',
		component: Boat,
		meta: {
			requiresAuth: true,
			breadcrumbs: [{ name: 'Båt', path: '/boat/:id' }],
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { hideNavigation: true },
	},
	{
		path: '/register',
		name: 'Registrera',
		component: Register,
		meta: { hideNavigation: true },
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
	{ path: "/:pathMatch(.*)*", name: 'PageNotFound', component: PageNotFound },
	{ path: "/:pathMatch(.*)", name: 'PageNotFound', component: PageNotFound }
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
			// @ts-ignore
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
