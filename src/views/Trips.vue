<script setup>
import { onMounted } from "vue"
import { storeToRefs } from 'pinia'
import { useTravelStore } from '@/stores/travel'
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()
const store = useTravelStore()

const travel = store.travel
const trips = travel.trips
const { nowTravel } = storeToRefs(store)

const travelId = route.params.travelId
store.nowTravelId = travelId


const gotoTrip = (tripId) => {
  store.nowTripId = tripId
  router.push({
    name: "Trip",
    params: { tripId }
  })
}

onMounted(() => {
  store.getTravelHandler()
})

</script>
<template>
  <h1>Trips 每日行程列表</h1>
  <div>
    <h2>總旅程資訊</h2>
    <p>名稱：{{ nowTravel.name }}</p>
    <p>目的地時區：{{ nowTravel.timezone }}</p>
    <p>開始日期：{{ nowTravel.start_date }}</p>
    <p>結束日期：{{ nowTravel.end_date }}</p>
  </div>
  <!-- <div class="trip" v-for="trip in trips" :key="trip.id">
    <a href="javascript:;" @click="gotoTrip(trip.id)">
      <div>旅程： {{ trip.title }}</div>
      <div>簡介： {{ trip.intro }}</div>
    </a>

    <hr />
  </div> -->
</template>

<style lang="scss">
</style>
