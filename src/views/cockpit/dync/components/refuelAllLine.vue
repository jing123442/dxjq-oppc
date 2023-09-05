<template>
  <div class="template-main">
    <table-total-data
        ref="tables1"
        :dataList="dataList"
        :rowData="totalInfo"
        :headerStyle="'top: 109px;'"
    ></table-total-data>
    <em-table-list
        ref="refuelAllLine"
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

    <el-dialog append-to-body width="800px" title="加注机全量 · 导入" :visible.sync="importVisible">
      <el-upload
          v-if="importVisible"
          class="upload-demo"
          :action="uploadURL"
          :data="{ gasstationId: stationId }"
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
          <span>加注总量：{{ importDataInfo.beforeOutQty === null ? '-' : importDataInfo.beforeOutQty }} 公斤</span>
          <span>加注总额：{{ importDataInfo.beforeOutValue === null ? '-' : importDataInfo.beforeOutValue }} 元</span>
        </div>
        <div>
          <span>[ 导入后 ]</span>
          <span>加注总量：{{ importDataInfo.afterOutQty === null ? '-' : importDataInfo.afterOutQty }} 公斤</span>
          <span>加注总额：{{ importDataInfo.afterOutValue === null ? '-' : importDataInfo.afterOutValue }} 元</span>
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

    <el-dialog append-to-body width="800px" title="加注机全量 · 更新记录" :visible.sync="updateVisible">
      <em-table-list
        v-if="updateVisible"
        ref="tables3"
        :custTableTitle="'加注机全量 · 更新记录'"
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
import { TableTotalData } from '@/components'
import { $strategyDownloadOutFile, $strategyOutConfirmImport } from '@/service/strategy'

export default {
  name: 'RefuelAllLine',
  components: { TableTotalData },
  props: {
    stationId: {
      type: String,
      required: true
    },
    nickName: String,
    time: String
  },
  data() {
    return initVueDataOptions(this, {
      updateTime: '',
      showImport: 0,
      authButtonList: null,
      queryCustURL: {
        list: {
          url: 'strategy/inventory_out_all/get_out_all',
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
          name: '加注总量：',
          field: 'outQty',
          unit: ' 公斤'
        },
        {
          name: '加注总额：',
          field: 'outValue',
          unit: ' 元'
        }
      ],
      totalInfo: { outQty: 0, outValue: 0 },

      importVisible: false,
      dataInfoStatus: false,
      updateFindStr: '',
      importData: [],
      importDataInfo: {},
      uploadURL: process.env.VUE_APP_BASE_URL + 'strategy/inventory_out_all/upload_out_all',
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
  watch: {
    stationId() {
      this.$refs.refuelAllLine.initDataList()
    }
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_dync_entrain_column',
      page_import_column: 'cockpit_dync_entrain_import_column',
      page_update_column: 'cockpit_dync_stevedor_update_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_entrain_select_list',
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
    afterTableData(res) {
      const { page, ...dataInfo } = res.data
      this.totalInfo = dataInfo || {}
    },
    onListImportEvent(type, row) {
      // 模版下载
      if (type === 'download') {
        $strategyDownloadOutFile({}).then(res => {
          const fileName = '加注机全量_' + Date.parse(new Date()) + '.xlsx'
          exportBlobToFiles(res, fileName)
        })
      }
    },
    uploadError() {
      this.$message.error('文件上传失败')
    },
    uploadSuccess(res) {
      if (res.code !== 0) {
        this.$message.error(res.message)
      } else {
        this.$message.success('文件上传成功')
        const { data, ...dataInfo } = res.data
        const tmpData = []
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
      if (btn.type === 'ok') {
        $strategyOutConfirmImport({}).then(res => {
          this.$message.success('成功')
          this.$refs.refuelAllLine.initDataList()
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
          if (k === 'outTime') {
            params.param.timeType = 0

            params.param.startTime = v[0]
            params.param.endTime = v[1]
            this.updateFindStr = `( ${this.nickName} ${this.time} ) 加注时间 ${v.join(' - ')}`
          } else if (k === 'updateDate') {
            params.param.timeType = 1

            params.param.startTime = v[0]
            params.param.endTime = v[1]
            this.updateFindStr = `( ${this.nickName} ${this.time} ) 数据更新时间 ${v.join(' - ')}`
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      params.param.gasstationId = this.stationId // 对应加气站

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqUpdateParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'outTime') {
            params.param.timeType = 0

            params.param.startTime = v[0]
            params.param.endTime = v[1]
          } else if (k === 'updateDate') {
            params.param.timeType = 1

            params.param.startTime = v[0]
            params.param.endTime = v[1]
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      params.param.gasstationId = this.stationId // 对应加气站
      params.param.uploadType = 1

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
