<template>
  <div class="price-record">
    <TableFilter style="margin-bottom: 20px;" @search="search"/>
    <NewTable
      :columns="columns"
      :data="tableData"
      @size-change="sizeChange"
      @current-change="currentChange">
      <!-- 执行状态插槽 -->
      <div slot="status" slot-scope="scope">
        {{scope.row.status}}?
        <el-button type="text">上传</el-button>
        <el-button type="text">查看</el-button>
      </div>
    </NewTable>
  </div>
</template>

<script>
import TableFilter from './PriceRecordFilter.vue'
import NewTable from '@/components/Table/newTable.vue'
import { getColumns, getTableData } from './PriceRecord.js'
export default {
  components: {
    TableFilter,
    NewTable
  },
  props: {
    data: {
      type: [Object, Array],
      default: () => ({})
    }
  },
  data() {
    return {
      tableData: [],
      params: {
        page: 1,
        size: 10,
        key: '',
        time: [],
        type: ''
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        console.log('data>>>>', val)
      },
      deep: true,
      immediate: true
    },
    params: {
      handler() {
        this.getTableData()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    columns() {
      return getColumns()
    }
  },
  methods: {
    async getTableData () {
      console.log('search>>>>', this.params)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      this.tableData = await getTableData(this.params)
      loading.close()
    },
    sizeChange (size) {
      this.params.size = size
    },
    currentChange (page) {
      this.params.page = page
    },
    search(params) {
      this.params = {
        ...this.params,
        ...params
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.price-record {
  display: flex;
  flex-direction: column;
}
</style>
