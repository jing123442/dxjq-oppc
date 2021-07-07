<template>
  <div class="inviteRecords template-main">
    <em-table-list :custTableTitle="'邀请记录'" :tableListName="'inviteRecords'" ref="inviteRecords" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, toolsFileHeaders, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        list: {
          url: 'user/user_invite/page_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '邀请记录'
      },
      headers: toolsFileHeaders(this),
      queryParams: Function
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'invite_records_mode_list',
      page_status: 'invite_records_page_status',
      page_column: 'invite_records_column',
      select_list: 'invite_records_select_list',
      response_success: 'response_success'
    })
  },
  created() {
  },
  methods: {
    onListTableEvent(type, row) {
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'inviteeRegisterDate') {
            if (!_this.finds.inviteeRegisterDate) {
              params.param.dateFrom = ''
              params.param.dateTo = ''
            } else {
              params.param.dateFrom = v[0]
              params.param.dateTo = v[1]
            }
          } else {
            params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
