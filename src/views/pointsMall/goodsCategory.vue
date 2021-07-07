<template>
  <div class="goodsCategory template-main">
    <em-table-list :custTableTitle="'商品分类列表'" :tableListName="'goodsCategory'" ref="goodsCategory" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, toolsFileHeaders, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $shopCategoryBan } from '@/service/shop'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        edit: {
          url: 'shop/category/category',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: 'shop/category/category',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        list: {
          url: 'shop/category/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '商品分类'
      },
      headers: toolsFileHeaders(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'category_mode_list',
      page_status: 'category_page_status',
      page_column: 'category_column',
      select_list: 'category_select_list',
      response_success: 'response_success'
    })
  },
  created() {
  },
  methods: {
    onListTableEvent(type, row) {
      if (type == 'stopUse') {
        this.goodsCategoryEvent({ id: row.id, categoryStatus: 1 }, '停用')
      } else if (type == 'startUse') {
        this.goodsCategoryEvent({ id: row.id, categoryStatus: 0 }, '启用')
      }
    },
    goodsCategoryEvent(params, text) {
      this.$confirm(`确定${text}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $shopCategoryBan(params).then(res => {
          this.$message.success(`${text}成功`)
          this.$refs.goodsCategory.initDataList()
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
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
