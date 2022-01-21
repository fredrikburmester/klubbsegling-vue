import axios from 'axios'
import store from '../store/index'
import { createToast } from 'mosha-vue-toastify'
import { API_URL } from '../store/actions/auth'
import 'mosha-vue-toastify/dist/style.css'

export const getBoat = (id) => {
	return new Promise(function (resolve, reject) {
		axios
			.get(`${API_URL}/boats/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				createToast('Kunde inte ladda båten...', {
					type: 'danger',
					timeout: 2000,
					position: 'top-right',
				})
				reject(err)
			})
	})
}
