<template>
  <div class="template-main">
    <em-table-list ref="table" :tableListName="'table'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @checkboxStatus="checkboxStatus"></em-table-list>
    <el-dialog v-if="contractValidDialogVisible" :title="this.dialogText[this.ListEventBtnType].title" :visible.sync="contractValidDialogVisible" width="50%" :append-to-body="true" @close="dialogClose">
      <div v-if="contractValidDialogVisible" class="operation-text">{{this.dialogText[this.ListEventBtnType].text}}</div>
      <el-form v-if="contractValidDialogVisible && dialogRowData._btn">
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in dialogRowData._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
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
import { $userContractView, $userContractBatchConfirm, $userContractCancel, $userContractDownload } from '@/service/user'
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
      buttonsList: [{ type: 'primary', icon: '', event: 'batch', name: '批量确认签约' }],
      dialogText: {
        confirm: { title: '确认签约', text: '请确认甲方签约是否正确' },
        batch: { title: '批量确认签约', text: '请确认甲方签约是否正确' },
        recall: { title: '撤回', text: '请确认撤回甲方已签署的合同，撤回后本合同作废' },
        download: { title: '下载', text: '请确认是否下载' }
      },
      dialogRowData: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'contract_contractValid_mode_list',
      page_status: 'contract_contractValid_page_status',
      page_column: 'contract_contractValid_column',
      select_list: 'contract_contractValid_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
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
        case 'batch':
          if (!this.$refs.table.multipleSelection) {
            this.$message.warning('请选择要确认的合同')
            return
          }
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
        if (this.ListEventBtnType === 'confirm' || this.ListEventBtnType === 'batch') {
          this.contractBatchConfirm(this.dialogRowData.row)
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
        window.location.href = res.data
      })
    },
    contractBatchConfirm(row) {
      var contractList = {
        idList: []
      }
      if (this.ListEventBtnType === 'confirm') {
        contractList.idList.push(row.contractId)
      } else if (this.ListEventBtnType === 'batch') {
        this.$refs.table.multipleSelection.forEach(item => {
          contractList.idList.push(item.contractId)
        })
      }
      $userContractBatchConfirm(contractList).then(res => {
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
      $userContractDownload({ id: row.contractId }).then(res => {
        exportBlobToFiles(res, row.partyaName + '-' + row.title, res.type)
        this.$message.success('下载成功')
        this.contractValidDialogVisible = false
      })
    },
    dialogClose() {
      this.dialogRowData = {}
      this.ListEventBtnType = ''
    },
    checkboxStatus(row, index, callback) {
      const flagTrue = true
      const flagFalse = false
      if (row.status === 2) {
        callback(flagTrue)
      } else {
        callback(flagFalse)
      }
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

