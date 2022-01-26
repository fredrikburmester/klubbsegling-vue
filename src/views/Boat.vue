<template>
    <div v-if="loaded" class="wrapper max-w-md px-6 mt-6">
        <h1 class="font-bold text-3xl">{{ boat.name }}</h1>
        <p>{{ boat.description }}</p>
    </div>
</template>

<script>
import { API, getBoat } from '@/api/API'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import qs from 'qs'

export default {
    name: 'boat',
    components: {
        VueJsonPretty,
    },
    data() {
        return {
            id: this.$route.params.id,
            boat: {},
            loaded: false,
        }
    },
    async mounted() {
        const boat = await getBoat(this.id)
        this.boat = boat.attributes
        this.loaded = true
    },
    methods: {},
}
</script>
