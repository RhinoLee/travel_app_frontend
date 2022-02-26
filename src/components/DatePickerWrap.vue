<script setup>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import { ref, onMounted } from "vue"

const date = ref()

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})
</script>

<template>
  <Datepicker v-model="date" range></Datepicker>
</template>