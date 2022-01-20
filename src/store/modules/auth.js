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

const state = {
	token: localStorage.getItem('jwt') || '',
	status: '',
	profile: JSON.parse(localStorage.getItem('user')) || {},
	hasLoadedOnce: false,
	userBoats: [],
}

const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status,
	getProfile: (state) => state.profile,
	getUserBoats: (state) => state.userBoats,
}

const actions = {
	[AUTH_REQUEST]: ({ commit /*dispatch*/ }, user) => {
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
						console.log(err)
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
	[AUTH_LOGOUT]: ({ commit }) => {
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
	[AUTH_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[AUTH_SUCCESS]: (state, resp) => {
		state.status = 'success'
		state.token = resp.token
		state.hasLoadedOnce = true
	},
	[AUTH_ERROR]: (state) => {
		state.status = 'error'
		state.hasLoadedOnce = true
	},
	[AUTH_LOGOUT]: (state) => {
		state.token = ''
	},
	[USER_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[USER_SUCCESS]: (state, resp) => {
		;('setting user')
		state.status = 'success'
		state.profile = resp
	},
	[USER_ERROR]: (state) => {
		state.status = 'error'
	},
	[AUTH_LOGOUT]: (state) => {
		state.profile = {}
	},
	[USER_BOATS]: (state, boats) => {
		state.userBoats = boats
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
