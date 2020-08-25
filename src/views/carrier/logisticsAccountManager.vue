<template>
  <div class="template-main">
    <em-table-list :tableListName="'logisticsAccountManager'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="充值" :visible.sync="dialogRechargeVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogRechargeVisible" :rowData="rechargeRow" :pageColumn="page_column_firmAccountRecharge" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userOrgFind } from '@/service/user'

export default {
  name: 'logisticsAccountManager',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        edit: {
          url: '/account/org_account/edit_auto_account',
          method: 'post'
        },
        list: {
          url: 'account/org_account/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '公司资金账户管理'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogRechargeVisible: false,
      rechargeRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_firmAccount_mode_list',
      page_status: 'carrier_firmAccount_page_status',
      page_column: 'carrier_firmAccount_column',
      page_column_firmAccountRecharge: 'carrier_firmAccountRecharge_column',
      select_list: 'carrier_firmAccount_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      console.log(type, row)
      const self = this
      if (type === 'recharge') {
        const orgId = row.orgId
        $userOrgFind({ orgId }).then(res => {
          console.log(res)
          if (res.code === 0) {
            self.rechargeRow = res.data
            self.rechargeRow._btn = {
              iShow: true,
              list: [{
                bType: 'default',
                label: '取消',
                icon: ''
              },{
                bType: 'primary',
                label: '确定',
                icon: ''
              }]
            }
            self.dialogRechargeVisible = true
          }
        })
      }
    },
    onListEventDialog(type, row) {
      console.log(type, row)
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
