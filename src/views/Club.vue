<template>
    <div v-if="loaded" class="wrapper max-w-md px-6 mt-6">
        <h1 class="font-bold text-3xl">{{ club.name }}</h1>
        <p class="">{{ club.shortName }}</p>
        <hr class="my-4" />
        <p>{{ club.description }}</p>
        <p v-if="!!club.adress">
            Adress:
            <a class="hover:underline hover:font-bold" :href="clubLocation(club.adress)">{{ club.adress || 'Saknar adress' }}</a>
        </p>
        <p v-if="!!club.website">
            Hemsida:
            <a class="hover:underline hover:font-bold" :href="club.website">{{ club.website || 'Saknar hemsida.' }}</a>
        </p>
    </div>
</template>

<script>
import { API, getClub } from '@/api/API'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import qs from 'qs'

export default {
    name: 'Club',
    components: {
        VueJsonPretty,
    },
    data() {
        return {
            id: this.$route.params.id,
            club: {},
            loaded: false,
        }
    },
    async mounted() {
        const club = await getClub(this.id)
        this.club = club.attributes
        this.loaded = true
    },
    methods: {
        clubLocation(url) {
            const query = qs.stringify({
                url: url,
            })
            return 'https://www.google.com/search?q=' + url
        },
    },
}
</script>
