<template>
  <div class="template-main">
    <em-table-list :tableListName="'account'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="query_params" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        add: {
          url: '/user/user/add',
          method: 'post'
        },
        edit: {
          url: '/user/user/edit',
          method: 'post'
        },
        list: {
          url: '/account/org_account/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '公司资金账户管理 '
      },
      axios: axiosRequestParams(this)
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_account_mode_list',
      page_status: 'bus_account_page_status',
      page_column: 'bus_account_column',
      select_list: 'bus_account_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      query_params: 'query_params',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'check') {
        this.$router.push(`account/accountList?orgId=${row.orgId}&accountId=${row.accountId}`)
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
