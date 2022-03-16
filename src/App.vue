<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue"
import { useTimeStore } from "@/stores/common/time"

const timeStore = useTimeStore()

onMounted(async () => {
  await timeStore.getTimeZoneListHandler()
})
</script>

<template>

  <RouterView />
</template>

<style lang="scss">
</style>