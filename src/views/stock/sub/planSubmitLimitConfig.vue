<template>
  <div class="template-main">
    <el-row :gutter="10" style="margin: 0">
      <el-col :span="12">
        <em-table-list :tableListName="'planSubmitLimitConfig'" ref="pslConfig" :axios="axios" :queryCustURL="queryPSLCustURL" :responseSuccess="response_success" :queryParam="queryParams" :buttonsList="buttonsList" :mode_list="mode_list" :page_status="page_status" :page_column="psl_page_column" :select_list="select_list" @onListEvent="onListEvent" @updateColumnValue="updatePSLColumnValue" @onReqParams="onReqParams"></em-table-list>
      </el-col>
      <el-col :span="12" style="background-color: #ffffff;border-radius: 5px;" >
        <em-table-list ref="pslConfigRecord" :custTableTitle="'变更记录'" :tableListName="'freightLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="log_page_status" :page_column="log_page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-col>
    </el-row>
    <el-dialog title="配置" :visible.sync="dialogConfigPSLVisible" :width="'70%'" :append-to-body="true">
      <el-table v-loading="loading" :data="pslDialogData" stripe style="width:100%;margin-bottom: 20px;" ref="multipleTable" :cell-style="{padding: '5px 0'}" :header-cell-style="{padding: '7px 0',background:'#f6f6f6',color:'#999'}" border>
        <el-table-column :label="'周日均销量区间(吨)'" width="400">
          <template slot-scope="scope">
            <div style="display: flex" class="item-last-line" v-if="scope.$index == pslDialogData.length - 1">
              <el-input class="last-line-first" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="item-last-line item-sign"> {{lastRangeSign}} </div>
              <el-input v-model="scope.row['qtyAvgBegin']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
            </div>
            <div style="display: flex" v-else>
              <el-input v-model="scope.row['qtyAvgBegin']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="item-sign"> {{rangeSign}} </div>
              <el-input v-model="scope.row['qtyAvgEnd']" :clearable="true" @input="updateTable(scope)" autocomplete="off"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="存销比上限(存量/周日均销量)" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row['rate']" :clearable="true" autocomplete="off" @input="updateTable(scope)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="limitStock" label="存量上限(吨)" width="400">
          <template slot-scope="scope">
            <div><el-tooltip class="item" effect="dark" :content="scope.row['limitStock']" placement="top-start"><div>{{scope.row['limitStock']}}</div></el-tooltip></div>
          </template>
        </el-table-column>
        <el-table-column prop="minStock" label="存量下限(吨)">
          <template slot-scope="scope">
            <el-input v-model="scope.row['minStock']" :clearable="true" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.$index != pslDialogData.length - 1 && scope.$index != 0" style="font-size: 12px;padding: 0 10px;" @click="deleteTable( scope )">删除</el-button>
            <el-button type="text" v-if="scope.$index == pslDialogData.length - 2" style="font-size: 12px;padding: 0 10px;" @click="addTable( scope.row )">增加</el-button>
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
      <em-table-list v-if="dialogPriceLogVisible" :tableListName="'pslLogInfo'" style="padding-bottom: 20px;" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="psl_page_column" :select_list="select_list" @onListEvent="onListEvent" @updateColumnValue="updatePSLColumnValue" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo } from '@/utils/tools'
import { $plcSaveOrUpdateList, $strategyPurchaseLimitConfigList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  data() {
    return initVueDataOptions(this, {
      active: '0',
      loading: false,
      rangeSign: ' ≤ X < ',
      lastRangeSign: ' X ≥ ',
      dialogConfigPSLVisible: false,
      dialogPriceLogVisible: false,
      pslDialogData: [],
      buttonsList: [{ type: 'primary', icon: '', event: 'psLconfig', name: '配置' }],
      queryPSLCustURL: {
        list: {
          url: 'strategy/purchase_limit_config/list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: ''
      },
      queryCustURL: {
        list: {
          url: 'strategy/purchase_limit_config_log/operator_list',
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
          url: 'strategy/purchase_limit_config_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      }
    })
  },
  computed: {
    ...mapGetters({
      psl_page_column: 'pslConfig_column',
      mode_list: 'price_freight_mode_list',
      page_status: 'price_freight_page_status',
      page_column: 'price_freight_column',
      select_list: 'price_freight_select_list',
      log_page_status: 'psl_log_page_status',
      log_page_column: 'psl_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
  },
  mounted: function () {
  },
  methods: {
    updatePSLColumnValue(dataList, callback) {
      this.ruleDeal(dataList)
      dataList.forEach(item => {
        item.qtyAvgRange = item.qtyAvgBegin + this.rangeSign + item.qtyAvgEnd
        item.minStock = '≤' + item.minStock
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
    initDataObject(begin, end) {
      return {
        qtyAvgBegin: begin,
        qtyAvgEnd: end,
        rate: 0,
        minStock: 0
      }
    },
    initTableList() {
      this.pslDialogData = []
      $strategyPurchaseLimitConfigList({}).then(response => {
        this.dialogConfigPSLVisible = true
        if (response.data.length > 0) {
          this.pslDialogData = response.data
        } else {
          const initData = []
          initData.push(this.initDataObject(0, 100))
          initData.push(this.initDataObject(100, 0))
          this.pslDialogData.push(...initData)
        }
        this.ruleDeal(this.pslDialogData)
      })
    },
    onListEvent(type, row) {
      if (type == 'psLconfig') {
        this.initTableList()
      } else if (type == 'list') {
        this.timeStamp = row.timeStamp
        this.dialogPriceLogVisible = true
      }
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        $plcSaveOrUpdateList(this.pslDialogData).then(response => {
          this.$message.success('保存成功！')
          this.$refs.pslConfig.initDataList()
          this.$refs.pslConfigRecord.initDataList()
        })
      }

      this.dialogConfigPSLVisible = false
    },
    addTable(row) {
      const lastData = this.pslDialogData.pop()
      const lastSecData = this.pslDialogData[this.pslDialogData.length - 1]
      const currBegin = lastSecData.qtyAvgEnd
      const currEnd = Number(lastSecData.qtyAvgEnd) + 10
      this.pslDialogData.push(this.initDataObject(currBegin, currEnd))

      lastData.qtyAvgBegin = currEnd
      lastData.qtyAvgEnd = 0
      this.pslDialogData.push(lastData)
      this.ruleDeal(this.pslDialogData)
    },
    deleteTable(scope) {
      var index = scope.$index
      const prevInfo = this.pslDialogData[index - 1]
      this.pslDialogData[index + 1].qtyAvgBegin = prevInfo.qtyAvgEnd
      this.pslDialogData.splice(index, 1)
      this.ruleDeal(this.pslDialogData)
    },
    updateTable(scope) {
      var index = scope.$index
      const prevInfo = this.pslDialogData[index]
      this.pslDialogData[index + 1].qtyAvgBegin = prevInfo.qtyAvgEnd
      this.ruleDeal(this.pslDialogData)
    },
    onReqParams(type, _this, callback) {
      let params = {}
      console.log(_this.tableListName)
      if (_this.tableListName == 'pslLogInfo') {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { timeStamp: this.timeStamp } })
      } else if (_this.tableListName == 'planSubmitLimitConfig') {
        params = {}
      } else {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
