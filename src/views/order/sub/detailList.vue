<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 35px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo } from '@/utils/tools'
import { $gasstationGwayFind } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
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
      totalInfo: { gasQtyTotal: 0, profitTotal: 0, gasamountTotal: 0, amountTotal: 0 }
    }
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
  created: function () {},
  methods: {
    onListEvent(type, row) {},
    initTotalData() {
      const params = {
        gasstationGway: { gasstationId: this.$route.query.orgId },
        dataParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth }
      }
      $gasstationGwayFind(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { gasstationId: this.$route.query.orgId }, dateParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } })

      this.initTotalData()
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
