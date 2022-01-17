import axios from 'axios'
const API_URL = 'http://localhost:3000/api'

// api function to get all boats
export const getRaces = async () => {
	var res = await axios.post(`${API_URL}/find/races`, {})
	return res.data
}
