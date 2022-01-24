import axios from 'axios'
import { API_URL } from '../store/actions/auth'
import qs from 'qs'
import { store } from '@/store'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const API = (type: String, id?: Number, query?: String, auth?: Boolean): Promise<Array<Object>> => {
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
            .then(res => {
                if (process.env.NODE_ENV === 'development') {
                    console.log(`API [${type}]: `, res.data.data)
                }
                resolve(res.data.data)
            })
            .catch(err => {
                if (process.env.NODE_ENV === 'development') {
                    console.error(`API [${type}]: `, id, query, auth, localStorage.getItem('jwt'), err)
                }
                reject(err)
            })
    })
}

const getAllBoats = async () => {
    var boats = store.getters.getBoats
    if (boats.length !== 0) {
        return boats
    }

    const query = qs.stringify(
        {
            sort: ['name:desc'],
            // fields: ['name', 'owner', 'id'],
            publicationState: 'live',
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )
    await API('boats', undefined, query, true).then((res: any) => {
        boats = res
    })

    return boats
}

const getUserBoats = async (id: Number) => {
    var boats = store.getters.getUserBoats
    if (boats.length !== 0) {
        return boats
    }

    const query = qs.stringify(
        {
            sort: ['name:desc'],
            populate: '*',
            filters: {
                user_boats_relations: {
                    user: {
                        id: {
                            $eq: id,
                        },
                    },
                },
            },
            // fields: ['name', 'owner', 'id'],
            publicationState: 'live',
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )
    await API('boats', undefined, query, true).then((res: any) => {
        boats = res
    })

    store.commit('USER_BOATS', boats)
    return boats
}

interface TimeRange {
    startDate: Date
    endDate: Date
}

const getAllRaces = async () => {
    var races = store.getters.getRaces
    if (races.length !== 0) {
        return races
    }

    const query = qs.stringify(
        {
            sort: ['name:desc'],
            populate: ['images', 'registrations.users'],
            fields: ['id', 'name', 'description', 'start', 'end'],
            publicationState: 'live',
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )
    await API('races', undefined, query, true).then((res: any) => {
        races = res
    })

    store.commit('RACES', races)
    return races
}

const getRace = async (id: Number) => {
    var races = store.getters.getRaces
    var race = null
    if (races.length !== 0) {
        for (let i in races) {
            race = races[i]
            if (race.id == id) {
                return race
            }
        }
    }

    const query = qs.stringify(
        {
            populate: ['images', 'registrations.users'],
            fields: ['id', 'name', 'description', 'start', 'end'],
            publicationState: 'live',
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )
    await API('races', id, query, true).then((res: any) => {
        race = res
    })

    return race
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
    await API('races', undefined, query, true).then((res: any) => {
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

    await API('races', undefined, query, true).then((res: any) => {
        races = res
    })

    return races
}

const getAllRegistrations = async () => {
    var registrations: any = []
    const query = qs.stringify(
        {
            populate: ['*'],
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    await API('registrations?populate=*', undefined, undefined, true).then((res: any) => {
        registrations = res
    })

    return registrations
}

const registerForRace = async (raceId: Number, boatId: Number, users: Array<{ value: Number; label: String }>, hsysId: Number, userId: Number) => {
    const query = qs.stringify(
        {
            populate: ['*'],
            filters: {
                $and: [
                    {
                        boat: boatId,
                    },
                    {
                        user: userId,
                    },
                ],
            },
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    const realation: any = await API('user-boats-relations', undefined, query, true)
    if (realation.length === 0) {
        return false
    } else {
        if (realation[0].attributes.relation_to_boat !== 'owner') {
            createToast('Du äger inte den båten.', {
                type: 'danger',
            })
            return false
        }
    }

    var userIds = []
    for (let i in users) {
        let user = users[i]
        userIds.push(user.value)
    }
    console.log('registerForRace', raceId, boatId, userIds, hsysId)
    var registered = false

    const data = {
        data: {
            race: raceId,
            boat: boatId,
            users: userIds,
            handicap_system: hsysId,
        },
    }

    await axios
        .post(`${API_URL}/registrations`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(res => {
            registered = true
            createToast('Du är nu registrerad!', {
                type: 'success',
            })
        })
        .catch(err => {
            console.error(err)
            registered = false
            createToast('Något gick fel, försök igen.', {
                type: 'danger',
            })
        })

    return registered
}

const getAllUsers = async () => {
    var users: Array<Object> = []
    const query = qs.stringify(
        {
            fields: ['id', 'name'],
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    }

    await axios
        .get(`${API_URL}/users`, headers)
        .then(res => {
            if (process.env.NODE_ENV === 'development') {
                console.log('API [users]:', res.data)
            }
            users = res.data
        })
        .catch(err => {
            if (process.env.NODE_ENV === 'development') {
                console.error('API [users]:', localStorage.getItem('jwt'), err)
            }
        })

    return users
}

export { API, getAllBoats, getUserBoats, getAllRaces, getRacesThisYear, getRegisteredRaces, getRace, getAllRegistrations, getAllUsers, registerForRace, unRegisterFromRace }
