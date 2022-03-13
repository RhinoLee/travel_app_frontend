<script setup>
import { storeToRefs } from 'pinia'
import { useDayTravelStore } from "@/stores/dayTravel"
import Location from "@/components/Location.vue"
import AddDayTripForm from "@/components/AddDayTripForm.vue"
import TimezoneSelect from "@/components/common/TimezoneSelect.vue"
import { onMounted } from '@vue/runtime-core'

const dayTravelStore = useDayTravelStore()
const { dayTrip, dayTripName } = storeToRefs(dayTravelStore)

function changeTimeZone(timezone) {
  console.log("changeTimeZone", timezone);
}

function addToTripHandler() {
  dayTravelStore.addToTripHandler()
}

onMounted(() => {
  dayTravelStore.getAllCollectHandler()
})

</script>

<template>
  <div class="container">
    <div class="col-3">
      <form>
        <div class="formGroup">
          <label for="name">單日行程名稱</label>
          <input v-model="dayTripName" type="text" />
        </div>
        <!-- <div class="formGroup">
          <label for="name">行程時區</label>
          <TimezoneSelect @changeTimeZone="changeTimeZone"></TimezoneSelect>
        </div> -->
      </form>
      <AddDayTripForm></AddDayTripForm>
    </div>
    <div class="col-9">
      <Location :addToTrip="true" @addToTripHandler="addToTripHandler"></Location>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  .col-3 {
    width: 25%;
  }
  .col-9 {
    width: 75%;
  }
}
</style>