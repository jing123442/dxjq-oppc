<template>
  <div class="template-main">
    <em-table-list :tableListName="'accountList'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'accountList',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'account/org_account_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '账户流水'
      },
      buttonsList: [/* { type: 'primary', icon: '', event: 'export', name: '导出流水' } */],
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgId: this.$route.query.orgId, accountId: this.$route.query.accountId } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_org_mode_list',
      page_status: 'bus_org_page_status',
      page_column: 'bus_accountList_column',
      select_list: 'bus_acc_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      page_column_detail: 'bus_orgDetail_column'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {},
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this))

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
