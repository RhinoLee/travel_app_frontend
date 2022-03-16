<script setup>
import { onMounted } from "vue"
import { storeToRefs } from 'pinia'
import { useTravelPlansStore } from '@/stores/travel/travelPlans'
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()
const store = useTravelPlansStore()

const travel = store.travel
const trips = travel.trips
const { nowTravelPlan } = storeToRefs(store)

const planId = route.params.planId
store.nowTravelPlanId = planId


const gotoTrip = (tripId) => {
  store.nowTripId = tripId
  router.push({
    name: "Trip",
    params: { tripId }
  })
}

onMounted(() => {
  store.getTravelPlanHandler()
})

</script>
<template>
  <h1>Trips 每日行程列表</h1>
  <div>
    <h2>總旅程資訊</h2>
    <p>名稱：{{ nowTravelPlan.name }}</p>
    <p>目的地時區：{{ nowTravelPlan.timezone }}</p>
    <p>開始日期：{{ nowTravelPlan.start_date }}</p>
    <p>結束日期：{{ nowTravelPlan.end_date }}</p>
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
