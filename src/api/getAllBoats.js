import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { API_URL } from '../store/actions/auth'

export default getBoats = async (user) => {
	// const query = qs.stringify({
	// 	_where: {
	// 		username: user.username,
	// 	},
	// })
	await axios
		.get(`${API_URL}/boats`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
		})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			createToast('Kunde inte hämta dina båtar...', {
				type: 'danger',
				timeout: 2000,
				position: 'top-right',
			})
			return []
		})
}
