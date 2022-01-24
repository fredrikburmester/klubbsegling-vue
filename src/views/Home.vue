<template>
    <div class="wrapper px-6 pt-2 pb-6 md:max-w-2xl justify-self-center">
        <h1 v-if="!loading" class="font text-sm mt-4 opacity-50">Välj vy</h1>
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
            <RaceList :key="updateList" :races="races" />
        </div>
        <div v-else class="wrapper justify-self-center md:max-w-2xl">
            <LoadingCard v-for="i in 5" :key="i" />
        </div>
    </div>
</template>

<script>
import RaceList from '@/components/RaceList.vue'
import LoadingCard from '@/components/LoadingCard.vue'
import { getAllRaces } from '@/api/API.ts'

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
        this.registeredRaces = this.getRegisteredRaces(this.races)

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
        getRegisteredRaces(races) {
            return races.filter(race => {
                const registrations = race.attributes.registrations.data
                for (let i in registrations) {
                    const users = registrations[i].attributes.users.data
                    for (let j in users) {
                        var userId = users[j].id
                        return userId == this.me.id
                    }
                }
            })
        },
    },
}
</script>

<style>
.wrapper {
    width: 100%;
    min-height: 100vh;
}
</style>
