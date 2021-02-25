<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'left: 230px;top: 108px;'" :detailInfo="'结算订单为成功支付后订单'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderBussiness'" custTableTitle="长城奥扬与象群科技结算订单" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="导出下载" :visible.sync="dialogExportDownVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportDown" v-if="dialogExportDownVisible" :model="exportRow" :rules="exportRowRules" size="small" label-position="left">
        <el-form-item prop="modelList" style="margin-bottom: 50px;">
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">当前导出数据区间为：{{exportRow.period}}</span>
          </div>
          <div style="padding-left: 20px;">根据您的需要，勾选数据进行下载</div>

          <el-checkbox-group v-model="exportRow.modelList" style="padding: 10px 20px;">
            <el-checkbox label="11" name="modelList">象群科技订单列表</el-checkbox>
            <el-checkbox label="12" name="modelList">象群科技与长城奥扬对账函</el-checkbox>
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
import { $xqkjOrderTotal, $generateDownloadFile } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderBussiness',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/gas_order/list',
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
        field: 'gwayAmountTotal',
        unit: ' 元'
      }],
      totalInfo: { gasQtyTotal: 0, gwayAmountTotal: 0 },
      dialogExportDownVisible: false,
      exportRow: {
        modelList: []
      },
      exportRowRules: {
        modelList: [{ type: 'array', required: true, message: '请至少选择一个下载内容', trigger: 'change' }]
      },
      currParams: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_bussiness_mode_list',
      page_status: 'order_bussiness_page_status',
      page_column: 'order_bussiness_column',
      select_list: 'order_bussiness_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'export') {
        this.exportRow = Object.assign(this.exportRow, row)
        this.exportRow.period = formatPeriodDateTime(this.currParams.dateParam.periodYear, this.currParams.dateParam.periodMonth)
        this.exportRow._btn = this.formBtnList
        this.dialogExportDownVisible = true
      }
    },
    btnClickEvent(obj, row) {
      if (obj.type == 'ok') {
        this.$refs.exportDown.validate(valid => {
          if (valid) {
            const params = []
            row.modelList.forEach(item => {
              const itemPrams = {}
              itemPrams.exportParam = JSON.stringify(this.currParams)
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
      $xqkjOrderTotal(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { gasOrder: { }, dateParam: { } } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'period') {
            const period = formatPeriodDate(_this.finds[k])

            querys.param.dateParam.periodYear = period.periodYear
            querys.param.dateParam.periodMonth = period.periodMonth
          } else {
            if (v !== '') querys.param.gasOrder[k] = v
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
