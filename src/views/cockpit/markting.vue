<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="mini">
          <el-form-item label="">
            <el-date-picker
              v-model="updateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              clearable

            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div>
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
                交易总量：{{ totalData.gasQtyTotal||'—' }}
              </div>
              <div class="count-value">公斤</div>
          </div>

          <div class="count-item">
          <div class="count-key">
                含税采购成本：{{ totalData.costWithTax||'—' }}
              </div>
              <div class="count-value">元</div>
            </div>

            <div class="count-item">
            <div class="count-key">
                含税销售收入：{{ totalData.incomeWithTax||'—' }}
              </div>
              <div class="count-value">元</div>
            </div>

          </div>
          <div class="row" style="margin-top:10px">

            <div class="count-item">
              <div class="count-key">
                毛利：{{ totalData.profitTotal||'—' }}
              </div>
              <div class="count-value">公斤</div>
          </div>

          <div class="count-item">
          <div class="count-key">
                不含税采购成本：{{ totalData.costWithoutTax||'—' }}
              </div>
              <div class="count-value">元</div>
            </div>

            <div class="count-item">
            <div class="count-key">
                不含税销售收入：{{ totalData.incomeWithoutTax||'—' }}
              </div>
              <div class="count-value">元</div>
            </div>

          </div>
          </div>

      <div class="between" style="margin-bottom:10px;margin-top: 10px;">
          <el-select v-model="searchForm.param.type" size="mini" @change="changeSelect">
            <el-option
              v-for="item in selectType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="exportExcel()" size="mini">导出</el-button>
      </div>

      <el-table
        :data="data"
        border
        size="mini"
        stripe
        :header-cell-style="headerStyle"
      >
        <el-table-column prop="orgName" :label="searchForm.param.type=='0'?'加气站':'物流公司'" show-overflow-tooltip>
          <template v-slot="scope">
            <div>{{ scope.row.orgName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="gasQty"
          :label="labelNum()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.gasQty || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="costWithTaxAvg"
          :label="labelNum1()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.costWithTaxAvg || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="costWithTax"
          :label="labelNum2()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.costWithTax || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="incomeWithTaxAvg"
          :label="labelNum3()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.incomeWithTaxAvg || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="incomeWithTax"
          :label="labelNum4()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.incomeWithTax || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="ppdWithTax"
          :label="labelNum5()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.ppdWithTax || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="ppdWithTaxAvg"
          :label="labelNum6()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.ppdWithTaxAvg || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="costWithoutTaxAvg"
          :label="labelNum7()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.costWithoutTaxAvg || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="costWithoutTax"
          :label="labelNum8()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.costWithoutTax || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="incomeWithoutTaxAvg"
          :label="labelNum9()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.incomeWithoutTaxAvg || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="incomeWithoutTax"
          :label="labelNum10()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.incomeWithoutTax || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="profit"
          :label="labelNum11()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.profit || "" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="profitAvg"
          :label="labelNum12()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.profitAvg || "" }}</div>
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

  </div>
</template>
<script>

import { $settleMarketGetSumWithTime, $settleMarketGetWithTime, $settleMarketDownLoad } from '@/service/settle'
import { monthTimeArea, exportBlobToFiles } from '@/utils/tools'

export default {
  data() {
    return {

      labelNum() {
        return '交易数量\n(公斤)'
      },
      labelNum1() {
        return ' 含税·采购均价\n(元/公斤)'
      },
      labelNum2() {
        return '含税·采购成本\n(元/公斤)'
      },
      labelNum3() {
        return '含税·销售均价\n(元/公斤)'
      },
      labelNum4() {
        return '含税·销售收入\n(元)'
      },
      labelNum5() {
        return '含税·购销差\n(元)'
      },
      labelNum6() {
        return '含税·单吨购销差\n(元/吨)'
      },
      labelNum7() {
        return '不含税·采购均价\n(元/公斤)'
      },
      labelNum8() {
        return '不含税·采购成本\n(元/公斤)'
      },
      labelNum9() {
        return ' 不含税·销售均价\n(元/公斤)'
      },
      labelNum10() {
        return '不含税·销售收入\n(元)'
      },
      labelNum11() {
        return '不含税·毛利\n(元)'
      },
      labelNum12() {
        return '不含税·单吨毛利\n(元/吨)'
      },

      selectType: [
        { name: '按加气站分组', value: '0' },
        { name: '按物流客户分组', value: '1' }
      ],
      data: [],
      updateTime: [],
      searchForm: {
        page: 1,
        size: 10,
        param: {
          dateParam: {
          },
          type: '0'
        }
      },
      form: {
        clientId: '',
        orgId: ''
      },
      totalCount: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      comList: [],
      clientList: [],
      userType: 0,
      userInfo: {},
      unBindList: [],
      searchText: '',
      totalData: {}
    }
  },
  computed: {},
  mounted() {
    const periodTime = monthTimeArea(new Date(), 'yyyy-MM-dd')
    this.updateTime.push(periodTime.start)
    this.updateTime.push(periodTime.end)
    this.getList()
  },

  methods: {
    changeSelect(e) {
      console.log('changeSelect', e)
      this.searchForm.page = 1
      this.getList()
    },
    exportExcel() {
      const params = { dateParam: {}, type: 0 }
      if (this.updateTime && this.updateTime.length > 0) {
        params.dateParam.updateDateFrom = this.updateTime[0]
        params.dateParam.updateDateTo = this.updateTime[1]
      } else {
        this.$message.error('请选择导出时间')
        return
      }
      params.type = this.searchForm.param.type
      $settleMarketDownLoad(params).then((res) => {
        console.log('resss', res)
        const fileName = '新营销毛利核算' + '_' + (new Date().getTime()) + '.xlsx'
        exportBlobToFiles(res, fileName)
      })
    },

    getList() {
      if (this.updateTime) {
        this.searchForm.param.dateParam.updateDateFrom = this.updateTime[0]
        this.searchForm.param.dateParam.updateDateTo = this.updateTime[1]
      } else {
        this.searchForm.param.dateParam = {}
      }

      $settleMarketGetWithTime(this.searchForm).then((res) => {
        this.data = res.data.records
        this.totalCount = res.data.total
      })
      $settleMarketGetSumWithTime(this.searchForm).then((res) => {
        this.totalData = res.data
        // this.data = res.data
        // this.totalCount = res.data.total
      })
    },

    headerStyle({ column, rowIndex, columnIndex }) {
      console.log('rowIndex', rowIndex)
      if (rowIndex == 0) {
        if (columnIndex > 1 && columnIndex <= 7) {
          console.log('columnIndex', columnIndex)
          return ' background-color: #E0E0FF ;color:#606266;borderColor: #EBEEF5;'
        } else if (columnIndex > 7) {
          return ' background-color: #DCEDC1 ;color:#606266;borderColor: #EBEEF5;'
        } else {
          return 'tableStyle3'
        }
      }
    },

    addClient(ref) {
      this.$refs[ref].validate((valid) => {
        if (this.userType == 2) {
          this.form.orgId = this.userInfo.orgId
        }
      })
    },
    reset() {
      this.updateTime = []
      this.searchForm = {
        page: 1,
        size: 10,
        param: {
          dateParam: {

          },
          type: '0'
        }
      }
      const periodTime = monthTimeArea(new Date(), 'yyyy-MM-dd')
      this.updateTime.push(periodTime.start)
      this.updateTime.push(periodTime.end)
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
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .el-input__icon {
    line-height: 30px;
  }
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
