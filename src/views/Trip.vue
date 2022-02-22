<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useTravelStore } from '@/stores/travel'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useTravelStore()
const { trip } = storeToRefs(store)

onMounted(() => {
  store.nowTripId = Number(route.params.tripId)
})

</script>

<template>
  <h1>Trip</h1>
  <div v-if="trip">
    <h1>旅程： {{ trip.title }}</h1>
    <div>簡介： {{ trip.intro }}</div>
    <div>心得：{{ trip.description }}</div>
    <div v-for="(location, idx) in trip.location" :key="idx">
      <div>評價: {{ location.rate }}</div>
      <div>圖片集：</div>
      <div>
        <img v-for="photo in location.photos" :key="photo.id" :src="photo.url">
      </div>
    </div>
  </div>
</template>

<style>
</style>
