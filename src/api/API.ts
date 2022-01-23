import axios from 'axios'
import { API_URL } from '../store/actions/auth'

export const API = (type: string, id?: string, query?: string, auth?: boolean) => {
	return new Promise(function (resolve, reject) {
		let url = `${API_URL}/${type}`

		if (id) {
			url = url + '/' + id
		}

		if (query) {
			url = url + '?' + query
		}

		let headers = {}
		if (auth) {
			headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
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
