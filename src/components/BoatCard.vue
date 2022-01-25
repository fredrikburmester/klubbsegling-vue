<template>
    <div v-show="!hasImage || imageLoaded" class="border border-blue-300 card shadow-xl image-full mt-4 h-94">
        <figure v-if="hasImage">
            <img :src="thumbnail" @load="onImgLoad" />
        </figure>
        <div class="self-end card-body h-56">
            <h2 class="card-title">{{ boat.name }}</h2>
            <p v-if="!!boat.owner" class="max-h-12 overflow-hidden">
                {{ boat.owner.name }}
            </p>
            <router-link :to="`/profile/boat/${boat.id}`">
                <div class="card-actions">
                    <button class="btn btn-primary">Mer info</button>
                </div>
            </router-link>
        </div>
    </div>
    <LoadingCard v-if="!imageLoaded && hasImage" />
</template>

<script>
import { API_URL } from '../store/actions/auth'
import LoadingCard from './LoadingCard.vue'

export default {
    name: 'Profile',
    components: {
        LoadingCard,
    },
    props: {
        boat: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            hasImage: true ? !!this.boat.image : false,
            imageLoaded: false,
        }
    },
    computed: {
        thumbnail() {
            return API_URL + this.boat.image.formats.small.url
        },
    },
    mounted() {},
    methods: {
        onImgLoad() {
            this.imageLoaded = true
        },
    },
}
</script>

<style>
.card.image-full:before {
    opacity: 0.3;
}
</style>
