<script setup>
import { useTravelStore } from '@/stores/travel'
import { useRouter } from "vue-router"

const router = useRouter()
const store = useTravelStore()

const travel = store.travel
const trips = travel.trips

const gotoTrip = (tripId) => {
  store.nowTripId = tripId
  router.push({
    name: "Trip",
    params: { tripId }
  })
}

</script>
<template>
  <h1>Trips</h1>
  <div class="trip" v-for="trip in trips" :key="trip.id">
    <a href="javascript:;" @click="gotoTrip(trip.id)">
      <div>旅程： {{ trip.title }}</div>
      <div>簡介： {{ trip.intro }}</div>
    </a>
      
    <hr>
  </div>
</template>

<style lang="scss">
</style>
