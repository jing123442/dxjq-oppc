<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo"></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderFiller'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="导出下载" :visible.sync="dialogExportDownVisible" :width="add_edit_dialog" :append-to-body="true">
      <el-form ref="exportCar" v-if="dialogExportDownVisible" :model="exportRow" size="small" label-position="left">
        <el-form-item>
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">当前导出数据区间为：</span>
          </div>
          <div style="padding-left: 20px;">根据您的需要，勾选数据进行下载</div>

          <el-checkbox-group v-model="exportRow.modelList" style="padding: 10px 20px;">
            <el-checkbox label="1">对账函模板</el-checkbox>
            <el-checkbox label="2">结算明细</el-checkbox>
            <el-checkbox label="3">提现明细</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in exportRow._btn.list" :key="index" :type="btnItem.bType"
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
import { axiosRequestParams, callbackPagesInfo, isTypeof, formatPeriodDate, custFormBtnList } from '@/utils/tools'
import { $gwayOrderTotal } from '@/service/settle'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'orderFiller',
  components: { TableTotalData },
  data() {
    return {
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
      buttonsList: [/* { type: 'primary', icon: '', event: 'add_info', name: '增加企业' } */],
      axios: axiosRequestParams(this),
      queryParams: Function,
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
        modelList: []
      },
      btnList: custFormBtnList()
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_filler_mode_list',
      page_status: 'order_filler_page_status',
      page_column: 'order_filler_column',
      select_list: 'order_filler_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      const params = { orgId: row.gasstationId, periodYear: row.periodYear, periodMonth: row.periodMonth }

      if (type === 'detail') {
        this.$router.push({
          path: 'orderFiller/fillerDetailList',
          query: params
        })
      } else if (type === 'withdraw') {
        this.$router.push({
          path: 'orderFiller/fillerWithdrawList',
          query: params
        })
      } else if (type === 'down') {
        this.exportRow._btn = this.btnList
        this.dialogExportDownVisible = true
      }
    },
    btnClickEvent() {
      console.log(this.exportRow)
      this.dialogExportDownVisible = false
    },
    initTotalData(params) {
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

      this.initTotalData(querys)

      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
