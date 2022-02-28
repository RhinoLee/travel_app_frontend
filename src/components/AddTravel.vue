<script setup>
import { useTravelStore } from "@/stores/travel"
import DatePickerWrap from "@/components/DatePickerWrap.vue"

const store = useTravelStore()

async function createTrip() {
  const result = await store.createTripHandler()
  store.addTravelName = ""
  if (result) {
    store.getTravelListHandler()
  }
}

</script>

<template>
  <div class="create">
    <div>
      <label for="tripName">旅程名稱：</label>
      <input v-model="store.addTravelName" type="text" />
    </div>
    <div>
      <label for="tripName">旅程時間：</label>
      <DatePickerWrap></DatePickerWrap>
    </div>
    <button @click="createTrip">新增旅程</button>
  </div>
</template>