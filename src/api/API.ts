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
            populate: ['owners'],
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
            populate: ['owners', 'image'],
            filters: {
                owners: {
                    id: {
                        $eq: id,
                    },
                },
            },
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

const addBoatToUser = async (userId: Number, boat: any) => {
    var owners = boat.attributes.owners.data.push(userId)

    var data = {
        data: {
            owners: owners,
        },
    }

    await axios
        .put(`${API_URL}/boats/${boat.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(res => {
            return res.data
        })
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
            populate: ['images', 'registrations', 'partRaces'],
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
    const query = qs.stringify(
        {
            populate: ['registrations', 'images'],
            fields: ['id', 'name', 'description', 'start', 'end'],

            filters: {
                registrations: {
                    crew: {
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

const getAllRegistrations = async (id: Number) => {
    var registrations: any = []
    const query = qs.stringify(
        {
            populate: ['crew', 'boat', 'handicapSystem'],
            filters: {
                race: {
                    id: {
                        $eq: id,
                    },
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    await API('registrations', undefined, query, true).then((res: any) => {
        registrations = res
    })

    return registrations
}

const registerForRace = async (raceId: Number, boatId: Number, crew: Array<{ value: Number; label: String }>, hsysId: Number, userId: Number) => {
    if (!raceId || !boatId || !crew || !hsysId || !userId || crew.length === 0) {
        createToast('Du måste fylla i alla fält.', {
            type: 'danger',
        })
        return false
    }

    try {
        var userIds = []
        for (let i in crew) {
            let user = crew[i]
            userIds.push(user.value)
        }

        const data = {
            data: {
                race: raceId,
                boat: boatId,
                crew: userIds,
                handicapSystem: hsysId,
            },
        }

        var registered = false
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
                createToast('Något gick fel, ladda om sidan och försök igen.', {
                    type: 'danger',
                })
            })

        return registered
    } catch {
        createToast('Något gick fel, ladda om sidan och försök igen.', {
            type: 'danger',
        })
    }
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

const getClub = async (id: Number) => {
    const query = qs.stringify(
        {
            // fields: ['id', 'name'],
            populate: ['images'],
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    const club: any = await API('clubs', id, query, true)

    return club
}

const getBoat = async (id: Number) => {
    const query = qs.stringify(
        {
            // fields: ['id', 'name'],
            populate: ['image'],
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    const club: any = await API('boats', id, query, true)

    return club
}

const uploadProfilePicture = async (formData: any) => {
    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    }

    await axios
        .post(`${API_URL}/upload`, formData, headers)
        .then(res => {
            if (process.env.NODE_ENV === 'development') {
                console.log('API [uploadProfilePicture]:', res.data)
            }
        })
        .catch(err => {
            if (process.env.NODE_ENV === 'development') {
                console.error('API [uploadProfilePicture]:', localStorage.getItem('jwt'), err)
            }
        })
}

const getProfilePicture = async (id: Number) => {
    const query = qs.stringify(
        {
            populate: ['profilePicture'],
        },
        {
            encodeValuesOnly: true,
        }
    )
    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    }

    await axios
        .get(`https://cms.klubbsegling.se/api/users/${id}?${query}`, headers)
        .then(res => {
            if (process.env.NODE_ENV === 'development') {
                console.log('API [getProfilePicture]:', res.data)
            }
            return res.data
        })
        .catch(err => {
            if (process.env.NODE_ENV === 'development') {
                console.error('API [getProfilePicture]:', localStorage.getItem('jwt'), err)
            }
            return null
        })
}

const getMyRegistrations = async (userId: Number) => {
    var registrations: any = []
    const query = qs.stringify(
        {
            populate: ['race', 'crew', 'boat'],
            filters: {
                users: {
                    id: {
                        $eq: userId,
                    },
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify url
        }
    )

    await API('registrations', undefined, query, true).then((res: any) => {
        registrations = res
    })

    return registrations
}

const unRegisterFromRace = async (registrationId: Number) => {
    try {
        await axios
            .delete(`${API_URL}/registrations/${registrationId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
            .then(res => {
                createToast('Du är avregistrerad.', {
                    type: 'success',
                })
            })
            .catch(err => {
                createToast('Något gick fel, ladda om sidan och försök igen.', {
                    type: 'danger',
                })
            })
    } catch {
        createToast('Något gick fel, ladda om sidan och försök igen.', {
            type: 'danger',
        })
        return false
    }
}

const getArticle = async (id: Number) => {
    var article = {}
    const query = qs.stringify(
        {
            populate: ['authors', 'images'],
        },
        {
            encodeValuesOnly: true,
        }
    )

    await API('articles', id, query, true).then((res: any) => {
        article = res
        if (process.env.NODE_ENV === 'development') {
            console.log('API [article]', res)
        }
    })

    return article
}

export {
    API,
    getAllBoats,
    getUserBoats,
    getAllRaces,
    getRacesThisYear,
    getRegisteredRaces,
    getRace,
    getAllRegistrations,
    getAllUsers,
    registerForRace,
    getClub,
    getBoat,
    uploadProfilePicture,
    getProfilePicture,
    unRegisterFromRace,
    getMyRegistrations,
    addBoatToUser,
    getArticle,
}
