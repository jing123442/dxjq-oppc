<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'orderDownload'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { $generateDownloadCenterFile } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'orderDownload',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/generate_file/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '下载中心'
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'order_download_mode_list',
      page_status: 'order_download_page_status',
      page_column: 'order_download_column',
      select_list: 'order_download_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'download') {
        $generateDownloadCenterFile({ id: row.id, orgId: row.orgId }).then(response => {
          exportBlobToFiles(response, row.fileName)
        })
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { generateFile: { }, dateParam: { } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (v !== '') params.param.generateFile[k] = v
          }
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
