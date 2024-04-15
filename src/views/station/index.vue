<template>
  <div class="template-main">
    <div class="box-wrap info">
      <img :src="stationInfo.url || require('@/assets/images/logo.png')" />
      <div class="content-info">
        <p class="info-title">{{ stationInfo.nickName }} <em>{{ stationInfo.djCode }}</em></p>
        <p class="info-time">当前交班日: {{ stationInfo.handoverDate }}</p>
        <p class="info-time">( {{ stationInfo.handoverStart }} 至 {{ stationInfo.handoverEnd }} )</p>
      </div>
      <div class="progress">
        <el-progress type="circle" :width="62" :percentage="stationInfo.healthPoint" :show-text="false"></el-progress>
        <div class="progress-info">
          <p class="number">{{ stationInfo.healthPoint }}</p>
          <p class="name">站康分</p>
        </div>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">当日概况</div>
      <div class="content-box">
        <el-row :gutter="20">
          <el-col :span="6">
            <card-data name="当日加气量" :value="currentInfo.qty" unit="公斤"></card-data>
          </el-col>
          <el-col :span="6">
            <card-data name="当日加气额" :value="currentInfo.sale" unit="万元"></card-data>
          </el-col>
          <el-col :span="6">
            <card-data name="当日销售均价" :value="currentInfo.avgPrice" :compare="currentInfo.avgPriceStatus" unit="元/公斤"></card-data>
          </el-col>
          <el-col :span="6">
            <card-data name="当前平台价" :value="currentInfo.platPrice" :compare="currentInfo.platPriceStatus" unit="元/公斤"></card-data>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="6">
            <card-data name="当前账存" :value="currentInfo.accountQty" unit="吨"></card-data>
          </el-col>
          <el-col :span="6">
            <card-data name="当前实存" :value="currentInfo.actualQty" unit="吨"></card-data>
          </el-col>
          <el-col :span="6">
            <card-data name="当日入库" :value="' '" unit="">
              <div class="info-box">
                <div class="info-item">
                  <div class="name">榜单签收</div>
                  <div class="value">{{ currentInfo.inQty || '-' }}吨</div>
                </div>
                <div class="info-item">
                  <div class="name">设备检测</div>
                  <div class="value">{{ currentInfo.devInQty || '-' }}吨（{{ currentInfo.devInQtyDiff }}吨）</div>
                </div>
              </div>
            </card-data>
          </el-col>
          <el-col :span="6">
            <card-data name="当前在途" :value="currentInfo.onway" unit="吨"></card-data>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">当日时段销量</div>
      <div class="charts">
        <MyChart :option="optionBarOnly"></MyChart>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">经营趋势</div>
      <div class="header-info">
        <div style="white-space: nowrap; padding-right: 8px">交班时点：{{ trendTime }}</div>
        <el-date-picker
            v-model="trendDate"
            @change="changeTrendDate"
            type="daterange"
            size="mini"
            :picker-options="pickerOptions()"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="charts">
        <MyChart :option="optionBar"></MyChart>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

import CardData from '@/components/CardData'
import MyChart from '@/components/MyChart/MyChart'
import {
  $strategyCurrentSales,
  $strategyCurrentStationInfo,
  $strategySmartOperate,
  $strategyStationInfo
} from '@/service/strategy'
import { dataPickerDefault, formatDate, pickerOptions } from '@/utils/tools'

