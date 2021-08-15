<template>
  <div class="template-main">
    <el-row :gutter="10" style="margin: 0">
      <el-col :span="12">
        <em-table-list v-if="nextTick" :tableListName="'rebate'" :source="'data'" :sourceData="rebateData" :authButtonList="authButtonList" :buttonsList="buttonsList" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"></em-table-list>
        <div class="special-desc">
          <div class="title">车辆星级 评级规则</div>
          <div style="display: flex;justify-content: flex-start;align-items: flex-start;">
            <div>星级定义：</div>
            <div>
              <div>3 星，单车月加气量 ≥ 3 吨</div>
              <div>2 星，1 吨 ≤ 单车月加气量 ＜ 3 吨</div>
              <div>1 星，0 吨 ≤ 单车月加气量 ＜ 1 吨</div>
            </div>
          </div>
          <div>评级周期：每月1号 00:00:00 对 满整月入驻的车辆 评级</div>
          <div>余额规则：按每月1号 00:00:00 平台即时加气结算均价，换算某车上月余额可购买气量，
          与该车上月实际加气量比较，取2者最大值作为该车评级的“单车月加气量”</div>
        </div>
        <div class="special-desc" style="margin-top: 10px;">
          <div class="title">车辆星级 降级保底规则</div>
          <div>2021.01.01 起，新上牌的车辆，最低 3 星</div>
          <div>2021.01.01 前，上牌的自营车辆，最低 2 星</div>
          <div>2021.01.01 前，上牌的挂靠车辆，最低 1 星</div>
        </div>
      </el-col>
      <el-col :span="12" style="background-color: #ffffff;border-radius: 5px;" >
        <em-table-list :custTableTitle="'变更记录'" ref="rebateLog" :tableListName="'rebateLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="log_page_status" :page_column="log_page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-col>
    </el-row>
    <el-dialog title="专项优惠配置" :visible.sync="dialogConfigRebateVisible" :width="'40%'" :append-to-body="true">
      <el-table v-loading="loading" :data="rebateDialogData" stripe style="width:100%;margin-bottom: 20px;" ref="multipleTable" :cell-style="{padding: '5px 0'}" :header-cell-style="{padding: '7px 0',background:'#f6f6f6',color:'#999'}" border>
        <el-table-column :label="'优惠区间(公斤)'" width="260">
          <template slot-scope="scope">
            <div style="display: flex" class="item-last-line" v-if="scope.$index == rebateDialogData.length - 1">
              <el-input class="last-line-first" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="item-last-line item-sign"> {{lastRangeSign}} </div>
              <el-input v-model="scope.row['beginRange']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
            </div>
            <div style="display: flex" v-else>
              <el-input v-model="scope.row['beginRange']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="item-sign"> {{rangeSign}} </div>
              <el-input v-model="scope.row['endRange']" :disabled="true" :clearable="true" @input="updateTable(scope)" autocomplete="off"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="星级">
          <template slot-scope="scope">
            <el-rate v-model="scope.row['level']" :max="3" disabled score-template="{value}"></el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="startPrice" label="优惠金额(元/吨)">
          <template slot-scope="scope">
            <el-input v-model="scope.row['rebate']" :clearable="true" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.$index != rebateDialogData.length - 1 && scope.$index != 0" style="font-size: 12px;padding: 0 10px;" @click="deleteTable( scope )">删除</el-button>
            <el-button type="text" v-if="scope.$index == rebateDialogData.length - 2" style="font-size: 12px;padding: 0 10px;" @click="addTable( scope.row )">增加</el-button>
          </template>
        </el-table-column>-->
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
      <em-table-list v-if="dialogPriceLogVisible" :tableListName="'rebateLogInfo'" style="padding-bottom: 20px;" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo } from '@/utils/tools'
