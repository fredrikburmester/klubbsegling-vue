import 'mosha-vue-toastify/dist/style.css'
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import Boat from '../views/Boat.vue'
import Club from '../views/Club.vue'
import Clubs from '../views/Clubs.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Race from '../views/Race.vue'
import Races from '../views/Races.vue'
import Register from '../views/Register.vue'
import Article from '../views/Article.vue'
import Report from '../views/Report.vue'
import Articles from '../views/Articles.vue'
const Profile = () => import('../views/Profile.vue')

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
        path: '/club/:id',
        name: 'Klubb',
        component: Club,
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                { name: 'Klubbar', path: '/clubs', icon: 'anchor' },
                { name: 'Klubb', path: '/club/:id', icon: 'anchor' },
            ],
        },
    },
    {
        path: '/race/:id',
        name: 'Segling',
        component: Race,
        meta: {
            requiresAuth: true,
            breadcrumbs: [{ name: 'Seglingar', path: '/races', icon: 'flag' }],
        },
    },
    {
        path: '/race/:id/report',
        name: 'Rapoprtering',
        component: Report,
        meta: {
            requiresAuth: true,
            breadcrumbs: [{ name: 'Seglingar', path: '/races', icon: 'flag' }],
        },
    },
    {
        path: '/articles',
        name: 'Blogg',
        component: Articles,
        meta: {
            requiresAuth: false,
            breadcrumbs: [{ name: 'Blogg', path: '/articles', icon: 'rss' }],
        },
    },
    {
        path: '/article/:id',
        name: 'Blogginlägg',
        component: Article,
        meta: {
            requiresAuth: false,
            breadcrumbs: [{ name: 'Blogg', path: '/articles', icon: 'rss' }],
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
            breadcrumbs: [{ name: 'Profil', path: '/profile', icon: 'user' }],
        },
    },
    {
        path: '/boat/:id',
        name: 'Båt',
        component: Boat,
        meta: {
            requiresAuth: true,
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
        },
    },
    { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound },
    { path: '/:pathMatch(.*)', name: 'PageNotFound', component: PageNotFound },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath },
            })
        } else {
            // @ts-ignore
            const user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                } else {
                    next({ name: 'Home' })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
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
