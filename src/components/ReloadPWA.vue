<template></template>
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
        },
    },
})
</script>
