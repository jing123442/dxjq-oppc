<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'informationlist'" style="flex: 1;" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'informationlist',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'information/lng_news/add',
          method: 'post',
          params: {
            type: 2
          }
        },
        edit: {
          url: 'information/lng_news/update',
          method: 'post',
          params: {
            type: 2
          }
        },
        list: {
          url: 'information/lng_news/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '增加' }]
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'information_information_column',
      mode_list: 'information_information_mode_list',
      page_status: 'information_information_page_status',
      select_list: 'information_information_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
  },
  methods: {
    onListEvent(type, row) {

    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { type: 2 } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') {
            params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
