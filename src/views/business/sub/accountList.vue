<template>
  <div class="template-main">
    <em-table-list :tableListName="'accountList'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, isTypeof, callbackPagesInfo, exportBlobToFiles } from '@/utils/tools'
import { $orgAccountLogDownload } from '@/service/account'
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
      currParams: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'export_account_list', name: '导出' }]
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
    onListEvent(type, row) {
      if (type == 'export_account_list') {
        this.$confirm('确定下载吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $orgAccountLogDownload({ ...this.currParams.param }).then(res => {
            const fileName = '资金流水_' + Date.parse(new Date()) + '.xlsx'
            exportBlobToFiles(res, fileName)
          })
        })
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: { createDateFrom: '', createDateTo: '' }, orgAccountLog: { orgId: this.$route.query.orgId, accountId: this.$route.query.accountId } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (v !== '') {
              params.param.orgAccountLog[k] = v
            }
          }
        }
      }
      this.currParams = params
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
