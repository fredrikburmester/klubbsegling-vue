/* eslint-disable vue/no-multiple-template-root */
<template>
    <div v-show="loaded" class="border border-blue-300 card shadow-xl image-full mt-4 h-56">
        <figure v-if="hasHeader" class="panel-image">
            <img :src="header()" @load="onImgLoad" />
        </figure>
        <div class="justify-end card-body h-56">
            <h2 class="card-title text-2xl">{{ club.attributes.name }}</h2>
            <p class="max-h-12 overflow-hidden">
                {{ club.attributes.description || '' }}
            </p>
            <router-link :to="`/club/${club.id}`">
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
            loaded: false,
            hasHeader: !!this.club.attributes.header.data,
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
            const formats = this.club.attributes.header.data.attributes.formats
            if (!!formats.medium) {
                return IMG_URL + formats.medium.url
            } else if (!!formats.small) {
                return IMG_URL + formats.small.url
            } else {
                return IMG_URL + formats.thumbnail.url
            }
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
