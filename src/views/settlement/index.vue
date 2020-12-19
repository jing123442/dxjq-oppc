<template>
  <div class="template-main">
    <div class="stats-data">
      <div class="data-item">
        <span class="name">加气量总额：</span>
        <span class="value">{{totalList.gasTotal}} 公斤</span>
      </div>
      <div class="data-item">
        <span class="name">服务费总金额：</span>
        <span class="value">{{totalList.serviceTotal}} 元</span>
      </div>
    </div>
    <em-table-list ref="settlementTables" :tableListName="'settlement'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { $excelDownload } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'settlement',
  data() {
    return {
      isShow: false,
      totalList: { gasTotal: 0, serviceTotal: 0 },
      queryCustURL: {
        list: {
          url: 'settle/gas_order/sum_fee',
          method: 'post',
          parse: {
            tableData: ['data', 'result', 'records'],
            totalCount: ['data', 'result', 'total']
          }
        },
        name: '加气站服务汇总'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'export', name: '导出' }],
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'settlement_servicePrice_mode_list',
      page_status: 'settlement_servicePrice_page_status',
      page_column: 'settlement_servicePrice_column',
      select_list: 'settlement_servicePrice_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  mounted() {
    this.initTotalData()
  },
  methods: {
    initTotalData() {
      const response = this.$refs.settlementTables.tableListResponse

      if (response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data && response.data.totalSum) {
            this.totalList.gasTotal = response.data.totalSum.totalSumGasQty ? response.data.totalSum.totalSumGasQty : 0
            this.totalList.serviceTotal = response.data.totalSum.totalSumServiceFee ? response.data.totalSum.totalSumServiceFee : 0
          }
        }
      } else {
        this.times = setTimeout(() => {
          this.initTotalData()
        }, 200)
      }
    },
    onListEvent(type, row) {
      if (type === 'bill') {
        const finds = this.$refs.settlementTables.finds

        finds.gasstationId = row.gasstationId
        this.$router.push({
          path: 'settIndex/orderList',
          query: finds
        })
      } else if (type === 'export') {
        this.excelDownload()
      }
    },
    excelDownload() {
      const finds = this.$refs.settlementTables.finds
      const pageList = this.$refs.settlementTables.pages
      const params = {
        datas: {
          gasstationName: '加气站名称',
          sumGasQty: '加气量汇总（公斤）',
          sumAmount: '加气金额汇总（元）',
          sumServiceFee: '服务费汇总'
        },
        fileName: '账单',
        interfaceName: '/settle/gas_order/sum_fee',
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
      if (this.$refs.settlementTables && this.$refs.settlementTables.tableListResponse) {
        this.$refs.settlementTables.tableListResponse = null
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
