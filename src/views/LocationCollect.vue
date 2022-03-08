<script setup>
import Map from "@/components/common/Map.vue"
import { onMounted, reactive, ref } from "@vue/runtime-core"
import axios from "axios"
import { useLocationStore } from "@/stores/location"

const searchText = ref("")
const suggestList = reactive({ data: [] })
const focusSuggest = ref("")
const locationStore = useLocationStore()

async function getSuggestLocation() {
  if (!searchText.value) {
    suggestList.data = []
    return
  }
  const api = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=23.97565,120.97388&in=countryCode:TWN&limit=20&lang=zh-TW&q=${searchText.value}&apikey=${import.meta.env.VITE_HERE_API_KEY}`
  try {
    const result = await axios.get(api)
    if (result && Array.isArray(result.data.items)) {
      suggestList.data = result.data.items
    }
  } catch (err) {
    suggestList.data = []
    console.log(err);
  }

}

function focusSuggestHandler(suggest) {
  focusSuggest.value = suggest.id

  locationStore.nowLocation.name = suggest.title
  locationStore.nowLocation.address = suggest.address.label
  locationStore.nowLocation.lat = suggest.position.lat
  locationStore.nowLocation.lng = suggest.position.lng
  const categories = []
  if (suggest.categories) {
    suggest.categories.forEach(category => {
      categories.push(category.name)
    })
  }
  locationStore.nowLocation.category = categories.join()
}

function collectLocationHandler() {
  locationStore.collectLocationHandler()
}

function removeLocationHandler() {
  locationStore.removeLocationHandler()
}

</script>

<template>
  <div class="container">
    <Map
      @focusSuggestHandler="focusSuggestHandler"
      @collectLocationHandler="collectLocationHandler"
      @removetLocationHandler="removetLocationHandler"
      :suggestList="suggestList.data"
      :focusSuggest="focusSuggest"
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
          v-for="suggest in suggestList.data"
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