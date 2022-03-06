<script setup>
import Map from "@/components/common/Map.vue"
import { onMounted, reactive, ref, watch } from "@vue/runtime-core"
import axios from "axios"

const searchText = ref("")
const suggestList = reactive({ data: [] })

watch(searchText, val => {
  // if (!val) return
  getSuggestLocation()
})

async function getSuggestLocation() {
  if (!searchText.value) {
    suggestList.data = []
    return 
  }
  const api = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=23.97565,120.97388&limit=20&lang=zh-TW&q=${searchText.value}&apikey=${import.meta.env.VITE_HERE_API_KEY}`
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

</script>

<template>
  <div class="container">
    <Map :suggestList="suggestList.data"></Map>
    <div class="input-group">
      <input type="text" placeholder="請輸入關鍵字或地址" v-model.trim="searchText" @keyup.enter="getSuggestLocation" />
      <button type="button" @click="getSuggestLocation">查詢</button>
      <ul>
        <li v-for="suggest in suggestList.data" :key="suggest.id">{{ suggest.title }}</li>
        <!-- <pre>{{ suggestList.data }}</pre> -->
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.input-group {
  position: absolute;
  top: 30px;
  left: 30px;
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