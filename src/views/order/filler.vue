<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof, formatPeriodDate } from '@/utils/tools'
import { $gwayOrderTotal } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  components: { TableTotalData },
  data() {
    return {
      queryCustURL: {
        list: {
          url: 'settle/gasstation_gway/list',
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
        field: 'profitTotal',
        unit: ' 元'
      }],
      totalInfo: { gasQtyTotal: 0, profitTotal: 0 }
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_filler_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      const params = { orgId: row.gasstationId, periodYear: row.periodYear, periodMonth: row.periodMonth }

      if (type === 'detail') {
        this.$router.push({
          path: 'orderFiller/fillerDetailList',
          query: params
        })
      } else if (type === 'withdraw') {
        this.$router.push({
          path: 'orderFiller/fillerWithdrawList',
          query: params
        })
      }
    },
    initTotalData(params) {
      $gwayOrderTotal(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { }, dateParam: { } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'period') {
            const period = formatPeriodDate(_this.finds[k])

            params.param.dateParam.createDateFrom = period.periodYear
            params.param.dateParam.createDateTo = period.periodMonth
          } else {
            if (v !== '') params.param.gasOrder[k] = v
          }
        }
      }

      this.initTotalData(params)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
