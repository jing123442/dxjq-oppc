<template>
  <div class="cockpit" ref="cockpit">
    <div class="tool-bar">
      <div class="left-title">
        <div class="title">大象加气 · 大数据中心 · 管理驾驶舱</div>
      </div>
      <div class="right-controller">
        <el-date-picker class="date-picker" v-model="currDate" type="date" placeholder="选择日期" :clearable="false" @change="changeCurrDate"></el-date-picker>
        <el-select v-model="currDistrict" placeholder="全区域" class="district-select" :popper-append-to-body="false" @change="changeCurrDistrict">
          <el-option v-for="item in districtList" :key="item.districtId" :label="item.districtName" :value="item.districtId"></el-option>
        </el-select>
        <div class="full-screen" @click="subpageFullScreen">
          <img src="@/assets/images/cockpit/fullScreen.png" alt="" />
        </div>
      </div>
    </div>
    <div class="data-box">
      <!--分三块区域：第一块：交易金额、充值金额、账户余额；第二块：加气量、进气量、站端库存、在途库存；第三块：活跃车辆数、新增车辆数-->
      <div class="data-group">
        <nt-card :data="cardsData.amountTotal" :options="cards.amountTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
        <nt-card :data="cardsData.rechargeTotal" :options="cards.rechargeTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
        <nt-card :data="cardsData.balnaceTotal" :options="cards.balnaceTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
      </div>
      <div class="data-group">
        <nt-card :data="cardsData.gasQtyTotal" :options="cards.gasQtyTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
        <nt-card :data="cardsData.storeTotal" :options="cards.storeTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
        <nt-card :data="cardsData.stockTotal" :options="cards.stockTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
        <nt-card :data="cardsData.wayTotal" :options="cards.wayTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
      </div>
      <div class="data-group">
        <nt-card :data="cardsData.liveTruckTotal" :options="cards.liveTruckTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
        <nt-card :data="cardsData.addTruckTotal" :options="cards.addTruckTotal" :isNotShow="isToday" :myClass="'align-items__center card-item'"></nt-card>
      </div>
    </div>
    <div class="block-first">
      <div class="block-first-map">
        <nt-charts :webUIType="'map'" :chartOptions="charts">
          <!--区域价格-->
          <div slot="legend" class="legend" v-if="charts.areaPriceStatus">
            <div class="legend-line" v-for="(item, index) in charts.areaPriceList" :key="index"><div class="name">{{item.districtName}}</div><div class="price">{{item.actualPrice | currency}}</div></div>
          </div>
        </nt-charts>
      </div>
      <div class="block-first-right">
        <div class="order-settle">
          <nt-card :data="cardsData.orderTotal" :options="cards.orderTotal" :isNotShow="isToday" :myClass="'justify-content__center align-items__center settle-item'"></nt-card>
          <nt-card :data="cardsData.nopayOrderTotal" :options="cards.nopayOrderTotal" :isNotShow="isToday" :myClass="'justify-content__center align-items__center settle-item'"></nt-card>
          <nt-card :data="cardsData.successOrderTotal" :options="cards.successOrderTotal" :isNotShow="isToday" :myClass="'justify-content__center align-items__center settle-item'"></nt-card>
          <nt-card :data="cardsData.cancelOrderTotal" :options="cards.cancelOrderTotal" :isNotShow="isToday" :myClass="'justify-content__center align-items__center settle-item'"></nt-card>
        </div>
        <!--实时订单信息-->
        <table-list :data="orderRecent"></table-list>
      </div>
    </div>
    <div class="block-echarts">
      <div class="ec-item" v-if="currDistrict !== ''">
        <div class="ec-title">价格变动趋势</div>
        <div class="ec00-line-bar">
          <nt-charts :webUIType="webUIType" :chartOptions="ec00LineBarOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item">
        <div class="ec-title">交易数据统计</div>
        <div class="ec01-line" id="ec01Line">
          <nt-charts :webUIType="webUIType" :chartOptions="ec01LineOptions" style="height: 100%" :chartsId="'ec01Line'"></nt-charts>
        </div>
      </div>
      <div class="ec-item">
        <div class="ec-title">加气站供气统计</div>
        <div class="ec02-bar">
          <nt-charts :webUIType="webUIType" :chartOptions="ec02BarOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item" v-if="currDistrict === ''">
        <div class="ec-title">资金流动趋势</div>
        <div class="ec03-bar-line">
          <nt-charts :webUIType="webUIType" :chartOptions="ec03BarLineOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item" v-if="currDistrict === ''">
        <div class="ec-title">车辆变化趋势</div>
        <div class="ec04-bar-line">
          <nt-charts :webUIType="webUIType" :chartOptions="ec04BarLineOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item">
        <div class="ec-title">加气站变化趋势</div>
        <div class="ec05-bar-line">
          <nt-charts :webUIType="webUIType" :chartOptions="ec05BarLineOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item" v-if="currDistrict === ''">
        <div class="ec-title">
          <span>物流公司变化趋势</span>
        </div>
        <div class="ec06-bar-line">
          <nt-charts :webUIType="webUIType" :chartOptions="ec06BarLineOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item">
        <div class="ec-title">
          <span>加气站排名<span class="curr-date-rank">{{'(日期:' + currDateNotYear + ')'}}</span></span>
          <div class="tab">
            <div :class="gasstationRankActive == 1 ? 'tab-item active' : 'tab-item'" @click="gasstationRankChange(1)">加气量</div>
            <div :class="gasstationRankActive == 2 ? 'tab-item active' : 'tab-item'" @click="gasstationRankChange(2)">加气金额</div>
            <div :class="gasstationRankActive == 3 ? 'tab-item active' : 'tab-item'" @click="gasstationRankChange(3)">加气订单</div>
          </div>
        </div>
        <div class="label-rank">
          <div class="rank-icon">排名</div>
          <div class="rank-gasstationname">加气站名称</div>
        </div>
        <div class="ec07-bar">
          <div class="rank-icon-content">
            <div class="rank-item rank-first">1</div>
            <div class="rank-item rank-second">2</div>
            <div class="rank-item rank-third">3</div>
            <div class="rank-item rank-others">4</div>
            <div class="rank-item rank-others">5</div>
          </div>
          <nt-charts :webUIType="webUIType" :chartOptions="ec07BarOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
      <div class="ec-item" v-if="currDistrict === ''">
        <div class="ec-title">
          <span>物流公司排名<span class="curr-date-rank">{{'(日期:' + currDateNotYear + ')'}}</span></span>
          <div class="tab">
            <div :class="carrierRankActive == 1 ? 'tab-item active' : 'tab-item'" @click="carrierRankChange(1)">加气量</div>
            <div :class="carrierRankActive == 2 ? 'tab-item active' : 'tab-item'" @click="carrierRankChange(2)">加气金额</div>
            <div :class="carrierRankActive == 3 ? 'tab-item active' : 'tab-item'" @click="carrierRankChange(3)">加气订单</div>
          </div>
        </div>
        <div class="label-rank">
          <div class="rank-icon">排名</div>
          <div class="rank-gasstationname">物流公司名称</div>
        </div>
        <div class="ec08-bar">
          <div class="rank-icon-content">
            <div class="rank-item rank-first">1</div>
            <div class="rank-item rank-second">2</div>
            <div class="rank-item rank-third">3</div>
            <div class="rank-item rank-others">4</div>
            <div class="rank-item rank-others">5</div>
          </div>
          <nt-charts :webUIType="webUIType" :chartOptions="ec08BarOptions" style="height: 100%"></nt-charts>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { $strategyGasstationDistrictList } from '@/service/strategy'
