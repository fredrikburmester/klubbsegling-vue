import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

// api function to get all boats
export const getBoats = () => {
	return axios.get(`${API_URL}/boats`)
}
