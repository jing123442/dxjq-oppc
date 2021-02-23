<template>
    <div class="template-main">
      <em-table-list ref="tables" :tableListName="'settingmenu'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :composeParam="composeParam" :rowKey="'menuId'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :options="{ lazy: false }" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      <el-dialog :title="childrenTitle" :visible.sync="dialogAddChildVisible" :width="add_edit_dialog" :append-to-body="true">
        <nt-form v-if="dialogAddChildVisible" ref="addChild" :formRef="'addChildForm'" :rowData="addChildRow" :inputType="'show'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddChild"></nt-form>
      </el-dialog>
    </div>
</template>
<script>
import { $menuAdd } from '@/service/user'
import { initVueDataOptions, custFormBtnList, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'settingmenu',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'user/menu/add',
          method: 'post'
        },
        edit: {
          url: 'user/menu/update',
          method: 'post'
        },
        list: {
          url: 'user/menu/menu_list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '菜单'
      },
      composeParam: ['id', 'parentId'],
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '新建菜单' }],
      addChildRow: {},
      childrenTitle: '新增子菜单',
      dialogAddChildVisible: false,
      removeRow: {},
      dialogDelChildVisible: false
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'authority_menu_column',
      mode_list: 'authority_menu_mode_list',
      page_status: 'authority_menu_page_status',
      select_list: 'authority_menu_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {},
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'add-child' || type === 'edit-child') {
        this.addChildRow = type === 'add-child' ? { parentId: row.menuId } : row
        this.childrenTitle = type === 'add-child' ? '新增子分类' : '编辑子分类'
        this.addChildRow._btn = custFormBtnList()
        this.dialogAddChildVisible = true
      } else if (type === 'del-child') {
        this.removeRow = row
        this.removeRow.message = `确定删除【${row.name}】记录。`
        this.dialogDelChildVisible = true
      }
    },
    onListEventAddChild(btn, row) {
      if (btn.type == 'ok') {
        this.$refs.addChild.$refs.addChildForm.validate((valid) => {
          if (valid) {
            const params = {
              clientId: row.clientId,
              clientName: row.clientName,
              menuIcon: row.menuIcon,
              menuIconFont: row.menuIconFont,
              menuId: row.menuId,
              menuName: row.menuName,
              noCache: Boolean(row.noCache),
              parentId: row.parentId,
              rank: Number(row.rank),
              routeName: row.routeName,
              routePath: row.routePath
            }

            $menuAdd(params).then((res) => {
              this.$message.success(res.message)
            })
            this.dialogAddChildVisible = false
          }
        })
      } else {
        this.dialogAddChildVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = { clientId: 'woperation' }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
