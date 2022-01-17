import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
require('dotenv').config()

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faFlag, faUser, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/tailwind.css'

library.add(faFlag)
library.add(faHome)
library.add(faSlidersH)
library.add(faUser)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
