<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 108px;'" :detailInfo="'结算订单为成功支付后订单'"></table-total-data>
    <p class="trade-type">交易模式： {{query.tradeType == 1 ? '经销模式': '直销模式'}}</p>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $carrierGasstationOrderTotal } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/carrier_gasstation/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      buttonsList: [/* { type: 'primary', icon: '', event: 'add_info', name: '增加企业' } */],
      query: this.$route.query,
      dataList: [{
        name: '加气量总额：',
        field: 'gasQtyTotal',
        unit: ' 公斤'
      }, {
        name: '平台结算总金额：',
        field: 'amountTotal',
        unit: ' 元'
      }, {
        name: '优惠总金额：',
        field: 'discountTotal',
        unit: ' 元'
      }],
      totalInfo: { amountTotal: 0, discountTotal: 0, gasQtyTotal: 0 }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_carrier_filler_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      this.query.fillerId = row.gasstationId
      this.query.orgName = row.carrierOrgName
      this.query.fillerName = row.gasstationName
      this.query.id = row.id
      if (type == 'list') {
        this.$router.push({
          path: 'carrierSettlementList/carrierSettlementOrderList',
          query: this.query
        })
      }
    },
    initTotalData(params) {
      $carrierGasstationOrderTotal(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { carrierGasstation: { carrierOrgId: this.$route.query.orgId, tradeType: this.query.tradeType }, dataParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') querys.param.carrierGasstation[k] = v
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
<style lang="scss" scoped>
.trade-type {
  position: absolute;
  top: 97px;
  left: 775px;
  background: #fff;
  font-size: 14px;
  color: #0084ff;
}
</style>
