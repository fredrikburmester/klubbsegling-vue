import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from '../actions/user'
import { API_URL } from '../actions/auth'

import axios from 'axios'

const state = {
	token: localStorage.getItem('jwt') || '',
	status: '',
	profile: {},
	hasLoadedOnce: false,
}

const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status,
	getProfile: (state) => state.profile,
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

					resolve(resp)
				})
				.catch((err) => {
					commit(AUTH_ERROR, err)
					localStorage.removeItem('user-token')
					reject(err)
				})
		})
	},
	[AUTH_LOGOUT]: ({ commit }) => {
		return new Promise((resolve) => {
			commit(AUTH_LOGOUT)
			localStorage.removeItem('user-token')
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
}

export default {
	state,
	getters,
	actions,
	mutations,
}
