<script setup>
import { useTravelStore } from "@/stores/travel"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useTravelStore()

function gotoTravel(travelId) {
  store.nowTravelId = travelId
  router.push({
    name: "Trips",
    params: { travelId }
  })
}

function createTrip() {
  store.createTripHandler()
}

</script>

<template>
  <div class="create">
    <div>
      <label for="tripName">旅程名稱：</label>
      <input type="text" />
    </div>
    <div>
      <label for="tripName">開始時間：</label>
      <input type="text" />
    </div>
    <div>
      <label for="tripName">結束時間：</label>
      <input type="text" />
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
      <tr v-for="travel in store.travelList" :key="travel.id">
        <td>{{ travel.title }}</td>
        <td>{{ travel.start_time }}</td>
        <td>{{ travel.end_time }}</td>
        <td>
          <a href="javascript:;" @click="gotoTravel(travel.id)">連結</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>