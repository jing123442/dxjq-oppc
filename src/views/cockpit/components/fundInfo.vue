<template>
  <div class="template-main">
    <em-table-list ref="fundDetailList" :tableButtonStatus="false" :tableListName="'fundDetail'" :custTableTitle="'流水列表'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { isTypeof, callbackPagesInfo, initVueDataOptions } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'fundInfo',
  props: ['orgId', 'type'],
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: Number(this.type) === 1 ? 'account/org_account_log/list_withtime' : 'account/directsales/org_account_log/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '订单列表'
      },
      buttonsList: [],
      currParams: {}
    })
  },
  computed: {
    ...mapGetters({
      woporg: 'woporg',
      page_status: 'home_fund_page_status',
      page_column: 'home_fund_column',
      select_list: 'home_fund_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  mounted() {},
  methods: {
    onListEvent(type, row) {},
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgAccountLog: { orgId: this.orgId }, dateParam: { createDateFrom: '', createDateTo: '' } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'datePicker') {
            if (_this.finds.datePicker === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (!v) {
              delete params.param.orgAccountLog[k]
            } else {
              params.param.orgAccountLog[k] = v
            }
          }
        }
      }

      this.currParams = params
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
  .top-info {
    border-radius: 5px;
    padding: 15px;
    background-color: #ffffff;
    margin-bottom: 10px;
    .line-title {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .account-card {
      width: 120px;
      text-align: center;
      .label {
        font-size: 12px;
        color: #1C1D21;
      }
      .value-total {
        font-size: 32px;
        color: #0084F4;
        font-weight: bold;
      }
    }
  }
  .getcode-btn {
    color: #FFFFFF;
  }
</style>
