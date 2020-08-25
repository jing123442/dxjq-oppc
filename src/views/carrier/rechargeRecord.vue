<template>
  <div class="template-main">
    <em-table-list ref="rechargeRecord" :tableListName="'rechargeRecord'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, messageBox } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $audit } from '@/service/business'
import { formateTData } from '@/utils/filters'

export default {
  name: 'rechargeRecord',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'business/recharge_order/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '充值记录'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } })
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_rechargeRecord_mode_list',
      page_status: 'carrier_rechargeRecord_page_status',
      page_column: 'carrier_rechargeRecord_column',
      select_list: 'carrier_rechargeRecord_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      const h = this.$createElement
      const params = {
        rechargeOrderId: row.rechargeOrderId,
        auditer: JSON.parse(localStorage.getItem('wopuser')).user_id,
        auditerName: JSON.parse(localStorage.getItem('wopuser')).user_name
      }
      if (type === 'check') {
        messageBox(this, {
          title: '充值审核',
          message: h('p', null, [
            h('span', null, '公司名称：'),
            h('span', null, row.orgName),
            h('br', null, ''),
            h('br', null, ''),
            h('span', null, '手机号：'),
            h('span', null, row.tel),
            h('br', null, ''),
            h('br', null, ''),
            h('span', null, '充值金额：'),
            h('span', null, row.amount),
            h('br', null, ''),
            h('br', null, ''),
            h('span', null, '充值时间：'),
            h('span', null, formateTData(row.rechargeDate)),
            h('br', null, ''),
            h('br', null, '')
          ]),
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'none',
          cb: () => {
            return $audit(params).then((response) => {
              return response
            })
          },
          renderList: (self) => { self.$refs.rechargeRecord.initDataList() }
        })
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
    }
  }
}
</script>
