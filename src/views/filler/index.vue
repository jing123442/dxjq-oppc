<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'filler'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @checkboxStatus="checkboxStatus"></em-table-list>
    <el-dialog title="添加加气站" :visible.sync="dialogAddChildFillerVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form ref="addChild" v-if="dialogAddChildFillerVisible" :rowData="addChildRow" :inputType="inputType" :pageColumn="page_filler_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onAddChildFiller"></nt-form>
    </el-dialog>
    <el-dialog title="添加企业" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog" :append-to-body="true">
      <div v-if="isAuthInfo" class="auth-status" :class="authColor"><span class="auth-status__dot" :class="authColor"></span>
        {{authRow.authStatus == 2 ? '已认证' : (authRow.authStatus == 1 ? '认证中' : (authRow.authStatus == 3 ? '认证失败' : '未认证'))}}
      </div>
      <el-tabs v-model="active" type="card" @tab-click="handleClick">
        <el-tab-pane label="一证" name="2" :disabled="tabDisabled">
          <nt-form ref="addGap" v-if="active == 2 && dialogAddGasStationVisible" :rowData="authRow" :inputType="inputType" :modeList="auth_page_mode" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
        </el-tab-pane>
        <el-tab-pane label="三证" name="1" :disabled="tabDisabled">
          <nt-form ref="addGap" v-if="active == 1 && dialogAddGasStationVisible" :rowData="authRow" :inputType="inputType" :modeList="auth_page_mode" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="收银员信息" :visible.sync="dialogFillerUserVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogFillerUserVisible" ref="recordList" :tableListName="'recordList'" :custTableTitle="'收银员列表'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURLUser" :responseSuccess="response_success" :queryParam="queryParamsUser" :mode_list="mode_list" :page_status="page_status" :page_column="page_user_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, custFormBtnList, callbackPagesInfo, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orgAuth } from '@/service/pay'
import { $userOrgAdd, $userOrgEdit, $userFindOrgAdmin, $userOrgPicList, $userAddChildFiller, $userExportFillerInfo } from '@/service/user'

