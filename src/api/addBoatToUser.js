import axios from 'axios'
import { API_URL } from '../store/actions/auth'

export const addBoatToUser = async (boats, newBoat, user) => {
	return new Promise(function (resolve, reject) {
		// Create a copy of the current array of boats so to not mutate the original
		if (boats.indexOf(newBoat)) {
			reject('Du har redan den här båten.')
		} else {
			var boats_copy = boats.slice()
			boats_copy.push(newBoat)

			const headers = {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			}
			const data = {
				boats: boats_copy,
			}

			axios
				.put(`${API_URL}/users/${user.id}`, data, { headers })
				.then((res) => {
					resolve(newBoat)
				})
				.catch((err) => {
					if (process.env.NODE_ENV === 'development') {
						console.log(err)
					}
					reject('Någonting gick snett.')
				})
		}
	})
}
