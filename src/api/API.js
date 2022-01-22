import axios from 'axios'
import { API_URL } from '../store/actions/auth'

export const API = (type, id = null, query = null, auth = null) => {
	return new Promise(function (resolve, reject) {
		var url = `${API_URL}/${type}`

		if (id) {
			url = url + '/' + id
		}

		if (query) {
			url = url + '?' + query
		}

		var headers = null
		if (auth) {
			headers = {
				headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
			}
		}

		axios
			.get(url, headers)
			.then((res) => {
				if (process.env.NODE_ENV === 'development') {
					console.log('API: ', res.data)
				}
				resolve(res.data)
			})
			.catch((err) => {
				if (process.env.NODE_ENV === 'development') {
					console.log('API [Error]: ', err)
				}
				reject(err)
			})
	})
}
