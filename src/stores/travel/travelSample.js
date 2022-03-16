import { defineStore } from "pinia";
import axios from "axios";
import { useLocationStore } from "@/stores/travel/location";
export const useTravelSampleStore = defineStore({
  id: "travelSample",
  state: () => ({
    addStartTime: "",
    addEndTime: "",
    travelSampleName: "",
    travelSample: [],
    collectList: [],
    nowCollectId: null,
  }),
  getters: {
  },
  actions: {
    addToTripHandler() {
      const locationStore = useLocationStore()
      const nowLocation = JSON.parse(JSON.stringify(locationStore.nowLocation))
      const tripLength = this.travelSample.length
      const defaultStartHours = 8
      const defaultMin = 0

      nowLocation.startHours = (defaultStartHours + tripLength).toString(10).padStart(2, "0")
      nowLocation.startMin = defaultMin.toString(10).padStart(2, "0")
      nowLocation.endHours = (defaultStartHours + tripLength + 1).toString(10).padStart(2, "0")
      nowLocation.endMin = defaultMin.toString(10).padStart(2, "0")
      nowLocation.startTime = nowLocation.startHours + ":" + nowLocation.startMin
      nowLocation.endTime = nowLocation.endHours + ":" + nowLocation.endMin

      this.travelSample.push(nowLocation)
    },
    async createDayTripHandler() {
      const addSampleApi = `${import.meta.env.VITE_BACKEND_HOST}/travel_sample`;
      const addSampleResult = await axios.post(addSampleApi, { name: this.travelSampleName })

      if (addSampleResult.data.success && this.travelSample.length > 0) {
        console.log("prepare add location to daytrip");
        const addSampleLocatioApi = `${import.meta.env.VITE_BACKEND_HOST}/location_trip_collect`;
        const payload = {
          dayTripId: addSampleResult.data.travelSample.id,
          tripList: this.travelSample,
        }

        try {
          const addSampleLocationResult = await axios.post(addSampleLocatioApi, payload)
          console.log("addSampleLocationResult", addSampleLocationResult);
        } catch (err) {
          console.log("addSampleLocationResult err", err);
        }

      }
    },
    async getAllCollectHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/travel_sample`;
      try {
        const result = await axios.get(api);
        console.log(result);
        if (result.data.success) {
          this.collectList = result.data.collectList
        }
      } catch (err) {
        console.log(err);
        this.collectList = []
        return err
      }
    },
    async getCollectDetail(collectId) {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/travel_sample/${this.nowCollectId}`
      try {
        const result = await axios.get(api);
        console.log(result);
        if (result.data.success) {
        }
      } catch (err) {
        console.log(err);
        return err
      }
    }
  },
});
