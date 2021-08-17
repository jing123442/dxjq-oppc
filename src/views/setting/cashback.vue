<template>
  <div class="template-main">
    <div style="padding: 15px 5px;display: flex;align-items: center;">
      返现功能(开启/关闭)：<el-switch v-model="cashbackStatus" @change="updateCashbackStatus" :inactive-value="0" :active-value="1"></el-switch>
    </div>
    <el-row :gutter="10" style="margin: 0">
      <el-col :span="12">
        <em-table-list :tableListName="'cashback'" :authButtonList="authButtonList" :source="'data'" :sourceData="cashbackData" :buttonsList="buttonsList" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"></em-table-list>
        <div class="special-desc">
          <div class="title">配置规则：</div>
          <div>面向用户：新入驻散户</div>
          <div>返现条件：散户第一笔加气</div>
          <div class="title">返现逻辑：</div>
          <div>1、加气返现配置完成后，新入驻散户首笔加气订单，根据加气量返送现金到散户余额账户，微信通知用户获得返现。散户身份变更时需清零余额并无待支付订单方可更改身份。</div>
          <div>2、账户余额不足时或返现金额设定为0元时，立即停止返现，实时生效。</div>
        </div>
      </el-col>
      <el-col :span="12" style="background-color: #ffffff;border-radius: 5px;" >
        <em-table-list v-if="nextTick" :custTableTitle="'变更记录'" :tableListName="'cashbackLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="log_page_status" :page_column="log_page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-col>
    </el-row>
    <el-dialog title="配置规则" :visible.sync="dialogConfigPriceVisible" :width="'720px'" :append-to-body="true">
      <el-table v-loading="loading" :data="cashbackDialogData" stripe style="width:100%;margin-bottom: 20px;" ref="multipleTable" :cell-style="{padding: '5px 0'}" :header-cell-style="{padding: '7px 0',background:'#f6f6f6',color:'#999'}" border>
        <el-table-column :label="'加注量区间(公斤)'" width="400">
          <template slot-scope="scope">
            <div style="display: flex" class="item-last-line" v-if="scope.$index == cashbackDialogData.length - 1">
              <el-input class="last-line-first" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="item-last-line item-sign"> {{lastRangeSign}} </div>
              <el-input v-model="scope.row['beginRange']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
            </div>
            <div style="display: flex" v-else>
              <el-input v-model="scope.row['beginRange']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="item-sign"> {{rangeSign}} </div>
              <el-input v-model="scope.row['endRange']" :clearable="true" @input="updateTable(scope)" autocomplete="off"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="返现金额(元)">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row['amount']" :precision="2" :controls="false" style="width: 125px;"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.$index != cashbackDialogData.length - 1 && scope.$index != 0" style="font-size: 12px;padding: 0 10px;" @click="deleteTable( scope )">删除</el-button>
            <el-button type="text" v-if="scope.$index == cashbackDialogData.length - 2" style="font-size: 12px;padding: 0 10px;" @click="addTable( scope.row )">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 按钮 -->
      <div class="el-del-btn-item">
        <div class="btn-item-footer">
          <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                     size="small"
                     :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{btnItem.label}}
          </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="变更记录" :visible.sync="dialogPriceLogVisible" :width="'70%'" :append-to-body="true">
      <em-table-list v-if="dialogPriceLogVisible" :custTableTitle="'操作记录'" :tableListName="'cashbackLogInfo'" style="padding-bottom: 20px;" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo } from '@/utils/tools'
