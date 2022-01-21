import axios from 'axios'
import { API_URL } from '../store/actions/auth'

const editRegistration = false
const registrationOpen = true

export const registerForFace = (user, boatId, crew, raceId, hsys) => {
	return new Promise(function (resolve, reject) {
		if (registrationOpen === false) {
			reject('Registrering stängd.')
			return 0
		}

		const headers = {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		}

		axios
			.get(`${API_URL}/registrations?boat.id=${boatId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			.then((res) => {
				console.log(res.data)
				if (res.data.length === 0) {
					// Create registration
					var crew_members = []
					for (let i in crew) {
						crew_members.push(crew[i].value)
					}

					const data = {
						boat: boatId,
						crew_members: crew_members,
						race: raceId,
						handicap_system: hsys,
					}
					console.log('Data:', data)
					axios.post(`${API_URL}/registrations`, data, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('jwt')}`,
						},
					})
				} else {
					if (editRegistration === false) {
						reject('Registreringen går inte att ändra.')
						return 0
					}
					// Update registration
					var crew_members = []
					for (let i in crew) {
						crew_members.push(crew[i].value)
					}

					const data = {
						handicap_system: hsys,
						crew_members: crew_members,
					}
					axios.post(`${API_URL}/registrations/${res.data.id}`, data, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('jwt')}`,
						},
					})
				}
			})
			.catch((err) => {
				console.log(err)
			})
	})
}
