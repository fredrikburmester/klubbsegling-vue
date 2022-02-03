<template>
    <div class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
        <h1 v-if="!loading" class="font text-sm mt-4 opacity-50">Välj vy:</h1>
        <div v-if="!loading" class="w-full shadow stats mt-4">
            <div class="stat cursor-pointer" :class="{ 'bg-gray-100': active == 'thisYear' }" @click="setActive('thisYear')">
                <div class="stat-title">Seglatser i år</div>
                <div class="stat-value text-info">
                    {{ racesThisYear.length }}
                </div>
                <div class="stat-desc">{{ getCurrentYear }}</div>
            </div>
            <div class="stat cursor-pointer" :class="{ 'bg-gray-100': active == 'registered' }" @click="setActive('registered')">
                <div class="stat-title">Registrerad</div>
                <div class="stat-value text-primary">
                    {{ registeredRaces.length }}
                </div>
                <div class="stat-desc"></div>
            </div>
        </div>
        <div v-if="!loading">
            <transition name="slide-fade" mode="out-in">
                <RaceList :key="updateList" :races="races" />
            </transition>
        </div>
        <div v-else class="wrapper justify-self-center md:max-w-2xl">
            <LoadingCard v-for="i in 5" :key="i" />
        </div>
    </div>
</template>

<script>
import RaceList from '@/components/RaceList.vue'
import LoadingCard from '@/components/LoadingCard.vue'
import { getAllRaces, getRegisteredRaces } from '@/api/API.ts'

export default {
    name: 'Home',
    components: {
        RaceList,
        RaceList,
        LoadingCard,
    },
    data() {
        return {
            me: this.$store.getters.getProfile,
            active: 'thisYear',
            racesThisYear: 0,
            registeredRaces: 0,
            raceListQuery: '',
            boats: 0,
            loading: true,
            updateList: false,
            races: [],
        }
    },
    computed: {
        getCurrentYear() {
            var now = new Date()
            return now.getFullYear()
        },
    },
    async mounted() {
        this.races = this.racesThisYear = await getAllRaces()
        this.registeredRaces = await getRegisteredRaces(this.me.id)

        this.loading = false
    },
    methods: {
        setActive(list) {
            if (list === 'thisYear') {
                this.active = list
                this.races = this.racesThisYear
            } else if (list === 'registered') {
                this.active = list
                this.races = this.registeredRaces
            }
            this.updateList = !this.updateList
        },
    },
}
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.2s;
}

.slide-fade-leave-active {
    transition: all 0.2s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>
