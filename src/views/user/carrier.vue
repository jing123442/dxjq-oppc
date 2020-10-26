<template>
  <div class="template-main">
    <em-table-list :tableListName="'usercarrier'" ref="tables" :axios="axios" :queryCustURL="queryCustURL" :buttonsList="buttonsList" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"></em-table-list>

    <el-dialog title="请选择需要批量导入用户的企业" :visible.sync="dialogExportCarrierVisible" width="50%">
      <nt-form v-if="dialogExportCarrierVisible" ref="carrierUser" :formRef="'carrierUserForm'" :rowData="businessRow" :pageColumn="page_business_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="btnUserClickEvent"></nt-form>
    </el-dialog>
    <el-dialog title="批量导入物流用户" :visible.sync="dialogExportCarVisible" :width="add_edit_dialog">
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
import { axiosRequestParams, queryDefaultParams, exportBlobToFiles, custFormBtnList, toolsFileHeaders } from '@/utils/tools'
import { $resetPassword, $importCarrierDownloadFile, $exportCarrierUserFile, $userOrgList } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'usercarrier',
  data() {
    return {
      isShow: false,
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
        name: '物流用户管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'export', name: '批量导入' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { userType: 2 } }),
      dialogExportCarVisible: false,
      exportCarrierUserRow: {},
      exportCarrierUserRules: {},
      dialogExportCarrierVisible: false,
      businessRow: {},
      btnList: custFormBtnList()
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'user_carrier_mode_list',
      page_status: 'user_carrier_page_status',
      page_column: 'user_carrier_column',
      page_business_column: 'user_business_column',
      select_list: 'user_carrier_select_list',
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
    onListEvent(type, row) {
      if (type == 'resetpwd') {
        $resetPassword({ userId: row.userId }).then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
        })
      } else if (type == 'export') {
        this.selectCarrierUser(row)
      }
    },
    selectCarrierUser(row) {
      this.businessRow._btn = this.btnList
      this.dialogExportCarrierVisible = true
    },
    exportCarrierUser(row) {
      this.exportCarrierUserRow._btn = this.btnList
      this.exportCarrierUserRow.orgId = row.orgId
      this.dialogExportCarVisible = true
    },
    downloadModel() {
      $importCarrierDownloadFile({ orgId: this.exportCarrierUserRow.orgId, times: (new Date()).getTime() }).then(response => {
        const fileName = 'user_tpl-' + this.exportCarrierUserRow.orgId + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
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
