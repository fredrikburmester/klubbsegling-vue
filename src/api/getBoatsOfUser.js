import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { API_URL } from '../store/actions/auth'
import qs from 'qs'

// api function to get all boats
export const getBoats = async (user) => {
	const query = qs.stringify({
		_where: {
			username: user.username,
		},
	})
	try {
		const response = await axios.get(`${API_URL}/boats?`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
		})
		return response.data
	} catch (error) {
		createToast('Kunde inte hämta dina båtar...', {
			type: 'danger',
			timeout: 2000,
			position: 'top-right',
		})
		return []
	}
}
