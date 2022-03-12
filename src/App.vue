<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue"
import { useTimeStore } from "@/stores/common/time"

const timeStore = useTimeStore()

onMounted(() => {
  timeStore.getTimeZoneListHandler()
})
</script>

<template>

  <RouterView />
</template>

<style lang="scss">
</style>