import { library } from '@fortawesome/fontawesome-svg-core'
import { faAnchor, faCalendar, faFlag, faHome, faShip, faSlidersH, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { registerSW } from 'virtual:pwa-register'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './index.css'
// import './registerServiceWorker'
import router from './router'
import { key, store } from './store'

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

createApp(App).use(store, key).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
