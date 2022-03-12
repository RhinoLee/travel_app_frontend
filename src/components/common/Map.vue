<script setup>
import "leaflet/dist/leaflet.css"
import { onMounted, reactive, defineProps, defineEmits, watch, toRef } from "vue"
import L from 'leaflet'

const emit = defineEmits(["focusSuggestHandler", "focusLocationHandler", "createLocation", "removeLocation", "addToTripHandler"])
const props = defineProps({
  location: {
    type: Array,
    default: () => ([])
  },
  suggestList: {
    type: Array,
    default: () => ([])
  },
  locationList: {
    type: Array,
    default: () => ([])
  },
  focusMarkId: {
    type: [String, Number],
    default: "",
  },
  addToTrip: {
    type: Boolean,
    default: false
  }
})
const travelMap = reactive({ map: {} })
const markerGroup = reactive({ suggestMarkerGroup: {}, locationMarkerGroup: {} })
const focusMarkId = toRef(props, 'focusMarkId')

watch(() => props.suggestList, val => {
  if (!val) return
  suggestMarkHandler()
})

watch(() => props.locationList, val => {
  if (!val) return
  locationMarkerHandler()
})

watch(focusMarkId, val => {
  if (!val) return
  focusMarkerHandler(val)
})

// 圖資設定
const layersControl = {
  nlsc: {
    url: "https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}",
    attribution:
      "<a href='https://www.tgos.tw/tgos/web/tgos_home.aspx' target='_blank'>&copy; TGOS</a>",
  },
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      "<a href='https://www.openstreetmap.org' target='_blank'>&copy; OpenStreetMap</a>",
  },
  setting: {
    position: "topright",
    collapsed: false,
  },
}

const nlscLayer = L.tileLayer(layersControl.nlsc.url, {
  id: "nlscLayer",
  attribution: layersControl.nlsc.attribution,
});

const osmLayer = L.tileLayer(layersControl.osm.url, {
  id: "osmLayer",
  attribution: layersControl.osm.attribution,
});

// 地圖設定
const mapControl = {
  fullscreenControl: true,
  center: [23.97565, 120.97388],
  zoom: 8,
  zoomControl: true,
  zoomAnimation: false,
  fadeAnimation: true,
  markerZoomAnimation: true
}

// 初始化地圖
function mapInit() {
  travelMap.map = L.map("map", mapControl);
  // 圖資設定
  L.control
    .layers(
      {
        nlsc: nlscLayer,
        osm: osmLayer,
      },
      null,
      layersControl.setting
    )
    .addTo(travelMap.map);
  osmLayer.addTo(travelMap.map); // 預設圖資
}

// 地圖插點
// function markHandler() {
//   if (!props.location || props.location.length === 0) return
//   props.location.forEach(location => {
//     const marker = L.marker(location.latlng)
//     const popupContent = popupHandler({ name: location.name, cate: location.cate })
//     marker.markerId = location.id
//     marker.bindPopup(popupContent)
//     marker.addTo(travelMap.map)
//   })
// }

// 建議點位插點

function suggestMarkHandler() {
  removeSuggestMarker()
  if (!props.suggestList || props.suggestList.length === 0) return
  let group = []
  // 待實作： 跟 locationList 比對，座標不一樣才插點
  props.suggestList.forEach(suggest => {
    // console.log(suggest.position.lat, suggest.position.lng);
    if (suggest.position && !suggest.hasExisted) {
      const marker = L.marker([suggest.position.lat, suggest.position.lng])
      const categories = []
      if (suggest.categories) {
        suggest.categories.forEach(category => {
          categories.push(category.name)
        })
      }
      // 設定 popup 內容
      const container = createPopupContent({
        locationId: suggest.id,
        name: suggest.title,
        address: suggest.address.label,
        categories: categories.join(),
        addBtn: true
      });
      const popup = L.popup();
      popup.setContent(container)
      marker.markerId = suggest.id
      marker.bindPopup(popup)
      marker.on("click", function () {
        emit("focusSuggestHandler", suggest)
      })
      // marker.bindPopup(popupContent)
      group.push(marker)
    }
  })

  markerGroup.suggestMarkerGroup = L.featureGroup(group)
  markerGroup.suggestMarkerGroup.addTo(travelMap.map)
}

