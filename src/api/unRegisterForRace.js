import axios from 'axios'
import { API_URL } from '../store/actions/auth'

export const unRegisterForRace = async boatId => {
    return new Promise(function (resolve, reject) {
        axios
            .get(`${API_URL}/registrations?boat.id=${boatId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
            .then(res => {
                if (res.data.length === 0) {
                    reject('Säker på att den båten är registrerad?')
                } else {
                    const id = res.data[0].id
                    axios
                        .delete(`${API_URL}/registrations/${id}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                            },
                        })
                        .then(res => {
                            resolve('Registreringen borttagen.')
                        })
                }
            })
    })
}
