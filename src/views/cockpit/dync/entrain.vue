<template>
  <div class="template-main">
    <div class="station-wrapper">
      <el-select v-model="stationValue" size="small" placeholder="请选择加气站" @change="stationChange">
        <el-option v-for="item in stationList" :key="item.gasstationId" :label="item.nickName" :value="item.gasstationId"></el-option>
      </el-select>
      <div class="time">交接班时间：{{ currentStationInfo.time }}</div>
    </div>

    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="加注机全量" name="0">
        <refuel-all-line v-if="active == 0 && stationValue" :stationId="stationValue" :nickName="currentStationInfo.nickName" :time="currentStationInfo.time" />
      </el-tab-pane>
      <el-tab-pane label="三方线上" name="1">
        <third-line v-if="active == 1 && stationValue" :stationId="stationValue" :nickName="currentStationInfo.nickName" :time="currentStationInfo.time" />
      </el-tab-pane>
      <el-tab-pane label="大象线上" name="2">
        <dx-line v-if="active == 2 && stationValue" :stationId="stationValue" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import RefuelAllLine from './components/refuelAllLine.vue'
import ThirdLine from './components/thirdLine.vue'
import DxLine from './components/dxLine.vue'
import { $strategyGetStationList } from '@/service/strategy'

export default {
  name: 'DyncEntrain',
  components: { DxLine, ThirdLine, RefuelAllLine },
  data() {
    return {
      active: 0,
      stationList: [],
      stationValue: '',
      currentStationInfo: {}
    }
  },
  created: function () {
    this.initData()
  },
  mounted: function () {},
  methods: {
    handleClick() {},
    initData() {
      $strategyGetStationList({}).then(res => {
        this.stationList = res.data || []

        if (this.stationList.length > 0) {
          this.currentStationInfo = this.stationList[0]
          this.stationValue = this.stationList[0].gasstationId
        }
      })
    },
    stationChange(val) {
      const item = this.stationList.find(item => item.gasstationId === val)

      this.currentStationInfo = item || {}
    }
  }
}
</script>
<style lang="scss" scoped>
.station-wrapper {
  position: absolute;
  left: 350px;
  top: 20px;
  display: flex;
  align-items: center;
  z-index: 100;
  font-size: 14px;

  .time {
    margin-left: 10px;
  }
}
</style>
