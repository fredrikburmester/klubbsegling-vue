<template>
    <div v-if="loaded" class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
    <div v-else class="wrapper px-6 justify-self-center md:max-w-2xl">
        <LoadingCard v-for="i in 5" :key="i" />
    </div>
</template>

<script>
import ArticleCard from '../components/ArticleCard.vue'
import LoadingCard from '@/components/LoadingCard.vue'

import Strapi from 'strapi-sdk-js'
import { API_URL } from '@/store/actions/auth'
const strapi = new Strapi({
    url: API_URL,
})

export default {
    name: 'Articles',
    components: {
        ArticleCard,
        LoadingCard,
    },
    data() {
        return {
            articles: [],
            loaded: false,
        }
    },
    async mounted() {
        strapi
            .find('articles', {
                populate: '*',
            })
            .then(res => {
                this.articles = res.data
                this.loaded = true
            })
    },
    methods: {},
}
</script>
