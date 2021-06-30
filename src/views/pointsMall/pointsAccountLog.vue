<template>
  <div class="pointsAccountDetail">
    <em-table-list :custTableTitle="'积分明细'" :tableListName="'pointsAccountDetail'" ref="pointsAccountDetail" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @updateColumnValue="updateColumnValue" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      row: JSON.parse(this.$route.query.row),
      queryTableCustURL: {
        list: {
          url: 'account/user_account_log/page_list_score',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '积分明细'
      },
      btnList: custFormBtnList(),
      queryParams: Function
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'points_account_log_mode_list',
      page_status: 'points_account_log_page_status',
      page_column: 'points_account_log_column',
      select_list: 'points_account_log_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      response_success: 'response_success'
    })
  },
  methods: {
    onListTableEvent(type, row) {
    },
    onReqParams(type, _this, callback) {
      const that = this
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { userAccountLog: { accountId: that.row.accountId } } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (!_this.finds.createDate) {
              params.param.dateFrom = ''
              params.param.dateTo = ''
            } else {
              params.param.dateFrom = v[0]
              params.param.dateTo = v[1]
            }
          } else {
            params.param.userAccountLog[k] = v
          }
        }
      }
      callback(params)
    },
    updateColumnValue(dataList, callback) {
      dataList.forEach(item => {
        if (item.changeAmount < 0) {
          item.changeType = '减少'
        } else if (item.changeAmount > 0) {
          item.changeType = '增加'
        }
      })
      callback(dataList)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
