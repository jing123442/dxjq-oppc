<template>
<!-- 平台挂牌价查询 -->
  <div class="template-main" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在计算平台挂牌价，请等待...">
    <em-table-list :tableListName="'listing'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'listing',
  data() {
    return initVueDataOptions(this, {
      fullscreenLoading: false,
      queryCustURL: {
        list: {
          url: 'strategy/release_detail/release_price',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '平台挂牌价'
      },
      buttonsList: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_listing_mode_list',
      page_status: 'price_listing_page_status',
      page_column: 'price_listing_query_column',
      select_list: 'price_listing_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

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
