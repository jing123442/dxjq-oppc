<template>
  <div class="template-main">
    <table-total-data
      ref="tables1"
      :dataList="dataList"
      :rowData="orderInfo"
      :headerStyle="'top: 160px;'"
    ></table-total-data>
    <em-table-list ref="tables" :tableListName="'orderList'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="导出订单" class="exportOrderFieldDialog" :append-to-body="true" :visible.sync="exportOrderFieldDialog" width="add_edit_dialog">
      <div class="content1">
        <el-alert
          :closable="false"
          title="若导出时间过长或失败，请减少导出条数再试"
          type="warning">
        </el-alert>
        <div class="dataNum">当前筛选{{filterDataNum}}条数据</div>
        <div class="little-title">导出字段：</div>
        <div class="field-box">
          <el-tag v-for="(item, index) in fieldList" :key="index" :type="item.checked ? '' : 'info'" @click.native="clickTag(item, fieldList)">{{item.name}}</el-tag>
          <span class="c-btn" @click="showOtherField = !showOtherField">{{showOtherField ? '收起' : '展开'}}</span>
          <div class="otherFieldBox" v-if="showOtherField">
            <el-tag v-for="(item, index) in otherFieldList" :key="index" :type="item.checked ? '' : 'info'" @click.native="clickTag(item, fieldList)">{{item.name}}</el-tag>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectFieldBtn">确定导出</el-button>
          <el-button @click="exportOrderFieldDialog = false">取消</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="操作记录" :visible.sync="dialogInfoVisible" width="850px" :append-to-body="true">
      <el-form :inline="true" label-width="70px" size="small" style="flex:1">
        <el-form-item class="form-line" label="订单编号">{{ backRow.orderId }}</el-form-item>
        <el-form-item class="form-line" label="结算状态">{{ backRow.settleStatus }}</el-form-item>
<!--        <el-form-item class="form-line" label="物流公司">{{ backRow.carrierName }}</el-form-item>-->
        <el-form-item class="form-line" label="车牌号">{{ backRow.cardNumber }}</el-form-item>
        <div style="width: 100%;border-bottom: 1px solid #d2d2d2;margin-top: 10px;margin-bottom: 10px;"></div>
      </el-form>
      <div class="nt-list-wrap" style="padding-bottom: 15px;">
        <el-table :data="tableData" border style="width: 100%" size="small" :header-cell-style="{ backgroundColor: 'rgb(246, 246, 246)' }">
          <el-table-column label="操作完成时间">
            <template slot-scope="scope">
              {{ scope.row.operatorDate | formateTData('all') }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="操作类型"></el-table-column>
          <el-table-column prop="amount" label="操作金额（元）"></el-table-column>
          <el-table-column label="支付方式">
            <template slot-scope="scope">
              {{ payTypeToLabel(scope.row.payType) }}
            </template>
          </el-table-column>
          <el-table-column label="审批凭证">
            <template slot-scope="scope">
              <el-image v-if="scope.row.refundUrl" :src="refundUrl(scope.row, 1)" :preview-src-list="refundUrl(scope.row)">查看</el-image>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="操作人"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof, custFormBtnList, callbackPagesInfo, getDateRange, getDaysBetween, exportBlobToFiles } from '@/utils/tools'
