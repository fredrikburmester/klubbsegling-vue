<template>
    <div v-if="loaded" class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
        <ClubCard v-for="c in clubs" :key="c.id" :club="c" />
    </div>
    <div v-else class="wrapper px-6 justify-self-center md:max-w-2xl">
        <LoadingCard v-for="i in 5" :key="i" />
    </div>
</template>

<script>
import ClubCard from '../components/ClubCard.vue'
import LoadingCard from '@/components/LoadingCard.vue'
import qs from 'qs'

import { API } from '../api/API.ts'

export default {
    name: 'Clubs',
    components: {
        ClubCard,
        LoadingCard,
    },
    data() {
        return {
            clubs: [],
            loaded: false,
        }
    },
    async mounted() {
        const query = qs.stringify(
            {
                populate: ['header', 'logo'],
            },
            {
                encodeValuesOnly: true, // prettify url
            }
        )
        API('clubs', null, query, true).then(clubs => {
            this.clubs = clubs
            this.loaded = true
        })
    },
    methods: {
        updateClubs() {
            const query = qs.stringify(
                {
                    // fields: ['id', 'name'],
                },
                {
                    encodeValuesOnly: true, // prettify url
                }
            )
            API('clubs', null, query, true).then(clubs => {
                this.clubs = clubs
            })
        },
    },
}
</script>
