<template>
    <div v-if="!loading" class="article wrapper max-w-2xl justify-self-center">
        <div class="flex flex-1 flex-col px-6 pt-6 lg:pt-12">
            <header class="flex-none">
                <h1 class="text-5xl font-bold mb-2">{{ article.title }}</h1>
                <p class="text-sm italic mb-2">Publicerad: {{ formatDate(article.publishedAt) }}</p>
                <hr class="my-4" />
            </header>
            <Markdown :source="article.body" class="" />
        </div>

        <Slider :article="article" :key="article.id" v-if="!!article.images.data" />

        <div id="article" class="flex flex-1 flex-col px-6 mb-6">
            <footer class="h-24 flex-none">
                <hr class="my-4" />
                <p class="mr-2 mt-2 italic text-gray-400">Skriven av:</p>
                <div class="flex mb-2 flex-wrap">
                    <div class="badge badge-info mr-2 mt-2" v-for="author in article.authors.data">{{ author.attributes.firstName }} {{ author.attributes.lastName }}</div>
                </div>
            </footer>
        </div>
    </div>

    <LoadingArticle v-else="loading" />
</template>

<script>
import { getArticle } from '@/api/API'
import Markdown from 'vue3-markdown-it'
import LoadingArticle from '@/components/LoadingArticle.vue'
import Slider from '@/components/Slider.vue'

export default {
    name: 'Article',
    components: {
        Markdown,
        LoadingArticle,
        Slider,
    },
    data() {
        return {
            article: {},
            loading: true,
        }
    },
    async mounted() {
        await this.updateArticle()
    },
    watch: {
        $route(to, from) {
            this.updateArticle()
        },
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('sv-SE')
        },
        async updateArticle() {
            this.strapi
                .find('articles', {
                    populate: '*',
                    filters: {
                        slug: {
                            $eq: this.$route.params.id,
                        },
                    },
                })
                .then(res => {
                    if (res.data.length == 1) {
                        this.article = res.data[0].attributes
                        setTimeout(() => {
                            this.loading = false
                        }, 300)
                    } else {
                        this.$router.push('/articles')
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$router.push('/articles')
                })
        },
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
