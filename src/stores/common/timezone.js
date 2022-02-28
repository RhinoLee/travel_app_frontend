import { defineStore } from "pinia";
import axios from "axios";
export const useTimeZoneStore = defineStore({
  id: "timezone",
  state: () => ({
    timeZoneList: [],
  }),
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
