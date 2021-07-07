<template>
  <div class="template-main">
    <em-table-list ref="table" :tableListName="'table'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog v-if="contractSingDialogVisible" :title="this.dialogText[this.ListEventBtnType].title" :visible.sync="contractSingDialogVisible" width="50%" :append-to-body="true" @close="dialogClose">
      <div>
        <div class="operation-text">{{this.dialogText[this.ListEventBtnType].text}}</div>
        <el-form v-if="contractSingDialogVisible && dialogRowData._btn">
          <el-form-item class="el-del-btn-item">
            <div class="btn-item-footer">
              <el-button v-for="(btnItem, index) in dialogRowData._btn.list" :key="index" :type="btnItem.bType"
                         size="small"
                         :icon="btnItem.icon" @click="onListEventDialog(btnItem, dialogRowData)">{{btnItem.label}}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList, exportBlobToFiles } from '@/utils/tools'
import { $userContractView, $userContractDownload, $userContractToSign } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'contractSign',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'user/contract/page_list_sign',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '合同签约'
      },
      ListEventBtnType: '',
      contractSingDialogVisible: false,
      buttonsList: [],
      dialogText: {
        sign: { title: '合同签约', text: '请确认是否去签约' },
        download: { title: '下载', text: '请确认是否下载' }
      },
      dialogRowData: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'contract_contractSign_mode_list',
      page_status: 'contract_contractValid_page_status',
      page_column: 'contract_contractSign_column',
      select_list: 'contract_contractSign_select_list',
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
        case 'sign':
          this.dialogRowData = row
          this.contractSingDialogVisible = true
          break
        case 'download':
          this.dialogRowData = row
          this.contractSingDialogVisible = true
          break
      }
    },
    onListEventDialog(btnObj, row) {
      if (btnObj.type === 'ok') {
        if (this.ListEventBtnType === 'sign') {
          this.contractToSign(row)
        } else if (this.ListEventBtnType === 'download') {
          this.contractDownload(row)
        }
      } else if (btnObj.type === 'cancel') {
        this.contractSingDialogVisible = false
      }
    },
    contractView(row) {
      $userContractView({ id: row.contractId }).then(res => {
        window.location.href = res.data
      })
    },
    contractToSign(row) {
      $userContractToSign({ id: row.contractId }).then(res => {
        window.location.href = res.data
        this.contractSingDialogVisible = false
      })
    },
    contractDownload(row) {
      $userContractDownload({ id: row.contractId }).then(res => {
        exportBlobToFiles(res, row.partyaName + '-' + row.title, res.type)
        this.$message.success('下载成功')
        this.contractSingDialogVisible = false
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

