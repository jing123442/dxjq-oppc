<template>
  <div class="rebate-order template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 158px;'"></table-total-data>
    <em-table-list :tableListName="'rebateOrder'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'pay/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '优惠订单详情'
      },
      dataList: [{
        name: '加气总金额：',
        field: 'amount',
        unit: ' 元'
      }, {
        name: '加气总量：',
        field: 'totalGas',
        unit: ' 公斤'
      }],
      totalInfo: { totalGas: 0, amount: 0, totalServiceFee: 0 },
      buttonsList: [],
      formBtnList: custFormBtnList()
    })
  },
  components: { TableTotalData },
  computed: {
    ...mapGetters({
      mode_list: 'rebate_order_mode_list',
      page_status: 'rebate_order_page_status',
      page_column: 'rebate_order_column',
      select_list: 'rebate_order_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  methods: {
    onListEvent(type, row) {
    },
    updateColumnValue(tableData, callback) {
      tableData.forEach(item => {
        item.orderRealTotal = item.payType == 11 ? (Number(item.amount) - Number(item.comAmount)).toFixed(2) : ''
      })
      callback(tableData)
    },
    initTotalData() {
      const loading = this.$refs.tables ? this.$refs.tables.loading : true
      const response = this.$refs.tables && this.$refs.tables.tableListResponse ? this.$refs.tables.tableListResponse : null

      if (!loading && response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data && response.data.totalInfo) {
            this.totalInfo = response.data.totalInfo
          }
        }
      } else {
        this.times = setTimeout(() => {
          this.initTotalData()
        }, 200)
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { }, dateParam: { createDateFrom: '', createDateTo: '' } } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else if (k == 'updateDate') {
            if (_this.finds.updateDate === null) {
              params.param.dateParam.updateDateFrom = ''
              params.param.dateParam.updateDateTo = ''
            } else {
              params.param.dateParam.updateDateFrom = v[0]
              params.param.dateParam.updateDateTo = v[1]
            }
          } else {
            if (v !== '') params.param.gasOrder[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
