<template>
  <div class="stats-data" :class="headerClass" :style="headerStyle">
    <div class="data-item" v-for="(item, index) in dataList" :key="index">
      <span class="name">{{item.currField ? rowData[item.currField] : ''}}{{item.name}}</span>
      <span class="value">{{rowData[item.field]}} {{item.unit}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableTotalData',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    headerStyle: {
      type: String,
      default: ''
    },
    headerClass: {
      type: String,
      default: 'total-data'
    }
  }
}
</script>
<style lang="scss" scoped>
  .stats-data {
    color: #2F3337;
    font-size: 13px;
  }
  .total-data {
    display: flex;
    position: absolute;
    top: 115px;
    left: 160px;
    padding: 2px 20px;
    background-color: rgba(255, 245, 33, .2);

    .data-item {
      .value {
        color: #ff4949;
      }
    }
  }

  .top-detail {
    display: flex;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
  }

  .total-data .data-item, .top-detail .data-item {
    margin-left: 25px;
    &:first-child {
      margin-left: 0;
    }
  }
</style>
