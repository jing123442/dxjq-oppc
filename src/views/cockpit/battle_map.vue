<template>
  <div class="template-main" v-loading.fullscreen.lock="mapStatus" element-loading-text="正在加载地图信息，请等待..." style="padding: 0;padding-bottom: 40px;margin-bottom: 0; height: 100%;">
    <baidu-map :style="mapStyle" ref="map"  class="bm-view" :ak="akey"
               :center="center"
               :zoom="zoom"
               :dragging="true"
               :scroll-wheel-zoom="true"
               @touchend="syncCenterAndZoom"
               @touchmove="syncCenterAndZoom"
               @mousemove="syncCenterAndZoom"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom">
      <bm-view style="width: 100%; height:100%;"></bm-view>
      <!--缩放按钮-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{height: 55}"></bm-navigation>
      <!--marker点-->
      <bm-marker v-for="(item, index) of gasstationList" :key="index" :position="{lng: item.longitude, lat: item.latitude}" :icon="mapMarkIcon(item)" :title="item.gasstationName" @click="markerClickEvent(item)">
        <bm-label v-if="item.markerStatus" :content="markerLabelContent(item)" :labelStyle="markerLabelStyle" :offset="{width: -50, height: -57}" />
        <bm-info-window :position="{lng: item.longitude, lat: item.latitude}" :show="item.markerWindowStatus" @close="infoWindowClose(item)" @open="infoWindowOpen(item)" style="border-width: 0;">
          <div class="bm-header">
            <div><img src="@/assets/images/logo.png" width="35" height="35" /></div>
            <div>
              <div class="title">
                <span class="item-name text-overflow-ellipsis">{{item.gasstationName}}</span>
                <span class="item-tag">[{{getGasstationTypeName(item.gasType)}}]</span>
              </div>
              <div class="address text-overflow-ellipsis">{{item.address}}</div>
            </div>
          </div>
          <div class="bm-content">
            <div class="bm-content__price">
              <div class="bm-content__price-item">
                <div class="name">平台结算价<span class="timer">({{ item.priceDate | formatDate('hh:mm:ss') }})</span></div>
                <div class="price"><span class="text-bold-number">{{ item.price | currency }}</span> /公斤</div>
              </div>
              <div class="bm-content__price-item">
                <div class="name">线下结算价<span class="timer">({{ item.offlinePriceDate | formatDate('hh:mm:ss') }})</span></div>
                <div class="price"><span class="text-bold-number">{{ item.offlinePrice | currency }}</span> /公斤</div>
              </div>
              <div></div>
            </div>
          </div>
          <div class="bm-charts">
            <div class="bm-charts__title">总加气量 <span class="text-bold-number">{{ (item.gasQty + item.offlineGasQty) }}</span> 吨</div>
            <nt-charts v-if="item.markerWindowStatus" :webUIType="'echart'" :chartOptions="gasQtyChartOption"></nt-charts>
          </div>
          <div class="bm-bottom">
            <el-button size="mini" type="primary" plain>情报编辑</el-button>
            <el-button size="mini" type="primary" plain>情报凭证</el-button>
          </div>
        </bm-info-window>
      </bm-marker>
      <bm-local-search :keyword="address" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
    </baidu-map>
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
          <div class="btn-echarts" :class="buttonClsDataAnalysis" @click="dataAnalysisEvent('open')"></div>
        </div>
        <div class="card-control">
          <el-input
            placeholder="请输入加气站"
            suffix-icon="el-icon-search"
            v-model="filterGasstationName">
          </el-input>
          <ul class="card-list" :style="{ height: (mapHeight - 345) + 'px'}">
            <li v-for="(item, index) of currGasstationList" :key="index" :class="'icon-' + (item.gasType || 2004)" @click="markerClickEvent(item)">
              <div class="title">
                <div>
                  <span class="item-name text-overflow-ellipsis">{{item.gasstationName}}</span>
                  <span class="item-tag">[{{getGasstationTypeName(item.gasType)}}]</span>
                </div>
                <div class="item-type" v-if="item.gasType === 1003">盟</div>
              </div>
              <div class="content">
                  <span>
                    <span class="text-bold-number">{{ (item.gasQty + item.offlineGasQty) }}</span>吨<span class="time">({{ item.offlineGasQtyDate | formateTData('date') }})</span>
                  </span>
                <span>
                    <span class="text-bold-number">{{ item.offlinePrice | currency }}</span>/公斤<span class="time">({{ item.offlinePriceDate | formateTData('date') }})</span>
                  </span>
              </div>
            </li>
          </ul>
          <div class="map-list-pagination">共 {{pages.total}} 站点</div>
        </div>
      </div>
    </div>
    <div v-if="markerDataAnalysisStatus" class="map-control-warp data-analysis" :style="{ height: (mapHeight - 174) + 'px'}">
      <div class="title">
        <div>智能分析 · {{ analysisDistrictName }}</div>
        <div @click="dataAnalysisEvent('close')"><i class="el-icon-close"></i></div>
      </div>
      <div class="gasstation-warp" :style="{ height: (mapHeight - 240) + 'px'}">
        <div class="gasstation">
          <div class="gasstation__title">LNG价格对比<span>(元/公斤)</span></div>
          <div class="gasstation__content">
            <li v-for="(item, index) of priceCompareList" :key="index">
              <div class="progress-item">
                <div class="progress-item__line" :class="item.color" :style="{width: item.width + '%'}"></div>
                <div v-if="item.show" class="progress-item__name text-overflow-ellipsis">{{ item.name }}</div>
              </div>
              <div class="name">{{ item.label }} <span>{{ item.number | formateMoney }}</span></div>
            </li>
          </div>
        </div>
        <div class="gasstation">
          <div class="gasstation__title">LNG站点分布<span>(共 <span class="text-bold-number">{{ gasSpreadTotal }}</span> 站点)</span></div>
          <div class="gasstation__content-vertical">
            <li v-for="(item, index) of gasSpreadList" :key="index">
              <div class="progress-vertical-item"><div class="gasstation-number" :class="item.color" :style="{height: item.width + '%'}"></div></div>
              <div class="name">{{ item.number }}</div>
              <div class="name">{{ item.label }}</div>
            </li>
          </div>
        </div>
        <div class="gasstation">
          <div class="gasstation__title">LNG市场份额<span>(单日 <span class="text-bold-number">{{ gasLNGSaleTotal }}</span> 吨)</span></div>
          <div class="gasstation__content-chart">
            <nt-charts :webUIType="'echart'" :chartOptions="lngMarketChartOption"></nt-charts>
          </div>
        </div>
      </div>
    </div>
    <div class="map-control-opt">
      <el-checkbox v-model="markerTitleStatus" size="small" border @click.native="markerLabelEvent">地标文字</el-checkbox>
      <el-button size="small">新增</el-button>
      <el-button size="small">变更记录</el-button>
    </div>
  </div>
