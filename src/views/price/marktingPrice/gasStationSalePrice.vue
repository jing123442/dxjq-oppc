<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">
            <el-form-item label="">
            <el-input placeholder="请输入加气站" v-model="searchForm.param.gasstationName"  size="small"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-select  v-model="searchForm.param.auditType">
              <el-option v-for="item in utilsCheckPriceType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div style="width:150px">
          <el-button @click="reset" size="mini" type="info" plain
            >重置</el-button
          >
          <el-button type="primary" @click="getList()" size="mini"
            >查询</el-button
          >
        </div>
      </div>
    </div>

    <div class="bg">
      <el-table
        :data="data"
        border
        size="mini"
        stripe
        :header-cell-style="{ background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
        @selection-change="handleSelectionChange"
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="gasstationName" label="加气站" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="platformPrice" label="执行中·售卖价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="platformPricePlan" label="最新售卖价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="auditType" label="审核类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="item,index in utilsCheckPriceType" :key="index">
              {{  item.value == scope.row.auditType?item.label:'' }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="最新售卖价执行状态" show-overflow-tooltip>
          <template slot-scope="scope">

            <div v-for="item,index in utilsExecuteStatus" :key="index">
              {{  item.value == scope.row.status?item.label:'' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="最新售卖价执行时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorDate" label="最新操作时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorName" label="操作人" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
          <el-button type="text" @click="changeLog(scope.row)">调价记录</el-button>
          <el-button type="text" @click="showAuditM(scope.row)">设置审核类型</el-button>

          <el-button type="text"  v-if="scope.row.auditStatus==1" @click="showAuditStatusM(scope.row)">审核</el-button>
          <el-button type="text" disabled  v-else>审核</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        style="margin-right: 28px; margin-top: 15px"
        background
        align="center"
        layout="total, sizes,prev, pager, next,jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="searchForm.page"
        :page-size="searchForm.size"
        @current-change="pageChange"
        @size-change="sizeChange"
        :total="totalCount"
      />
    </div>


    <el-dialog append-to-body width="80%"  :title="logRow.gasstationName+'售卖价调价记录'" :visible.sync="showLogDialog">
      <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">

          <el-form-item label="">
            <el-select  v-model="selectTypeValue">
              <el-option v-for="item in selectType" :label="item.name" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

            <el-form-item label="">
            <el-date-picker
              v-model="logUpdateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div style="width:150px">
          <el-button @click="resetLog" size="mini" type="info" plain
            >重置</el-button
          >
          <el-button type="primary" @click="getLog()" size="mini"
            >查询</el-button
          >
        </div>
      </div>
    </div>

    <div class="bg">
      <el-table
        :data="logData"
        border
        size="mini"
        stripe
        :header-cell-style="{ background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
      >
        <el-table-column prop="platformPricePlan" label="售卖价(元/公斤)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="auditType" label="审核类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="item,index in utilsCheckPriceType" :key="index">
              {{  item.value == scope.row.auditType?item.label:'' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="调价执行时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorDate" label="操作时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorName" label="操作人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="调价执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="item,index in utilsExecuteStatus" :key="index">
              {{  item.value == scope.row.status?item.label:'' }}
            </div>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        style="margin-right: 28px; margin-top: 15px"
        background
        align="center"
        layout="total, sizes,prev, pager, next,jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="logSearchForm.page"
        :page-size="logSearchForm.size"
        @current-change="pageChangeLog"
        @size-change="sizeChangeLog"
        :total="logTotal"
      />
    </div>
    </el-dialog>

    <el-dialog append-to-body width="30%"  title="设置审核类型" :visible.sync="showAuditType">
      <el-form ref="exportCar"  size="small" label-position="left">
        <el-form-item><div>{{ auditNames }}共({{selectedList.length}}个站）</div></el-form-item>
        <el-form-item>
          <el-radio v-model="auditType" label="1">站点自主</el-radio>
           <el-radio v-model="auditType" label="0">平台审核</el-radio>
        </el-form-item>

        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">

            <el-button type="primary"
                       size="small"
                        @click="changeAuditType()">确定
            </el-button>
            <el-button
                       size="small"
                        @click="showAuditType=false">取消
            </el-button>
          </div>
        </el-form-item>
        </el-form>
    </el-dialog>


    <el-dialog append-to-body width="30%"  title="审核售卖价" :visible.sync="showAudit">
      <el-form ref="exportCar2"  size="small" label-position="left">

        <el-form-item><div>{{audioRow.gasstationName}}</div></el-form-item>
        <el-form-item><div>售卖价：{{audioRow.platformPricePlan}}元/公斤</div></el-form-item>
        <el-form-item><div>预约：{{audioRow.updateDate}}执行</div></el-form-item>
        <el-form-item>
          <el-radio v-model="auditStatus" label="2">通过</el-radio>
           <el-radio v-model="auditStatus" label="3">不通过</el-radio>
        </el-form-item>

        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button type="primary"
                       size="small"
                        @click="audioExcute()">确定
            </el-button>
            <el-button
                       size="small"
                        @click="showAudit=false">取消
            </el-button>
          </div>
        </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>
<script>

import { $getMarketSale, $getMarketLog, $saleAuditType, $saleAuditExcute } from '@/service/strategy'
import {
  utilsMarketType, utilsCheckPriceType, utilsExecuteStatus
} from '@/utils/select'

export default {
  data() {
    return {
      selectTypeValue: '0',
      selectType: [
        { name: '操作时间', value: '0' },
        { name: '调价执行时间', value: '1' }
      ],
      numberTypeKey: '0',
      numberTypeValue: '',
      numberType: [
        { name: '车牌号', value: '0' },
        { name: '订单编号', value: '1' },
        { name: '司机姓名', value: '2' },
        { name: '收银员姓名', value: '3' }
      ],
      utilsCheckPriceType: utilsCheckPriceType(),
      utilsExecuteStatus: utilsExecuteStatus(),
      utilsMarketType: utilsMarketType(),

      data: [],
      arrayTime: [],
      searchForm: {
        page: 1,
        size: 10,
        param: {
        }
      },
      logSearchForm: {
        page: 1,
        size: 10,
        param: {
          dateParam: {

          },
          priceConfigLog: {

          }
        }
      },
      logRow: {},
      showLogDialog: false,
      logUpdateTime: [],
      logData: [],
      logTotal: 0,

      totalInfo: {},
      totalCount: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchText: '',

      showAuditType: false,
      auditType: '1',
      auditNames: '',
      selectedList: [],

      showAudit: false,
      auditStatus: '2',
      selectedAudioList: [],
      audioRow: {}
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },

  methods: {

    showAuditStatusM(row) {
      this.showAudit = true
      this.audioRow = row
      console.log('showAuditStatusM')
    },

    audioExcute() {
      $saleAuditExcute({ auditStatus: this.auditStatus, gasstationId: this.audioRow.gasstationId }).then((res) => {
        if (res.code == 0) {
          this.showAudit = false
          this.$message.success('修改成功')
          this.getList()
        }
      })
    },

    showAuditM(row) {
      this.showAuditType = true
      if (this.selectedList.length == 0) {
        this.selectedList.push(row)
      }
      let names = ''
      for (let i = 0; i < this.selectedList.length; i++) {
        if (i == this.selectedList.length - 1) {
          names = names + this.selectedList[i].nickName
        } else {
          names = names + this.selectedList[i].nickName + ','
        }
        this.auditNames = names
      }
    },
    changeAuditType() {
      let ids = ''
      for (let i = 0; i < this.selectedList.length; i++) {
        if (i == this.selectedList.length - 1) {
          ids = ids + this.selectedList[i].gasstationId
        } else {
          ids = ids + this.selectedList[i].gasstationId + ','
        }
      }
      $saleAuditType({ auditType: this.auditType, gasstationId: ids }).then((res) => {
        if (res.code == 0) {
          this.showAuditType = false
          this.$message.success('修改成功')
          this.getList()
        }
      })
    },

    handleSelectionChange(e) {
      this.selectedList = e
    },
    resetLog() {
      this.logUpdateTime = []
      this.logSearchForm = {
        page: 1,
        size: 10,
        param: {
          dateParam: {

          },
          priceConfigLog: {

          }
        }
      }
      this.getLog()
    },
    changeLog(row) {
      this.logRow = row
      this.showLogDialog = true
      this.getLog()
    },
    check() {

    },
    getList() {
      $getMarketSale(this.searchForm).then((res) => {
        this.data = res.data.records
        this.totalCount = res.data.total
      })
    },


    getLog() {
      this.logSearchForm.param.dateParam = {}
      if (this.selectTypeValue == '0') {
        if (this.logUpdateTime.length > 0) {
          this.logSearchForm.param.dateParam.createDateFrom = this.logUpdateTime[0]
          this.logSearchForm.param.dateParam.createDateTo = this.logUpdateTime[1]
        } else {
          this.logSearchForm.param.dateParam.createDateFrom = ''
          this.logSearchForm.param.dateParam.createDateTo = ''
        }
      } else {
        if (this.logUpdateTime.length > 0) {
          this.logSearchForm.param.dateParam.updateDateFrom = this.logUpdateTime[0]
          this.logSearchForm.param.dateParam.updateDateTo = this.logUpdateTime[1]
        } else {
          this.logSearchForm.param.dateParam.updateDateFrom = ''
          this.logSearchForm.param.dateParam.updateDateTo = ''
        }
      }
      this.logSearchForm.param.priceConfigLog.gasstationId = this.logRow.gasstationId
      $getMarketLog(this.logSearchForm).then((res) => {
        this.logData = res.data.records
        this.logTotal = res.data.total
      })
    },


    reset() {
      this.searchForm = {
        page: 1,
        size: 10,
        param: {}
      }
      this.getList()
    },

    pageChange(page) {
      this.searchForm.page = page
      this.getList()
    },
    sizeChange(limit) {
      this.searchForm.page = 1
      this.searchForm.size = limit
      this.getList()
    },


    pageChangeLog(page) {
      this.logSearchForm.page = page
      this.getLog()
    },
    sizeChangeLog(limit) {
      this.logSearchForm.page = 1
      this.logSearchForm.size = limit
      this.getLog()
    }
  }
}
</script>
<style lang="scss" scoped>

.count {
  padding: 10px;
  width:fit-content;
  display: flex;
  flex-direction: column;
  background-color: #fffdd3;
  .count-item {
    display: flex;
    margin-right: 15px;
    .count-key {
      color: #2f3337;
      font-size: 14px;
    }
    .count-value {
      color: red;
      font-size: 14px;
    }
  }
}
.tableStyle3 {
  font-weight: 400;

  background: "rgb(246, 246, 246)";
  color: "#606266";
}
.between {
  display: flex;
  justify-content: space-between;
}
.main {
  padding: 10px;
  display: flex;
  flex-direction: column;
  // .el-input__inner {
  //   height: 30px;
  //   line-height: 30px;
  // }
  // .el-input__icon {
  //   line-height: 30px;
  // }
}

.top-bg {
  padding: 15px 15px 0 15px;
  margin: 5px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.bg {
  padding: 15px;
  margin: 5px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.add {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.row {
  display: flex;
}


</style>
