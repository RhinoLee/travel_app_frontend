<script setup>
import { onMounted } from "vue"
import { storeToRefs } from 'pinia'
import { useTravelPlansStore } from "@/stores/travel/travelPlans"
import { useRouter } from "vue-router"
import AddTravelPlan from "@/components/travel/AddTravelPlan.vue"

const router = useRouter()
const store = useTravelPlansStore()
const { travelPlanList } = storeToRefs(store)

function gotoPlan(planId) {
  store.nowTravelPlanId = planId
  router.push({
    name: "TravelPlan",
    params: { planId }
  })
}

async function deletePlan(planId) {
  const result = await store.deleteTravelPlanHandler(planId)
  if (result) {
    store.getTravelPlansListHandler()
  }
}

onMounted(() => {
  store.getTravelPlansListHandler()
})

</script>

<template>
  <AddTravelPlan></AddTravelPlan>
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
      <tr v-for="travelPlan in travelPlanList" :key="travelPlan.id">
        <td>{{ travelPlan.name }}</td>
        <td>{{ travelPlan.start_date }}</td>
        <td>{{ travelPlan.end_date }}</td>
        <td>
          <a href="javascript:;" @click="gotoPlan(travelPlan.id)">連結</a>
          /
          <a href="javascript:;" @click="deletePlan(travelPlan.id)">刪除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>