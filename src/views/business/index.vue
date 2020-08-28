<template>
  <div class="template-main">
    <em-table-list :tableListName="'busorg'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="平台公司详情" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventForm"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'busorg',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        add: {
          url: '/user/org/add',
          method: 'post'
        },
        edit: {
          url: '/user/org/edit',
          method: 'post'
        },
        list: {
          url: 'user/org/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '企业管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加公司' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogDetailVisible: false,
      detailRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_org_mode_list',
      page_status: 'bus_org_page_status',
      page_column: 'bus_org_column',
      select_list: 'bus_org_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      page_column_detail: 'bus_orgDetail_column'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      row._btn = {}
      if (type === 'detail') {
        this.detailRow = row
        this.detailRow._btn = {
          iShow: true,
          list: [{
            bType: 'primary',
            label: '返回',
            icon: ''
          }]
        }
        this.dialogDetailVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    },
    onListEventForm(obj) {
      this.dialogDetailVisible = false
    }
  }
}
</script>