export default {
  name: 'filler',
  data() {
    return initVueDataOptions(this, {
      active: '2',
      isAuthInfo: false,
      tabDisabled: false,
      authColor: 'off',
      queryCustURL: {
        list: {
          url: 'user/org/page_list_filler',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      queryCustURLUser: {
        list: {
          url: '/user/user/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add_info', name: '增加企业' }, { type: 'primary', icon: '', event: 'add_clone', name: '增加加气站' }, { type: 'primary', icon: '', event: 'export', name: '导出' }],
      queryParamsUser: null,
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_mode: [],
      auth_page_column: [],
      dialogFillerUserVisible: false,
      addChildRow: {},
      dialogAddChildFillerVisible: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_firmList_mode_list',
      mode_list_gasstation: 'filler_manage_mode_list',
      mode_add_gasstation: 'filler_gasstation_mode_list',
      page_status: 'filler_firmList_page_status',
      page_column: 'filler_firmList_column',
      page_auth_column: 'common_org_auth_column',
      page_s_auth_column: 'common_org_s_auth_column',
      page_auth_filler_column: 'common_org_filler_auth_other_column',
      page_sort_filler_column: 'common_org_gasstation_auth_column',
      page_user_column: 'filler_user_column',
      page_filler_column: 'filler_filler_child_column',
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
      if (type == 'cashier_list') {
        this.authRow._btn = {}
        this.queryParamsUser = queryDefaultParams(this, { type: 2, key: 'param', value: { userType: 1, baseRole: 'cashier', orgId: row.orgId } })
        this.dialogFillerUserVisible = true
      } else if (type == 'add_clone') {
        this.addChildRow = row
        this.addChildRow._btn = this.formBtnList
        this.dialogAddChildFillerVisible = true
      } else if (type == 'export') {
        this.exportFillerInfo(row)
      } else {
        // 重置page_column值
        this.resetAuthPageCol()

        // 重置tab标签值
        this.active = row && row.authType ? '' + row.authType : '2'
        // 显示认证状态
        this.authColor = row && row.authStatus == 2 ? 'no' : 'off'
        // 是否显示dialog
        this.dialogAddGasStationVisible = true
        this.authRow = row
        if (type === 'add_info' || type === 'self_edit' || type === 'cert') {
          this.auth_page_mode = this.mode_add_gasstation
          this.authRow._btn = custFormBtnList()
        } else {
          this.auth_page_mode = this.mode_list_gasstation
          this.authRow._btn = custFormBtnList(1)
          this.orgAuthList(row)
        }
      }
    },
    exportFillerInfo(row) {
      $userExportFillerInfo(this.currParams).then(response => {
        const fileName = '加气站列表' + '_' + (new Date().getTime()) + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    async orgAuthList(row) {
      // 管理员信息
      const adminData = await $userFindOrgAdmin({ orgId: row.orgId }).then(response => {
        return response.data
      })
      const adminInfo = []
      adminData.forEach(item => {
        adminInfo.push(item.userName + '/' + item.mobile)
      })
      this.authRow.manageInfo = adminInfo.join(' | ')

      // 认证图片信息
      let picTypeStatus12 = false
      let picTypeStatus13 = false
      let picTypeStatus14 = false
      let picTypeStatus15 = false
      let picTypeStatus16 = false
      const params = {
        picTypes: [1, 8, 9, 12, 13, 14, 15, 16],
        orgId: row.orgId
      }
      const picList = await $userOrgPicList(params).then(res => {
        return res.data
      })
      picList.forEach(item => {
        const keyList = { key: '', time: '' }
        if (item.picType == 1) {
          keyList.key = 'yyzzPic'
          keyList.time = 'yyzzPicDate'
        } else if (item.picType == 8) {
          keyList.key = 'sfzrlPic'
          keyList.time = 'sfzrlPicDate'
        } else if (item.picType == 9) {
          keyList.key = 'sfzghPic'
          keyList.time = 'sfzghPicDate'
        } else if (item.picType == 12) {
          picTypeStatus12 = true
          keyList.key = 'rqjyPic'
          keyList.time = 'rqjyPicDate'
        } else if (item.picType == 13) {
          picTypeStatus13 = true
          keyList.key = 'qpczPic'
          keyList.time = 'qpczPicDate'
        } else if (item.picType == 14) {
          picTypeStatus14 = true
          keyList.key = 'xfysPic'
          keyList.time = 'xfysPicDate'
        } else if (item.picType == 15) {
          picTypeStatus15 = true
          keyList.key = 'hbpjPic'
          keyList.time = 'hbpjPicDate'
        } else if (item.picType == 16) {
          picTypeStatus16 = true
          keyList.key = 'jqzyyzzPic'
          keyList.time = 'jqzyyzzPicDate'
        }
        this.authRow[keyList.key] = item.picPath
        this.authRow[keyList.time] = item.updateDate || item.createDate
      })
      // 如果未传许可证，用户可以上传图片
      this.auth_page_column.forEach(item => {
        if (item.field === 'rqjyPic') {
          this.inputPicUpload('rqjyPic', picTypeStatus12, item)
        }
        if (item.field === 'qpczPic') {
          this.inputPicUpload('qpczPic', picTypeStatus13, item)
        }
        if (item.field === 'xfysPic') {
          this.inputPicUpload('xfysPic', picTypeStatus14, item)
        }
        if (item.field === 'hbpjPic') {
          this.inputPicUpload('hbpjPic', picTypeStatus15, item)
        }
        if (item.field === 'jqzyyzzPic') {
          this.inputPicUpload('jqzyyzzPic', picTypeStatus16, item)
        }
      })
    },
    inputPicUpload(field, status, item) {
      if (item.field === field) {
        if (status) {
          item.detail = item.detail_d
        } else {
          this.authRow[item.field] = []
          item.detail = item.detail_u
        }
      }
    },
    handleClick() {
      this.resetAuthPageCol()
    },
    resetAuthPageCol() {
      if (this.active == '2') {
        this.auth_page_column = [...this.page_auth_column, ...this.page_sort_filler_column]
      } else {
        this.auth_page_column = [...this.page_s_auth_column, ...this.page_sort_filler_column]
      }
      if (this.currType == 'cert' || this.currType == 'self_detail') {
        this.tabDisabled = true
        this.isAuthInfo = true
        this.inputType = 'detail'
        if (this.currType == 'self_detail') {
          this.auth_page_column = [...this.auth_page_column, ...this.page_auth_filler_column]
        }
      } else {
        this.tabDisabled = false
        this.isAuthInfo = false
        this.inputType = 'show'
      }
    },
    onReqParams(type, _this, callback) {
      const query = { param: { } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'authDate') {
            if (_this.finds.authDate === null) {
              query.dateFrom = ''
              query.dateTo = ''
            } else {
              query.dateFrom = v[0]
              query.dateTo = v[1]
            }
          } else if (k == 'keyword') {
            if (v !== '') query.param[k] = v
          } else {
            if (v !== '') query.param.org[k] = v
          }
        }
      }
      this.currParams = query.param

      const params = Object.assign({}, callbackPagesInfo(_this), query)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    checkboxStatus(row, index, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback(true)
    },
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'self_edit') {
          this.onListEventAddGasStation(row)
        } else {
          this.orgAuthEvent(row)
          this.dialogAddGasStationVisible = false
        }
      } else {
        this.dialogAddGasStationVisible = false
      }
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
    onAddChildFiller(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.addChild.$children[0].validate(valid => {
          if (valid) {
            const params = {
              orgId: row.orgId,
              orgShortName: row.orgShortName,
              adminName: row.adminName,
              adminMobile: row.adminMobile
            }

            $userAddChildFiller(params).then(response => {
              this.$message.success('成功！')
              this.dialogAddChildFillerVisible = false

              this.$refs.tables.initDataList()
            })
          }
        })
      } else {
        this.dialogAddChildFillerVisible = false
      }
    },
    onListEventAddGasStation(row) {
      this.$refs.addGap.$children[0].validate(valid => {
        if (valid) {
          const params = {}
          this.auth_page_column.forEach(item => {
            if (item.ispush !== false) {
              params[item.field] = row[item.field]
            }
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

          this.dialogAddGasStationVisible = false
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
