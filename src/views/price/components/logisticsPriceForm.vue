<template>
  <div class="logisticsPrice-root">
    <el-form ref='ruleForm' :inline="true" :model="formData" :rules="rules" class="demo-form-inline">
    <!-- 加气站物流组合-经营类型选择 -->
    <el-form-item>
      <el-table :data="logisticsData" border stripe>
        <el-table-column prop="nickName" label="加气站" width="180"></el-table-column>
        <el-table-column prop="carrierOrgName" label="物流公司" width="180"></el-table-column>
        <el-table-column prop="date" label="车辆经营类型" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" placeholder="请选择" style="width: 120px;" @change="selectChange(scope.row)">
                <el-option
                  v-for="item in operateType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
        </el-table-column>
        <el-table-column prop="affectedNum" label="受影响车量户" width="180"> </el-table-column>
      </el-table>
   </el-form-item>

   <br>
       <el-form-item label="长城奥扬优惠" prop="aoyangDiscount">
        <el-input
          v-model="formData.aoyangDiscount"
          placeholder="0.000"
          @input="handleInputNumber(formData, 'aoyangDiscount')"
        >
        <span slot="surffix">元 / 公斤</span>
        </el-input>
      </el-form-item>
    <el-form-item>
        <span style='color:#999;'>（ 注：此优惠 > 0，表示 长城奥扬 让利 ）</span>
    </el-form-item>
    <el-divider></el-divider>
    
   <el-form-item>
      <el-radio v-model="formData.status" label="2">立即执行</el-radio>
    </el-form-item>
    <br />
    <el-form-item>
      <el-radio v-model="formData.status" label="1">预约执行</el-radio>
      <el-form-item>
        <el-date-picker
          popper-class="no-time-picker"
          v-model="formData.updateDate"
          default-time="00:00:00"
          type="datetime"
          :disabled="Number(formData.status) !== 1"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <span>执行</span>
    </el-form-item>
    <el-divider></el-divider>
    
    
    <el-form-item>
      <div class="title">决策辅助·测算</div>
      <el-table></el-table>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { handleInputNumber } from '@/utils/tools'
export default {
  data() {
    return {
      formData: {
        aoyangDiscount: '',
        status: '2',
        updateDate: ''
      },
      rules: {
        aoyangDiscount: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      logisticsData: [{
        carrierOrgName: '直销物流公司',
        finalPriceOther: 0.12,
        finalPriceSelf: 0.12,
        gasstationDirectFee: 0.03,
        gasstationDirectPrice: 0.27,
        gasstationFee: 0.1,
        gasstationId: '700136540667789312',
        gasstationName: '新气球加气站11',
        id: '7',
        nickName: '加气站',
        operator: null,
        type: 'all',
        allNum: '30',
        selfNum: '20',
        othersNum: '10',
        affectedNum: ''
      },{
        carrierOrgName: '2',
        finalPriceOther: 0.12,
        finalPriceSelf: 0.12,
        gasstationDirectFee: 0.03,
        gasstationDirectPrice: 0.27,
        gasstationFee: 0.1,
        gasstationId: '700136540667789312',
        gasstationName: '新气球加气站11',
        id: '7',
        nickName: '2加气站',
        operator: null,
        type: 'all',
        allNum: '3',
        selfNum: '2',
        othersNum: '1',
        affectedNum: ''
      },{
        carrierOrgName: '3',
        finalPriceOther: 0.12,
        finalPriceSelf: 0.12,
        gasstationDirectFee: 0.03,
        gasstationDirectPrice: 0.27,
        gasstationFee: 0.1,
        gasstationId: '700136540667789312',
        gasstationName: '新气球加气站11',
        id: '7',
        nickName: '3加气站',
        operator: null,
        type: 'all',
        allNum: '33',
        selfNum: '22',
        othersNum: '11',
        affectedNum: ''
      }],
      operateType: [{
        label: '全部',
        value: 'all'
      }, {
        label: '自营',
        value: 'self'
      }, {
        label: '其他',
        value: 'others'
      }]
    }
  },
  methods: {
    handleInputNumber,
    selectChange (rowInfo) {
      switch (rowInfo.type) {
        case 'all':
          rowInfo.affectedNum = rowInfo.allNum
          break;
        case 'self':
            rowInfo.affectedNum = rowInfo.selfNum
            break;
        case 'others':
            rowInfo.affectedNum = rowInfo.othersNum
            break;
      }
    },
    getLogisticsType () {
      let submitArr = []
      this.logisticsData.forEach(item => {
        let obj = {
            id: item.id,
            type: item.type,
            affectedNum: item.affectedNum
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
 font-size: 16px;
 font-weight: bold;
 color:#333;
 margin:15px auto;
}
</style>
