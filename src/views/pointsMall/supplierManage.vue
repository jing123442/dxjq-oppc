<template>
  <div class="supplierManage">
    <em-table-list ref="supplierManage" :custTableTitle="'供应商列表'" :tableListName="'supplierManage'" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $supplierBan } from '@/service/shop'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        add: {
          url: 'shop/supplier/add',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        edit: {
          url: 'shop/supplier/edit',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        list: {
          url: 'shop/supplier/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '供应商'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'supplier_mode_list',
      page_status: 'supplier_page_status',
      page_column: 'supplier_column',
      select_list: 'supplier_select_list',
      response_success: 'response_success'
    })
  },
  methods: {
    onListTableEvent(type, row) {
      if (type == 'stopUse') {
        this.supplierBanEvent({ id: row.id, supplierStatus: 1 }, '停用')
      } else if (type == 'startUse') {
        this.supplierBanEvent({ id: row.id, supplierStatus: 0 }, '启用')
      }
    },
    supplierBanEvent(params, text) {
      this.$confirm(`确定${text}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $supplierBan(params).then(res => {
          this.$message.success(`${text}成功`)
          this.$refs.supplierManage.initDataList()
        })
      }).catch(() => {})
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          params.param[k] = v
        }
      }
      console.log(params.param)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
