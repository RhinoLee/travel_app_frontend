<script setup>
import { onMounted } from "vue"
import { storeToRefs } from 'pinia'
import { useTravelStore } from "@/stores/travel"
import { useRouter } from "vue-router"
import AddTravel from "@/components/AddTravel.vue"

const router = useRouter()
const store = useTravelStore()
const { travelList } = storeToRefs(store)

function gotoTravel(travelId) {
  store.nowTravelId = travelId
  router.push({
    name: "Trips",
    params: { travelId }
  })
}

async function deleteTravel(travelId) {
  const result = await store.deleteTravelHandler(travelId)
  if (result) {
    store.getTravelListHandler()
  }
}

onMounted(() => {
  store.getTravelListHandler()
})

</script>

<template>
  <AddTravel></AddTravel>
  <table>
    <thead>
      <tr>
        <th>旅程</th>
        <th>開始時間</th>
        <th>結束時間</th>
        <th>動作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="travel in travelList" :key="travel.id">
        <td>{{ travel.name }}</td>
        <td>{{ travel.start_date }}</td>
        <td>{{ travel.end_date }}</td>
        <td>
          <a href="javascript:;" @click="gotoTravel(travel.id)">連結</a>
          /
          <a href="javascript:;" @click="deleteTravel(travel.id)">刪除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>