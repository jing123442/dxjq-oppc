<template>
  <div class="template-main">
    <div class="chart-wrapper">
      <div class="search-wrapper">
        <div class="station-wrapper">
          <el-select v-model="stationValue" size="small" placeholder="请选择加气站" @change="stationChange">
            <el-option v-for="item in stationList" :key="item.gasstationId" :label="item.nickName" :value="item.gasstationId"></el-option>
          </el-select>
          <el-date-picker v-model="stationDate" type="daterange" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" size="small" @click="watchDyncData">查询</el-button>
        </div>
        <el-button type="primary" size="small" @click="exportDataFile">数据导出</el-button>
      </div>
      <ul class="sale-total">
        <li>装车总量：{{ statisticsDataInfo.loadTotalQty }}公斤</li>
        <li>入库总量：{{ statisticsDataInfo.inTotalQty }}公斤</li>
        <li>销售总量：{{ statisticsDataInfo.saleTotalQty }}公斤</li>
        <li>销售总额：{{ statisticsDataInfo.saleTotalValue }}元</li>
        <li>销售总额到站成本：{{ statisticsDataInfo.saleTotalCost }}元</li>
        <li>总进销差：{{ statisticsDataInfo.saleTotalDiff }}元</li>
      </ul>
      <div style="height: 300px;">
        <MyChart :option="optionBar" @chartClick="chartClick"></MyChart>
      </div>
    </div>
    <div class="day-wrapper" v-if="dayStatisticsActive">
      <div class="day-title">{{ getCurrentClickDate() }}</div>
      <ul>
        <li>
          <div>装车量：{{ sankeyData.loadQty }} 公斤（{{ sankeyData.loadPrice }} 元/公斤）</div>
          <div>在途量：{{ sankeyData.onwayQty }} 公斤（{{ sankeyData.onwayPrice }} 元/公斤）</div>
          <div>-</div>
          <div>入库量：{{ sankeyData.inQty }} 公斤（{{ sankeyData.inPrice }} 元/公斤）</div>
        </li>
        <li>
          <div>销售量：{{ sankeyData.saleQty }} 公斤</div>
          <div>销售金额：{{ sankeyData.saleValue }} 元（{{ sankeyData.saleValuePrice }} 元/公斤）</div>
          <div>到站成本：{{ sankeyData.saleCost }} 元（{{ sankeyData.saleCostPrice }} 元/公斤）</div>
          <div>进销差：{{ sankeyData.saleDiff }} 元</div>
        </li>
        <li>
          <div>账存量：{{ sankeyData.acountQty }} 公斤（{{ sankeyData.acountPrice }} 元/公斤）</div>
          <div>-</div>
          <div>未出库量：{{ sankeyData.inventoryQty }} 公斤（{{ sankeyData.inventoryPrice }} 元/公斤）</div>
          <div>CNG 出库量：{{ sankeyData.cngQty }} 公斤（{{ sankeyData.cngPrice }} 元/公斤）</div>
        </li>
      </ul>
      <ul>
        <li class="btn" :class="{ active: dayStatus === 1 }" @click="clickBtn(1)">桑基图</li>
        <li class="btn" :class="{ active: dayStatus === 2 }" @click="clickBtn(2)">列表</li>
      </ul>
      <div v-if="dayStatus === 1" style="height: 300px">
        <MyChart :option="optionSankey"></MyChart>
      </div>
      <DayStatisticsList v-if="dayStatus === 2"></DayStatisticsList>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

import { exportBlobToFiles, formatDate, formateTData, getDateRange } from '@/utils/tools'
import {
  $strategyDyncDayExportData,
  $strategyDyncDayStatisticsData,
  $strategyDyncDayStatisticsItemData,
  $strategyGetStationList
} from '@/service/strategy'
import MyChart from '@/components/MyChart/MyChart.vue'
import DayStatisticsList from './components/dayStatisticsList.vue'

