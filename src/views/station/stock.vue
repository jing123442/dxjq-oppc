<template>
  <div class="template-main">
    <div class="box-wrap" style="margin: -15px -15px 16px;padding: 15px;">
      <el-date-picker
          v-model="currentDate"
          type="date"
          @change="changeDate"
          :picker-options="pickerOptions()"
          style="width: 260px"
          placeholder="选择日期">
      </el-date-picker>
      <span style="font-size: 14px;color: #8C8C8C;">（交班时间:{{ inventoryInfo.handoverTime }}）</span>
    </div>

    <div class="box-wrap">
      <div class="content-box">
        <el-row :gutter="20">
          <el-col :span="6"><card-data name="加气量" :value="inventoryInfo.saleQty" unit="吨"></card-data></el-col>
          <el-col :span="6"><card-data name="入库量" :value="inventoryInfo.inQty" unit="吨"></card-data></el-col>
          <el-col :span="6"><card-data name="在途量" :value="inventoryInfo.onwayQty" unit="吨"></card-data></el-col>
          <el-col :span="6"><card-data name="账存量" :value="inventoryInfo.acountQty" unit="吨">
            <div class="info-box">
              <div class="info-item">
                <div class="name">未出库量</div><div class="value">{{ inventoryInfo.inventoryQty || '-' }}吨</div>
              </div>
              <div class="info-item">
                <div class="name">CNG出库量</div><div class="value">{{ inventoryInfo.cngQty || '-' }}吨</div>
              </div>
            </div>
          </card-data></el-col>
        </el-row>
      </div>
    </div>
    <div class="box-wrap">
      <div class="charts">
        <MyChart :option="optionSankey" :animation="false"></MyChart>
      </div>
    </div>

  </div>
</template>
<script>
import MyChart from '@/components/MyChart/MyChart'
import CardData from '@/components/CardData.vue'
import { $strategySmartInventory } from '@/service/strategy'
import { formatDate, pickerOptions } from '@/utils/tools'

export default {
  name: 'homeInfo',
  components: { CardData, MyChart },
  data() {
    return {
      currentDate: '', // new Date(),
      inventoryInfo: {},
      gasstationId: this.$store.state.app.stationId,
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
          layoutIterations: 0,
          nodeGap: 20,
          top: '10%',
          left: '5%',
          lineStyle: {
            normal: {
              color: '#D3F1E1',
              opacity: 1
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
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
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    pickerOptions,
    initData() {
      const params = {
        gasstationId: this.gasstationId
      }

      if (this.currentDate) {
        params.date = formatDate(this.currentDate, 'yyyy-MM-dd')
      }
      // $strategySmartInventory({ date: formatDate(this.currentDate, 'yyyy-MM-dd'), gasstationId: this.gasstationId }).then(res => {
      $strategySmartInventory(params).then(res => {
        const { data: chartSeriesData, date, links, ...info } = res.data || {}
        this.inventoryInfo = info

        if (!this.currentDate) {
          this.currentDate = date
        }
        this.optionSankey.series.data = []
        this.optionSankey.series.links = []

        if (!chartSeriesData || !links) return
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
        links && links.forEach((item, index) => {
          // 取颜色值
          const color = linkColor[index % linkColor.length]
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
    changeDate(val) {
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
.charts {
  height: 185px;
  padding: 10px 20px;
}

.content-box {
  padding: 20px;
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
    justify-content: space-between;
  }
  .value {
    margin-left: 10px;
    color: rgba(38, 38, 38, 1);
    font-weight: bold;
  }
}
</style>
