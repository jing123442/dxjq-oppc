<template>
  <div class="template-main">
    <em-table-list :tableListName="'filler'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'lngStationAccountManager',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: '/account/gasstation_account/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站资金账户管理'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } })
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_account_mode_list',
      page_status: 'filler_account_page_status',
      page_column: 'filler_account_column',
      select_list: 'filler_account_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      const gasstationId = row.gasstationId
      const accountId = row.accountId
      if (type === 'check') {
        this.$router.push(`lngStationAccountManager/accountList?gasstationId=${gasstationId}&accountId=${accountId}`)
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
