<template>
    <div v-show="loaded || !hasImages" class="border border-blue-300 card shadow-xl image-full mt-4 h-56">
        <figure v-if="hasImages">
            <img :src="thumbnail" @load="onImgLoad" />
        </figure>
        <div class="justify-end card-body h-56">
            <h2 class="card-title">{{ race.attributes.name }}</h2>
            <p class="max-h-12 overflow-hidden">
                {{ race.attributes.description || '' }}
            </p>
            <router-link :to="`/race/${race.id}`">
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
        race: {
            type: Object,
            default: () => {},
        },
    },
    data: function () {
        return {
            hasImages: !!this.race.attributes.images.data,
            images: this.race.attributes.images.data,
            loaded: false,
        }
    },
    computed: {
        thumbnail() {
            var url = IMG_URL
            var formats = this.race.attributes.images.data[0].attributes.formats
            if (!!formats.small) {
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