export default {
  name: 'DyncIndex',
  components: { DayStatisticsList, MyChart },
  data() {
    return {
      dayStatisticsActive: false,
      dayStatus: 1,
      stationDate: [],
      stationList: [],
      stationValue: '',
      currentStationInfo: {},
      statisticsDataInfo: {},
      statisticsDataList: [],
      optionBar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {}
        },
        color: ['#4D94FF', '#FDC624', '#22FFFF'],
        grid: {
          top: '2%',
          right: '1.5%',
          left: '0.1%',
          bottom: '10%',
          containLabel: true
        },
        legend: {
          show: true,
          icon: 'rect',
          itemHeight: 4,
          itemWidth: 16,
          type: 'plain',
          left: 'center',
          bottom: '-1%',
          textStyle: {
            color: '#333'
          }
        },
        xAxis: [
          {
            boundaryGap: false,
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
            name: '',
            nameTextStyle: {
              color: '#333',
              align: 'right',
              padding: 5
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
            name: '入库量(公斤)',
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
                { offset: 0, color: 'rgba(77, 148, 255, 1)' },
                { offset: 1, color: 'rgba(77, 148, 255, 0.3)' }
              ])
            },
            data: []
          },
          {
            name: '销售量(公斤)',
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
                { offset: 0, color: 'rgba(253, 198, 36, 1)' },
                { offset: 1, color: 'rgba(253, 198, 36, 0.3)' }
              ])
            },
            data: []
          },
          {
            name: '进销差(元)',
            type: 'line',
            stack: 'a',
            smooth: true,
            barWidth: 6,
            label: {
              show: false,
              position: 'top',
              color: '#333'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(34, 255, 255, 1)' },
                { offset: 1, color: 'rgba(34, 255, 255, 0.3)' }
              ])
            },
            data: []
          }
        ]
      },
      clickDate: '',
      optionSankey: {
        animation: true,
        animationThreshold: 2000,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDelay: 0,
        animationDurationUpdate: 300,
        animationEasingUpdate: 'cubicOut',
        animationDelayUpdate: 0,
        color: [
          'rgba(120,163,206,0.8)',
          '#FBC2EB',
          'rgba(161,140,209,0.6)',
          '#C2E9FB',
          '#A1C4FD',
          '#D4FC79',
          '#A646DD',
          'rgba(252,198,135,0.5)',
          '#F28D86',
          '#F286A0',
          '#33876A',
          '#B5BF6E',
          '#2979F1',
          '#F08F1B',
          '#57B956',
          '#ABA5EA',
          '#9BC46C',
          '#30E0E0',
          '#F286CA',
          '#82CAFF',
          '#D66161',
          '#8FF379',
          '#1CBDB4',
          '#EEF2F3',
          '#8E9EAB',
          '#BB9BF1',
          '#887BF2',
          '#7FFED8',
          '#09BDFE',
          'rgba(127,189,91,0.8)'
        ],
        series: {
          type: 'sankey',
          layout: 'none',
          nodeGap: 20,
          top: '10%',
          left: '5%',
          lineStyle: {
            normal: {
              color: '#D3F1E1',
              opacity: 1
            }
          },
          emphasis: {
            lineStyle: {
              color: '#84D65C',
              opacity: 0.5
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 0,
              borderColor: '#fff',
              opacity: 1
            }
          },
          label: {
            color: '#333'
          },
          textBorderWidth: 0,
          focusNodeAdjacency: false,
          draggable: false,
          data: [],
          links: []
        },
        legend: [
          {
            data: ['sankey'],
            selected: {
              sankey: true
            },
            show: false,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 12
          }
        ],
        tooltip: {
          show: true,
          trigger: 'item',
          triggerOn: 'mousemove|click',
          axisPointer: {
            type: 'line'
          },
          textStyle: {
            fontSize: 14
          },
          borderWidth: 0,
          formatter: function (params) {
            return params.name
          }
        }
      },
      sankeyData: {}
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData() {
      const { startdate, enddate } = getDateRange()
      this.stationDate = [startdate, enddate]
      $strategyGetStationList({}).then(res => {
        this.stationList = res.data || []

        if (this.stationList.length > 0) {
          this.currentStationInfo = this.stationList[0]
          this.stationValue = this.stationList[0].gasstationId

          this.watchDyncData()
        }
      })
    },
    stationChange(val) {
      const item = this.stationList.find(item => item.gasstationId === val)

      this.currentStationInfo = item || {}
    },
    exportDataFile() {
      const params = {
        gasstationId: this.stationValue,
        startDate: formateTData(this.stationDate[0], 'date'),
        endDate: formateTData(this.stationDate[1], 'date')
      }
      $strategyDyncDayExportData(params).then(res => {
        const fileName = '动态库存_' + Date.parse(new Date()) + '.xlsx'
        exportBlobToFiles(res, fileName)
      })
    },
    sankeyChartData() {
      const params = {
        date: this.clickDate,
        gasstationId: this.stationValue // '900048340234420224'
      }
      $strategyDyncDayStatisticsItemData(params).then(res => {
        const { data: chartSeriesData, links, inventoryDayStatisticsVo } = res.data
        this.sankeyData = inventoryDayStatisticsVo || {}

        const linkColor = [
          'rgba(120,163,206,0.8)',
          '#FBC2EB',
          'rgba(161,140,209,0.6)',
          '#C2E9FB',
          '#A1C4FD',
          '#D4FC79',
          '#A646DD',
          'rgba(252,198,135,0.5)',
          '#F28D86',
          '#F286A0',
          '#33876A',
          '#B5BF6E',
          '#2979F1',
          '#F08F1B',
          '#57B956',
          '#ABA5EA',
          '#9BC46C',
          '#30E0E0',
          '#F286CA',
          '#82CAFF',
          '#D66161',
          '#8FF379',
          '#1CBDB4',
          '#EEF2F3',
          '#8E9EAB',
          '#BB9BF1',
          '#887BF2',
          '#7FFED8',
          '#09BDFE',
          'rgba(127,189,91,0.8)'
        ]
        // echarts series data
        this.optionSankey.series.data = chartSeriesData

        // echarts series links
        const chartSeriesLink = []
        links.forEach((item, index) => {
          // 取颜色值
          const color = index >= linkColor.length ? linkColor[index % linkColor.length] : linkColor[index]
          chartSeriesLink.push({
            value: item.value,
            source: item.source,
            target: item.target,
            lineStyle: {
              color,
              opacity: 0.4
            },
            emphasis: {
              lineStyle: {
                color,
                opacity: 0.8
              }
            }
          })
        })
        this.optionSankey.series.links = chartSeriesLink
      })
    },
    watchDyncData() {
      const params = {
        gasstationId: this.stationValue,
        startDate: formateTData(this.stationDate[0], 'date'),
        endDate: formateTData(this.stationDate[1], 'date')
      }
      $strategyDyncDayStatisticsData(params).then(res => {
        const { dayStatistics, ...dataInfo } = res.data
        this.statisticsDataInfo = dataInfo
        this.statisticsDataList = dayStatistics || []

        const xAxisData = []
        const data1 = []
        const data2 = []
        const data3 = []
        dayStatistics && dayStatistics.forEach(item => {
          xAxisData.push(this.formatMonthDay(item.date))
          data1.push(item.inQty)
          data2.push(item.saleQty)
          data3.push(item.saleDiff)
        })
        this.optionBar.xAxis[0].data = xAxisData
        this.optionBar.series[0].data = data1
        this.optionBar.series[1].data = data2
        this.optionBar.series[2].data = data3
      })
    },
    formatMonthDay(day) {
      const days = day.split('-')

      return `${Number(days[1])}.${Number(days[2])}`
    },
    chartClick(item) {
      this.clickDate = this.statisticsDataList[item.dataIndex].date
      this.sankeyChartData()
      this.dayStatisticsActive = true
    },
    getCurrentClickDate() {
      const times = this.clickDate.split('-')

      const start = new Date(times[0], times[1] - 1, times[2])
      const end = new Date(times[0], times[1] - 1, Number(times[2]) + 1)
      const startDate = formatDate(start, 'yyyy年MM月dd日')
      const endDate = formatDate(end, 'yyyy年MM月dd日')

      return `${startDate} ${this.currentStationInfo.time} 至 ${endDate} ${this.currentStationInfo.time}`
    },
    clickBtn(index) {
      this.dayStatus = Number(index)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;

  .search-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .station-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      & > div {
        margin-right: 10px;
      }
    }
  }
}
.day-wrapper {
  margin-top: 20px;

  .day-title {
    font-weight: bold;
  }
  ul li {

  }

  .btn {
    cursor: pointer;
    &:hover {
      color: #2D64B3;
    }
    &.active {
      color: #0989f3;
    }
  }
}

ul {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 10px 0;

  li {
    list-style: none;
    margin-right: 10px;
    font-size: 14px;
  }
}
</style>
