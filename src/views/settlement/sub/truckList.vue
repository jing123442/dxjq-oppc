<template>
  <div class="template-main">
    <p class="trade-type">交易模式： {{query.tradeType == 1 ? '经销模式': '直销模式'}}</p>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $generateDownloadFile } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/carrier_truck/list',
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
      query: this.$route.query,
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
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_carrier_truck_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      this.query.carNumber = row.carNumber
      if (type == 'bill') {
        this.$router.push({
          path: 'carrierTruckList/carrierTruckOrderList',
          query: this.query
        })
      } else if (type === 'download') {
        const params = [{
          exportParam: JSON.stringify(this.currParams),
          type: 5
        }]
        $generateDownloadFile(params).then(response => {
          this.$alert('您选择的下载内容已申请，请在下载中心下载。', '下载提示')
        })
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { carrierTruck: { carrierOrgId: this.$route.query.orgId, tradeType: this.$route.query.tradeType }, dataParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param.carrierTruck[k] = v
        }
      }

      this.currParams = params.param
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
  left: 155px;
  background: #fff;
  font-size: 14px;
  color: #0084ff;
}
</style>