</template>
<script>
import { BaiduMap, BmView, BmMarker, BmLocalSearch, BmNavigation, BmLabel, BmInfoWindow } from 'vue-baidu-map'
import { $gasdataGasstationList, $gasdataGasstationAnalyses, $gasdataGasstationBazaarAnalyses } from '@/service/gasdata'
import { $districtList } from '@/service/user'
import { currency, formatDate } from '@/utils/filters'
export default {
  name: 'battle',
  components: {
    BaiduMap,
    BmView,
    BmMarker,
    BmLabel,
    BmLocalSearch,
    BmNavigation,
    BmInfoWindow
  },
  data: function () {
    return {
      akey: 'dfhycORtYDMz78dNLo9oNiDO1ufI2TZS',
      address: '',
      mapStatus: false,
      showMapComponent: false,
      markerTitleStatus: false,
      mapStyle: {
        width: '100%',
        height: '100%'
      },
      mapHeight: '',
      center: { lng: 115.692614, lat: 35.941008 },
      markerLabelStyle: { border: '1px solid #6E7A8F', boxShadow: '0px 0px 18px 0px rgba(0, 0, 0, 0.1)', borderRadius: '4px', fontSize: '12px', zIndex: 10000, color: '#333333' },
      zoom: 7,
      pages: {
        page: 1,
        size: 10,
        total: 0
      },
      finds: {
        districtId: '',
        gasType: null
      },
      filterGasstationName: '',
      districtList: [],
      gasstationList: [],
      currGasstationList: [],
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
      blist: [],
      buttonClsDataAnalysis: 'no',
      markerDataAnalysisStatus: false,
      gasQtyChartOption: { data: { status: 0 } },
      lngMarketChartOption: { data: { status: 0 } },
      priceCompareList: [],
      gasSpreadList: [],
      gasSpreadTotal: 0,
      gasLNGSaleTotal: 0
    }
  },
  computed: {
    analysisDistrictName() {
      const districtItem = this.districtList.filter(item => this.finds.districtId === item.districtId)

      return districtItem ? districtItem[0].districtName : '全区域'
    }
  },
  watch: {
    filterGasstationName: {
      handler(newVal, oldVal) {
        this.filterGasstationList(newVal)
      }
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // 重置地图高度
    this.mapHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  methods: {
    // 初始化数据
    initData() {
      // 初始化区域list
      this.initDistrictList()
      // 加气站list
      this.initGasstationList()
    },
    async dataAnalysisEvent(type) {
      if (type === 'open') {
        if (this.markerDataAnalysisStatus) return false

        this.priceCompareList = []
        this.gasSpreadList = []
        if (await this.dataAnalysisCharts()) {
          this.markerDataAnalysisStatus = true
          this.buttonClsDataAnalysis = 'ok'
        }
      } else {
        this.markerDataAnalysisStatus = false
        this.buttonClsDataAnalysis = 'no'
      }
    },
    async dataAnalysisCharts() {
      const params = {
        districtId: this.finds.districtId
      }
      const analyses = await $gasdataGasstationAnalyses(params).then(response => {
        return response.data || {}
      }).catch(() => {
        return false
      })
      const analysesBazaar = await $gasdataGasstationBazaarAnalyses(params).then(response => {
        return response.data || {}
      }).catch(() => {
        return false
      })

      if (analyses && analysesBazaar) {
        // LNG价格对比
        const maxTotal = Math.max(analyses.top, analyses.low, analyses.onAverage, analyses.offAverage)
        this.priceCompareList.push(this.analysesItemOption('非大象最高', analyses.topGas, analyses.top || 0, 'color_1', maxTotal))
        this.priceCompareList.push(this.analysesItemOption('非大象最低', analyses.lowGas, analyses.low || 0, 'color_2', maxTotal))
        this.priceCompareList.push(this.analysesItemOption('大象平台平均', '', analyses.onAverage || 0, 'color_3', maxTotal, false))
        this.priceCompareList.push(this.analysesItemOption('大象线下平均', '', analyses.offAverage || 0, 'color_4', maxTotal, false))

        // LNG站点分布
        const tmpTotal = (Number(analyses.dx) + Number(analyses.zhy) + Number(analyses.zsh) + Number(analyses.zsy) + Number(analyses.sh)).toFixed(0)
        this.gasSpreadTotal = tmpTotal
        this.gasSpreadList.push(this.analysesItemOption('大象', '', analyses.dx || 0, 'color_1', tmpTotal))
        this.gasSpreadList.push(this.analysesItemOption('中海油', '', analyses.zhy || 0, 'color_2', tmpTotal))
        this.gasSpreadList.push(this.analysesItemOption('中石油', '', analyses.zsh || 0, 'color_3', tmpTotal))
        this.gasSpreadList.push(this.analysesItemOption('中石化', '', analyses.zsy || 0, 'color_4', tmpTotal))
        this.gasSpreadList.push(this.analysesItemOption('社会', '', analyses.sh || 0, 'color_5', tmpTotal))

        // LNG市场份额统计图
        this.lngMarketDataChart(analysesBazaar)

        return true
      } else {
        return false
      }
    },
    analysesItemOption(label = '', name = '', number = '', color = '', total = '', show = true) {
      const tmpNumber = total ? (Number(number) / Number(total)).toFixed(2) : 0

      return {
        label: label,
        name: name,
        number: number,
        width: tmpNumber * 100,
        total: total,
        show: show,
        color: color
      }
    },
    initDistrictList() {
      $districtList({}).then(response => {
        this.districtList = response.data
        this.districtList.unshift({ districtId: '', districtName: '全区域' })
      })
    },
    filterGasstationList(value) {
      this.currGasstationList = this.gasstationList.filter(item => item.gasstationName.indexOf(value) !== -1)
    },
    initGasstationList() {
      const params = this.finds

      this.filterGasstationName = ''
      this.dataAnalysisEvent('close')
      $gasdataGasstationList(params).then(response => {
        const res = response.data || []
        // 通过接口获取的数据，不可变
        this.gasstationList = [...new Set(res)]
        // 可通过加气站名过来
        this.currGasstationList = [...new Set(res)]
        this.pages.total = this.gasstationList.length
      })
    },
    initMap({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.blist = []
      this.tmpArray = []

      this.districtLoading = 2
      // this.addDistrictName('青岛市')
      // this.addDistrictName('烟台市')
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
    markerLabelContent(item) {
      let html = ''

      html += '<div class="marker-label-tag"><div class="title">' + item.gasstationName + '</div><div class="detail"><div class="number"><span class="text-bold-number">' + (item.gasQty + item.offlineGasQty) + '</span> 吨</div><div class="money"><span class="text-bold-number">' + currency(item.price) + '</span>/公斤</div></div></div>'

      return html
    },
    markerLabelEvent() {
      this.mapStatus = true
      this.$nextTick(() => {
        this.gasstationList.forEach(item => {
          item.markerStatus = !this.markerTitleStatus
        })
        this.mapStatus = false
      })
    },
    mapAeraView() {
      // 循环添加各闭合区域
      console.log(this.blist)
      for (var i = 0; i < this.blist.length; i++) {
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
    lngMarketDataChart(data) {
      const dxTotal = Number(data.dxOnTotal) + Number(data.hzTotal) + Number(data.zyTotal)
      const otherTotal = Number(data.jmTotal) + Number(data.zhyTotal) + Number(data.zsyTotal) + Number(data.zshTotal) + Number(data.shTotal)

      this.gasLNGSaleTotal = data.total
      this.lngMarketChartOption = {
        xAxisDel: true,
        yAxisDel: true,
        dataZoomDel: true,
        axisPointerDel: true,
        color: ['#22BA55', '#2765E2', 'rgba(34, 186, 85, .8)', 'rgba(34, 186, 85, .6)', 'rgba(34, 186, 85, .4)', '#30D5CF', '#5D47FD', '#FABE10', '#FA472E', '#6E7A8F'],
        tooltip: {
          confine: true,
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            if (params.name === '大象加气' || params.name === '其他') {
              return params.name + '：' + params.value + '(' + params.percent + '%)'
            } else {
              let title = ''
              if (params.name === '平台' || params.name === '自营线下' || params.name === '合作线下') {
                title = '大象加气'
              } else {
                title = '其他'
              }
              return title + '<br/>' + params.name + '：' + params.value + '(' + params.percent + '%)'
            }
          }
        },
        legend: {
          right: 0,
          type: 'scroll',
          orient: 'vertical',
          selectedMode: false,
          data: ['平台', '自营线下', '合作线下', '加盟线下', '中海油', '中石油', '中石化', '社会']
        },
        grid: {
          containLabel: true,
          left: 10,
          right: 20,
          bottom: 20,
          top: 10
        },
        data: {
          status: 2,
          series: [{
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            clickable: false,
            hoverAnimation: false,
            itemStyle: {},
            radius: [0, '30%'],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: dxTotal, name: '大象加气' },
              { value: otherTotal, name: '其他' }
            ]
          }, {
            name: ['大象加气', '其他'],
            type: 'pie',
            radius: ['50%', '65%'],
            clickable: false,
            hoverAnimation: false,
            itemStyle: {},
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: data.dxOnTotal, name: '平台' },
              { value: data.zyTotal, name: '自营线下' },
              { value: data.hzTotal, name: '合作线下' },
              { value: data.jmTotal, name: '加盟线下' },
              { value: data.zhyTotal, name: '中海油' },
              { value: data.zsyTotal, name: '中石油' },
              { value: data.zshTotal, name: '中石化' },
              { value: data.shTotal, name: '社会' }
            ]
          }]
        }
      }
    },
    gasQtyChartDataChart(data) {
      this.gasQtyChartOption = {
        xAxisDel: true,
        yAxisDel: true,
        dataZoomDel: true,
        axisPointerDel: true,
        color: ['#2765E2', '#21B552'],
        tooltip: {
          show: false
        },
        legend: {
          left: 'right',
          selectedMode: false,
          data: ['平台', '线下']
        },
        grid: {
          containLabel: true,
          left: 10,
          right: 10,
          bottom: 20,
          top: 30
        },
        data: {
          status: 2,
          series: [{
            name: '',
            type: 'pie',
            clickable: false,
            hoverAnimation: false,
            legendHoverLink: false,
            silent: true,
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            itemStyle: {},
            data: [
              { value: data.gasQty, name: '平台' },
              { value: data.offlineGasQty, name: '线下' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: true,
              position: 'outside',
              formatter: function(parmas) {
                const dataTime = parmas.name === '平台' ? data.gasQtyDate : data.offlineGasQtyDate

                return parmas.value + '吨 (' + parmas.percent + '%)\n(' + formatDate(dataTime, 'yyyy-MM-dd') + ')'
              }
            },
            labelLine: {
              normal: {
                length: 8,
                length2: 8,
                lineStyle: {
                  width: 1
                }
              }
            }
          }]
        }
      }
    },
    // 点击某个点弹框
    markerClickEvent(item) {
      this.infoWindowOpen(item)
    },
    // 关闭窗口
    infoWindowClose(item) {
      item.markerWindowStatus = false
    },
    // 打开窗口
    infoWindowOpen(item) {
      this.mapStatus = true

      // 统计图
      this.gasQtyChartDataChart(item)
      this.$nextTick(() => {
        item.markerWindowStatus = true

        this.mapStatus = false
      })
    },
    syncCenterAndZoom (e) {
      console.log(e)
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    }
  }
}
</script>

<style lang="scss">
  .BMap_pop {
    width: 330px;
    div:nth-child(1), div:nth-child(3), div:nth-child(5), div:nth-child(7) {
      & > div {
        border-color: rgba(0, 0, 0, 0.05) !important;
      }
    }
    div:nth-child(8) {
      // display: none;
    }
    .BMap_top, .BMap_center, .BMap_bottom {
      border-color: rgba(0, 0, 0, 0.05) !important;
    }
    .BMap_bubble_content {
      width: 300px !important;
      height: 350px !important;
      .bm-header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .title {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .item-tag {
            width: 80%;
            font-size: 13px;
            white-space: nowrap;
          }
          .item-name {
            width: 50%;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .address {
          color: #999999;
          font-size: 12px;
        }
      }
      .bm-content {
        &__price {
          padding: 10px;
          margin: 10px 0;
          background-color: #F7F7F7;
          display: flex;
          align-items: center;
          justify-content: space-around;
          &-item {
            text-align: center;
            .name {
              color: #666666;
              font-size: 12px;
              .timer {
                font-size: 10px;
                display: inline-block;
              }
            }
            .price {
              color: #333333;
              font-size: 12px;
            }
          }
        }
      }
      .bm-charts {
        height: 190px;
        width: 300px;
        border-bottom: 1px solid #333333;
        margin-bottom: 10px;
        &__title {
          color: #333333;
          height: 13px;
          line-height: 13px;
          padding-left: 18px;
          position: absolute;
          margin-top: 6px;
          font-size: 13px;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url(../../assets/images/battle/g_qty_icon.png);
        }
      }
    }
  }
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
      width: 330px;
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
        align-items: center;
        justify-content: space-between;
        .el-select {
          width: 135px;
          margin-right: 10px;
        }
        .btn-echarts {
          width: 30px;
          height: 30px;
          cursor: pointer;
          border-radius: 5px;
          background-size: 60% 60%;
          background-repeat: no-repeat;
          background-position: center;
          border: 2px solid #5B8FF9;
          &.no {
            background-color: #5B8FF9;
            background-image: url(../../assets/images/battle/g_ans_no.png);
          }
          &.ok {
            background-color: #ffffff;
            background-image: url(../../assets/images/battle/g_ans_ok.png);
          }

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
          cursor: pointer;
          padding: 8px 8px 8px 35px;
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
              font-size: 12px;
              font-weight: normal;
            }
            .item-tag {
              white-space: nowrap;
            }
            .item-name {
              max-width: 170px;
              color: #333333;
              font-size: 14px;
              font-weight: bold;
            }
            .item-type {
              height: 15px;
              line-height: 15px;
              padding: 0 1.5px;
              font-size: 9px;
              border-radius: 2px;
              background-color: #22BA55;
              color: #ffffff;
            }
          }
          .content {
            padding-top: 10px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            & > span {
              &:first-child {
                padding-right: 15px;
              }
            }
            .time {
              font-size: 11px;
              color: #999999;
            }
          }
        }
      }
    }
    &.data-analysis {
      top: 48px;
      left: 360px;
      width: 300px;
      overflow: hidden;
      background-color: #ffffff;
      .gasstation-warp {
        overflow: hidden;
        overflow-y: auto;
      }
      .title {
        font-size: 16px;
        font-weight: bold;
        padding-top: 5px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #ededed;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          cursor: pointer;
          color: #999999;
          font-weight: bold;
        }
      }
      .name {
        color: #333333;
        font-size: 12px;
        span {
          font-weight: bold;
        }
      }
      .gasstation {
        padding-bottom: 15px;
        &__title {
          font-size: 13px;
          font-weight: bold;
          span {
            color: #999999;
            font-size: 12px;
            font-weight: normal;
          }
        }
        &__content {
          li {
            list-style: none;
            padding: 5px 0;
            display: flex;
            height: 32px;
            align-items: flex-start;
            justify-content: space-between;
            .progress-item {
              width: 120px;
              &__name {
                color: #999999;
                font-size: 10px;
              }
              &__line {
                height: 5px;
                border-radius: 3px;
                &.color_1 {
                  background-color: #2765E2;
                }
                &.color_2 {
                  background-color: #2765E2;
                }
                &.color_3 {
                  background-color: #4EC877;
                }
                &.color_4 {
                  background-color: #A7E3BB;
                }
              }
            }
            .name {
              margin-top: -5px;
            }
          }
        }
        &__content-vertical {
          display: flex;
          align-items: center;
          justify-content: space-between;
          li {
            list-style: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            .progress-vertical-item {
              height: 100px;
              width: 6px;
              transform: rotate(180deg);
              background-color: #ededed;
              .gasstation-number {
                width: inherit;
                height: 20px;
                &.color_1 {
                  background-color: #22BA55;
                }
                &.color_2 {
                  background-color: #5D47FD;
                }
                &.color_3 {
                  background-color: #FABE10;
                }
                &.color_4 {
                  background-color: #FA472E;
                }
                &.color_5 {
                  background-color: #6E7A8F;
                }
              }
            }
          }
        }
        &__content-chart {
          height: 200px;
        }
      }
    }
  }
  .map-control-opt {
    top: 0;
    right: 0;
    padding: 15px;
    position: absolute;
    label {
      padding: 5.5px;
      margin-right: 10px;
      background-color: #ffffff;
    }
    button {
      width: 80px;
      color: #2765E2;
      margin-left: 10px;
    }
  }
  .marker-label-tag {
    padding: 4px 8px;
    .title {
      font-size: 13px;
      font-weight: bold;
      padding-bottom: 8px;
    }
    .detail {
      font-size: 10px;
      color: #6E7A8F;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .number {
        padding-right: 10px;
      }
    }
  }
  .text-bold-number {
    color: #333333 !important;
    font-weight: bold !important;
  }
  .text-overflow-ellipsis {
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
</style>
