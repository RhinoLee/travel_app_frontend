<script setup>
import { storeToRefs } from 'pinia'
import { useTravelPlansStore } from "@/stores/travel/travelPlans"
import { useTimeStore } from "@/stores/common/time"
import DatePickerWrap from "@/components/common/DatePickerWrap.vue"
import TimezoneSelect from "@/components/common/TimezoneSelect.vue"
import { useTimeTransfer } from "@/tools/time-transfer"

const travelPlansStore = useTravelPlansStore()
const timeStore = useTimeStore()
const { timeZoneList } = storeToRefs(timeStore)
const { addTravelTimeZone } = storeToRefs(travelPlansStore)
const { getTimeZoneListHandler } = timeStore

async function updateDate({ startDate, endDate }) {
  if (timeZoneList.value.length === 0) {
    await getTimeZoneListHandler()
  }
  const { startDateResult, endDateResult } = useTimeTransfer({ startDate, endDate, nowTimeZone:addTravelTimeZone,  timeZoneList })
  travelPlansStore.addStartDate = startDateResult
  travelPlansStore.addEndDate = endDateResult
}

function changeTimeZone(timezone) {
  travelPlansStore.addTravelTimeZone = timezone
}

async function createTrip() {
  const result = await travelPlansStore.createTravelPlanHandler()
  travelPlansStore.addTravelName = ""
  if (result) {
    travelPlansStore.getTravelPlansListHandler()
  }
}

</script>

<template>
  <div class="create">
    <div>
      <label for="tripName">旅程名稱：</label>
      <input v-model="travelPlansStore.addTravelName" type="text" />
    </div>
    <div>
      <label for="tripDate">當地旅程時間：</label>
      <DatePickerWrap @updateDate="updateDate"></DatePickerWrap>
    </div>
    <div>
      <label for="timezone">旅程時區</label>
      <TimezoneSelect @changeTimeZone="changeTimeZone"></TimezoneSelect>
      <!-- <select name="timezone" id="timezone" v-model="travelPlansStore.addTravelTimeZone">
        <option
          v-for="timezone in timeZoneList"
          :value="timezone.name"
          :key="timezone.name"
        >{{ timezone.name }}({{ timezone.utc_offset.hours || 0 }})</option>
      </select> -->
    </div>
    <pre v-if="travelPlansStore.addStartDate">{{ travelPlansStore.addStartDate }}</pre>
    <pre v-if="travelPlansStore.addEndDate">{{ travelPlansStore.addEndDate }}</pre>
    <button @click="createTrip">新增旅程</button>
  </div>
</template>