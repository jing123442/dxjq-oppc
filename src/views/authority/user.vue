<template>
  <div class="template-main">
    <em-table-list :tableListName="'userop'" ref="tables" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="配置角色" :visible.sync="dialogConfigRoleVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogConfigRoleVisible" ref="configRole" :formRef="'configRoleForm'" :rowData="configRoleRow" :inputType="'config'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventConfigRole"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'
import { $resetPassword, $userConfigRole } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'userop',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: '/user/user/add',
          method: 'post',
          demandList: ['roleList']
        },
        edit: {
          url: '/user/user/edit',
          method: 'post',
          demandList: ['roleList']
        },
        list: {
          url: '/user/user/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '平台用户管理'
      },
      configRoleRow: {},
      dialogConfigRoleVisible: false,
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { userType: 0 } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'authority_user_mode_list',
      page_status: 'authority_user_page_status',
      page_column: 'authority_user_column',
      select_list: 'authority_user_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'reset_pwd') {
        $resetPassword({ userId: row.userId }).then(response => {
          this.$message.success(response.message)
        })
      } else if (type === 'config_role') {
        this.$refs.tables.initSelectList(['roleList'])
        this.configRoleRow = row
        this.configRoleRow._btn = this.formBtnList
        this.dialogConfigRoleVisible = true
      }
    },
    onListEventConfigRole(btn, row) {
      console.log(row)
      if (btn.type === 'ok') {
        this.$refs.configRole.$refs.configRoleForm.validate((valid) => {
          if (valid) {
            const params = {
              userId: row.userId,
              userCode: row.userCode,
              userName: row.userName,
              status: row.status,
              mobile: row.mobile,
              baseRole: row.baseRole
            }

            $userConfigRole(params).then((res) => {
              this.$message.success(res.message)

              this.$refs.tables.initDataList()
            })
            this.dialogConfigRoleVisible = false
          }
        })
      } else {
        this.dialogConfigRoleVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      if (type === 'roleList') {
        // eslint-disable-next-line standard/no-callback-literal
        callback({
          clientId: 'woperation',
          orgId: _this.row.orgId
        })
      }
    }
  }
}
</script>
