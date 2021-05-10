<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'district'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :rowKey="'districtId'" :options="{ lazy: true }" :composeParam="composeParam" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="变更记录" :visible.sync="dialogAreaChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogAreaChangeVisible" ref="tables" :tableListName="'district'" :authButtonList="authButtonList" :buttonsList="buttonsChangeList" :axios="axios" :queryCustURL="queryChangeCustURL" :responseSuccess="response_success" :composeParam="composeParam" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_log_status" :page_column="page_log_column" :select_list="select_list"></em-table-list>
    </el-dialog>

    <el-dialog title="新增子区域" :visible.sync="dialogAddAreaVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAddAreaVisible" ref="add_area" :rowData="areaRow" :pageColumn="page_children_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddArea"></nt-form>
    </el-dialog>
    <el-dialog :title="configOptions.dialogTitle" :visible.sync="dialogConfigVisible" width="775px" :append-to-body="true">
      <el-form size="small" :model="formConfigRow" ref="formConfig" label-position="top" v-if="dialogConfigVisible" :rules="formConfigRules">
        <el-form-item :label="configOptions.label" prop="valueList">
          <el-transfer v-model="formConfigRow.valueList" :filterable="true" :titles="configOptions.titles" :props="configOptions.props" :data="configOptions.allList"></el-transfer>
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
import { $userConfigFiller, $userFindALLFillerList, $userFindConfigFillerList, $userFindALLAreaList, $userFindConfigAreaList, $userConfigArea, $userUserList, $userFindConfigUserList, $userConfigAuthUser, $userFindALLCarrierList, $userFindConfigCarrierList, $userConfigCarrier, $userAddChildrenDistrict } from '@/service/user'
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
          },
          tree: {
            key: 'districtId'
          }
        },
        children: {
          url: 'user/district/district/child',
          method: 'get',
          props: {
            districtId: 'districtId'
          },
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        name: '业务区域管理'
      },
      queryChangeCustURL: {
        list: {
          url: 'user/district_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '变更记录'
      },
      configOptions: {
        dialogTitle: '',
        label: '',
        titles: [],
        props: {},
        allList: [],
        list: []
      },
      formConfigRow: {
        valueList: []
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '增加' }, { type: 'primary', icon: '', event: 'log', name: '变更记录' }],
      buttonsChangeList: [],
      areaRow: {},
      composeParam: ['districtId'],
      formConfigRules: {
        // fillerList: [{ required: true, message: '请至少选择一个加气站！', trigger: 'blur' }]
      },
      dialogConfigVisible: false,
      dialogAddAreaVisible: false,
      dialogAreaChangeVisible: false,
      queryParams: queryDefaultParams(this),
      queryChangeParams: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'setting_district_mode_list',
      page_status: 'setting_district_page_status',
      page_column: 'setting_district_column',
      page_children_column: 'setting_district_children_column',
      page_log_status: 'setting_district_log_page_status',
      page_log_column: 'setting_district_log_column',
      select_list: 'setting_district_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {},
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'config_filler') {
        this.initConfigFiller(row)
      } else if (type === 'config_area') {
        this.initConfigArea(row)
      } else if (type === 'config_auth') {
        this.initConfigAuthUser(row)
      } else if (type === 'config_carrier') {
        this.initConfigCarrier(row)
      } else if (type === 'userCount') {
        this.alertDistrictInfo(row.userCount, row.userDetail, '授权账号')
      } else if (type === 'gasCount') {
        if (row.districtId) {
          this.alertDistrictInfo(row.gasCount, row.gasDetail, '已配置加气站')
        }
      } else if (type === 'carrierCount') {
        if (row.districtId) {
          this.alertDistrictInfo(row.carrierCount, row.carrierDetail, '已配置物流客户')
        }
      } else if (type === 'log') {
        this.dialogAreaChangeVisible = true
      } else if (type === 'add_children') {
        this.areaRow.parentId = row.districtId
        this.areaRow.parentName = row.districtName
        this.areaRow._btn = this.formBtnList
        this.dialogAddAreaVisible = true
      }
    },
    alertDistrictInfo(number, data, title) {
      if (Number(number) > 0) {
        const info = []
        data.forEach(item => {
          info.push(item.name)
        })
        this.$alert(info.join(' / '), title)
      }
    },
    setConfigOptions(dialogTitle = '', label = '', titles = [], props = {}) {
      this.configOptions = {
        dialogTitle: dialogTitle,
        label: label,
        titles: titles,
        props: props
      }
    },
    async initConfigFiller(row) { // 配置加气站
      this.formConfigRow = Object.assign({}, row, this.formConfigRow)
      this.setConfigOptions('配置加气站', '加气站配置', ['加气站列表', '已选加气站'], { key: 'orgId', label: 'orgName' })
      this.configOptions.allList = await $userFindALLFillerList({ districtId: row.districtId }).then(response => {
        return response.data || []
      })

      this.formConfigRow.valueList = await $userFindConfigFillerList({ districtId: row.districtId }).then(response => {
        const data = response.data || []
        const tmpList = []

        data.forEach(item => {
          tmpList.push(item.orgId)
          this.configOptions.allList.push(item)
        })

        return tmpList
      })

      this.dialogConfigVisible = true
    },
    async initConfigArea(row) { // 配置区域
      this.formConfigRow = Object.assign({}, row, this.formConfigRow)
      this.setConfigOptions('配置行政区域', '行政区域配置', ['行政区域列表', '已选行政区域'], { key: 'areaCode', label: 'areaName' })
      this.configOptions.allList = await $userFindALLAreaList({ districtId: row.districtId }).then(response => {
        return response.data || []
      })

      this.formConfigRow.valueList = await $userFindConfigAreaList({ districtId: row.districtId }).then(response => {
        const data = response.data || []
        const tmpList = []

        data.forEach(item => {
          tmpList.push(item.areaCode)
          this.configOptions.allList.push(item)
        })

        return tmpList
      })

      this.dialogConfigVisible = true
    },
    async initConfigAuthUser(row) { // 配置用户授权
      this.formConfigRow = Object.assign({}, row, this.formConfigRow)
      this.setConfigOptions('配置授权账号', '授权账号配置', ['授权账号列表', '已选授权账号'], { key: 'userId', label: 'userName' })
      this.configOptions.allList = await $userUserList({ param: { userType: 0, status: 0 }, page: 1, size: 1000 }).then(response => {
        return response.data.records || []
      })

      this.formConfigRow.valueList = await $userFindConfigUserList({ districtId: row.districtId }).then(response => {
        const data = response.data || []
        const tmpList = []

        data.forEach(item => {
          tmpList.push(item.userId)
        })

        return tmpList
      })

      this.dialogConfigVisible = true
    },
    async initConfigCarrier(row) { // 配置物流客户
      this.formConfigRow = Object.assign({}, row, this.formConfigRow)
      this.setConfigOptions('配置物流客户', '物流客户配置', ['物流客户列表', '已选物流客户'], { key: 'orgId', label: 'orgName' })
      this.configOptions.allList = await $userFindALLCarrierList({ districtId: row.districtId }).then(response => {
        return response.data || []
      })

      this.formConfigRow.valueList = await $userFindConfigCarrierList({ districtId: row.districtId }).then(response => {
        const data = response.data || []
        const tmpList = []

        data.forEach(item => {
          tmpList.push(item.orgId)
          this.configOptions.allList.push(item)
        })

        return tmpList
      })

      this.dialogConfigVisible = true
    },
    btnClickEventFiller(params, row) { // 配置加气站
      params.orgs = []
      row.valueList && row.valueList.forEach(item => {
        for (let i = 0; i < this.configOptions.allList.length; i++) {
          if (item === this.configOptions.allList[i].orgId) {
            params.orgs.push(this.configOptions.allList[i])
          }
        }
      })

      $userConfigFiller(params).then(response => {
        this.$message.success('成功！')
        this.dialogConfigVisible = false
        this.$refs.tables.initDataList()
      })
    },
    btnClickEventArea(params, row) { // 配置行政区域
      params.areas = []
      row.valueList && row.valueList.forEach(item => {
        for (let i = 0; i < this.configOptions.allList.length; i++) {
          if (item === this.configOptions.allList[i].areaCode) {
            params.areas.push(this.configOptions.allList[i])
          }
        }
      })

      $userConfigArea(params).then(response => {
        this.$message.success('成功！')
        this.dialogConfigVisible = false
        this.$refs.tables.initDataList()
      })
    },
    btnClickEventAuthUser(params, row) { // 配置授权用户
      params.users = []
      row.valueList && row.valueList.forEach(item => {
        for (let i = 0; i < this.configOptions.allList.length; i++) {
          if (item === this.configOptions.allList[i].userId) {
            this.configOptions.allList[i].userPhone = this.configOptions.allList[i].mobile
            params.users.push(this.configOptions.allList[i])
          }
        }
      })

      $userConfigAuthUser(params).then(response => {
        this.$message.success('成功！')
        this.dialogConfigVisible = false
        this.$refs.tables.initDataList()
      })
    },
    btnClickEventCarrier(params, row) { // 配置物流客户
      params.orgs = []
      row.valueList && row.valueList.forEach(item => {
        for (let i = 0; i < this.configOptions.allList.length; i++) {
          if (item === this.configOptions.allList[i].orgId) {
            params.orgs.push(this.configOptions.allList[i])
          }
        }
      })

      $userConfigCarrier(params).then(response => {
        this.$message.success('成功！')
        this.dialogConfigVisible = false
        this.$refs.tables.initDataList()
      })
    },
    btnClickEvent(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.formConfig.validate(async (valid) => {
          if (valid) {
            const params = {
              districtId: row.districtId,
              districtName: row.districtName
            }

            if (this.currType === 'config_filler') {
              this.btnClickEventFiller(params, row)
            } else if (this.currType === 'config_area') {
              this.btnClickEventArea(params, row)
            } else if (this.currType === 'config_auth') {
              this.btnClickEventAuthUser(params, row)
            } else if (this.currType === 'config_carrier') {
              this.btnClickEventCarrier(params, row)
            }
          } else {
            return null
          }
        })
      } else {
        this.dialogConfigVisible = false
      }
    },
    onListEventAddArea(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.add_area.$children[0].validate(async (valid) => {
          if (valid) {
            const params = {
              districtName: row.districtName,
              parentId: row.parentId
            }

            $userAddChildrenDistrict(params).then(response => {
              this.$message.success('增加子区域成功！')
              this.dialogAddAreaVisible = false
            })
          } else {
            return null
          }
        })
      } else {
        this.dialogAddAreaVisible = false
      }
    },
    onReqParams(type, _this, callback) {}
  }
}
</script>
