import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { API_URL } from '../store/actions/auth'

export const getAllUsers = async () => {
	return new Promise(function (resolve, reject) {
		axios
			.get(`${API_URL}/users`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				createToast('Kunde inte hämta användare...', {
					type: 'danger',
					timeout: 2000,
					position: 'top-right',
				})
				reject(err)
			})
	})
}
