import axios from 'axios'
import { API_URL } from '../store/actions/auth'

export const register_for_race = async (user, race) => {
	var p = [...race.participants]
	p.push(user)
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('jwt')}`,
	}
	const data = {
		participants: p,
	}

	var res = await axios.put(`${API_URL}/races/${race.id}`, data, { headers })
	return res.data.participants
}
