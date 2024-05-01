<template>
  <div class="template-main">
    <div v-if="tabsList.length <= 0" class="text-content">请先配置液源地</div>
    <el-tabs v-else v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.name" :name="index.toString()">
        <el-row :gutter="10" style="margin: 0">
          <el-col :span="12">
            <em-table-list v-if="active == index && nextTick" :tableListName="'freight'" :authButtonList="authButtonList" :source="'data'" :sourceData="freightData" :buttonsList="buttonsList" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"></em-table-list>
          </el-col>
          <el-col :span="12" style="background-color: #ffffff;border-radius: 5px;" >
            <em-table-list v-if="active == index && nextTick" :custTableTitle="'变更记录'" :tableListName="'freightLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="log_page_status" :page_column="log_page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="配置运费" :visible.sync="dialogConfigPriceVisible" :width="'70%'" :append-to-body="true">
      <el-table v-loading="loading" :data="freightDialogData" stripe style="width:100%;margin-bottom: 20px;" ref="multipleTable" :cell-style="{padding: '5px 0'}" :header-cell-style="{padding: '7px 0',background:'#f6f6f6',color:'#999'}" border>
        <el-table-column :label="'里程区间(公里)'" width="400">
          <template slot-scope="scope">
            <div style="display: flex" class="item-last-line" v-if="scope.$index == freightDialogData.length - 1">
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
        <el-table-column prop="startPrice" label="起步价(元/吨)">
          <template slot-scope="scope">
            <el-input v-model="scope.row['startPrice']" :clearable="true" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="变动费率(元/吨)">
          <template slot-scope="scope">
            <el-input v-model="scope.row['rate']" :clearable="true" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.$index != freightDialogData.length - 1 && scope.$index != 0" style="font-size: 12px;padding: 0 10px;" @click="deleteTable( scope )">删除</el-button>
            <el-button type="text" v-if="scope.$index == freightDialogData.length - 2" style="font-size: 12px;padding: 0 10px;" @click="addTable( scope.row )">增加</el-button>
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
      <em-table-list v-if="dialogPriceLogVisible" :tableListName="'freightLogInfo'" style="padding-bottom: 20px;" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo } from '@/utils/tools'
import { $lngFormList, $configPriceList, $saveConfigPriceList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'freight',
  data() {
    return initVueDataOptions(this, {
      active: '0',
      tabsList: [],
      loading: false,
      nextTick: false,
      rangeSign: ' ≤ X < ',
      lastRangeSign: ' X ≥ ',
      dialogConfigPriceVisible: false,
      dialogPriceLogVisible: false,
      freightData: [],
      freightDialogData: [],
      buttonsList: [{ type: 'primary', icon: '', event: 'config', name: '配置运费' }],
      queryCustURL: {
        list: {
          url: 'strategy/carriage_log/list',
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
          url: 'strategy/carriage_log_detail/list',
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
      mode_list: 'price_freight_mode_list',
      page_status: 'price_freight_page_status',
      page_column: 'price_freight_column',
      select_list: 'price_freight_select_list',
      log_page_status: 'price_freight_log_page_status',
      log_page_column: 'price_freight_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    }),
    currLngForm() {
      return this.tabsList[this.active] || {}
    }
  },
  created() {
    this.initTabsData()
  },
  mounted: function () { },
  methods: {
    initTabsData() {
      $lngFormList().then(response => {
        this.tabsList = response.data
        this.initTableList()
      })
    },
    initDataObject(begin, end) {
      return {
        beginRange: begin,
        endRange: end,
        rate: 0,
        startPrice: 0,
        lngFromId: this.currLngForm.code,
        lngFromName: this.currLngForm.name
      }
    },
    initTableList() {
      this.freightData = []
      this.freightDialogData = []
      this.$nextTick(() => {
        $configPriceList(this.currLngForm.code).then(response => {
          this.nextTick = true
          this.freightData = response.data || []

          this.freightData.forEach(item => {
            item.startPrice = 1 * Number(item.startPrice)
            item.rate = 1 * Number(item.rate)
          })
          if (this.freightData.length > 0) {
            this.freightDialogData = this.freightData
          } else {
            const initData = []
            initData.push(this.initDataObject(0, 100))
            initData.push(this.initDataObject(100, 0))
            this.freightDialogData.push(...initData)
          }
        })
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
        $saveConfigPriceList(this.freightDialogData).then(response => {
          this.$message.success('保存成功！')

          this.nextTick = false
          this.initTableList()
        })
      }

      this.dialogConfigPriceVisible = false
    },
    handleClick(tab, event) {
      this.nextTick = false
      this.initTableList()
    },
    addTable(row) {
      const lastData = this.freightDialogData.pop()
      const lastSecData = this.freightDialogData[this.freightDialogData.length - 1]
      const currBegin = lastSecData.endRange
      const currEnd = Number(lastSecData.endRange) + 100
      this.freightDialogData.push(this.initDataObject(currBegin, currEnd))

      lastData.beginRange = currEnd
      lastData.endRange = 0
      this.freightDialogData.push(lastData)
    },
    deleteTable(scope) {
      var index = scope.$index
      const prevInfo = this.freightDialogData[index - 1]
      this.freightDialogData[index + 1].beginRange = prevInfo.endRange
      this.freightDialogData.splice(index, 1)
    },
    updateTable(scope) {
      var index = scope.$index
      const prevInfo = this.freightDialogData[index]
      this.freightDialogData[index + 1].beginRange = prevInfo.endRange
    },
    onReqParams(type, _this, callback) {
      let params = {}

      if (_this.tableListName == 'freightLogInfo') {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { carriageId: this.currSearchId } })
      } else {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { lngFromId: this.currLngForm.code } })
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
