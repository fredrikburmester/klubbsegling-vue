import { createStore, createLogger, Store } from 'vuex'
import { InjectionKey } from 'vue'
import auth from './modules/auth'

// define your typings for the store state
export interface State {
	count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	modules: {
		auth,
	},
	plugins: [createLogger()],
})
