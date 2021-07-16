<template>
  <div class="template-main">
    <em-table-list ref="lngPlan" :tableListName="'lngPlan'" :authButtonList="authButtonList" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="LNG计划确认" :visible.sync="dialogInfoVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogInfoVisible" :rowData="lngInfoRow" :pageColumn="page_column_info" :selectList="select_list" :axios="axios" :modeList="mode_info_list" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventInfo"></nt-form>
    </el-dialog>
    <el-dialog title="变更申请处理" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogChangeVisible" ref="change" :formRef="'changeForm'" :rowData="changeRow" :pageColumn="page_column_change" :selectList="select_list" :axios="axios" :modeList="mode_change_list" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventChange"></nt-form>
    </el-dialog>
    <el-dialog title="LNG计划取消" :visible.sync="dialogCancelVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogCancelVisible" ref="cancel" :formRef="'cancelForm'" :rowData="cancelRow" :pageColumn="page_column_cancel" :selectList="select_list" :axios="axios" :modeList="mode_cancel_list" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListCancelLeave"></nt-form>
    </el-dialog>
    <el-dialog title="出港磅单录入" :visible.sync="dialogLeaveVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogLeaveVisible" ref="leave" :formRef="'leaveForm'" :rowData="leaveRow" :pageColumn="page_column_leave" :selectList="select_list" :axios="axios" :modeList="mode_leave_list" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventLeave"></nt-form>
    </el-dialog>
    <el-dialog title="核对到账磅单" :visible.sync="dialogCheckVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogCheckVisible" ref="check" :formRef="'checkForm'" :rowData="checkRow" :pageColumn="page_column_check" :selectList="select_list" :axios="axios" :modeList="mode_check_list" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventCheck"></nt-form>
    </el-dialog>
    <el-dialog title="异常申报处理" :visible.sync="dialogAnomalousVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAnomalousVisible" ref="anomalous" :formRef="'anomalousForm'" :rowData="anomalousRow" :pageColumn="page_column_anomalous" :selectList="select_list" :axios="axios" :modeList="mode_anomalous_list" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAnomalous"></nt-form>
    </el-dialog>
    <el-dialog title="订单详细信息" :visible.sync="dialogDetailVisible" :width="add_edit_dialog" :append-to-body="true" @close="onListEventDetail">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_detail_column" :modeList="detail_mode_list" :inputType="'detail'" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventDetail"></nt-form>
    </el-dialog>
    <el-dialog title="变更记录" :visible.sync="dialogOperateVisible" :width="add_edit_dialog" :append-to-body="true" @close="onListEventDetail">
      <nt-text-info v-if="dialogOperateVisible" :dataList="dataList" :rowData="changeInfoRow" :headerClass="'top-detail transparent'" :headerStyle="headerStyle" :boxStyle="'margin-bottom: 0;'"></nt-text-info>
      <em-table-list v-if="dialogOperateVisible" :custTableTitle="'变更记录'" ref="changeInfoList" :tableListName="'changeInfoList'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryChangeCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_change_info_column" :select_list="{}" @onReqParams="onReqChangeParams"></em-table-list>
    </el-dialog>
    <el-dialog title="库存详情" :visible.sync="dialogStockDetailVisible" width="80%" :append-to-body="true">
      <nt-form ref="stockDetail" v-if="dialogStockDetailVisible" :rowData="stockDetailRow" :modeList="{}" :pageColumn="page_column_stock_detail" :selectList="select_list_stock_detail" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onStockDetailFormEvent"></nt-form>
    </el-dialog>
    <el-dialog title="配送建议算法说明" :visible.sync="dialogSuggestVisible" width="80%" :append-to-body="true">
      <p>定义：</p>
      <p>1、周日均销量：</p>
      <p style="padding-left: 20px">a、销售满一周：取7日均值，即加气站提报时间前一个零点至168小时前（七天）区间内销量除以7</p>
      <p style="padding-left: 20px">b、销售不满一周：取销售日期日均值，即加气站提报时间前一个零点至有第一笔订单的前第一个零点除以（加气站提报日期减产生订单日期）</p>
      <p>2、存量：</p>
      <p style="padding-left: 20px">站端当日期初库存数+当日配送量（当日配送量=“期望到站时间”为当日的LNG计划订单出港重量）</p>
      <p>3、存销比：</p>
      <p style="padding-left: 20px">存量/周日均销量</p>
      <p>计划建议判定标准：</p>
      <p>1、“建议调整或取消”：超出周日均销量X对应的存销比系数上限</p>
      <em-table-list :custTableTitle="'刷新获取最新配置'" :tableListName="'planSubmitLimitConfig'" ref="pslConfig" :axios="axios" :queryCustURL="queryPSLCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="4" :page_column="psl_page_column" :select_list="select_list" @onListEvent="onListEvent" @updateColumnValue="updatePSLColumnValue" @onReqParams="onReqParams"></em-table-list>
      <p>2、“建议优先配送”：低于库存下限</p>
      <p v-for="(item, index) in suggestArr" :key="index">({{index + 1}}) {{item}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSuggestVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, isTypeof, callbackPagesInfo, custFormBtnList, exportBlobToFiles } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $strategyOrderConfirm, $strategyOrderCancel, $strategyPurchaseLeave, $strategyModifyPurchase, $strategyCheckReachPurchase, $strategyExceptionPurchase, $strategyExceptionFindPurchase, $strategyPurchaseFind, $strategyPurchaseExport, $purchaseProposeDetailFind } from '@/service/strategy'

