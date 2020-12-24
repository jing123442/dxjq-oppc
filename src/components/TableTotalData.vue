<template>
  <div class="stats-data" :style="headerStyle">
    <div class="data-item" v-for="(item, index) in dataList" :key="index">
      <span class="name">{{item.name}}</span>
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
    }
  }
}
</script>