export default {
  name: 'homeInfo',
  components: { CardData, MyChart },
  data() {
    return {
      stationInfo: {},
      currentInfo: {},
      trendDate: [],
      trendTime: '',
      gasstationId: this.$store.state.app.stationId,
      optionBarOnly: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {}
        },
        color: ['rgba(52, 113, 255, 1)'],
        grid: {
          top: '30px',
          right: '0.1%',
          left: '0.1%',
          bottom: '1%',
          containLabel: true
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: '#A3A8B0'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              margin: 12
            },
            splitLine: {
              show: false
            },
            // 横坐标
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：公斤',
            nameTextStyle: {
              color: 'rgba(140, 140, 140, 1)',
              align: 'left'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: 1
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              color: '#333'
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            smooth: true,
            barWidth: 6,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(52, 113, 255, 1)' },
                { offset: 1, color: 'rgba(52, 113, 255, 1)' }
              ])
            },
            data: [12, 14, 22, 32, 14, 54, 123, 221, 12, 234]
          }
        ]
      },
      optionBar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {}
        },
        color: ['rgba(52, 113, 255, 1)', 'rgba(82, 196, 26, 1)', 'rgba(52, 113, 255, 1)'],
        grid: {
          top: '30px',
          right: '0.1%',
          left: '0.1%',
          bottom: '1%',
          containLabel: true
        },
        legend: {
          show: true,
          itemHeight: 8,
          itemWidth: 16,
          type: 'plain',
          left: '10%',
          top: '-1%',
          textStyle: {
            color: '#333',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: '#A3A8B0'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              margin: 12
            },
            splitLine: {
              show: false
            },
            // 横坐标
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：吨',
            nameTextStyle: {
              color: 'rgba(140, 140, 140, 1)',
              align: 'left'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: 1
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              color: '#333'
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            name: '单位：元/公斤',
            nameTextStyle: {
              color: 'rgba(140, 140, 140, 1)',
              align: 'right'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: 1
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              color: '#333'
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '入库量',
            type: 'bar',
            barWidth: 6,
            smooth: true,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(52, 113, 255, 1)' },
                { offset: 1, color: 'rgba(52, 113, 255, 0.3)' }
              ])
            },
            data: []
          },
          {
            name: '加气量',
            type: 'bar',
            barWidth: 6,
            smooth: true,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(82, 196, 26, 1)' },
                { offset: 1, color: 'rgba(82, 196, 26, 0.3)' }
              ])
            },
            data: []
          },
          {
            name: '销售均价',
            type: 'line',
            showAllSymbol: false, // 显示所有图形。
            smooth: true,
            symbolSize: 5,
            symbol: 'circle',
            yAxisIndex: 1,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(52, 113, 255, 1)' },
                { offset: 1, color: 'rgba(52, 113, 255, 0.3)' }
              ])
            },
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    pickerOptions,
    initData() {
      // 获取站信息
      $strategyStationInfo({ gasstationId: this.gasstationId }).then(res => {
        this.stationInfo = res.data || {}
      })
      // 单日概况
      $strategyCurrentStationInfo({ gasstationId: this.gasstationId }).then(res => {
        this.currentInfo = res.data || {}
      })
      // 单日销量统计
      $strategyCurrentSales({ date: formatDate(new Date(), 'yyyy-MM-dd'), gasstationId: this.gasstationId }).then(res => {
        const xAxis = []
        const barData = []
        res.data && res.data.forEach(item => {
          xAxis.push(item.daytime)
          barData.push(item.qty)
        })

        this.optionBarOnly.xAxis[0].data = xAxis
        this.optionBarOnly.series[0].data = barData
      })
      // 智慧数据经营趋势
      const { start, end } = dataPickerDefault(new Date('2024-04-10 08:00:00'), -30)
      this.trendDate.push(end, start)
      this.trendCharts()
    },
    trendCharts() {
      $strategySmartOperate({ startDate: formatDate(this.trendDate[0], 'yyyy-MM-dd'), endDate: formatDate(this.trendDate[1], 'yyyy-MM-dd'), gasstationId: this.gasstationId }).then(res => {
        const data = res.data.data || []
        const xAxis = []
        const inQty = [] // 入库量
        const saleQty = [] // 加气量
        const saleValuePrice = [] // 销售均价

        this.trendTime = res.data.handoverTime || ''
        data.forEach(item => {
          xAxis.push(formatDate(item.date, 'MM-dd'))
          inQty.push(item.inQty)
          saleQty.push(item.saleQty)
          saleValuePrice.push(item.saleValuePrice)
        })

        this.optionBar.xAxis[0].data = xAxis
        this.optionBar.series[0].data = inQty
        this.optionBar.series[1].data = saleQty
        this.optionBar.series[2].data = saleValuePrice
      })
    },
    changeTrendDate() {
      this.trendCharts()
    },
    historyClick() {
      this.$router.push('homeDetail')
    }
  }
}
</script>
<style lang="scss" scoped>
.box-wrap.info {
  display: flex;
  padding: 20px;
  font-size: 14px;

  img {
    width: 70px;
    height: 70px;
    border-radius: 4px;
  }

  .content-info {
    font-size: 14px;
    margin-left: 12px;
    margin-right: 70px;

    .info-title {
      font-size: 16px;
      font-weight: 800;

      em {
        padding: 1px 7px;
        font-size: 12px;
        font-style: normal;
        border-radius: 4px;
        color: rgba(52, 113, 255, 1);
        background-color: rgba(240, 245, 255, 1);
      }
    }

    .info-time {
      color: rgba(140, 140, 140, 1);
    }
  }

  .progress {
    position: relative;

    .progress-info {
      width: 62px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .number {
        line-height: 20px;
        font-size: 20px;
        color: #3471ff;
        font-weight: bold;
      }

      .name {
        font-size: 10px;
        color: #262626;
      }
    }
  }
}

.content-box {
  padding: 20px;
}

.charts {
  height: 185px;
  padding: 10px 20px;
}

.history-btn {
  position: absolute;
  right: 20px;
  top: 14px;
  font-size: 14px;
  font-weight: 600;
  color: #3471FF;
  padding-left: 17px;
  cursor: pointer;

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 2px;
    left: 0;
    background: url(~@/assets/images/new/home/history.png) no-repeat;
    background-size: contain;
  }
}

.header-info {
  position: absolute;
  right: 20px;
  top: 14px;
  font-size: 14px;
  color: rgba(140, 140, 140, 1);
  display: flex;
  align-items: center;
}

.info-box {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);

  line-height: 30px;
  font-size: 12px;
  color: rgba(89, 89, 89, 1);

  .info-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .value {
    margin-left: 10px;
    color: rgba(38, 38, 38, 1);
    font-weight: bold;
  }
}
</style>
