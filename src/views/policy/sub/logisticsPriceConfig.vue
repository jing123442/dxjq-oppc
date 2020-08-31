<template>
  <div class="template-main">
    <em-table-list :tableListName="'logisticsPriceConfig'" ref="logisticsPriceConfig" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="设置价格" :visible.sync="dialogPriceVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogPriceVisible" ref="priceForm" :rowData="priceRow" :pageColumn="page_column_edit" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventPrice"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $carrierPriceEdit } from '@/service/strategy'

export default {
  name: 'logisticsPriceConfig',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'strategy/carrier_gasstation_price/gasstation_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '价格配置'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgId: this.$route.query.orgId } }),
      dialogPriceVisible: false,
      priceRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_sevicePrice_mode_list',
      page_status: 'filler_account_page_status',
      page_column: 'policy_logisticsPriceConfig_column',
      page_column_edit: 'policy_logisticsPriceConfigEdit_column',
      select_list: 'filler_printList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'editSelf') {
        this.priceRow = row
        this.priceRow._btn = {
          iShow: true,
          list: [{
            bType: 'primary',
            label: '确定'
          }, {
            bType: 'default',
            label: '取消'
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
    onListEventPrice(obj) {
      if (obj.label === '确定') {
        const self = this
        this.$refs.priceForm.$children[0].validate(valid => {
          if (valid) {
            const params = {
              creater: JSON.parse(localStorage.getItem('wopuser')).user_id,
              createrName: JSON.parse(localStorage.getItem('wopuser')).user_name,
              gasstationId: this.priceRow.gasstationId,
              orgId: this.$route.query.orgId,
              price: this.priceRow.priceCurrent
            }
            $carrierPriceEdit(params).then(res => {
              if (res.code === 0) {
                self.$message.success(res.message)
                self.dialogPriceVisible = false
                self.$refs.logisticsPriceConfig.initDataList()
              } else {
                self.$message.error(res.message)
              }
            })
          }
        })
      } else {
        this.dialogPriceVisible = false
      }
    }
  }
}
</script>
