<template>
  <div class="template-main">
    <span>加气站名称：{{gasstationName}}</span>
    <em-table-list :tableListName="'filler'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'lngServiceFeeSetting',
  data() {
    return {
      gasstationName: '',
      isShow: false,
      queryCustURL: {
        add: {
          url: '/websocket/printer/add',
          method: 'post'
        },
        edit: {
          url: '/websocket/printer/update',
          method: 'post'
        },
        list: {
          url: 'websocket/printer/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '打印机列表'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加打印机' }],
      axios: axiosRequestParams(this),
      queryParams: [{ type: 2, key: 'gasstationId', value: this.$route.query.gasstationId }]
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_sevicePrice_mode_list',
      page_status: 'filler_printList_page_status',
      page_column: 'filler_printList_column',
      select_list: 'filler_printList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.gasstationName = this.$route.query.gasstationName
  },
  methods: {
    onListEvent(type, row) {},
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    }
  }
}
</script>
