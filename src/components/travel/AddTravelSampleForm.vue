<script setup>
import { storeToRefs } from "pinia";
import Lightbox from "@/components/common/Lightbox.vue"
import { useTimeStore } from "@/stores/common/time"
import { useTravelSampleStore } from "@/stores/travel/travelSample"

const timeStore = useTimeStore()
const travelSampleStore = useTravelSampleStore()
const { hoursList, minList } = storeToRefs(timeStore)
const { travelSample } = storeToRefs(travelSampleStore)

function createDayTripHandler() {
  travelSampleStore.createDayTripHandler()
}

</script>
<template>
  <Lightbox>
    <template v-slot:header>
      <h3>新增行程</h3>
    </template>
    <template v-slot:body>
      <form v-for="location in travelSample" :key="location.id">
        <div class="formGroup">
          <label for="name">地點名稱：</label>
          <span>{{ location.name }}</span>
        </div>
        <div class="formGroup">
          <div class="title">開始時間：</div>
          <div class="group">
            <label for="startHours">時</label>
            <select v-model="location.startHours" id="startHours">
              <option v-for="hour in hoursList" :key="hour" :value="hour">{{ hour }}</option>
            </select>
            <label for="startMin">分</label>
            <select v-model="location.startMin" id="startMin">
              <option v-for="min in minList" :key="min" :value="min">{{ min }}</option>
            </select>
          </div>
        </div>
        <div class="formGroup">
          <div class="title">結束時間</div>
          <div class="group">
            <label for="endHours">時</label>
            <select v-model="location.endHours" id="endHours">
              <option v-for="hour in hoursList" :key="hour" :value="hour">{{ hour }}</option>
            </select>
            <label for="endMin">分</label>
            <select v-model="location.endMin" id="endMin">
              <option v-for="min in minList" :key="min" :value="min">{{ min }}</option>
            </select>
          </div>
        </div>
        <hr>
      </form>
    </template>
    <template v-slot:footer>
      <button @click="createDayTripHandler">儲存行程</button>
    </template>
  </Lightbox>
</template>