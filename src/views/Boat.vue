<template>
    <div v-if="loaded" class="wrapper max-w-md px-6 mt-6 justify-self-center">
        <h1 class="font-bold text-3xl mb-2">{{ boat.boatName }}</h1>
        <p>Beskrivning: {{ boat.description || '' }}</p>
        <hr class="my-4" />
        <p>Båttyp: {{ boat.boatType || '' }}</p>
        <p>Nationalitet: {{ boat.nationality || '' }}</p>
        <p>Mätbrev: {{ boat.referenceNumber || '' }}</p>
        <p>Seglingsnummer: {{ boat.sailNumber || '' }}</p>
        <p>SRS ID: {{ boat.srsID || '' }}</p>
        <p>Verifierad SRS: {{ boat.verifiedSRS || '' }}</p>
    </div>
    <LoadingArticle v-else />
</template>

<script>
import { API, getBoat } from '@/api/API'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import qs from 'qs'
import LoadingArticle from '@/components/LoadingArticle.vue'

export default {
    name: 'boat',
    components: {
        VueJsonPretty,
        LoadingArticle,
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
