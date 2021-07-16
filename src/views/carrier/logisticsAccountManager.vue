<template>
  <div class="template-main">
    <em-table-list :tableListName="'logisticsAccountManager'" ref="accountList" :buttonsList="buttonsList" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="充值" :visible.sync="dialogRechargeVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form ref="recharge" v-if="dialogRechargeVisible" :rowData="rechargeRow" :pageColumn="page_column_firmAccountRecharge" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialog"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userOrgFind } from '@/service/user'
import { $rechargeAdd } from '@/service/pay'

export default {
  name: 'logisticsAccountManager',
  data() {
    return initVueDataOptions(this, {
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
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 2 } }),
      dialogRechargeVisible: false,
      rechargeRow: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'accountWarn', name: '资金预警' }]
    })
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
      if (type === 'recharge') {
        this.rechargeEvent(row)
      } else if (type === 'list') {
        this.accountListEvent(row)
      } else if (type === 'load') {
        this.vehicleCircleEvent(row)
      } else if (type === 'accountWarn') {
        this.$router.push('logisticsAccountManager/accountWarn')
      }
    },
    rechargeEvent(row) {
      const self = this
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
            }, {
              bType: 'primary',
              label: '确定',
              icon: ''
            }]
          }
          self.dialogRechargeVisible = true
        }
      })
    },
    accountListEvent(row) {
      const orgId = row.orgId
      const accountId = row.accountId
      this.$router.push(`logisticsAccountManager/accountList?orgId=${orgId}&accountId=${accountId}`)
    },
    vehicleCircleEvent(row) {
      const orgId = row.orgId
      this.$router.push(`logisticsAccountManager/vehicleCircle?orgId=${orgId}`)
    },
    onListEventDialog(type, row) {
      console.log(type, row)
      const self = this
      if (type.label === '确定') {
        this.$refs.recharge.$children[0].validate((valid) => {
          if (valid) {
            const params = { ...self.rechargeRow }
            $rechargeAdd(params).then(res => {
              console.log(res)
              if (res.code === 0) {
                self.$message.success(res.message)
                self.dialogRechargeVisible = false
                self.$refs.accountList.initDataList()
              } else {
                self.$message.success(res.message)
              }
            })
          }
        })
      } else {
        self.dialogRechargeVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgType: 0 } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
