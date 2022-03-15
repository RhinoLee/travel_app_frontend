<script setup>
import { useDayTravelStore } from "@/stores/dayTravel"
import { onMounted } from "@vue/runtime-core"
import { storeToRefs } from "pinia"
import Map from "@/components/common/Map.vue"

const dayTravelStore = useDayTravelStore()
const { collectList } = storeToRefs(dayTravelStore)

function getCollectDetail(collectId) {
  dayTravelStore.nowCollectId = collectId
  dayTravelStore.getCollectDetail(collectId)
}

onMounted(() => {
  dayTravelStore.getAllCollectHandler()
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
