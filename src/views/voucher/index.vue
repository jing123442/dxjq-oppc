<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'voucher'" :autoLoad="false" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="tableColumn" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { callbackPagesInfo, formateTData, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $settleCashFlowAdd } from '@/service/settle'

export default {
  name: 'voucher',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'pay/pay/query_cash_flow',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '凭证查询'
      },
      downloadParams: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'download', name: '申请下载' }]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'voucher_list_mode_list',
      page_status: 'voucher_list_page_status',
      page_cc_column: 'voucher_list_cc_column',
      page_xq_column: 'voucher_list_xq_column',
      select_list: 'voucher_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg',
      wopuser: 'wopuser'
    }),
    tableColumn() {
      return (this.wopuser.authorities[0].orgName && this.wopuser.authorities[0].orgName.indexOf('青岛象群') !== -1) ? this.page_xq_column : this.page_cc_column
    }
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type == 'download') {
        this.downloadEvent()
      }
    },
    downloadEvent() {
      const params = this.downloadParams || {}
      if (this.$refs.tables.tableData.length > 0) {
        if (params.orgId) {
          $settleCashFlowAdd(params).then(response => {
            this.$alert('您的下载申请已提交，请前往申请纪录页面下载。盖章文件将于24小时内可下载，非工作日顺延。', '下载提示')
          })
        } else {
          this.$message.error('企业还未认证，请先去认证')
        }
      } else {
        this.$message.error('申请失败，未找到凭证数据')
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgId: '', dateEnd: '', dateStart: '' } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'changeTime') {
            if (_this.finds.updateDate === null) {
              params.param.dateStart = ''
              params.param.dateEnd = ''
            } else {
              params.param.dateStart = formateTData(v[0], 'date')
              params.param.dateEnd = formateTData(v[1], 'date')
            }
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      if (this.wopuser.authorities[0].orgName && this.wopuser.authorities[0].orgName.indexOf('青岛象群') === -1) {
        params.param.orgId = this.woporg
      }
      this.downloadParams.orgId = params.param.orgId
      this.downloadParams.startDate = params.param.dateStart
      this.downloadParams.endDate = params.param.dateEnd

      callback(params)
    }
  }
}
</script>