// 收藏點位插點
function locationMarkerHandler() {
  removeLocationMarker()
  if (!props.locationList || props.locationList.length === 0) return
  let group = []
  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  props.locationList.forEach(location => {
    // const marker = L.marker([location.lat, location.lng])
    const marker = L.marker([location.lat, location.lng], { icon: greenIcon })
    // 設定 popup 內容
    const container = createPopupContent({
      locationId: location.id,
      name: location.name,
      address: location.address,
      categories: location.category,
      addBtn: false
    });
    const popup = L.popup();
    popup.setContent(container)
    marker.markerId = location.id
    marker.bindPopup(popup)
    marker.on("click", function () {
      emit("focusLocationHandler", location)
    })

    group.push(marker)
  })

  markerGroup.locationMarkerGroup = L.featureGroup(group)
  markerGroup.locationMarkerGroup.addTo(travelMap.map)
}

// 地圖點位 popup 內容設置
function popupHandler({ name, address, categories }) {

  const popupContent = `
  <div>
    <p>名稱：${name}</p>
    <p>分類：${categories}</p>
    <p>地址：${address}</p>
  </div>
  `

  return popupContent
}

function createPopupContent({ locationId, name, address, categories, addBtn }) {
  // create container
  let container = L.DomUtil.create("div", "location-pop");
  // searchName
  let titleDOM = L.DomUtil.create("div", "title", container);
  titleDOM.innerText = name;
  // 地址
  let addressDOM = L.DomUtil.create("div", "address", container);
  addressDOM.innerHTML = `<div>地址：${address}</div>`;
  // 分類
  let categoriesDOM = L.DomUtil.create("div", "categories", container);
  categoriesDOM.innerHTML = `<div>分類：${categories}</div>`;
  // create btn container
  let btnContainer = L.DomUtil.create("div", "pop-btn-wrap", container);

  if (props.addToTrip) {
    // 新增加入行程按鈕
    let addToTripButton = L.DomUtil.create(
      "button",
      "addToTripButton",
      btnContainer
    );
    addToTripButton.innerHTML = `<i><img src="assets/img/icon/plusb_blue.png" /></i><span>加入行程</span>`;

    // 綁定按鈕事件
    L.DomEvent.on(addToTripButton, "click", (e) => {
      emit("addToTripHandler")
    });
  }

  if (addBtn) {
    // 新增參考按鈕
    let addFavorButton = L.DomUtil.create(
      "button",
      "addFavorButton",
      btnContainer
    );
    addFavorButton.innerHTML = `<i><img src="assets/img/icon/plusb_blue.png" /></i><span>加入收藏</span>`;

    // 綁定按鈕事件
    L.DomEvent.on(addFavorButton, "click", (e) => {
      console.log("addFavorButton trigger");
      emit("collectLocationHandler")
    });
  } else {
    // 移除參考按鈕
    let removeFavorButton = L.DomUtil.create(
      "button",
      "removeFavorButton",
      btnContainer
    );
    removeFavorButton.innerHTML = `<i><img src="assets/img/icon/cancel_red.png" /></i><span>移除收藏</span>`;

    // 綁定按鈕事件
    L.DomEvent.on(removeFavorButton, "click", (e) => {
      console.log("removeFavorButton trigger");
      emit("removeLocationHandler", locationId)
    });
  }

  return container;
}

// 指定建議、收藏點位 popup
function focusMarkerHandler(markerId) {
  const suggestMarkerGroup = markerGroup.suggestMarkerGroup._layers || {}
  const locationMarkerGroup = markerGroup.locationMarkerGroup._layers || {}

  if (Object.keys(suggestMarkerGroup).length > 0) {
    Object.keys(suggestMarkerGroup).forEach(layer => {
      if (suggestMarkerGroup[layer].markerId === markerId) {
        suggestMarkerGroup[layer].openPopup()
      }
    })
  }

  if (Object.keys(locationMarkerGroup).length > 0) {
    Object.keys(locationMarkerGroup).forEach(layer => {
      if (locationMarkerGroup[layer].markerId === markerId) {
        locationMarkerGroup[layer].openPopup()
      }
    })
  }
}

// 移除所有建議點位
function removeSuggestMarker() {
  travelMap.map.removeLayer(markerGroup.suggestMarkerGroup)
}

// 移除所有收藏點位
function removeLocationMarker() {
  travelMap.map.removeLayer(markerGroup.locationMarkerGroup)
}


onMounted(() => {
  mapInit()
  // markHandler()
})

</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss">
#map {
  width: 100%;
  height: 100vh;
}
</style>