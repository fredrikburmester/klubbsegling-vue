<template>
    <div class="wrapper max-w-2xl justify-self-center px-6 pt-6">
        <router-link to="w">
            <button class="btn">Skapa Tävling</button>
        </router-link>
    </div>
</template>

<script>
import { API_URL } from '@/store/actions/auth'
import axios from 'axios'
import qs from 'qs'

export default {
    mounted() {
        const query = qs.stringify(
            {
                populate: ['role'],
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
        axios.get(`${API_URL}/users/me?${query}`, headers).then(res => {})
        var a = this.$store.getters.getProfile
    },
}
</script>
