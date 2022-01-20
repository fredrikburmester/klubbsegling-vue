import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { API_URL } from '../store/actions/auth'

export const getBoatsOfUser = (user) => {
	return new Promise(function (resolve, reject) {
		axios
			.get(`${API_URL}/boats?sailors.username=${user.username}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			.then((res) => {
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
	})
}
