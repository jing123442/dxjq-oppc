<template>
  <div class="template-main">
    <table-total-data :dataList="detailList" :rowData="detailInfo" :headerClass="'top-detail'" :headerStyle="'top: 28px;'"></table-total-data>
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 18px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, formatPeriodDateTime } from '@/utils/tools'
import { $gasstationWithdrawTotal } from '@/service/settle'
import { $userOrgFind } from '@/service/user'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
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
      detailList: [{
        name: '长城奥扬与',
        field: 'orgName',
        unit: '提现成功明细'
      }, {
        name: '加气站联系电话：',
        field: 'mobile',
        unit: ''
      }, {
        name: '数据账期时间：',
        field: 'period',
        unit: ''
      }],
      detailInfo: { orgName: '', mobile: '', period: '' },
      dataList: [{
        name: '加气站提现成功总金额：',
        field: 'amountTotal',
        unit: ' 元'
      }],
      totalInfo: { amountTotal: 0 },
      query: this.$route.query
    })
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
  created: function () {
    this.$route.meta.title = this.query.tradeType == 1 ? '经销模式提现明细' : '直销模式提现明细'
  },
  methods: {
    onListEvent(type, row) { },
    initTotalData(params) {
      $gasstationWithdrawTotal(params).then(response => {
        this.totalInfo = response.data || {}
      })
      // 加气站信息
      $userOrgFind({ orgId: this.$route.query.orgId }).then(response => {
        this.detailInfo = {
          orgName: response.data.orgName, mobile: response.data.mobile, period: formatPeriodDateTime(this.$route.query.periodYear, this.$route.query.periodMonth)
        }
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { withdrawOrder: { orgId: this.$route.query.orgId, tradeType: 1 }, dateParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') querys.param.withdrawOrder[k] = v
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
