<template>
  <div class="template-main">
    <div class="header-info">
      <ul>
        <li>
          <p>报警：</p>
          <p>燃气泄露</p>
        </li>
        <li>
          <p>报警：</p>
          <p>急停</p>
        </li>
      </ul>
      <div class="time">
        <p>最新上报时间：</p>
        <p>2023年11月2日 12:00:22</p>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">储罐编号：1245787215</div>
      <div class="content-box">
        <el-row>
          <el-col :span="6" class="item-form">
            <p class="name">储罐液位：233</p>
            <p class="red">报警：储罐液位高(≥122)</p>
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">储罐压力：233</p>
            <p class="yellow">预警：储罐压力低(≤122)</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">泵池编号：1245787215</div>
      <div class="content-box">
        <el-row>
          <el-col :span="6" class="item-form">
            <p class="name">泵池温度：23℃</p>
<!--            <p class="red">报警：储罐液位高(≥122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">泵池压力：232</p>
<!--            <p class="yellow">预警：储罐压力低(≤122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">泵后压力：233</p>
            <p class="red">报警：泵后压力高(≥122)</p>
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">泵气浊：233</p>
            <p class="red">报警：泵气浊</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box-wrap">
      <div class="title">加注机编号：1245787215</div>
      <div class="content-box">
        <el-row>
          <el-col :span="6" class="item-form">
            <p class="name">流量计温度：23℃</p>
            <!--            <p class="red">报警：储罐液位高(≥122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">流量计密度：232</p>
            <!--            <p class="yellow">预警：储罐压力低(≤122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">流量计流速：232</p>
<!--            <p class="red">报警：泵后压力高(≥122)</p>-->
          </el-col>
          <el-col :span="6" class="item-form">
            <p class="name">1#枪 出口压力：232</p>
<!--            <p class="red">报警：泵气浊</p>-->
          </el-col>
        </el-row>
        <el-row style="margin-top: 16px;">
          <el-col :span="6" class="item-form">
            <p class="name">2#枪 出口压力：232</p>
            <!--            <p class="red">报警：储罐液位高(≥122)</p>-->
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'monitorInfo',
  props: ['orgId'],
  data() {
    return {
      stationInfo: {},
      currentInfo: {},
      trendDate: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {

    }
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
