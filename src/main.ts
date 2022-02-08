import { library } from '@fortawesome/fontawesome-svg-core'
import { faAnchor, faCalendar, faFlag, faHome, faShip, faSlidersH, faUser, faEye, faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/tailwind.css'
import './index.css'
// import './registerServiceWorker'
import router from './router'
import { key, store } from './store'

import Strapi from 'strapi-sdk-js'
import { API_URL } from './store/actions/auth'
const strapi = new Strapi({
    url: API_URL,
})
strapi.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

library.add(faFlag)
library.add(faHome)
library.add(faSlidersH)
library.add(faUser)
library.add(faShip)
library.add(faCalendar)
library.add(faAnchor)
library.add(faEye)
library.add(faRss)

let app = createApp(App)

app.config.globalProperties.strapi = strapi

app.use(store, key).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