import { formateTData, formateParams, isTypeof } from '@/utils/tools'
import { $districtList } from '@/service/user'
import { mapJsonData } from '@/mock/map'
import { markIconImage } from '@/mock/mark'
import { mapAreaList } from '@/mock/area'
import * as cardInfo from '@/mock/card'
import { TableList } from '@/components/index'
import { $findTradeSumList, $findGasstationStockSum, $findFundSum, $findTruckTrendList, $findGasstationTrendList, $findCarrierTrendList, $findTradeRankGasstationList, $findTradeRankCarrierList, $findDayTruckSum, $findDayStockSum, $findDayTradeSum, $findDayFundSum, $findLatestGasorders, $findDistrictPriceTrendList, $settleStatisticsInfo, $settleFullDistrictPrice, $settleStatisticsDistrictPriceList, $settleTradeGasstationsOrderInfo } from '@/service/settle'
export default {
  components: { TableList },
  data() {
    return {
      cards: cardInfo,
      cardsData: {
        amountTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        gasQtyTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        orderTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        nopayOrderTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        successOrderTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        cancelOrderTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        liveTruckTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        addTruckTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        storeTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        stockTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        wayTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        rechargeTotal: { title: '', total: 0, contrast: 0, rate: 0 },
        balnaceTotal: { title: '', total: 0, contrast: 0, rate: 0 }
      },
      charts: {
        id: 'chart-id',
        class: 'charts',
        bgColor: '#ffffff',
        areaPriceList: [],
        areaPriceStatus: false,
        data: {
          status: 0,
          series: [{
            type: 'map',
            geoIndex: 0,
            animation: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {},
            tooltip: {
              show: false
            }
          }, {
            name: 'mark',
            type: 'scatter',
            roam: true,
            coordinateSystem: 'geo',
            symbol: value => markIconImage(value),
            symbolSize: [16, 20],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {},
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 2,
            tooltip: {
              padding: 0,
              borderWidth: 0,
              backgroundColor: '#ffffff',
              formatter: (params, ticket, callback) => {
                $settleStatisticsInfo({ date: this.currDate, gasstationId: params.value[3] }).then(response => {
                  const data = response.data
                  const tmpHtml = `<div class="nt-echarts map-mark-gasstation"><div class="title">${data.gasstationName}</div><div class="tag"><div class="area-district">${data.districtName} ${data.districtRank}</div><div class="all-district">平台 ${data.allDistrictRank}</div></div><div class="number"><div><div class="sign">￥</div><div class="price">${data.actualPrice}</div></div><div class="truck"><div>${data.liveTruckTotal} 辆</div></div></div><div class="box-info"><div><div class="box-iconfont">进</div><div class="box-text">${data.gasQtyTotal} 公斤</div></div><div><div class="box-iconfont">加</div><div class="box-text">${data.storeTotal} 公斤</div></div><div><div class="box-iconfont">存</div><div class="box-text">${data.stockTotal} 公斤</div></div><div><div class="box-iconfont">途</div><div class="box-text">${data.wayTotal} 公斤</div></div></div></div>`

                  callback(ticket, tmpHtml)
                })

                return 'Loading'
              }
            }
          }, {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            symbolOffset: [0, 8],
            rippleEffect: {
              period: 1,
              scale: 3,
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: false
              }
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: 'rgba(255, 0, 0, .3)',
                shadowBlur: 3,
                shadowColor: '#ffffff'
              }
            }
          }]
        },
        map: {
          name: 'china',
          aspectScale: 0.75, // 长宽比
          zoom: 7.5,
          roam: true,
          center: [115.692614, 35.941008],
          data: mapJsonData('all')
        },
        options: {
          xAxisDel: true,
          yAxisDel: true,
          coord: [{ key: 'polar' }],
          tooltip: {
            triggerOn: 'click'
          },
          type: {
            line: true,
            point: true,
            area: true
          },
          geo: {
            label: {
              normal: {
                show: false,
                color: '#999999' // 字的颜色
              },
              emphasis: {
                show: true,
                color: '#828282' // 字的颜色
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#d4d4d4',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: '#fcf9f2' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#ffffff' // 100% 处的颜色
                  }],
                  globalCoord: true // 缺省为 false
                }
              },
              emphasis: {
                areaColor: 'rgba(252, 248, 240, .8)',
                borderWidth: 0.1
              }
            },
            regions: mapAreaList()
          }
        }
      },
      webUIType: '',
      ec00LineBarOptions: {
        data: {
          status: 0
        }
      },
      ec01LineOptions: {
        data: {
          status: 0
        }
      },
      ec02BarOptions: {
        data: {
          status: 0
        }
      },
      ec03BarLineOptions: {
        data: {
          status: 0
        }
      },
      ec04BarLineOptions: {
        data: {
          status: 0
        }
      },
      ec05BarLineOptions: {
        data: {
          status: 0
        }
      },
      ec06BarLineOptions: {
        data: {
          status: 0
        }
      },
      ec07BarOptions: {
        data: {
          status: 0
        }
      },
      ec08BarOptions: {
        data: {
          status: 0
        }
      },
      currDate: formateTData(new Date(), 'date'),
      currDateNotYear: '',
      districtList: [],
      currDistrict: '',
      gasstationRankActive: 1,
      carrierRankActive: 1,
      orderRecent: [],
      isToday: false
    }
  },
  created() {
    this.currDateNotYear = this.currDate.split('-').slice(1, 3).join('-')
    this.initData('init')
  },
  mounted() {
    this.windowResize()
  },
  methods: {
    initData(type = null) {
      // 不是切换区域操作时
      if (type !== 'district') {
        this.toDayEvent()
      }
      this.initDistrictData()
      // 初始化使用
      if (type === 'init') {
        this.getDistrictList()
      }
      this.findTradeSumList()
      this.getGasstationSupply()

      // 不是切换区域操作时
      if (type !== 'district') {
        this.findFundSum()
      }
      // 不是切换区域操作时 或切换后currDistrict为全区域
      if (type !== 'district' || (type === 'district' && this.currDistrict == '')) {
        this.findTruckTrendList()
        this.findCarrierTrendList()
        this.findTradeRankCarrierList()
      }

      this.findGasstationTrendList()
      this.findTradeRankGasstationList()
      this.findDayTruckSum()
      this.findDayStockSum()
      this.findDayTradeSum()
      this.findDayFundSum()
      this.findLatestGasorders()
      this.findDistrictPriceTrendList()
      this.queryTimeOrderData()
    },
    toDayEvent() {
      const nowTimestamp = new Date(formateTData(Date.now(), 'date')).getTime()
      const currTimestamp = new Date(this.currDate).getTime()
      if (nowTimestamp == currTimestamp) {
        // 今天
        this.isToday = true
      } else {
        this.isToday = false
      }
    },
    changeCurrDate() {
      this.currDate = formateTData(this.currDate, 'date')
      this.currDateNotYear = this.currDate.split('-').slice(1, 3).join('-')
      this.initData()
    },
    changeCurrDistrict() {
      this.initData('district')
    },
    cardStatisticsData(total, contrast, rate, title = '') {
      return {
        title: title,
        total: formateParams(total),
        contrast: formateParams(contrast),
        rate: rate
      }
    },
    gasstationRankChange(type) {
      this.gasstationRankActive = type
      this.findTradeRankGasstationList(type)
    },
    carrierRankChange(type) {
      this.carrierRankActive = type
      this.findTradeRankCarrierList(type)
    },
    windowResize() {
      const WIDTH = this.$refs.cockpit ? this.$refs.cockpit.offsetWidth : ''
      document.querySelector('html').style.fontSize = (WIDTH * 62.5) / 1920 + '%'
      window.onresize = () => {
        setTimeout(() => {
          const WIDTH = this.$refs.cockpit.offsetWidth
          document.querySelector('html').style.fontSize = (WIDTH * 62.5) / 1920 + '%'
        }, 100)
      }
    },
    findLatestGasorders() {
      // 最新五条订单数
      const params = { date: this.currDate, districtId: this.currDistrict }
      $findLatestGasorders(params).then(res => {
        if (res.code == 0) {
          this.orderRecent = []
          res.data.forEach(item => {
            this.orderRecent.push({
              updateDate: item.updateDate ? item.updateDate.split('T')[1] : '',
              orderId: item.orderId,
              gasQty: item.gasQty + 'kg',
              amount: '￥' + item.amount,
              carNumber: item.carNumber,
              carrierOrgName: item.carrierOrgName,
              gasstationName: item.gasstationName,
              orderStatus: item.orderStatus
            })
          })
        }
      })
    },
    findDayFundSum() {
      // 平台一天的汇总数据，包含充值总金额、账户余额
      const params = { date: this.currDate }
      $findDayFundSum(params).then(res => {
        const data = res.data

        // 充值金额
        this.cardsData.rechargeTotal = this.cardStatisticsData(data.rechargeTotal, data.yesterdayRechargeTotal, data.rechargeTotalRate)
        // 账户余额
        this.cardsData.balnaceTotal = this.cardStatisticsData(data.balnaceTotal, data.yesterdayBalnaceTotal, data.balnaceTotalRate)
      })
    },
    findDayTradeSum() {
      // 平台一天的交易汇总数据，包含交易金额、交易量、订单总量、待支付、已支付、已取消数
      const params = { date: this.currDate, districtId: this.currDistrict }
      $findDayTradeSum(params).then(res => {
        const data = res.data

        // 交易金额
        this.cardsData.amountTotal = this.cardStatisticsData(data.amountTotal, data.yesterdayAmountTotal, data.amountTotalRate)

        // 加气统计
        this.cardsData.gasQtyTotal = this.cardStatisticsData(data.gasQtyTotal, data.yesterdayGasQtyTotal, data.gasQtyTotalRate)

        // 总订单
        this.cardsData.orderTotal = this.cardStatisticsData(data.orderTotal, data.yesterdayOrderTotal, data.orderTotalRate)

        // 待支付
        this.cardsData.nopayOrderTotal = this.cardStatisticsData(data.nopayOrderTotal, data.yesterdayNopayOrderTotal, data.nopayOrderTotalRate)

        // 已支付
        this.cardsData.successOrderTotal = this.cardStatisticsData(data.successOrderTotal, data.yesterdaySuccessOrderTotal, data.successOrderTotalRate)

        // 已取消
        this.cardsData.cancelOrderTotal = this.cardStatisticsData(data.cancelOrderTotal, data.yesterdayCancelOrderTotal, data.cancelOrderTotalRate)
      })
    },
    findDayTruckSum() {
      // 获取日车辆汇总
      const params = { date: this.currDate, districtId: this.currDistrict }
      $findDayTruckSum(params).then(res => {
        const data = res.data

        // 活跃车辆数
        this.cardsData.liveTruckTotal = this.cardStatisticsData(data.liveTruckTotal, data.yesterdayLiveTruckTotal, data.liveTruckTotalRate)
        // 新增车辆数
        this.cardsData.addTruckTotal = this.cardStatisticsData(data.addTruckTotal, data.yesterdayAddTruckTotal, data.addTruckTotalRate)
      })
    },
    findDayStockSum() {
      // 获取日库存汇总
      const params = { date: this.currDate, districtId: this.currDistrict }
      $findDayStockSum(params).then(res => {
        const data = res.data

        // 进气量
        this.cardsData.storeTotal = this.cardStatisticsData(data.storeTotal, data.yesterdayStoreTotal, data.storeTotalRate)
        // 站端库存
        this.cardsData.stockTotal = this.cardStatisticsData(data.stockTotal, data.yesterdayStockTotal, data.stockTotalRate)
        // 在途库存
        this.cardsData.wayTotal = this.cardStatisticsData(data.wayTotal, data.yesterdayWayTotal, data.wayTotalRate)
      })
    },
    getDistrictList() {
      // 获取区域列表
      $districtList().then((res) => {
        if (res.code == 0) {
          this.districtList = res.data
          res.data.unshift({
            districtId: '',
            districtName: '全区域'
          })
        }
      })
    },
    findDistrictPriceTrendList() {
      // 价格变动趋势
      if (this.currDistrict == '') { return }
      this.ec00LineBarOptions = { data: { status: 0 } }
      const params = { date: this.currDate, districtId: this.currDistrict }
      $findDistrictPriceTrendList(params).then(res => {
        if (res.code == 0) {
          this.ec00LineBarOptions = {
            xAxis: {
              data: []
            },
            data: {
              status: 2,
              series: [{
                name: '平台结算周均价',
                type: 'bar',
                field: 'weekAverageActualPrice',
                data: []
              }, {
                name: '活跃车辆数',
                type: 'line',
                field: 'liveTruckTotal',
                data: []
              }]
            }
          }
          this.commonOptions(this.ec00LineBarOptions, res.data, 'xAxis')
        }
      })
    },
    findTradeSumList() {
      // 查询交易汇总列表
      this.ec01LineOptions = { data: { status: 0 } }
      $findTradeSumList({ date: this.currDate, districtId: this.currDistrict }).then(res => {
        if (res.code == 0) {
          let series = []
          if (this.currDistrict) {
            // 如果按区域差 不显示周活
            series = [{
              name: '加气金额(万)',
              type: 'line',
              field: 'amountTotal',
              data: []
            }, {
              name: '加气量(公斤)',
              type: 'line',
              field: 'gasQtyTotal',
              data: []
            }]
          } else {
            series = [{
              name: '加气金额(万)',
              type: 'line',
              field: 'amountTotal',
              yAxisIndex: 0,
              data: []
            }, {
              name: '加气量(公斤)',
              type: 'line',
              yAxisIndex: 0,
              field: 'gasQtyTotal',
              data: []
            }, {
              name: '周活(%)',
              type: 'line',
              field: 'weekLive',
              yAxisIndex: 1,
              isPercent: true,
              data: []
            }]
          }
          this.ec01LineOptions = {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
            },
            yAxis: [{
              type: 'value',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#333',
                  opacity: 0.1
                }
              }
            }, {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }],
            data: {
              series
            }
          }
          this.commonOptions(this.ec01LineOptions, res.data, 'xAxis')
          this.ec01LineOptions.data.status = 2
        }
      })
    },
    getGasstationSupply() {
      // 加气站供气统计
      this.ec02BarOptions = { data: { status: 0 } }
      $findGasstationStockSum({ date: this.currDate, districtId: this.currDistrict }).then(res => {
        if (res.code == 0) {
          this.ec02BarOptions = {
            grid: {
              left: '13%',
              top: 0
            },
            xAxis: { type: 'value', splitLine: { show: true, lineStyle: { color: '#333', opacity: '0.1' } }, axisLabel: { show: false } },
            yAxis: {
              type: 'category',
              data: [],
              axisLabel: { show: true }
            },
            data: {
              series: [{
                name: '进气量(公斤)',
                type: 'bar',
                stack: '总量',
                showBackground: true,
                field: 'storeTotal',
                data: []
              },
              {
                name: '存量(公斤)',
                type: 'bar',
                stack: '总量',
                field: 'stockTotal',
                data: []
              },
              {
                name: '加气量(公斤)',
                type: 'bar',
                field: 'gasOrderTotal',
                data: []
              }]
            }
          }
          this.commonOptions(this.ec02BarOptions, res.data, 'yAxis')
          this.ec02BarOptions.data.status = 2
        }
      })
    },
    findFundSum() {
      // 获取资金变化趋势
      this.ec03BarLineOptions = { data: { status: 0 } }
      $findFundSum({ date: this.currDate }).then(res => {
        if (res.code == 0) {
          this.ec03BarLineOptions = {
            legend: {
              type: 'scroll',
              left: '8%',
              right: '8%'
            },
            xAxis: {
              data: []
            },
            data: {
              series: [{
                name: '充值金额(元)',
                type: 'bar',
                field: 'rechargeTotal',
                data: []
              }, {
                name: '提现金额(元)',
                type: 'bar',
                field: 'withdrawTotal',
                data: []
              }, {
                name: '消费金额(元)',
                type: 'bar',
                field: 'amountTotal',
                data: []
              }, {
                name: '总余额(元)',
                type: 'line',
                field: 'balanceTotal',
                data: []
              }]
            }
          }
          this.commonOptions(this.ec03BarLineOptions, res.data, 'xAxis')
          this.ec03BarLineOptions.data.status = 2
        }
      })
    },
    findTruckTrendList() {
      // 车辆变化趋势
      this.ec04BarLineOptions = { data: { status: 0 } }
      $findTruckTrendList({ date: this.currDate }).then(res => {
        if (res.code == 0) {
          this.ec04BarLineOptions = {
            legend: {
              type: 'scroll',
              left: '8%',
              right: '8%'
            },
            xAxis: {
              data: []
            },
            data: {
              series: [{
                name: '自营绑定数',
                type: 'bar',
                field: 'bindOwnTotal',
                data: []
              }, {
                name: '自营解绑数',
                type: 'bar',
                field: 'unbindOwnTotal',
                data: []
              }, {
                name: '其他绑定数',
                type: 'bar',
                field: 'bindLinkTotal',
                data: []
              }, {
                name: '其他解绑数',
                type: 'bar',
                field: 'unbindLinkTotal',
                data: []
              }, {
                name: '变化数',
                type: 'line',
                field: 'truckChangeTotal',
                data: []
              }]
            }
          }
          this.commonOptions(this.ec04BarLineOptions, res.data, 'xAxis')
          this.ec04BarLineOptions.data.status = 2
        }
      })
    },
    findGasstationTrendList() {
      // 加气站变化趋势
      this.ec05BarLineOptions = { data: { status: 0 } }
      $findGasstationTrendList({ date: this.currDate, orgType: 1, districtId: this.currDistrict }).then(res => {
        if (res.code == 0) {
          this.ec05BarLineOptions = {
            xAxis: {
              data: []
            },
            data: {
              series: [{
                name: '认证数(个)',
                type: 'bar',
                field: 'authTotal',
                data: []
              }, {
                name: '签约数(个)',
                type: 'bar',
                field: 'signTotal',
                data: []
              }, {
                name: '活跃数(个)',
                type: 'line',
                field: 'tradeTotal',
                data: []
              }]
            }
          }
          this.commonOptions(this.ec05BarLineOptions, res.data, 'xAxis')
          this.ec05BarLineOptions.data.status = 2
        }
      })
    },
    findCarrierTrendList() {
      // 物流公司变化趋势
      this.ec06BarLineOptions = { data: { status: 0 } }
      $findCarrierTrendList({ date: this.currDate, orgType: 2 }).then(res => {
        if (res.code == 0) {
          this.ec06BarLineOptions = {
            xAxis: {
              data: []
            },
            data: {
              series: [{
                name: '认证数(个)',
                type: 'bar',
                field: 'authTotal',
                data: []
              }, {
                name: '签约数(个)',
                type: 'bar',
                field: 'signTotal',
                data: []
              }, {
                name: '活跃数(个)',
                type: 'line',
                field: 'tradeTotal',
                data: []
              }]
            }
          }
          this.commonOptions(this.ec06BarLineOptions, res.data, 'xAxis')
          this.ec06BarLineOptions.data.status = 2
        }
      })
    },
    findTradeRankGasstationList(type = 1) {
      // 1.加气总量；2.加气总金额；3.订单总数
      const params = {
        date: this.currDate,
        type,
        limit: 5,
        districtId: this.currDistrict
      }
      let field = ''
      let seriesName = ''
      field = type == 1 ? 'gasQtyTotal' : type == 2 ? 'amountTotal' : 'orderTotal'
      seriesName = type == 1 ? '加气总量' : type == 2 ? '加气总金额' : '订单总数'
      this.ec07BarOptions = { data: { status: 0 } }
      $findTradeRankGasstationList(params).then(res => {
        if (res.code == 0) {
          this.ec07BarOptions = {
            grid: {
              left: '18%',
              top: '5%',
              bottom: '4%'
            },
            legend: {
              show: false
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                show: false
              }
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                show: true,
                inside: true,
                verticalAlign: 'bottom',
                margin: 0,
                padding: [0, 0, 12, 0]
              },
              data: []
            },
            data: {
              series: [{
                name: seriesName,
                type: 'bar',
                field,
                barWidth: 15,
                showBackground: true,
                label: {
                  show: true,
                  position: ['0.5%', '15%'],
                  color: '#fff',
                  fontSize: 14,
                  textBorderColor: '#5b8ff9',
                  textBorderWidth: 2
                },
                data: []
              }]
            }
          }
          this.commonOptions(this.ec07BarOptions, res.data, 'yAxis', 'gasstationName')
          this.ec07BarOptions.data.status = 2
        }
      })
    },
    findTradeRankCarrierList(type = 1) {
      // 1.加气总量；2.加气总金额；3.订单总数
      const params = {
        date: this.currDate,
        type,
        limit: 5,
        districtId: this.currDistrict
      }
      let field = ''
      let seriesName = ''
      field = type == 1 ? 'gasQtyTotal' : type == 2 ? 'amountTotal' : 'orderTotal'
      seriesName = type == 1 ? '加气总量' : type == 2 ? '加气总金额' : '订单总数'
      this.ec08BarOptions = { data: { status: 0 } }
      $findTradeRankCarrierList(params).then(res => {
        if (res.code == 0) {
          this.ec08BarOptions = {
            grid: {
              left: '18%',
              top: '5%',
              bottom: '4%'
            },
            legend: {
              show: false
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                show: false
              }
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                show: true,
                inside: true,
                verticalAlign: 'bottom',
                margin: 0,
                padding: [0, 0, 12, 0]
              },
              data: []
            },
            data: {
              status: 2,
              series: [{
                name: seriesName,
                type: 'bar',
                field,
                barWidth: 15,
                showBackground: true,
                label: {
                  show: true,
                  position: ['0.5%', '15%'],
                  color: '#fff',
                  fontSize: 14,
                  textBorderColor: '#5b8ff9',
                  textBorderWidth: 2
                },
                data: []
              }]
            }
          }
          this.commonOptions(this.ec08BarOptions, res.data, 'yAxis', 'carrierName')
        }
      })
    },
    commonOptions(options, data, axis, axisField = 'curDate') {
      // 公共option方法
      options.data.series.forEach((se, seIndex) => {
        data.length > 0 && data.forEach(item => {
          if (se.isPercent) {
            se.data.unshift(item[se.field].replace('%', ''))
          } else {
            se.data.unshift(item[se.field])
          }
          if (seIndex === options.data.series.length - 1) {
            if (item.curDate) {
              item.curDate = item.curDate.split('-').slice(1, 3).join('-')
            }
            options[axis].data.unshift(item[axisField])
          }
        })
        Reflect.deleteProperty(se, 'field')
      })
    },
    subpageFullScreen() {
      this.$store.commit('TOGGLE_FULL_SCREEN', this.$refs.cockpit)
    },
    sortAarray(arr) {
      arr.length > 0 && arr.sort((x, y) => {
        const sub = new Date(y.curDate).getTime() - new Date(x.curDate).getTime()
        if (sub > 0) {
          return -1
        } else if (sub < 0) {
          return 1
        }
        return 0
      })
    },
    initDistrictData() {
      this.charts.areaPriceList = []
      $settleStatisticsDistrictPriceList({ date: this.currDate }).then(response => {
        this.charts.areaPriceList.push(...new Set(response.data))
        $settleFullDistrictPrice({ date: this.currDate }).then(res => {
          this.charts.areaPriceList.unshift(res.data)
          this.charts.areaPriceStatus = true
        }).catch(() => { this.charts.areaPriceStatus = true })
      })
      this.gasstationListInfo()
    },
    gasstationListInfo() {
      const params = { date: this.currDate, districtId: this.currDistrict }
      this.charts.data.status = 0
      $strategyGasstationDistrictList(params).then(response => {
        const tmpGasList = []
        Array.isArray(response.data) && response.data.forEach(item => {
          tmpGasList.push({
            name: item.gasstationName,
            value: [item.longitude, item.latitude, item.stock, item.gasstationId.toString()],
            type: item.stock > 0 ? 'normal' : 'warning'
          })
        })
        this.charts.data.series[1].data = tmpGasList
        this.charts.data.status = 2
      })
    },
    queryTimeOrderData() {
      if (this.orderTime) {
        clearInterval(this.orderTime)
      }
      if (this.isToday) {
        this.orderTime = setInterval(() => {
          $settleTradeGasstationsOrderInfo({ seconds: 10 }).then(response => {
            if (response.data && isTypeof(response.data) === 'array') {
              response.data.forEach(item => {
                this.charts.data.series[2].data.push({
                  name: item.gasstationName,
                  type: 'normal',
                  value: [item.longitude, item.latitude, 0, item.gasstationId]
                })
              })
            }

            setTimeout(() => {
              this.charts.data.series[2].data = []
            }, 2000)
          })
          this.findLatestGasorders()
        }, 10000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  div::-webkit-scrollbar{
    width: 8px;
    height: 5px;
  }
  div::-webkit-scrollbar-track{
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }
  div::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius: 10px;
  }
  div::-webkit-scrollbar-thumb:hover{
    background: #333;
  }
  div::-webkit-scrollbar-corner{
    background: #179a16;
  }
</style>
