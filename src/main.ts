import App from './App.vue'
import router from './router'
import store from './store'

import { registerSW } from 'virtual:pwa-register'

import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faHome,
	faFlag,
	faUser,
	faSlidersH,
	faShip,
	faCalendar,
	faAnchor,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './registerServiceWorker'
import './index.css'
import './assets/tailwind.css'

const updateSW = registerSW({
	onNeedRefresh() {},
	onOfflineReady() {},
})

library.add(faFlag)
library.add(faHome)
library.add(faSlidersH)
library.add(faUser)
library.add(faShip)
library.add(faCalendar)
library.add(faAnchor)

createApp(App)
	.use(store)
	.use(router)
	.component('font-awesome-icon', FontAwesomeIcon)
	.mount('#app')
