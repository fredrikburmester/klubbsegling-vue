<template>
    <div id="article" v-if="!loading" class="wrapper max-w-2xl justify-self-center">
        <div class="flex flex-1 flex-col px-6 pt-6 lg:pt-12">
            <header class="flex-none">
                <h1 class="text-5xl font-bold mb-2">{{ article.title }}</h1>
                <p class="text-sm italic mb-2">Publicerad: {{ formatDate(article.publishedAt) }}</p>
                <hr class="my-4" />
            </header>
            <div class="">
                <Markdown :source="article.body" class="" />
            </div>
        </div>

        <Slider :article="article" :key="article.id" v-if="!!article.images.data" />

        <div class="flex flex-1 flex-col px-6 mb-6">
            <footer class="h-24 flex-none">
                <hr class="my-4" />
                <p class="mr-2 mt-2 italic text-gray-400">Skriven av:</p>
                <div class="flex mb-2 flex-wrap">
                    <div class="badge badge-info mr-2 mt-2" v-for="author in article.authors.data">{{ author.attributes.firstName }} {{ author.attributes.lastName }}</div>
                </div>
            </footer>
        </div>
    </div>

    <LoadingArticle v-show="loading" />
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
            await getArticle(this.$route.params.id).then(article => {
                this.article = article.attributes
                // wait one second
                setTimeout(() => {
                    this.loading = false
                }, 300)
            })
        },
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#article {
    font-family: 'Playfair Display', serif;
}
blockquote {
    font-style: italic;
    font-size: 1.2rem;
    word-wrap: normal;
    display: inline;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: block;
    text-align: center;
}
blockquote > p {
    display: inline;
}

blockquote::before {
    content: '“';
    font-size: 2rem;
    line-height: 1;
}
blockquote::after {
    content: '”';
    font-size: 2rem;
    line-height: 1;
}
pre {
    max-width: 100%;
    background-color: hsla(var(--n) / var(--tw-bg-opacity, 1));
    border-radius: var(--tw-border-radius, 0.25rem);
    padding: var(--tw-space-x-2, 1rem);
    overflow-x: scroll;
}
.hljs {
    overflow: hidden;
    overflow-x: auto;
    position: relative;
    background-color: hsla(var(--n) / var(--tw-bg-opacity, 1));
    border-radius: var(--rounded-box, 1rem);
    color: white;
}
.hljs-keyword {
    color: rgb(204, 83, 103);
}
.hljs-params {
    color: rgb(50, 190, 214);
}
.hljs-number {
    color: greenyellow;
}
h2 {
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
