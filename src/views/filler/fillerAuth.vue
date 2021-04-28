<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'filler'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @checkboxStatus="checkboxStatus"></em-table-list>
    <el-dialog title="加气站详情" :visible.sync="dialogAuthVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form ref="addChild" v-if="dialogAuthVisible" :rowData="authRow" :inputType="inputType" :modeList="mode_list" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onAuthEvent"></nt-form>
    </el-dialog>
    <el-dialog :title="authTitle" :visible.sync="dialogAuthStationVisible" width="40%" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogAuthStationVisible" size="small" label-position="left">
        <el-form-item>
          <div>{{authStatusName}}</div>
          <el-image class="transport-image" :src="authRow.picURL" fit="contain"></el-image>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in authRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnAuthClickEvent(btnItem)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="合同签约" :visible.sync="dialogContractStationVisible" width="30%" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogContractStationVisible" size="small" label-position="left">
        <el-form-item><div>该企业是否已完成线下合同签约?</div></el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in authRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnContractClickEvent(btnItem)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userFindOrgAdmin, $userOrgPicList, $userOrgEnterStatus, $userOrgPicAudit, $userOrgEdit } from '@/service/user'

export default {
  name: 'filler',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'user/org/page_list_unauth_filler',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      authRow: {},
      dialogAuthVisible: false,
      dialogContractStationVisible: false,
      dialogAuthStationVisible: false,
      auth_page_column: [],
      authTitle: '',
      authStatusName: ''
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'common_unauth_mode_list',
      page_status: 'filler_firmList_page_status',
      page_column: 'filler_auth_list_column',
      page_auth_column: 'common_org_auth_column',
      page_s_auth_column: 'common_org_s_auth_column',
      page_sort_filler_column: 'common_org_gasstation_auth_column',
      page_unauth_other_column: 'common_org_filler_unauth_other_column',
      select_list: 'filler_firmList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'self_detail') {
        // 三证合一和三证认证方式
        if (row && row.authType == '1') {
          this.auth_page_column = [...this.page_s_auth_column, ...this.page_sort_filler_column]
        } else {
          this.auth_page_column = [...this.page_auth_column, ...this.page_sort_filler_column]
        }
        this.inputType = 'detail'
        this.auth_page_column = [...this.auth_page_column, ...this.page_unauth_other_column]
        // 是否显示dialog
        this.dialogAuthVisible = true
        this.authRow = row

        this.authRow._btn = custFormBtnList()
        this.orgAuthList(row)
      } else if (type === 'contractStatus') {
        if (row.authStatus === 2 && row.envImpactStatus === 2 && row.fireControlStatus === 2 && row.gasFillingStatus === 2 && row.gasBusinessStatus === 2) {
          this.authRow = row
          this.authRow._btn = {
            iShow: true,
            list: [
              { bType: 'info', icon: 'el-icon-close', type: 'cancel', label: '取消' },
              { bType: 'warning', icon: 'el-icon-warning-outline', type: 'reject', label: '拒绝' },
              { bType: 'primary', icon: 'el-icon-check', type: 'ok', label: '签约' }
            ]
          }
          this.dialogContractStationVisible = true
        } else {
          if (row.authStatus !== 2) {
            this.$message.error('企业认证状态不正确，请先去认证')
            return false
          }
          if (row.gasBusinessStatus !== 2) {
            this.$message.error('企业燃气经营许可证状态不正确，请先去认证')
            return false
          }
          if (row.gasFillingStatus !== 2) {
            this.$message.error('企业气瓶充装许可证状态不正确，请先去认证')
            return false
          }
          if (row.fireControlStatus !== 2) {
            this.$message.error('企业消防验收许可证状态不正确，请先去认证')
            return false
          }
          if (row.envImpactStatus !== 2) {
            this.$message.error('企业环评报告许可证状态不正确，请先去认证')
            return false
          }
        }
      } else {
        if (row.authStatus === 2) {
          this.authStatusInfo(type, row)
        } else {
          this.$message.error('企业认证状态不正确，请先去认证')
        }
      }
    },
    authStatusInfo(type, row) {
      let picTypes = 0
      if (type === 'envImpactStatus') {
        picTypes = 15
        this.authTitle = '环评报告审核'
        this.authStatusName = '环评报告许可证'
      } else if (type === 'fireControlStatus') {
        picTypes = 14
        this.authTitle = '消防验收审核'
        this.authStatusName = '消防验收许可证'
      } else if (type === 'gasFillingStatus') {
        picTypes = 13
        this.authTitle = '气瓶充装审核'
        this.authStatusName = '气瓶充装许可证'
      } else if (type === 'gasBusinessStatus') {
        picTypes = 12
        this.authTitle = '燃气经营审核'
        this.authStatusName = '燃气经营许可证'
      }

      // 认证图片信息
      const params = {
        picTypes: [picTypes],
        orgId: row.orgId
      }
      const pathUrl = this.$store.state.file.fileHost

      this.authRow = row
      this.authRow._btn = {
        iShow: true,
        list: [
          { bType: 'info', icon: 'el-icon-close', type: 'cancel', label: '取消' },
          { bType: 'danger', icon: 'el-icon-remove-outline', type: 'back', label: '驳回' },
          { bType: 'primary', icon: 'el-icon-check', type: 'pass', label: '通过' }
        ]
      }

      $userOrgPicList(params).then(res => {
        const data = res.data
        if (data.length > 0) {
          this.authRow.picId = data[0].id
          this.authRow.picURL = pathUrl + data[0].picPath
          this.dialogAuthStationVisible = true
        } else {
          this.$message.error('企业【' + row.orgName + '】未上' + this.authStatusName + '！')
        }
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
      const params = {
        picTypes: [1, 8, 9, 12, 13, 14, 15, 16],
        orgId: row.orgId
      }
      var pathUrl = this.$store.state.file.fileHost
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
          keyList.key = 'rqjyPic'
          keyList.time = 'rqjyPicDate'
        } else if (item.picType == 13) {
          keyList.key = 'qpczPic'
          keyList.time = 'qpczPicDate'
        } else if (item.picType == 14) {
          keyList.key = 'xfysPic'
          keyList.time = 'xfysPicDate'
        } else if (item.picType == 15) {
          keyList.key = 'hbpjPic'
          keyList.time = 'hbpjPicDate'
        } else if (item.picType == 16) {
          keyList.key = 'jqzyyzzPic'
          keyList.time = 'jqzyyzzPicDate'
        }
        this.authRow[keyList.key] = pathUrl + item.picPath
        this.authRow[keyList.time] = item.updateDate || item.createDate
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { org: { orgType: 1 }, dateParam: { createDateFrom: '', createDateTo: '' } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'authDate') {
            if (_this.finds.authDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (v !== '') params.param.org[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    checkboxStatus(row, index, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback(true)
    },
    onAuthEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        const params = {}

        params.orgType = 1
        params.status = row.status
        params.orgId = row.orgId
        $userOrgEdit(params).then(res => {
          this.$message.success('成功！')

          this.dialogAuthVisible = false
          this.$refs.tables.initDataList()
        })
      } else {
        this.dialogAuthVisible = false
      }
    },
    // 许可证认证状态
    btnAuthClickEvent(btnObj, row) {
      const params = {
        id: this.authRow.picId
      }
      if (btnObj.type === 'pass') {
        params.status = 4
      } else if (btnObj.type === 'back') {
        params.status = 5
      }
      $userOrgPicAudit(params).then(response => {
        this.$message.success('成功！')
        this.$refs.tables.initDataList()
      })
      this.dialogAuthStationVisible = false
    },
    // 合同状态审核
    btnContractClickEvent(btnObj) {
      const params = {
        orgId: this.authRow.orgId
      }
      if (btnObj.type === 'ok') {
        params.status = 2
      } else if (btnObj.type === 'reject') {
        params.status = 3
      }
      $userOrgEnterStatus(params).then(response => {
        this.$message.success('成功！')
        this.$refs.tables.initDataList()
      })
      this.dialogContractStationVisible = false
    }
  }
}
</script>

<style lang="scss">
</style>
