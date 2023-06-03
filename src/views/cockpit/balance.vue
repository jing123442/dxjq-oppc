<template>
  <div class="pointsAccount template-main">
    <div class="top-bg">
      <div class="between">
        <el-form :inline="true" size="mini">
          <el-form-item label="" >
            <el-select v-model="searchForm.param.status" size="mini" @change="changeSelect" placeholder="请选择 <直销物流户余额状态>" style="width:210px">
              <el-option v-for="item in selectType" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-input placeholder="请输入物流公司名称" v-model="searchForm.param.orgName" clearable></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="请输入车牌号" v-model="searchForm.param.carNumber"
            clearable></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="reset" size="mini" type="info" plain>重置</el-button>
          <el-button type="primary" @click="getList(1)" size="mini">查询</el-button>
        </div>
      </div>
      <div class="between">
        <el-form :inline="true" size="mini">
          <el-form-item label="直销物流户余额(元) ≤">
            <el-input placeholder="" v-model="searchForm.param.balanceUp" clearable style="width:130px"
            @keyup.native="
                  searchForm.param.balanceUp = checkNum(
                    searchForm.param.balanceUp,2 )"
            ></el-input>
          </el-form-item>
          <el-form-item label="直销物流户余额(元) ≥">
            <el-input placeholder="" v-model="searchForm.param.balanceDown" clearable style="width:130px"
            @keyup.native="
                  searchForm.param.balanceDown = checkNum(
                    searchForm.param.balanceDown,2 )"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="bg">
      <div class="count">
        <div class="row">
          <div class="count-item">
            <div class="count-key">
              总余额：
            </div>
            <div class="count-value">
              {{sumData.total}}元
            </div>
          </div>

          <div class="count-item">
            <div class="count-key">
              直销物流户余额：
            </div>
            <div class="count-value">
              {{sumData.balanceDirectOrg}}元
            </div>
          </div>

          <div class="count-item">
            <div class="count-key">
              直销车辆户余额：
            </div>
            <div class="count-value">
              {{sumData.balanceDirectTruck}}元
            </div>
          </div>

          <div class="count-item">
            <div class="count-key">
              经销物流户余额：
            </div>
            <div class="count-value">
              {{sumData.balanceNormalOrg}}元
            </div>
          </div>

          <div class="count-item">
            <div class="count-key">
              经销车辆户余额：
            </div>
            <div class="count-value">
              {{sumData.balanceNormalTruck}}元
            </div>
          </div>
        </div>

      </div>
      <el-table
      size="mini"
      :cell-style="{ 'textAlign': 'center' }"
        :header-cell-style="{ textAlign: 'center', background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
        :data="data" border  style="margin-top: 15px;" stripe>
        <el-table-column prop="orgName" label="物流公司"     show-overflow-tooltip>
          <template v-slot="scope">
            <div>{{ scope.row.orgName || "—" }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="status" :label="labelTotal7()" show-overflow-tooltip    >
          <template v-slot="scope">
            <div v-if="scope.row.status==0" style="color:#E6A23C">不足</div>
            <div v-if="scope.row.status==1" >正常</div>
          </template>
        </el-table-column>

        <el-table-column prop="total" :label="labelTotal()" show-overflow-tooltip >
        </el-table-column>

        <el-table-column prop="balanceDirect" :label="labelTotal2()" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="balanceTruckDirect" :label="labelTotal3()" show-overflow-tooltip >
          <template v-slot="scope">
            <div v-if="scope.row.balanceTruckDirect!=0" style="color:#409EFF;cursor: pointer;" @click="getTruckSum(scope.row.orgId,scope.row,2)">{{ scope.row.balanceTruckDirect }}</div>
            <div v-else>{{ scope.row.balanceTruckDirect }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="balanceNormal" :label="labelTotal4()" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="balanceTruckNormal" :label="labelTotal5()" show-overflow-tooltip >
          <template v-slot="scope">
            <div v-if="scope.row.balanceTruckNormal!=0" style="color:#409EFF;cursor: pointer;" @click="getTruckSum(scope.row.orgId,scope.row,1)">{{ scope.row.balanceTruckNormal }}</div>
            <div v-else>{{ scope.row.balanceTruckNormal }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rechargeDate" label="最近充值时间" show-overflow-tooltip>
          <template v-slot="scope">
            <div >{{ scope.row.rechargeDate||'—' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" :label="labelTotal6()" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="orgName" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
          <el-button type="text" @click="getConfig(scope.row.orgId,scope.row.orgName)" size="mini">提醒设置</el-button>
          <el-button type="text" @click="getLog(scope.row.orgId,scope.row.orgName)" size="mini">提醒记录</el-button>
          </template>
        </el-table-column>


      </el-table>
      <el-pagination style="margin-right: 28px; margin-top: 15px;;" background align="center"
        layout="total, sizes,prev, pager, next,jumper" :page-sizes="[10, 20, 50, 100]" :current-page="searchForm.page"
        :page-size="searchForm.size" @current-change="pageChange" @size-change="sizeChange" :total="totalCount" />
    </div>

    <el-dialog append-to-body width="60%" title="直销物流户余额不足 · 提醒配置" :visible.sync="showConfig">
      <el-form ref="excuteSet" size="small" label-position="left" >
        <el-form-item>
          <div>物流公司：{{ configParams.orgName }}</div>
        </el-form-item>
        <el-form-item>
          &nbsp;&nbsp;&nbsp;&nbsp;站内信：<el-switch v-model="configParams.mail" active-color="#13ce66" inactive-color="#909399" :active-value="1"   :inactive-value="0">
          </el-switch>

        </el-form-item>
        <el-form-item>
          微信推送：<el-switch v-model="configParams.wechat" active-color="#13ce66" inactive-color="#909399"  :active-value="1"   :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item>
          手机短信：<el-switch v-model="configParams.sms" active-color="#13ce66" inactive-color="#909399" :active-value="1"   :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item >
          <div v-for="item,index in configParams.contactslistTemp" :key="index" >
            <div >
              <el-input placeholder="请填写接收人姓名" style="width: 200px;" size="mini" v-model="item.name"></el-input>
              <el-input placeholder="请填写接收人手机号" style="width: 200px;margin-left: 10px;" size="mini" v-model="item.mobile"></el-input>
              <el-button type="primary" size="mini"  :icon="(index == configParams.contactslistTemp.length-1)?'el-icon-plus':'el-icon-minus' " plain style="margin-left: 10px;" @click="operate(item,index)">{{(index == configParams.contactslistTemp.length-1)?'添加':'删除'}}</el-button>
            </div>

          </div>
         </el-form-item>
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button  type="primary"
                       size="small"
                        @click="updateConfig()">确定
            </el-button>
            <el-button
                       size="small"
                        @click="showConfig=false">取消
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog append-to-body width="60%" title="直销物流户余额不足 · 提醒记录" :visible.sync="showLog">


    <div class="el-dialog-div">
      <el-form ref="excuteSet" size="small" label-position="left"  :rules="rulesUpdate">
        <el-form-item>
          <div>物流公司：{{  logName}}</div>
        </el-form-item>
        <el-table :cell-style="{ 'textAlign': 'center' }"
        :header-cell-style="{ textAlign: 'center', background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
        :data="logData" border size="mini" style="width:100%" stripe>
        <el-table-column prop="operatorDate" label="提醒时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="balance" :label="labelTotal2()" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type" label="站外提醒形式" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="contacts" label="站外提醒对象" show-overflow-tooltip>
        </el-table-column>
        </el-table>
      </el-form>
      <div style="height: 20px;"></div>
    </div >
    </el-dialog>


    <el-dialog append-to-body width="60%" :title="truckSumData.type=='2'?'直销车辆户余额明细':'经销车辆户余额明细'" :visible.sync="showDetail">
      <div class="el-dialog-div">
      <el-form ref="excuteSet" size="small" label-position="left"  >
        <el-form-item>
          <div><span style="color: #909399;">物流公司：</span>{{ truckSumData.orgName }}    <span style="color: #909399;margin-left: 20px;">{{truckSumData.type=='2'?'直销车辆户余额：':'经销车辆户余额：'}}</span>{{ truckSumData.balance }}</div>
          <div></div>
        </el-form-item>
        <el-table :cell-style="{ 'textAlign': 'center' }"
        :header-cell-style="{ textAlign: 'center', background: 'rgb(246, 246, 246)', color: '#606266', borderColor: '#EBEEF5' }"
        :data="truckData" border size="mini" style="width:100%" stripe>
        <el-table-column prop="carNumber" label="车牌号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="balance" :label="truckSumData.type=='2'?labelTotal2():labelTotal4()" show-overflow-tooltip sortable>
        </el-table-column>
        </el-table>
      </el-form>
      <div style="height: 20px;"></div>
    </div >
    </el-dialog>

  </div>
</template>
<script>

import { $carrierBalancePage, $carrierBalancePageTruckAccounts, $carrierBalanceSum, $carrierBalanceLog, $carrierBalanceUpdate, $carrierBalanceConfig, $carrierBalanceSumTruckAccounts } from '@/service/account'
export default {
  data() {
    return {

      labelTotal() {
        return '总余额\n(元)'
      },
      labelTotal2() {
        return '直销物流户余额\n(元)'
      },
      labelTotal3() {
        return '直销车辆户余额 \n(元)'
      },

      labelTotal4() {
        return '经销物流户余额\n(元)'
      },

      labelTotal5() {
        return '经销车辆户余额\n(元)'
      },

      labelTotal6() {
        return '直销物流户余额\n不足额度(元)'
      },
      labelTotal7() {
        return '直销物流户\n余额状态'
      },

      data: [],
      sumData: {},
      truckData: [],
      searchForm: {
        page: 1,
        size: 10,
        param: {
        }
      },
      balanceParams: {
        page: 1,
        size: 10,
        param: {
          orgId: ''
        }
      },
      value: true,
      form: {
        clientId: '',
        orgId: ''
      },
      totalCount: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchText: '',
      totalData: {},
      showConfig: false,
      showLog: false,
      showDetail: false,
      logName: '',
      logData: [],
      configParams: { contactslistTemp: [] },
      truckSumData: {},
      selectType: [
        {
          name: '不足', value: '0'
        },
        {
          name: '正常', value: '1'
        }
      ]
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },

  methods: {
    checkNum (value, type) {
      let checkPlan = '' + value
      checkPlan = checkPlan
        .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        .replace(/^\./g, '') // 保证第一个为数字而不是.
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      console.log('value', value)
      if (checkPlan.indexOf('.') < 0 && checkPlan !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        checkPlan = parseFloat(checkPlan) + ''
      } else {
        if (type !== 1) {
          if (checkPlan.indexOf('.') >= 0) {
            if (type == 2) {
              checkPlan = checkPlan
                .replace(/^()*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
            } else if (type == 3) {
              checkPlan = checkPlan
                .replace(/^()*(\d+)\.(\d\d\d).*$/, '$1$2.$3') // 只能输入两个小数
            } else if (type == 4) {
              checkPlan = checkPlan
                .replace(/^()*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3') // 只能输入两个小数
            }
          }
        }
      }
      console.log('checkPlan', checkPlan)
      return checkPlan
    },

    changeSelect(e) {
      console.log('changeSelect', e)
    },

    getTruckSum(orgId, item, type) {
      this.showDetail = true
      $carrierBalanceSumTruckAccounts({ orgId: orgId, tradeType: type }).then((res) => {
        if (res.code == 0) {
          this.truckSumData.balance = res.data
          this.truckSumData.orgName = item.orgName
          this.truckSumData.type = type
        }
      })
      $carrierBalancePageTruckAccounts({ page: 1, size: -1, param: { orgId: orgId, tradeType: type } }).then((res) => {
        if (res.code == 0) {
          this.truckData = res.data.records
        }
      })
    },
    operate(item, index) {
      if (index != this.configParams.contactslistTemp.length - 1) {
        this.configParams.contactslistTemp.splice(index, 1)
        this.$forceUpdate()
        console.log(this.configParams.contactslistTemp)
      } else {
        this.configParams.contactslistTemp.push({ name: '', mobile: '', orgId: this.configParams.orgId, orgName: this.configParams.orgName })
      }
    },
    getConfig(orgId, orgName) {
      this.showConfig = true
      $carrierBalanceConfig({ orgId: orgId }).then((res) => {
        if (res.code == 0) {
          res.data.contactslist.push({ name: '', mobile: '' })
          for (const item of res.data.contactslist) {
            item.orgId = orgId
            item.orgName = orgName
          }
          this.configParams.contactslistTemp = res.data.contactslist
          this.configParams.wechat = res.data.wechat
          this.configParams.sms = res.data.sms
          this.configParams.mail = res.data.mail

          this.configParams.orgId = orgId
          this.configParams.orgName = orgName

          console.log(' this.configParams', this.configParams)
        }
      })
    },
    updateConfig() {
      const newArray = []
      for (const item of this.configParams.contactslistTemp) {
        if (item.name && item.mobile) {
          newArray.push(item)
        }
      }
      this.configParams.contactslist = newArray
      $carrierBalanceUpdate(this.configParams).then((res) => {
        if (res.code == 0) {
          this.showConfig = false
          this.$message.success('更新成功')
        }
      })
    },
    getList(page) {
      if (page) {
        this.searchForm.page = 1
      }
      $carrierBalancePage(this.searchForm).then((res) => {
        if (res.code == 0) {
          this.totalCount = res.data.total
          this.data = res.data.records
          this.getSum()
        }
      })
    },
    getLog(orgId, orgName) {
      this.showLog = true
      this.logName = orgName
      $carrierBalanceLog({
        page: 1,
        size: -1,
        param: {
          orgId: orgId
        }
      }).then((res) => {
        if (res.code == 0) {
          this.logData = res.data.records
        }
      })
    },
    getSum() {
      $carrierBalanceSum({ ...this.searchForm.param }).then((res) => {
        if (res.code == 0) {
          this.sumData = res.data
        }
      })
    },
    reset() {
      this.updateTime = []
      this.searchForm = {
        page: 1,
        size: 10,
        param: {
        }
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

.el-dialog-div{
  height: 60vh;
     overflow: auto;
    }
.count {
  padding: 10px;
  width: fit-content;
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
  height: 100vh;

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
  margin-bottom: 20px;
}

.add {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.row {
  display: flex;
}

::v-deep .el-table tr .el-table__cell .cell {
  width: 100% !important;
  justify-content: center;
}
</style>
