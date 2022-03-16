<script setup>
import { useTravelSampleStore } from "@/stores/travel/travelSample"
import { onMounted } from "@vue/runtime-core"
import { storeToRefs } from "pinia"
import Map from "@/components/common/Map.vue"

const travelSampleStore = useTravelSampleStore()
const { collectList } = storeToRefs(travelSampleStore)

function getCollectDetail(collectId) {
  travelSampleStore.nowCollectId = collectId
  travelSampleStore.getCollectDetail(collectId)
}

onMounted(() => {
  travelSampleStore.getAllCollectHandler()
})

</script>

<template>
  <div v-if="collectList.length > 0" class="container">
    <div class="list col-3">
      <div v-for="collect in collectList" :key="collect.id">
        <div class="box" @click="getCollectDetail(collect.id)">
          <div>{{ collect.name }}</div>
        </div>
      </div>
    </div>
    <div class="info col-9">
      <Map></Map>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}
.col-3 {
  width: 25%;
}
.col-9 {
  width: 75%;
}
</style>
