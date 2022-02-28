<script setup>
import { onMounted } from "vue"
import { useTimeZoneStore } from "@/stores/common/timezone"
import TravelList from "../components/TravelList.vue";

const timeZoneStore = useTimeZoneStore()

onMounted(() => {
  timeZoneStore.getTimeZoneListHandler()
})
</script>

<template>
  <TravelList></TravelList>
</template>
