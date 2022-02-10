/* eslint-disable vue/no-multiple-template-root */
<template>
    <div v-show="loaded" class="border border-blue-300 card shadow-xl image-full mt-4 h-56">
        <figure class="panel-image">
            <img :src="header()" @load="onImgLoad" />
        </figure>
        <div class="justify-end card-body h-56">
            <h2 class="card-title text-2xl">{{ article.attributes.title }}</h2>
            <router-link :to="`/article/${article.attributes.slug}`">
                <div class="card-actions">
                    <button class="btn btn-primary">Läs mer</button>
                </div>
            </router-link>
        </div>
    </div>
    <LoadingCard v-if="!loaded" />
</template>

<script>
import { API_URL, IMG_URL } from '../store/actions/auth'
import LoadingCard from '../components/LoadingCard.vue'
import { getLargestImageFromFormats } from '@/lib/utils'

export default {
    components: {
        LoadingCard,
    },
    props: {
        article: {
            type: Object,
            default: () => {},
        },
    },
    data: function () {
        return {
            occ: '',
            loaded: false,
        }
    },
    computed: {
        thumbnailURL() {
            return `${API_URL}${this.thumbnail}`
        },
    },
    mounted() {
        if (!this.header()) {
            this.loaded = true
        }
    },
    methods: {
        loggedIn() {
            return this.$store.getters.isAuthenticated
        },
        getUser() {
            return this.$store.getters.getProfile
        },
        onImgLoad() {
            this.loaded = true
        },
        header() {
            if (!!this.article.attributes.header.data) {
                const formats = this.article.attributes.header.data.attributes.formats
                return IMG_URL + getLargestImageFromFormats(formats)
            }
            return 'https://cms.klubbsegling.se/uploads/images_1_edc0216a3a.jpeg?updated_at=2022-02-08T16:13:25.749Z'
        },
    },
}
</script>

<style>
.panel-image > img {
    position: absolute;
    left: 50%;
    top: 50%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.card.image-full:before {
    opacity: 0.4;
}
</style>
