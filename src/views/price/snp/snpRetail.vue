<template>
  <div class="template-main">
    <em-table-list :tableListName="'listing'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog :title="`${currRow?.gasstationName}站`" :visible.sync="dialogMeasureVisible" width="80%" :append-to-body="true">
      <h3>单站调价（单位：元/公斤）</h3>
      <el-form ref="ruleForm" :inline="true" :model="priceConfigPlan" :rules="rules" class="demo-form-inline">
        <el-form-item label="零售价" prop="platformPrice">
          <el-input v-model="priceConfigPlan.platformPrice" placeholder="零售价" @blur="handleBlur" @focus="handleFocus" @input="handleInputNumber(priceConfigPlan, 'platformPrice')"></el-input>
          <div :class="{ 'input-has-mask': noEdit }"></div>
        </el-form-item>
        <el-form-item>=</el-form-item>
        <el-form-item label="总利润" prop="profit">
          <el-input v-model="priceConfigPlan.profit" placeholder="总利润" @blur="handleBlur" @focus="handleFocus" @input="handleInputNumber(priceConfigPlan, 'profit')"></el-input>
          <div :class="{ 'input-has-mask': noEdit }"></div>
        </el-form-item>
        <el-form-item>+</el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input v-model="priceConfigPlan.freight" placeholder="运费" @blur="handleBlur" @focus="handleFocus" @input="handleInputNumber(priceConfigPlan, 'freight')"></el-input>
          <div :class="{ 'input-has-mask': noEdit }"></div>
        </el-form-item>
        <el-form-item>+</el-form-item>
        <el-form-item label="出港价" prop="harbourPrice">
          <el-input v-model="priceConfigPlan.harbourPrice" placeholder="出港价" @blur="handleBlur" @focus="handleFocus" @input="handleInputNumber(priceConfigPlan, 'harbourPrice')"></el-input>
          <div :class="{ 'input-has-mask': noEdit }"></div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <el-radio v-model="status" label="2">立即执行</el-radio>
          <span class="grey-text">（作废 执行中、已预约未执行 调价）</span>
        </el-form-item>
        <br />
        <el-form-item>
          <el-radio v-model="status" label="1">预约执行</el-radio>
          <el-form-item>
            <el-date-picker
              v-model="updateDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <span>执行</span>
          <span class="grey-text">（作废 执行中、已预约未执行 调价）</span>
        </el-form-item>
        <br />
        <el-form-item style="text-align: right; display: block;">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="`${currRow?.gasstationName}站 调价记录`" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogChangeVisible" :custTableTitle="`${currRow?.gasstationName}站 调价记录`" :tableListName="'listingLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="log_select_list" @onReqParams="onReqLogParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, calc, handleInputNumber } from '@/utils/tools'
