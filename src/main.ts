import App from './App.vue'
import router from './router'
import store from './store'

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
import { API_URL } from './store/actions/auth'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import './registerServiceWorker'
import './index.css'
import './assets/tailwind.css'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
	cache,
	uri: `${API_URL}/graphql`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('jwt')}`,
	},
})

const apolloProvider = createApolloProvider({
	defaultClient: apolloClient,
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
	.use(apolloProvider)
	.component('font-awesome-icon', FontAwesomeIcon)
	.mount('#app')
