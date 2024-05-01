<template>
  <div class="template-main">
    <table-total-data :dataList="detailList" :rowData="detailInfo" :headerClass="'top-detail'"></table-total-data>
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 98px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="导出下载" :visible.sync="dialogExportDownVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportDown" v-if="dialogExportDownVisible" :model="exportRow" :rules="exportRowRules" size="small" label-position="left">
        <el-form-item prop="modelList" style="margin-bottom: 50px;">
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">当前导出数据区间为：{{exportRow.period}}</span>
          </div>
          <div style="padding-left: 20px;">根据您的需要，勾选数据进行下载</div>

          <el-checkbox-group v-model="exportRow.modelList" style="padding: 10px 20px;">
            <el-checkbox label="2" name="modelList">物流公司加气站对账函</el-checkbox>
            <el-checkbox label="1" name="modelList">物流公司加气站结算明细</el-checkbox>
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
import { initVueDataOptions, callbackPagesInfo, formatPeriodDateTime } from '@/utils/tools'
import { $carrierGasstationFind, $generateDownloadFile } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
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
      dialogExportDownVisible: false,
      exportRow: {
        modelList: []
      },
      exportRowRules: {
        modelList: [{ type: 'array', required: true, message: '请至少选择一个下载内容', trigger: 'change' }]
      },
      currParams: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'download', name: '导出' }],
      detailList: [{
        currField: 'orgName',
        name: '与',
        field: 'fillerName',
        unit: '结算订单'
      }, {
        name: '数据账期时间：',
        field: 'period',
        unit: ''
      }],
      detailInfo: { orgName: '', fillerName: '', period: '' },
      dataList: [{
        name: '加气量总额：',
        field: 'gasQtyTotal',
        unit: ' 公斤'
      }, {
        name: '平台结算总金额：',
        field: 'amountTotal',
        unit: ' 元'
      }, {
        name: '优惠总金额：',
        field: 'discountTotal',
        unit: ' 元'
      }],
      totalInfo: { gasQtyTotal: 0, amountTotal: 0, discountTotal: 0 }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_carrier_filler_detail_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'download') {
        this.exportRow = Object.assign(this.exportRow, row)
        this.exportRow.period = formatPeriodDateTime(this.$route.query.periodYear, this.$route.query.periodMonth)
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
              if (Number(item) === 2) {
                const tmpCurrParams = { carrierGasstation: this.currParams.gasOrder, dataParam: this.currParams.dateParam }
                itemPrams.exportParam = JSON.stringify(tmpCurrParams)
              } else {
                itemPrams.exportParam = JSON.stringify(this.currParams)
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
    initTotalData() {
      const params = { id: this.$route.query.id }

      // 初始化头部文件
      this.detailInfo = { orgName: this.$route.query.orgName, fillerName: this.$route.query.fillerName, period: formatPeriodDateTime(this.$route.query.periodYear, this.$route.query.periodMonth) }
      $carrierGasstationFind(params).then(response => {
        this.totalInfo = response.data
      })
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { gasOrder: { carrierOrgId: this.$route.query.orgId, gasstationId: this.$route.query.fillerId, tradeType: this.$route.query.tradeType }, dateParam: { periodYear: this.$route.query.periodYear, periodMonth: this.$route.query.periodMonth } } }

      this.initTotalData()

      this.currParams = querys.param
      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
