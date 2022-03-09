<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue"
import { useTimeZoneStore } from "@/stores/common/timezone"

const timeZoneStore = useTimeZoneStore()

onMounted(() => {
  timeZoneStore.getTimeZoneListHandler()
})
</script>

<template>

  <RouterView />
</template>

<style lang="scss">
</style>