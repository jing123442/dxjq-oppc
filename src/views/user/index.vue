<template>
  <div class="template-main">
    <em-table-list :tableListName="'userop'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'userop',
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
        name: '平台用户管理'
      },
      axios: axiosRequestParams(this),
      queryParams: [{
        type: 1,
        key: 'page',
        value: 'pageNum'
      }, {
        type: 1,
        key: 'size',
        value: 'pageSize'
      }, {
        type: 2,
        key: 'param',
        value: { userType: 0 }
      }]
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'user_op_mode_list',
      page_status: 'user_op_page_status',
      page_column: 'user_op_column',
      select_list: 'user_op_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      query_params: 'query_params',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {},
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
