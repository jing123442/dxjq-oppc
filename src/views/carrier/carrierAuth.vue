<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrierAuth'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="物流公司" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form ref="addGap" v-if="active == 2 && dialogAddGasStationVisible" :rowData="authRow" :inputType="inputType" :modeList="mode_list" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"></nt-form>
    </el-dialog>
 </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, custFormBtnList, isTypeof, toolsFileHeaders } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'carrierAuth',
  data() {
    return initVueDataOptions(this, {
      active: '2',
      isAuthInfo: false,
      tabDisabled: false,
      authColor: 'off',
      inputType: 'detail',
      queryCustURL: {
        list: {
          url: 'user/org/page_list_unauth_carrier',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司'
      },
      headers: {},
      buttonsList: [],
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_column: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_unauth_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_unauth_column',
      select_list: 'carrier_logistics_select_list',
      page_auth_column: 'common_org_auth_column',
      page_s_auth_column: 'common_org_s_auth_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.headers = toolsFileHeaders(this)
  },
  methods: {
    async onListEvent(type, row) {
      this.currType = type
      // 重置tab标签值
      this.active = row && row.authType ? '' + row.authType : '2'
      // 显示认证状态
      this.authColor = row && row.authStatus == 2 ? 'no' : 'off'
      // 是否显示dialog
      this.dialogAddGasStationVisible = true
      if (this.active == '2') {
        this.auth_page_column = this.page_auth_column
      } else {
        this.auth_page_column = this.page_s_auth_column
      }
      this.authRow = row
      this.authRow._btn = custFormBtnList(1)
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { org: { orgType: 2 }, dateFrom: '', dateTo: '' } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'authDate') {
            if (_this.finds.authDate === null) {
              params.param.dateFrom = ''
              params.param.dateTo = ''
            } else {
              params.param.dateFrom = v ? v[0] : ''
              params.param.dateTo = v ? v[1] : ''
            }
          } else if (k == 'keyword') {
            if (v !== '') params.param[k] = v
          } else if (k) {
            if (v !== '') params.param.org[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
