import { defineStore } from "pinia";
import { useTimeStore } from "@/stores/common/time";
import axios from "axios";
export const useTravelPlansStore = defineStore({
  id: "travelPlans",
  state: () => ({
    travelPlanList: [],
    travel: {
      id: 1,
      title: "Travel1",
      start_time: "2022/01/01 8:00",
      end_time: "2022/01/06 20:00",
      description: "整趟旅行心得",
      intro: "intro",
      trips: [
        {
          id: 1,
          title: "Day1",
          description: "當日心得",
          intro: "當日簡介",
          location: [
            {
              id: 1,
              cate: "風景",
              name: "test name",
              rate: 5, // 5 顆星
              description: "目的地心得",
              intro: "intro",
              photos: [
                {
                  id: 1,
                  url: "https://picsum.photos/200/300",
                },
                {
                  id: 2,
                  url: "https://picsum.photos/200/300",
                },
                {
                  id: 3,
                  url: "https://picsum.photos/200/300",
                },
              ],
              latlng: {
                lat: 23.9739881,
                lng: 120.9798175,
              },
            },
            {
              id: 2,
              cate: "餐廳",
              name: "test name 2",
              rate: 3, // 3 顆星
              description: "目的地心得",
              intro: "intro",
              photos: [
                {
                  id: 1,
                  url: "https://picsum.photos/200/300",
                },
                {
                  id: 2,
                  url: "https://picsum.photos/200/300",
                },
              ],
              latlng: {
                lat: 23.9584187,
                lng: 121.1169667,
              },
            },
          ],
        },
      ],
    },
    nowTravelPlan: {},
    nowTravelPlanId: null,
    nowTripId: null,
    addTravelName: "test",
    addTravelTimeZone: "",
    addStartDate: "",
    addEndDate: "",
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
    trip: (state) => {
      return state.travel.trips.filter((trip) => {
        console.log(trip.id === state.nowTripId);
        return trip.id === state.nowTripId;
      })[0];
    },
    // dateOffset: (state) => {
    //   if (!state.addStartDate || !state.addEndDate) return
    //   const timeZoneStore = useTimeStore()
    //   const target = timeZoneStore.timeZoneList.filter(timeZone => timeZone.name === state.addTravelTimeZone)[0]
    //   if (!target) return 
    //   const offset = target.utc_offset.hours || 0
    //   const localOffset = new Date(Date.now()).getTimezoneOffset() / 60 // 當地電腦時間與 UTC 的時差
    //   const startDate = new Date(state.addStartDate)
    //   const endDate = new Date(state.addEndDate)

    //   // 先補 localOffset，再加上選擇的時區
    //   startDate.setHours(startDate.getHours() + (-localOffset) + offset * 1)
    //   endDate.setHours(endDate.getHours() + (-localOffset) + offset * 1)
    //   return {
    //     startDate: startDate.toISOString(),
    //     endDate: endDate.toISOString()
    //   }
    // },
  },
  actions: {
    async getTravelPlansListHandler() {
      console.log("getTravelPlansListHandler");
      const api = `${import.meta.env.VITE_BACKEND_HOST}/travel_plan`;
      try {
        const result = await axios.get(api);
        console.log("getTravelPlansListHandler result", result);
        if (result.data.success && Array.isArray(result.data.travelPlanList)) {
          // 更新列表
          console.log("取得列表", result);
          this.travelPlanList = result.data.travelPlanList
          return result
        }
      } catch (err) {
        console.log(err);
        return err
      }
    },
    async getTravelPlanHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/travel_plan/${this.nowTravelPlanId}`;
      try {
        const result = await axios.get(api);
        if (result.data.success && result.data.travel) {
          // 更新列表
          console.log("取得列表", result);
          this.nowTravelPlan = result.data.travel
          return result
        }
      } catch (err) {
        console.log(err);
        return err
      }
    },
    async createTravelPlanHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/travel_plan`;
      const payload = {
        name: this.addTravelName,
        timezone: this.addTravelTimeZone,
        intro: "",
        description: "",
        start_date: this.addStartDate,
        end_date: this.addEndDate,
      }
      try {
        const result = await axios.post(api, payload);
        return result.data.success
      } catch (err) {
        console.log(err);
        return err
      }
    },

    async deleteTravelPlanHandler(planId) {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/travel_plan`
      const payload = { planId }
      try {
        const result = await axios.delete(api, { data: payload })
        return result
      } catch(err) {
        return err
      }
    }
  },
});
