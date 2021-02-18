<template>
  <div class="template-main">
    <em-table-list ref="msgCenter" :tableListName="'msgCenter'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $userRoleList } from '@/service/user'

export default {
  name: 'msgCenter',
  data() {
    return {
      addMsgVisible: false,
      editMsgVisible: false,
      editMsgRow: {},
      addMsgRow: {},
      queryCustURL: {
        add: {
          url: 'message/mc_message/add',
          method: 'post'
        },
        edit: {
          url: 'message/mc_message/update',
          method: 'post'
        },
        del: {
          url: 'message/mc_message/del_batch',
          method: 'post',
          name: 'title',
          dataType: 'array'
        },
        list: {
          url: 'message/mc_message/page_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total'],
            childrenData: ['mcMessage']
          }
        },
        name: '消息'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '消息发布' }],
      axios: axiosRequestParams(this),
      bottonList: '',
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'message_mode_list',
      page_status: 'message_page_status',
      page_column: 'message_column',
      select_list: 'message_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {
    console.log(this.$refs.msgCenter)
  },
  methods: {
    // onListEventEditMsg(btnObj, row) {
    //   console.log(btnObj, row)
    //   if (btnObj.type == 'ok') {
    //     // 保存
    //   } else if (btnObj.type == 'publish') {
    //     // 实时发布
    //   }
    // },
    onListEvent(type, row) {
    },
    updateColumnValue(tableData, callback) {
      console.log(tableData)
      $userRoleList({
        page: 1,
        size: 100,
        param: {}
      }).then(res => {
        const list = res.data.records
        tableData.forEach(row => {
          const tmpRoleList = []
          row.clientRoleList && row.clientRoleList.forEach(rowItem => {
            list.forEach(item => {
              if (item.clientId == rowItem.clientId && item.roleId == rowItem.roleId) {
                rowItem.title = item.clientName + '-' + item.roleName
                tmpRoleList.push(item.roleId + '#0' + item.clientId)
              }
            })
          })
          row.clientRoleTableList = row.clientRoleList
          row.clientRoleList = tmpRoleList
        })
        console.log(tableData)
        callback(tableData)
      })
    },
    onReqParams(type, _this, callback) {
      _this.tableListResponse = ''
      console.log(_this.finds)
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { mcMessage: {}, queryDateType: 1, startDate: '', endDate: '' } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createTime') {
            if (!_this.finds.createTime) {
              delete params.param.queryDateType
              params.param.startDate = ''
              params.param.endDate = ''
            } else {
              params.param.queryDateType = 1
              params.param.startDate = v[0]
              params.param.endDate = v[1]
            }
          } else if (k == 'publishTime') {
            if (!_this.finds.publishTime) {
              delete params.param.queryDateType
              params.param.startDate = ''
              params.param.endDate = ''
            } else {
              params.param.queryDateType = 2
              params.param.startDate = v[0]
              params.param.endDate = v[1]
            }
          } else if (k == 'keyword') {
            if (v !== '') params.param[k] = v
          } else {
            if (v !== '') params.param.mcMessage[k] = v
          }
        }
      }
      var t = setInterval(() => {
        if (_this.tableListResponse) {
          clearInterval(t)
          console.log(_this.tableListResponse)
          // this.tableDataHandle(_this.tableListResponse)
        }
      }, 100)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    tableDataHandle(response) {
      var list = []
      if (response.code === 0) {
        response.data.records.forEach(item => {
          item.mcMessage.clientRoleList = item.clientRoleList
          item = item.mcMessage
          list.push(item)
        })
      }
      if (this.$refs.msgCenter) {
        this.$refs.msgCenter.tableData = list
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-form-box {
    /deep/ img {
      max-width: 100%;
    }
  }
</style>
