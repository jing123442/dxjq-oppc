<template>
  <div class="template-main">
    <nt-text-info :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 108px;'" :detailInfo="'结算订单为成功支付后订单'"></nt-text-info>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="导出下载" :visible.sync="dialogExportDownVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportDown" v-if="dialogExportDownVisible" :model="exportRow" :rules="exportRowRules" size="small" label-position="left">
        <el-form-item prop="modelList" style="margin-bottom: 50px;">
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">当前导出数据区间为：{{exportRow.period}}</span>
          </div>
          <div style="padding-left: 20px;">根据您的需要，勾选数据进行下载</div>

          <el-checkbox-group v-model="exportRow.modelList" style="padding: 10px 20px;">
            <el-checkbox label="9" name="modelList">加气站与长城奥扬对账函</el-checkbox>
            <el-checkbox label="7" name="modelList">加气站结算明细</el-checkbox>
            <el-checkbox label="10" name="modelList">加气站提现明细</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in exportRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem, exportRow)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, formatPeriodDate, formatPeriodDateTime } from '@/utils/tools'
import { $gwayOrderTotal, $generateDownloadFile } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/gasstation_gway/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站企业'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'export', name: '导出' }],
      dataList: [{
        name: '加气量总额：',
        field: 'gasQtyTotal',
        unit: ' 公斤'
      }, {
        name: '服务费总金额：',
        field: 'profitTotal',
        unit: ' 元'
      }],
      totalInfo: { gasQtyTotal: 0, profitTotal: 0 },
      dialogExportDownVisible: false,
      exportRow: {
        modelList: ['7', '9', '10']
      },
      exportRowRules: {
        modelList: [{ type: 'array', required: true, message: '请至少选择一个下载内容', trigger: 'change' }]
      },
      currParams: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_filler_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      wopuser: 'wopuser'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      const params = { orgId: row.gasstationId, periodYear: row.periodYear, periodMonth: row.periodMonth }
      if (type === 'settle_list') {
        this.$router.push({
          path: 'orderFiller/fillerDetailList',
          query: params
        })
      } else if (type === 'withdraw_list') {
        this.$router.push({
          path: 'orderFiller/fillerWithdrawList',
          query: params
        })
      } else if (type === 'stock_list') {
        this.$router.push({
          path: 'orderFiller/fillerStockDetail',
          query: params
        })
      } else if (type === 'download') {
        this.exportRow = Object.assign(this.exportRow, row)
        this.exportRow.period = formatPeriodDateTime(row.periodYear, row.periodMonth)
        this.exportRow._btn = this.formBtnList
        this.dialogExportDownVisible = true
      } else if (type === 'export') {
        const params = [{
          exportParam: JSON.stringify(this.currParams),
          type: 8
        }]
        $generateDownloadFile(params).then(response => {
          this.$alert('您选择的下载内容已申请，请在下载中心下载。', '下载提示')
        })
      }
    },
    btnClickEvent(obj, row) {
      if (obj.type == 'ok') {
        this.$refs.exportDown.validate(valid => {
          if (valid) {
            const fillerId = row.gasstationId
            const dateParam = this.currParams.dataParam
            const params = []
            row.modelList.forEach(item => {
              const itemPrams = {}
              if (item == 7) {
                itemPrams.exportParam = JSON.stringify({
                  gasOrder: { gasstationId: fillerId },
                  dateParam: dateParam
                })
              } else if (item == 9) {
                itemPrams.exportParam = JSON.stringify({
                  gasstationGway: { gasstationId: fillerId },
                  dataParam: dateParam
                })
              } else if (item == 10) {
                itemPrams.exportParam = JSON.stringify({
                  withdrawOrder: { orgId: fillerId },
                  dateParam: dateParam
                })
              }
              itemPrams.type = Number(item)
              params.push(itemPrams)
            })
            $generateDownloadFile(params).then(response => {
              this.$alert('您选择的下载内容已申请，请在下载中心下载。', '下载提示')
            })
            this.dialogExportDownVisible = false
          }
        })
      } else {
        this.dialogExportDownVisible = false
      }
    },
    initTotalData(params) {
      this.currParams = params
      $gwayOrderTotal(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { gasstationGway: { }, dataParam: { } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'period') {
            const period = formatPeriodDate(_this.finds[k])

            querys.param.dataParam.periodYear = period.periodYear
            querys.param.dataParam.periodMonth = period.periodMonth
          } else {
            if (v !== '') querys.param.gasstationGway[k] = v
          }
        }
      }

      this.initTotalData(querys.param)

      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
