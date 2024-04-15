<template>
  <div class="template-main">
    <div class="header-info">
      <ul>
        <li>
          <p>燃气泄露报警：</p>
          <p>{{ currentInfo.gasLeakWarn === 1 ? '报警' : '无报警' }}</p>
        </li>
        <li>
          <p>急停报警：</p>
          <p>{{ currentInfo.stopWarn === 1 ? '报警' : '无报警' }}</p>
        </li>
      </ul>
      <div class="time">
        <p>最新上报时间：</p>
        <p>{{ formatDate(formateTData(currentInfo.upTime, 'all'), 'yyyy年MM月dd日 hh:mm:ss')}}</p>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">储罐编号：{{ currentInfo.tankDevId || '-' }}</div>
      <div class="content-box">
        <el-row>
          <el-col :span="6" class="item-form">
            <p class="name">储罐液位：{{ currentInfo.gasLevel || '-' }}</p>
            <p class="red" v-show="currentInfo.levelHighWarn === 1">报警：{{ currentInfo.levelNote }}</p>
            <p class="yellow" v-show="currentInfo.levelLowWarn === 1">预警：{{ currentInfo.levelNote }}</p>
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">储罐压力：{{ currentInfo.pressure || '-' }}</p>
            <p class="red" v-show="currentInfo.pressHighWarn === 1">报警：{{ currentInfo.pressNote }}</p>
            <p class="yellow" v-show="currentInfo.pressLowWarn === 1">预警：{{ currentInfo.pressNote }}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">泵池编号：{{ currentInfo.pumpDevId || '-' }}</div>
      <div class="content-box">
        <el-row>
          <el-col :span="6" class="item-form">
            <p class="name">泵池温度：{{ currentInfo.poolTemp || '-' }}℃</p>
<!--            <p class="red">报警：储罐液位高(≥122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">泵池压力：{{ currentInfo.poolPress || '-' }}</p>
<!--            <p class="yellow">预警：储罐压力低(≤122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">泵后压力：{{ currentInfo.pumpBackPress || '-' }}</p>
            <p class="red" v-show="currentInfo.pumpBackHighWarn === 1">报警：{{ currentInfo.pumpBackNote }}</p>
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">泵气浊：{{ currentInfo.setCavitation || '-' }}</p>
            <p class="red" v-show="currentInfo.cavitationWarn === 1">报警：{{ currentInfo.cavitationNote }}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">加注机编号：{{ currentInfo.machineDevId || '-' }}</div>
      <div class="content-box">
        <el-row>
          <el-col :span="6" class="item-form">
            <p class="name">流量计温度：{{ currentInfo.tem || '-' }}℃</p>
            <!--            <p class="red">报警：储罐液位高(≥122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">流量计密度：{{ currentInfo.den || '-' }}</p>
            <!--            <p class="yellow">预警：储罐压力低(≤122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">流量计流速：{{ currentInfo.flow || '-' }}</p>
<!--            <p class="red">报警：泵后压力高(≥122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">1#枪 出口压力：{{ currentInfo.press1 || '-' }}</p>
<!--            <p class="red">报警：泵气浊</p>-->
          </el-col>
        </el-row>
        <el-row style="margin-top: 16px;">
          <el-col :span="6" class="item-form">
            <p class="name">2#枪 出口压力：{{ currentInfo.press2 || '-' }}</p>
            <!--            <p class="red">报警：储罐液位高(≥122)</p>-->
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { $strategyMonitorInfo } from '@/service/strategy'
import { formatDate, formateTData } from '@/utils/tools'

export default {
  name: 'homeInfo',
  data() {
    return {
      stationInfo: {},
      currentInfo: {},
      trendDate: [],
      gasstationId: this.$store.state.app.stationId
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      $strategyMonitorInfo({ gasstationId: this.gasstationId }).then(res => {
        this.currentInfo = res.data || {}
      })
    },
    formateTData,
    formatDate
  }
}
</script>
<style lang="scss" scoped>
.header-info {
  position: relative;
  padding: 0 20px;
  height: 44px;
  font-size: 14px;
  margin-bottom: 16px;
  border-radius: 4px;
  background: linear-gradient(180deg, #F88B4D 0%, #F63A3A 100%);
  color: rgba(255, 255, 255, 1);

  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;

    li {
      display: flex;
      align-items: center;
      margin-right: 40px;
    }
  }

  .time {
    display: flex;
    align-items: center;

  }
}
.content-box {
  padding: 20px;
}

.item-form {
  font-size: 14px;
  .name {
    color: rgba(38, 38, 38, 1);
  }
  .red {
    color: rgba(245, 34, 45, 1);
  }
  .yellow {
    color: rgba(250, 140, 22, 1);
  }
}
</style>
