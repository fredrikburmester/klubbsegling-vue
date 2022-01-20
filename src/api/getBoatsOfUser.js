import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { API_URL } from '../store/actions/auth'
import store from '../store/index'

export const getBoatsOfUser = (user) => {
	return new Promise(function (resolve, reject) {
		if (store.getters.getUserBoats.length > 0) {
			resolve(store.getters.getUserBoats)
		} else {
			axios
				.get(`${API_URL}/boats?sailors.username=${user.username}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					},
				})
				.then((res) => {
					store.commit('USER_BOATS', res.data)
					resolve(res.data)
				})
				.catch((err) => {
					createToast('Kunde inte hämta dina båtar...', {
						type: 'danger',
						timeout: 2000,
						position: 'top-right',
					})
					reject(err)
				})
		}
	})
}
