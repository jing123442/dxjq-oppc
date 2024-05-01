<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="small" style="flex:1">

          <el-form-item label="">
            <el-input placeholder="请输入加气站" v-model="searchForm.param.gasstationName" clearable></el-input>
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
      >
        <el-table-column prop="gasstationName" label="加气站" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="actualPrice" label="执行中·标准定价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="platformPrice" label="执行中·标准售卖价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="gasprice" label="执行中·标准差价(元/公斤)" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="num" label="执行中·物流非标差价数量" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="updateDate" label="标准定价执行时间" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="经营模式" show-overflow-tooltip>
          <template ><div>新营销</div></template>
        </el-table-column>

        <el-table-column prop="orgName" label="交易模式" show-overflow-tooltip>
          <template ><div>直销加气</div></template>
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

  </div>
</template>
<script>

import { $getMarketStander } from '@/service/strategy'
import {
  utilsOrderStatus, utilsPriceType, utilsMarketType, utilsTradeModeType, utilsPayType
} from '@/utils/select'

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
    this.getList()
  },

  methods: {

    getList() {
      $getMarketStander(this.searchForm).then((res) => {
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