export default {
  name: 'lngPlan',
  data() {
    return initVueDataOptions(this, {
      queryPSLCustURL: {
        list: {
          url: 'strategy/purchase_limit_config/list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '计划提报限制'
      },
      queryCustURL: {
        list: {
          url: 'strategy/purchase/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: 'LNG计划管理'
      },
      queryChangeCustURL: {
        list: {
          url: 'strategy/purchase_operate/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '变更记录'
      },
      dataList: [{
        name: '计划编号：',
        field: 'id'
      }, {
        name: '计划状态：',
        field: 'statusLabel'
      }, {
        name: '加气站名称：',
        field: 'nickName'
      }],
      headerStyle: 'position: relative;top: 0;left: 0;background-color: #f4f4f5;border-radius: 4px;',
      buttonsList: [{ type: 'primary', icon: '', event: 'export', name: '导出' }],
      dialogDetailVisible: false,
      detailRow: {},
      dialogDeparturesVisible: false,
      departuresRow: {},
      dialogCompleteVisible: false,
      completeRow: {},
      changeRow: {},
      dialogChangeVisible: false,
      lngInfoRow: {},
      dialogInfoVisible: false,
      cancelRow: {},
      dialogCancelVisible: false,
      leaveRow: {},
      dialogLeaveVisible: false,
      checkRow: {},
      dialogCheckVisible: false,
      anomalousRow: {},
      dialogAnomalousVisible: false,
      dialogOperateVisible: false,
      page_detail_column: [],
      detail_mode_list: [],
      currParams: {},
      dialogStockDetailVisible: false,
      stockDetailRow: {},
      rangeSign: ' ≤ X < ',
      dialogSuggestVisible: false,
      suggestArr: []
    })
  },
  computed: {
    ...mapGetters({
      psl_page_column: 'pslConfig_column',
      mode_list: 'filler_lngPlan_mode_list',
      mode_change_list: 'filler_lng_plan_change_mode_list',
      mode_info_list: 'filler_lng_plan_info_mode_list',
      mode_leave_list: 'filler_lng_plan_leave_mode_list',
      mode_cancel_list: 'filler_lng_plan_cancel_mode_list',
      mode_check_list: 'filler_lng_plan_check_mode_list',
      mode_anomalous_list: 'filler_lng_plan_anomalous_mode_list',
      page_status: 'filler_lngPlan_page_status',
      page_column: 'filler_lngPlan_column',
      page_column_change: 'filler_lng_plan_change_column',
      page_column_info: 'filler_lng_plan_info_column',
      page_column_cancel: 'filler_lng_plan_cancel_column',
      page_column_leave: 'filler_lng_plan_leave_column',
      page_column_check: 'filler_lng_plan_check_column',
      page_column_anomalous: 'filler_lng_plan_anomalous_column',
      page_change_info_column: 'filler_lng_plan_change_list_column',
      page_column_stock_detail: 'lngStockDetail_column',
      select_list_stock_detail: 'lngStockDetail_select_list',
      select_list: 'filler_lngPlan_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'enter') {
        $strategyPurchaseFind({ id: row.id }).then(response => {
          this.lngInfoRow = response.data && response.data.purchase
          this.lngInfoRow._btn = custFormBtnList(2)
          this.dialogInfoVisible = true
        })
      } else if (type === 'cancel') {
        $strategyPurchaseFind({ id: row.id }).then(response => {
          this.cancelRow = response.data && response.data.purchase
          this.cancelRow._btn = custFormBtnList()
          this.dialogCancelVisible = true
        })
      } else if (type === 'self_detail') {
        this.detailEvent(row)
      } else if (type === 'in_weight' || type === 'update_weight') {
        $strategyPurchaseFind({ id: row.id }).then(response => {
          const tmpData = Object.assign({}, row, response.data && response.data.purchase)
          this.leaveEvent(tmpData)
        })
      } else if (type === 'check') {
        $strategyPurchaseFind({ id: row.id }).then(response => {
          const tmpData = Object.assign({}, row, response.data && response.data.purchase)
          this.checkEvent(tmpData)
        })
      } else if (type === 'complete') {
        this.completeEvent(row)
      } else if (type === 'change') {
        this.changeEvent(row)
      } else if (type === 'exception') {
        this.anomalousEvent(row)
      } else if (type === 'export') {
        this.exportEvent(row)
      } else if (type === 'change_list') {
        this.changeInfoList(row)
      } else if (type == 'propose') {
        row._btn = custFormBtnList(2)
        this.stockDetailRow.gasstationName = row.gasstationName
        this.stockDetailFind(row)
      } else if (type == 'suggest') {
        this.dialogSuggestVisible = true
      }
    },
    updatePSLColumnValue(dataList, callback) {
      this.suggestArr = []
      this.ruleDeal(dataList)
      dataList.forEach(item => {
        item.qtyAvgRange = item.qtyAvgBegin + this.rangeSign + item.qtyAvgEnd
        item.minStock = '≤' + item.minStock
        this.suggestArr.push(`周日均销量${item.qtyAvgRange}吨，存量${item.minStock}`)
      })
      callback(dataList)
    },
    ruleDeal(dataList) {
      let str = ''
      const ruleArr = []
      dataList.length > 2 && dataList.forEach((item, index) => {
        if (dataList.length - index > 2) {
          str += `(${dataList[1 + index].qtyAvgEnd} - ${dataList[1 + index].qtyAvgBegin}) * ${dataList[1 + index].rate} + `
          ruleArr.push(str)
        }
      })
      dataList.length > 0 && dataList.forEach((item, index) => {
        if (index == 0) {
          item.limitStock = `日均销量 * ${item.rate}`
        } else {
          item.limitStock = `${dataList[0].qtyAvgEnd} * ${dataList[0].rate} ${ruleArr[index - 2] ? '+' + ruleArr[index - 2] : ' + '} (日均销量 - ${item.qtyAvgBegin}) * ${item.rate}`
        }
      })
    },
    // 存在计划变更，处理变更记录
    changeEvent(row) {
      $strategyPurchaseFind({ id: row.id }).then(response => {
        const purchase = response.data && response.data.purchase
        const operateList = response.data && response.data.operateList
        const purchaseDuplicate = response.data && response.data.purchaseDuplicate
        if (operateList.length > 0) {
          operateList.forEach(item => {
            if (item.type == 40 || item.type == 70) {
              row.modifyCreateTime = item.operatorTime
              row.modifyCreateNote = item.note
            }
          })
        }

        row.modifyApplyType = purchaseDuplicate.modifyApplyType
        row.modifyPlanTime = purchaseDuplicate.planTime
        row.modifyDownloadContactName = purchaseDuplicate.downloadContactName
        row.modifyDownloadContactPhone = purchaseDuplicate.downloadContactPhone
        this.changeRow = Object.assign({}, row, purchase)
        this.changeRow._btn = custFormBtnList()
        // eslint-disable-next-line no-prototype-builtins
        if (!this.changeRow.hasOwnProperty('handleType')) {
          this.$set(this.changeRow, 'handleType', '1')
        }
        this.dialogChangeVisible = true
      })
    },
    // 处理变更信息
    onListEventChange(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.change.$refs.changeForm.validate((valid) => {
          if (valid) {
            const params = {
              handleType: row.handleType,
              rejectNote: row.rejectNote,
              purchase: { id: row.id }
            }

            $strategyModifyPurchase(params).then(response => {
              this.$message.success('成功!')

              this.$refs.lngPlan.initDataList()
            })
            this.dialogChangeVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.dialogChangeVisible = false
      }
    },
    // LNG确认订单
    onListEventInfo(btnObj, row) {
      const params = { purchase: { id: row.id } }

      $strategyOrderConfirm(params).then(response => {
        this.$message.success('成功!')

        this.$refs.lngPlan.initDataList()
      })
      this.dialogInfoVisible = false
    },
    // 录入磅单信息
    leaveEvent(row) {
      this.leaveRow = row
      this.leaveRow._btn = custFormBtnList()
      this.dialogLeaveVisible = true
    },
    // LNG计划取消
    onListCancelLeave(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.cancel.$refs.cancelForm.validate((valid) => {
          if (valid) {
            const params = { note: row.note, purchase: { id: row.id } }

            $strategyOrderCancel(params).then(response => {
              this.$message.success('成功!')

              this.$refs.lngPlan.initDataList()
            })
            this.dialogCancelVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.dialogCancelVisible = false
      }
    },
    // 提交录入磅单信息
    onListEventLeave(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.leave.$refs.leaveForm.validate((valid) => {
          if (valid) {
            console.log(row)
            const params = {
              purchase: {
                id: row.id,
                uploadUrl: (row.uploadUrl && row.uploadUrl[0]) ? row.uploadUrl[0].url : '',
                uploadWeight: row.uploadWeight,
                driverName: row.driverName,
                lngFromCode: row.lngFromCode,
                lngFromName: row.lngFromName,
                driverPhone: row.driverPhone,
                leaveTime: row.leaveTime,
                carNumber: row.carNumber,
                trailerNumber: row.trailerNumber
              }
            }

            $strategyPurchaseLeave(params).then(response => {
              this.$message.success('成功!')

              this.$refs.lngPlan.initDataList()
            })
            this.dialogLeaveVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.dialogLeaveVisible = false
      }
    },
    // 核对磅单信息
    checkEvent(row) {
      this.checkRow = row
      // eslint-disable-next-line no-prototype-builtins
      if (!this.checkRow.hasOwnProperty('checkType')) {
        this.$set(this.checkRow, 'checkType', '1')
      }
      this.checkRow._btn = custFormBtnList()
      this.dialogCheckVisible = true
    },
    // 提交核对磅单信息
    onListEventCheck(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.check.$refs.checkForm.validate((valid) => {
          if (valid) {
            const params = {
              checkType: row.checkType,
              note: row.note,
              purchase: { id: row.id }
            }

            $strategyCheckReachPurchase(params).then(response => {
              this.$message.success('成功!')

              this.$refs.lngPlan.initDataList()
            })
            this.dialogCheckVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.dialogCheckVisible = false
      }
    },
    // 完成计划
    completeEvent(row) {
      this.completeRow = row
      this.completeRow._btn = custFormBtnList()
      this.dialogAnomalousVisible = true
    },
    // 异常处理
    anomalousEvent(row) {
      $strategyExceptionFindPurchase({ purchaseId: row.id }).then(response => {
        this.anomalousRow = Object.assign({}, row, response.data.purchase)
        this.anomalousRow._btn = custFormBtnList()
        if (response.data && response.data.purchaseException) {
          this.anomalousRow.exceptionId = response.data.purchaseException.id
          this.anomalousRow.exceptionApplyNote = response.data.purchaseException.exceptionApplyNote
          this.anomalousRow.exceptionApplyTime = response.data.purchaseException.exceptionApplyTime
        }
        // eslint-disable-next-line no-prototype-builtins
        if (!this.anomalousRow.hasOwnProperty('bearType')) {
          this.$set(this.anomalousRow, 'bearType', 1)
        }
        this.dialogAnomalousVisible = true
      })
    },
    // 提交异常处理
    onListEventAnomalous(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.anomalous.$refs.anomalousForm.validate((valid) => {
          if (valid) {
            const params = {
              purchase: { id: row.id },
              purchaseException: {
                id: row.exceptionId,
                purchaseId: row.id,
                bearType: row.bearType,
                exceptionApplyTime: row.exceptionApplyTime,
                exceptionApplyNote: row.exceptionApplyNote
              }
            }
            if (row.bearType == 1) {
              params.purchaseException.checkWeight = row.exceptionCheckWeight
              params.purchaseException.checkNote = row.exceptionCheckNote
            } else if (row.bearType == 2) {
              params.purchaseException.checkWeight = row.exceptionCheckWeight
              params.purchaseException.checkNote = row.exceptionCheckNote
              params.purchaseException.exceptionHandleUrl = row.exceptionHandleUrl && row.exceptionHandleUrl[0] ? row.exceptionHandleUrl[0].url : ''
            } else if (row.bearType == 3) {
              params.purchase.uploadWeight = row.exceptionUploadWeight
              params.purchase.lngFromCode = row.exceptionLngFromCode
              params.purchase.lngFromName = row.exceptionLngFromName
              params.purchase.uploadUrl = row.exceptionUploadUrl && row.exceptionUploadUrl[0] ? row.exceptionUploadUrl[0].url : ''
            }

            $strategyExceptionPurchase(params).then(response => {
              this.$message.success('成功!')

              this.$refs.lngPlan.initDataList()
            })
            this.dialogAnomalousVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.dialogAnomalousVisible = false
      }
    },
    // 详情信息操作记录
    operateEvent(data) {
      const tmpDetailCol = []
      const tmpDetailInfo = {}

      if (data.operateList && data.operateList.length > 0) { // 操作信息详情
        data.operateList.forEach((item, index) => {
          this.detailModeList(item.type, index)
          if (item.type == 55 || item.type == 60 || item.type == 80 || item.type == 90) {
            tmpDetailCol.push({ field: 'operatorType' + item.type + '_' + index, name: '变更处理', hide: true, nameSpan: 6, detail: { type: 'span', serial: (20 + Number(index)), ou: item.type + '_' + index } })
            tmpDetailInfo['operatorType' + item.type + '_' + index] = item.typeName
          } else if (item.type == 130 || item.type == 140) {
            tmpDetailCol.push({ field: 'operatorType' + item.type + '_' + index, name: '核对处理', hide: true, nameSpan: 6, detail: { type: 'span', serial: (20 + Number(index)), ou: item.type + '_' + index } })
            tmpDetailInfo['operatorType' + item.type + '_' + index] = item.typeName
          }
          tmpDetailCol.push({ field: 'operatorName' + item.type + '_' + index, name: '操作人', hide: true, nameSpan: 6, detail: { type: 'span', serial: (20 + Number(index)), ou: item.type + '_' + index } })
          tmpDetailCol.push({ field: 'operatorTime' + item.type + '_' + index, name: item.operateTimeName, hide: true, nameSpan: 6, detail: { type: 'span', serial: (20 + Number(index)), ou: item.type + '_' + index, formatFun: 'formateTData all', stype: 'format' } })

          tmpDetailInfo['operatorName' + item.type + '_' + index] = item.operatorName
          tmpDetailInfo['operatorTime' + item.type + '_' + index] = item.operatorTime
          if (item.type == 125) {
            tmpDetailInfo.operatorReachTime = item.operatorTime
          }

          if (item.type == 20 || item.type == 40 || item.type == 60 || item.type == 70 || item.type == 90 || item.type == 130 || item.type == 150) {
            let fieldName = ''
            if (item.type == 20) {
              fieldName = '计划修改备注'
            } else if (item.type == 40) {
              fieldName = '提报变更备注'
            } else if (item.type == 70) {
              fieldName = '提报取消备注'
            } else if (item.type == 150) {
              fieldName = '申报原因'
            } else if (item.type == 60 || item.type == 90 || item.type == 130) {
              fieldName = '驳回原因'
            }

            tmpDetailCol.push({ field: 'note' + item.type + '_' + index, name: fieldName, hide: true, nameSpan: 6, detail: { type: 'span', serial: (20 + Number(index)), ou: item.type + '_' + index } })
            tmpDetailInfo['note' + item.type + '_' + index] = item.note
          }
        })
      }

      return {
        col: tmpDetailCol,
        info: tmpDetailInfo
      }
    },
    // 异常处理操作记录
    exceptionEvent(data) {
      const tmpDetailCol = []
      const tmpDetailInfo = {}

      if (data.purchase && data.purchase.status != 8) {
        const ouIndex = 1000 + '_' + 1

        if (data.purchaseException) {
          const exceptionInfo = data.purchaseException
          tmpDetailCol.push({ field: 'exceptionBearTypeName', name: '处理方式', hide: true, nameSpan: 6, detail: { type: 'span', serial: 100, ou: ouIndex } })
          tmpDetailCol.push({ field: 'exceptionApplyTime', name: '异常申报时间', hide: true, nameSpan: 6, detail: { type: 'span', serial: 101, ou: ouIndex, formatFun: 'formateTData all', stype: 'format' } })
          tmpDetailCol.push({ field: 'exceptionApplyNote', name: '申报原因', hide: true, nameSpan: 6, detail: { type: 'span', serial: 102, ou: ouIndex } })

          tmpDetailInfo.exceptionApplyTime = exceptionInfo.exceptionApplyTime
          tmpDetailInfo.exceptionApplyNote = exceptionInfo.exceptionApplyNote

          this.detailModeList(1000, 1)
          if (exceptionInfo.bearType == 1) {
            tmpDetailCol.push({ field: 'exceptionCheckWeight', name: '核准气量(公斤)', hide: true, nameSpan: 6, detail: { type: 'span', serial: 103, ou: ouIndex } })
            tmpDetailCol.push({ field: 'exceptionCheckNote', name: '处理答复', hide: true, nameSpan: 6, detail: { type: 'span', serial: 104, ou: ouIndex } })
            tmpDetailInfo.exceptionCheckWeight = exceptionInfo.checkWeight
            tmpDetailInfo.exceptionCheckNote = exceptionInfo.checkNote

            tmpDetailInfo.exceptionBearTypeName = '加气站承担'
          } else if (exceptionInfo.bearType == 2) {
            tmpDetailCol.push({ field: 'exceptionCheckWeight', name: '核准气量(公斤)', hide: true, nameSpan: 6, detail: { type: 'span', serial: 104, ou: ouIndex } })
            tmpDetailCol.push({ field: 'exceptionHandleUrl', name: '上传凭证附件', hide: true, nameSpan: 6, detail: { type: 'span', model: 'img', serial: 103, ou: ouIndex } })
            tmpDetailCol.push({ field: 'exceptionCheckNote', name: '处理答复', hide: true, nameSpan: 6, detail: { type: 'span', serial: 105, ou: ouIndex } })
            tmpDetailInfo.exceptionCheckWeight = exceptionInfo.checkWeight
            tmpDetailInfo.exceptionHandleUrl = exceptionInfo.exceptionHandleUrl
            tmpDetailInfo.exceptionCheckNote = exceptionInfo.checkNote

            tmpDetailInfo.exceptionBearTypeName = '平台承担'
          } else if (exceptionInfo.bearType == 3) {
            tmpDetailCol.push({ field: 'uploadWeight', name: '出港重量(公斤)', hide: true, nameSpan: 6, detail: { type: 'span', serial: 104, ou: ouIndex } })
            tmpDetailCol.push({ field: 'uploadUrl', name: '修正出港磅单', hide: true, nameSpan: 6, detail: { type: 'span', model: 'img', serial: 103, ou: ouIndex } })
            tmpDetailCol.push({ field: 'lngFromName', name: '液原地', hide: true, nameSpan: 6, detail: { type: 'span', serial: 105, ou: ouIndex } })

            tmpDetailInfo.exceptionBearTypeName = '修正出港数据'
          }
        }
      }

      return {
        col: tmpDetailCol,
        info: tmpDetailInfo
      }
    },
    // 详情信息显示
    detailEvent(row) {
      $strategyPurchaseFind({ id: row.id }).then(response => {
        const data = response.data || {}

        this.detail_mode_list.push(...this.mode_list)
        this.page_detail_column.push(...this.page_column)

        const operation = this.operateEvent(data)
        const exception = this.exceptionEvent(data)

        this.page_detail_column.push(...operation.col) // 动态生成detail信息
        this.page_detail_column.push(...exception.col) // 动态生成detail信息

        this.detailRow = Object.assign({}, data.purchase, operation.info, exception.info)
        this.detailRow._btn = custFormBtnList(1)
        this.dialogDetailVisible = true
      })
    },
    // 详细信息modelist
    detailModeList(type, index) {
      const typeInfo = {
        10: '计划提报',
        15: '计划锁定',
        20: '计划修改',
        30: '计划确认',
        40: '提报变更',
        50: '变更确认',
        60: '变更驳回',
        70: '提报取消',
        80: '取消确认',
        90: '取消驳回',
        100: '出港录入',
        110: '出港修改',
        120: '到站录入',
        125: '签收计划',
        130: '核对退回',
        140: '核对确认',
        150: '异常申报',
        160: '异常处理',
        170: '取消计划',
        180: '完成计划',
        1000: '异常申报处理'
      }

      this.detail_mode_list.push({ ou: type + '_' + index, name: typeInfo[type], status: 3 })
    },
    // 取消详情dialog
    onListEventDetail() {
      this.page_detail_column = []
      this.detail_mode_list = []
      this.dialogDetailVisible = false
    },
    // 导出信息
    exportEvent() {
      const params = this.currParams

      $strategyPurchaseExport(params).then(response => {
        const fileName = 'LNG_' + Date.parse(new Date()) + '.xlsx'

        exportBlobToFiles(response, fileName)
      })
    },
    // 变更明细
    changeInfoList(row) {
      if (this.select_list && this.select_list.planStatus) {
        this.select_list.planStatus.forEach(item => {
          if (item.value == row.status) {
            row.statusLabel = item.label
          }
        })
      }
      this.changeInfoRow = row
      this.dialogOperateVisible = true
    },
    onStockDetailFormEvent() {
      this.dialogStockDetailVisible = false
    },
    stockDetailFind(row) {
      // 获取加气站日均销量存量详情
      const params = { purchaseId: row.id }
      $purchaseProposeDetailFind(params).then(res => {
        this.dialogStockDetailVisible = true
        Object.assign(this.stockDetailRow, res.data)
      })
    },
    // 回调参数
    onReqParams(type, _this, callback) {
      const querys = { param: { dateParam: { createDateFrom: '', createDateTo: '' }, purchase: {} } }
      const dateTypeInfo = {
        createTime: 2,
        lockTime: 3,
        modifyApplyTime: 4,
        confirmTime: 5,
        leaveTime: 6,
        uploadTime: 7,
        reachTime: 8,
        completeTime: 9,
        cancelTime: 10,
        exceptionApplyTime: 11
      }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createTime' || k == 'lockTime' || k == 'modifyApplyTime' || k == 'confirmTime' || k == 'uploadTime' || k == 'reachTime' || k == 'completeTime' || k == 'cancelTime' || k == 'exceptionApplyTime') {
            if (v) {
              querys.param.operateTimeType = dateTypeInfo[k]
              querys.param.dateParam.createDateFrom = v[0]
              querys.param.dateParam.createDateTo = v[1]
            }
          } else if (k == 'leaveTime') {
            if (v) {
              querys.param.leaveTimeFrom = v[0]
              querys.param.leaveTimeTo = v[1]
            }
          } else if (k == 'planTime') {
            if (v) {
              querys.param.planTimeFrom = v[0]
              querys.param.planTimeTo = v[1]
            }
          } else {
            if (v !== '') querys.param[k] = v
          }
        }
      }

      this.currParams = querys.param
      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    // 操作的回调参数
    onReqChangeParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { purchaseId: this.changeInfoRow.id } })
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
