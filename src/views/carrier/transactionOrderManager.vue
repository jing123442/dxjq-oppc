<template>
  <div class="template-main">
    <em-table-list :tableListName="'transactionOrderManager'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
     <el-dialog title="交易订单详情" :visible.sync="dialogDetailVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :modeList="mode_list_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogDetail"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'transactionOrderManager',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'business/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气订单管理'
      },
      axios: axiosRequestParams(this),
      queryParams: Function,
      dialogDetailVisible: false,
      detailRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_orderManager_mode_list',
      page_status: 'carrier_orderManager_page_status',
      page_column: 'carrier_orderManager_column',
      page_column_detail: 'carrier_orderManagerDetail_column',
      select_list: 'carrier_orderManager_select_list',
      mode_list_detail: 'carrier_orderManagerDetail_mode_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    console.log(this.mode_list_detail)
  },
  methods: {
    onListEvent(type, row) {
      if (type === 'detaila') {
        this.detailRow = row
        this.detailRow._btn = {
          iShow: true,
          list: [{
            bType: 'primary',
            label: '返回',
            icon: ''
          }]
        }
        this.dialogDetailVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      let params = {}
      if (type == 'list') {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: { createDateFrom: '', createDateTo: '' }, gasOrder: {}, orgId: '' } })

        if (isTypeof(_this.finds) === 'object') {
          for (var [k, v] of Object.entries(_this.finds)) {
            if (v !== '') params.param.gasOrder[k] = v
          }
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onListEventDialogDetail(obj) {
      this.dialogDetailVisible = false
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
