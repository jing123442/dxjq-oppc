<template>
    <el-card shadow="never" class="new-table-list-filter">
      <!-- 表格顶部筛选项 -->
      <TableFilter slot="header" @search="searchStation" @add="addStation"></TableFilter>
      <!-- 表格 -->
      <NewTable
        :data="tableData"
        :columns="tableColumns"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectChange"
        >
        <div slot="prePagination" style="padding: 25px 0; margin: auto auto auto 0; display: flex; justify-content: space-between; flex-wrap: nowrap;">
          <el-button type="primary" size="small" :disabled="!cacheSelection.length" @click="batchPrice">批量调价</el-button>
          <el-button size="small" @click="batchRecord">调价记录</el-button>
        </div>
        <div style='padding: 0 10px' slot="operation" slot-scope="scope">
          <el-button type="text" size="small" @click="change(scope)">调价</el-button>
          <el-button type="text" size="small" @click="record(scope)">调价记录</el-button>
          <el-button type="text" size="small" @click="remove(scope)">移出名单</el-button>
        </div>
      </NewTable>
      <!-- 中石化零售价.调价 调价弹窗 -->
      <el-dialog title="中石化零售价.调价" :visible.sync="dialogPriceVisible" :append-to-body="true" width='80%'>
          <PriceAjustment
            v-if="dialogPriceVisible"
            :selectRows="dialogTarget"
            :renderItems='renderAdjustment'
            @submitForm='submitPriceAjustment'
            @closeInfo='dialogPriceVisible = false'
          ></PriceAjustment>
      </el-dialog>
      <!-- 中石化零售价.调价 调价记录 -->
      <el-dialog title="中石化零售价.调价记录" width="1000px" :visible.sync="dialogRecordVisible" :append-to-body="true">
          <PriceRecord :selectRows="dialogTarget" v-if="dialogRecordVisible"></PriceRecord>
      </el-dialog>
    </el-card>
</template>
<script>
import NewTable from '@/components/Table/newTable.vue'
import TableFilter from './newTableListFilter.vue'
import { getTableColumns, getTableData } from './snpRetail.js'
import PriceAjustment from '../components/priceAjustment.vue'
import PriceRecord from './PriceRecord.vue'
export default {
  components: {
    NewTable,
    TableFilter,
    PriceAjustment,
    PriceRecord
  },
  data () {
    return {
      renderAdjustment: ['snpPrice', 'excuteTime', 'uploadVoucher'],
      tableData: [],
      cacheSelection: [],
      params: {
        page: 1,
        size: 10,
        id: ''
      },
      dialogPriceVisible: false,
      dialogRecordVisible: false,
      dialogTarget: null
    }
  },
  computed: {
    tableColumns() {
      return getTableColumns()
    }
  },
  watch: {
    params: {
      handler() {
        this.getTableData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 表格多选框变化
    selectChange (selection, row) {
      this.cacheSelection = selection
    },
    // 批量调价
    batchPrice() {
      this.dialogPriceVisible = true
      this.dialogTarget = this.cacheSelection
    },
    // 批量调价记录操作
    batchRecord () {
      this.dialogRecordVisible = true
      this.dialogTarget = this.cacheSelection
    },
    // 表格每页查询数变化
    sizeChange (size) {
      this.params.size = size
    },
    // 表格页码变化
    currentChange (page) {
      this.params.page = page
    },
    // 查询加气站
    searchStation(id) {
      this.params.id = id
    },
    // 添加名单
    addStation(e) {
      console.log('addStation>>>', e)
    },
    // 获取表格数据; this.params发生变化时自动触发该方法搜索
    async getTableData () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      this.tableData = await getTableData(this.params)
      loading.close()
    },
    // 移出名单
    remove ({ row }) {
      console.log('remove>>>', row)
    },
    // 调价记录
    record ({ row }) {
      console.log('record>>>', row)
      this.dialogRecordVisible = true
      this.dialogTarget = [row]
    },
    // 调价
    change ({ row }) {
      this.dialogPriceVisible = true
      this.dialogTarget = [row]
    },
    submitPriceAjustment (form) {
      // let ids = ''
      // this.dialogTarget.forEach(item => {
      //   ids += item.id + ','
      // })
      // ids = ids.substring(0, ids.length - 1)
      // 提交调价
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
