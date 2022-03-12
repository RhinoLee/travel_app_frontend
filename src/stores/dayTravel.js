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
  }),
  getters: {
  },
  actions: {
    addToTripHandler() {
      const locationStore = useLocationStore()
      const nowLocation = JSON.parse(JSON.stringify(locationStore.nowLocation))
      const tripLength = this.dayTrip.length
      let defaultStartHours = 8
      let defaultMin = 0

      nowLocation.startHours = defaultStartHours + tripLength
      nowLocation.startMin = defaultMin
      nowLocation.endHours = defaultStartHours + tripLength + 1
      nowLocation.endMin = defaultMin

      this.dayTrip.push(nowLocation)
    },
    createDayTripHandler() {
      const payload = {
        name: this.dayTripName,
        tripList: this.dayTrip
      }
      console.log("createDayTripHandler", payload);
      // const api = `${import.meta.env.VITE_BACKEND_HOST}/dayTripCollect`;
      // try {
      //   const result = await axios.post(api, this.dayTrip);
      //   console.log(result);
      //   if (result.data.success) {

      //   }
      // } catch (err) {
      //   console.log(err);
      //   return err
      // }
    }
  },
});
