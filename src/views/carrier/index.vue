<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrier'" ref="carrier" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="物流公司" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog" :append-to-body="true">
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
    <el-dialog title="添加车辆" :visible.sync="dialogAddCarVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAddCarVisible" ref="addCar" :rowData="addCarRow" :pageColumn="page_column_addCar" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddCar"></nt-form>
    </el-dialog>
    <el-dialog title="批量导入车辆" :visible.sync="dialogExportCarVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogExportCarVisible" :model="exportCarRow" size="small" :rules="exportRules" label-position="left">
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
            <el-button v-for="(btnItem, index) in exportCarRow._btn.list" :key="index" :type="btnItem.bType"
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
import { axiosRequestParams, queryDefaultParams, custFormBtnList, callbackPagesInfo, createParams, exportBlobToFiles, isTypeof, toolsFileHeaders } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orgAuth } from '@/service/pay'
import { $userOrgAdd, $userOrgEdit } from '@/service/user'
import { $carrierTruckAdd, $importDownloadFile, $exportDataFile } from '@/service/carrier'

export default {
  name: 'carrier',
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
        name: '物流公司'
      },
      headers: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'add_info', name: '添加公司' }],
      axios: axiosRequestParams(this),
      queryParams: Function,
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_column: [],
      dialogAddCarVisible: false,
      addCarRow: {},
      dialogExportCarVisible: false,
      exportCarRow: {},
      exportRules: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_logistics_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_logistics_column',
      page_column_addCar: 'carrier_addCar_column',
      select_list: 'carrier_logistics_select_list',
      page_auth_column: 'filler_auth_column',
      page_s_auth_column: 'filler_s_auth_column',
      mode_list_gasstation: 'filler_gasstation_mode_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.headers = toolsFileHeaders(this)
  },
  methods: {
    onListEvent(type, row) {
      row._btn = {}
      if (type === 'exportCar') {
        // 批量导入车辆
        this.exportCarEvent(row)
      } else if (type === 'addCar') {
        // 添加车辆
        this.addCarEvent(row)
      } else {
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
        if (type === 'add_info' || type === 'gedit') {
          this.authRow._btn = custFormBtnList()
        } else if (type === 'auth') {
          this.authRow._btn = {
            iShow: true,
            list: [
              { bType: 'info', icon: '', type: 'cancel', label: '取消' },
              { bType: 'primary', icon: '', type: 'ok', label: '去认证' }
            ]
          }
        } else {
          this.authRow._btn = {}
        }
      }
    },
    exportCarEvent(row) {
      this.exportCarRow._btn = custFormBtnList()
      this.exportCarRow.orgId = row.orgId
      this.exportCarRow.orgName = row.orgName
      this.dialogExportCarVisible = true
    },
    addCarEvent(row) {
      this.addCarRow._btn = custFormBtnList()
      this.addCarRow.orgId = row.orgId
      this.addCarRow.orgName = row.orgName
      this.dialogAddCarVisible = true
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { org: { orgType: 2 }, dateParam: { createDateFrom: '', createDateTo: '' } } })

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
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]

        var _fromData = new FormData()

        _fromData.append('file', files)
        _fromData.append('orgId', this.exportCarRow.orgId)

        $exportDataFile({ file: _fromData, headers: this.headers }).then(response => {
          this.$message.success(response.data)
          this.$refs.carrier.initDataList()
          this.dialogExportCarVisible = false
        })
      } else {
        this.dialogExportCarVisible = false
      }
    },
    downloadModel() {
      $importDownloadFile({ orgId: this.exportCarRow.orgId, times: (new Date()).getTime() }).then(response => {
        const fileName = 'truck_tpl-' + this.exportCarRow.orgId + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    onListEventAddCar(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.addCar.$children[0].validate(valid => {
          if (valid) {
            const params = {
              ...createParams(),
              ...this.addCarRow,
              purchaseDate: this.addCarRow.purchaseDate.split(' ')[0],
              engineNumber: ''
            }
            delete params._btn
            $carrierTruckAdd(params).then(res => {
              this.$message.success(res.message)
              this.$refs.carrier.initDataList()
            })
          }
        })
      }
      this.dialogAddCarVisible = false
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
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'gedit') {
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
          params.orgType = 2
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
