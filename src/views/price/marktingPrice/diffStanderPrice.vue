<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">
            <el-form-item label="">
            <el-input placeholder="请输入加气站" v-model="searchForm.param.gasstationName"  size="small"></el-input>
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

        <el-table-column prop="gaspricePlan" label="执行中·标准差价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="gasprice" label="最新标准差价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="status" label="最新标准差价执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="item,index in utilsExecuteStatus" :key="index">
              {{  item.value == scope.row.status?item.label:'' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="最新售标准差价执行时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorDate" label="最新操作时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorName" label="操作人" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
          <el-button type="text" @click="changeLog(scope.row)">调价记录</el-button>
          <el-button type="text" @click="showAuditM(scope.row)">调价</el-button>
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


    <el-dialog append-to-body width="80%"  :title="logRow.gasstationName+'标准差价调价记录'" :visible.sync="showLogDialog">
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

        <el-table-column prop="platformPrice" label="标准差价(元/公斤)" show-overflow-tooltip>
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


    <el-dialog append-to-body width="60%"  title="调整标准差价(元/公斤)" :visible.sync="changePrice">
      <el-form ref="excuteSet"  size="small" label-position="left" :model="excuteParams" :rules="rules">
        <el-form-item><div>{{ auditNames }}共({{selectedList.length}}个站）</div></el-form-item>
        <el-form-item label="标准差价" :label-width="formLabelWidth" prop="gasprice">
            <el-input v-model="excuteParams.gasprice"  placeholder="请输入"    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="" >
         <el-radio v-model="excuteParams.type" :label="2">立即执行(将作废执行中、已预约未执行调价)</el-radio>
        </el-form-item>

        <el-form-item label="" >
         <el-radio v-model="excuteParams.type" :label="1">预约</el-radio>
         <el-date-picker
            style="width: 300px;"
            :disabled="excuteParams.type==2"
              v-model="excuteParams.updateDate"
              type="datetime"
              placeholder="请选择"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            />
            执行(将作废执行中、已预约未执行调价)
        </el-form-item>

        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button type="auditType"
                       size="small"
                        @click="checkExcute()">确定
            </el-button>
            <el-button
                       size="small"
                        @click="changePrice=false">取消
            </el-button>
          </div>
        </el-form-item>
        </el-form>
    </el-dialog>



    <el-dialog append-to-body width="30%"  title="调整标准差价" :visible.sync="excuteSureDialog">
      <el-form ref="exportCar"  size="small" label-position="left">
        <el-form-item><div>{{ auditNames }}共({{selectedList.length}}个站）</div></el-form-item>

        <el-form-item><div>标准差价:{{excuteParams.gasprice}}元/公斤</div></el-form-item>
        <el-form-item>
          <div v-if="excuteParams.type==2">立即执行</div>
          <div v-else>预约{{excuteParams.updateDate}}执行</div>
        </el-form-item>


        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">

            <el-button type="auditType"
                       size="small"
                        @click="excuteUpdate()">确定
            </el-button>
            <el-button
                       size="small"
                        @click="excuteSureDialog=false">取消
            </el-button>
          </div>
        </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>
<script>

import { $getMarketDiffStander, $getMarketDiffStanderLog, $getMarketPriceUpdate } from '@/service/strategy'
import {
  utilsMarketType, utilsCheckPriceType, utilsExecuteStatus
} from '@/utils/select'

export default {
  data() {
    return {
      rules: {
        gasprice: [{ required: true, message: '请输入差价', trigger: 'blur' }],
        updateDate: [{ required: true, message: '请选择时间', trigger: 'blur' }]

      },
      selectTypeValue: '0',
      selectType: [
        { name: '操作时间', value: '0' },
        { name: '调价执行时间', value: '1' }
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
      formLabelWidth: '80px',
      searchText: '',



      auditNames: '',
      selectedList: [],
      changePrice: false,
      auditType: '1',

      excuteParams: {
        gasprice: '', // 标准差价
        type: 2,
        updateDate: '',
        gasstationId: ''
      },
      excuteSureDialog: false

    }
  },
  computed: {},
  mounted() {
    this.getList()
  },

  methods: {
    checkExcute() {
      this.$refs.excuteSet.validate((valid) => {
        console.log('validvalid', valid)
        if (valid) {
          this.excuteSureDialog = true
          this.changePrice = false
        }
      })
    },

    excuteUpdate() {
      $getMarketPriceUpdate(this.excuteParams).then((res) => {
        if (res.code == 0) {
          this.$message.success('执行成功')
          this.getList()
        }
      })
    },

    inputPrice(e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      console.log('e', e.target.value)
      this.gasprice = e.target.value
    },

    handleSelectionChange(e) {
      this.selectedList = e
    },

    showAuditM(row) {
      this.excuteParams = {
        gasprice: '', // 标准差价
        type: 2,
        updateDate: '',
        gasstationId: ''
      }
      this.changePrice = true
      if (this.selectedList.length == 0) {
        this.selectedList.push(row)
      }
      let names = ''; let ids = ''
      for (let i = 0; i < this.selectedList.length; i++) {
        if (i == this.selectedList.length - 1) {
          names = names + this.selectedList[i].nickName
          ids = ids + this.selectedList[i].gasstationId
        } else {
          names = names + this.selectedList[i].nickName + ','
          ids = ids + this.selectedList[i].gasstationId + ','
        }
        this.auditNames = names
      }
      this.excuteParams.gasstationId = ids
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
    setCheckType() {

    },
    check() {

    },
    getList() {
      $getMarketDiffStander(this.searchForm).then((res) => {
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
      $getMarketDiffStanderLog(this.logSearchForm).then((res) => {
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
