<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useTravelPlansStore } from '@/stores/travel/travelPlans'
import { storeToRefs } from 'pinia'
import Map from "@/components/common/Map.vue"

const route = useRoute()
const travelPlansStore = useTravelPlansStore()
const { trip } = storeToRefs(travelPlansStore)

onMounted(() => {
  travelPlansStore.nowTripId = Number(route.params.tripId)
})

</script>

<template>
  <h1>Trip - 當天目的地</h1>
  <div class="trip-wrap" v-if="trip">
    <div class="col-4">
      <h1>旅程： {{ trip.title }}</h1>
      <div>簡介： {{ trip.intro }}</div>
      <div>心得：{{ trip.description }}</div>
      <hr />
      <div v-for="location in trip.location" :key="location.id">
        <div>地點名稱: {{ location.name }}</div>
        <div>地點分類: {{ location.cate }}</div>
        <div>地點評價: {{ location.rate }}</div>
        <div>地點心得: {{ location.description }}</div>
        <div>圖片集：</div>
        <div>
          <img v-for="photo in location.photos" :key="photo.id" :src="photo.url" />
        </div>
      </div>
    </div>
    <div class="col-8">
      <Map :location="trip.location"></Map>
    </div>
  </div>
</template>

<style lang="scss">
.trip-wrap {
  display: flex;
}
.col-4 {
  width: 33.333333%;;
}
.col-8 {
  width: 66.666666%;;
}
</style>
