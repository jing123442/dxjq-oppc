<template>
  <div class="template-main">
    <em-table-list ref="gasOrderListTable" :tableListName="'gasOrderList'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, exportBlobToFiles, callbackPagesInfo } from '@/utils/tools'
import { $excelDownload } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'gasOrderList',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'settle/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站对账单'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'export', name: '导出' }],
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'settlement_gasPrice_mode_list',
      page_status: 'settlement_gasPrice_page_status',
      page_column: 'settlement_gasPriceOrderList_column',
      select_list: 'settlement_gasPrice_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'export') {
        this.excelDownload()
      }
    },
    excelDownload() {
      const params = {
        datas: {
          orderId: '订单编号',
          gasstationName: '加气站',
          carNumber: '车牌号',
          driverName: '司机',
          gasQty: '加气量(公斤)',
          actualPrice: '单价',
          amount: '金额',
          discountAmount: '优惠金额',
          updateDate: '支付时间'
        },
        fileName: '订单',
        interfaceName: '/settle/gas_order/list_withtime',
        pageParam: this.parseSearch(this.$refs.gasOrderListTable)
      }
      $excelDownload(params).then(response => {
        const fileName = '订单' + Date.parse(new Date()) + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    onReqParams(type, _this, callback) {
      const params = this.parseSearch(_this)

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    parseSearch(_this) {
      const selfQuery = this.$route.query
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { carrierOrgId: selfQuery.orgId }, dateParam: {} } })

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

      if (isTypeof(_this.finds) === 'object') {
        // eslint-disable-next-line no-redeclare
        for (var [k, v] of Object.entries(_this.finds)) {
          if (!v) {
            delete params.param.gasOrder[k]
          } else {
            params.param.gasOrder[k] = v
          }
        }
      }

      return params
    }
  }
}
</script>
