<template>
  <div class="template-main">
    <div class="basic-con ">
      <div class="title">基本设置</div>
      <nt-form ref="pointsConfig" :rowData="points" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEvent"></nt-form>
    </div>
    <div class="rule-con">
      <em-table-list :custTableTitle="'规则配置'" :tableListName="'ruleConfig'" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="rule_page_status" :page_column="rule_page_column" :select_list="rule_select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
    </div>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, custFormBtnList, isTypeof, callbackPagesInfo } from '@/utils/tools'
import { $getPoints, $editPoints } from '@/service/shop'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        edit: {
          url: 'shop/rule/edit',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        list: {
          url: 'shop/rule/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      },
      points: {},
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { rewardType: '' } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'pointsConfig_mode_list',
      page_status: 'pointsConfig_page_status',
      page_column: 'pointsConfig_column',
      select_list: 'pointsConfig_select_list',
      rule_page_status: 'rule_page_status',
      response_success: 'response_success',
      rule_page_column: 'rule_column',
      rule_select_list: 'rule_select_list'
    })
  },
  created() {
    this.getPoints()
  },
  methods: {
    onListEvent(obj) {
      if (obj.type == 'ok') {
        if (!this.points.pointsValue) { return }
        this.editPoints(this.points)
      }
    },
    onListTableEvent(obj) {
      console.log(obj)
    },
    getPoints(params = {}) {
      $getPoints(params).then(res => {
        this.points = res.data
        this.points._btn = custFormBtnList()
      })
    },
    editPoints(params = {}) {
      $editPoints(params).then(res => {
        this.$message.success('修改成功！')
        this.getPoints()
      })
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
.basic-con, .rule-con {
  margin: 12px;
  background: #fff;
  border-radius: 6px;
  .title {
    padding: 12px 32px;
    color: #0084ff;
  }
  /deep/ .el-del-btn-item {
    margin: 0;
  }
}
</style>