import { $excelOrderDownload } from '@/service/strategy'
import { $payRefundLog } from '@/service/pay'
import { mapGetters } from 'vuex'
import { utilsOrderStatus, utilsPayType } from '@/utils/select'
import { TableTotalData } from '@/components'
export default {
  name: 'order',
  components: { TableTotalData },
  data() {
    return {
      dataList: [
        {
          name: '加气总量：',
          field: 'allQty',
          unit: ' 公斤'
        },
        {
          name: '加气总金额：',
          field: 'allValue',
          unit: ' 元'
        },
        {
          name: '加气总优惠：',
          field: 'allPrefer',
          unit: ' 元'
        }
      ],
      orderInfo: {
        allValue: 0,
        allQty: 0,
        allPrefer: 0
      },
      queryCustURL: {
        list: {
          // url: '/pay/gas_order/list_withtime',
          url: 'strategy/flag_order/get_order_list',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        },
        name: '订单管理'
      },
      axios: axiosRequestParams(this),
      bottonList: custFormBtnList(),
      queryParams: Function,
      buttonsList: [{ type: 'primary', icon: '', event: 'export_order', name: '导出订单' }],
      exportOrderFieldDialog: false,
      fieldList: [],
      otherFieldList: [],
      filterDataNum: 0,
      showOtherField: false,
      datas: [],
      backRow: {},
      tableData: [],
      dialogInfoVisible: false,
      gasstationId: this.$store.state.app.stationId
    }
  },
  computed: {
    ...mapGetters({
      page_status: 'order_list_page_status',
      page_column: 'order_station_list_column',
      select_list: 'order_station_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      // del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  mounted() {
    this.initTotalData('init')
    this.otherFieldList = [{ field: 'platformPrice', name: '平台挂牌价', checked: false },
      { field: 'actualPrice', name: '平台结算价', checked: false }]
  },
  methods: {
    initTotalData(val) {
      const response = this.$refs.tables.tableListResponse
      this.fieldList = []
      this.$refs.tables && this.$refs.tables.columnOptions.forEach(item => {
        if (!item.hide && item.field !== 'useropts' && item.name) {
          item.checked = true
          this.fieldList.push(item)
        }
      })
      if (response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data) {
            this.orderInfo = { ...response.data }
          } else {
            this.orderInfo = { allValue: 0, allQty: 0, allPrefer: 0 }
          }
          this.filterDataNum = response.data.page.total
        }
      } else {
        if (val) {
          this.times = setTimeout(() => {
            this.initTotalData(val)
          }, 200)
        } else {
          this.times = setTimeout(() => {
            this.initTotalData()
          }, 200)
        }
      }
    },
    payTypeToLabel(type) {
      const payList = utilsPayType()
      const tmpInfo = payList.find(item => item.value === type)

      return tmpInfo ? tmpInfo.label : '-'
    },
    settleStatusToLabel(type) {
      const settleList = utilsOrderStatus()
      const tmpInfo = settleList.find(item => Number(item.value) === Number(type))

      return tmpInfo ? tmpInfo.label : '-'
    },
    refundUrl(row, type = 2) {
      if (row.refundUrl) {
        const tmpUrl = row.refundUrl.split(',')
        return type === 1 ? tmpUrl[0] : tmpUrl
      }
      return type === 1 ? '' : []
    },
    onListEvent(type, row) {
      this.backRow = row

      console.log(row, 888888)
      switch (type) {
        case 'export_order' :
          this.exportOrderFieldDialog = true
          break
        case 'opt' :
          this.dialogInfoVisible = true
          $payRefundLog({ orderId: row.orderId }).then(res => {
            this.tableData = res.data || []
          })
          break
        default :
          break
      }
    },
    onReqParams(type, _this, callback) {
      const params = this.parseSearch(_this)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
      // 刷新统计数据
      if (this.$refs.tables && this.$refs.tables.tableListResponse) {
        this.$refs.tables.tableListResponse = null
        this.initTotalData()
      }
    },
    parseSearch(_this) {
      // const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { gasstationId: this.gasstationId }, dateParam: {} } })
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasstationId: this.gasstationId } })
      if (isTypeof(_this.finds) === 'object') {
        // eslint-disable-next-line no-redeclare
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'createTime') {
            if (_this.finds.createTime) {
              params.param.timeType = 2
              if (getDaysBetween(v[0], v[1]) > 31) {
                this.$message.error('搜索的日期范围必须小于31天,已为您选择近一个月的数据')
                params.param.startTime = getDateRange(31).startdate
                params.param.endTime = getDateRange(31).enddate
              } else {
                params.param.startTime = v[0]
                params.param.endTime = v[1]
              }
            }
          } else if (k === 'payTime') {
            if (_this.finds.payTime) {
              params.param.timeType = 1
              if (getDaysBetween(v[0], v[1]) > 31) {
                this.$message.error('搜索的日期范围必须小于31天,已为您选择近一个月的数据')
                params.param.startTime = getDateRange(31).startdate
                params.param.endTime = getDateRange(31).enddate
              } else {
                params.param.startTime = v[0]
                params.param.endTime = v[1]
              }
            }
          } else if (k === 'payTime') {
            if (_this.finds.payTime) {
              params.param.timeType = 1
              if (getDaysBetween(v[0], v[1]) > 31) {
                this.$message.error('搜索的日期范围必须小于31天,已为您选择近一个月的数据')
                params.param.startTime = getDateRange(31).startdate
                params.param.endTime = getDateRange(31).enddate
              } else {
                params.param.startTime = v[0]
                params.param.endTime = v[1]
              }
            }
          } else if (v && k === 'orderId') {
            params.param.selType = 2
            params.param.selStr = v
          } else if (v && k === 'carNumber') {
            params.param.selType = 1
            params.param.selStr = v
          } else if (v && k === 'driver') {
            params.param.selType = 3
            params.param.selStr = v
          } else if (v && k === 'cashierName') {
            params.param.selType = 4
            params.param.selStr = v
          } else {
            if (!v) {
              delete params.param[k]
            } else {
              params.param[k] = v
            }
          }
        }
      }
      return params
    },
    clickTag(item, arr) {
      item.checked = !item.checked
      this.fieldList = [...arr]
    },
    selectFieldBtn() {
      this.datas = {}
      this.fieldList.forEach(item => {
        if (item.checked) {
          this.datas[item.field] = item.name
        }
      })
      this.otherFieldList.forEach(item => {
        if (item.checked) {
          this.datas[item.field] = item.name
        }
      })
      this.excelDownload()
    },
    excelDownload() {
      const params = {
        datas: this.datas,
        // fileName: '订单',
        // interfaceName: '/pay/gas_order/list_withtime',
        pageParam: this.parseSearch(this.$refs.tables)
      }
      $excelOrderDownload(params).then(response => {
        const fileName = '订单' + Date.parse(new Date()) + '.xlsx'

        exportBlobToFiles(response, fileName)
        this.$message.success('导出成功！')
        this.exportOrderFieldDialog = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .exportOrderFieldDialog::v-deep .el-dialog__body {
    margin-top: 0;
  }
  .dataNum {
    margin: 16px 0;
    font-size: 16px;
    font-weight: 400;
    color: #606574;
    .totalDataNum {
      color: #B3B3C6;
    }
  }
  .little-title {
    font-size: 16px;
    font-weight: 400;
    color: #868B9A;
  }
  .dialog-footer {
    margin-bottom: 10px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .el-button {
      width: 48%;
      height: 40px;
      border-radius: 6px;
    }
  }
  .field-box {
    margin-top: 10px;
    margin-left: -8px;
    margin-right: -8px;
    .el-tag {
      cursor: pointer;
      margin: 5px 8px;
    }
  }
  .c-btn {
    margin-left: 10px;
    color: #0084F4;
    cursor: pointer;
  }
  .content1 {
    padding-bottom: 15px;
  }
</style>
