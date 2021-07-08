<template>
  <div class="template-main">
    <em-table-list ref="orgSeal" :tableListName="'orgSeal'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue"></em-table-list>
    <el-dialog :title="dialogTitle[this.ListEventBtnType]" :visible.sync="orgSealDialogVisible" width="50%" :append-to-body="true" @close="dialogClose">
      <nt-form v-if="orgSealDialogVisible && dialogStatus === 0" :ref="ListEventBtnType" :formRef="ListEventBtnType" :rowData="dialogRowData" :pageColumn="dialog_currency_seal_column[this.ListEventBtnType]" :queryURL="queryCustURL" :axios="axios" :selectList="select_list" :responseSuccess="response_success" @onListEvent="onListEventFrom"></nt-form>
      <div class="org-seal-image" v-else-if="orgSealDialogVisible && dialogStatus === 1">
        <img :src="dialogRowData.sealUrl" alt="">
      </div>
      <div v-else-if="orgSealDialogVisible && dialogStatus === 2">
        <div class="seal-status">{{ dialogRowData[this.ListEventBtnType] == 0 ? '请确认停用印章,停用后将无法签署相关合同' : '请确认启用印章' }}</div>
        <el-form>
          <el-form-item class="el-del-btn-item">
            <div class="btn-item-footer">
              <el-button v-for="(btnItem, index) in dialogRowData._btn.list" :key="index" :type="btnItem.bType"
                         size="small"
                         :icon="btnItem.icon" @click="onListEventFrom(btnItem, dialogRowData)">{{btnItem.label}}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userFind, $orgSealApply, $orgSealEdit, $userSealEdit, $userManagerSet, $userOperatorSet } from '@/service/user'

