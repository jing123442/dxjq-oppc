<template>
  <div class="template-main">
    <em-table-list ref="truckOrderListTables" :tableListName="'truckOrderList'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { $excelDownload } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'truckOrderList',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: '/settle/gas_order/list_withtime',
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
      mode_list: 'filler_sevicePrice_mode_list',
      page_status: 'filler_account_page_status',
      page_column: 'settlement_gasPriceTruckOrderList_column',
      select_list: 'filler_printList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { console.log(this.page_status) },
  methods: {
    onListEvent(type, row) {
      if (type === 'export') {
        this.excelDownload()
      }
    },
    excelDownload() {
      const finds = this.$refs.truckOrderListTables.finds
      const pageList = this.$refs.truckOrderListTables.pages
      const params = {
        datas: {
          orderId: '订单编号',
          driverName: '司机',
          gasQty: '加气量(公斤)',
          actualPrice: '单价(元/公斤)',
          amount: '金额',
          discountAmount: '优惠金额',
          gasstationName: '加气站',
          updateDate: '支付时间'
        },
        fileName: '订单',
        interfaceName: '/settle/gas_order/list_withtime',
        pageParam: this.parseSearch(finds, pageList.currentPage, pageList.pageSize)
      }
      $excelDownload(params).then(response => {
        const fileName = '订单' + Date.parse(new Date()) + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    onReqParams(type, _this, callback) {
      let params = {}
      if (type == 'list') {
        params = this.parseSearch(_this.finds, _this.pages.pageNum, _this.pages.pageSize)
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    parseSearch(finds, page, size) {
      const params = {
        size: size,
        page: page,
        param: {
          dateParam: {
            createDateFrom: '',
            createDateTo: ''
          },
          gasOrder: {
            truckId: this.$route.query.truckId
          }
        }
      }

      if (isTypeof(finds) === 'object') {
        for (var [k, v] of Object.entries(finds)) {
          if (k == 'dataPicker') {
            if (finds.dataPicker === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (!v) {
              delete params.param.gasOrder[k]
            } else {
              params.param.gasOrder[k] = v
            }
          }
        }
      }

      return params
    }
  }
}
</script>
