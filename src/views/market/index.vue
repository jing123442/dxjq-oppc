<template>
  <div class="template-main">
    <table-total-data
      ref="tables1"
      :dataList="dataList"
      :rowData="totalInfo"
      :headerStyle="'top: 160px;'"
    ></table-total-data>
    <em-table-list :tableListName="'busorg'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList"
                   :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success"
                   :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status"
                   :page_column="page_column" :select_list="select_list" @afterTableData="afterTableData" @onListEvent="onListEvent"
                   @onReqParams="onReqParams"></em-table-list>

    <!-- 发放新卡 -->
    <el-dialog :title="bindTitle" :visible.sync="dialogSendVisible" width="500px" :append-to-body="true">
      <el-form size="small" :model="form" label-width="100px" ref="formBindTel" v-if="dialogSendVisible"
               :rules="formRules">
        <el-form-item label="所属集体户" prop="orgId" style="width: 90%;">
          <el-select v-model="form.orgId" filterable placeholder="请选择" @change="changeOrg" style="width: 100%">
            <el-option v-for="item in optionOrgList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="carNumber" style="width: 90%;">
          <el-select v-model="form.carNumber" filterable placeholder="请选择" @change="changeCarNumber" style="width: 100%">
            <el-option v-for="item in optionTruckList" :key="item.carNumber" :label="item.carNumber" :value="item.carNumber"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作方" prop="partnerId" style="width: 90%;">
          <el-select v-model="form.partnerId" filterable placeholder="请选择" @change="changePartner" style="width: 100%">
            <el-option v-for="item in optionPartnerList" :key="item.id" :label="item.partnerName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡发放额" prop="initAmount" style="width: 90%;">
          <el-input v-model="form.initAmount"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{ btnItem.label }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 作废 -->
    <el-dialog title="购车加气优惠卡 · 作废" :visible.sync="dialogCancelVisible" width="500px" :append-to-body="true">
      <el-form size="small" label-width="100px" ref="formCancel" v-if="dialogCancelVisible">
        <el-form-item label="卡号" style="width: 90%;margin-bottom: 0;">{{ currentRow.cardId }}</el-form-item>
        <el-form-item label="所属集体户" style="width: 90%;margin-bottom: 0;">{{ currentRow.orgName }}</el-form-item>
        <el-form-item label="车牌号" style="width: 90%;margin-bottom: 0;">{{ currentRow.carNumber }}</el-form-item>
        <el-form-item label="合作方" style="width: 90%;margin-bottom: 0;">{{ currentRow.partnerName }}</el-form-item>
        <div style="margin-top: 20px;padding: 20px;border-top: 1px solid #d2d2d2;">
          <span style="display: inline-block;margin-right: 20px;">卡余额：{{ currentRow.remainAmount }} 元 </span>|
          <span style="display: inline-block;margin-left: 20px;">卡发放额：{{ currentRow.initAmount }} 元 </span>
        </div>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnCancelClickEvent(btnItem)">{{ btnItem.label }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 优惠账单 -->
    <el-dialog title="购车加气优惠卡 · 优惠账单" :visible.sync="dialogOrderVisible" width="70%" :append-to-body="true">
      <table-total-data v-if="dialogOrderVisible" ref="tables12" :dataList="dataOrderList" :rowData="totalOrderInfo" :headerStyle="'top: 88px;'"></table-total-data>
      <em-table-list v-if="dialogOrderVisible" :custTableTitle="'优惠账单'" :tableListName="'order'" ref="orderTables" :authButtonList="authButtonList" :buttonsList="[]"
                     :axios="axios" :queryCustURL="queryOrderCustURL" :responseSuccess="response_success"
                     :queryParam="queryParams" :mode_list="mode_list" :page_status="5"
                     :page_column="page_order_column" :select_list="select_list"
                     @onReqParams="onReqOrderParams"></em-table-list>
    </el-dialog>
  </div>
</template>