export default {
  name: 'orgSeal',
  data() {
    return initVueDataOptions(this, {
      orgSealDialogVisible: false,
      queryCustURL: {
        list: {
          url: 'user/org_seal/find_detail',
          method: 'post',
          parse: {
            tableData: ['data', 'records']
          }
        },
        name: '印章管理'
      },
      dialogRowData: {},
      dialog_column: [],
      dialogBtnDisabled: false,
      ListEventBtnType: '',
      dialogTitle: {
        orgSealApply: '企业印章申请',
        orgManagerSet: '企业负责人管理',
        orgOpeatorSet: '执行签署人管理',
        orgName: '查看企业印章',
        orgManager: '查看企业负责人印章',
        orgSealStatus: '管理企业印章',
        orgManagerSealStatus: '管理企业负责人印章'
      },
      dialogStatus: 3,
      buttonsList: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'contract_orgSealList_mode_list',
      page_status: 'contract_orgSealList_page_status',
      page_column: 'contract_orgSealList_column',
      dialog_currency_seal_column: 'dialog_currency_seal_column',
      select_list: 'contract_orgSealList_select_list',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg',
      wopuser: 'wopuser'
    })
  },
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      this.ListEventBtnType = type
      row._btn = custFormBtnList()
      switch (type) {
        case 'orgSealApply':
          this.getUser(row)
          break
        case 'orgManagerSet':
          this.dialogRowData = row.orgSealDetail.orgManager || {}
          this.dialogRowData._btn = custFormBtnList()
          this.dialogStatus = 0
          this.orgSealDialogVisible = true
          break
        case 'orgOpeatorSet':
          this.dialogRowData = row.orgSealDetail.orgOpeator || {}
          this.dialogRowData._btn = custFormBtnList()
          this.dialogStatus = 0
          this.orgSealDialogVisible = true
          break
        case 'orgName':
          this.dialogRowData = row
          if (!this.dialogRowData.orgSealDetail.orgSeal) {
            this.$message.error('暂未申请企业印章')
            return
          }
          this.dialogRowData.sealUrl = process.env.VUE_APP_FILE_HOST + this.dialogRowData.orgSealDetail.orgSeal.sealUrl
          this.dialogStatus = 1
          this.orgSealDialogVisible = true
          break
        case 'orgManager':
          this.dialogRowData = row
          if (!this.dialogRowData.orgSealDetail.orgManagerSeal) {
            this.$message.error('暂未申请企业负责人印章')
            return
          }
          this.dialogRowData.sealUrl = process.env.VUE_APP_FILE_HOST + this.dialogRowData.orgSealDetail.orgManagerSeal.sealUrl
          this.dialogStatus = 1
          this.orgSealDialogVisible = true
          break
        case 'orgSealStatus':
          this.dialogRowData = row
          this.dialogStatus = 2
          this.orgSealDialogVisible = true
          break
        case 'orgManagerSealStatus':
          this.dialogRowData = row
          this.dialogStatus = 2
          this.orgSealDialogVisible = true
          break
      }
    },
    getUser(row) {
      const params = {
        userId: this.wopuser.user_id
      }
      $userFind(params).then(res => {
        if (res.code === 0) {
          this.dialogRowData = row
          this.dialogRowData.applierName = res.data.user.userName
          this.dialogRowData.applierIdCard = res.data.user.idCardNo
          this.dialogStatus = 0
          this.orgSealDialogVisible = true
        }
      })
    },
    onListEventFrom(btnObj, row) {
      if (btnObj.type === 'ok') {
        if (this.dialogStatus === 0) {
          this.$refs[this.ListEventBtnType].$refs[this.ListEventBtnType].validate((valid) => {
            if (valid) {
              if (this.ListEventBtnType === 'orgSealApply') {
                this.orgSealApply()
              } else {
                if (row.userName == '' || row.userName == null) {
                  this.$message.error(this.ListEventBtnType === 'orgManagerSet' ? '请选择企业负责人' : '请选择执行签署人')
                  return
                }
                if (row.idCardNo == '' || row.idCardNo == null) {
                  this.$message.error('请前往平台用户列表维护身份证号')
                  return
                }
                if (this.ListEventBtnType === 'orgManagerSet') {
                  this.userManagerSet(row)
                } else if (this.ListEventBtnType === 'orgOpeatorSet') {
                  this.userOperatorSet(row)
                }
              }
            } else {
            }
          })
        } else if (this.dialogStatus === 2) {
          if (this.ListEventBtnType === 'orgSealStatus') {
            this.orgSealEdit(row)
          } else if (this.ListEventBtnType === 'orgManagerSealStatus') {
            this.userSealEdit(row)
          }
        }
      } else if (btnObj.type === 'cancel') {
        this.orgSealDialogVisible = false
      }
    },
    orgSealApply() {
      if (this.dialogRowData.lastQuarter.length > 13) {
        this.$message.error('印章下弦文必须小于等于13个字符')
        return
      }
      if (this.dialogBtnDisabled) return
      this.dialogBtnDisabled = true
      $orgSealApply({ lastQuarter: this.dialogRowData.lastQuarter, orgId: this.woporg, type: 1 }).then(res => {
        this.dialogBtnDisabled = false
        if (res.code === 0) {
          this.$message.success('申请成功')
          this.$refs.orgSeal.initDataList()
          this.orgSealDialogVisible = false
        }
      }).catch(e => {
        this.dialogBtnDisabled = false
      })
    },
    orgSealEdit(row) {
      $orgSealEdit({ id: row.orgSealDetail.orgSeal.id, status: row.orgSealDetail.orgSeal.status == 0 ? 1 : 0 }).then(res => {
        this.$message.success('设置成功')
        this.$refs.orgSeal.initDataList()
        this.orgSealDialogVisible = false
      })
    },
    userSealEdit(row) {
      $userSealEdit({ id: row.orgSealDetail.orgManagerSeal.id, status: row.orgSealDetail.orgManagerSeal.status == 0 ? 1 : 0 }).then(res => {
        this.$message.success('设置成功')
        this.$refs.orgSeal.initDataList()
        this.orgSealDialogVisible = false
      })
    },
    userManagerSet(row) {
      $userManagerSet({ userId: row.userName.split('/')[1].replace(' ', ''), orgId: this.woporg }).then(res => {
        this.$message.success('设置成功')
        this.$refs.orgSeal.initDataList()
        this.orgSealDialogVisible = false
      })
    },
    userOperatorSet(row) {
      $userOperatorSet({ userId: row.userName.split('/')[1].replace(' ', ''), orgId: this.woporg }).then(res => {
        this.$message.success('设置成功')
        this.$refs.orgSeal.initDataList()
        this.orgSealDialogVisible = false
      })
    },
    dialogClose() {
      this.dialogStatus = 3
      this.dialogRowData = {}
    },
    onReqParams(type, _this, callback) {
      _this.tableListResponse = ''
      const params = { id: this.woporg }
      var t = setInterval(() => {
        if (_this.tableListResponse) {
          clearInterval(t)
        }
      }, 100)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    updateColumnValue(tableData, callback) {
      const list = []
      const obj = this.$refs.orgSeal.tableListResponse.data.org
      const orgSealDetail = {
        orgSealDetail: this.$refs.orgSeal.tableListResponse.data
      }
      obj.orgManager = orgSealDetail.orgSealDetail.orgManager ? orgSealDetail.orgSealDetail.orgManager.userName : ''
      obj.orgSealStatus = orgSealDetail.orgSealDetail.orgSeal ? orgSealDetail.orgSealDetail.orgSeal.status : 2
      obj.orgManagerSealStatus = orgSealDetail.orgSealDetail.orgManagerSeal ? orgSealDetail.orgSealDetail.orgManagerSeal.status : 2
      obj.orgOpeator = orgSealDetail.orgSealDetail.orgOpeator ? orgSealDetail.orgSealDetail.orgOpeator.userName : '-'
      const orgObj = { ...obj, ...orgSealDetail }
      list.push(orgObj)
      if (this.$refs.orgSeal) {
        tableData = list
      }
      callback(tableData)
    }
  }
}
</script>
<style lang="scss" scoped>
  .seal-status{
    padding-top: 15px;
    padding-bottom: 30px;
  }
  .org-seal-image {
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  .el-picker-panel .el-picker-panel__footer .el-button--text.el-picker-panel__link-btn {
    display: none;
  }
</style>

