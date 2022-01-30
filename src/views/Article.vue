<template>
    <div class="max-w-2xl px-6 pt-6 justify-self-center grid mb-16" v-if="!loading">
        <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
        <h1 class="text-xl font-bold">{{ article.subtitle || '' }}</h1>
        <div class="flex flex-row">
            <p class="mr-2">Skriven av:</p>
            <div class="badge badge-info mr-2" v-for="author in article.authors.data">{{ author.attributes.firstName }} {{ author.attributes.lastName }}</div>
        </div>
        <p class="text-sm italic">{{ article.publishedAt }}</p>
        <hr class="my-4" />
        <Markdown :source="article.body" class="mb-8" />
        <div class="carousel rounded-box">
            <div v-for="image in article.images.data" class="carousel-item">
                <img :src="`https://cms.klubbsegling.se${image.attributes.formats.small.url}`" />
            </div>
        </div>
    </div>
</template>

<script>
import { getArticle } from '@/api/API'
import Markdown from 'vue3-markdown-it'

export default {
    name: 'Article',
    components: {
        Markdown,
    },
    data() {
        return {
            article: null,
            loading: true,
        }
    },

    async mounted() {
        await getArticle(this.$route.params.id).then(article => {
            this.article = article.attributes
            this.loading = false
        })
    },
}
</script>
