<template>
  <div class="template-main">
    <!-- 查询 -->
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 108px;'"></table-total-data>
    <!-- 列表 -->
    <em-table-list ref="tables" :tableListName="'order'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <!-- 导入 -->
    <el-dialog title="批量导入库存" :visible.sync="dialogExportVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogExportVisible" :model="importRow" size="small" :rules="importRules" label-position="left">
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
            <el-button v-for="(btnItem, index) in importRow._btn.list" :key="index" :type="btnItem.bType"
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
import { initVueDataOptions, callbackPagesInfo, isTypeof, exportBlobToFiles, custFormBtnList, toolsFileHeaders } from '@/utils/tools'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'
import { $importDownloadFile, $importDataFile, $sumData } from '@/service/settle'

export default {
  name: 'gasOrderSelf',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          // 后台配置
          url: 'settle/gway_gasorder/list_stocks',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        edit: {
          url: 'settle/gway_gasorder/update_stock',
          method: 'post'
        },
        del: {
          url: 'settle/gway_gasorder/delete_stock',
          method: 'post',
          name: 'gasstationName',
          props: {
            id: 'id'
          }
        },
        name: '库存'
      },
      headers: {},
      flag: '',
      statusBtnList: [
        { type: 'plain', icon: '', event: 'all', name: '全部库存', flag: null },
        { type: 'plain', icon: '', event: 'day', name: '日常入库', flag: 0 },
        { type: 'plain', icon: '', event: 'sell', name: '直销计划', flag: 1 }
      ],
      buttonsList: [
        { type: 'primary', icon: '', event: 'import', name: '库存导入' }
      ],
      dataList: [{
        name: '入库总量：',
        field: 'qtyTotal',
        unit: ' 公斤'
      }],
      totalInfo: { qtyTotal: 0 },
      dialogExportVisible: false,
      importRow: {},
      importRules: {},
      sumParams: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_selfFullInventory_mode_list',
      page_status: 'filler_selfFullInventory_page_status',
      page_column: 'filler_selfFullInventory_column',
      select_list: 'filler_selfFullInventory_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
    this.headers = toolsFileHeaders(this)
    this.buttonsList = [
      ...this.statusBtnList,
      ...this.buttonsList
    ]
    this.handleStatusButton()
  },
  methods: {
    // 获取状态按钮类型
    getStatusByButton(type) {
      return type === 'all' || type === 'day' || type === 'sell'
    },
    // 按钮事件
    async onListEvent(type, row) {
      row._btn = {}
      if (type === 'import') {
        // 批量导入车辆
        this.importEvent()
      } else if (this.getStatusByButton(type)) {
        // 订单状态筛选
        this.filterOrderStatus(type)
      }
    },
    // 筛选订单状态
    filterOrderStatus(type) {
      this.statusBtnList.map(item => {
        if (item.event === type) {
          item.type = 'primary'
          this.flag = item.flag
        } else {
          item.type = 'plain'
        }
        return item
      })
      this.$refs.tables.initDataList()
      this.initTotalData()
    },
    // 处理订单状态按钮
    handleStatusButton() {
      const statusButtons = []
      this.authButtonList.forEach(item => {
        if (this.getStatusByButton(item)) {
          statusButtons.push(item)
        }
      })
      if (!statusButtons.length) return
      this.statusBtnList.map(item => {
        if (item.event === statusButtons[0]) {
          item.type = 'primary'
          this.flag = item.flag
        } else {
          item.type = 'plain'
        }
      })
    },
    initTotalData() {
      $sumData({
        data: {
          ...this.sumParams,
          flag: this.flag
        },
        url: 'settle/gway_gasorder/get_sum_total_stock'
      }).then(res => {
        this.totalInfo = res.data
      })
    },
    // 请求数据
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), {
        param: {
          dateFrom: '',
          dateTo: '',
          flag: this.flag,
          gasstationName: ''
        }
      })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'tradeDate') {
            console.log(_this.finds)
            if (_this.finds.tradeDate === null) {
              params.param.dateFrom = ''
              params.param.dateTo = ''
            } else {
              params.param.dateFrom = v[0]
              params.param.dateTo = v[1]
            }
          } else if (k == 'updateDate') {
            if (_this.finds.updateDate === null) {
              params.param.dateParam.updateDateFrom = ''
              params.param.dateParam.updateDateTo = ''
            } else {
              params.param.dateParam.updateDateFrom = v[0]
              params.param.dateParam.updateDateTo = v[1]
            }
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      this.sumParams = {
        ...params.param
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
      this.initTotalData()
    },
    // 导入
    importEvent() {
      this.importRow._btn = custFormBtnList()
      this.importRow.orgId = this.woporg
      this.dialogExportVisible = true
    },
    // 模板下载
    downloadModel() {
      const url = 'settle/gway_gasorder/download_stock_tpl'
      $importDownloadFile(url, { orgId: this.importRow.orgId, times: (new Date()).getTime() }).then(response => {
        const fileName = 'gasstock_tpl-' + this.importRow.orgId + '.xlsx'
        exportBlobToFiles(response, fileName)
      })
    },
    // dialog里的按钮事件
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]

        var _fromData = new FormData()

        _fromData.append('file', files)
        // _fromData.append('orgId', this.importRow.orgId)

        const url = 'settle/gway_gasorder/import_stock'
        $importDataFile(url, { file: _fromData, headers: this.headers }).then(response => {
          this.$message.success(response.data)
          this.$refs.tables.initDataList()
          this.dialogExportVisible = false
        })
      } else {
        this.dialogExportVisible = false
      }
    }
  }
}
</script>