import { $configRebateList, $saveConfigRebateList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'rebate',
  data() {
    return initVueDataOptions(this, {
      loading: false,
      nextTick: false,
      rangeSign: ' < X ≤ ',
      lastRangeSign: ' X ≥ ',
      dialogConfigRebateVisible: false,
      dialogPriceLogVisible: false,
      rebateData: [],
      rebateDialogData: [],
      buttonsList: [{ type: 'primary', icon: '', event: 'config', name: '配置' }],
      queryCustURL: {
        list: {
          url: 'strategy/rebate_log/list',
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
          url: 'strategy/rebate_log_detail/list',
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
      mode_list: 'market_rebate_mode_list',
      page_status: 'market_rebate_page_status',
      page_column: 'market_rebate_column',
      select_list: 'market_rebate_select_list',
      log_page_status: 'market_rebate_log_page_status',
      log_page_column: 'market_rebate_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
    this.initTableList()
  },
  mounted: function () { },
  methods: {
    initDataObject(begin, end) {
      return {
        beginRange: begin,
        endRange: end,
        rebate: 0
      }
    },
    initTableList() {
      const params = {
        page: 1,
        size: 10,
        param: {}
      }
      this.rebateData = []
      this.rebateDialogData = []

      this.$nextTick(() => {
        $configRebateList(params).then(response => {
          this.nextTick = true
          this.rebateData = response.data.records || []

          if (this.rebateData.length > 0) {
            this.rebateDialogData = this.rebateData
          } else {
            const initData = []
            initData.push(this.initDataObject(0, 15))
            initData.push(this.initDataObject(15, 0))
            this.rebateDialogData.push(...initData)
          }
        })
      })
    },
    onListEvent(type, row) {
      if (type == 'config') {
        this.dialogConfigRebateVisible = true
      } else if (type == 'list') {
        this.currSearchId = row.id
        this.dialogPriceLogVisible = true
      }
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        const REBATE_MAX = 500
        let rebateMaxFlag = false
        let rebateIndexFlag = false
        this.rebateDialogData.forEach((item, index) => {
          if (item.rebate > REBATE_MAX) {
            rebateMaxFlag = true
          }
          if (this.rebateDialogData.length > (index + 1) && item.rebate > this.rebateDialogData[index + 1].rebate) {
            rebateIndexFlag = true
          }
        })
        if (rebateMaxFlag) {
          this.$message.error('优化最大限额不能超过 500 元/吨')
          return false
        }
        if (rebateIndexFlag) {
          this.$message.error('优化额度配置错误')
          return false
        }
        $saveConfigRebateList(this.rebateDialogData).then(response => {
          this.$message.success('保存成功！')

          this.nextTick = false
          this.initTableList()

          this.$refs.rebateLog.initDataList()
        })
      }

      this.dialogConfigRebateVisible = false
    },
    handleClick(tab, event) {
      this.initTableList()
    },
    addTable(row) {
      const lastData = this.rebateDialogData.pop()
      const lastSecData = this.rebateDialogData[this.rebateDialogData.length - 1]
      const currBegin = lastSecData.endRange
      const currEnd = Number(lastSecData.endRange) + 15
      this.rebateDialogData.push(this.initDataObject(currBegin, currEnd))

      lastData.beginRange = currEnd
      lastData.endRange = 0
      this.rebateDialogData.push(lastData)
    },
    deleteTable(scope) {
      var index = scope.$index
      const prevInfo = this.rebateDialogData[index - 1]
      this.rebateDialogData[index + 1].beginRange = prevInfo.endRange
      this.rebateDialogData.splice(index, 1)
    },
    updateTable(scope) {
      var index = scope.$index
      const prevInfo = this.rebateDialogData[index]
      this.rebateDialogData[index + 1].beginRange = prevInfo.endRange
    },
    onReqParams(type, _this, callback) {
      let params = {}

      if (_this.tableListName == 'rebateLogInfo') {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { rebateId: this.currSearchId } })
      } else {
        params = Object.assign({}, callbackPagesInfo(_this))
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
