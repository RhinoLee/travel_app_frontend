<script setup>
import { onMounted } from "vue"
import { useTimeStore } from "@/stores/common/time"
import TravelPlansList from "../components/travel/TravelPlansList.vue";

const timeStore = useTimeStore()

onMounted(async() => {
  if (timeStore.timeZoneList.length > 0) return
  await timeStore.getTimeZoneListHandler()
})
</script>

<template>
  <TravelPlansList></TravelPlansList>
</template>
