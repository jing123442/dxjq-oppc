<template>
  <div class="template-main">
    <em-table-list :tableListName="'usercarrier'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { $resetPassword } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'usercarrier',
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
          url: '/user/user/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流用户管理'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { userType: 2 } })
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'user_carrier_mode_list',
      page_status: 'user_carrier_page_status',
      page_column: 'user_carrier_column',
      select_list: 'user_carrier_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { console.log(this.select_list) },
  methods: {
    onListEvent(type, row) {
      if (type == 'resetpwd') {
        $resetPassword({ userId: row.userId }).then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
        })
      }
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 2
        }
      })
    }
  }
}
</script>
