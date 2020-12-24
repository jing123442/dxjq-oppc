<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  data() {
    return {
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
      buttonsList: [/* { type: 'primary', icon: '', event: 'add_info', name: '增加企业' } */],
      axios: axiosRequestParams(this),
      queryParams: Function,
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
    }
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
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { carrierTruck: { carrierOrgId: this.$route.query.orgId }, dateParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param.gasOrder[k] = v
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
