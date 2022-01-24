<template>
    <div class="pt-2 pb-6">
        <RaceCard v-for="race in races" :key="race.id" :race="race" />
    </div>

    <div v-if="races.length === 0" class="wrapper justify-self-center md:max-w-2xl">
        <h1 class="font-bold text-xl"><span class="text-2xl">🤷🏻‍♂️ </span>Här var det tomt...</h1>
    </div>
</template>

<script>
import RaceCard from './RaceCard.vue'
import LoadingCard from './LoadingCard.vue'
import 'mosha-vue-toastify/dist/style.css'

export default {
    name: 'RaceList',
    components: {
        RaceCard,
        LoadingCard,
    },
    props: {
        races: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
}
</script>
