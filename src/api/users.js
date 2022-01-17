import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { API_URL } from '../store/actions/auth'

// api function to get all boats
export const getUsers = async () => {
	try {
		const response = await axios.get(`${API_URL}/users`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
		})
		return response.data
	} catch (error) {
		createToast('Någonting gick snett...', {
			type: 'danger',
			timeout: 2000,
			position: 'top-right',
		})
		return []
	}
}
