<template>
  <div class="template-main">
    <table-total-data :dataList="dataList" :rowData="totalInfo"></table-total-data>
    <em-table-list :tableListName="'accountDetail'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog :title="'提现'" :visible.sync="dialogWithdrawDetailVisible" width="60%" :append-to-body="true">
      <el-form size="small" class="result-info" style="padding: 30px 30px 20px;">
        <div class="center">
          <img style="width: 80px; height: 80px" :src="statusIcon[(orderInfo.status || 1)]" fit="fill" />
        </div>
        <div class="title center">{{orderInfo.status == 3 ? '提现成功' : (orderInfo.status == 4 ? '提现失败' : '银行处理中')}}</div>
        <div class="worker center" v-if="orderInfo.status == 3 || orderInfo.status == 4">{{orderInfo.updateDate | formateTData('all')}}</div>
        <div class="worker center" v-else>预计三个工作日后到账</div>
        <div class="detail">
          <el-form-item label="申请时间">{{orderInfo.createDate | formateTData('all')}}</el-form-item>
          <el-form-item label="提现单号">{{orderInfo.withdrawOrderId}}</el-form-item>
          <el-form-item label="提现金额"><span class="price">{{orderInfo.amount}} 元</span></el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, isTypeof, callbackPagesInfo } from '@/utils/tools'
import { $withdrawTotalAmount } from '@/service/pay'
import { TableTotalData } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'accountDetail',
  components: { TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'pay/withdraw_order/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '提现详情'
      },
      statusIcon: {
        1: require('@/assets/images/business/clock@2x.png'),
        2: require('@/assets/images/business/clock@2x.png'),
        3: require('@/assets/images/business/success@2x.png'),
        4: require('@/assets/images/business/fail@2x.png')
      },
      dataList: [{
        name: '提现总额：',
        field: 'total',
        unit: ' 元'
      }, {
        name: '银行处理中：',
        field: 'bankProcessingTotal',
        unit: ' 元'
      }, {
        name: '提现成功：',
        field: 'sucessTotal',
        unit: ' 元'
      }],
      totalInfo: { total: 0, bankProcessingTotal: 0, sucessTotal: 0 },
      orderInfo: {},
      queryParams: Function,
      dialogWithdrawDetailVisible: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_org_mode_list',
      page_status: 'bus_org_page_status',
      page_column: 'bus_accountDetail_column',
      select_list: 'bus_accountDetail_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      page_column_detail: 'bus_orgDetail_column'
    })
  },
  created: function () {},
  methods: {
    totalAmountInfo(datetime, status) {
      const params = {
        dateParam: {
          createDateFrom: datetime ? datetime[0] : null,
          createDateTo: datetime ? datetime[1] : null
        },
        withdrawOrder: {
          status: status || null,
          orgId: this.$route.query.orgId
        }
      }

      this.dataList = []
      $withdrawTotalAmount(params).then(response => {
        this.totalInfo = response.data
        if (!status) {
          // 提现总额
          this.dataList.push({ name: '提现总额：', field: 'total', unit: ' 元' })
        }

        if (!status || status == 12) {
          // 提现银行处理中
          this.dataList.push({ name: '银行处理中：', field: 'bankProcessingTotal', unit: ' 元' })
        }

        if (!status || status == 3) {
          // 提现成功
          this.dataList.push({ name: '提现成功：', field: 'sucessTotal', unit: ' 元' })
        }

        /* if (!status || status == 4) {
          // 提现失败
          this.totalInfo.push({ name: '提现失败：', total: response.data.failTotal })
        } */
      })
    },
    onListEvent(type, row) {
      if (type === 'detail') {
        this.orderInfo = row
        this.orderInfo._btn = {}
        this.dialogWithdrawDetailVisible = true
      } else {
        if (row.receiptUrl) {
          window.open(this.$store.state.file.fileHost + row.receiptUrl)
        } else {
          this.$message.error('未找到回单信息！')
        }
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { withdrawOrder: { orgId: this.$route.query.orgId, tradeType: this.$route.query.tradeType }, dateParam: { createDateFrom: '', createDateTo: '' } } })
      let datetime = null
      let status = null

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              datetime = v
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (v !== '') {
              if (k == 'status') status = v
              params.param.withdrawOrder[k] = v
            }
          }
        }
      }

      this.totalAmountInfo(datetime, status)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
