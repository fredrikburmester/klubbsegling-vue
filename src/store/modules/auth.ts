import {
	AUTH_REQUEST,
	AUTH_ERROR,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
	USER_REQUEST,
	USER_ERROR,
	USER_SUCCESS,
	USER_BOATS,
} from '../actions/auth'

import axios from 'axios'
import { API_URL } from '../actions/auth'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const getProfileFromServer = () => {
	return new Promise((resolve, reject) => {})
}

interface stateProps {
	token: string
	status: string
	profile: Object
	hasLoadedOnce: boolean
	userBoats: Array<Object>
}

const state: {
	token: string
	status: string
	profile: Object
	hasLoadedOnce: boolean
	userBoats: Array<Object>
} = {
	token: localStorage.getItem('jwt') || '',
	status: '',
	// @ts-ignore
	profile: JSON.parse(localStorage.getItem('user')) || {},
	hasLoadedOnce: false,
	userBoats: [],
}

const getters = {
	isAuthenticated: (state: stateProps) => !!state.token,
	getToken: (state: stateProps) => state.token,
	authStatus: (state: stateProps) => state.status,
	getProfile: (state: stateProps) => state.profile,
	getUserBoats: (state: stateProps) => state.userBoats,
}

const actions = {
	[AUTH_REQUEST]: ({ commit /*dispatch*/ }: { commit: Function }, user: Object) => {
		return new Promise((resolve, reject) => {
			commit(AUTH_REQUEST)
			axios({
				url: `${API_URL}/auth/local`,
				data: user,
				method: 'POST',
			})
				.then((resp) => {
					localStorage.setItem('user', JSON.stringify(resp.data.user))
					localStorage.setItem('jwt', resp.data.jwt)
					// Here set the header of your ajax library to the token value.
					axios.defaults.headers.common['Authorization'] = resp.data.token

					commit(AUTH_SUCCESS, resp.data)
					commit(USER_SUCCESS, resp.data.user)

					createToast('Välkommen!', {
						type: 'success',
						timeout: 2000,
						position: 'top-right',
					})
					resolve(resp)
				})
				.catch((err) => {
					if (process.env.NODE_ENV === 'development') {
						console.error(err)
					}
					commit(AUTH_ERROR, err)
					localStorage.removeItem('jwt')
					createToast('Någonting gick snett...', {
						type: 'danger',
						timeout: 2000,
						position: 'top-right',
					})
					reject(err)
				})
		})
	},
	[AUTH_LOGOUT]: ({ commit }: { commit: Function }): Promise<void> => {
		return new Promise((resolve) => {
			commit(AUTH_LOGOUT)
			localStorage.removeItem('jwt')
			createToast('Du är nu utloggad.', {
				type: 'danger',
				timeout: 2000,
				position: 'top-right',
			})
			resolve()
		})
	},
}

const mutations = {
	[AUTH_REQUEST]: (state: stateProps) => {
		state.status = 'loading'
	},
	[AUTH_SUCCESS]: (state: stateProps, resp: stateProps) => {
		state.status = 'success'
		state.token = resp.token
		state.hasLoadedOnce = true
	},
	[AUTH_ERROR]: (state: stateProps) => {
		state.status = 'error'
		state.hasLoadedOnce = true
	},
	[AUTH_LOGOUT]: (state: stateProps) => {
		state.token = ''
	},
	[USER_REQUEST]: (state: stateProps) => {
		state.status = 'loading'
	},
	[USER_SUCCESS]: (state: stateProps, resp: Object) => {
		;('setting user')
		state.status = 'success'
		state.profile = resp
	},
	[USER_ERROR]: (state: stateProps) => {
		state.status = 'error'
	},
	[AUTH_LOGOUT]: (state: stateProps) => {
		state.profile = {}
	},
	[USER_BOATS]: (state: stateProps, boats: Array<Object>) => {
		state.userBoats = boats
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
