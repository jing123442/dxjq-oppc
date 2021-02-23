<template>
  <div class="template-main">
    <em-table-list :tableListName="'release'" ref="tables" :authButtonList="authButtonList" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="气价调节" :visible.sync="dialogMeasureVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogMeasureVisible" ref="from" :formRef="'measureForm'" :rowData="measureRow" :pageColumn="measure_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onMeasureEventFrom"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList, queryDefaultParams } from '@/utils/tools'
import { $gasstationUpdatePrice } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'measure',
  data() {
    return initVueDataOptions(this, {
      measureRow: [],
      dialogMeasureVisible: false,
      buttonsList: [{ type: 'primary', icon: '', event: 'measure', name: '设置气价调节金额' }],
      queryCustURL: {
        list: {
          url: 'strategy/gway_gasprice_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '气价调节'
      },
      queryParams: queryDefaultParams(this)
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_release_mode_list',
      page_status: 'price_release_page_status',
      page_column: 'price_measure_column',
      select_list: 'price_release_select_list',
      measure_page_column: 'price_listing_measure_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      row._btn = custFormBtnList()
      this.measureRow = row
      this.dialogMeasureVisible = true
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (_this.tableListName == 'releaseLog') {
        params.param.releaseId = this.currRow.id
      }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onMeasureEventFrom(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.from.$refs.measureForm.validate((valid) => {
          if (valid) {
            const params = {
              preGasprice: row.measureMoney
            }

            $gasstationUpdatePrice(params).then((res) => {
              this.$message.success(res.message)

              this.$refs.tables.initDataList()
            })
            this.dialogMeasureVisible = false
          } else {
            console.log('error submit!!')
          }
        })
      } else {
        this.dialogMeasureVisible = false
      }
    }
  }
}
</script>
