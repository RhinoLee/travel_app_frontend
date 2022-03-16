<script setup>
import { storeToRefs } from 'pinia'
import { useTravelSampleStore } from "@/stores/travel/travelSample"
import Location from "@/components/travel/Location.vue"
import AddTravelSampleForm from "@/components/travel/AddTravelSampleForm.vue"
import TimezoneSelect from "@/components/common/TimezoneSelect.vue"
import { onMounted } from '@vue/runtime-core'

const travelSampleStore = useTravelSampleStore()
const { travelSample, travelSampleName } = storeToRefs(travelSampleStore)

function changeTimeZone(timezone) {
  console.log("changeTimeZone", timezone);
}

function addToTripHandler() {
  travelSampleStore.addToTripHandler()
}

onMounted(() => {
  travelSampleStore.getAllCollectHandler()
})

</script>

<template>
  <div class="container">
    <div class="col-3">
      <form>
        <div class="formGroup">
          <label for="name">單日行程名稱</label>
          <input v-model="travelSampleName" type="text" />
        </div>
        <!-- <div class="formGroup">
          <label for="name">行程時區</label>
          <TimezoneSelect @changeTimeZone="changeTimeZone"></TimezoneSelect>
        </div> -->
      </form>
      <AddTravelSampleForm></AddTravelSampleForm>
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