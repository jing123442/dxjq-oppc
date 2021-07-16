<template>
  <div class="template-main">
    <em-table-list :tableListName="'accountWarn'" ref="accountWarn" :buttonsList="buttonsList" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="批量操作" :visible.sync="dialogBatchVisible" :width="add_edit_dialog" :append-to-body="true">
      <div class="dialog-main">
        <div class="checkbox-main" ref="scroll" v-if="scrollView" v-infinite-scroll="onload" infinite-scroll-disabled="scrollDisabled" >
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchOrg"
            @change="searchEvent">
          </el-input>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group class="checkbox-list-main" v-model="checkedOrgList" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item, i) in orgList" :label="item" :key="i">{{item.orgName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="dialog-right">
          <div class="total-main">已选择{{checkedOrgList.length}}个物流公司</div>
          <div class="dialog-tag-main">
            <el-tag
              v-for="item in checkedOrgList"
              :key="item.orgId"
              closable>
              {{item.orgName}}
            </el-tag>
          </div>
          <div class="dialog-form-main">
            <el-form :inline="true" :model="warnInfo" :rules="rules" ref="warnForm" class="demo-form-inline">
              <el-form-item label="预警状态" prop="warnStatus">
                <el-select v-model="warnInfo.warnStatus" placeholder="预警状态">
                  <el-option label="关闭预警" value="0"></el-option>
                  <el-option label="开启预警" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="warnInfo.warnStatus == 1" label="预警值" prop="warnValue">
                <el-input v-model="warnInfo.warnValue" placeholder="预警值"></el-input>
              </el-form-item>
            </el-form>
            <div v-if="warnInfo.warnStatus == 1">
              <el-form ref="warn1Form" v-for="(item, i) in warnInfo.warnObjectList" :key="i" :rules="userRules" :inline="true" :model="item" class="demo-form-inline">
                <el-form-item label="预警接收人" prop="userName">
                  <el-input v-model="item.warnName" placeholder="预警接收人"></el-input>
                </el-form-item>
                <el-form-item label="预警接收电话" prop="mobile">
                  <el-input v-model="item.warnMobile" placeholder="预警接收电话"></el-input>
                </el-form-item>
                <el-button v-if="warnInfo.warnObjectList.length - 1 == i" @click="plusClickEvent" plain icon="el-icon-plus">添加</el-button>
                <el-button v-else @click="delClickEvent(i)" plain icon="el-icon-delete">删除</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <el-form>
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in dialogBUttonList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :disabled="dialogBtnDisabled"
                       :icon="btnItem.icon" @click="onListEventDialog(btnItem, warnInfo)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userOrgList } from '@/service/user'
import { $strategyCarrierWarnClose, $strategyCarrierWarnConfig } from '@/service/strategy'


export default {
  name: 'accountWarn',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'strategy/carrier/warn/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '公司资金账户管理'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 2 } }),
      dialogBatchVisible: false,
      buttonsList: [{ type: 'primary', icon: '', event: 'batch', name: '批量操作' }],
      checkAll: false,
      checkedOrgList: [],
      orgList: [],
      isIndeterminate: true,
      pages: {
        page: 1,
        size: 10
      },
      scrollDisabled: false,
      warnInfo: {
        warnStatus: '1',
        warnValue: '',
        warnObjectList: [
          { warnMobile: '', warnName: '' }
        ]
      },
      dialogBUttonList: custFormBtnList(),
      dialogBtnDisabled: false,
      searchOrg: '',
      scrollView: true,
      rules: {
        warnStatus: [
          { required: true, message: '请选择预警状态', trigger: 'blur' }
        ],
        warnValue: [
          { required: true, message: '请输入预警值', trigger: 'blur' }
        ]
      },
      userRules: {
        warnName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        warnMobile: [
          { required: true, message: '请输入接收电话', trigger: 'blur' }
        ]
      },
      validList: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_firmAccount_mode_list',
      page_status: 'carrier_firmAccount_page_status',
      page_column: 'carrier_orgAccountWarn_column',
      select_list: 'carrier_firmAccount_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    searchEvent() {
      this.pages.page = 1
      this.orgList = []
      this.scrollDisabled = false
      this.scrollView = false
      this.$nextTick(() => {
        this.scrollView = true
      })
    },
    plusClickEvent() {
      this.warnInfo.warnObjectList.push({
        warnName: '',
        warnMobile: ''
      })
    },
    delClickEvent(i) {
      this.warnInfo.warnObjectList.splice(i, 1)
    },
    handleCheckAllChange(val) {
      this.checkedOrgList = val ? this.orgList : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      var checkedCount = value.length
      this.checkAll = checkedCount === this.orgList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.orgList.length
    },
    onload() {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          org: {
            orgType: 2,
            orgName: this.searchOrg
          }
        }
      }
      $userOrgList(params).then(res => {
        this.orgList.push(...res.data.records)
        if (res.data.total <= this.orgList.length) {
          this.scrollDisabled = true
        }
        this.pages.page++
      })
    },
    onListEvent(type, row) {
      if (type === 'batch') {
        this.dialogBatchVisible = true
      } else if (type === 'delete') {
        this.carrierWarnClose(row)
      }
    },
    onListEventDialog(type, row) {
      if (type.type === 'ok') {
        this.$refs.warnForm.validate((valid) => {
          if (valid) {
            if (row.warnStatus == 1) {
              this.validList = []
              this.$refs.warn1Form.forEach(item => {
                item.validate((valid) => {
                  if (valid) {
                    this.validList.push(item)
                  }
                })
              })
              if (this.$refs.warn1Form.length == this.validList.length) {
                this.carrierWarnConfig(row)
              }
            } else {
              this.carrierWarnClose()
            }
          } else {
            return false
          }
        })
      } else {
      }
    },
    carrierWarnClose(row) {
      var param = {
        carrierList: []
      }
      if (row) {
        param = {
          carrierList: this.checkedOrgList
        }
      } else {
        param.carrierList.push(row)
      }
      $strategyCarrierWarnClose(param).then(res => {
        this.$refs.accountWarn.initDataList()
        this.dialogBatchVisible = false
      })
    },
    carrierWarnConfig(row) {
      var param = {
        carrierList: this.checkedOrgList,
        warnObjectList: row.warnObjectList,
        warnValue: row.warnValue
      }
      $strategyCarrierWarnConfig(param).then(res => {
        this.$refs.accountWarn.initDataList()
        this.dialogBatchVisible = false
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { param: '' } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
<style lang="scss" scoped>
  .dialog-main {
    width: 100%;
    display: flex;
    .dialog-right {
      flex-grow: 1;
      .dialog-tag-main {
        height: 280px;
        overflow: auto;
        margin-left: 10px;
        padding-top: 5px;
        border-radius: 10px;
        border: 1px solid #6E7A8F;
        .el-tag{
          margin-left: 5px;
          margin-bottom: 5px;
        }
      }
      .dialog-form-main {
        .el-form {
          padding: 0;
          margin: 10px;
          .el-form-item {
            margin-bottom: 5px;
          }
        }
      }
      .total-main {
        text-align: right;
        padding-bottom: 5px;
      }
    }
    .checkbox-main {
      flex-shrink: 0;
      width: 300px;
      max-height: 480px;
      overflow: auto;
      .checkbox-list-main{
        display: flex;
        flex-direction: column;
        .el-checkbox {
          height: 20px;
          width: 100%;
          .el-checkbox__label{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
        }
      }
    }
  }
</style>
