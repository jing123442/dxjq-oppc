<template>
  <div class="template-main">
    <div class="total">
      <span>加气量总额：</span>
      <span>{{totalSumGasQty}}公斤</span>
      <span class="fee">服务费总金额：</span>
      <span>{{totalSumServiceFee}}元</span>
    </div>
    <em-table-list :tableListName="'settlement'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'settlement',
  data() {
    return {
      isShow: false,
      totalSumGasQty: 0,
      totalSumServiceFee: 0,
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
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { dateParam: { createDateFrom: '', createDateTo: '' }, gasOrder: { } } })
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
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'bill') {
        const gasstationId = row.gasstationId
        this.$router.push(`index/orderList?gasstationId=${gasstationId}`)
      } else if (type === 'export') {
        console.log('export')
      }
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .fee {
    margin-left: 20px;
  }
</style>
