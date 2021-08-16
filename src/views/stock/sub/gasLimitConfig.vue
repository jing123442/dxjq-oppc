<template>
  <div class="template-main">
    <em-table-list :tableListName="'gasLimitConfig'" ref="tables" :authButtonList="authButtonList" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="查看配置详情" :visible.sync="dialogGasLimitDetailVisible" width="80%" :append-to-body="true">
      <em-table-list v-if="dialogGasLimitDetailVisible" :tableListName="'gasLimitDetail'" :custTableTitle="'配置详情'" ref="GasLimitDetail" :axios="axios" :queryCustURL="queryCustGasLimitDetailURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="detail_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
    <el-dialog title="配置加气限制" :visible.sync="dialogGasLimitConfigVisible" width="80%" :append-to-body="true" @close="dialogClose">
      <nt-infinite-transfer v-if="dialogGasLimitConfigVisible"
                            :dataList="gasstationList"
                            :selectedList="selectedList"
                            :primary="'gasstationId'"
                            :fields="'name'"
                            :dataTotal="gasstationTotal"
                            @onload="onload"
                            @remote="remote "></nt-infinite-transfer>
      <nt-form v-if="dialogGasLimitConfigVisible" ref="config" :formRef="'configForm'" :rowData="configRow" :pageColumn="form_page_column" :selectList="form_select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="btnClickEvent"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, custFormBtnList } from '@/utils/tools'
import { $strategyGasLimitAdd, $strategyGasstationStoreList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  data() {
    return initVueDataOptions(this, {
      buttonsList: [{ type: 'primary', icon: '', event: 'config', name: '配置' }, { type: 'primary', icon: '', event: 'gasLimitDetail', name: '限制加气司机明细' }],
      queryCustURL: {
        list: {
          url: 'strategy/gas_limit_config_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气限制'
      },
      queryCustGasLimitDetailURL: {
        list: {
          url: 'strategy/gas_limit_config_detail/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气限制'
      },
      dialogGasLimitDetailVisible: false,
      dialogGasLimitConfigVisible: false,
      limitLogRow: {},
      gasstationList: [],
      gasstationTotal: 0,
      pages: {
        page: 1,
        size: 10
      },
      selectedList: [],
      configRow: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'gas_limit_config_mode_list',
      page_status: 'gas_limit_config_page_status',
      page_column: 'gas_limit_congfig_column',
      select_list: 'gas_limit_config_select_list',
      detail_page_column: 'gas_limit_congfig_detail_column',
      form_page_column: 'limit_congfig_form_page_column',
      form_select_list: 'limit_config_form_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
  },
  mounted: function () {
  },
  methods: {
    onListEvent(type, row) {
      if (type == 'config') {
        this.configRow._btn = custFormBtnList()
        this.dialogGasLimitConfigVisible = true
      } else if (type == 'listDetail') {
        this.limitLogRow = row
        this.dialogGasLimitDetailVisible = true
      } else if (type == 'gasLimitDetail') {
        this.$router.push('./gasLimitDriverDetail')
      }
    },
    onload(keyword) {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          nickName: keyword
        }
      }
      $strategyGasstationStoreList(params).then(res => {
        this.gasstationTotal = res.data.total
        this.gasstationList.push(...res.data.records)
        this.gasstationList.forEach((item, i) => {
          item.gasLimitText = item.gasLimitStatus === 0 ? '已关闭加气限制' : '加气限制' + item.gasLimitStock + '公斤'
          item.nickName = item.nickName ? item.nickName : '加气站昵称为空'
          item.name = item.nickName + ' - - - - ' + item.gasLimitText
        })
        this.pages.page++
      })
    },
    remote() {
      this.pages.page = 1
      this.gasstationList = []
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        if (this.selectedList.length === 0) {
          this.$message.error('请选择要配置的-加气站')
          return
        }
        var params = {
          gasstationIds: [],
          limitStock: this.configRow.limitStock,
          type: this.configRow.type
        }
        this.selectedList.forEach(item => {
          params.gasstationIds.push(item.gasstationId)
        })
        this.$refs.config.$refs.configForm.validate(valid => {
          if (valid) {
            $strategyGasLimitAdd(params).then(response => {
              this.$message.success('配置成功！')
              this.$refs.tables.initDataList()
            })
          }
        })
      }
      this.dialogGasLimitConfigVisible = false
    },
    dialogClose() {
      this.configRow = {}
      this.pages.page = 1
      this.gasstationList = []
      this.selectedList = []
    },
    onReqParams(type, _this, callback) {
      let params = {}
      if (_this.tableListName == 'gasLimitDetail') {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { logId: this.limitLogRow.id } })
      } else {
        params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
