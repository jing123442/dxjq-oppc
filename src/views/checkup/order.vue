<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrier'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="资料信息" :visible.sync="dialogFileVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogFileVisible" ref="recordList" :tableListName="'recordList'" :custTableTitle="'资料信息列表'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryFileCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_file_status" :page_column="page_file_column" :select_list="select_list" @onReqParams="onFileReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { callbackPagesInfo, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'checkOrder',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        cancel: {
          url: 'pay/gct_order/cancel',
          width: '40%',
          isForm: true,
          title: '取消订单',
          method: 'post',
          props: {
            orderId: 'orderId'
          }
        },
        list: {
          url: 'pay/gct_order/page_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total'],
            childrenData: ['gctOrder']
          }
        },
        name: ''
      },
      queryFileCustURL: {
        list: {
          url: 'pay/gct_order_attach/list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: ''
      },
      dialogFileVisible: false,
      currRow: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'checkup_order_mode_list',
      page_status: 'checkup_order_page_status',
      page_column: 'checkup_order_column',
      select_list: 'checkup_order_select_list',
      page_file_status: 'checkup_material_page_status',
      page_file_column: 'checkup_material_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {},
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'material') {
        this.currRow = row
        this.dialogFileVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gctOrder: {} } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'status') {
            params.param.gctOrder[k] = v
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      callback(params)
    },
    onFileReqParams(type, _this, callback) {
      const params = { id: this.currRow.orderId }

      callback(params)
    }
  }
}
</script>

