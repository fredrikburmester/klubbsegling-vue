<template>
    <div v-show="loaded || !hasImages" class="border border-blue-300 card shadow-xl image-full mt-4 bg-gray-500">
        <figure v-if="hasImages" class="panel-image">
            <img :src="thumbnail" @load="onImgLoad" />
        </figure>
        <div class="justify-end card-body">
            <h2 class="card-title">{{ race.attributes.name }}</h2>
            <p class="max-h-24">
                {{ race.attributes.description || '' }}
            </p>
            <p class="font-bold mt-2 capitalize">{{ getDateString }}</p>
            <div class="card-actions">
                <router-link :to="`/race/${race.id}/report`" v-if="permissionToReport">
                    <div class="relative" v-if="isActive">
                        <button class="btn bg-red-600 border-0 shadow-xl">Rapportera nu</button>
                    </div>
                </router-link>
                <router-link v-if="!disabled" :to="`/race/${race.id}`">
                    <button class="btn btn-primary">Läs mer</button>
                </router-link>
                <button v-else class="btn btn-primary opacity-50">Kommer snart</button>
            </div>
        </div>
    </div>
    <LoadingCard v-if="!loaded && hasImages" />
</template>

<script>
import { IMG_URL } from '../store/actions/auth'
import LoadingCard from '../components/LoadingCard.vue'
import { formatDate } from '../lib/utils'

export default {
    components: {
        LoadingCard,
    },
    props: {
        race: {
            type: Object,
            default: () => {},
        },
        registered: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            hasImages: !!this.race.attributes.images.data,
            images: this.race.attributes.images.data,
            loaded: false,
            isActive: new Date() > new Date(this.race.attributes.start) && new Date() < new Date(this.race.attributes.end),
        }
    },
    computed: {
        thumbnail() {
            var url = IMG_URL
            var formats = this.race.attributes.images.data[0].attributes.formats
            if (!!formats.medium) {
                return url + formats.medium.url
            } else if (!!formats.small) {
                return url + formats.small.url
            } else {
                return url + formats.thumbnail.url
            }
        },
        getDateString() {
            let start = new Date(this.race.attributes.start)
            let end = new Date(this.race.attributes.end)

            return formatDate(start, end)
        },
        registered() {
            if (true) {
                return 0
            }
        },
        permissionToReport() {
            console.log('[0]', this.race.attributes.registrations)
            for (let r of this.race.attributes.registrations.data) {
                console.log('1', r)
            }
            return true
        },
    },
    mounted() {
        console.log(this.race)
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
        compareDates(date1, date2) {
            let y1 = date1.getFullYear()
            let m1 = date1.getMonth() + 1
            let d1 = date1.getDate()
            let y2 = date2.getFullYear()
            let m2 = date2.getMonth() + 1
            let d2 = date2.getDate()
            return y1 === y2 && m1 === m2 && d1 === d2
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
