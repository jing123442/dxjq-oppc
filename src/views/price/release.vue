<template>
  <div class="template-main" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在发布平台挂牌价，请等待...">
    <em-table-list :tableListName="'release'" ref="tables" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="变更记录" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogChangeVisible" :tableListName="'releaseLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $priceReleaseAudit, $strategyPublishPrice } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'release',
  data() {
    return initVueDataOptions(this, {
      logRow: [],
      dialogChangeVisible: false,
      fullscreenLoading: false,
      queryCustURL: {
        list: {
          url: 'strategy/release_manage/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '发布管理'
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/release_detail/list_new',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_release_mode_list',
      page_status: 'price_release_page_status',
      page_column: 'price_release_column',
      select_list: 'price_release_select_list',
      log_page_column: 'price_release_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'pass' || type === 'reject') {
        var message = type === 'pass' ? '请确认是否发布此价格' : '请确认是否驳回此价格'
        this.$confirm(message, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          const params = {
            id: row.id,
            status: type === 'pass' ? 2 : 3
          }
          $priceReleaseAudit(params).then(response => {
            this.$message.success('成功！')
            this.$refs.tables.initDataList()
          })
        }).catch(() => {})
      } else if (type === 'publish') {
        this.$confirm('请确认是否实时发布价格', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.fullscreenLoading = true
          $strategyPublishPrice({ id: row.id }).then(response => {
            this.fullscreenLoading = false
            this.$message.success('成功！')
            this.$refs.tables.initDataList()
          }).catch(() => {
            this.fullscreenLoading = false
          })
        }).catch(() => {})
      } else {
        this.currRow = row
        this.dialogChangeVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (_this.tableListName == 'releaseLog') {
        params.param.releaseId = this.currRow.id
      }

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
