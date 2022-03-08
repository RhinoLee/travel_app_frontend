import { defineStore } from "pinia";
import axios from "axios";
export const useLocationStore = defineStore({
  id: "location",
  state: () => ({
    nowLocation: {
      name: "",
      address: "",
      category: "",
      lat: null,
      lng: null,
    }
  }),
  getters: {
  },
  actions: {
    async collectLocationHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/location`;
      const payload = this.nowLocation
      try {
        const result = await axios.post(api, payload);
        return result.data.success
      } catch (err) {
        console.log(err);
        return err
      }
    },
    // async removeLocationHandler() {
    //   // for test
    //   const api = `${import.meta.env.VITE_BACKEND_HOST}/location`;
    //   const payload = this.nowLocationId
    //   try {
    //     const result = await axios.delete(api, payload);
    //     return result.data.success
    //   } catch (err) {
    //     console.log(err);
    //     return err
    //   }
    // },
  },
});
