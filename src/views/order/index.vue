<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo" :headerStyle="'top: 158px;'"></table-total-data>
    <em-table-list ref="tables" :tableListName="'order'" :authButtonList="authButtonList"
    :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL"
    :responseSuccess="response_success" :queryParam="queryParams"
    :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list"
    @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue" :tableBtnEvent="tableBtnEvent"></em-table-list>
    <el-dialog title="加气订单 · 退款执行" :visible.sync="dialogBackVisible" width="700px" :append-to-body="true">
      <el-form v-if="dialogBackVisible" :inline="true" label-width="70px" size="small" style="flex:1">
        <el-form-item class="form-line" label="订单编号">{{ backRow.orderId }}</el-form-item>
        <el-form-item class="form-line" label="结算状态">{{ settleStatusToLabel(backRow.settleStatus) }}</el-form-item>
        <el-form-item class="form-line" label="加气站">{{ backRow.nickName }}</el-form-item>
        <el-form-item class="form-line" label="车牌号">{{ backRow.carNumber }}</el-form-item>
        <div style="width: 100%;border-bottom: 1px solid #d2d2d2;margin-top: 10px;margin-bottom: 10px;"></div>
        <el-form-item class="form-line" label="支付方式">{{ payTypeToLabel(backRow.payType) }}</el-form-item>
        <el-form-item class="form-line" label="支付时间">{{ backRow.updateDate | formateTData('all') }}</el-form-item>
        <el-form-item class="form-line" label="退款金额">{{ backRow.amount }} 元</el-form-item>
        <el-form-item class="form-line" style="width: 100%;margin-top: 8px;" label="">
          <el-upload
            class="upload-demo"
            :action="uploadURL"
            :headers="headers"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            multiple
            :limit="9"
            accept=".png,.jpg,.bmp"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">上传退款审批凭证</el-button>
            <div slot="tip" class="el-upload__tip"><span style="color: red;">*</span> 支持 png、jpg、bmp 格式图片，最多 9 张</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button size="small" @click="close">取消</el-button>
        <el-button type="danger" size="small" @click="clickBack">确认退款</el-button>
      </div>
    </el-dialog>

    <el-dialog title="加气订单 · 操作记录" :visible.sync="dialogInfoVisible" width="850px" :append-to-body="true">
      <el-form :inline="true" label-width="70px" size="small" style="flex:1">
        <el-form-item class="form-line" label="订单编号">{{ backRow.orderId }}</el-form-item>
        <el-form-item class="form-line" label="结算状态">{{ settleStatusToLabel(backRow.settleStatus) }}</el-form-item>
        <el-form-item class="form-line" label="加气站">{{ backRow.nickName }}</el-form-item>
        <el-form-item class="form-line" label="车牌号">{{ backRow.carNumber }}</el-form-item>
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
              <el-image v-if="scope.row.refundUrl" :preview-src-list="scope.row.refundUrl.split(',')">查看</el-image>
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
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'
import { utilsOrderStatus, utilsPayType } from '@/utils/select'
import { $payRefundExecute, $payRefundLog } from '@/service/pay'
import { getSessionStorage } from '@/utils/storage'

export default {
  name: 'order',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'pay/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气订单'
      },
      dataList: [{
        name: '加气总量：',
        field: 'totalGas',
        unit: ' 公斤'
      }, {
        name: '加气总额：',
        field: 'amount',
        unit: ' 元'
      }, {
        name: '加气总优惠：',
        field: 'totalServiceFee',
        unit: ' 元'
      }],
      totalInfo: { totalGas: 0, amount: 0, totalServiceFee: 0 },
      buttonsList: [/* { type: 'primary', icon: '', event: 'add_info', name: '增加企业' } */],
      detailRow: {},
      mode_curr_detail_list: [],
      page_curr_detail_column: [],
      dialogDetailCarrierVisible: false,

      backRow: {},
      headers: {
        Authorization: 'Bearer ' + getSessionStorage('woptoken'),
        Identifier: getSessionStorage('wopidntf')
      },
      fileList: '',
      uploadURL: this.$store.state.file.fileUrl,
      dialogBackVisible: false,

      tableData: [],
      dialogInfoVisible: false
    })
  },
  computed: {
    ...mapGetters({
      order_dialog_column: 'order_dialog_column',
      mode_list: 'order_list_mode_list',
      page_status: 'order_list_page_status',
      page_column: 'order_list_column',
      select_list: 'order_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {
  },
  methods: {
    setFileList(fileList) {
      const tmp = []
      fileList.forEach(item => {
        if (item.response) {
          tmp.push(this.$store.state.file.fileHost + item.response.data)
        }
      })

      this.fileList = tmp.join(',')
    },
    handleSuccess(response, file, fileList) {
      this.setFileList(fileList)
    },
    handleRemove(file, fileList) {
      this.setFileList(fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onListEvent(type, row) {
      this.backRow = row
      if (type === 'back') {
        this.dialogBackVisible = true
      } else if (type === 'info') {
        this.dialogInfoVisible = true
        $payRefundLog({ orderId: row.orderId }).then(res => {
          this.tableData = res.data || []
        })
      }
      this.detailRow = row
    },
    tableBtnEvent(row, option) {
    },
    close() {
      this.dialogBackVisible = false
    },
    clickBack() {
      const params = {
        amount: this.backRow.amount,
        orderId: this.backRow.orderId,
        payType: this.backRow.payType,
        refundUrl: this.fileList,
        type: '退款'
      }
      $payRefundExecute(params).then(res => {
        this.$message.success('退款提交成功')
        this.$refs.tables.initDataList()
        this.dialogBackVisible = false
      })
    },
    payTypeToLabel(type) {
      const payList = utilsPayType()
      const tmpInfo = payList.find(item => item.value === type)

      return tmpInfo ? tmpInfo.label : '-'
    },
    settleStatusToLabel(type) {
      const settleList = utilsOrderStatus()
      const tmpInfo = settleList.find(item => item.value === type)

      return tmpInfo ? tmpInfo.label : '-'
    },
    updateColumnValue(tableData, callback) {
      tableData.forEach((item) => {
        item.orderRealTotal = item.payType == 11 ? (Number(item.amount) - Number(item.comAmount)).toFixed(2) : ''
      })

      callback(tableData)
    },
    initTotalData() {
      const loading = this.$refs.tables ? this.$refs.tables.loading : true
      const response = this.$refs.tables && this.$refs.tables.tableListResponse ? this.$refs.tables.tableListResponse : null

      if (!loading && response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data && response.data.totalInfo) {
            this.totalInfo = response.data.totalInfo
          }
        }
      } else {
        this.times = setTimeout(() => {
          this.initTotalData()
        }, 200)
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { }, dateParam: { createDateFrom: '', createDateTo: '' } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
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
            if (v !== '') params.param.gasOrder[k] = v
          }
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)

      this.initTotalData()
    }
  }
}
</script>
