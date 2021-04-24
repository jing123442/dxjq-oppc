<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'district'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :composeParam="composeParam" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="配置加气站" :visible.sync="dialogConfigVisible" width="60%" :append-to-body="true">
      <el-form size="small" :model="formConfigRow" ref="formConfig" label-position="top" v-if="dialogConfigVisible" :rules="formConfigRules">
        <el-form-item label="加气站配置" prop="fillerList" style="width: 90%;">
          <el-transfer v-model="formConfigRow.fillerList" :filterable="true" :titles="['加气站列表', '已选加气站']" :props="{ key: 'orgId', label: 'orgName' }" :data="fillerAllList"></el-transfer>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem, formConfigRow)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'
import { $userOrgList, $districtGasstationList, $districtGasstationAdd, $districtGasstationDelete } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'district',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'user/district/add',
          method: 'post'
        },
        edit: {
          url: 'user/district/update',
          method: 'post'
        },
        del: {
          url: 'user/district/delete',
          method: 'post',
          name: 'districtName',
          props: {
            districtId: 'districtId'
          }
        },
        list: {
          url: 'user/district/district/list',
          method: 'get',
          parse: {
            tableData: ['data']
          }
        },
        name: '区域管理'
      },
      fillerAllList: [],
      selectFillerList: [],
      oldFillerList: [],
      formConfigRow: {
        fillerList: []
      },
      composeParam: ['districtId'],
      formConfigRules: {
        // fillerList: [{ required: true, message: '请至少选择一个加气站！', trigger: 'blur' }]
      },
      dialogConfigVisible: false,
      queryParams: queryDefaultParams(this),
      queryChangeParams: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'setting_district_mode_list',
      page_status: 'setting_district_page_status',
      page_column: 'setting_district_column',
      select_list: 'setting_district_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const params = {
        page: 1,
        size: 500,
        param: { org: { orgType: 1 }, dateParam: { createDateFrom: '', createDateTo: '' } }
      }
      $userOrgList(params).then(response => {
        this.fillerAllList = [...new Set(response.data.records || [])]
      })
    },
    onListEvent(type, row) {
      if (type === 'config') {
        this.oldFillerList = []
        $districtGasstationList({}).then(response => {
          const data = response.data || []
          const tmpList = []

          data.forEach(item => {
            this.fillerAllList.filter((node, index) => {
              if (item.orgId === node.orgId) {
                this.fillerAllList.splice(index, 1)
              }
            })
            if (row.districtId === item.districtId) {
              this.oldFillerList.push(item)
              tmpList.push(item.orgId)

              this.fillerAllList.push(item)
            }
          })
          this.formConfigRow = Object.assign({ fillerList: tmpList }, row)
          this.dialogConfigVisible = true
        })
      }
    },
    btnClickEvent(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.formConfig.validate(async (valid) => {
          if (valid) {
            const addList = []
            const params = {
              districtId: row.districtId,
              districtName: row.districtName
            }

            row.fillerList && row.fillerList.forEach(item => {
              let isFlag = false
              this.oldFillerList.forEach((node, index) => {
                if (node.orgId === item) {
                  isFlag = true
                  this.oldFillerList.splice(index, 1)
                }
              })
              if (!isFlag) {
                this.fillerAllList.forEach(node => {
                  console.log(node.orgId, item)
                  if (node.orgId === item) {
                    addList.push({
                      gasstationId: node.orgId,
                      gasstationName: node.orgName
                    })
                  }
                })
              }
            })

            // 增加加气站
            if (addList.length > 0) {
              params.list = addList

              await $districtGasstationAdd(params).then(() => {})
            }

            // 删除加气站
            if (this.oldFillerList.length > 0) {
              params.list = []
              this.oldFillerList.forEach(item => {
                params.list.push({ gasstationId: item.orgId })
              })
              await $districtGasstationDelete(params).then(() => {})
            }

            this.$message.success('成功！')
            this.dialogConfigVisible = false
            this.$refs.tables.initDataList()
            this.initData()
          } else {
            return null
          }
        })
      } else {
        this.dialogConfigVisible = false
      }
    },
    onReqParams(type, _this, callback) {}
  }
}
</script>
