<template>
    <div v-if="needRefresh" class="sticky bottom-10 alert bg-yellow-500 z-50 mx-6" role="alert">
        <div class="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
            </svg>
            <label class="mx-3">Hemsidan har en uppdatering. {{ needRefresh }}</label>
        </div>
        <div class="flex-none">
            <button @click="updateServiceWorker()" class="btn btn-sm btn-primary">Uppdatera</button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
const { updateServiceWorker } = useRegisterSW()
export default defineComponent({
    name: 'ReloadPWA',
    setup() {
        const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
        const close = async () => {
            offlineReady.value = false
            needRefresh.value = false
        }
        return { offlineReady, needRefresh, updateServiceWorker, close }
    },
    methods: {
        async close() {
            // @ts-ignore
            this.offlineReady.value = false
            // @ts-ignore
            this.needRefresh.value = false
        },
        async updateServiceWorker() {
            await updateServiceWorker()
            window.location.href = 'https://klubbsegling.se'
        },
    },
})
</script>
