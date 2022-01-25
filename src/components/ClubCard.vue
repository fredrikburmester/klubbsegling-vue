/* eslint-disable vue/no-multiple-template-root */
<template>
    <div v-show="!hasThumbnail || imageLoaded" class="border border-blue-300 card shadow-xl image-full mt-4 h-56">
        <figure v-if="hasThumbnail">
            <img :src="thumbnailURL" @load="onImgLoad" />
        </figure>
        <div class="justify-end card-body h-56">
            <h2 class="card-title">{{ club.name }}</h2>
            <p class="max-h-12 overflow-hidden">
                {{ club.description || '' }}
            </p>
            <router-link :to="`/club/${club.id}`">
                <div class="card-actions">
                    <button class="btn btn-primary">Läs mer</button>
                </div>
            </router-link>
        </div>
    </div>
    <LoadingCard v-if="!imageLoaded && hasImages" />
</template>

<script>
import { API_URL } from '../store/actions/auth'
import LoadingCard from '../components/LoadingCard.vue'

export default {
    components: {
        LoadingCard,
    },
    props: {
        club: {
            type: Object,
            default: () => {},
        },
    },
    data: function () {
        return {
            occ: '',
            hasImages: this.club.images.length > 0,
            hasThumbnail: !!this.club.header,
            images: this.club.images,
            imageLoaded: false,
            thumbnail: this.club.header.formats.thumbnail.url,
        }
    },
    computed: {
        thumbnailURL() {
            return `${API_URL}${this.thumbnail}`
        },
    },
    methods: {
        loggedIn() {
            return this.$store.getters.isAuthenticated
        },
        getUser() {
            return this.$store.getters.getProfile
        },
        onImgLoad() {
            this.imageLoaded = true
        },
    },
}
</script>