import { $priceConfigPlan } from '@/service/strategy'
import { mapGetters } from 'vuex'
export default {
  name: 'snpRetail',
  data() {
    return initVueDataOptions(this, {
      releaseRow: [],
      dialogReleaseVisible: false,
      fromRow: {},
      dialogFromVisible: false,
      logRow: [],
      dialogChangeVisible: false,
      measureRow: [],
      currRow: {},
      dialogMeasureVisible: false,
      queryCustURL: {
        list: {
          url: 'strategy/price_config_snp_plan/list',
          // url: 'strategy/price_config/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: 'strategy/price_config_snp_plan/add',
          method: 'post'
        },
        del: {
          url: 'strategy/price_config_snp_plan/remove',
          name: ['gasstationName'],
          method: 'post',
          props: {
            id: 'id',
            gasstationId: 'gasstationId'
          }
        },
        name: '中石化零售价'
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/price_config_snp_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加名单' }],
      dialogAddVisible: false,
      priceConfigPlan: {
        platformPrice: '',
        profit: '',
        freight: '',
        harbourPrice: ''
      },
      updateDate: '',
      status: '2', // 2: 立即执行；1: 预约执行；
      rules: {
        platformPrice: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        profit: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        freight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        harbourPrice: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      noEdit: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_snpRetail_mode_list',
      page_status: 'price_snpRetail_page_status',
      page_column: 'price_snpRetail_column',
      select_list: 'price_snpRetail_select_list',
      log_page_column: 'price_snpRetail_log_column',
      log_select_list: 'price_snpRetail_log_select_list',
      from_page_column: 'price_listing_from_column',
      measure_page_column: 'price_listing_measure_column',
      release_page_column: 'price_listing_release_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  watch: {
    priceConfigPlan: {
      handler() {
        const a = this.getHasValueLength()
        if (a === Object.keys(this.priceConfigPlan).length - 1) {
          this.noEdit = true
        }
      },
      deep: true
    }
  },
  created: function () { },
  methods: {
    handleInputNumber,
    getHasValueLength() {
      let a = 0
      for (const key in this.priceConfigPlan) {
        if (this.priceConfigPlan[key] !== '') {
          a++
        }
      }
      return a
    },
    handleBlur() {
      const a = this.getHasValueLength()
      if (a === (Object.keys(this.priceConfigPlan).length - 1)) {
        let nullKey = ''
        for (const key in this.priceConfigPlan) {
          if (this.priceConfigPlan[key] === '') {
            nullKey = key
          }
        }
        const { platformPrice } = this.priceConfigPlan
        if (nullKey === 'platformPrice') {
          this.priceConfigPlan[nullKey] = 0
          for (const key in this.priceConfigPlan) {
            if (key !== 'platformPrice') {
              // this.priceConfigPlan[nullKey] += this.priceConfigPlan[key]
              this.priceConfigPlan[nullKey] = calc.plus(this.priceConfigPlan[nullKey], this.priceConfigPlan[key])
            }
          }
        } else {
          let otherPrice = 0
          for (const key in this.priceConfigPlan) {
            if (key !== nullKey && key !== 'platformPrice') {
              // otherPrice += this.priceConfigPlan[key]
              otherPrice = calc.plus(otherPrice, this.priceConfigPlan[key])
            }
          }
          // this.priceConfigPlan[nullKey] = platformPrice - otherPrice
          this.priceConfigPlan[nullKey] = calc.subtract(platformPrice, otherPrice)
        }
        setTimeout(() => {
          this.noEdit = false
        }, 1000)
      }
    },
    handleFocus(e) {
      const a = this.getHasValueLength()
      if (a === Object.keys(this.priceConfigPlan).length) {
        e.srcElement.blur()
        this.$confirm('确定重新填写等式？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.ruleForm.resetFields()
        }).catch(() => {
          console.log('取消')
        })
      }
    },
    onListEvent(type, row) {
      this.currRow = row
      if (type === 'change_price_list') {
        this.dialogChangeVisible = true
      } else if (type === 'change_price') {
        this.dialogMeasureVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqLogParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { priceConfigLog: {}, dateParam: {} } })

      if (_this.tableListName == 'listingLog') {
        params.param.priceConfigLog.gasstationId = this.currRow.gasstationId
        params.param.priceConfigLog.id = this.currRow.id
      }
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          // if (v !== '') params.param.dateParam[k] = v
          if (k == 'operatorDate') {
            if (_this.finds.operatorDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else if (k == 'updateDate') {
            if (_this.finds.updateDate === null) {
              params.param.dateParam.updateFrom = ''
              params.param.dateParam.updateTo = ''
            } else {
              params.param.dateParam.updateFrom = v[0]
              params.param.dateParam.updateTo = v[1]
            }
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.status = '2'
      this.updateDate = ''
      this.dialogMeasureVisible = false
    },
    onCancel() {
      this.resetForm()
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.status === '1') {
            const currentDateTime = (new Date()).getTime()
            const updateDateTime = this.updateDate.getTime()
            if (updateDateTime < currentDateTime) {
              this.$message.warning('请选择当前时间之后的时间')
              return
            }
          }
          $priceConfigPlan('strategy/price_config_snp_plan/update', {
            id: this.currRow.id || this.currRow.gasstationId,
            gasstationId: this.currRow.gasstationId,
            updateDate: this.status === '1' ? this.updateDate : new Date(),
            status: this.status,
            ...this.priceConfigPlan
          }).then(res => {
            this.resetForm()
            this.$message.success('调价成功')
            this.$refs.tables.initDataList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.el-divider--horizontal) {
  margin: 0 0 16px;
}
.demo-form-inline {
  padding-bottom: 5px;
  .grey-text {
    color: #999;
  }
}
:deep(.el-form--inline) {
  .el-form-item__content {
    position: relative;
    .input-has-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      z-index: 10;
    }
  }
  .el-input {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
}
</style>
