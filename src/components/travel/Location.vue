<script setup>
import Map from "@/components/common/Map.vue"
import { onMounted, reactive, ref } from "@vue/runtime-core"
import { defineProps, defineEmits } from "vue"
import axios from "axios"
import { useLocationStore } from "@/stores/travel/location"
import { storeToRefs } from "pinia"

const emit = defineEmits(["addToTripHandler"])
const props = defineProps({
  addToTrip: {
    type: Boolean,
    default: false
  }
})

const locationStore = useLocationStore()
const { searchText, suggestList, nowLocation, locationList, suggestWithoutCollect } = storeToRefs(locationStore)

async function getSuggestLocation() {
  locationStore.getSuggestLocation()
}

function focusSuggestHandler(suggest) {
  locationStore.focusSuggestHandler(suggest)
}

function focusLocationHandler(location) {
  locationStore.focusLocationHandler(location)
}

function addToTripHandler() {
  emit("addToTripHandler")
}

async function collectLocationHandler() {
  const result = await locationStore.collectLocationHandler()
  if (result) {
    locationStore.getAllLocationHandler()
  }
}

async function removeLocationHandler(locationId) {
  const result = await locationStore.removeLocationHandler(locationId)
  if (result) {
    locationStore.getAllLocationHandler()
  }
}

onMounted(() => {
  locationStore.getAllLocationHandler()
})

</script>

<template>
  <div class="container">
    <Map
      @focusSuggestHandler="focusSuggestHandler"
      @focusLocationHandler="focusLocationHandler"
      @collectLocationHandler="collectLocationHandler"
      @removeLocationHandler="removeLocationHandler"
      @addToTripHandler="addToTripHandler"
      :focusMarkId="nowLocation.id"
      :suggestList="suggestWithoutCollect"
      :locationList="locationList"
      :addToTrip="props.addToTrip"
    ></Map>
    <div class="input-group">
      <input
        type="text"
        placeholder="請輸入關鍵字或地址"
        v-model.trim="searchText"
        @keyup.enter="getSuggestLocation"
      />
      <button type="button" @click="getSuggestLocation">查詢</button>
      <ul>
        <li
          v-for="suggest in suggestWithoutCollect"
          :key="suggest.id"
          @click="focusSuggestHandler(suggest)"
        >{{ suggest.title }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.input-group {
  position: absolute;
  top: 30px;
  left: 50px;
  z-index: 1000;
  input {
    height: 10px;
    width: 250px;
    padding: 10px;
    outline: none;
  }
  button {
    padding: 5px;
  }
}
</style>