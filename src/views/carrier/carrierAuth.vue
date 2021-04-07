<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrierAuth'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="物流公司" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form ref="addGap" v-if="dialogAddGasStationVisible" :rowData="authRow" :inputType="inputType" :modeList="mode_list" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
    </el-dialog>
    <el-dialog title="道路运输信息核对" :visible.sync="dialogTransportStationVisible" width="40%" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogTransportStationVisible" size="small" label-position="left">
        <el-form-item>
          <div>道路运输许可证</div>
          <el-image class="transport-image" :src="authRow.picTransportURL" fit="contain"></el-image>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in authRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnTransportClickEvent(btnItem)">{{btnItem.label}}
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
import { initVueDataOptions, callbackPagesInfo, custFormBtnList, isTypeof } from '@/utils/tools'
import { $userOrgPicAudit, $userOrgPicList, $userOrgEnterStatus, $userFindOrgAdmin } from '@/service/user'
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
      buttonsList: [],
      dialogAddGasStationVisible: false,
      dialogContractStationVisible: false,
      dialogTransportStationVisible: false,
      authRow: {},
      auth_page_column: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'common_unauth_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_unauth_column',
      select_list: 'carrier_logistics_select_list',
      page_auth_column: 'common_org_auth_column',
      page_s_auth_column: 'common_org_s_auth_column',
      page_unauth_other_column: 'common_org_unauth_other_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    async onListEvent(type, row) {
      this.currType = type
      if (type === 'self_detail') {
        this.detailInfo(row)
      } else if (type === 'roadTransportStatus') {
        if (row.authStatus === 2) {
          this.authTransportInfo(row)
        } else {
          this.$message.error('企业认证状态不正确，请先去认证')
        }
      } else if (type === 'contractStatus') {
        if (row.authStatus === 2 && row.roadTransportStatus === 2) {
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
          if (row.roadTransportStatus !== 2) {
            this.$message.error('企业铁道运输许可证状态不正确，请先去认证')
            return false
          }
        }
      }
    },
    detailInfo(row) {
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
      this.auth_page_column = [...this.auth_page_column, ...this.page_unauth_other_column]
      this.authRow = row
      this.authRow._btn = custFormBtnList(1)
      this.orgAuthList(row)
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
        picTypes: [1, 8, 9, 11],
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
        } else if (item.picType == 11) {
          keyList.key = 'dlysPic'
          keyList.time = 'dlysPicDate'
        }
        this.authRow[keyList.key] = pathUrl + item.picPath
        this.authRow[keyList.time] = item.updateDate
      })
    },
    onFormEvent() {
      this.dialogAddGasStationVisible = false
    },
    authTransportInfo(row) {
      // 认证图片信息
      const params = {
        picTypes: [11],
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
          this.authRow.picTransportId = data[0].id
          this.authRow.picTransportURL = pathUrl + data[0].picPath
          this.dialogTransportStationVisible = true
        } else {
          this.$message.error('企业【' + row.orgName + '】未上传道路运输许可证！')
        }
      })
    },
    btnTransportClickEvent(btnObj) {
      const params = {
        id: this.authRow.picTransportId
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
      this.dialogTransportStationVisible = false
    },
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
