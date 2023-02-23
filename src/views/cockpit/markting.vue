<template>
  <div class="main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="mini">
          <el-form-item label="">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
                交易总量：11
              </div>
              <div class="count-value">公斤</div>
          </div>

          <div class="count-item">
          <div class="count-key">
                含税采购成本：11
              </div>
              <div class="count-value">元</div>
            </div>

            <div class="count-item">
            <div class="count-key">
                含税销售收入：11
              </div>
              <div class="count-value">元</div>
            </div>

          </div>
          <div class="row" style="margin-top:10px">

            <div class="count-item">
              <div class="count-key">
                毛利：11
              </div>
              <div class="count-value">公斤</div>
          </div>

          <div class="count-item">
          <div class="count-key">
                不含税采购成本：11
              </div>
              <div class="count-value">元</div>
            </div>

            <div class="count-item">
            <div class="count-key">
                不含税销售收入：11
              </div>
              <div class="count-value">元</div>
            </div>

          </div>


          </div>



      <div class="between" style="margin-bottom:10px;margin-top: 10px;">
          <el-select v-model="type" size="mini">
            <el-option
              v-for="item in selectType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-button type="primary" @click="getList()" size="mini">导出</el-button>

      </div>

      <el-table
        :data="data"
        border
        size="mini"
        stripe
        :header-cell-style="headerStyle"
      >
        <el-table-column prop="orgName" label="加气站" show-overflow-tooltip>
          <template v-slot="scope">
            <div>{{ scope.row.orgName || "—" }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateDate"
          :label="labelNum()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updateDate || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum1()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum2()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum3()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum4()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum5()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum6()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum7()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum8()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum9()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum10()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum11()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="updaterName"
          :label="labelNum12()"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <div>{{ scope.row.updaterName || "—" }}</div>
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
      title="新建绑定"
      :visible.sync="dialogFormVisible"
      width="30%"
      append-to-body
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="企业名称"
          :label-width="formLabelWidth"
          prop="orgId"
          v-if="userType != 2"
        >
          <el-select
            v-model="form.orgId"
            clearable
            filterable
            placeholder="请输入"
          >
            <el-option
              v-for="item in comList"
              :key="item.id"
              :label="item.orgName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备ID"
          :label-width="formLabelWidth"
          prop="clientId"
          v-if="userType != 2"
        >
          <el-select
            v-model="form.clientId"
            clearable
            filterable
            placeholder="请选择"
            @blur.native="selectBlur"
            @change="selectBlur"
          >
            <el-option
              v-for="(item, index) in unBindList"
              :key="index"
              :label="item.clientId"
              :value="index"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备ID"
          :label-width="formLabelWidth"
          prop="clientId"
          v-else
        >
          <el-input
            v-model="form.clientId"
            placeholder="请输入设备ID"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClient('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
        return '含税·购销价\n(元)'
      },
      labelNum6() {
        return '含税·单吨购销价\n(元/吨)'
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

      value1: '',
      type: '0',
      selectType: [
        { name: '按加气站分组', value: '0' },
        { name: '按物流客户分组', value: '1' }
      ],
      rules: {
        clientId: [
          { required: true, message: '设备ID不能为空', trigger: 'blur' }
        ],
        orgId: [{ required: true, message: '请选择企业', trigger: 'blur' }]
      },
      data: [],
      searchForm: {
        page: 1,
        size: 10,
        param: {}
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
      searchText: ''
    }
  },
  computed: {},
  mounted() {},

  methods: {
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
