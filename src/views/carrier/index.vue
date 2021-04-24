<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrier'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="物流公司" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog" :append-to-body="true">
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
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, createParams, exportBlobToFiles, isTypeof, toolsFileHeaders, formatDate } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orgAuth } from '@/service/pay'
import { $userOrgAdd, $userOrgEdit, $userFindOrgAdmin, $userOrgPicList, $userCarrierTranPicUpload, $userExportCarrierInfo } from '@/service/user'
import { $strategyTruckAdd, $importDownloadFile, $exportDataFile } from '@/service/strategy'

export default {
  name: 'carrier',
  data() {
    return initVueDataOptions(this, {
      active: '2',
      isAuthInfo: false,
      tabDisabled: false,
      authColor: 'off',
      queryCustURL: {
        list: {
          url: 'user/org/page_list_carrier',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司'
      },
      headers: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'add_info', name: '添加公司' }, { type: 'primary', icon: '', event: 'export', name: '导出' }],
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_mode: [],
      auth_page_column: [],
      dialogAddCarVisible: false,
      addCarRow: {},
      dialogExportCarVisible: false,
      exportCarRow: {},
      exportRules: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_logistics_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_logistics_column',
      page_column_addCar: 'carrier_addCar_column',
      select_list: 'carrier_logistics_select_list',
      page_auth_column: 'common_org_auth_column',
      page_self_column: 'common_self_auth_column',
      page_s_auth_column: 'common_org_s_auth_column',
      page_carrier_column: 'common_org_carrier_auth_column',
      page_auth_other_column: 'common_org_auth_other_column',
      mode_add_org_manage: 'carrier_org_manage_mode_list',
      mode_detail_self_manage: 'carrier_self_detail_mode_list',
      mode_detail_org_manage: 'carrier_org_detail_mode_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.headers = toolsFileHeaders(this)
  },
  methods: {
    async onListEvent(type, row) {
      row._btn = {}
      if (type === 'import') {
        // 批量导入车辆
        this.exportCarEvent(row)
      } else if (type === 'add_truck') {
        // 添加车辆
        this.addCarEvent(row)
      } else if (type === 'export') {
        // 导出
        this.exportCarrierInfo(row)
      } else {
        this.currType = type
        // 重置page_column值
        this.resetAuthPageCol(row)

        // 重置tab标签值
        this.active = row && row.authType ? '' + row.authType : '2'
        // 显示认证状态
        this.authColor = row && row.authStatus == 2 ? 'no' : 'off'
        // 是否显示dialog
        this.dialogAddGasStationVisible = true
        this.authRow = row
        if (type === 'add_info' || type === 'self_edit') {
          this.auth_page_mode = this.mode_add_org_manage
          this.authRow._btn = custFormBtnList()
        } else if (type === 'cert') {
          this.authRow._btn = {
            iShow: true,
            list: [
              { bType: 'info', icon: '', type: 'cancel', label: '取消' },
              { bType: 'primary', icon: '', type: 'ok', label: '去认证' }
            ]
          }
        } else {
          if (row.orgSubType == 22) {
            this.auth_page_mode = this.mode_detail_self_manage
          } else {
            this.auth_page_mode = this.mode_detail_org_manage
          }
          this.authRow._btn = custFormBtnList()
          this.orgAuthList(row)
        }
      }
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
      let picTypeStatus = false
      const params = {
        picTypes: [1, 8, 9, 11],
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
        } else if (item.picType == 11) {
          picTypeStatus = true
          keyList.key = 'dlysPic'
          keyList.time = 'dlysPicDate'
        }

        this.authRow[keyList.key] = item.picPath
        this.authRow[keyList.time] = item.updateDate || item.createDate
      })
      // 如果未传道路许可证，用户可以上传图片
      this.auth_page_column.forEach(item => {
        if (item.field === 'dlysPic') {
          if (picTypeStatus) {
            item.detail = item.detail_d
          } else {
            this.authRow.dlysPic = []
            item.detail = item.detail_u
          }
        }
      })
    },
    exportCarEvent(row) {
      this.exportCarRow._btn = custFormBtnList()
      this.exportCarRow.orgId = row.orgId
      this.exportCarRow.orgName = row.orgName
      this.dialogExportCarVisible = true
    },
    exportCarrierInfo(row) {
      $userExportCarrierInfo(this.currParams).then(response => {
        const fileName = '物流公司列表' + '_' + (new Date().getTime()) + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    addCarEvent(row) {
      this.addCarRow._btn = custFormBtnList()
      this.addCarRow.orgId = row.orgId
      this.addCarRow.orgName = row.orgName
      this.dialogAddCarVisible = true
    },
    onReqParams(type, _this, callback) {
      const query = { param: { dateFrom: '', dateTo: '', org: {} } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'authDate') {
            if (_this.finds.authDate === null) {
              query.param.dateFrom = ''
              query.param.dateTo = ''
            } else {
              query.param.dateFrom = v[0]
              query.param.dateTo = v[1]
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
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]

        var _fromData = new FormData()

        _fromData.append('file', files)
        _fromData.append('orgId', this.exportCarRow.orgId)

        $exportDataFile({ file: _fromData, headers: this.headers }).then(response => {
          this.$message.success(response.data)
          this.$refs.tables.initDataList()
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
              purchaseDate: formatDate(this.addCarRow.purchaseDate, 'yyyy-MM-dd'),
              engineNumber: ''
            }
            delete params._btn
            $strategyTruckAdd(params).then(res => {
              this.$message.success(res.message)
              this.$refs.tables.initDataList()
            })

            this.dialogAddCarVisible = false
          }
        })
      } else {
        this.dialogAddCarVisible = false
      }
    },
    handleClick() {
      this.resetAuthPageCol()
    },
    resetAuthPageCol(row = {}) {
      if (row.orgSubType && row.orgSubType == 22) {
        this.auth_page_column = [...this.page_self_column, ...this.page_carrier_column]
      } else {
        if (this.active == '2') {
          this.auth_page_column = [...this.page_auth_column, ...this.page_carrier_column]
        } else {
          this.auth_page_column = [...this.page_s_auth_column, ...this.page_carrier_column]
        }
      }

      if (this.currType == 'cert' || this.currType == 'self_detail') {
        this.tabDisabled = true
        this.isAuthInfo = true
        this.inputType = 'detail'
        if (this.currType == 'self_detail') {
          this.auth_page_column = [...this.auth_page_column, ...this.page_auth_other_column]
        }
      } else {
        this.tabDisabled = false
        this.isAuthInfo = false
        this.inputType = 'show'
      }
    },
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'self_edit') {
          this.onListEventAddGasStation(row)
        } else if (this.currType === 'self_detail') {
          this.orgTranUploadPic(row)
          this.dialogAddGasStationVisible = false
        } else {
          this.orgAuthEvent(row)
          this.dialogAddGasStationVisible = false
        }
      } else {
        this.dialogAddGasStationVisible = false
      }
    },
    orgTranUploadPic(row) {
      if (row.dlysPic && row.dlysPic[0].url) {
        const params = {
          orgId: row.orgId,
          picPath: row.dlysPic ? row.dlysPic[0].url : '',
          picType: 11
        }
        $userCarrierTranPicUpload(params).then(res => {
          this.$message.success('成功！')

          this.$refs.tables.initDataList()
        })
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
