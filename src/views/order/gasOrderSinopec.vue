<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 108px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'order'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'
import { $settleSnpOrderGetSumTotal } from '@/service/settle'

export default {
  name: 'gasOrderSinopec',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/gas_order_snp/list_withtime',
          // url: 'pay/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气订单'
      },
      dataList: [{
        name: '加气总金额：',
        field: 'totalAmount',
        unit: ' 元'
      }, {
        name: '加气总量：',
        field: 'totalGas',
        unit: ' 公斤'
      }],
      totalInfo: { totalGas: 0, totalAmount: 0 },
      buttonsList: [/* { type: 'primary', icon: '', event: 'add_info', name: '增加企业' } */]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_sinopec_mode_list',
      page_status: 'order_sinopec_page_status',
      page_column: 'order_sinopec_column',
      select_list: 'order_sinopec_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {
    console.log(this.$refs.tables)
  },
  methods: {
    onListEvent(type, row) {},
    updateColumnValue(tableData, callback) {
      tableData.forEach(item => {
        item.orderRealTotal = item.payType == 11 ? (Number(item.amount) - Number(item.comAmount)).toFixed(2) : ''
      })
      callback(tableData)
    },
    initTotalData(param) {
      $settleSnpOrderGetSumTotal({
        param
      }).then(res => {
        this.totalInfo = res.data
      })
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

      this.initTotalData(params.param)
    }
  }
}
</script>
