<template>
  <div class="template-main">
    <em-table-list ref="rechargeListTables" :tableListName="'rechargeList'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'rechargeList',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'settle/recharge_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司充值账单'
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'settlement_gasPrice_mode_list',
      page_status: 'settlement_gasPrice_page_status',
      page_column: 'settlement_gasPriceRechargeList_column',
      select_list: 'settlement_gasPrice_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {},
    onReqParams(type, _this, callback) {
      const selfQuery = this.$route.query
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { carrierOrder: { orgId: selfQuery.orgId }, dateParam: {} } })

      if (isTypeof(selfQuery) === 'object') {
        for (var [k, v] of Object.entries(selfQuery)) {
          if (k == 'dataPicker') {
            if (selfQuery.dataPicker === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
