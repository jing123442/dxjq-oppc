<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'left: 230px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderBussiness'" custTableTitle="长城奥扬与象群科技结算订单" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof, formatPeriodDate } from '@/utils/tools'
import { $xqkjOrderTotal } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderBussiness',
  components: { TableTotalData },
  data() {
    return {
      queryCustURL: {
        list: {
          url: 'settle/gas_order/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      buttonsList: [/* { type: 'primary', icon: '', event: 'add_info', name: '增加企业' } */],
      axios: axiosRequestParams(this),
      queryParams: Function,
      dataList: [{
        name: '加气量总额：',
        field: 'gasQtyTotal',
        unit: ' 公斤'
      }, {
        name: '服务费总金额：',
        field: 'gwayAmountTotal',
        unit: ' 元'
      }],
      totalInfo: { gasQtyTotal: 0, gwayAmountTotal: 0 }
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_bussiness_mode_list',
      page_status: 'order_bussiness_page_status',
      page_column: 'order_bussiness_column',
      select_list: 'order_bussiness_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {

    },
    initTotalData(params) {
      $xqkjOrderTotal(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { gasOrder: { }, dateParam: { } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'period') {
            const period = formatPeriodDate(_this.finds[k])

            querys.param.dateParam.periodYear = period.periodYear
            querys.param.dateParam.periodMonth = period.periodMonth
          } else {
            if (v !== '') querys.param.gasOrder[k] = v
          }
        }
      }

      this.initTotalData(querys.param)

      const params = Object.assign({}, callbackPagesInfo(_this), querys)

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
