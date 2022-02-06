<template>
    <div class="rounded-3xl shadow-lg bg-gray-200 p-6 mb-6 flex flex-col space-y-2">
        <h1 class="text-lg">{{ mark.mark.data.attributes.name }}</h1>
        <p class="text-sm text-gray-500">Beskrivning: {{ mark.mark.data.attributes.description || '' }}</p>
        <div class="form-control w-32">
            <label class="label">
                <span class="label-text">Rundningstid</span>
            </label>
            <input v-model="time" type="time" placeholder="" class="input input-bordered" />
        </div>
        <label class="label">
            <span class="label-text">Båt bakom</span>
        </label>
        <VueMultiselect v-model="boatBehind" :options="boatOptions" :multiple="false" track-by="value" :close-on-select="true" label="label" class=""> </VueMultiselect>
        <label class="label">
            <span class="label-text">Båt framför</span>
        </label>
        <VueMultiselect v-model="boatInFront" :options="boatOptions" :multiple="false" track-by="value" :close-on-select="true" label="label" class=""> </VueMultiselect>
    </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
    name: 'Report',
    components: {
        VueMultiselect,
    },
    props: {
        mark: {
            type: Object,
            required: true,
        },
        registrations: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            time: '',
            boatBehind: '',
            boatInFront: '',
        }
    },
    computed: {
        boatOptions() {
            let boatOptions = []
            for (var i in this.registrations) {
                let r = this.registrations[i]
                let boat = r.attributes.boat.data
                boatOptions.push({
                    value: boat.id,
                    label: boat.attributes.name,
                })
            }
            return boatOptions
        },
    },
    methods: {},
}
</script>
