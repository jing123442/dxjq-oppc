<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">
            <el-form-item label="">
            <el-input placeholder="请输入加气站" v-model="searchForm.param.gasstationName"  size="small"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-input placeholder="请输入物流客户" v-model="searchForm.param.carrierOrgName"  size="small"></el-input>
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
      <div class="between" style="margin-bottom:10px;margin-top: 10px;">
        <div></div>
          <div class="row">
            <el-button type="primary" @click="addGas" size="mini">新增</el-button>
            <el-button type="primary" @click="exportExcel()" size="mini">相关订单</el-button>
          </div>

      </div>
      <el-table
        :data="data"
        border
        size="mini"
        stripe
        :header-cell-style="{ background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="gasstationName" label="加气站" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="carrierOrgName" label="物流客户" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gasprice" label="执行中·非标差价(元/公斤)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gaspricePlan" label="最新非标差价(元/公斤)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="最新标准差价执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.auditStatus == 1">待审核</div>
            <div v-for="item,index in utilsExecuteStatus" :key="index" v-else>
              {{  item.value == scope.row.status?item.label:'' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="最新非标差价执行时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorDate" label="最新操作时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="operatorName" label="操作人" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">

          <el-button type="text" @click="del(scope.row)">删除</el-button>
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

    <el-dialog append-to-body width="30%"  title="新增" :visible.sync="showAddDialog">

      <el-form :model="addParams" :rules="rules" ref="addParams" >
          <el-form-item label="加气站(新营销直销加气)"  :label-width="formLabelWidth2" prop="gasstationIndex" >
            <el-select
            ref="gasSelect"
              v-model="addParams.gasstationIndex"
              clearable
              filterable
              placeholder="请输入"
            >

              <el-option
                v-for="(item,index) in stationList"
                :key="item.orgId"
                :label="item.orgShortName"
                :value="index"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="物流客户(直销加气)"  :label-width="formLabelWidth2" prop="carrierIndex" >
            <el-select
            value-key="id"
            ref="carrierSelect"
              v-model="addParams.carrierIndex"
              clearable
              filterable
              placeholder="请选择"
              @blur.native="selectBlur"
            >
              <el-option
                v-for="(item,index) in carrierList"
                :key="item.orgId"
                :label="item.orgShortName"
                :value="index"
              />
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="add()"
            >确 定</el-button
          >
        </div>
    </el-dialog>


    <el-dialog append-to-body width="80%"  :title="logRow.gasstationName+logRow.carrierOrgName+'物流非标差价调价记录'" :visible.sync="showLogDialog">
      <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">
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

          <el-form-item label="">
            <el-select  v-model="searchForm.param.auditType">
              <el-option v-for="item in utilsCheckPriceType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div style="width:150px">
          <el-button @click="resetLog()" size="mini" type="info" plain
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
        <el-table-column prop="gaspricePlan" label="非标差价(元/公斤)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updateDate" label="调价执行时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorDate" label="操作时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="调价执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.auditStatus == 1">待审核</div>
            <div v-for="item,index in utilsExecuteStatus" :key="index" v-else>
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


    <el-dialog append-to-body width="30%"  title="物流非标差价调价确认" :visible.sync="excuteSureDialog">
      <el-form ref="exportCar"  size="small" label-position="left">
        <el-form-item><div>{{ logRow. gasstationName}},{{ logRow.carrierOrgName }}</div></el-form-item>

        <el-form-item><div>物流非标差价:{{excuteParams.gaspricePlan}}元/公斤</div></el-form-item>
        <el-form-item>
          <div v-if="excuteParams.type==2">立即执行</div>
          <div v-else>预约{{excuteParams.updateDate}}执行</div>
        </el-form-item>

        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">

            <el-button
                       size="small"
                       type="primary"
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

    <el-dialog append-to-body width="60%"  title="调整物流非标差价(元/公斤)" :visible.sync="changePrice">
      <el-form ref="excuteSet"  size="small" label-position="left" :model="excuteParams" :rules="rulesUpdate">
        <el-form-item><div>{{ logRow. gasstationName}},{{ logRow.carrierOrgName }}</div></el-form-item>
        <el-form-item label="非标差价" :label-width="formLabelWidth" prop="gaspricePlan">
            <el-input v-model="excuteParams.gaspricePlan"  placeholder="请输入"    style="width: 300px;"></el-input>
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
              default-time="00:00:00"
              popper-class="no-time-picker"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            />
            执行(将作废执行中、已预约未执行调价)
        </el-form-item>

        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button  type="primary"
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

  </div>
</template>
<script>

import { $getMarketDiff, $getMarketDiffLog, $getMarketDiffDel, $getMarketDiffAdd, $getMarketUnDiffUpdate } from '@/service/strategy'
import { $userOrgList } from '@/service/user'
import {
  utilsMarketType, utilsCheckPriceType, utilsExecuteStatus
} from '@/utils/select'
import { monthTimeArea } from '@/utils/tools'
export default {
  data() {
    return {
      rulesUpdate: {
        gaspricePlan: [{ required: true, message: '请输入差价', trigger: 'blur' }],
        updateDate: [{ required: true, message: '请选择时间', trigger: 'blur' }]

      },
      rules: {
        gasstationIndex: [{ required: true, message: '请选择加气站', trigger: 'blur' }],
        carrierIndex: [{ required: true, message: '请选择物流公司', trigger: 'blur' }]
      },
      selectTypeValue: '0',
      selectType: [
        { name: '创建时间', value: '0' },
        { name: '支付时间', value: '1' }
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

      showAddDialog: false,
      form: {

      },
      totalInfo: {},
      totalCount: 0,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      formLabelWidth2: '180px',
      searchText: '',
      stationList: [],
      carrierList: [],

      auditNames: '',
      selectedList: [],
      changePrice: false,
      auditType: '1',

      excuteParams: {
        gasPricePlan: '', // 标准差价
        type: 2,
        updateDate: '',
        gasstationId: '',
        carrierOrgId: ''
      },
      excuteSureDialog: false,

      addParams: {

      }
    }
  },
  computed: {},
  mounted() {
    this.getList()
    this.getStation()
    this.getCarrier()
  },

  methods: {
    addGas() {
      this.showAddDialog = true
      // this.$nextTick(() => {
      //   this.$refs.gasSelect.$refs.scrollbar.$refs.wrap.addEventListener('scroll', this.gasScolling)
      //   this.$refs.carrierSelect.$refs.scrollbar.$refs.wrap.addEventListener('scroll', this.carrierScolling)
      // })
    },
    // gasScolling() {
    //   console.log('11111')
    //   const e = this.$refs.gasSelect.$refs.scrollbar.$refs.wrap
    //   const loadMore = e.scrollHeight - e.scrollTop <= e.clientHeight
    //   if (loadMore) {
    //     this.getStation()
    //   }
    // },

    carrierScolling() {
      const e = this.$refs.carrierSelect.$refs.scrollbar.$refs.wrap
      const loadMore = e.scrollHeight - e.scrollTop <= e.clientHeight
      if (loadMore) {
        this.getCarrier()
      }
    },

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
      $getMarketUnDiffUpdate(this.excuteParams).then((res) => {
        if (res.code == 0) {
          this.excuteSureDialog = false
          this.$message.success('执行成功')
          this.getList()
        }
      })
    },

    handleSelectionChange(e) {
      this.selectedList = e
    },

    showAuditM(row) {
      this.excuteParams = {
        gasPricePlan: '', // 标准差价
        type: 2,
        updateDate: '',
        id: row.id,
        gasstationId: row.gasstationId,
        carrierOrgId: row.carrierOrgId
      }
      this.changePrice = true
      this.logRow = row
    },

    getStation() {
      $userOrgList({
        page: 1,
        size: -1,
        param: {
          org: {
            orgType: 1
          }
        }
      }).then((res) => {
        if (res.code == 0) {
          this.stationList = res.data.records
        }
      })
    },

    getCarrier() {
      $userOrgList({
        page: 1,
        size: -1,
        param: {
          org: {
            orgType: 2
          }
        }
      }).then((res) => {
        if (res.code == 0) {
          this.carrierList = res.data.records
        }
      })
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
      const periodTime = monthTimeArea(new Date())
      this.logUpdateTime.push(periodTime.start)
      this.logUpdateTime.push(periodTime.end)
      this.getLog()
    },
    del(row) {
      this.$confirm('确认作废?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $getMarketDiffDel({ id: row.id }).then((res) => {
          if (res.code == 0) {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    add() {
      this.$refs.addParams.validate((valid) => {
        if (valid) {
          const carrier = this.carrierList[this.addParams.carrierIndex]
          const gastaion = this.stationList[this.addParams.gasstationIndex]
          const obj = {
            carrierOrgId: carrier.orgId,
            carrierOrgName: carrier.orgName,
            gasstationId: gastaion.orgId,
            gasstationName: gastaion.orgName
          }
          $getMarketDiffAdd(obj).then((res) => {
            if (res.code == 0) {
              this.showAddDialog = false
              this.$message.success('新增成功')
              this.getList()
            }
          })
        }
      })
    },
    getList() {
      $getMarketDiff(this.searchForm).then((res) => {
        this.data = res.data.records
        this.totalCount = res.data.total
      })
    },

    getLog() {
      this.logSearchForm.param.dateParam = {}
      if (!this.logUpdateTime) {
        this.logUpdateTime = []
      }
      if (this.selectTypeValue == '0') {
        if (this.logUpdateTime.length > 0) {
          this.logSearchForm.param.dateParam.createDateFrom = this.logUpdateTime[0]
          this.logSearchForm.param.dateParam.createDateTo = this.logUpdateTime[1]
        } else {
        }
      } else {
        if (this.logUpdateTime.length > 0) {
          this.logSearchForm.param.dateParam.updateDateFrom = this.logUpdateTime[0]
          this.logSearchForm.param.dateParam.updateDateTo = this.logUpdateTime[1]
        } else {
        }
      }
      this.logSearchForm.param.priceConfigLog.gasstationId = this.logRow.gasstationId
      this.logSearchForm.param.priceConfigLog.carrierOrgId = this.logRow.carrierOrgId
      $getMarketDiffLog(this.logSearchForm).then((res) => {
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
