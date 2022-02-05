<template>
    <transition name="fade" mode="out-in">
        <div v-if="!loading" id="article" class="wrapper flex flex-1 flex-col max-w-2xl px-6 pt-6 lg:pt-12 justify-self-center mb-16">
            <header class="flex-none">
                <h1 class="text-5xl font-bold mb-2">{{ article.title }}</h1>
                <p class="text-sm italic mb-2">Publicerad: {{ formatDate(article.publishedAt) }}</p>
                <hr class="my-4" />
            </header>
            <body class="flex flex-1 flex-col self-start grow my-4">
                <Markdown :source="article.body" class="mb-8 max-w-xs md:max-w-xl" />
                <div class="p-4 space-x-4 carousel carousel-center bg-blue-400 rounded-box">
                    <div v-for="image in article.images.data" class="carousel-item">
                        <img :src="`https://cms.klubbsegling.se${image.attributes.formats.small.url}`" />
                    </div>
                </div>
            </body>
            <footer class="h-24 flex-none">
                <hr class="my-4" />
                <p class="mr-2 mt-2 italic text-gray-400">Skriven av:</p>
                <div class="flex mb-2 flex-wrap">
                    <div class="badge badge-info mr-2 mt-2" v-for="author in article.authors.data">{{ author.attributes.firstName }} {{ author.attributes.lastName }}</div>
                </div>
            </footer>
        </div>
    </transition>

    <LoadingArticle v-show="loading" />
</template>

<script>
import { getArticle } from '@/api/API'
import Markdown from 'vue3-markdown-it'
import LoadingArticle from '@/components/LoadingArticle.vue'

export default {
    name: 'Article',
    components: {
        Markdown,
        LoadingArticle,
    },
    data() {
        return {
            article: null,
            loading: true,
        }
    },

    async mounted() {
        this.updateArticle()
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
