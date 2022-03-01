<script setup>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import { ref, onMounted, watch } from "vue"
import { storeToRefs } from 'pinia'
import { useTimeZoneStore } from "@/stores/common/timezone"
import { useTravelStore } from "@/stores/travel"

const date = ref()
const emit = defineEmits(["updateDate", "addTravelTimeZone"])
const timeZoneStore = useTimeZoneStore()
const travelStore = useTravelStore()
const { timeZoneList } = storeToRefs(timeZoneStore)
const { addTravelTimeZone, dateOffset } = storeToRefs(travelStore)

watch(date, val => {
  if (!val) return
  const dateRange = {
    startDate: date.value[0],
    endDate: date.value[1]
  }
  emit("updateDate", dateRange)
  // getUTCTime(date.value)
}, { immediate: true })

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

function getUTCTime(dateRange) {
  let startDate = new Date(dateRange[0]).toUTCString()
  let endDate = new Date(dateRange[1]).toUTCString()
  startDate = new Date(startDate).toJSON();
  endDate = new Date(endDate).toJSON();
  emit("updateDate", { startDate, endDate })
}

</script>

<template>
  <Datepicker v-model="date" range></Datepicker>
  <pre>{{ dateOffset }}</pre>
</template>