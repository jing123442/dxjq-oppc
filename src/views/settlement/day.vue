<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'orderDay'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $generateDownloadFile } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'orderDay',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/gas_order/page_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '日结算订单'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'export', name: '导出申请' }],
      currParams: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_list_mode_list',
      page_status: 'order_list_page_status',
      page_column: 'order_day_column',
      select_list: 'order_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      wopuser: 'wopuser'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      const params = [{
        exportParam: JSON.stringify(this.currParams),
        type: 14
      }]
      $generateDownloadFile(params).then(response => {
        this.$alert('您申请日结算订单已经处理，请在下载中心下载。', '下载提示')
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { dateParam: { updateDateFrom: '', updateDateTo: '' } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'updateDate') {
            if (_this.finds.updateDate === null) {
              querys.param.dateParam.updateDateFrom = ''
              querys.param.dateParam.updateDateTo = ''
            } else {
              querys.param.dateParam.updateDateFrom = v[0]
              querys.param.dateParam.updateDateTo = v[1]
            }
          } else {
            if (v !== '') querys.param[k] = v
          }
        }
      }

      this.currParams = querys.param

      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
