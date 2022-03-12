<script setup>
import { onMounted } from "vue"
import { useTimeStore } from "@/stores/common/time"
import TravelList from "../components/TravelList.vue";

const timeStore = useTimeStore()

onMounted(() => {
  if (timeStore.timeZoneList.length > 0) return
  timeStore.getTimeZoneListHandler()
})
</script>

<template>
  <TravelList></TravelList>
</template>
