<template>
    <div class="flex space-x-4 mb-4 m-0">
        <label for="register-modal" class="btn btn-primary text-base-content modal-button">Lägg till ägarskap av båt</label>
        <input id="register-modal" type="checkbox" class="modal-toggle" />
        <div class="modal m-0">
            <div class="modal-box m-0 h-screen flex flex-col justify-end">
                <p class="text-xl font-bold">Lägg endast till en båt du själv äger.</p>
                <br />
                <p>Sök och välj din båt:</p>
                <div v-if="loaded" class="my-2">
                    <!-- <select v-model="selectedBoat" class="select select-bordered select w-full max-w-xs mt-4">
                        <option disabled value="Välj båt">Välj båt</option>
                        <option v-for="b in allBoats" :key="b.id" :value="b">
                            {{ b.Båtnamn }}
                        </option>
                    </select> -->
                    <VueMultiselect v-model="selectedBoat" :options="allBoats" :multiple="false" track-by="value" :close-on-select="true" label="label"></VueMultiselect>
                </div>

                <div class="modal-action flex justify-start">
                    <label for="register-modal" class="btn btn-primary" @click="addBoat">Lägg till</label>
                    <label for="register-modal" class="btn">Avbryt</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllBoats, addBoatToUser } from '@/api/API'
import axios from 'axios'
import VueMultiselect from 'vue-multiselect'

export default {
    name: 'AddBoatForm',
    props: {
        userboats: {
            type: Array,
            required: true,
        },
    },
    emits: ['boats'],
    components: {
        VueMultiselect,
    },
    data() {
        return {
            userBoats: this.userboats,
            allBoats: [],
            selectedBoat: null,
            me: this.$store.getters.getProfile,
            loaded: false,
        }
    },
    async mounted() {
        axios
            .get('/data/srs-cert-mono.json')
            .then(response => {
                const boats = response.data
                for (let i = 0; i < boats.length; i++) {
                    if (!!boats[i].Båtnamn && !!boats[i].Båtnamn.length > 0) {
                        this.allBoats.push({
                            value: boats[i].Ref,
                            label: boats[i].Båtnamn,
                        })
                    }
                }
                this.allBoats.sort((a, b) => {
                    if (a.label < b.label) return -1
                    if (a.label > b.label) return 1
                    return 0
                })
                this.loaded = true
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        async addBoat() {
            var added = await addBoatToUser(this.me.id, this.selectedBoat)
            this.$emit('boat', added)
        },
    },
}
</script>
