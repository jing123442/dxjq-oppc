<template>
  <div class="template-main">
    <em-table-list :buttonsList="buttonsList" ref="sourceConfig" :tableListName="'sourceConfig'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
     <el-dialog title="配置价格" :visible.sync="dialogPriceVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogPriceVisible" ref="priceSetting" :rowData="priceRow" :pageColumn="page_column_price" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogPrice"></nt-form>
    </el-dialog>
     <el-dialog title="编辑" :visible.sync="dialogEditVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogEditVisible" ref="editSelf" :rowData="editRow" :pageColumn="page_column_edit" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogEdit"></nt-form>
    </el-dialog>
    <el-dialog title="变更记录" :visible.sync="dialogRecordVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogRecordVisible" ref="recordList" :tableListName="'recordList'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURLRecord" :responseSuccess="response_success" :queryParam="queryParamsRecord" :mode_list="mode_list" :page_status="page_status" :page_column="page_column_record" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="dialogAddVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAddVisible" ref="addSelf" :rowData="addRow" :pageColumn="page_column_edit" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogAdd"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $priceUpdate, $priceAdd } from '@/service/strategy'

export default {
  name: 'sourceConfig',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'strategy/lng_from/add',
          method: 'post'
        },
        edit: {
          url: 'strategy/lng_from/update',
          method: 'post'
        },
        list: {
          url: 'strategy/lng_from/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '液源地'
      },
      queryCustURLRecord: {
        list: {
          url: 'strategy/lng_from_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '变更记录'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加液源地' }],
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      queryParamsRecord: '',
      dialogPriceVisible: false,
      priceRow: {},
      dialogEditVisible: false,
      editRow: {},
      dialogRecordVisible: false,
      dialogAddVisible: false,
      addRow: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'market_sourceConfig_mode_list',
      page_status: 'market_sourceConfig_page_status',
      page_column: 'market_sourceConfig_column',
      page_column_price: 'market_sourceConfigPrice_column',
      page_column_edit: 'market_sourceConfigEdit_column',
      page_column_record: 'market_sourceConfigRecord_column',
      select_list: 'market_sourceConfig_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'price') {
        this.priceRowEvent(row)
      } else if (type === 'editSelf') {
        this.editSelfEvent(row)
      } else if (type === 'record') {
        this.recordEvent(row)
      } else if (type === 'addSelf') {
        this.addSelfEvent(row)
      }
    },
    recordEvent(row) {
      this.dialogRecordVisible = true
      const code = row.code
      this.queryParamsRecord = queryDefaultParams(this, { type: 2, key: 'param', value: { code } })
    },
    editSelfEvent(row) {
      this.editRow = row
      this.editRow._btn = {
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
      this.dialogEditVisible = true
    },
    addSelfEvent(row) {
      this.addRow = row
      this.addRow._btn = {
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
      this.dialogAddVisible = true
    },
    priceRowEvent(row) {
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
    onListEventDialogEdit(obj) {
      const self = this
      if (obj.label === '确定') {
        const params = {
          ...this.editRow
        }
        $priceUpdate(params).then(res => {
          if (res.code === 0) {
            self.$message.success(res.message)
            self.dialogEditVisible = false
            self.$refs.sourceConfig.initDataList()
          } else {
            self.$message.error(res.message)
          }
        })
      } else {
        this.dialogEditVisible = false
      }
    },
    onListEventDialogAdd(obj) {
      const self = this
      if (obj.label === '确定') {
        this.$refs.addSelf.$children[0].validate(valid => {
          if (valid) {
            const params = {
              ...this.addRow,
              latitude: this.addRow.latitude,
              longitude: this.addRow.longitude,
              price: 0
            }
            $priceAdd(params).then(res => {
              if (res.code === 0) {
                self.$message.success(res.message)
                self.dialogAddVisible = false
                self.$refs.sourceConfig.initDataList()
              } else {
                self.$message.error(res.message)
              }
            })
          }
        })
      } else {
        this.dialogAddVisible = false
      }
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
