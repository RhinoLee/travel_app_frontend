import { defineStore } from "pinia";
import axios from "axios";
export const useLocationStore = defineStore({
  id: "location",
  state: () => ({
    searchText: "",
    suggestList: [],
    locationList: [],
    focusSuggestId: "",
    nowLocation: {
      name: "",
      address: "",
      category: "",
      lat: null,
      lng: null,
    },
  }),
  getters: {
    suggestWithoutCollect: (state) => {
      const newSuggestList = JSON.parse(JSON.stringify(state.suggestList))
      state.locationList.forEach(location => {
        const targetIndex = newSuggestList.findIndex(suggest => {
          return location.lat === suggest.position.lat && location.lng === suggest.position.lng
        })
        console.log("targetIndex", targetIndex);
        if (targetIndex >= 0) {
          newSuggestList[targetIndex].hasExisted = true
          newSuggestList[targetIndex].id = location.id
        }
      })

      return newSuggestList
    }
  },
  actions: {
    async getSuggestLocation() {
      if (!this.searchText) {
        this.suggestList = []
        return
      }
      const api = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=23.97565,120.97388&in=countryCode:TWN&limit=20&lang=zh-TW&q=${this.searchText}&apikey=${import.meta.env.VITE_HERE_API_KEY}`
      try {
        const result = await axios.get(api)
        if (result && Array.isArray(result.data.items)) {
          this.suggestList = result.data.items
        }
      } catch (err) {
        this.suggestList = []
        console.log(err);
      }
    },
    async getAllLocationHandler() {
      const api = `${import.meta.env.VITE_BACKEND_HOST}/location`;
      try {
        const result = await axios.get(api);
        this.locationList = result.data.locationList
        return result.data.success
      } catch (err) {
        console.log(err);
        return err
      }
    },
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
    focusSuggestHandler(suggest) {
      this.focusSuggestId = suggest.id
      this.nowLocation.name = suggest.title
      this.nowLocation.address = suggest.address.label
      this.nowLocation.lat = suggest.position.lat
      this.nowLocation.lng = suggest.position.lng
      const categories = []
      if (suggest.categories) {
        suggest.categories.forEach(category => {
          categories.push(category.name)
        })
      }
      this.nowLocation.category = categories.join()
    },
    async removeLocationHandler(locationId) {
      // for test
      const api = `${import.meta.env.VITE_BACKEND_HOST}/location`;
      const payload = { locationId }
      try {
        const result = await axios.delete(api, {data: payload});
        return result.data.success
      } catch (err) {
        console.log(err);
        return err
      }
    },
  },
});
