<script setup>
import Map from "@/components/common/Map.vue"
import { onMounted, reactive, ref } from "@vue/runtime-core"
import axios from "axios"
import { useLocationStore } from "@/stores/location"
import { storeToRefs } from "pinia"

const locationStore = useLocationStore()
const { searchText, suggestList, focusSuggestId, locationList, suggestWithoutCollect } = storeToRefs(locationStore)

async function getSuggestLocation() {
  locationStore.getSuggestLocation()
}

function focusSuggestHandler(suggest) {
  locationStore.focusSuggestHandler(suggest)
}

function collectLocationHandler() {
  locationStore.collectLocationHandler()
}

// function removeLocationHandler() {
//   locationStore.removeLocationHandler()
// }

onMounted(() => {
  locationStore.getAllLocationHandler()
})

</script>

<template>
  <div class="container">
    <Map
      @focusSuggestHandler="focusSuggestHandler"
      @collectLocationHandler="collectLocationHandler"
      @removetLocationHandler="removetLocationHandler"
      :focusSuggestId="focusSuggestId"
      :suggestList="suggestWithoutCollect"
      :locationList="locationList"
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