<template>
  <div class="template-main" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在进行资金预警配置，请等待...">
    <em-table-list :tableListName="'accountWarn'" ref="accountWarn" :buttonsList="buttonsList" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog :title="batchSetting ? '批量操作' : '删除预警'" :visible.sync="dialogBatchVisible" :width="batchSetting ? add_edit_dialog : '40%'" :append-to-body="true" @close="dialogClose">
      <div v-if="batchSetting" class="dialog-main">
        <div class="checkbox-main">
          <div class="search-input-main">
            <el-checkbox style="margin-right: 10px" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchOrg"
              clearable
              @input="searchEvent">
            </el-input>
          </div>
          <div class="checkbox-list-main" v-if="scrollView" v-infinite-scroll="onload" infinite-scroll-disabled="scrollDisabled">
            <div class="checkbox-list" >
              <el-checkbox v-for="(item, i) in orgList" :checked="item.checked" :label="item" :key="i" @change="checkboxClick(item, i)">{{item.orgName}}</el-checkbox>
            </div>
          </div>

        </div>
        <div class="dialog-right">
          <div class="dialog-tag-main">
            <div class="total-main">您已选择<span style="color: #00a2d4">{{warnInfo.carrierList.length}}</span>个物流公司</div>
            <div class="dialog-tag-list">
              <el-tag
                v-for="item in warnInfo.carrierList"
                :key="item.orgId"
                closable
                @close="handleClose(item)">
                {{item.orgName}}
              </el-tag>
            </div>
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
              <el-form ref="warnUserForm" v-for="(item, i) in warnInfo.warnObjectList" :key="i" :rules="userRules" :inline="true" :model="item" class="demo-form-inline">
                <el-form-item label="预警接收人" prop="warnName">
                  <el-input v-model="item.warnName" placeholder="预警接收人"></el-input>
                </el-form-item>
                <el-form-item label="预警接收电话" prop="warnMobile">
                  <el-input v-model="item.warnMobile" placeholder="预警接收电话"></el-input>
                </el-form-item>
                <el-button v-if="warnInfo.warnObjectList.length - 1 == i" @click="plusClickEvent" plain icon="el-icon-plus">添加</el-button>
                <el-button v-else @click="delClickEvent(i)" plain icon="el-icon-delete">删除</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="delete-prompt" v-else>删除后将关闭该公司的资金预警，是否继续</div>
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
import { initVueDataOptions, callbackPagesInfo, custFormBtnList, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userOrgCarrier } from '@/service/user'
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
        name: '资金预警'
      },
      queryParams: Function,
      dialogBatchVisible: false,
      buttonsList: [{ type: 'primary', icon: '', event: 'batch', name: '批量操作' }],
      checkAll: false,
      orgList: [],
      isIndeterminate: false,
      pages: {
        page: 1,
        size: 10
      },
      scrollDisabled: false,
      warnInfo: {
        warnStatus: '1',
        warnValue: '',
        carrierList: [],
        warnObjectList: [
          { warnMobile: '', warnName: '' }
        ]
      },
      dialogBUttonList: custFormBtnList(),
      dialogBtnDisabled: false,
      searchOrg: '',
      scrollView: false,
      rules: {
        warnStatus: [
          { required: true, message: '请选择预警状态', trigger: 'blur' }
        ],
        warnValue: [
          { required: true, validator: this.validatorWarnValue, trigger: 'blur' }
        ]
      },
      userRules: {
        warnName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        warnMobile: [
          { required: true, validator: this.validatorPhone, trigger: 'blur' }
        ]
      },
      validList: [],
      fullscreenLoading: false,
      batchSetting: true
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
  watch: {
    'orgList'(value) {
      this.checkedActive(true)
    }
  },
  methods: {
    handleClose(item) {
      this.warnInfo.carrierList.splice(this.warnInfo.carrierList.indexOf(item), 1)
      this.scrollView = false
      this.$nextTick(() => {
        this.scrollView = true
      })
      this.orgList.forEach((item1, i) => {
        if (item1.orgId === item.orgId) {
          this.orgList[i].checked = false
        }
      })
      this.checkedStatusHandle()
    },
    checkedActive(status) {
      if (this.warnInfo.carrierList.length > 0) {
        this.orgList.forEach((item1, i) => {
          this.warnInfo.carrierList.forEach((item, k) => {
            if (item.orgId === item1.orgId) {
              this.orgList[i].checked = status
            }
          })
        })
      }
      this.checkedStatusHandle()
    },
    validatorPhone(rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    },
    validatorWarnValue(rule, value, callback) {
      if (value === '') {
        callback(new Error('预警值不能为空'))
      } else if (!/^[+]{0,1}(\d+)$/.test(value)) {
        callback(new Error('预警值只能为正整数'))
      } else {
        callback()
      }
    },

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
      this.warnInfo.carrierList = val ? [...this.orgList] : []
      this.scrollView = false
      this.$nextTick(() => {
        this.scrollView = true
      })
      if (this.warnInfo.carrierList.length > 0) {
        this.checkedActive(this.checkAll)
      } else {
        this.orgList.forEach((item, i) => {
          this.orgList[i].checked = this.checkAll
        })
      }
      this.isIndeterminate = false
    },
    checkboxClick(item, i) {
      this.orgList[i].checked = !item.checked
      if (this.orgList[i].checked) {
        this.warnInfo.carrierList.push(item)
      } else {
        this.warnInfo.carrierList.forEach((item1, i) => {
          if (item1.orgId === item.orgId) {
            this.warnInfo.carrierList.splice(i, 1)
          }
        })
      }
      this.checkedStatusHandle()
    },
    checkedStatusHandle() {
      if (this.orgList.length === 0) return
      if (this.orgList.length === this.warnInfo.carrierList.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
        if (this.warnInfo.carrierList.length === 0) {
          this.isIndeterminate = false
        } else {
          this.isIndeterminate = true
        }
      }
    },
    dialogClose() {
      this.warnInfo = {
        warnStatus: '1',
        warnValue: '',
        carrierList: [],
        warnObjectList: [
          { warnMobile: '', warnName: '' }
        ]
      }
      this.checkAll = false
      this.isIndeterminate = false
      this.scrollView = false
      this.orgList = []
      this.pages.page = 1
      this.searchOrg = ''
    },
    onload() {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          keyword: this.searchOrg,
          org: {
            orgSubType: 21
          }
        }
      }
      $userOrgCarrier(params).then(res => {
        res.data.records.forEach((item) => {
          item.checked = false
        })
        this.orgList.push(...res.data.records)
        if (res.data.total <= this.orgList.length) {
          this.scrollDisabled = true
        }
        this.pages.page++
      })
    },
    onListEvent(type, row) {
      if (type === 'batch') {
        this.batchSetting = true
        this.dialogBatchVisible = true
        this.scrollView = true
      } else if (type === 'delete') {
        this.batchSetting = false
        this.warnInfo = row
        this.dialogBatchVisible = true
      }
    },
    onListEventDialog(type, row) {
      if (type.type === 'ok') {
        if (this.batchSetting) {
          this.$refs.warnForm.validate((valid) => {
            if (valid) {
              if (row.warnStatus == '1') {
                this.validList = []
                this.$refs.warnUserForm.forEach(item => {
                  item.validate((valid) => {
                    if (valid) {
                      this.validList.push(item)
                    }
                  })
                })
                if (this.$refs.warnUserForm.length == this.validList.length) {
                  this.carrierWarnConfig(row)
                }
              } else {
                this.carrierWarnClose(row)
              }
            } else {
              return false
            }
          })
        } else {
          this.carrierWarnClose(row)
        }
      } else {
        this.dialogBatchVisible = false
      }
    },
    carrierWarnClose(row) {
      var param = {
        carrierList: []
      }
      if (this.batchSetting) {
        param.carrierList = row.carrierList
        this.fullscreenLoading = true
      } else {
        param.carrierList.push(row)
      }
      $strategyCarrierWarnClose(param).then(res => {
        this.dialogBatchVisible = false
        this.fullscreenLoading = false
        this.$message.success('操作成功')
        this.$refs.accountWarn.initDataList()
      })
    },
    carrierWarnConfig(row) {
      var param = {
        carrierList: row.carrierList,
        warnObjectList: row.warnObjectList,
        warnValue: row.warnValue
      }
      this.fullscreenLoading = true
      $strategyCarrierWarnConfig(param).then(res => {
        this.dialogBatchVisible = false
        this.fullscreenLoading = false
        this.$message.success('操作成功')
        this.$refs.accountWarn.initDataList()
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { param: '' } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
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
        margin-left: 10px;
        border-radius: 10px;
        border: 1px solid #6E7A8F;
        .dialog-tag-list {
          overflow: auto;
          height: 245px;
          padding-right: 5px;
          .el-tag{
            margin-left: 5px;
            margin-bottom: 5px;
          }
        }
        .total-main {
          text-align: right;
          margin: 3px 0;
          padding-right: 10px;
        }
      }
      .dialog-form-main {
        .el-form {
          padding: 0;
          margin: 10px;
          .el-form-item {
            margin-bottom: 5px;
            ::v-deep .el-form-item__label{
              text-align: left;
              width: 110px;
            }
            ::v-deep .el-form-item__content{
              width: 200px;
            }
          }
        }
      }
    }
    .checkbox-main {
      flex-shrink: 0;
      width: 300px;
      max-height: 460px;
      .search-input-main{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .el-input{
          margin-right: 10px;
        }
      }
      .checkbox-list-main{
        max-height: 400px;
        overflow: auto;
        .checkbox-list{
          display: flex;
          flex-direction: column;
        }
        .el-checkbox {
          height: 20px;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          ::v-deep .el-checkbox__label{
            width: 260px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }
      }
    }
  }
  .delete-prompt{
    padding-top: 15px;
    padding-bottom: 30px;
  }
</style>
