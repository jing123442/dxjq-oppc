<template>
  <div class="template-main">
    <table-total-data :dataList="detailList" :rowData="detailInfo" :headerClass="'top-detail'" :headerStyle="'top: 28px;'"></table-total-data>
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 18px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, formatPeriodDateTime } from '@/utils/tools'
import { $userOrgFind } from '@/service/user'
import { $gasstationGwayFind } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
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
      detailList: [{
        name: '长城奥扬与',
        field: 'orgName',
        unit: '结算订单'
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
        name: '加气量总额：',
        field: 'gasQtyTotal',
        unit: ' 公斤'
      }, {
        name: '加气站结算总金额：',
        field: 'gasamountTotal',
        unit: ' 元'
      }, {
        name: '平台结算总金额：',
        field: 'amountTotal',
        unit: ' 元'
      }, {
        name: '加气站利润总额：',
        field: 'profitTotal',
        unit: ' 元'
      }],
      totalInfo: { gasQtyTotal: 0, profitTotal: 0, gasamountTotal: 0, amountTotal: 0 },
      query: this.$route.query
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_filler_detail_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.initTotalData()
    this.$route.meta.title = this.query.tradeType == 1 ? '经销模式结算明细' : '直销模式结算明细'
  },
  methods: {
    onListEvent(type, row) {},
    initTotalData(param) {
      const params = {
        gasstationGway: { gasstationId: this.$route.query.orgId, tradeType: this.query.tradeType },
        dataParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth }
      }
      // 统计信息
      $gasstationGwayFind(params).then(response => {
        this.totalInfo = response.data
      })
      // 加气站信息
      $userOrgFind({ orgId: this.$route.query.orgId }).then(response => {
        this.detailInfo = {
          orgName: response.data.orgName, mobile: response.data.mobile, period: formatPeriodDateTime(this.$route.query.periodYear, this.$route.query.periodMonth)
        }
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { gasstationId: this.$route.query.orgId, tradeType: 1 }, dateParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
