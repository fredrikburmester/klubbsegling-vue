<template>
    <div class="flex space-x-4 mb-4 m-0">
        <label for="register-modal" class="btn btn-primary text-base-content modal-button"> Lägg till ägarskap av båt </label>
        <input id="register-modal" type="checkbox" class="modal-toggle" />
        <div class="modal m-0">
            <div class="modal-box m-0">
                <p class="text-xl font-bold">Lägg endast till en båt du själv äger.</p>
                <br />
                <p>Välj båt att lägga till:</p>
                <div v-if="loaded">
                    <select v-model="selectedBoat" class="select select-bordered select w-full max-w-xs mt-4">
                        <option disabled value="Välj båt">Välj båt</option>
                        <option v-for="b in allBoats" :key="b.id" :value="b">
                            {{ b.attributes.name }}
                        </option>
                    </select>
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
export default {
    name: 'AddNewBoatForm',
    props: {
        userboats: {
            type: Array,
            required: true,
        },
    },
    emits: ['boats'],
    data() {
        return {
            loaded: false,
        }
    },
    async mounted() {},
    methods: {},
}
</script>
