<template>
  <div class="template-main">
    <table-total-data
      ref="tables1"
      :dataList="dataList"
      :rowData="orderInfo"
      :headerStyle="'top: 110px;'"
    ></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderList'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, custFormBtnList, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'
export default {
  name: 'order',
  components: { TableTotalData },
  data() {
    return {
      dataList: [
        {
          name: '实收总额：',
          field: 'actualAllValue',
          unit: ' 元'
        },
        {
          name: '赠送总额：',
          field: 'giveAllValue',
          unit: ' 元'
        }
      ],
      orderInfo: {
        actualAllValue: 0,
        giveAllValue: 0
      },
      queryCustURL: {
        list: {
          // url: '/pay/gas_order/list_withtime',
          url: 'strategy/flag_order/get_recharge_list',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        },
        name: '订单管理'
      },
      axios: axiosRequestParams(this),
      bottonList: custFormBtnList(),
      queryParams: Function,
      buttonsList: [],
      gasstationId: this.$store.state.app.stationId
    }
  },
  computed: {
    ...mapGetters({
      page_status: 'order_list_page_status',
      page_column: 'order_recharge_list_column',
      select_list: 'order_recharge_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      // del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  mounted() {
    this.initTotalData('init')
  },
  methods: {
    initTotalData(val) {
      const response = this.$refs.tables.tableListResponse
      if (response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data) {
            this.orderInfo = { ...response.data }
          } else {
            this.orderInfo = { actualAllValue: 0, giveAllValue: 0 }
          }
        }
      } else {
        if (val) {
          this.times = setTimeout(() => {
            this.initTotalData(val)
          }, 200)
        } else {
          this.times = setTimeout(() => {
            this.initTotalData()
          }, 200)
        }
      }
    },
    onListEvent(type) {},
    onReqParams(type, _this, callback) {
      const params = this.parseSearch(_this)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
      // 刷新统计数据
      if (this.$refs.tables && this.$refs.tables.tableListResponse) {
        this.$refs.tables.tableListResponse = null
        this.initTotalData()
      }
    },
    parseSearch(_this) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasstationId: this.gasstationId } })
      if (isTypeof(_this.finds) === 'object') {
        // eslint-disable-next-line no-redeclare
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'createDate') {
            if (_this.finds.createDate) {
              params.param.timeType = 2
              params.param.startTime = v[0]
              params.param.endTime = v[1]
            }
          } else if (k === 'settleDate') {
            if (_this.finds.settleDate) {
              params.param.timeType = 1
              params.param.startTime = v[0]
              params.param.endTime = v[1]
            }
          } else if (v && k === 'orderId') {
            params.param.selType = 1
            params.param.selStr = v
          } else if (v && k === 'carrierName') {
            params.param.selType = 2
            params.param.selStr = v
          } else if (v && k === 'cardNo') {
            params.param.selType = 3
            params.param.selStr = v
          } else {
            if (!v) {
              delete params.param[k]
            } else {
              params.param[k] = v
            }
          }
        }
      }
      return params
    }
  }
}
</script>
<style lang="scss" scoped></style>
