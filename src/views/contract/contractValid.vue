<template>
  <div class="template-main">
    <em-table-list ref="table" :tableListName="'table'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog v-if="contractValidDialogVisible" :title="this.dialogText[this.ListEventBtnType].title" :visible.sync="contractValidDialogVisible" width="50%" :append-to-body="true" @close="dialogClose">
      <div v-if="contractValidDialogVisible && ListEventBtnType === 'confirm' && dialogRowData.row.type != 3" class="operation-text">确认合同无误后，请上传《合作申请审批流程》</div>
      <div v-else-if="contractValidDialogVisible" class="operation-text">{{this.dialogText[this.ListEventBtnType].text}}</div>
      <nt-form v-if="contractValidDialogVisible  && ListEventBtnType === 'confirm'" :ref="ListEventBtnType" :formRef="ListEventBtnType" :rowData="dialogRowData" :pageColumn="dialogRowData.row.type == 3 ? [] : dialog_column" :queryURL="queryCustURL" :axios="axios" :selectList="select_list" :responseSuccess="response_success" @onListEvent="onListEventDialog"></nt-form>
      <el-form v-if="contractValidDialogVisible && dialogRowData._btn && ListEventBtnType !== 'confirm'">
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in dialogRowData._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :disabled="dialogBtnDisabled"
                       :icon="btnItem.icon" @click="onListEventDialog(btnItem, dialogRowData)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList, exportBlobToFiles } from '@/utils/tools'
import { $userContractView, $userContractConfirm, $userContractCancel, $userContractDownload } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'contractValid',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'user/contract/page_list_confirm',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '签约确认'
      },
      ListEventBtnType: '',
      contractValidDialogVisible: false,
      buttonsList: [],
      dialogText: {
        confirm: { title: '确认签约', text: '请确认甲方签约是否正确' },
        batch: { title: '批量确认签约', text: '请确认甲方签约是否正确' },
        recall: { title: '撤回', text: '请确认撤回甲方已签署的合同，撤回后本合同作废' },
        download: { title: '下载', text: '请确认是否下载' }
      },
      dialogRowData: {},
      dialogBtnDisabled: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'contract_contractValid_mode_list',
      page_status: 'contract_contractValid_page_status',
      page_column: 'contract_contractValid_column',
      select_list: 'contract_contractValid_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      dialog_column: 'contract_contractValid_dialog_column',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      this.ListEventBtnType = type
      row._btn = custFormBtnList()
      switch (type) {
        case 'details':
          this.contractView(row)
          break
        case 'confirm':
          this.dialogRowData.row = row
          this.dialogRowData._btn = custFormBtnList()
          this.contractValidDialogVisible = true
          break
        case 'recall':
          this.dialogRowData = row
          this.contractValidDialogVisible = true
          break
        case 'download':
          this.dialogRowData = row
          this.contractValidDialogVisible = true
          break
      }
    },
    onListEventDialog(btnObj, row) {
      if (btnObj.type === 'ok') {
        if (this.ListEventBtnType === 'confirm') {
          this.contractConfirm(this.dialogRowData)
        } else if (this.ListEventBtnType === 'recall') {
          this.contractCancel(row)
        } else if (this.ListEventBtnType === 'download') {
          this.contractDownload(row)
        }
      } else if (btnObj.type === 'cancel') {
        this.contractValidDialogVisible = false
      }
    },
    contractView(row) {
      $userContractView({ id: row.contractId }).then(res => {
        window.open(res.data)
      })
    },
    contractConfirm(row) {
      var params = {
        contractId: row.row.contractId
      }
      if (row.row.type == 1 || row.row.type == 2) {
        if (row.url && row.url.length === 0) {
          this.$message.error('请上传合作申请审批流程')
          return
        }
        params.cooperationApplyUrl = row.url[0].url
      }
      $userContractConfirm(params).then(res => {
        this.$refs.table.initDataList()
        this.contractValidDialogVisible = false
      })
    },
    contractCancel(row) {
      $userContractCancel({ id: row.contractId }).then(res => {
        this.$refs.table.initDataList()
        this.contractValidDialogVisible = false
      })
    },
    contractDownload(row) {
      this.dialogBtnDisabled = true
      $userContractDownload({ id: row.contractId }).then(res => {
        exportBlobToFiles(res, row.partyaName + '-' + row.title, res.type)
        this.$message.success('下载成功')
        this.dialogBtnDisabled = false
        this.contractValidDialogVisible = false
      }).catch(e => {
        this.dialogBtnDisabled = false
      })
    },
    dialogClose() {
      this.dialogRowData = {}
      this.ListEventBtnType = ''
    },
    onReqParams(type, _this, callback) {
      _this.tableListResponse = ''
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { contract: {}, partyaName: '', partybContactName: '', partybName: '' } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'partyaName' || k == 'partybName' || k == 'partybContactName') {
            if (v !== '') params.param[k] = v
          } else {
            if (v !== '') params.param.contract[k] = v
          }
        }
      }
      var t = setInterval(() => {
        if (_this.tableListResponse) {
          clearInterval(t)
          // this.tableDataHandle(_this.tableListResponse)
        }
      }, 100)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
  .operation-text{
    padding-top: 15px;
    padding-bottom: 30px;
  }
  /*.el-picker-panel .el-picker-panel__footer .el-button--text.el-picker-panel__link-btn {*/
  /*  display: none;*/
  /*}*/
</style>

