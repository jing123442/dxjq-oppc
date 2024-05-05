<template>
  <section class="measure-root">
    <div class="firstLine">
      <div class="firstLine-left line-space">
        当月【<span class="bold-txt">{{measureMonth}}</span>】测算（ 测算时间：{{measureTime}} ）
      </div>
      <div class="firstLine-right">
        <el-form :inline="true" ref='measureForm' :model="formMeasure" :rules='rules' size="small">
          <el-form-item label="利润目标" prop="profitTarget" class="right-space">
            <el-input  v-model="formMeasure.profitTarget" placeholder="0.00" @input="handleInputNumber(formMeasure, 'surplusProfit')">
                <span  slot="suffix">元 </span>
            </el-input>
          </el-form-item>
          <!-- 其他成本在总测算中填写 -->
          <el-form-item v-if='measureType == "total"' label="其他成本" prop="otherCost" class="right-space">
            <el-input v-model="formMeasure.otherCost" placeholder="0.00" @input="handleInputNumber(formMeasure, 'surplusProfit')">
                <span  slot="suffix">元 </span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  size="small" @click="getMeasureData">重新测算</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

     <div class="seconedLine line-space">近一周【 {{lastWeekRange}} 】日均销量： {{dailySale}} 公斤（线上： {{ onlineDailySale }} 公斤&nbsp;|&nbsp;线下： {{ offlineDailySale }}公斤 ）</div>
     <div class="thirdLine line-space">
       <div class="left">
          当月，已完成利润： {{completeProfit}} 元
          （
          <span class="red-txt">让利：{{completeDiscount}}元</span>
          &nbsp;/&nbsp;
          <span class="blue-txt">加价：{{completeMarkup}}元</span>
          ）
        </div>
       <div class="middle">
        | &nbsp; 预计剩余利润： {{surplusProfit}} 元
          （
          <span class="red-txt">让利：{{surplusDiscount}}元</span>
          &nbsp;/&nbsp;
          <span class="blue-txt">加价：{{surplusMarkup}}元</span>
          ）
       </div>
       <div class="right">
         | &nbsp;预计目标完成率： {{expectTargetRate}}%
       </div>
      </div>
  </section>
</template>

<script>
import { handleInputNumber } from '@/utils/tools'
export default {
  name: 'measurement',
  props: {
    editMeasureData: {
      type: Object,
      default: () => {}
    },
    measureType: {
      type: String,
      default: 'total' // total: 总测算，single: 单站测算
    }
  },
  data () {
    var validateEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'))
      }
    }
    return {
      formMeasure: {
        profitTarget: '', // 利润目标
        otherCost: '' // 其他成本
      },
      rules: {
        profitTarget: [
          { validator: validateEmpty, trigger: 'change' }
        ],
        otherCost: [
          { validator: validateEmpty, trigger: 'change' }
        ]
      },
      measureLoading: false,
      measureMonth: '2024-5',
      measureTime: '2024-5-2 12:10:00',
      lastWeekRange: '4-25 ~ 5-2',
      dailySale: '', // 日均销量
      onlineDailySale: '', // 线上销量
      offlineDailySale: '', // 线下销量
      completeProfit: '', // 已完成利润
      completeDiscount: '', // 已完成让利
      completeMarkup: '', // 已完成加价
      surplusProfit: '', // 剩余利润
      surplusDiscount: '', // 剩余让利
      surplusMarkup: '', // 剩余加价
      expectTargetRate: '' // 预计目标完成率

    }
  },
  methods: {
    handleInputNumber,
    getMeasureData () {
      this.$refs.measureForm.validate((valid) => {
        if (valid) {
          this.$emit('submitMeasure', this.formMeasure)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    for (const key in this.editMeasureData) {
      if (this[key]) {
        this[key] = this.editMeasureData[key]
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.measure-root{
  font-size:14px;
}
.line-space{
  line-height:40px;
}
.firstLine{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .firstLine-left{
    line-height:40px;
  }
  .firstLine-right{
    height:40px;
  }

}
.thirdLine{
  display:flex;
  flex-wrap: wrap;
  margin-bottom:10px;
}
.right-space{
  margin-right:20px;

}
.bold-txt {
  font-weight: bold;
}
.red-txt{
  color:#F56C6C;
}
.blue-txt{
  color:#409EFF;
}
</style>
