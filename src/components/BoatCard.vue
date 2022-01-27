<template>
    <div v-show="loaded || !hasImages" class="border border-blue-300 card shadow-xl image-full mt-4 h-56">
        <figure v-if="hasImages" class="panel-image">
            <img :src="thumbnail" @load="onImgLoad" />
        </figure>
        <div class="justify-end card-body h-56">
            <h2 class="card-title text-2xl">{{ boat.attributes.name }}</h2>
            <p class="max-h-12 overflow-hidden">
                {{ boat.attributes.description || '' }}
            </p>
            <router-link :to="`/boat/${boat.id}`">
                <div class="card-actions">
                    <button class="btn btn-primary">Läs mer</button>
                </div>
            </router-link>
        </div>
    </div>
    <LoadingCard v-if="!loaded && hasImages" />
</template>

<script>
import { API_URL, IMG_URL } from '../store/actions/auth'
import LoadingCard from '../components/LoadingCard.vue'

export default {
    components: {
        LoadingCard,
    },
    props: {
        boat: {
            type: Object,
            default: () => {},
        },
    },
    data: function () {
        return {
            hasImages: !!this.boat.attributes.image.data,
            images: this.boat.attributes.image.data,
            loaded: false,
        }
    },
    computed: {
        thumbnail() {
            var url = IMG_URL
            var formats = this.boat.attributes.image.data.attributes.formats
            if (!!formats.medium) {
                return url + formats.medium.url
            } else if (!!formats.small) {
                return url + formats.small.url
            } else {
                return url + formats.thumbnail.url
            }
        },
    },
    methods: {
        formatDate(date) {
            if (date !== undefined) {
                date = new Date(date)
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            } else return '-'
        },
        loggedIn() {
            return this.$store.getters.isAuthenticated
        },
        getUser() {
            return this.$store.getters.getProfile
        },
        onImgLoad() {
            this.loaded = true
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
</style>
