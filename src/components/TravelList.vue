<script setup>
import { onMounted } from "vue"
import { storeToRefs } from 'pinia'
import { useTravelStore } from "@/stores/travel"
import { useRouter } from "vue-router"
import DatePickerWrap from "@/components/DatePickerWrap.vue"

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

async function createTrip() {
  const result = await store.createTripHandler()
  store.addTravelName = ""
  if (result) {
    store.getTravelListHandler()
  }
}

onMounted(() => {
  store.getTravelListHandler()
})

</script>

<template>
  <div class="create">
    <div>
      <label for="tripName">旅程名稱：</label>
      <input v-model="store.addTravelName" type="text" />
    </div>
    <div>
      <label for="tripName">旅程時間：</label>
      <DatePickerWrap></DatePickerWrap>
    </div>
    <button @click="createTrip">新增旅程</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>旅程</th>
        <th>開始時間</th>
        <th>結束時間</th>
        <th>連結</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="travel in travelList" :key="travel.id">
        <td>{{ travel.name }}</td>
        <td>{{ travel.start_date }}</td>
        <td>{{ travel.end_date }}</td>
        <td>
          <a href="javascript:;" @click="gotoTravel(travel.id)">連結</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>