<template>
  <div class="template-main">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.name" :name="index.toString()">
        <em-table-list v-if="active == index && nextTick" ref="tables" :tableListName="'preferential'" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :composeParam="composeParam" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="配置" :visible.sync="dialogConfigVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogConfigVisible" ref="config" :formRef="'configForm'" :rowData="configRow" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventConfig"></nt-form>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogConfigUpdateVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogConfigUpdateVisible" ref="configEdit" :formRef="'configEditForm'" :rowData="configUpdateRow" :pageColumn="edit_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventConfigEdit"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, custFormBtnList, callbackPagesInfo } from '@/utils/tools'
import { $lngFormList, $configAreaBenefit, $configAreaEditBenefit } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'preferential',
  data() {
    return {
      active: '0',
      tabsList: [],
      nextTick: false,
      configRow: {},
      dialogConfigVisible: false,
      configUpdateRow: {},
      dialogConfigUpdateVisible: false,
      composeParam: ['lngFromId', 'city'],
      buttonsList: [{ type: 'primary', icon: '', event: 'config', name: '配置' }],
      queryCustURL: {
        del: {
          url: 'strategy/area_benefit/delete',
          method: 'post',
          name: 'city',
          props: { lngFromId: 'lngFromId', city: 'city' }
        },
        list: {
          url: 'strategy/area_benefit/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_preferential_mode_list',
      page_status: 'price_preferential_page_status',
      page_column: 'price_preferential_column',
      select_list: 'price_preferential_select_list',
      edit_page_column: 'price_preferential_edit_column',
      del_page_column: 'price_preferential_del_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    }),
    currLngForm() {
      return this.tabsList[this.active]
    }
  },
  created() {
    this.initTabsData()
  },
  mounted: function () { },
  methods: {
    initTabsData() {
      $lngFormList().then(response => {
        this.tabsList = response.data
        this.initTableList()
      })
    },
    initTableList() {
      this.$nextTick(() => {
        this.nextTick = true
      })
    },
    onListEvent(type, row) {
      switch (type) {
        case 'config':
          this.configInfo(row)
          break
        case 'edit-s':
          this.configEditInfo(row)
          break
      }
    },
    configInfo(row) {
      this.configRow._btn = custFormBtnList()
      this.dialogConfigVisible = true
    },
    configEditInfo(row) {
      row._btn = custFormBtnList()
      this.configUpdateRow = Object.assign({}, row)
      this.configUpdateRow.benefit = row.benefit ? Number(row.benefit) * 1000 : 0
      this.dialogConfigUpdateVisible = true
    },
    onListEventConfig(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.config.$refs.configForm.validate((valid) => {
          if (valid) {
            const params = []

            row.areaList.forEach(item => {
              params.push({
                benefit: row.benefit,
                lngFromId: this.currLngForm.code,
                city: item[1],
                province: item[0]
              })
            })

            $configAreaBenefit(params).then((res) => {
              if (res.code == 0) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
              this.$refs.tables[0].initDataList()
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.dialogConfigVisible = false
    },
    onListEventConfigEdit(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.configEdit.$refs.configEditForm.validate((valid) => {
          if (valid) {
            const params = {
              benefit: Number(row.benefit),
              lngFromId: this.currLngForm.code,
              city: row.city
            }

            $configAreaEditBenefit(params).then((res) => {
              if (res.code == 0) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
              console.log(this.$refs.tables)
              this.$refs.tables[0].initDataList()
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.dialogConfigUpdateVisible = false
    },
    handleClick(tab, event) {
      this.nextTick = false
      this.initTableList()
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { lngFromId: this.currLngForm.code } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
