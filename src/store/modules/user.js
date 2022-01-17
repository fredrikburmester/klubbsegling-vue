// import axios from "axios";

import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from '../actions/user'
import { AUTH_LOGOUT } from '../actions/auth'

const state = { status: '', profile: {} }

const getters = {
	getProfile: (state) => state.profile,
	isProfileLoaded: (state) => !!state.profile.name,
}

const actions = {}

const mutations = {
	[USER_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[USER_SUCCESS]: (state, resp) => {
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
