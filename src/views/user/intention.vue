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
    ></em-table-list>
  </div>
</template>
<script>
import { isTypeof, initVueDataOptions, exportBlobToFiles, callbackPagesInfo } from '@/utils/tools'
import { $userRegisterExport } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'intention',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'user/register_manage/add_driver',
          method: 'post'
        },
        list: {
          url: 'user/register_manage/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '意向个人车主'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'download', name: '导出' }]
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
    },
    onReqParams(type, _this, callback) {
      const query = { param: { startDate: '', endDate: '' } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              query.param.startDate = ''
              query.param.endDate = ''
            } else {
              query.param.startDate = v[0]
              query.param.endDate = v[1]
            }
          } else {
            if (v !== '') query.param[k] = v
          }
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
