<template>
  <baidu-map v-bind:style="mapStyle" class="template-main bm-view" :ak="akey"
             :center="center"
             :zoom="zoom"
             :scroll-wheel-zoom="true"
             @moving="syncCenterAndZoom"
             @moveend="syncCenterAndZoom"
             @zoomend="syncCenterAndZoom">
    <bm-view style="width: 100%; height:100%;"></bm-view>
    <bm-control :offset="{width: '10px', height: '10px'}">
      <bm-auto-complete :sugStyle="{ zIndex: 999999 }">
        <div class="map-control-warp">
          <span class="title">大象加气 · 作战地图</span>
          <div class="map-card">111</div>
        </div>
      </bm-auto-complete>
    </bm-control>
    <bm-local-search :keyword="address" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
  </baidu-map>
</template>
<script>
import { BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker } from 'vue-baidu-map'
export default {
  name: 'battle',
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data: function () {
    return {
      akey: 'dfhycORtYDMz78dNLo9oNiDO1ufI2TZS',
      address: '',
      showMapComponent: false,
      mapStyle: {
        width: '100%',
        height: '100%'
      },
      center: { lng: 115.692614, lat: 35.941008 },
      zoom: 7
    }
  },
  methods: {
    /***
     * 地图点击事件。
     */
    getClickInfo (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    /** *确认 */
    confirm: function () {
      this.showMapComponent = false
      this.$emit('confirm', this.center)
    },
    /** *取消 */
    cancel: function () {
      this.showMapComponent = false
      this.$emit('cancel', this.showMapComponent)
    }
  }
}
</script>

<style lang="scss" scoped>
  .map-control-warp {
    padding: 15px;
    .title {
      font-weight: bold;
    }
    .map-card {
      padding: 10px;
      width: 260px;
      margin-top: 10px;
      background-color: rgba(255, 255, 255, .9);
    }
  }
</style>
