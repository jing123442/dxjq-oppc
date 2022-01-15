<template>
  <!-- 加气站提现限制配置 -->
  <div class="withdraw-config template-main">
    <em-table-list :tableListName="'withdrawLimitConfig'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="添加提现限制加气站" :visible.sync="dialogfillerAddVisible" width="80%" :append-to-body="true" @close="dialogClose">
      <nt-infinite-transfer v-if="dialogfillerAddVisible"
                            :dataList="fillerList"
                            :selectedList="selectedList"
                            :primary="'orgId'"
                            :fields="'orgShortName'"
                            :dataTotal="fillerTotal"
                            @onload="onload"
                            @remote="remote "></nt-infinite-transfer>
      <div slot="footer" class="dialog-footer" >
        <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="addGasstationEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="审核记录" :visible.sync="dialogCheckLogVisible" width="80%" :append-to-body="true">
      <em-table-list v-if="dialogCheckLogVisible" :tableListName="'checkLogList'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURLCheckLog" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="check_log_mode_list" ref="tables" :page_status="check_log_page_status" :page_column="check_log_page_column" :select_list="check_log_select_list" @onListEvent="onListEvent" @onReqParams="onReqParamsCheckLog"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $updateLimitStatus, $withdrawConfigBatchAdd } from '@/service/pay'
import { $userOrgList } from '@/service/user'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'pay/withdraw_config/list_by_param',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站提现限制配置'
      },
      queryCustURLCheckLog: {
        list: {
          url: 'pay/withdraw_check_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '审核记录'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'withdraw_limit_add', name: '新增提现限制加气站' }],
      dialogfillerAddVisible: false,
      fillerList: [],
      fillerTotal: 0,
      formBtnList: custFormBtnList(),
      pages: {
        page: 1,
        size: 10
      },
      selectedList: [],
      currentRow: {},
      rebateFillerAddRow: {},
      dialogCheckLogVisible: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'withdraw_limit_config_mode_list',
      page_status: 'withdraw_limit_config_page_status',
      page_column: 'withdraw_limit_config_column',
      select_list: 'withdraw_limit_config_select_list',
      check_log_mode_list: 'check_log_list_mode_list',
      check_log_page_status: 'check_log_list_page_status',
      check_log_page_column: 'check_log_list_column',
      check_log_select_list: 'check_log_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
  },
  methods: {
    onload(keyword) {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          org: {
            orgName: keyword,
            orgType: 1
          }
        }
      }
      $userOrgList(params).then(res => {
        this.fillerTotal = res.data.total
        this.fillerList.push(...res.data.records)
        this.pages.page++
      })
    },
    remote() {
      this.pages.page = 1
      this.fillerList = []
    },
    onListEvent(type, row) {
      if (type == 'withdraw_limit_add') {
        this.rebateFillerAddRow._btn = custFormBtnList()
        this.dialogfillerAddVisible = true
      } else if (type == 'limitOpen' || type == 'limitClose') {
        this.limitConfigOpt(type, row)
      } else if (type == 'checkLog') {
        this.currentRow = row
        this.dialogCheckLogVisible = true
      }
    },
    limitConfigOpt(type, row) {
      if (type == 'limitOpen') {
        const params = {
          orgId: row.orgId,
          limitStatus: 1
        }
        this.$confirm('确定开启限制吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $updateLimitStatus(params).then(res => {
            this.$message.success('开启限制成功')
            this.$refs.tables.initDataList()
          })
        })
      } else if (type == 'limitClose') {
        const params = {
          orgId: row.orgId,
          limitStatus: 0
        }
        this.$confirm('确定关闭限制吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $updateLimitStatus(params).then(res => {
            this.$message.success('关闭限制成功')
            this.$refs.tables.initDataList()
          })
        })
      }
    },
    addGasstationEvent(item) {
      if (item.type == 'ok') {
        if (this.selectedList.length === 0) {
          this.$message.error('请选择要添加的提现限制加气站')
          return
        }
        const temp = []
        this.selectedList.forEach(item => {
          temp.push({
            limitStatus: 1,
            orgId: item.orgId,
            orgName: item.orgName,
            nickName: item.orgShortName
          })
        })
        const params = [...temp]
        $withdrawConfigBatchAdd(params).then(response => {
          this.dialogfillerAddVisible = false
          this.$message.success('添加成功！')
          this.$refs.tables.initDataList()
        })
      } else {
        this.dialogfillerAddVisible = false
      }
    },
    dialogClose() {
      this.configRow = {}
      this.pages.page = 1
      this.fillerList = []
      this.selectedList = []
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqParamsCheckLog(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgId: this.currentRow.orgId } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.carrier-name {
  padding: 20px 20px 8px;
  background: #fff;
}
</style>
