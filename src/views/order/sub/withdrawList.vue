<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 35px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $gasstationWithdrawTotal } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  components: { TableTotalData },
  data() {
    return {
      queryCustURL: {
        list: {
          url: 'settle/withdraw_order/list',
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
        name: '加气站提现成功总金额：',
        field: 'amount',
        unit: ' 元'
      }],
      totalInfo: { amount: 0 }
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_filler_withdraw_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) { },
    initTotalData(params) {
      $gasstationWithdrawTotal(params).then(response => {
        this.totalInfo = response.data || {}
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { withdrawOrder: { orgId: this.$route.query.orgId }, dateParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') querys.param.carrierGasstation[k] = v
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