import {
  $strategyCashbackRulesList,
  $strategyCashbackUpdateRules,
  $strategyCashbackStatus,
  $strategyCashbackUpdateStatus
} from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'cashback',
  data() {
    return initVueDataOptions(this, {
      cashbackStatus: 0,
      active: '0',
      loading: false,
      nextTick: false,
      rangeSign: ' ≤ X < ',
      lastRangeSign: ' X ≥ ',
      dialogConfigPriceVisible: false,
      dialogPriceLogVisible: false,
      cashbackData: [],
      cashbackDialogData: [],
      buttonsList: [{ type: 'primary', icon: '', event: 'config', name: '配置规则' }],
      queryCustURL: {
        list: {
          url: 'strategy/cashback_log/page_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/cashback_log_detail/find_by_log_id',
          method: 'post',
          parse: {
            tableData: ['data'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'setting_cashback_mode_list',
      page_status: 'setting_cashback_page_status',
      page_column: 'setting_cashback_column',
      select_list: 'setting_cashback_select_list',
      log_page_status: 'setting_cashback_log_page_status',
      log_page_column: 'setting_cashback_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
    this.initData()
  },
  mounted: function () { },
  methods: {
    initData() {
      this.initTableList()
      $strategyCashbackStatus({}).then(response => {
        this.cashbackStatus = response.data.cashbackStatus || 0
      })
    },
    initDataObject(begin, end) {
      return {
        beginRange: begin,
        endRange: end,
        amount: 0
      }
    },
    initTableList() {
      this.cashbackData = []
      this.cashbackDialogData = []
      this.nextTick = false

      this.$nextTick(() => {
        $strategyCashbackRulesList({}).then(response => {
          this.nextTick = true
          this.cashbackData = response.data || []

          if (this.cashbackData.length > 0) {
            this.cashbackDialogData = this.cashbackData
          } else {
            const initData = []
            initData.push(this.initDataObject(0, 200))
            initData.push(this.initDataObject(200, 0))
            this.cashbackDialogData.push(...initData)
          }
        })
      })
    },
    updateCashbackStatus(status) {
      $strategyCashbackUpdateStatus({ status }).then(response => {
        this.$message.success('配置成功！')
      }).catch(() => {
        this.cashbackStatus = status === 1 ? 0 : 1
      })
    },
    onListEvent(type, row) {
      if (type == 'config') {
        this.dialogConfigPriceVisible = true
      } else if (type == 'list') {
        this.currSearchId = row.id
        this.dialogPriceLogVisible = true
      }
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        let rules = false
        for (let i = 0; i < this.cashbackDialogData.length; i++) {
          const dataItem = this.cashbackDialogData[i]
          const beginRange = Number(dataItem.beginRange)
          const endRange = Number(dataItem.endRange)
          const amount = Number(dataItem.amount)
          if (isNaN(beginRange) || isNaN(endRange) || isNaN(amount) || beginRange >= endRange || amount < 0) {
            rules = true
          }
        }
        if (rules) {
          this.$message.error('输入数据有误（请输入数字类型，区间开始值不能大于等于区间结束值，或返现金额不能小于零）')
          return false
        }
        $strategyCashbackUpdateRules(this.cashbackDialogData).then(response => {
          this.$message.success('保存成功！')

          this.initTableList()
          this.dialogConfigPriceVisible = false
        })
      } else {
        this.initTableList()
        this.dialogConfigPriceVisible = false
      }
    },
    addTable(row) {
      const lastData = this.cashbackDialogData.pop()
      const lastSecData = this.cashbackDialogData[this.cashbackDialogData.length - 1]
      const currBegin = lastSecData.endRange
      const currEnd = Number(lastSecData.endRange) + 100
      this.cashbackDialogData.push(this.initDataObject(currBegin, currEnd))

      lastData.beginRange = currEnd
      lastData.endRange = 99999999
      this.cashbackDialogData.push(lastData)
    },
    deleteTable(scope) {
      var index = scope.$index
      const prevInfo = this.cashbackDialogData[index - 1]
      this.cashbackDialogData[index + 1].beginRange = prevInfo.endRange
      this.cashbackDialogData.splice(index, 1)
    },
    updateTable(scope) {
      var index = scope.$index
      const prevInfo = this.cashbackDialogData[index]
      this.cashbackDialogData[index + 1].beginRange = prevInfo.endRange
    },
    onReqParams(type, _this, callback) {
      let params = {}

      if (_this.tableListName == 'cashbackLogInfo') {
        params = Object.assign({}, callbackPagesInfo(_this), { id: this.currSearchId })
      } else {
        params = Object.assign({}, callbackPagesInfo(_this))
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>

