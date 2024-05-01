<template>
  <div class="template-main">
    <!--        :custTableTitle="'商品列表'"-->
    <em-table-list
        v-if="dataList1.length > 0"
        ref="dxLine1"
        :tableListName="'dxLine'"
        :authButtonList="authButtonList"
        :buttonsList="buttonsList"
        :axios="axios"
        :source="'data'"
        :sourceData="dataList1"
        :responseSuccess="response_success"
        :queryParam="queryParams"
        :mode_list="mode_list"
        :page_status="5"
        :page_column="page_column"
        :options="{ lazy: true }"
        :select_list="select_list"
        @onReqParams="onReqParams"
    ></em-table-list>
    <em-table-list
        ref="dxLine2"
        v-if="dataList2.length > 0"
        style="margin-top: 10px"
        :tableListName="'dxLine'"
        :authButtonList="authButtonList"
        :buttonsList="buttonsList"
        :axios="axios"
        :source="'data'"
        :sourceData="dataList2"
        :responseSuccess="response_success"
        :queryParam="queryParams"
        :mode_list="mode_list"
        :page_status="5"
        :page_column="page2_column"
        :options="{ lazy: true }"
        :select_list="select_list"
        @onReqParams="onReqParams"
    ></em-table-list>
    <em-table-list
        ref="dxLine3"
        style="margin-top: 10px"
        v-if="dataList3.length > 0"
        :tableListName="'dxLine'"
        :authButtonList="authButtonList"
        :buttonsList="buttonsList"
        :axios="axios"
        :source="'data'"
        :sourceData="dataList3"
        :responseSuccess="response_success"
        :queryParam="queryParams"
        :mode_list="mode_list"
        :page_status="5"
        :page_column="page3_column"
        :options="{ lazy: true }"
        :select_list="select_list"
        @onReqParams="onReqParams"
    ></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'DayStatisticsList',
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  data() {
    return initVueDataOptions(this, {
      authButtonList: null,
      dataList1: [],
      dataList2: [],
      dataList3: []
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_dync_day_info1_column',
      page2_column: 'cockpit_dync_day_info2_column',
      page3_column: 'cockpit_dync_day_info3_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_entrain_dx_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
    console.log(this.items)
    this.dataList1 = this.items.before || []
    this.dataList2 = this.items.mid || []
    this.dataList3 = this.items.last || []
  },
  mounted: function () {},
  methods: {
    onReqParams(type, _this, callback) {
      const params = {}
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
