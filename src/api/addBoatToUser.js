import axios from 'axios'
import { API_URL } from '../store/actions/auth'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export const addBoatToUser = async (boats, newBoat, user) => {
    return new Promise(function (resolve, reject) {
        // Create a copy of the current array of boats so to not mutate the original
        var _boats = JSON.parse(JSON.stringify(boats))
        for (var b in _boats) {
            if (_boats[b].id === newBoat.id) {
                reject('Du har redan den här båten.')
                return false
            }
        }
        try {
            var boats_copy = []

            if (boats.length !== 0) {
                boats_copy = JSON.parse(JSON.stringify(boats))
            }

            boats_copy.push(newBoat)

            const headers = {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
            const data = {
                boats: boats_copy,
            }

            axios
                .put(`${API_URL}/users/${user.id}`, data, { headers })
                .then(res => {
                    resolve(newBoat)
                })
                .catch(err => {
                    if (process.env.NODE_ENV === 'development') {
                        console.error(err)
                    }
                    reject('Någonting gick snett.')
                })
        } catch (err) {
            reject('Någonting gick snett.')
        }
    })
}
