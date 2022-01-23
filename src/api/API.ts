import axios from 'axios'
import { API_URL } from '../store/actions/auth'
import qs from 'qs'

const API = (type: String, id?: String, query?: String, auth?: Boolean) => {
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
					console.log(`API [${type}]: `, res.data.data)
				}
				resolve(res.data.data)
			})
			.catch((err) => {
				if (process.env.NODE_ENV === 'development') {
					console.error(
						`API [${type}]: `,
						id,
						query,
						auth,
						localStorage.getItem('jwt'),
						err
					)
				}
				reject(err)
			})
	})
}

const getAllBoats = async () => {
	var boats = {}

	const query = qs.stringify(
		{
			sort: ['name:desc'],
			fields: ['name', 'owner', 'id'],
			publicationState: 'live',
		},
		{
			encodeValuesOnly: true, // prettify url
		}
	)
	await API('boats', '', query, true).then((res: any) => {
		boats = res
	})

	return boats
}

interface TimeRange {
	startDate: Date
	endDate: Date
}

const getAllRaces = async () => {
	var races = {}

	const query = qs.stringify(
		{
			sort: ['name:desc'],
			populate: ['images'],
			fields: ['id', 'name', 'description', 'start', 'end'],
			publicationState: 'live',
		},
		{
			encodeValuesOnly: true, // prettify url
		}
	)
	await API('races', '', query, true).then((res: any) => {
		races = res
	})

	return races
}

const getRacesThisYear = async () => {
	var races = {}

	const query = qs.stringify(
		{
			sort: ['name:desc'],
			fields: ['id', 'name', 'description', 'start', 'end'],
			publicationState: 'live',
		},
		{
			encodeValuesOnly: true, // prettify url
		}
	)
	await API('races', '', query, true).then((res: any) => {
		races = res
	})

	return races
}

const getRegisteredRaces = async (id: Number) => {
	var races = {}
	id = 1
	const query = qs.stringify(
		{
			populate: ['registrations', 'images'],
			fields: ['id', 'name', 'description', 'start', 'end'],

			filters: {
				registrations: {
					users: {
						id: {
							$eq: id,
						},
					},
				},
			},
		},
		{
			encodeValuesOnly: true, // prettify url
		}
	)

	await API('races', '', query, true).then((res: any) => {
		races = res
	})

	return races
}

export { API, getAllBoats, getAllRaces, getRacesThisYear, getRegisteredRaces }
