<template>
  <div class="new-table-list-filter">
    <div class="filter-left">
      <div style="display:flex;margin-right:10px">
        <el-input
          style="width: 200px;margin-right: 10px"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="请输入 加气站"
          v-model="searchStation"
          @keyup.enter.native="search"
          clearable>
        </el-input>
        <el-select size="small" v-model="column" placeholder="请选择" style="margin-right: 10px; width: 200px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          style="width: 350px;"
          size="small"
          v-model="datetimerange"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="filter-right">
      <el-button type="" size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newTableListFilter',
  data() {
    return {
      searchStation: '',
      column: 'operationTime',
      datetimerange: [],
      dialogTableVisible: false,
      options: [{
        value: 'operationTime',
        label: '调价操作时间'
      }, {
        value: 'realExecutionTime',
        label: '实际执行时间'
      }, {
        value: 'expectExecutionTime',
        label: '预计执行时间'
      }]
    }
  },
  methods: {
    reset() {
      this.searchStation = ''
      this.column = 'operationTime'
      this.datetimerange = []
      this.search()
    },
    // 查询表中的值
    search() {
      this.$emit('search', {
        station: this.searchStation,
        column: this.column,
        datetimerange: this.datetimerange
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.new-table-list-filter {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .filter-left {
    display: flex;
    flex-shrink: 0;
    .el-input {
      margin-right: 10px;
    }
  }
  .filter-right {
    display: flex;
  }
}
</style>
