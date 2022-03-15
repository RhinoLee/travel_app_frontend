import { defineStore } from "pinia";
import axios from "axios";
import { useLocationStore } from "@/stores/location";
export const useDayTravelStore = defineStore({
  id: "dayTravel",
  state: () => ({
    addStartTime: "",
    addEndTime: "",
    dayTripName: "",
    dayTrip: [],
    collectList: [],
    nowCollectId: null,
  }),
  getters: {
  },
  actions: {
    addToTripHandler() {
      const locationStore = useLocationStore()
      const nowLocation = JSON.parse(JSON.stringify(locationStore.nowLocation))
      const tripLength = this.dayTrip.length
      const defaultStartHours = 8
      const defaultMin = 0

      nowLocation.startHours = (defaultStartHours + tripLength).toString(10).padStart(2, "0")
      nowLocation.startMin = defaultMin.toString(10).padStart(2, "0")
      nowLocation.endHours = (defaultStartHours + tripLength + 1).toString(10).padStart(2, "0")
      nowLocation.endMin = defaultMin.toString(10).padStart(2, "0")
      nowLocation.startTime = nowLocation.startHours + ":" + nowLocation.startMin
      nowLocation.endTime = nowLocation.endHours + ":" + nowLocation.endMin

      this.dayTrip.push(nowLocation)
    },
    async createDayTripHandler() {
      const addDayTripApi = `${import.meta.env.VITE_BACKEND_HOST}/daytrip_collect`;
      const addDayTripResult = await axios.post(addDayTripApi, { name: this.dayTripName })

      if (addDayTripResult.data.success && this.dayTrip.length > 0) {
        console.log("prepare add location to daytrip");
        const addTripApi = `${import.meta.env.VITE_BACKEND_HOST}/single_trip_collect`;
        const payload = {
          dayTripId: addDayTripResult.data.dayTrip.id,
          tripList: this.dayTrip,
        }

        try {
          const addTripResult = await axios.post(addTripApi, payload)
          console.log("addTripResult", addTripResult);
        } catch (err) {
          console.log("addTripResult err", err);
        }

      }
    },
    async getAllCollectHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/daytrip_collect`;
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
      const api = `${import.meta.env.VITE_BACKEND_HOST}/daytrip_collect/${this.nowCollectId}`
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
