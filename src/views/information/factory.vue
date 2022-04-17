<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'inforfactory'" style="flex: 1;" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="批量导入" :visible.sync="dialogExportVisible" width="550px" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogExportVisible" :model="exportRow" size="small" :rules="exportRules" label-position="left">
<!--        <el-form-item>
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">下载模板</span>
          </div>
          <div style="padding-left: 20px;">为提高导入的成功率，请下载并使用系统提供的模板</div>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="downloadModel">下载模板</el-button>
        </el-form-item>-->
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
              action="information/lng_liquid_factory_price/imports"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xlsx，且不超过10Mb</div>
            </el-upload>
          </div>
        </el-form-item>
<!--        <el-form-item>
          <div>建议使用 <a style="color: #409EFF" href="https://pacakge.cache.wpscdn.cn/wps/download/W.P.S.10072.12012.2019.exe">WPS Office 2019 PC</a> 版本</div>
        </el-form-item>-->
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in exportRow._btn.list" :key="index" :type="btnItem.bType"
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
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $importFactoryFile } from '@/service/information'

export default {
  name: 'inforfactory',
  data() {
    return initVueDataOptions(this, {
      headers: {},
      queryCustURL: {
        list: {
          url: 'information/lng_liquid_factory_price/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'import', name: '批量导入' }],
      exportRow: {},
      exportRules: {},
      dialogExportVisible: false
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'information_factory_column',
      mode_list: 'information_factory_mode_list',
      page_status: 'information_factory_page_status',
      select_list: 'information_factory_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
  },
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'import') {
        this.selectCarrierUser(row)
      }
    },
    selectCarrierUser(row) {
      this.exportRow._btn = this.formBtnList
      this.dialogExportVisible = true
    },
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]

        var _fromData = new FormData()

        _fromData.append('file', files)

        $importFactoryFile({ file: _fromData, headers: this.headers }).then(response => {
          this.$message.success(response.data)
          this.$refs.tables.initDataList()
          this.dialogExportVisible = false
        })
      } else {
        this.dialogExportVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') {
            params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
