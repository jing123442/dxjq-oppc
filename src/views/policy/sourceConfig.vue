<template>
  <div class="template-main">
    <em-table-list :buttonsList="buttonsList" ref="sourceConfig" :tableListName="'sourceConfig'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
     <el-dialog title="配置价格" :visible.sync="dialogPriceVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogPriceVisible" ref="priceSetting" :rowData="priceRow" :pageColumn="page_column_price" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogPrice"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $priceUpdate } from '@/service/strategy'

export default {
  name: 'sourceConfig',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'strategy/lng_from/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '液源地配置'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加液源地' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogPriceVisible: false,
      priceRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'policy_sourceConfig_mode_list',
      page_status: 'policy_sourceConfig_page_status',
      page_column: 'policy_sourceConfig_column',
      page_column_price: 'policy_sourceConfigPrice_column',
      select_list: 'policy_sourceConfig_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'price') {
        this.priceRow = row
        this.priceRow._btn = {
          iShow: true,
          list: [{
            bType: 'default',
            label: '取消',
            icon: ''
          }, {
            bType: 'primary',
            label: '确定',
            icon: ''
          }]
        }
        this.dialogPriceVisible = true
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
    onListEventDialogPrice(obj) {
      const self = this
      if (obj.label === '确定') {
        this.$refs.priceSetting.$children[0].validate((valid) => {
          if (valid) {
            const params = {
              code: self.priceRow.code,
              price: self.priceRow.priceUpdate
            }
            console.log(params)
            $priceUpdate(params).then(res => {
              if (res.code === 0) {
                self.$message.success(res.message)
                self.dialogPriceVisible = false
                self.$refs.sourceConfig.initDataList()
              } else {
                self.$message.error(res.message)
              }
            })
          }
        })
      } else {
        this.dialogPriceVisible = false
      }
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
