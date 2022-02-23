<script setup>
import "leaflet/dist/leaflet.css"
import { onMounted, reactive, defineProps } from "vue"
import L from 'leaflet'

const props = defineProps({
  location: {
    type: Array,
    default: () => ([])
  }
})
const travelMap = reactive({ map: {} })

// 圖資設定
const layersControl = {
  nlsc: {
    url: "https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}",
    attribution:
      "<a href='https://www.tgos.tw/tgos/web/tgos_home.aspx' target='_blank'>&copy; TGOS</a>",
  },
  osm: {
    url: "https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=MRUta8GHrZMhzZCVkTauX9mlsxxe99bzNrdahFi7daqJJl0rr9CxTBEhrma8prTe",
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
  zoomControl: false,
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
function markHandler() {
  if (!props.location || props.location.length === 0) return
  props.location.forEach(location => {
    const marker = L.marker(location.latlng)
    const popupContent = popupHandler({ name: location.name, cate: location.cate, rate: location.rate })
    marker.markerId = location.id
    marker.bindPopup(popupContent)
    marker.addTo(travelMap.map)
  })
}

// 地圖點位 popup 內容設置
function popupHandler({ name, cate, rate }) {
  const popupContent = `
  <div>
    <p>名稱：${name}</p>
    <p>分類：${cate}</p>
    <p>評價：${rate}</p>
  </div>
  `

  return popupContent
}


onMounted(() => {
  mapInit()
  markHandler()
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