<template>
  <div class="my-chart" :style="{ width, height }">
    <div v-show="option" class="container" ref="mychart"></div>
    <div v-show="!option" class="data-empty">
      <slot>暂无数据</slot>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import 'echarts-wordcloud'
import DEFAULT_THEME from './echarts-theme'
import { markRaw } from 'vue'
export default {
  name: 'my-chart',
  props: {
    option: {
      validator: function (value) {
        return (
          value === undefined ||
          value === null ||
          Object.prototype.toString.call(value) === '[object Object]'
        )
      }
    },
    animation: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100%',
      validator: function (value) {
        return /(px)|(rem)|(vw)|(vh)|(%)/.test(value)
      }
    },
    height: {
      type: String,
      default: '100%',
      validator: function (value) {
        return /(px)|(rem)|(vw)|(vh)|(%)/.test(value)
      }
    },
    resizeable: Boolean,
    theme: {
      type: Object,
      validator: function (value) {
        if (value) {
          return Object.prototype.toString.call(value) === '[object Object]'
        }
        return true
      }
    }
  },
  watch: {
    option: {
      handler(value) {
        if (this.myChart && value) {
          this.clearAnimationTimer()
          this.myChart.setOption(value, true)
          this.animationStart()
        } else if (value) {
          this.init()
        } else {
          console.log(`%c option:${this.option}`, 'color:red')
        }
      },
      deep: true
    },
    width: 'onResize',
    height: 'onResize',
    theme: {
      handler(value) {
        this.clear()
        this.init()
        // console.log(this.theme, "theme");
      },
      deep: true
    }

  },
  data() {
    return {
      myChart: null,
      timer: null,
      animationTimer: null,
      ai: 0
    }
  },
  methods: {
    init() {
      const theme = this.theme || DEFAULT_THEME
      this.myChart = markRaw(echarts.init(this.$refs.mychart, theme))
      this.myChart.setOption(this.option, true)
      this.chartClick()
      if (this.resizeable) {
        window.addEventListener('resize', this.onResize)
      }
    },
    onResize() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.myChart) {
          this.myChart.resize()
        }
      }, 200)
    },
    clear() {
      clearTimeout(this.timer)
      this.timer = null
      if (this.myChart) {
        this.myChart.dispose()
        this.myChart = null
      }
      if (this.resizeable) {
        window.removeEventListener('resize', this.onResize)
      }
    },
    // echart动画计时器
    animationStart() {
      if (!this.animation && this.option.series) {
        return
      }
      let currentIndex = -1
      var dataLen = this.option.series[0].data.length
      this.animationTimer = setInterval(() => {
        //  计时器增加
        this.ai++
        if (this.ai === this.option.series[0].data.length) {
          this.ai = 1
        }
        // 取消之前高亮的图形
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        currentIndex = (currentIndex + 1) % dataLen
        // 高亮当前图形
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        // 显示 tooltip
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        // 给父级抛出高亮事件
        this.$emit('highlight', currentIndex)
      }, 3000)
    },
    // 清除动画计时器
    clearAnimationTimer() {
      clearInterval(this.animationTimer)
      this.ai = 0
      this.animationTimer = null
    },
    // echarts 点击事件
    chartClick() {
      this.myChart.on('click', (params) => {
        this.$emit('chartClick', params)
      })
    }
  },
  mounted() {
    if (this.option) {
      this.$nextTick(async () => {
        this.init()
        this.animationStart()
      })
    } else {
      console.log(`%c option:${this.option}`, 'color:red')
    }
  },
  unmounted() {
    if (this.resizeable) {
      window.removeEventListener('resize', this.onResize)
    }
    if (this.timer) {
      clearTimeout(this.timer)
    }
    // 清除动画计时器
    if (this.animationTimer) {
      this.clearAnimationTimer()
    }
  }
}
</script>
<style scoped lang="scss">
.my-chart {
  position: relative;
  .container {
    width: 100%;
    height: 100%;
  }
  .data-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    color: #888;
    font-size: 14px;
  }
}
</style>
