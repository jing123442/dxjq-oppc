<template>
  <div class="template-main">
    <nt-text-info :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 35px;'"></nt-text-info>
    <em-table-list ref="tables" :tableListName="'stockList'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, settlePeriodInterval, exportBlobToFiles } from '@/utils/tools'
import { $strategyPurchaseStockTotal, $strategyPurchaseDownloadStock } from '@/service/strategy'
import { mapGetters } from 'vuex'
export default {
  name: 'order',
  data() {
    return initVueDataOptions(this, {
      stockTotal: 0,
      periodYear: this.$route.query.periodYear,
      periodMonth: this.$route.query.periodMonth,
      gasstationId: this.$route.query.orgId,
      queryCustURL: {
        list: {
          url: '/strategy/purchase/find_store_page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '入库明细'
      },
      dataList: [{
        name: '加气站入库量：',
        field: 'stockTotal',
        unit: ' 公斤'
      }],
      totalInfo: { stockTotal: 0 },
      buttonsList: [{ type: 'primary', icon: '', event: 'export_order', name: '导出订单' }]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_filler_stockDetail_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted() {
    this.initTotalData()
  },
  methods: {
    settlePeriodText(type) {
      if (type) {
        return '当前导出数据区间为：' + settlePeriodInterval(this.periodYear, this.periodMonth)
      } else {
        return settlePeriodInterval(this.periodYear, this.periodMonth)
      }
    },
    initTotalData(val) {
      var params = {
        periodMonth: this.periodMonth,
        periodYear: this.periodYear,
        gasstationId: this.gasstationId
      }
      $strategyPurchaseStockTotal(params).then(res => {
        this.totalInfo.stockTotal = res.data.checkWeightTotal
      })
    },
    onListEvent(type, row) {
      switch (type) {
        case 'export_order' :
          this.excelDownload()
          break
        default :
          break
      }
    },
    onReqParams(type, _this, callback) {
      const params = this.parseSearch(_this)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
      // 刷新统计数据
      if (this.$refs.tables && this.$refs.tables.tableListResponse) {
        this.$refs.tables.tableListResponse = null
        this.initTotalData()
      }
    },
    parseSearch(_this) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasstationId: this.gasstationId } })
      params.param.periodYear = this.periodYear
      params.param.periodMonth = this.periodMonth
      return params
    },
    excelDownload() {
      var params = {
        gasstationId: this.gasstationId,
        periodMonth: this.periodMonth,
        periodYear: this.periodYear
      }
      this.$confirm('此操作将下载入库明细, 是否继续?', '下载提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $strategyPurchaseDownloadStock(params).then(res => {
          const fileName = '入库明细' + Date.parse(new Date()) + '.xlsx'
          exportBlobToFiles(res, fileName)
          this.$message.success('下载成功')
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .exportOrderFieldDialog::v-deep .el-dialog__body {
    margin-top: 0;

  }
  .dataNum {
    margin: 16px 0;
    font-size: 16px;
    font-weight: 400;
    color: #606574;
    .totalDataNum {
      color: #B3B3C6;
    }
  }
  .little-title {
    font-size: 16px;
    font-weight: 400;
    color: #868B9A;
  }
  .dialog-footer {
    margin: 32px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .el-button {
      width: 48%;
      height: 40px;
      border-radius: 6px;
    }
  }
  .field-box {
    margin-top: 10px;
    margin-left: -8px;
    margin-right: -8px;
    .el-tag {
      cursor: pointer;
      margin: 5px 8px;
    }
  }
  .c-btn {
    margin-left: 10px;
    color: #0084F4;
    cursor: pointer;
  }
</style>
