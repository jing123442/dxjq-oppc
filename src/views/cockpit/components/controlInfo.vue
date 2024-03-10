<template>
  <div class="rebate template-main">
    <em-table-list :tableListName="'rebate'" :tableButtonStatus="false" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  name: 'controlInfo',
  props: ['orgId'],
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'strategy/flag/price/get_price_page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'home_control_modeList',
      page_status: 'home_control_page_status',
      page_column: 'home_control_column',
      select_list: 'home_control_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created() {},
  methods: {
    onListEvent(type, row) {
      if (type === 'order') {
        this.$router.push({
          path: './direct/directOrder'
        })
      } else if (type === 'url') {
        window.open(row.url)
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasstationId: this.orgId } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params[k] = v
        }
      }
      // 排序
      if (_this.order.price === 'ascending') {
        params.param.orderBy = 0
      } else if (_this.order.price === 'descending') {
        params.param.orderBy = 1
      }

      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  padding: 20px;
}
.box-wrap .title em {
  margin-left: 28px;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #8C8C8C;
}
</style>
