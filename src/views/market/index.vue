<template>
  <div class="template-main">
    <el-row :gutter="10" style="margin: 0">
      <el-col :span="12">
        <em-table-list v-if="nextTick" :tableListName="'rebate'" :source="'data'" :sourceData="rebateData" :buttonsList="buttonsList" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"></em-table-list>
      </el-col>
      <el-col :span="12" style="background-color: #ffffff;border-radius: 5px;" >
        <em-table-list :custTableTitle="'变更记录'" :tableListName="'rebateLog'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="log_page_status" :page_column="log_page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-col>
    </el-row>
    <el-dialog title="优惠返利配置" :visible.sync="dialogConfigRebateVisible" :width="'70%'">
      <el-table v-loading="loading" :data="rebateDialogData" stripe style="width:100%;margin-bottom: 20px;" ref="multipleTable" :cell-style="{padding: '5px 0'}" :header-cell-style="{padding: '7px 0',background:'#f6f6f6',color:'#999'}" border>
        <el-table-column :label="'优惠返利区间(吨)'" width="400">
          <template slot-scope="scope">
            <div style="display: flex" class="last-line" v-if="scope.$index == rebateDialogData.length - 1">
              <el-input class="last-line-first" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="last-line sign"> {{lastRangeSign}} </div>
              <el-input v-model="scope.row['beginRange']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
            </div>
            <div style="display: flex" v-else>
              <el-input v-model="scope.row['beginRange']" :disabled="true" :clearable="true" autocomplete="off"></el-input>
              <div class="sign"> {{rangeSign}} </div>
              <el-input v-model="scope.row['endRange']" :clearable="true" @input="updateTable(scope)" autocomplete="off"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="startPrice" label="优惠返利金额(分/吨)">
          <template slot-scope="scope">
            <el-input v-model="scope.row['rebate']" :clearable="true" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.$index != rebateDialogData.length - 1 && scope.$index != 0" style="font-size: 12px;padding: 0 10px;" @click="deleteTable( scope )">删除</el-button>
            <el-button type="text" v-if="scope.$index == rebateDialogData.length - 2" style="font-size: 12px;padding: 0 10px;" @click="addTable( scope.row )">增加</el-button>
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
    <el-dialog title="变更记录" :visible.sync="dialogPriceLogVisible" :width="'70%'">
      <em-table-list v-if="dialogPriceLogVisible" :tableListName="'rebateLogInfo'" style="padding-bottom: 20px;" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { custFormBtnList, axiosRequestParams, callbackPagesInfo } from '@/utils/tools'
import { $configRebateList, $saveConfigRebateList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'rebate',
  data() {
    return {
      isShow: false,
      loading: false,
      nextTick: false,
      rangeSign: ' ≤ X < ',
      lastRangeSign: ' X ≥ ',
      dialogConfigRebateVisible: false,
      dialogPriceLogVisible: false,
      rebateData: [],
      rebateDialogData: [],
      formBtnList: custFormBtnList(),
      buttonsList: [{ type: 'primary', icon: '', event: 'config', name: '配置运费' }],
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
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
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
      } else if (type == 'search') {
        this.currSearchId = row.id
        this.dialogPriceLogVisible = true
      }
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        $saveConfigRebateList(this.rebateDialogData).then(response => {
          this.$message.success('保存成功！')

          this.nextTick = false
          this.initTableList()
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

<style lang="scss">
  .sign {
    white-space: nowrap;
    padding: 0 8px;
    line-height: 32px;
  }
  .last-line {
    .last-line-first.is-disabled .el-input__inner {
      border-color: transparent;
      background-color: transparent;
    }
    &.sign {
      padding-left: 22px;
    }
  }
</style>
