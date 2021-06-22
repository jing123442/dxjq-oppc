<template>
  <baidu-map style="padding: 0;padding-bottom: 40px;margin-bottom: 0;" :style="mapStyle" ref="map" class="template-main bm-view" :ak="akey"
             :center="center"
             :zoom="zoom"
             :scroll-wheel-zoom="true"
             @ready="initMap"
             @moving="syncCenterAndZoom"
             @moveend="syncCenterAndZoom"
             @zoomend="syncCenterAndZoom">
    <bm-view style="width: 100%; height:100%;"></bm-view>
    <!--缩放按钮-->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <!--marker点-->
    <bm-marker v-for="(item, index) of gasstationList" :key="index" :position="{lng: item.longitude, lat: item.latitude}" :icon="mapMarkIcon(item)"></bm-marker>

    <div class="map-control-warp">
      <span class="title">大象加气 · 作战地图</span>
      <div class="map-card">
        <div class="card-input">
          <el-select v-model="finds.districtId" @change="initGasstationList" placeholder="区域">
            <el-option
              v-for="item in districtList"
              :key="item.districtId"
              :label="item.districtName"
              :value="item.districtId">
            </el-option>
          </el-select>
          <el-select v-model="finds.gasType" @change="initGasstationList" placeholder="全站点类型">
            <el-option
              v-for="item in gasstationType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="btn-echarts"></div>
        </div>
        <div class="card-control">
          <el-input
            placeholder="请输入加气站"
            suffix-icon="el-icon-search"
            v-model="finds.gasstationName">
          </el-input>
          <ul class="card-list" :style="{ height: (mapHeight - 345) + 'px'}">
            <li v-for="(item, index) of gasstationList" :key="index" :class="'icon-' + (item.gasType || 2004)">
              <div class="title">
                <div>
                  <span class="item-name">{{item.gasstationName}}</span>
                  <span>[{{getGasstationTypeName(item.gasType)}}]</span>
                </div>
                <div class="item-type" v-if="item.gasType === 1003">盟</div>
              </div>
              <div class="content">
                  <span>
                    <span class="number">{{item.offlineGasQty}} 吨</span><span class="time">({{item.offlineGasQtyDate || '-'}})</span>
                  </span>
                <span>
                    <span class="number">{{item.offlinePrice}} 公斤</span><span class="time">({{item.offlinePriceDate || '-'}})</span>
                  </span>
              </div>
            </li>
          </ul>
          <div class="map-list-pagination">共 {{pages.total}} 站点</div>
          <!--<el-pagination
            small
            class="map-list-pagination"
            :page-sizes="[pages.size]"
            :page-size="pages.size"
            layout="total, pager"
            @current-change="handleCurrentChange"
            :total="pages.total">
          </el-pagination>-->
        </div>
      </div>
    </div>
    <bm-local-search :keyword="address" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
  </baidu-map>
