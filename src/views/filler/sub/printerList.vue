<template>
  <div class="template-main">
    <em-table-list :tableListName="'printer'" :custTableTitle="'小票机列表-' + gasstationName" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams } from '@/utils/tools'
import { $printerDel, $printerStatus } from '@/service/message'
import { mapGetters } from 'vuex'

export default {
  name: 'printer',
  data() {
    return {
      gasstationName: this.$route.query.gasstationName,
      isShow: false,
      queryCustURL: {
        add: {
          url: 'message/printer/add',
          method: 'post',
          params: {
            gasstationId: this.$route.query.gasstationId,
            gasstationName: this.$route.query.gasstationName
          }
        },
        edit: {
          url: 'message/printer/update',
          method: 'post',
          params: {
            gasstationId: this.$route.query.gasstationId,
            gasstationName: this.$route.query.gasstationName
          }
        },
        list: {
          url: 'message/printer/list',
          method: 'post',
          parse: {
            tableData: ['data'],
            totalCount: ['data', 'total']
          }
        },
        name: '小票机列表'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加小票机' }],
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_printList_modeList',
      page_status: 'filler_printList_page_status',
      page_column: 'filler_printList_column',
      select_list: 'filler_printList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      wopuser: 'wopuser',
      woporg: 'woporg'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      if (type == 'delete') {
        this.delPrint(row)
      }
    },
    delPrint(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $printerDel({ ...row }).then(res => {
          if (res.code == 0) {
            this.$message.success('删除成功')
            this.$refs.table.initDataList()
          }
        })
      }).catch(() => {})
    },
    setPrintStatus(response) {
      if (response.code == 0) {
        response.data.forEach(async item => {
          item.status = await this.getPrintStatus(item)
        })
      }
    },
    getPrintStatus(params) {
      return new Promise(resolve => {
        $printerStatus({ ...params }).then(res => {
          if (res.code == 0) {
            resolve(res.data.state)
          }
        })
      })
    },
    onReqParams(type, _this, callback) {
      _this.tableListResponse = ''
      const params = this.parseSearch(_this)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    parseSearch(_this) {
      const params = Object.assign({}, { gasstationId: this.$route.query.gasstationId })
      this.t2 = setInterval(() => {
        if (_this.tableListResponse) {
          clearInterval(this.t2)
          this.setPrintStatus(_this.tableListResponse)
        }
      }, 100)
      return params
    }
  }
}
</script>
