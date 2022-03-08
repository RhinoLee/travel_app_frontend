<script setup>
import "leaflet/dist/leaflet.css"
import { onMounted, reactive, defineProps, defineEmits, watch, toRef } from "vue"
import L from 'leaflet'

const emit = defineEmits(["focusSuggestHandler", "createLocation", "removeLocation"])
const props = defineProps({
  location: {
    type: Array,
    default: () => ([])
  },
  suggestList: {
    type: Array,
    default: () => ([])
  },
  focusSuggestId: {
    type: String,
    default: "",
  },
})
const travelMap = reactive({ map: {} })
const markerGroup = reactive({ suggestMarkerGroup: {} })
const focusSuggestId = toRef(props, 'focusSuggestId')

watch(() => props.suggestList, val => {
  if (!val) return
  suggestMarkHandler()
})

watch(focusSuggestId, val => {
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
    const popupContent = popupHandler({ name: location.name, cate: location.cate })
    marker.markerId = location.id
    marker.bindPopup(popupContent)
    marker.addTo(travelMap.map)
  })
}

// 建議點位插點
function suggestMarkHandler() {
  removeAllMarker()
  if (!props.suggestList || props.suggestList.length === 0) return
  let group = []
  props.suggestList.forEach(suggest => {
    // console.log(suggest.position.lat, suggest.position.lng);
    if (suggest.position) {
      const marker = L.marker([suggest.position.lat, suggest.position.lng])
      const categories = []
      if (suggest.categories) {
        suggest.categories.forEach(category => {
          categories.push(category.name)
        })
      }
      // 設定 popup 內容
      const container = createPopupContent( {
        name: suggest.title,
        address: suggest.address.label,
        categories: categories.join()
      });
      const popup = L.popup();
      popup.setContent(container)
      marker.markerId = suggest.id
      marker.bindPopup(popup)
      marker.on("click", function() {
        emit("focusSuggestHandler", suggest)
      })
      // marker.bindPopup(popupContent)
      group.push(marker)
    }
  })

  markerGroup.suggestMarkerGroup = L.featureGroup(group)
  markerGroup.suggestMarkerGroup.addTo(travelMap.map)
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

function createPopupContent({ name, address, categories }) {
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
  // 新增參考按鈕
  let addFavorButton = L.DomUtil.create(
    "button",
    "addFavorButton",
    btnContainer
  );
  addFavorButton.innerHTML = `<i><img src="assets/img/icon/plusb_blue.png" /></i><span>加入收藏</span>`;
  // 移除參考按鈕
  let removeFavorButton = L.DomUtil.create(
    "button",
    "removeFavorButton",
    btnContainer
  );
  removeFavorButton.innerHTML = `<i><img src="assets/img/icon/cancel_red.png" /></i><span>移除收藏</span>`;

  // 綁定按鈕事件
  L.DomEvent.on(addFavorButton, "click", (e) => {
    console.log("addFavorButton trigger");
    emit("collectLocationHandler")
  });
  L.DomEvent.on(removeFavorButton, "click", (e) => {
    console.log("removeFavorButton trigger");
    emit("removetLocationHandler")
  });

  return container;
}

// 指定建議點位 popup
function focusMarkerHandler(markerId) {
  const layerGroup = markerGroup.suggestMarkerGroup._layers
  Object.keys(layerGroup).forEach(layer => {
    if (layerGroup[layer].markerId === markerId) {
      layerGroup[layer].openPopup()
    }
  })
}

// 移除所有地圖點位
function removeAllMarker() {
  travelMap.map.removeLayer(markerGroup.suggestMarkerGroup)
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