<template>
  <div class="template-main">
    <em-table-list :tableListName="'usercashier'" ref="tables" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"></em-table-list>

    <el-dialog title="详情" :visible.sync="dialogDetailCarrierVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogDetailCarrierVisible" ref="carrierUser" :formRef="'carrierUserForm'" :rowData="detailRow" :modeList="mode_curr_detail_list" :pageColumn="page_curr_detail_column" :selectList="select_list" :axios="axios" :inputType="'detail'" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="btnDetailClickEvent"></nt-form>
    </el-dialog>
    <el-dialog title="请选择需要批量导入用户的企业" :visible.sync="dialogExportCarrierVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogExportCarrierVisible" ref="carrierUser" :formRef="'carrierUserForm'" :rowData="businessRow" :pageColumn="page_business_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="btnUserClickEvent"></nt-form>
    </el-dialog>
    <el-dialog title="批量导入加气站用户" :visible.sync="dialogExportCarVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogExportCarVisible" :model="exportCarrierUserRow" size="small" :rules="exportCarrierUserRules" label-position="left">
        <el-form-item>
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">下载模板</span>
          </div>
          <div style="padding-left: 20px;">为提高导入的成功率，请下载并使用系统提供的模板</div>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="downloadModel">下载模板</el-button>
        </el-form-item>
        <el-form-item>
          <div>
            <i class="el-icon-upload"></i>
            <span style="display: inline-block;padding-left: 2px;">上传文件</span>
          </div>
          <div style="padding-left: 20px;">
            <el-upload
              class="upload-demo"
              ref="upload"
              name="file"
              :limit="1"
              :headers="headers"
              accept=".xls,.xlsx"
              action="/user/import/import_user"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xlsx，且不超过10Mb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <div>建议使用 <a style="color: #409EFF" href="https://pacakge.cache.wpscdn.cn/wps/download/W.P.S.10072.12012.2019.exe">WPS Office 2019 PC</a> 版本</div>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in exportCarrierUserRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, exportBlobToFiles, toolsFileHeaders } from '@/utils/tools'
import { $resetPassword, $importCarrierDownloadFile, $exportCarrierUserFile, $userOrgList, $userFindBaseDetail } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'usercashier',
  data() {
    return initVueDataOptions(this, {
      headers: {},
      queryCustURL: {
        add: {
          url: '/user/user/add',
          method: 'post'
        },
        edit: {
          url: '/user/user/edit',
          method: 'post'
        },
        list: {
          url: '/user/user/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站用户管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'import', name: '批量导入' }],
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { userType: 1 } }),
      dialogExportCarVisible: false,
      exportCarrierUserRow: {},
      exportCarrierUserRules: {},
      dialogExportCarrierVisible: false,
      businessRow: {},
      detailRow: {},
      dialogDetailCarrierVisible: false,
      page_curr_detail_column: [],
      mode_curr_detail_list: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'user_cashier_mode_list',
      page_status: 'user_cashier_page_status',
      page_column: 'user_cashier_column',
      mode_detail_list: 'common_user_carrier_mode_list',
      page_detail_column: 'common_user_carrier_column',
      page_business_column: 'user_business_column',
      select_list: 'user_cashier_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
    this.headers = toolsFileHeaders(this)
  },
  methods: {
    async onListEvent(type, row) {
      if (type === 'reset_pwd') {
        $resetPassword({ userId: row.userId }).then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
        })
      } else if (type === 'import') {
        this.selectCarrierUser(row)
      } else if (type === 'self_detail') {
        this.detailRow = row
        this.detailRow._btn = this.formBtnList
        this.mode_curr_detail_list = [...this.mode_detail_list]
        this.page_curr_detail_column = this.page_detail_column
        this.mode_curr_detail_list.pop()
        const userInfo = await $userFindBaseDetail({ userId: row.userId }).then(response => {
          return response.data
        })
        // 用户基本信息
        this.detailRow = Object.assign({}, this.detailRow, userInfo.user)
        // 用户认证信息
        if (userInfo.userInfo) {
          this.detailRow = Object.assign({}, this.detailRow, userInfo.userInfo)
        }
        this.dialogDetailCarrierVisible = true
      }
    },
    selectCarrierUser(row) {
      this.businessRow._btn = this.formBtnList
      this.dialogExportCarrierVisible = true
    },
    exportCarrierUser(row) {
      this.exportCarrierUserRow._btn = this.formBtnList
      this.exportCarrierUserRow.orgId = row.orgId
      this.dialogExportCarVisible = true
    },
    downloadModel() {
      $importCarrierDownloadFile({ orgId: this.exportCarrierUserRow.orgId, times: (new Date()).getTime() }).then(response => {
        const fileName = 'user_tpl-' + this.exportCarrierUserRow.orgId + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    btnDetailClickEvent(btnObj, row) {
      this.dialogDetailCarrierVisible = false
    },
    btnUserClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.carrierUser.$refs.carrierUserForm.validate((valid) => {
          if (valid) {
            $userOrgList({ page: 1, size: 10, param: { orgName: row.orgName } }).then(response => {
              const data = response.data.records

              if (data[0].authStatus == 2) {
                this.exportCarrierUser(row)
              } else {
                this.$message.error('该企业未认证，无权批量导入用户！')
              }
            })
            this.dialogExportCarrierVisible = false
          } else {
            console.log('error submit!!')
          }
        })
      } else {
        this.dialogExportCarrierVisible = false
      }
    },
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]

        var _fromData = new FormData()

        _fromData.append('file', files)
        _fromData.append('orgId', this.exportCarrierUserRow.orgId)

        $exportCarrierUserFile({ file: _fromData, headers: this.headers }).then(response => {
          this.$message.success(response.data)
          this.$refs.tables.initDataList()
          this.dialogExportCarVisible = false
        })
      } else {
        this.dialogExportCarVisible = false
      }
    }
  }
}
</script>
