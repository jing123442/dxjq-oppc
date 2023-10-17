<template>
  <div class="template-main">
    <table-total-data
      ref="tables1"
      :dataList="dataList"
      :rowData="totalInfo"
      :headerStyle="'top: 109px;'"
    ></table-total-data>
    <em-table-list
      ref="stevedoreTables"
      :tableListName="'stevedore'"
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
      @afterTableData="afterTableData"
      @onListEvent="onListEvent"
      @onReqParams="onReqParams"
    ></em-table-list>

    <el-dialog append-to-body width="900px" title="装卸数据 · 导入" :visible.sync="importVisible">
      <el-upload
        v-if="importVisible && uploadBtnStatus"
        class="upload-demo"
        :action="uploadURL"
        :headers="axios.headers"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :show-file-list="false"
        style="position: absolute;top: 106px; right: 125px;z-index: 10000;">
        <el-button size="small" type="primary" style="height: 28px;padding: 7px 15px;">数据上传</el-button>
      </el-upload>
      <div>导入覆盖范围: {{ updateFindStr }}</div>
      <div class="import-title" v-if="dataInfoStatus">
        <div>
          <span>[ 导入前 ]</span>
          <span>装车总量：{{ importDataInfo.beforeLoadQty === null ? '-' : importDataInfo.beforeLoadQty }} 吨</span>
          <span>采购总成本：{{ importDataInfo.beforeBuyCost === null ? '-' : importDataInfo.beforeBuyCost }} 元</span>
          <span>到站总量：{{ importDataInfo.beforeInQty === null ? '-' : importDataInfo.beforeInQty }} 吨</span>
          <span>到站总成本：{{ importDataInfo.beforeInCost === null ? '-' : importDataInfo.beforeInCost }} 元</span>
        </div>
        <div>
          <span>[ 导入后 ]</span>
          <span>装车总量：{{ importDataInfo.afterLoadQty === null ? '-' : importDataInfo.afterLoadQty }} 吨</span>
          <span>采购总成本：{{ importDataInfo.afterBuyCost === null ? '-' : importDataInfo.afterBuyCost }} 元</span>
          <span>到站总量：{{ importDataInfo.afterInQty === null ? '-' : importDataInfo.afterInQty }} 吨</span>
          <span>到站总成本：{{ importDataInfo.afterInCost === null ? '-' : importDataInfo.afterInCost }} 元</span>
        </div>
      </div>
      <em-table-list
        v-if="importVisible"
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

    <el-dialog append-to-body width="800px" title="装卸数据 · 更新记录" :visible.sync="updateVisible">
      <em-table-list
        v-if="updateVisible"
        ref="tables3"
        :custTableTitle="'装卸数据 · 更新记录'"
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
        :select_list="select_list"
        @onReqParams="onReqUpdateParams"
      ></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { callbackPagesInfo, exportBlobToFiles, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'
import {
  $strategyDownloadStevedoreFile,
  $strategyStevedoreConfirmImport
} from '@/service/strategy'

export default {
  name: 'DyncStevedore',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      updateTime: '',
      showImport: 0,
      authButtonList: null,
      queryCustURL: {
        list: {
          url: 'strategy/inventory_truck_in/get_truck_in',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        }
      },
      buttonsList: [
        { type: 'primary', icon: '', event: 'import', name: '数据导入' },
        { type: 'primary', icon: '', event: 'update', name: '数据更新记录' }
      ],
      dataList: [
        {
          name: '装车总量：',
          field: 'loadQty',
          unit: ' 吨'
        },
        {
          name: '采购总成本：',
          field: 'buyCost',
          unit: ' 元'
        },
        {
          name: '到站总量：',
          field: 'inQty',
          unit: ' 吨'
        },
        {
          name: '到站总成本：',
          field: 'inCost',
          unit: ' 元'
        }
      ],
      totalInfo: { loadQty: 0, buyCost: 0, inQty: 0, inCost: 0 },

      importVisible: false,
      dataInfoStatus: false,
      uploadBtnStatus: true,
      importData: [],
      importDataInfo: {},
      uploadURL: process.env.VUE_APP_BASE_URL + 'strategy/inventory_truck_in/upload_truck_in',
      buttonsImportList: [{ type: 'primary', icon: '', event: 'download', name: '模版下载' }],

      updateVisible: false,
      updateFindStr: '',
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
      page_column: 'cockpit_dync_stevedor_column',
      page_import_column: 'cockpit_dync_stevedor_import_column',
      page_update_column: 'cockpit_dync_stevedor_update_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_stevedor_select_list',
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
    afterTableData(res) {
      const { page, ...dataInfo } = res.data
      this.totalInfo = dataInfo || {}
    },
    onListImportEvent(type, row) {
      // 模版下载
      if (type === 'download') {
        $strategyDownloadStevedoreFile({}).then(res => {
          const fileName = '装卸数据_' + Date.parse(new Date()) + '.xlsx'
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
        const { data, ...dataInfo } = res.data
        const tmpData = []

        this.updateFindStr = `装车时间 ${dataInfo.startTime} - ${dataInfo.endTime}`

        data && data.forEach(item => {
          if (item.before) {
            item.before.comparisonName = '[ 导入前 ]'
            tmpData.push(item.before)
          }
          if (item.after) {
            item.after.comparisonName = '[ 导入后 ]'
            tmpData.push(item.after)
          }
        })

        this.importData = tmpData
        this.importDataInfo = dataInfo || {}
        this.dataInfoStatus = true
      }
    },
    btnClickEvent(btn) {
      let confirm = 1
      if (btn.type === 'ok') {
      } else {
        confirm = 0
      }

      $strategyStevedoreConfirmImport({ confirm }).then(res => {
        confirm && this.$message.success('成功')
        this.$refs.stevedoreTables.initDataList()
        this.importVisible = false
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v && k === 'loadTime') {
            params.param.timeType = 0

            params.param.startTime = v[0]
            params.param.endTime = v[1]

            // this.updateFindStr = `装车时间 ${Array.isArray(v) ? v.join(' - ') : v}`
          } else if (v && k === 'unloadTime') {
            params.param.timeType = 1

            params.param.startTime = v[0]
            params.param.endTime = v[1]
            // this.updateFindStr = `卸车时间 ${Array.isArray(v) ? v.join(' - ') : v}`
          } else if (v && k === 'updateDate') {
            params.param.timeType = 2

            params.param.startTime = v[0]
            params.param.endTime = v[1]
            // this.updateFindStr = `数据更新时间 ${Array.isArray(v) ? v.join(' - ') : v}`
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqUpdateParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v && k === 'loadTime') {
            params.param.timeType = 0

            params.param.startTime = v[0]
            params.param.endTime = v[1]

            // this.updateFindStr = `装车时间 ${Array.isArray(v) ? v.join(' - ') : v}`
          } else if (v && k === 'unloadTime') {
            params.param.timeType = 1

            params.param.startTime = v[0]
            params.param.endTime = v[1]
            // this.updateFindStr = `卸车时间 ${Array.isArray(v) ? v.join(' - ') : v}`
          } else if (v && k === 'updateDate') {
            params.param.timeType = 2

            params.param.startTime = v[0]
            params.param.endTime = v[1]
            // this.updateFindStr = `数据更新时间 ${Array.isArray(v) ? v.join(' - ') : v}`
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      params.param.uploadType = 0

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
  top: 100px;
  left: 35px;
  span {
    display: inline-block;
    margin-right: 8px;
  }
}
</style>
