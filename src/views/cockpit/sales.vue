<template>
  <div class="template-main">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="今日实时（线上）" name="0">
        <em-table-list
          ref="tables1"
          :tableListName="'timeday'"
          :custTableTitle="custTodayTableTitle"
          :authButtonList="authButtonList"
          :buttonsList="buttonsList"
          :axios="axios"
          :queryCustURL="queryCustURL"
          :composeParam="composeParam"
          :rowKey="'id'"
          :responseSuccess="response_success"
          :queryParam="queryParams"
          :mode_list="mode_list"
          :page_status="page_status"
          :page_column="page_column"
          :options="{ lazy: true }"
          :select_list="select_list"
          @onListEvent="onListEvent"
          @onReqParams="onReqParams"
          @updateColumnValue="updateColumnValue"
        ></em-table-list>
      </el-tab-pane>
      <el-tab-pane label="历史时段（线上）" name="1">
        <em-table-list
          ref="tables2"
          :tableListName="'timehistory'"
          :custTableTitle="custYesterdayTableTimeTitle"
          :authButtonList="authButtonList"
          :buttonsList="buttonsHistoryList"
          :axios="axios"
          :queryCustURL="queryHistoryTimeCustURL"
          :composeParam="composeParam"
          :rowKey="'id'"
          :responseSuccess="response_success"
          :queryParam="queryParams"
          :mode_list="mode_list"
          :page_status="page_status"
          :page_column="mode_history_time_list"
          :options="{ lazy: true }"
          :select_list="select_list"
          @onListEvent="onListEvent"
          @onReqParams="onReqParams"
        ></em-table-list>
      </el-tab-pane>
      <el-tab-pane label="历史总量 (自营)" name="2">
        <table-total-data
          ref="tables3"
          :dataList="dataList"
          :rowData="totalInfo"
          :headerStyle="'top: 96px;'"
          v-if="showImport == 0"
        ></table-total-data>
        <em-table-list
          :tableListName="'timehistory'"
          :custTableTitle="custYesterdayTableTitle"
          :authButtonList="authButtonList"
          :axios="axios"
          :buttonsList="buttonsHistoryCountList"
          :queryCustURL="queryHistoryCustURL"
          :responseSuccess="response_success"
          :mode_list="mode_list"
          :page_status="page_status"
          :queryParam="queryParams"
          :page_column="mode_history_list"
          :select_list="select_list"
          @onListEvent="onListEvent"
          @onReqParams="onReqParamsHistory"
          @updateColumnValue="updateColumnValueHistory"
          v-if="showImport == 0"
        ></em-table-list>

        <div class="top-bg" v-if="showImport == 1 || showImport == 4">
            每日导入
          <div class="between" style="margin-top:20px">
            <el-form :inline="true" size="mini">
              <el-form-item label="">
                <el-date-picker
                  v-model="updateTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="changeTime"
                  placeholder="选择日期"
                  :picker-options="pickerBeginDateBefore"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="">{{ tipTime }}</el-form-item>
            </el-form>
            <div>
              <el-button
              v-if="needButton['data_upload']"
                @click="onListEvent('data_upload')"
                size="mini"
                type="primary"
                >数据上传</el-button
              >
              <el-button
              v-if="needButton['template_down']"
                type="primary"
                @click="onListEvent('template_down')"
                size="mini"
                plain
                >模板下载</el-button
              >
            </div>
          </div>
        </div>

        <div class="bg" v-if="showImport == 1 || showImport == 4 ">
          <div class="count">
            <div class="row">
              <div class="count-item">
                <div class="count-key">
                {{ showImport==4?'调整前销售总量：':'销售总量：' }}  {{ totalInfoImport.qtyTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.qtyTotal">
                  吨
                </div>
              </div>

              <div class="count-item">
                <div class="count-key">
                  {{ showImport==4?'调整前销售总金额：':'销售总金额：' }}  {{ totalInfoImport.amountTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.amountTotal">
                  元
                </div>
              </div>
            </div>

            <div class="row" v-if="showImport == 4">
              <div class="count-item">
                <div class="count-key">
                  调整后销售总量：{{ totalInfoImport.qtyTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.qtyTotal">
                  吨
                </div>
              </div>

              <div class="count-item">
                <div class="count-key">
                  调整后销售总金额：{{ totalInfoImport.amountTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.amountTotal">
                  元
                </div>
              </div>
            </div>
          </div>

          <el-table
          :cell-style="tableCellStyle"
            style="margin-top: 20px"
            :data="dataListImport"
            border
            size="mini"
            stripe

            :header-cell-style="{
              background: 'rgb(246, 246, 246)',
              color: '#606266',
              borderColor: '#EBEEF5',
            }"
          >
            <el-table-column
            min-width="125"
              prop="gasstationName"
              label="加气站(自营站)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.gasstationName || "—" }}</div>
              </template>
            </el-table-column>

            <el-table-column
            v-if=" showImport == 4 || showImport == 5"
              prop="step"
              label="对比阶段"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.step || "—" }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="inQtyTotal"
              label="入库量(吨)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div  >{{ scope.row.inQtyTotal || "—" }}</div>
<!--
                <div  v-if="scope.row.inQtyTotalDiff">{{ scope.row.inQtyTotal || "—" }}</div>
                <div  v-else-if="scope.row.step=='调整前'" style="background-color: #E6E6FF;">{{ scope.row.inQtyTotal || "—" }}</div>
                <div  v-else-if="scope.row.step=='调整后'" style="background-color: #E6FFE6;">{{ scope.row.inQtyTotal || "—" }}</div> -->
              </template>
            </el-table-column>

            <el-table-column
              prop="gasQtyTotal"
              label="销售量(吨)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.gasQtyTotal || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="dayAvgPrice"
              label="日均零售价(元/吨)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.dayAvgPrice || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="amountTotal"
              label="销售金额(元)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.amountTotal || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="compareRate"
              label="较前一日销量比"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div v-if="scope.row.compareRate==0" >{{ scope.row.compareRate ? (scope.row.compareRate + "%") : "—" }}</div>
                <div v-else-if="scope.row.compareRate>0" style="color:#41CCA1">{{ scope.row.compareRate ? (scope.row.compareRate + "%") : "—" }}</div>
                <div v-else style="color:red">{{ scope.row.compareRate ? (scope.row.compareRate + "%") : "—" }}</div>
              </template>
            </el-table-column>
          </el-table>

          <el-col>
            <div
              v-for="(item, index) in errorList"
              :key="index"
              style="color: red"
            >
              {{ item }}
            </div>
          </el-col>

          <el-row style="margin-top: 20px; margin-left: 10px">
            <el-button
              size="mini"
              type="info"
              v-if="errorList.length > 0 || dataListImport == 0">{{showImport == 4?'确定发起':'确定导入'}}</el-button
            >
            <el-button
              @click="onListEvent('sure_upload')"
              size="mini"
              type="primary"
              v-else
              >{{showImport == 4?'确定发起':'确定导入'}}</el-button
            >
            <el-button
              type="primary"
              @click="clickCancel()"
              size="mini"
              plain
              >取消</el-button
            >
          </el-row>
        </div>

        <div class="bg" v-if="showImport == 3">
          <div class="between">
            <div>数据调整</div>
            <div>
              <el-button
              v-if="needButton['start_modify']"
                @click="onListEvent('start_modify')"
                size="mini"
                type="primary"
                >发起调整</el-button
              >
            </div>
          </div>
        <el-table
            style="margin-top: 20px"
            :data="waitList"
            border
            size="mini"
            stripe
            :header-cell-style="{
              background: 'rgb(246, 246, 246)',
              color: '#606266',
              borderColor: '#EBEEF5',
            }"
          >
            <el-table-column
              prop="duration"
              label="数据时段"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="inQtyTotal"
              label="审核状态"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ getAudioStatus(scope.row.auditStatus)   }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="operatorName"
              label="发起人"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.operatorName || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="dayAvgPrice"
              label="发起时间"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.auditDate || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="审核人"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.auditName || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="审核时间"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.auditDate ||"—" }}</div>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="280">
          <template slot-scope="scope">

          <el-button type="text" @click="onListEvent('check_detail',scope.row)"      v-if="needButton['check_detail']">详情</el-button>
          <el-button type="text" @click="onListEvent('check_audit',scope.row)" v-if="scope.row.auditStatus==0 && needButton['check_audit']">审核</el-button>
          </template>
        </el-table-column>

          </el-table>


          <el-row style="margin-top: 20px" >
            <el-button
              @click="showImport = 0"
              size="mini"
              type="primary" plain>返回</el-button >
          </el-row>
        </div>

        <el-dialog  :title="!isAudit?'数据详情':'数据审核'"
      :visible.sync ="showDetail"
      :width="add_edit_dialog"

      :append-to-body="true" >
          <div class="bg" >
          <div class="count">
            <el-row>审核状态：{{ getAudioStatus(clickRow.auditStatus) }}   <span style="margin-left:20px">发起人：{{ clickRow.operatorName||'—' }}   </span>      <span style="margin-left:20px"></span>发起时间：{{ clickRow. operatorDate||'—'}}</span>
              <span style="margin-left:20px">审核人：{{ clickRow.auditName ||'—'}}</span>     <span style="margin-left:20px">审核时间：{{ clickRow. auditDate||'—'}}</span>

            </el-row>
            <el-row style="margin-top: 10px;">数据时段 ：{{ clickRow.duration }}</el-row>
            <div class="row" style="margin-top: 10px;">
              <div class="count-item">
                <div class="count-key">
                {{ '调整前交易总量'}}  {{ totalInfoImport.qtyTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.qtyTotal">
                  吨
                </div>
              </div>

              <div class="count-item">
                <div class="count-key">
                  {{ '调整前销售总金额：' }}  {{ totalInfoImport.amountTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.amountTotal">
                  元
                </div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="count-item">
                <div class="count-key">
                  调整后交易总量：{{ totalInfoImport.qtyTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.qtyTotal">
                  吨
                </div>
              </div>

              <div class="count-item">
                <div class="count-key">
                  调整后销售总金额：{{ totalInfoImport.amountTotal || "—" }}
                </div>
                <div class="count-value" v-if="totalInfoImport.amountTotal">
                  元
                </div>
              </div>
            </div>
          </div>

          <el-table
            style="margin-top: 20px"
            :data="dataListImport"
            :cell-style="tableCellStyle"
            border
            size="mini"
            stripe
            :header-cell-style="{
              background: 'rgb(246, 246, 246)',
              color: '#606266',
              borderColor: '#EBEEF5',
            }"
          >
            <el-table-column
              prop="gasstationName"
              label="加气站(自营站)"
              min-width="125"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.gasstationName || "—" }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="step"
              label="对比阶段"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.step || "—" }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="inQtyTotal"
              label="入库量(吨)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.inQtyTotal || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="gasQtyTotal"
              label="销售量(吨)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.gasQtyTotal || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="dayAvgPrice"
              label="日均零售价(元/吨)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.dayAvgPrice || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="amountTotal"
              label="销售金额(元)"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div>{{ scope.row.amountTotal || "—" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="compareRate"
              label="较前一日销量比"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div v-if="scope.row.compareRate==0" >{{ scope.row.compareRate ? (scope.row.compareRate + "%") : "—" }}</div>
                <div v-else-if="scope.row.compareRate>0" style="color:#41CCA1">{{ scope.row.compareRate ? (scope.row.compareRate + "%") : "—" }}</div>
                <div v-else style="color:red">{{ scope.row.compareRate ? (scope.row.compareRate + "%") : "—" }}</div>
              </template>
            </el-table-column>
          </el-table>

          <el-row v-if="isAudit" style="margin-top: 20px;">
            审核结果：  <el-radio v-model="radioAudit" label="2">通过</el-radio>
                       <el-radio v-model="radioAudit" label="3">不通过</el-radio>
          </el-row>

          <el-row style="margin-top: 20px" v-if="isAudit">
            <el-button
              size="mini"
              type="primary" @click="auditPass()">确定</el-button
            >
            <el-button
              @click="onListEvent('sure_upload')"
              size="mini"
              type="primary" plain>取消</el-button >
          </el-row>
        </div>


        </el-dialog>

      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="数据上传"
      :visible.sync="dialogExportVisible"
      :width="add_edit_dialog"
      :append-to-body="true"
    >
      <el-form
        ref="exportCar"
        v-if="dialogExportVisible"
        :model="importRow"
        size="small"
        :rules="importRules"
        label-position="left"
      >
        <el-form-item>
          <div>
            <i class="el-icon-upload"></i>
            <span style="display: inline-block; padding-left: 2px"
              >上传文件</span
            >
          </div>
          <div style="padding-left: 20px">
            <el-upload
              class="upload-demo"
              ref="upload"
              name="file"
              :limit="1"
              :headers="headers"
              accept=".xls,.xlsx"
              action="/user/import/import_user"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取上传文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传xlsx，且不超过10Mb
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button
              v-for="(btnItem, index) in importRow._btn.list"
              :key="index"
              :type="btnItem.bType"
              size="small"
              :icon="btnItem.icon"
              @click="btnClickEvent(btnItem)"
              >{{ btnItem.label }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  initVueDataOptions,
  isTypeof,
  formateTData,
  exportBlobToFiles,
  toolsFileHeaders,
  custFormBtnList
} from '@/utils/tools'
import { TableTotalData } from '@/components'
import {
  $settleGasstationCurrentSales,
  $settleGasstationHistorySales,
  $settleGwayGasOrderGetSumTotal,
  $settleGasorderdownload,
  $importDataFileWithNoOrgId,
  $settleGasorderWait, $settleGasorderAdjustDetail, $settleGasorderAdjustAudit
} from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'salestime',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      updateTime: '',
      showImport: 0,
      active: 0,
      queryCustURL: {
        list: {
          url: 'settle/gasstation_monitor/full_district_list',
          method: 'post',
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        children: {
          url: 'settle/gasstation_monitor/district_gasstation_list',
          method: 'post',
          props: {
            districtId: 'districtId',
            queryDateTime: 'dateTime'
          },
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        name: '监控'
      },
      queryHistoryCustURL: {
        list: {
          url: 'settle/gway_gasorder/list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '监控'
      },
      queryWaitURL: {
        list: {
          url: 'settle/gway_gasorder_adjust/page',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '数据调整'
      },
      queryHistoryTimeCustURL: {
        list: {
          url: 'settle/gasstation_monitor/histroy_full_district_list',
          method: 'post',
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        children: {
          url: 'settle/gasstation_monitor/histroy_district_gasstation_list',
          method: 'post',
          props: {
            districtId: 'districtId'
          },
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        name: '监控'
      },
      composeParam: ['districtName'],
      custTodayTableTitle: '今日实时（线上）',
      custYesterdayTableTimeTitle: '历史时段（线上）',
      custYesterdayTableTitle: '历史总量 (自营)',
      custYesterdayTableTitle2: '历史总量 (自营)2',
      buttonsList: [
        { type: 'primary', icon: '', event: 'query', name: '查询' },
        { type: 'primary', icon: '', event: 'export', name: '导出' }
      ],
      buttonsHistoryList: [
        { type: 'primary', icon: '', event: 'his_export', name: '导出' }
      ],
      buttonsHistoryCountList: [
        { type: 'primary', icon: '', event: 'data_import', name: '每日导入' },
        { type: 'primary', icon: '', event: 'data_modify', name: '数据调整' }
      ],
      buttonsWaitList: [
        { type: 'primary', icon: '', event: 'start_modify', name: '发起调整' }
      ],
      needButton:
      {
        start_modify: false,
        data_upload: false,
        template_down: false,
        check_audit: false,
        check_detail: false,
        data_modify: false,
        sure_upload: false
      },
      page_history_status: 1,
      initHistoryStatus: true,
      dataList: [
        {
          name: '销售总量：',
          field: 'qtyTotal',
          unit: ' 吨'
        },
        {
          name: '销售总金额：',
          field: 'amountTotal',
          unit: ' 元'
        }
      ],
      dataListImport: [],
      totalInfo: { qtyTotal: 0, amountTotal: 0 },
      totalInfoImport: { qtyTotal: 0, amountTotal: 0, amountTotalNew: 0, qtyTotalNew: 0 },

      headers: {},
      dialogExportVisible: false,
      importRow: {},
      importRules: {},
      sumParams: {},
      tipTime: '',
      uploadInfo: {},
      errorList: [],
      waitList: [],
      audit: {
        auditStatus: '',
        curDate: '',
        id: ''
      },
      clickRow: {},
      showDetail: false,
      isAudit: false,
      radioAudit: '2',
      authList: [],
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_sales_column',
      mode_list: 'cockpit_sales_mode_list',
      mode_history_time_list: 'cockpit_history_time_column',
      mode_history_list: 'cockpit_history_column',
      modifyListColumn: 'modifyListColumn',

      page_status: 'cockpit_sales_page_status',
      select_list: 'cockpit_sales_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
    this.headers = toolsFileHeaders(this)
    this.getToday()
    this.getAuth()
  },
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      if (type == 'query') {
        this.$refs.tables1.initDataList()
      } else if (type === 'export') {
        $settleGasstationCurrentSales({
          queryDateTime: this.currDataTime
        }).then((response) => {
          const fileName = '实时销量监控数据' + Date.parse(new Date()) + '.xls'
          exportBlobToFiles(response, fileName)
          this.$message.success('下载成功')
        })
      } else if (type === 'his_export') {
        $settleGasstationHistorySales({
          dateTimeFrom: this.currDataTime.dateTimeFrom,
          dateTimeTo: this.currDataTime.dateTimeTo
        }).then((response) => {
          const fileName = '历史销量监控数据' + Date.parse(new Date()) + '.xls'
          exportBlobToFiles(response, fileName)
          this.$message.success('下载成功')
        })
      } else if (type === 'data_import') {
        this.showImport = 1
      } else if (type === 'template_down') {
        $settleGasorderdownload({}).then((response) => {
          const fileName = '每日导入' + Date.parse(new Date()) + '.xlsx'
          exportBlobToFiles(response, fileName)
          this.$message.success('下载成功')
        })
      } else if (type === 'data_upload') {
        this.resetData()
        this.importEvent()
      } else if (type === 'sure_upload') {
        this.sureUpload()
      } else if (type === 'data_modify') {
        this.showImport = 3
        this.getWaitCheck()
      } else if (type === 'start_modify') {
        this.resetData()
        this.showImport = 4
      } else if (type === 'check_detail') {
        this.isAudit = false
        this.clickRow = row
        this.showDetail = true
        this.resetData()
        this.getDetail(row.id)
      } else if (type === 'check_audit') {
        this.resetData()
        this.isAudit = true
        this.clickRow = row
        this.showDetail = true
        this.getDetail(row.id)
      }
    },

    tableCellStyle ({ row, column, rowIndex, columnIndex }) {
      console.log('rowrowrow', row, column, rowIndex)

      if (column.property == 'step') { // 对比阶段

      } else if (column.property == 'amountTotal') {
        if (row.amountTotalDiff) {
          if (row.step == '调整前') {
            return 'background:#E6E6FF'
          } else {
            return 'background:#E6FFE6'
          }
        } else {
          return ''
        }
      } else if (column.property == 'gasQtyTotal') {
        if (row.gasQtyTotalDiff) {
          if (row.step == '调整前') {
            return 'background:#E6E6FF'
          } else {
            return 'background:#E6FFE6'
          }
        } else {
          return ''
        }
      } else if (column.property == 'dayAvgPrice') {
        if (row.dayAvgPriceDiff) {
          if (row.step == '调整前') {
            return 'background:#E6E6FF'
          } else {
            return 'background:#E6FFE6'
          }
        } else {
          return ''
        }
      } else if (column.property == 'inQtyTotal') {
        if (row.inQtyTotalDiff) {
          if (row.step == '调整前') {
            return 'background:#E6E6FF'
          } else {
            return 'background:#E6FFE6'
          }
        } else {
          return ''
        }
      } else {
        return ''
      }

      // if (columnIndex === 11) { // 表格的第11行做处理
      //   if (fxdj == 4) { // 如果是低风险背景色蓝色，字体色白色
      //     return 'background:blue; color:white'
      //   } else if (fxdj == 2) { // 较大风险
      //     return 'background:orange'
      //   } else if (fxdj == 1) { // 重大风险
      //     return 'background:red'
      //   } else { // 一般风险
      //     return 'background:yellow'
      //   }
      // } else {
      //   return ''
      // }
    },

    resetData() {
      this.totalInfoImport = { qtyTotal: 0, amountTotal: 0, amountTotalNew: 0, qtyTotalNew: 0 }
      this.dataListImport = []
    },

    auditPass() {
      $settleGasorderAdjustAudit({ id: this.clickRow.id, auditStatus: this.radioAudit }).then(res => {
        if (res.code == 0) {
          this.showDetail = false
          this.$message.success('已审核')
          this.getWaitCheck()
        } else {
        }
      })
    },
    clickCancel() {
      if (this.showImport == 4) {
        this.showImport = 3
      } else {
        this.showImport = 0
      }
    },
    getAudioStatus(status) {
      console.log('status', status)
      if (status == '0') {
        return '待审核'
      } else if (status == '1') {
        return '待审核'
      } else if (status == '2') {
        return '审核通过'
      } else if (status == '3') {
        return '未通过'
      }
    },

    getWaitCheck() {
      $settleGasorderWait({ page: 1, size: -1 }).then(res => {
        for (const item of res.data.records) {
          const aa = this.changeTime(item.curDate, 1)
          item.duration = aa
          this.waitList.push(item)
        }
        this.waitList = res.data.records
      })
    },

    getToday() {
      let today = new Date()
      today =
        today.getFullYear() +
        '-' +
        (today.getMonth() > 9
          ? today.getMonth() + 1
          : '0' + (today.getMonth() + 1)) +
        '-' +
        (today.getDate() > 9 ? today.getDate() : '0' + today.getDate())
      this.updateTime = today
      this.changeTime(today)
    },

    changeTime(e, type) {
      var time = new Date(e).getTime() + 24 * 60 * 60 * 1000
      var yesterday = new Date(time)
      yesterday =
        yesterday.getFullYear() +
        '-' +
        (yesterday.getMonth() > 9
          ? yesterday.getMonth() + 1
          : '0' + (yesterday.getMonth() + 1)) +
        '-' +
        (yesterday.getDate() > 9
          ? yesterday.getDate()
          : '0' + yesterday.getDate())
      if (type) {
        return e + '  08:00 至  ' + yesterday + '  08:00 '
      } else {
        this.tipTime = '导入时间：' + e + '  08:00 至  ' + yesterday + '  08:00 '
      }
    },

    handleClick() {
      // this.initHistoryStatus = true
      // this.page_history_status = 1
    },
    settleGwayGasOrderGetSumTotal(params) {
      $settleGwayGasOrderGetSumTotal(params).then((res) => {
        console.log(res)
        this.totalInfo = { ...res.data }
      })
    },
    resetTitleName(timestamp, datetime) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        timestamp = Number(timestamp) + 1000
        this.custTodayTableTitle =
          '今日实时【' + datetime + '】 ' + formateTData(timestamp, 'all')
      }, 1000)
    },
    updateColumnValue(dataList, callback) {
      this.currDataTime = dataList[0].dateTime

      this.custTodayTableTitle = '今日实时【' + this.currDataTime + '】'
      // this.resetTitleName(Date.parse(this.currDataTime), dataList[0].queryDateTime) // 计时器
      // eslint-disable-next-line standard/no-callback-literal
      callback(dataList)
    },

    importEvent() {
      this.importRow._btn = custFormBtnList()
      this.importRow.orgId = this.woporg
      this.dialogExportVisible = true
    },
    // dialog里的按钮事件
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]
        console.log('files', files)
        if (!files) {
          this.$message.error('请先上传文件')
          return
        }
        var _fromData = new FormData()
        _fromData.append('date', this.updateTime)
        _fromData.append('file', files)

        let url = ''
        if (this.showImport == 4) {
          url = 'settle/gway_gasorder_adjust/adjust_gasorder_preview'
        } else {
          url = 'settle/gway_gasorder_adjust/import_gasorder_preview'
        }
        $importDataFileWithNoOrgId(url, {
          file: _fromData,
          headers: this.headers
        }).then((response) => {
          this.uploadInfo = { file: _fromData, headers: this.headers }
          if (response.data && response.data.orderList) {
            this.dataListImport = response.data.orderList
            this.totalInfoImport.qtyTotal = response.data.qtyTotal
            this.totalInfoImport.amountTotal = response.data.amountTotal
          }


          if (this.showImport == 4 && response.data && response.data.orderList) {
            this.totalInfoImport.qtyTotalNew = response.data.qtyTotalNew
            this.totalInfoImport.amountTotalNew = response.data.amountTotalNew
            this.dealData()
          }


          if (response.message) {
            this.errorList = response.message.split(',')
          } else {
            this.errorList = []
          }

          if (this.errorList.length == 0) {
            this.$message.success('导入成功')
          }
          // this.$refs.tables4.initDataList()
          this.dialogExportVisible = false
        })
      } else {
        this.dialogExportVisible = false
      }
    },

    sureUpload() {
      let url = ''
      if (this.showImport == 4) {
        url = 'settle/gway_gasorder_adjust/adjust_gasorder'
      } else {
        url = 'settle/gway_gasorder_adjust/import_gasorder'
      }
      $importDataFileWithNoOrgId(url, this.uploadInfo).then((response) => {
        if (response.code == 0) {
          this.$message.success(response.message)
        }
        if (this.showImport == 4) {
          this.showImport = 3
        } else {
          this.showImport = 0
        }

        this.$refs.tables3.initDataList()
      })
    },
    dealData() {
      const newArray = []
      for (let i = 0; i < this.dataListImport.length; i++) {
        let diffCount = 0
        if (this.dataListImport[i].amountTotal * 1 != this.dataListImport[i].amountTotalNew * 1) {
          this.dataListImport[i].amountTotalDiff = true
          diffCount++
        } else {
          this.dataListImport[i].amountTotalDiff = false
        }

        if (this.dataListImport[i].dayAvgPrice * 1 != this.dataListImport[i].dayAvgPriceNew * 1) {
          this.dataListImport[i].dayAvgPriceDiff = true
          diffCount++
        } else {
          this.dataListImport[i].dayAvgPriceDiff = false
        }

        if (this.dataListImport[i].gasQtyTotal * 1 != this.dataListImport[i].gasQtyTotalNew * 1) {
          this.dataListImport[i].gasQtyTotalDiff = true
          diffCount++
        } else {
          this.dataListImport[i].gasQtyTotalDiff = false
        }

        if (this.dataListImport[i].inQtyTotal * 1 != this.dataListImport[i].inQtyTotalNew * 1) {
          this.dataListImport[i].inQtyTotalDiff = true
          diffCount++
        } else {
          this.dataListImport[i].inQtyTotalDiff = false
        }

        if (diffCount > 0) {
          newArray.push({ ...this.dataListImport[i], step: '调整前' })
        } else {
          newArray.push({ ...this.dataListImport[i], step: '—' })
        }

        if (diffCount > 0) {
          newArray.push({
            amountTotal: this.dataListImport[i].amountTotalNew,
            dayAvgPrice: this.dataListImport[i].dayAvgPriceNew,
            gasQtyTotal: this.dataListImport[i].gasQtyTotalNew,
            inQtyTotal: this.dataListImport[i].inQtyTotalNew,
            compareRate: this.dataListImport[i].compareRateNew,

            amountTotalDiff: this.dataListImport[i].amountTotalDiff,
            dayAvgPriceDiff: this.dataListImport[i].dayAvgPriceDiff,
            gasQtyTotalDiff: this.dataListImport[i].gasQtyTotalDiff,
            inQtyTotalDiff: this.dataListImport[i].inQtyTotalDiff,

            step: '调整后'
          })
        }
      }
      console.log(' this.dataListImport ', this.dataListImport)
      this.dataListImport = newArray
    },

    getDetail(id) {
      $settleGasorderAdjustDetail({ id: id }).then(response => {
        this.dataListImport = response.data.orderList
        this.totalInfoImport.qtyTotal = response.data.qtyTotal
        this.totalInfoImport.amountTotal = response.data.amountTotal
        this.totalInfoImport.qtyTotalNew = response.data.qtyTotalNew
        this.totalInfoImport.amountTotalNew = response.data.amountTotalNew
        this.dealData()
      })
    },
    updateColumnValueHistory(dataList, callback) {
      dataList.forEach((item) => {
        if (!item.compareRate) {
          item.compareRate = '-'
        } else {
          item.compareRate += '%'
        }
      })
      callback(dataList)
    },
    reloadHistoryTable(_this) {
      if (this.initHistoryStatus) {
        if (_this.tableListName === 'timehistory') {
          if (_this.finds.queryDateTime) {
            this.page_history_status = 5
            this.timers = setTimeout(() => {
              this.initHistoryStatus = false
              this.$refs.tables2.initDataList()
            }, 100)
          }
        }
      } else {
        clearTimeout(this.timers)
      }
    },
    onReqParams(type, _this, callback) {
      const params = {}

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'queryDateTime') {
            if (_this.finds.queryDateTime) {
              params.dateTimeFrom = v[0]
              params.dateTimeTo = v[1]
            }
          }
        }
      }

      this.reloadHistoryTable(_this)
      if (_this.tableListName === 'timehistory') {
        if (Object.keys(params).length === 0) {
          const tmpTimes = formateTData(new Date())
          params.dateTimeFrom = tmpTimes
          params.dateTimeTo = tmpTimes
        }
        this.currDataTime = params
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqParamsHistory(type, _this, callback) {
      console.log(_this)
      const params = { dateFrom: '', dateTo: '' }
      if (_this.finds.date) {
        params.dateFrom = formateTData(_this.finds.date[0], 'all')
        params.dateTo = formateTData(_this.finds.date[1], 'all')
      }
      this.settleGwayGasOrderGetSumTotal(params)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },

    getAuth() {
      const menuString = JSON.parse(this.$getSessionStorage('menu_tree'))
      for (const item of menuString) {
        for (const child of item.children) {
          if (child.routeName == this.$route.name) {
            this.authList = child.buttons.split('$')
            break
          }
        }
      }

      for (const key in this.needButton) {
        for (const item of this.authList) {
          if (item == key) {
            this.needButton[key] = true
            break
          }
        }
      }

      console.log('needButton', this.needButton)
      console.log('authList', this.authList)
    }


  }
}
</script>
<style lang="scss">
.el-table__fixed {
  height: 100% !important;
}
.between {
  display: flex;
  justify-content: space-between;
}
.row {
  display: flex;
}
.top-bg {
  padding: 15px 15px 0 15px;
  margin: 5px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.bg {
  padding: 15px;
  margin: 5px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.count {
  padding: 10px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  background-color: #fffdd3;
  .count-item {
    display: flex;
    margin-right: 15px;
    .count-key {
      color: #2f3337;
      font-size: 14px;
    }
    .count-value {
      color: red;
      font-size: 14px;
    }
  }
}
</style>