</template>
<script>
import { BaiduMap, BmView, BmMarker, BmLocalSearch, BmNavigation, BmBoundary } from 'vue-baidu-map'
import { $gasdataGasstationList } from '@/service/gasdata'
import { $districtList } from '@/service/user'
export default {
  name: 'battle',
  components: {
    BaiduMap,
    BmView,
    BmMarker,
    BmBoundary,
    BmLocalSearch,
    BmNavigation
  },
  data: function () {
    return {
      akey: 'dfhycORtYDMz78dNLo9oNiDO1ufI2TZS',
      address: '',
      mapStatus: false,
      showMapComponent: false,
      mapStyle: {
        width: '100%',
        height: '100%'
      },
      mapHeight: '',
      center: { lng: 115.692614, lat: 35.941008 },
      zoom: 7,
      pages: {
        page: 1,
        size: 10,
        total: 0
      },
      finds: {
        districtId: '',
        gasType: null,
        gasstationName: ''
      },
      districtList: [],
      gasstationList: [],
      gasstationType: [
        { value: null, label: '全部站点' },
        { value: 100, label: '大象站' },
        { value: 1001, label: '大象自营' },
        { value: 1002, label: '大象合作' },
        { value: 1003, label: '大象加盟' },
        { value: 2001, label: '中海油' },
        { value: 2002, label: '中石油' },
        { value: 2003, label: '中石化' },
        { value: 2004, label: '社会' }
      ],
      BMap: null,
      map: null,
      blist: []
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // 重置地图高度
    this.mapHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    console.log(this.mapHeight)
  },
  methods: {
    // 初始化数据
    initData() {
      // 初始化区域list
      this.initDistrictList()
      // 加气站list
      this.initGasstationList()
    },
    initDistrictList() {
      $districtList({}).then(response => {
        this.districtList = response.data
        this.districtList.unshift({ districtId: null, districtName: '全部' })
      })
    },
    initGasstationList() {
      const params = {
        param: this.finds
      }
      $gasdataGasstationList(params).then(response => {
        this.gasstationList = response.data || []
        this.pages.total = this.gasstationList.length
      })
    },
    initMap({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.blist = []
      this.tmpArray = []

      this.districtLoading = 2
      this.addDistrictName('青岛市')
      this.addDistrictName('烟台市')
    },
    addDistrictName(districtName) {
      // 网格渲染
      var bdary = new this.BMap.Boundary()
      bdary.get(districtName, (rs) => { // 获取行政区域
        const count = rs.boundaries.length // 行政区域的点有多少个

        this.tmpArray.push(...rs.boundaries)
        for (let i = 0; i < count; i++) {
          this.blist.push({ points: rs.boundaries[i], name: districtName })
        }

        this.districtLoading--
        if (this.districtLoading === 0) {
          // console.log([...new Set(this.tmpArray)])
          this.mapAeraView()
        }
      })
    },
    mapAeraView() {
      // 循环添加各闭合区域
      console.log(this.blist)
      for (var i = 0; i < 81; i++) {
        // 添加多边形层并显示
        var ply = new this.BMap.Polygon(this.blist[i].points, {
          strokeWeight: 1,
          strokeColor: 'rgba(0, 0, 0, 1)',
          fillOpacity: 0.2,
          fillColor: ' #2765E2'
        }) // 建立多边形覆盖物
        this.map.addOverlay(ply)
      }
    },
    mapMarkIcon(item) {
      let imageURL = require('@/assets/images/battle/g_map_icon_default.png')

      if (item.gasType === 100 || item.gasType === 1001 || item.gasType === 1002 || item.gasType === 1003) {
        imageURL = require('@/assets/images/battle/g_map_icon_1.png')
      } else if (item.gasType === 2001) {
        imageURL = require('@/assets/images/battle/g_map_icon_2.png')
      } else if (item.gasType === 2002) {
        imageURL = require('@/assets/images/battle/g_map_icon_3.png')
      } else if (item.gasType === 2003) {
        imageURL = require('@/assets/images/battle/g_map_icon_4.png')
      } else if (item.gasType === 2004) {
        imageURL = require('@/assets/images/battle/g_map_icon_default.png')
      }
      return { url: imageURL, size: { width: 20, height: 26 } }
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.initGasstationList()
    },
    // 获取加气站类型
    getGasstationTypeName(type) {
      let name = '-'

      this.gasstationType.forEach(item => {
        if (type === item.value) {
          name = item.label
        }
      })

      return name
    },
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

<style lang="scss">
  .map-control-warp {
    top: 0;
    left: 0;
    position: absolute;
    padding: 15px;
    .title {
      font-weight: bold;
    }
    .map-card {
      padding: 10px;
      width: 280px;
      margin-top: 10px;
      background-color: rgba(255, 255, 255, 1);

      .el-input__inner {
        height: 30px;
        color: #5B8FF9;
        line-height: 30px;
        border: 1px solid #5B8FF9;
      }
      .el-input__icon {
        line-height: 30px;
      }
      .card-input {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #EDEDED;
        white-space: nowrap;
        .el-select {
          width: 95px;
          margin-right: 10px;
        }
        .btn-echarts {
          width: 30px;
          height: 30px;
          cursor: pointer;
          border-radius: 5px;
          background-color: #5B8FF9;
        }
      }
      .card-control {
        .map-list-pagination {
          padding: 0;
          padding-top: 10px;
          border-top: 1px solid #EDEDED;
          font-size: 12px;
          font-weight: bold;
          color: #333333;
        }
        .card-list {
          height: 100px;
          overflow: hidden;
          overflow-y: auto;
          padding-inline-start: 0;
        }
        .card-list li {
          padding: 5px 5px 5px 35px;
          list-style: none;
          background-size: 22px 29px;
          background-repeat: no-repeat;
          background-position: 5px center;
          &:nth-child(2n + 1) {
            background-color: #F7F8FA;
          }
          &.icon-1001, &.icon-1002, &.icon-1003 {
            background-image: url(../../assets/images/battle/g_icon_1.png);
          }
          &.icon-2001 {
            background-image: url(../../assets/images/battle/g_icon_2.png);
          }
          &.icon-2002 {
            background-image: url(../../assets/images/battle/g_icon_3.png);
          }
          &.icon-2003 {
            background-image: url(../../assets/images/battle/g_icon_4.png);
          }
          &.icon-2004 {
            background-image: url(../../assets/images/battle/g_icon_default.png);
          }
          .title, .title > div {
            display: flex;
            align-items: center;
          }
          .title {
            justify-content: space-between;
            span {
              display: inline-block;
              font-size: 12px;
              font-weight: normal;
            }
            .item-name {
              width: 50%;
              color: #333333;
              font-size: 14px;
              font-weight: bold;
              display: -webkit-box;
              /*作为弹性伸缩盒子模型显示*/
              -webkit-line-clamp: 1;
              /*显示的行数；如果要设置2行加...则设置为2*/
              overflow: hidden;
              /*超出的文本隐藏*/
              text-overflow: ellipsis;
              /* 溢出用省略号*/
              -webkit-box-orient: vertical;
              /*伸缩盒子的子元素排列：从上到下*/
            }
            .item-type {
              width: 15px;
              height: 15px;
              line-height: 15px;
              text-align: center;
              font-size: 9px;
              border-radius: 2px;
              background-color: #22BA55;
              color: #ffffff;
            }
          }
          .content {
            padding-top: 5px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            & > span {
              &:first-child {
                padding-right: 15px;
              }
            }
            .number {
              font-weight: bold;
            }
            .time {
              font-size: 11px;
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
