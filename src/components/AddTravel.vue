<script setup>
import { storeToRefs } from 'pinia'
import { useTravelStore } from "@/stores/travel"
import { useTimeZoneStore } from "@/stores/common/timezone"
import DatePickerWrap from "@/components/DatePickerWrap.vue"

const travelStore = useTravelStore()
const timeZoneStore = useTimeZoneStore()
const { timeZoneList } = storeToRefs(timeZoneStore)

function updateDate({ startDate, endDate }) {
  travelStore.addStartDate = startDate
  travelStore.addEndDate = endDate
}

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
      <label for="tripDate">當地旅程時間：</label>
      <DatePickerWrap @updateDate="updateDate"></DatePickerWrap>
    </div>
    <div>
      <label for="timezone">旅程時區</label>
      <select name="timezone" id="timezone" v-model="travelStore.addTravelTimeZone">
        <option v-for="timezone in timeZoneList" :value="timezone.name">{{ timezone.name  }}({{ timezone.utc_offset.hours || 0 }})</option>
      </select>
    </div>
    <button @click="createTrip">新增旅程</button>
  </div>
</template>