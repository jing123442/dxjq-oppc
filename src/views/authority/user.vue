<template>
  <div class="template-main">
    <em-table-list :tableListName="'userop'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'userop',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: '/user/user/add',
          method: 'post'
        },
        edit: {
          url: '/user/user/edit',
          method: 'post',
          demandList: ['roleList']
        },
        list: {
          url: '/user/user/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '平台用户管理'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { userType: 0 } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'authority_user_mode_list',
      page_status: 'authority_user_page_status',
      page_column: 'authority_user_column',
      select_list: 'authority_user_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {},
    onReqParams(type, _this, callback) {
      if (type === 'roleList') {
        // eslint-disable-next-line standard/no-callback-literal
        callback({
          clientId: 'woperation',
          orgId: _this.row.orgId
        })
      }
    }
  }
}
</script>
