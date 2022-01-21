import axios from 'axios'
import { API_URL } from '../store/actions/auth'

export const getRegistrations = (raceId) => {
	return new Promise(function (resolve, reject) {
		axios
			.get(`${API_URL}/registrations?race=${raceId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
