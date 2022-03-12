<script setup>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import { ref, onMounted, watch } from "vue"
import { storeToRefs } from 'pinia'
import { useTimeStore } from "@/stores/common/time"
import { useTravelStore } from "@/stores/travel"

const date = ref()
const emit = defineEmits(["updateDate", "addTravelTimeZone"])
const timeStore = useTimeStore()
const travelStore = useTravelStore()
const { timeZoneList } = storeToRefs(timeStore)
const { addTravelTimeZone, dateOffset } = storeToRefs(travelStore)

watch(date, val => {
  if (!val) return
  const dateRange = {
    startDate: date.value[0],
    endDate: date.value[1]
  }
  emit("updateDate", dateRange)
}, { immediate: true })

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

</script>

<template>
  <Datepicker v-model="date" range></Datepicker>
</template>