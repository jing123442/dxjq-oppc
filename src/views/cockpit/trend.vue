<template>
  <div class="template-main">
    <div class="box-wrap">
      <div class="title">整体趋势</div>
      <div class="header-info">
<!--        <div style="white-space: nowrap; padding-right: 8px" v-if="stationValue">交接班：{{ trendAllTime }}</div>-->
        <el-date-picker
          v-model="trendDate"
          @change="trendCharts()"
          type="daterange"
          size="mini"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="stationValue" style="margin-left: 10px;width: 300px" size="mini" @change="stationChange()" placeholder="请选择加气站">
          <el-option v-for="item in stationList" :key="item.gasstationId" :label="item.nickName" :value="item.gasstationId"></el-option>
        </el-select>
      </div>
      <div class="charts">
        <MyChart :option="optionBar"></MyChart>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">物流趋势</div>
      <div class="header-info">
        <el-select v-model="carrierValue" style="margin-left: 10px;width: 200px" size="mini" @change="trendData()" placeholder="请选择物流公司">
          <el-option
            v-for="item in options"
            :key="item.carrierOrgId"
            :label="item.carrierOrgName"
            :value="item.carrierOrgId">
          </el-option>
        </el-select>
      </div>
      <div class="charts">
        <MyChart :option="optionCarrierBar"></MyChart>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

import MyChart from '@/components/MyChart/MyChart'
import { $settleCarriersList, $settleConsumeTrend, $settleConsumeTrendAll } from '@/service/settle'
import { currentMonthTimeArea, formatDate } from '@/utils/tools'
import { $strategyGetStationList } from '@/service/strategy'

export default {
  name: 'homeInfo',
  components: { MyChart },
  data() {
    return {
      trendDate: [],
      trendItemDate: [],
      carrierValue: '',
      options: [],
      stationValue: '',
      stationList: [],
      trendTime: '',
      trendAllTime: '',
      optionBar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {}
        },
        color: ['rgba(52, 113, 255, 1)', 'rgba(82, 196, 26, 1)'],
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
          right: '0%',
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
          }
        ],
        series: [
          {
            name: '物流',
            type: 'bar',
            stack: 'Ad',
            barWidth: 6,
            smooth: true,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            // itemStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     { offset: 0, color: 'rgba(52, 113, 255, 1)' },
            //     { offset: 1, color: 'rgba(52, 113, 255, 0.3)' }
            //   ])
            // },
            data: []
          },
          {
            name: '散户',
            type: 'bar',
            stack: 'Ad',
            barWidth: 6,
            smooth: true,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            // itemStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     { offset: 0, color: 'rgba(82, 196, 26, 1)' },
            //     { offset: 1, color: 'rgba(82, 196, 26, 0.3)' }
            //   ])
            // },
            data: []
          }
        ]
      },
      optionCarrierBar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {}
        },
        color: ['rgba(52, 113, 255, 1)', 'rgba(82, 196, 26, 1)'],
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
          right: '0%',
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
          }
        ],
        series: [
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
    initData() {
      const { start, end } = currentMonthTimeArea(new Date())
      this.trendDate.push(start, end)
      // this.trendItemDate.push(start, end)

      $strategyGetStationList({}).then(res => {
        this.stationList = res.data || []

        if (this.stationList.length > 0) {
          this.currentStationInfo = this.stationList[0]
          this.stationValue = this.stationList[0].gasstationId
        }

        this.trendCharts()
        this.carrierList()
      })
    },
    stationChange() {
      this.trendCharts()
      this.carrierList()
    },
    carrierList() {
      const params = {
        startDate: formatDate(this.trendDate[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.trendDate[1], 'yyyy-MM-dd')
      }
      if (this.stationValue) {
        params.gasstationId = this.stationValue
      }
      $settleCarriersList(params).then(res => {
        this.options = res.data || []

        if (this.options.length > 0) {
          this.carrierValue = this.options[0].carrierOrgId
        }
        this.trendData()
      })
    },
    trendCharts() {
      const params = {
        startDate: formatDate(this.trendDate[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.trendDate[1], 'yyyy-MM-dd')
      }
      if (this.stationValue) {
        params.gasstationId = this.stationValue
      }
      $settleConsumeTrendAll(params).then(res => {
        const data = res.data || []
        const xAxis = []
        const carrierQty = [] // 物流
        const singleQty = [] // 散户

        this.trendAllTime = res.data.handoverTime || ''
        data.forEach(item => {
          xAxis.push(item.datetime)
          carrierQty.push(item.carrierQty)
          singleQty.push(item.singleQty)
        })

        this.optionBar.xAxis[0].data = xAxis
        this.optionBar.series[0].data = carrierQty
        this.optionBar.series[1].data = singleQty
      })
    },
    trendData() {
      const params = {
        carrierOrgId: this.carrierValue,
        gasstationId: this.stationValue,
        startDate: formatDate(this.trendDate[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.trendDate[1], 'yyyy-MM-dd')
      }
      $settleConsumeTrend(params).then(res => {
        const data = res.data || []
        const xAxis = []
        const qty = [] // 加气量

        this.trendTime = res.data.handoverTime || ''
        data.forEach(item => {
          xAxis.push(item.datetime)
          qty.push(item.qty)
        })

        this.optionCarrierBar.xAxis[0].data = xAxis
        this.optionCarrierBar.series[0].data = qty
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-wrap {
  position: relative;
  border-radius: 4px;
  margin-bottom: 16px;
  background-color: rgba(255, 255, 255, 1);

  .title {
    padding: 13px 20px 16px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid rgba(240, 240, 240, 1);
  }
}
.charts {
  height: 185px;
  padding: 10px 20px;
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
</style>
