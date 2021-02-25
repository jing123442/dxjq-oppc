<template>
  <div class="template-main">
    <em-table-list :tableListName="'truckAccountManager'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'truckAccountManager',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'account/truck_account/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '卡车司机账户管理'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { accountType: 1 } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_truckIntegral_mode_list',
      page_status: 'carrier_truckIntegral_page_status',
      page_column: 'carrier_truckIntegral_column',
      select_list: 'carrier_truckIntegral_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'list') {
        const orgId = row.orgId
        const accountId = row.accountId
        const truckId = row.truckId
        this.$router.push(`truckIntegral/truckIntegralList?orgId=${orgId}&accountId=${accountId}&truckId=${truckId}`)
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgType: 0 } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
