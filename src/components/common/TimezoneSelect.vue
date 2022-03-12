<script setup>
import { storeToRefs } from 'pinia'
import { useTimeStore } from "@/stores/common/time"
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { defineEmits } from 'vue'

const emit = defineEmits(["changeTimeZone"])
const timeStore = useTimeStore()
const { timeZoneList } = storeToRefs(timeStore)
const timeZone = ref("Asia/Taipei")

watch(timeZone, val => {
  if (!val) return
  emit("changeTimeZone", val)
}, { immediate: true })

</script>
<template>
  <select name="timezone" id="timezone" v-model="timeZone">
    <option
      v-for="timezone in timeZoneList"
      :value="timezone.name"
      :key="timezone.name"
    >{{ timezone.name }}({{ timezone.utc_offset.hours || 0 }})</option>
  </select>
</template>