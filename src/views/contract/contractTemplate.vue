<template>
  <div class="template-main">
    <em-table-list ref="table" :tableListName="'table'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog :title="dialogTitle[this.ListEventBtnType]" :visible.sync="contractTemplateDialogVisible" width="50%" :append-to-body="true" @close="dialogClose">
      <nt-form v-if="contractTemplateDialogVisible && ListEventBtnType === 'upload'" :ref="'dialogForm'" :formRef="'dialogForm'" :rowData="dialogRowData" :pageColumn="page_column" :queryURL="queryCustURL" :axios="axios" :selectList="select_list" :responseSuccess="response_success" @onListEvent="onListEventFrom"></nt-form>
      <div v-else-if="contractTemplateDialogVisible && ListEventBtnType !== 'upload'">
        <div v-if="ListEventBtnType === 'updateStatus'" class="template-status">{{ dialogRowData.status == 0 ? '停用模板后，甲方不可发起本合同签约，请确认停用' : '启用模板后，甲方可发起合同签约，请确认启用' }}</div>
        <div v-else-if="ListEventBtnType === 'limit'" class="template-status">当前模板正在使用中，请停用后再执行此操作</div>
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
import { $orgSealFind, $userContractTemplateAdd, $userContractTemplateSettingUrl, $userContractTemplateUpdateStatus } from '@/service/user'

export default {
  name: 'contractTemplate',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        del: {
          url: 'user/contract_template/remove_by_id',
          method: 'post',
          name: 'title',
          // dataType: 'string'
          props: {
            id: 'templateId'
          }
        },
        list: {
          url: 'user/contract_template/list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '合同模板'
      },
      dialogTitle: {
        upload: '上传模板',
        updateStatus: '模板启用/停用',
        limit: '温馨提示'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'upload', name: '上传模板' }],
      contractTemplateDialogVisible: false,
      ListEventBtnType: '',
      dialogRowData: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'contract_contractTemplate_mode_list',
      page_status: 'contract_contractTemplate_page_status',
      page_column: 'contract_contractTemplate_column',
      select_list: 'contract_contractTemplate_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      user: 'wopuser'
    })
  },
  mounted: function () {},
  watch: {
    'dialogRowData.orgId'(value) {
      if (!value) return
      this.orgSealFind(value)
    },
    'dialogRowData.type'(value) {
      if (value === 1 || value === 2) {
        this.dialogRowData.partyaType = 1
      } else if (value === 3) {
        this.dialogRowData.partyaType = 2
      }
    }
  },
  methods: {
    orgSealFind(value) {
      $orgSealFind({ id: value }).then(res => {
        this.dialogRowData = { ...this.dialogRowData, ...res.data }
        this.dialogRowData.managerName = res.data.orgManager ? res.data.orgManager.userName : ''
        this.dialogRowData.signerName = res.data.orgOpeator ? res.data.orgOpeator.userName : ''
        this.dialogRowData.managerId = res.data.orgManager ? res.data.orgManager.userId : ''
        this.dialogRowData.signerId = res.data.orgOpeator ? res.data.orgOpeator.userId : ''
      }).catch(() => {
        this.dialogRowData.managerName = ''
        this.dialogRowData.signerName = ''
        this.dialogRowData.managerId = ''
        this.dialogRowData.signerId = ''
      })
    },
    contractTemplateAdd(row) {
      const params = {
        partyaType: row.partyaType,
        partybOrgId: row.orgId,
        partybOrgName: row.partybOrgName,
        type: row.type,
        managerId: row.managerId,
        managerName: row.managerName,
        signerId: row.signerId,
        signerName: row.signerName,
        url: row.url[0].url
      }
      $userContractTemplateAdd(params).then(res => {
        this.$refs.table.initDataList()
        this.contractTemplateDialogVisible = false
      })
    },
    contractTemplateSettingUrl(row) {
      $userContractTemplateSettingUrl({ id: row.templateId }).then(res => {
        this.$router.push({
          path: '/contract/contractTemplate/templateSetting',
          query: {
            url: res.data
          }
        })
      })
    },
    contractTemplateUpdateStatus(row) {
      $userContractTemplateUpdateStatus({ templateId: row.templateId, status: row.status == 0 ? 1 : 0 }).then(res => {
        this.$refs.table.initDataList()
        this.contractTemplateDialogVisible = false
      })
    },
    dialogClose() {
      this.dialogRowData = {}
      this.ListEventBtnType = ''
    },
    onListEvent(type, row) {
      this.ListEventBtnType = type
      this.dialogRowData._btn = custFormBtnList()
      if (type === 'upload') {
        this.contractTemplateDialogVisible = true
      } else if (type === 'setting') {
        this.contractTemplateSettingUrl(row)
      } else if (type === 'updateStatus') {
        this.dialogRowData = row
        this.dialogRowData._btn = custFormBtnList()
        this.contractTemplateDialogVisible = true
      } else if (type === 'limit') {
        this.contractTemplateDialogVisible = true
      }
    },
    onListEventFrom(btnObj, row) {
      if (btnObj.type === 'ok') {
        if (this.ListEventBtnType === 'upload') {
          this.$refs.dialogForm.$refs.dialogForm.validate((valid) => {
            if (valid) {
              this.contractTemplateAdd(row)
            } else {}
          })
        } else if (this.ListEventBtnType === 'updateStatus') {
          this.contractTemplateUpdateStatus(row)
        } else if (this.ListEventBtnType === 'limit') {
          this.contractTemplateDialogVisible = false
        }
      } else {
        this.contractTemplateDialogVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      _this.tableListResponse = ''
      const params = {}
      var t = setInterval(() => {
        if (_this.tableListResponse) {
          clearInterval(t)
        }
      }, 100)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
  .template-status{
    padding-top: 15px;
    padding-bottom: 30px;
  }
</style>

