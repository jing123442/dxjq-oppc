<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderCarrier'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof, formatPeriodDate } from '@/utils/tools'
import { $carrierOrderTotal, $generateDownloadFile } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderCarrier',
  components: { TableTotalData },
  data() {
    return {
      queryCustURL: {
        list: {
          url: 'settle/carrier/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      currParams: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'download', name: '导出' }],
      axios: axiosRequestParams(this),
      queryParams: Function,
      dataList: [{
        name: '充值总额：',
        field: 'rechargeTotal',
        unit: ' 元'
      }, {
        name: '加气量总额：',
        field: 'gasQtyTotal',
        unit: ' 公斤'
      }, {
        name: '加气总金额：',
        field: 'gasAmountTotal',
        unit: ' 元'
      }, {
        name: '优惠总金额：',
        field: 'discountTotal',
        unit: ' 元'
      }],
      totalInfo: { discountTotal: 0, gasAmountTotal: 0, gasQtyTotal: 0, rechargeTotal: 0 }
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_carrier_mode_list',
      page_status: 'order_carrier_page_status',
      page_column: 'order_carrier_column',
      select_list: 'order_carrier_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      const params = { orgId: row.carrierOrgId, periodYear: row.periodYear, periodMonth: row.periodMonth }

      if (type === 'recharge') {
        this.$router.push({
          path: 'orderCarrier/carrierRechargeList',
          query: params
        })
      } else if (type === 'settlement') {
        this.$router.push({
          path: 'orderCarrier/carrierSettlementList',
          query: params
        })
      } else if (type === 'truck') {
        this.$router.push({
          path: 'orderCarrier/carrierTruckList',
          query: params
        })
      } else if (type === 'download') {
        const params = [{
          exportParam: JSON.stringify(this.currParams),
          type: 3
        }]
        $generateDownloadFile(params).then(response => {
          this.$alert('您的物流公司结算订单已申请，请在下载中心下载。', '下载提示')
        })
      }
    },
    initTotalData(params) {
      this.currParams = params
      $carrierOrderTotal(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { carrier: { }, dataParam: { } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'period') {
            const period = formatPeriodDate(_this.finds[k])

            querys.param.dataParam.periodYear = period.periodYear
            querys.param.dataParam.periodMonth = period.periodMonth
          } else {
            if (v !== '') querys.param.carrier[k] = v
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
