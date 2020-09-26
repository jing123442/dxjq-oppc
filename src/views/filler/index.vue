<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'filler'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="添加加气站" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog">
      <div v-if="isAuthInfo" class="auth-status" :class="authColor"><span class="auth-status__dot" :class="authColor"></span>
        {{authRow.authStatus == 2 ? '已认证' : (authRow.authStatus == 1 ? '认证中' : (authRow.authStatus == 3 ? '认证失败' : '未认证'))}}
      </div>
      <el-tabs v-model="active" type="card" @tab-click="handleClick">
        <el-tab-pane label="一证" name="2" :disabled="tabDisabled">
          <nt-form ref="addGap" v-if="active == 2 && dialogAddGasStationVisible" :rowData="authRow" :modeList="mode_list_gasstation" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
        </el-tab-pane>
        <el-tab-pane label="三证" name="1" :disabled="tabDisabled">
          <nt-form ref="addGap" v-if="active == 1 && dialogAddGasStationVisible" :rowData="authRow" :modeList="mode_list_gasstation" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orgAuth } from '@/service/pay'
import { $userOrgAdd, $userOrgEdit } from '@/service/user'

export default {
  name: 'filler',
  data() {
    return {
      active: '2',
      isAuthInfo: false,
      tabDisabled: false,
      authColor: 'off',
      isShow: false,
      queryCustURL: {
        list: {
          url: 'user/org/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add_info', name: '增加企业' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 1 } }),
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_column: []
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_firmList_mode_list',
      mode_list_gasstation: 'filler_gasstation_mode_list',
      page_status: 'filler_firmList_page_status',
      page_column: 'filler_firmList_column',
      page_auth_column: 'filler_auth_column',
      page_s_auth_column: 'filler_s_auth_column',
      select_list: 'filler_firmList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.resetAuthPageCol()
  },
  methods: {
    onListEvent(type, row) {
      this.currType = type
      // 重置page_column值
      this.resetAuthPageCol()

      // 重置tab标签值
      this.active = row && row.authType ? '' + row.authType : '2'
      // 显示认证状态
      this.authColor = row && row.authStatus == 2 ? 'no' : 'off'
      // 是否显示dialog
      this.dialogAddGasStationVisible = true
      this.authRow = row
      if (type === 'add_info' || type === 'gedit' || type === 'auth') {
        this.authRow._btn = custFormBtnList()
      } else {
        this.authRow._btn = {}
      }
    },
    handleClick() {
      this.resetAuthPageCol()
    },
    resetAuthPageCol() {
      if (this.active == '2') {
        this.auth_page_column = this.page_auth_column
      } else {
        this.auth_page_column = this.page_s_auth_column
      }
      if (this.currType == 'auth' || this.currType == 'detail') {
        this.tabDisabled = true
        this.isAuthInfo = true
        this.auth_page_column.forEach(item => {
          if (item.show && item.show.type != 'hide') {
            item.show.isDisabled = true
          }
        })
      } else {
        this.tabDisabled = false
        this.isAuthInfo = false
        this.auth_page_column.forEach(item => {
          if (item.show && item.show.type != 'hide') {
            item.show.isDisabled = false
          }
        })
      }
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
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'gedit') {
          this.onListEventAddGasStation(row)
        } else {
          this.orgAuthEvent(row)
        }
      }

      this.dialogAddGasStationVisible = false
    },
    orgAuthEvent(row) {
      const params = {
        memberType: 2,
        orgId: row.orgId,
        source: 2
      }
      $orgAuth(params).then(res => {
        this.$message.success('成功！')

        this.$refs.tables.initDataList()
      })
    },
    onListEventAddGasStation(row) {
      this.$refs.addGap.$children[0].validate(valid => {
        if (valid) {
          const params = {}
          this.auth_page_column.forEach(item => {
            params[item.field] = row[item.field]
          })

          params.authType = this.active
          params.orgType = 1
          if (this.currType === 'add_info') {
            $userOrgAdd(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          } else {
            params.orgId = row.orgId
            $userOrgEdit(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .auth-status {
    position: absolute;
    right: 20px;
    margin-top: 5px;
    padding-left: 10px;
    &.off {
      color: red;
    }

    &.no {
      color: #4caf50;
    }

    &__dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 10px;
      margin-bottom: 1px;

      &.off {
        background-color: red;
      }

      &.no {
        background-color: #4caf50;
      }
    }
  }
</style>
