<script setup>
import { storeToRefs } from 'pinia'
import { useTravelStore } from "@/stores/travel"
import { useTimeZoneStore } from "@/stores/common/timezone"
import DatePickerWrap from "@/components/DatePickerWrap.vue"

const travelStore = useTravelStore()
const timeZoneStore = useTimeZoneStore()
const { timeZoneList } = storeToRefs(timeZoneStore)

async function createTrip() {
  const result = await travelStore.createTripHandler()
  travelStore.addTravelName = ""
  if (result) {
    travelStore.getTravelListHandler()
  }
}

</script>

<template>
  <div class="create">
    <div>
      <label for="tripName">旅程名稱：</label>
      <input v-model="travelStore.addTravelName" type="text" />
    </div>
    <div>
      <label for="tripDate">旅程時間：</label>
      <DatePickerWrap></DatePickerWrap>
    </div>
    <div>
      <label for="timezone">旅程時區</label>
      <select name="timezone" id="timezone" v-model="travelStore.addTravelTimeZone">
        <option v-for="timezone in timeZoneList" :value="timezone.name">{{ timezone.name }}</option>
      </select>
    </div>
    <button @click="createTrip">新增旅程</button>
  </div>

  <!-- <pre>{{ timeZoneList }}</pre> -->
</template>