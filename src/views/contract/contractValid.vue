<template>
  <div class="template-main">
    <em-table-list ref="table" :tableListName="'table'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
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
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '批量确认签约' }]
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
    onListEvent(type, row) {},
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
  .el-picker-panel .el-picker-panel__footer .el-button--text.el-picker-panel__link-btn {
    display: none;
  }
</style>

