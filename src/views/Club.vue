<template>
    <div v-if="loaded" class="w-screen h-64 bg-cover relative" :style="`background-image: url(${getHeaderURL}); background-position: center;`"></div>
    <div v-if="loaded" class="wrapper max-w-2xl px-6 mt-6 lg:mt-12 justify-self-center">
        <h1 class="font-bold text-3xl">{{ club.name }}</h1>
        <p class="">{{ club.shortName }}</p>
        <hr class="my-4" />
        <p v-if="!!club.adress" class="text-gray-500 mb-2">
            Adress:
            <a class="underline hover:font-bold" :href="clubLocation(club.adress)">{{ club.adress || 'Saknar adress' }}</a>
        </p>
        <p v-if="!!club.website" class="text-gray-500">
            Hemsida:
            <a class="underline hover:font-bold" :href="club.website">{{ club.website || 'Saknar hemsida.' }}</a>
        </p>
        <hr class="my-4" />
        <Markdown :source="club.description" class="article mb-8 md:max-w-2xl" />
    </div>
</template>

<script>
import { API, getClub } from '@/api/API'
import { IMG_URL } from '@/store/actions/auth'
import VueJsonPretty from 'vue-json-pretty'
import Markdown from 'vue3-markdown-it'

import 'vue-json-pretty/lib/styles.css'
import qs from 'qs'

import { getLargestImageFromFormats } from '@/lib/utils'

export default {
    name: 'Club',
    components: {
        VueJsonPretty,
        Markdown,
    },
    data() {
        return {
            id: this.$route.params.id,
            club: {},
            loaded: false,
        }
    },
    async mounted() {
        const club = await this.strapi.find('clubs', {
            populate: '*',
            filters: {
                id: this.id,
            },
        })
        this.club = club.data[0].attributes
        this.loaded = true
    },
    computed: {
        getHeaderURL() {
            return IMG_URL + getLargestImageFromFormats(this.club.header.data.attributes.formats)
        },
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
<style></style>
