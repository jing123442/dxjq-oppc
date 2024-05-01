<template>
  <div class="template-main">
    <div class="box-wrap">
      <div class="title">出入口</div>
      <div class="content-box"></div>
    </div>
    <div class="box-wrap">
      <div class="title">加气作业区</div>
      <div class="content-box"></div>
    </div>
    <div class="box-wrap">
      <div class="title">卸液储罐作业区</div>
      <div class="content-box"></div>
    </div>
    <div class="box-wrap">
      <div class="title">站房作业区</div>
      <div class="content-box"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'siteInfo',
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
.content-box {
  padding: 20px;
}
</style>
