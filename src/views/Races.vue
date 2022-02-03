<template>
    <div v-if="!loading" class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
        <RaceList :races="races" />
    </div>
    <div v-else class="wrapper px-6 justify-self-center md:max-w-2xl">
        <LoadingCard v-for="i in 5" :key="i" />
    </div>
</template>

<script>
import RaceList from '../components/RaceList.vue'
import { getAllRaces } from '@/api/API'
import LoadingCard from '@/components/LoadingCard.vue'

export default {
    name: 'Races',
    components: {
        RaceList,
        LoadingCard,
    },
    data() {
        return {
            races: [],
            loading: true,
        }
    },
    async mounted() {
        this.races = await getAllRaces()
        this.loading = false
    },
}
</script>
