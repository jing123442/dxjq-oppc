<template>
  <div class="template-main">
    <em-table-list ref="truckListTable" :tableListName="'truckList'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, exportBlobToFiles, callbackPagesInfo } from '@/utils/tools'
import { $excelDownload } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'truckList',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: '/settle/gas_order/sum_truck',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司卡车汇总'
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
      page_column: 'settlement_gasPriceTruckList_column',
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
      } else if (type === 'bill') {
        const finds = this.$route.query

        finds.truckId = row.truckId
        this.$router.push({
          path: 'truckList/truckOrderList',
          query: finds
        })
      }
    },
    excelDownload() {
      const finds = this.$refs.truckListTable.finds
      const pageList = this.$refs.truckListTable.pages
      const params = {
        datas: {
          carNumber: '车牌号',
          sumGasQty: '加气量汇总',
          sumAmount: '加气金额汇总(元)',
          sumDiscountAmount: '优惠金额汇总(元)'
        },
        fileName: '订单',
        interfaceName: '/settle/gas_order/sum_truck',
        pageParam: this.parseSearch(finds, pageList.currentPage, pageList.pageSize)
      }
      $excelDownload(params).then(response => {
        const fileName = '订单' + Date.parse(new Date()) + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    onReqParams(type, _this, callback) {
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

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
