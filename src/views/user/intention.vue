<template>
  <div class="template-main">
    <em-table-list
      ref="tables"
      :tableListName="'intention'"
      :mode_list="mode_list"
      :authButtonList="authButtonList"
      :axios="axios"
      :queryCustURL="queryCustURL"
      :responseSuccess="response_success"
      :queryParam="queryParams"
      :page_column="page_column"
      :buttonsList="buttonsList"
      :select_list="select_list"
      :page_status="page_status"
      @onListEvent="onListEvent"
      @onReqParams="onReqParams"
      @onListFormEvent="onListFormEvent"
    ></em-table-list>
  </div>
</template>
<script>
import { isTypeof, initVueDataOptions, exportBlobToFiles, callbackPagesInfo } from '@/utils/tools'
import { $userRegisterExport, $userFindRegister } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'intention',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        // add: {
        //   url: 'user/register_manage/add_driver',
        //   method: 'post'
        // },
        detail: {
          url: 'user/user/find_register',
          parse: ['data'],
          key: 'userId',
          value: 'userId',
          concat: ['user', 'userInfo']
        },
        list: {
          url: 'user/user/page_list_register',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '平台用户管理'
      },
      buttonsList: []
      // buttonsList: [{ type: 'primary', icon: '', event: 'download', name: '导出' }]
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'user_intention_column',
      mode_list: 'user_intention_mode_list',
      page_status: 'user_intention_page_status',
      page_business_column: 'user_business_column',
      select_list: 'user_intention_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'download') {
        const params = this.currParams
        params.excelData = {
          titles: {
            客户ID: 'id',
            姓名: 'userName',
            手机号: 'mobile',
            常住地址: 'address',
            挂靠物流公司名称: 'carrierOrgName',
            常跑路线: 'frequentLine',
            常去加气站: 'frequentGasstation',
            了解平台渠道: 'fromChannel',
            备注: 'remark',
            创建时间: 'createDate'
          }
        }
        $userRegisterExport(params).then(response => {
          const fileName = '意向个人车主' + Date.parse(new Date()) + '.xls'

          exportBlobToFiles(response, fileName)
        })
      }
      if (type === 'detail') {
        $userFindRegister({ userId: row.user_id }).then(res => {
        })
      }
    },
    onListFormEvent(type, row) {
      console.log(type, row)
    },
    onReqParams(type, _this, callback) {
      const query = { param: {} }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') query.param[k] = v
        }
      }

      this.currParams = query.param

      const params = Object.assign({}, callbackPagesInfo(_this), query)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
