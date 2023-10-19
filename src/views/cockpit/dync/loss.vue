<template>
  <div class="template-main">
    <table-total-data
      ref="tables1"
      :dataList="dataList"
      :rowData="totalInfo"
      :headerStyle="'top: 109px;'"
    ></table-total-data>
    <em-table-list
      ref="lossTables"
      :tableListName="'loss'"
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

    <el-dialog append-to-body width="800px" title="盘盈亏数据 · 导入" :visible.sync="importVisible">
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
      <div class="import-title" v-if="dataInfoStatus">
        <div>
          <span>[ 导入前 ]</span>
          <span>盈亏总量：{{ importDataInfo.lossQtyTotalBefore }} 公斤</span>
          <span>盈亏总额：{{ importDataInfo.lossValueTotalBefore }} 元</span>
        </div>
        <div>
          <span>[ 导入后 ]</span>
          <span>盈亏总量：{{ importDataInfo.lossQtyTotalAfter }} 公斤</span>
          <span>盈亏总额：{{ importDataInfo.lossValueTotalAfter }} 元</span>
        </div>
      </div>
      <em-table-list
        ref="tables"
        :source="'data'"
        :sourceData="importData"
        :custTableTitle="'-'"
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

    <el-dialog append-to-body width="800px" title="盘盈亏数据 · 更新记录" :visible.sync="updateVisible">
      <em-table-list
        v-if="updateVisible"
        ref="tables3"
        :custTableTitle="'盘盈亏数据 · 更新记录'"
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
import { initVueDataOptions, callbackPagesInfo, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'
import {
  $strategyDownloadLossFile,
  $strategyInventorySum, $strategyLossConfirmImport
} from '@/service/strategy'

export default {
  name: 'DyncLoss',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      updateTime: '',
      showImport: 0,
      authButtonList: null,
      queryCustURL: {
        list: {
          url: 'strategy/inventory_adjust/page',
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
      dataList: [
        {
          name: '盈亏总量：',
          field: 'lossQtyTotal',
          unit: ' 公斤'
        },
        {
          name: '盈亏总额：',
          field: 'lossValueTotal',
          unit: ' 元'
        }
      ],
      totalInfo: { lossQtyTotal: 0, lossValueTotal: 0 },

      importVisible: false,
      dataInfoStatus: false,
      uploadBtnStatus: true,
      importData: [],
      importDataInfo: {},
      uploadURL: process.env.VUE_APP_BASE_URL + 'strategy/inventory_adjust/import',
      buttonsImportList: [{ type: 'primary', icon: '', event: 'download', name: '模版下载' }],

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
      page_column: 'cockpit_dync_loss_column',
      page_import_column: 'cockpit_dync_loss_import_column',
      page_update_column: 'cockpit_dync_stevedor_update_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_loss_select_list',
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
        this.dataInfoStatus = false
        this.importVisible = true
      } else if (type === 'update') {
        this.updateVisible = true
      }
    },
    lossTotal(params) {
      $strategyInventorySum(params).then(res => {
        this.totalInfo = res.data || {}
      })
    },
    onListImportEvent(type, row) {
      // 模版下载
      if (type === 'download') {
        $strategyDownloadLossFile({}).then(res => {
          const fileName = '盘盈亏_' + Date.parse(new Date()) + '.xlsx'
          exportBlobToFiles(res, fileName)
        })
      }
    },
    uploadError(err, file, fileList) {
      console.log(err, file, fileList)
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
        const { list, ...dataInfo } = res.data
        this.$message.success('文件上传成功')
        this.importData = list || []
        this.importDataInfo = dataInfo || {}
        this.dataInfoStatus = true
      }
    },
    btnClickEvent(btn) {
      if (btn.type === 'ok') {
        $strategyLossConfirmImport({}).then(res => {
          this.$message.success('成功')
          this.$refs.lossTables.initDataList()
          this.importVisible = false
        })
      } else {
        this.importVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: {} } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v && k === 'gatherTime') {
            params.param.dateParam.createDateFrom = v[0]
            params.param.dateParam.createDateTo = v[1]
          } else if (v && k === 'updateDate') {
            params.param.dateParam.updateDateFrom = v[0]
            params.param.dateParam.updateDateTo = v[1]
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      // 求和
      this.lossTotal(params.param)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqUpdateParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v && k === 'gatherTime') {
            params.param.dateParam.createDateFrom = v[0]
            params.param.dateParam.createDateTo = v[1]
          } else if (v && k === 'updateDate') {
            params.param.dateParam.updateDateFrom = v[0]
            params.param.dateParam.updateDateTo = v[1]
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      params.param.uploadType = 2

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.import-title {
  font-size: 12px;
  position: absolute;
  top: 80px;
  left: 35px;
  span {
    display: inline-block;
    margin-right: 8px;
  }
}
</style>
