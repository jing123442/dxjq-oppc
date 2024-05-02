<template>
  <div>
    <NewTable :data="tableData" :columns="tableColumns"></NewTable>
  </div>
</template>

<script>
import NewTable from '../../components/newTableListTable.vue'
import { getTableColumns, getTableData } from './snpRetail.js'
export default {
  components: {
    NewTable
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    tableColumns() {
      return getTableColumns(this)
    },
    tableData () {
      const onClick = (item, ...args) => {
        console.log(item, args)
      }
      const operation = (...args) => (<div style={{ padding: '0 10px' }}>
        <el-button type="text" size="small" onClick={() => onClick('del', ...args)}>移出名单</el-button>
        <el-button type="text" size="small" onClick={() => onClick('check', ...args)}>调价记录</el-button>
        <el-button type="text" size="small" onClick={() => onClick('edit', ...args)}>调价</el-button>
      </div>)
      return this.data.map(item => {
        return {
          ...item,
          operation: operation(item)
        }
      })
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    async getTableData () {
      this.data = await getTableData(this)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
