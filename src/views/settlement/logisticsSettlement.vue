<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalList"></table-total-data>
    <em-table-list ref="logisticsTables" :tableListName="'logisticsSettlement'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { $excelDownload } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'logisticsSettlement',
  components: { TableTotalData },
  data() {
    return {
      isShow: false,
      dataList: [{
        name: '充值总额：',
        field: 'sumRechargeAmount',
        unit: ' 元'
      }, {
        name: '加气量总额：',
        field: 'totalSumGasQty',
        unit: ' 公斤'
      }, {
        name: '加气总金额：',
        field: 'totalSumAmount',
        unit: ' 元'
      }, {
        name: '优惠总金额：',
        field: 'totalSumDiscountAmount',
        unit: ' 元'
      }],
      totalList: { sumRechargeAmount: 0, totalSumGasQty: 0, totalSumAmount: 0, totalSumDiscountAmount: 0 },
      queryCustURL: {
        list: {
          url: 'settle/gas_order/sum_cost',
          method: 'post',
          parse: {
            tableData: ['data', 'result', 'records'],
            totalCount: ['data', 'result', 'total']
          }
        },
        name: '物流公司加气费汇总'
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
      page_column: 'settlement_gasPrice_column',
      select_list: 'settlement_gasPrice_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {
    this.initTotalData()
  },
  methods: {
    initTotalData() {
      const response = this.$refs.logisticsTables.tableListResponse

      if (response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data && response.data.totalSum) {
            this.totalList.sumRechargeAmount = response.data.totalSum.sumRechargeAmount ? response.data.totalSum.sumRechargeAmount : 0
            this.totalList.totalSumGasQty = response.data.totalSum.totalSumGasQty ? response.data.totalSum.totalSumGasQty : 0
            this.totalList.totalSumAmount = response.data.totalSum.totalSumAmount ? response.data.totalSum.totalSumAmount : 0
            this.totalList.totalSumDiscountAmount = response.data.totalSum.totalSumDiscountAmount ? response.data.totalSum.totalSumDiscountAmount : 0
          }
        }
      } else {
        this.times = setTimeout(() => {
          this.initTotalData()
        }, 200)
      }
    },
    onListEvent(type, row) {
      const finds = Object.assign({}, this.$refs.logisticsTables.finds)

      finds.orgId = row.carrierOrgId
      switch (type) {
        case 'export':
          this.excelDownload()
          break
        case 'recharge':
          this.$router.push({
            path: 'logisticsSettlement/rechargeList',
            query: finds
          })
          break
        case 'filling':
          this.$router.push({
            path: 'logisticsSettlement/gasOrderList',
            query: finds
          })
          break
        case 'truck':
          this.$router.push({
            path: 'logisticsSettlement/truckList',
            query: finds
          })
          break
        default:
          break
      }
    },
    excelDownload() {
      const finds = this.$refs.logisticsTables.finds
      const pageList = this.$refs.logisticsTables.pages
      const params = {
        datas: {
          carrierOrgName: '公司名称',
          sumRechargeAmount: '充值金额汇总(元)',
          sumGasQty: '加气量(公斤)',
          sumAmount: '加气金额汇总(元)',
          sumDiscountAmount: '优惠金额汇总(元)'
        },
        fileName: '账单',
        interfaceName: '/settle/gas_order/sum_cost',
        pageParam: this.parseSearch(finds, pageList.currentPage, pageList.pageSize)
      }
      $excelDownload(params).then(response => {
        const fileName = '账单' + Date.parse(new Date()) + '.xlsx'

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

      // 刷新统计数据
      if (this.$refs.logisticsTables && this.$refs.logisticsTables.tableListResponse) {
        this.$refs.logisticsTables.tableListResponse = null
        this.initTotalData()
      }
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
          gasOrder: {}
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
            params.param.gasOrder[k] = v
          }
        }
      }

      return params
    }
  }
}
</script>
