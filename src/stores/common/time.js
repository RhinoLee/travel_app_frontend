import { defineStore } from "pinia";
import axios from "axios";
export const useTimeStore = defineStore({
  id: "timezone",
  state: () => ({
    timeZoneList: [],
  }),
  getters: {
    hoursList: () => {
      const hoursList = []
      for(let i = 0; i <= 23; i++) {
        hoursList.push(i)
        // hoursList.push( i < 10 ? "0" + i : i.toString(10))
      }

      return hoursList
    },
    minList: () => {
      const minList = []
      for(let i = 0; i <= 59; i++) {
        minList.push(i)
        // minList.push( i < 10 ? "0" + i : i.toString(10))
      }

      return minList
    }
  },
  actions: {
    async getTimeZoneListHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/timezone`;
      try {
        const result = await axios.get(api);
        if (result.data.success && Array.isArray(result.data.timeZoneIdList)) {
          this.timeZoneList = result.data.timeZoneIdList;
        }
        return result;
      } catch (err) {
        return err;
      }
    },
  },
});