<script>
import { callbackPagesInfo, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'
import {
  $accountCancelCard,
  $accountCardPartnerList,
  $accountCardToOrgList,
  $accountOrgToTruckList,
  $accountSendCard
} from '@/service/account'

export default {
  components: { TableTotalData },
  data() {
    const checkNumber = (rule, value, callback) => {
      if (value < 0 || isNaN(Number(value))) {
        callback(new Error('请输入正确格式金额'))
      } else {
        callback()
      }
    }

    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'account/card_info/get_card_info',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        },
        name: '优惠卡管理'
      },
      queryOrderCustURL: {
        list: {
          url: 'account/card_info/get_card_bill',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '优惠卡管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'send', name: '新卡发放' }],
      bindTitle: '购车加气优惠卡 · 新卡发放',
      dialogSendVisible: false,
      dialogCancelVisible: false,
      dialogOrderVisible: false,
      currentRow: {},
      form: {
        orgId: '',
        orgName: '',
        carNumber: '',
        partnerId: '',
        partnerName: '',
        initAmount: '',
        truckId: '',
        illegal: true
      },
      formRules: {
        orgId: [{ required: true, message: '请选择所属集体户！', trigger: 'change' }],
        carNumber: [{ required: true, message: '请选择车牌号！', trigger: 'change' }],
        partnerId: [{ required: true, message: '请选择合作方！', trigger: 'change' }],
        initAmount: [{ required: true, validator: checkNumber, message: '请输入发放金额', trigger: 'blur' }]
      },
      dataList: [
        {
          name: '总余额：',
          field: 'totalRemainAmount',
          unit: ' 元'
        },
        {
          name: '总优惠额：',
          field: 'totalDiscountAmount',
          unit: ' 元'
        },
        {
          name: '总发放额：',
          field: 'totalInitAmount',
          unit: ' 元'
        }
      ],
      totalInfo: { totalRemainAmount: 0, totalDiscountAmount: 0, totalInitAmount: 0 },
      dataOrderList: [
        { name: '卡号：', field: 'cardId', unit: '' },
        { name: '车牌号：', field: 'carNumber', unit: '' }
      ],
      totalOrderInfo: { cardId: '', carNumber: '' },
      optionOrgList: [],
      optionTruckList: [],
      optionPartnerList: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_org_mode_list',
      page_status: 'bus_org_page_status',
      page_column: 'market_card_column',
      page_order_column: 'market_order_card_column',
      select_list: 'market_card_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      // 获取所有集体户
      this.optionOrgList = await $accountCardToOrgList({}).then(res => res.data || [])

      // 集体户对应卡车
      if (this.form.orgId) {
        this.optionTruckList = await this.optionTruck(this.form.orgId)
      }

      // 合作方
      this.optionPartnerList = await $accountCardPartnerList({}).then(res => res.data || [])
    },
    async optionTruck(id) {
      return await $accountOrgToTruckList({ id }).then(res => res.data || [])
    },
    async changeOrg(val) {
      this.optionTruckList = await this.optionTruck(val)
      const currentInfo = this.optionOrgList.find(item => item.orgId === val)

      this.form.orgName = currentInfo ? currentInfo.orgName : ''
    },
    changeCarNumber(val) {
      const currentInfo = this.optionTruckList.find(item => item.carNumber === val)

      this.form.truckId = currentInfo ? currentInfo.truckId : ''
    },
    changePartner(val) {
      const currentInfo = this.optionPartnerList.find(item => item.id === val)

      this.form.partnerId = val
      this.form.partnerName = currentInfo ? currentInfo.partnerName : ''
    },
    onListEvent(type, row) {
      if (type === 'send') {
        this.dialogSendVisible = true
      } else if (type === 'remove') {
        this.currentRow = row
        this.dialogCancelVisible = true
      } else if (type === 'order') {
        this.currentRow = row
        this.totalOrderInfo.cardId = row.cardId
        this.totalOrderInfo.carNumber = row.carNumber
        this.dialogOrderVisible = true
      }
    },
    afterTableData(res) {
      const { page, ...dataInfo } = res.data
      this.totalInfo = dataInfo || {}
    },
    btnClickEvent(item) { // 发卡
      if (item.type == 'ok') {
        this.$refs.formBindTel.validate(async valid => {
          if (valid) {
            $accountSendCard(this.form).then(res => {
              this.$message.success(res.message)
              this.$refs.tables.initDataList()
              this.dialogSendVisible = false
            })
          }
        })
      } else {
        this.dialogSendVisible = false
      }
    },
    btnCancelClickEvent(item) { // 作废卡
      if (item.type == 'ok') {
        $accountCancelCard({ cardId: this.currentRow.cardId }).then(res => {
          this.$message.success(res.message)
          this.$refs.tables.initDataList()
          this.dialogCancelVisible = false
        })
      } else {
        this.dialogCancelVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v && k === 'latestTime') {
            params.param.timeType = 0

            params.param.startTime = v[0]
            params.param.endTime = v[1]
          } else if (v && k === 'senderDate') {
            params.param.timeType = 1

            params.param.startTime = v[0]
            params.param.endTime = v[1]
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqOrderParams(type, _this, callback) {
      const params = Object.assign({}, { cardId: this.currentRow.cardId })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>

<style lang="scss">
.home-page-bg {
  width: 100%;
}
</style>
