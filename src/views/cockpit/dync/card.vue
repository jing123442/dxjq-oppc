<template>
  <div class="template-main">
    <em-table-list
      ref="cardRefuel"
      :tableListName="'cardRefuel'"
      :authButtonList="authButtonList"
      :buttonsList="buttonsList"
      :axios="axios"
      :queryCustURL="queryCustURL"
      :responseSuccess="response_success"
      :queryParam="queryParams"
      :mode_list="mode_list"
      :page_status="page_status"
      :page_column="page_column"
      :options="{ lazy: true }"
      :select_list="select_list"
      @onListEvent="onListEvent"
      @onReqParams="onReqParams"
    ></em-table-list>

    <el-dialog append-to-body width="800px" title="加注机线下卡管理 · 导入" :visible.sync="importVisible">
      <el-upload
        v-if="importVisible && uploadBtnStatus"
        class="upload-demo"
        :action="uploadURL"
        :headers="axios.headers"
        :limit="1"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :show-file-list="false"
        style="position: absolute;top: 86px; right: 125px;z-index: 10000;">
        <el-button size="small" type="primary" style="height: 28px;padding: 7px 15px;">数据上传</el-button>
      </el-upload>
      <em-table-list
        ref="tables"
        :source="'data'"
        :sourceData="importData"
        :tableListName="'cardImportRefuel'"
        :authButtonList="null"
        :buttonsList="buttonsImportList"
        :axios="axios"
        :responseSuccess="response_success"
        :queryParam="{}"
        :mode_list="mode_list"
        :page_status="5"
        :page_column="page_import_column"
        :options="{ lazy: true }"
        :select_list="select_list"
        @onListEvent="onListImportEvent"
        @onReqParams="onReqParams"
      ></em-table-list>

      <el-form ref="messageRow" v-if="importVisible" size="small" label-position="left">
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog append-to-body width="800px" title="加注机线下卡管理 · 更新记录" :visible.sync="updateVisible">
      <em-table-list
        v-if="updateVisible"
        ref="tables3"
        :custTableTitle="'加注机线下卡管理 · 更新记录'"
        :tableListName="'updateStevedore'"
        :buttonsList="[]"
        :axios="axios"
        :queryCustURL="queryCustUpdateURL"
        :responseSuccess="response_success"
        :queryParam="queryParams"
        :mode_list="mode_list"
        :page_status="page_status"
        :page_column="page_update_column"
        :options="{ lazy: true }"
        :select_list="select_update_list"
        @onReqParams="onReqUpdateParams"
      ></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { callbackPagesInfo, exportBlobToFiles, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $strategyCardConfirmImport, $strategyDownloadCardFile } from '@/service/strategy'

export default {
  name: 'DyncCard',
  data() {
    return initVueDataOptions(this, {
      authButtonList: null,
      queryCustURL: {
        list: {
          url: 'strategy/inventory_card/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      },
      buttonsList: [
        { type: 'primary', icon: '', event: 'import', name: '数据导入' },
        { type: 'primary', icon: '', event: 'update', name: '数据更新记录' }
      ],

      importVisible: false,
      importData: [],
      uploadURL: process.env.VUE_APP_BASE_URL + 'strategy/inventory_card/import',
      buttonsImportList: [{ type: 'primary', icon: '', event: 'download', name: '模版下载' }],

      uploadBtnStatus: true,
      updateVisible: false,
      queryCustUpdateURL: {
        list: {
          url: 'strategy/inventory_upload_log/get_upload_log',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_dync_card_column',
      page_import_column: 'cockpit_dync_card_import_column',
      page_update_column: 'cockpit_dync_stevedor_update_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_card_select_list',
      select_update_list: 'cockpit_dync_stevedor_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {},
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'import') {
        this.importData = []
        this.importVisible = true
      } else if (type === 'update') {
        this.updateVisible = true
      }
    },
    onListImportEvent(type, row) {
      // 模版下载
      if (type === 'download') {
        $strategyDownloadCardFile({}).then(res => {
          const fileName = '加注机卡_' + Date.parse(new Date()) + '.xlsx'
          exportBlobToFiles(res, fileName)
        })
      }
    },
    uploadError() {
      this.uploadBtnStatus = false
      this.$nextTick(() => {
        this.uploadBtnStatus = true
      })
      this.$message.error('文件上传失败')
    },
    uploadSuccess(res) {
      this.uploadBtnStatus = false
      this.$nextTick(() => {
        this.uploadBtnStatus = true
      })
      if (res.code !== 0) {
        this.$message.error(res.message)
      } else {
        this.$message.success('文件上传成功')
        this.importData = res.data || []
      }
    },
    btnClickEvent(btn) {
      if (btn.type === 'ok') {
        $strategyCardConfirmImport({}).then(res => {
          this.$message.success('成功')
          this.$refs.cardRefuel.initDataList()
          this.importVisible = false
        })
      } else {
        this.importVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqUpdateParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      params.param.uploadType = 3

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
