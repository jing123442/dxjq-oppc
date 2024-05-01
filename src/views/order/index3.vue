<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">
          <el-form-item label="">
            <el-select v-model="selectTypeValue">
              <el-option v-for="item in selectType" :label="item.name" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

            <el-form-item label="">
            <el-date-picker
              v-model="arrayTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              clearable
              @change="changeTime"
            >
            </el-date-picker>
            </el-form-item>

            <el-form-item label="">
            <el-input placeholder="请输入物流公司" v-model="searchForm.param.gasOrder.carrierOrgName"  size="small"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-select  v-model="numberTypeKey">
              <el-option v-for="item in numberType" :label="item.name" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-input placeholder="请输入" v-model="numberTypeValue" ></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-input placeholder="请输入加气站" v-model="searchForm.param.gasOrder.gasstationName" clearable></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-select v-model="searchForm.param.gasOrder.marketType" placeholder="请选择<经营模式>">
              <el-option v-for="item in utilsMarketType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-select v-model="searchForm.param.gasOrder.priceType" placeholder="请选择<标准定价策略>">
              <el-option v-for="item in utilsPriceType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-select v-model="searchForm.param.gasOrder.tradeType" placeholder="请选择<交易模式>">
              <el-option v-for="item in utilsTradeModeType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-select v-model="searchForm.param.gasOrder.orderStatus" placeholder="请选择<订单状态>">
              <el-option v-for="item in utilsOrderStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
       </el-form-item>

       <el-form-item label="">
            <el-select v-model="searchForm.param.gasOrder.payType" placeholder="请选择<支付方式>">
              <el-option v-for="item in utilsPayType" :label="item.label" :value="item.value" :key="item.value"></el-option>
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

      <div class="count">
          <div class="row">
            <div class="count-item">
              <div class="count-key">
                加气总金额：{{ totalInfo.amount||'—' }}
              </div>
              <div class="count-value">元</div>
          </div>

          <div class="count-item">
          <div class="count-key">
                加气总量：{{ totalInfo.totalGas||'—' }}
              </div>
              <div class="count-value">公斤</div>
            </div>
          </div>
          </div>

      <div class="between" style="margin-bottom:10px;margin-top: 10px;">

      </div>

      <el-table
        :data="data"
        border
        size="mini"
        stripe
        :header-cell-style="{ background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
      >
        <el-table-column prop="orderId" label="订单编号" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="updateDate" label="支付时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="结算价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="加气量(公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="结算金额(元)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="物流客户" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="车牌号" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="驾驶员姓名" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="加气站" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="收银员姓名" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="经营模式" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="标准定价策略" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="交易模式" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="订单状态" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="操作" show-overflow-tooltip>
          <template v-slot="scope">
            <el-button type="text" @click="getDetail(scope.row.orderId)">详情</el-button>
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

    <el-dialog
      title="详情"
      :visible.sync="dialogFormVisible"
      width="80%"
      append-to-body
    >
      <el-form   ref="form" :inline="true">
        <el-row>
          <el-col :sapn="6">
            <el-col :span="4">111</el-col>
            <el-col :span="20">111</el-col>
          </el-col>
          <el-row :sapn="6">
            <el-col :span="12">111</el-col>
            <el-col :span="12">111</el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import { $gasOrderWithTime } from '@/service/pay'
import {
  utilsOrderStatus, utilsPriceType, utilsMarketType, utilsTradeModeType, utilsPayType
} from '@/utils/select'

import { monthTimeArea } from '@/utils/tools'
export default {
  data() {
    return {
      selectTypeValue: '0',
      selectType: [
        { name: '创建时间', value: '0' },
        { name: '支付时间', value: '1' }
      ],
      numberTypeKey: '0',
      numberTypeValue: '',
      numberType: [
        { name: '车牌号', value: '0' },
        { name: '订单编号', value: '1' },
        { name: '司机姓名', value: '2' },
        { name: '收银员姓名', value: '3' }
      ],
      utilsOrderStatus: utilsOrderStatus(),
      utilsPriceType: utilsPriceType(),
      utilsMarketType: utilsMarketType(),
      utilsTradeModeType: utilsTradeModeType(),
      utilsPayType: utilsPayType(),

      data: [],
      arrayTime: [],
      searchForm: {
        page: 1,
        size: 10,
        param: {
          dateParam: {
            updateDateFrom: '',
            updateDateTo: ''
          },
          gasOrder: {}
        }
      },
      totalInfo: {},
      totalCount: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchText: ''
    }
  },
  computed: {},
  mounted() {
    const periodTime = monthTimeArea(new Date())
    this.arrayTime.push(periodTime.start)
    this.arrayTime.push(periodTime.end)
    console.log(' this.arrayTime', this.arrayTime)
    this.getList()
  },

  methods: {
    getDetail(id) {
      this.dialogFormVisible = true
    },
    removeEmpty(obj) {
      const finalObj = {}
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          const nestedObj = this.removeEmpty(obj[key])
          if (Object.keys(nestedObj).length) {
            finalObj[key] = nestedObj
          }
        } else if (Array.isArray(obj[key])) {
          if (obj[key].length) {
            obj[key].forEach((x) => {
              const nestedObj = this.removeEmpty(x)
              if (Object.keys(nestedObj).length) {
                finalObj[key] = finalObj[key] ? [...finalObj[key], nestedObj] : [nestedObj]
              }
            })
          }
        } else if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
          finalObj[key] = obj[key]
        }
      })
      return finalObj
    },

    changeTime(e) {
      console.log(e)
      if (!e) {
        this.arrayTime = []
      }
    },
    changeSelect(e) {
      console.log('changeSelect', e)
      this.searchForm.page = 1
      this.getList()
    },
    /** 切换车牌号等 */
    changeNumberSelect(e) {
      console.log('changeNumberSelect', e)
    },
    getList() {
      if (this.arrayTime.length == 0) {
        this.searchForm.param.dateParam.createDateFrom = ''
        this.searchForm.param.dateParam.createDateTo = ''
        this.searchForm.param.dateParam.updateDateFrom = ''
        this.searchForm.param.dateParam.updateDateTo = ''
      } else if (this.selectTypeValue == 0) { // 创建时间
        this.searchForm.param.dateParam.createDateFrom = this.arrayTime[0]
        this.searchForm.param.dateParam.createDateTo = this.arrayTime[1]
      } else {
        this.searchForm.param.dateParam.updateDateFrom = this.arrayTime[0]
        this.searchForm.param.dateParam.updateDateTo = this.arrayTime[1]
      }

      if (!this.numberTypeValue) {
        this.searchForm.param.gasOrder = {}
      } else if (this.numberTypeKey == '0') { // 车牌号
        this.searchForm.param.gasOrder.carNumber = this.numberTypeValue
      } else if (this.numberTypeKey == '1') { // 订单编号
        this.searchForm.param.gasOrder.orderId = this.numberTypeValue
      } else if (this.numberTypeKey == '2') { // 司机姓名
        this.searchForm.param.gasOrder.driverName = this.numberTypeValue
      } else if (this.numberTypeKey == '3') { // 收银员姓名
        this.searchForm.param.gasOrder.cashierName = this.numberTypeValue
      }
      // this.searchForm = this.removeEmpty(this.searchForm)
      $gasOrderWithTime(this.searchForm).then((res) => {
        this.data = res.data.records
        this.totalCount = res.data.total
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
