import { defineStore } from "pinia";
import axios from "axios";
export const useTravelStore = defineStore({
  id: "travel",
  state: () => ({
    travelList: [
      {
        id: 1,
        title: "Travel1",
        start_time: "2022/01/01 8:00",
        end_time: "2022/01/06 20:00",
      },
      {
        id: 2,
        title: "Travel2",
        start_time: "2022/02/01 9:00",
        end_time: "2022/02/03 21:00",
      },
    ],
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
    nowTravelId: null,
    nowTripId: null,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
    trip: (state) => {
      return state.travel.trips.filter((trip) => {
        return trip.id === state.nowTripId;
        console.log(trip.id === state.nowTripId);
      })[0];
    },
  },
  actions: {
    async getTravelListHandler() {
      console.log("getTravelListHandler");
      // const api = "/abc";
      // try {
      //   const result = await axios.get(api, payload);
      //   if (result) {
      //     // 更新列表
      //     console.log("取得列表");
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    },
    async createTripHandler() {
      console.log("createTripHandler");
      // const api = "/abc";
      // try {
      //   const result = await axios.post(api, payload);
      //   if (result) {
      //     return true
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    },
  },
});
