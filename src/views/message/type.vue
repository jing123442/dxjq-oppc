<template>
  <div class="template-main">
    <em-table-list ref="tables" v-if="reloadChildStatus" :tableListName="'order'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :composeParam="composeParam" :rowKey="'id'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :options="{ lazy: true }" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog :title="childrenTitle" :visible.sync="dialogAddChildVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAddChildVisible" ref="addChild" :formRef="'addChildForm'" :rowData="addChildRow" :inputType="'show_child'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddChild"></nt-form>
    </el-dialog>
    <el-dialog title="子分类详情" :visible.sync="dialogDetailChildVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogDetailChildVisible" ref="detailChild" :formRef="'detailChildForm'" :rowData="detailChildRow" :inputType="'detail_child'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventDetailChild"></nt-form>
    </el-dialog>
    <el-dialog title="删除子分类" :visible.sync="dialogDelChildVisible" :width="del_dialog" :append-to-body="true">
      <el-form v-if="dialogDelChildVisible" ref="form" label-width="80px" size="small" :label-position="'left'">
        <div>
          <div style="padding: 30px 0;font-weight: bold;">{{removeRow.message}}</div>
        </div>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button type="info" size="small" icon="el-icon-close" @click="onListEventReomveChild('cancel', removeRow)">取消</el-button>
            <el-button type="primary" size="small" icon="el-icon-check" @click="onListEventReomveChild('ok', removeRow)">确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, custFormBtnList } from '@/utils/tools'
import { $addQACatalogs, $editQACatalogs, $qaCatalogsDelete, $childQACatalogsList } from '@/service/message'
import { mapGetters } from 'vuex'

export default {
  name: 'order',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'message/qa_catalogs/add',
          method: 'post'
        },
        edit: {
          url: 'message/qa_catalogs/update',
          method: 'post'
        },
        del: {
          url: 'message/qa_catalogs/delete',
          method: 'post',
          title: ['删除问题分类', '删除子分类'],
          name: 'name',
          props: {
            id: 'id',
            parentId: 'parentId'
          }
        },
        list: {
          url: 'message/qa_catalogs/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        children: {
          url: 'message/qa_catalogs/list',
          method: 'post',
          props: {
            parentId: 'id'
          },
          parse: {
            tableData: ['data']
          }
        },
        name: '问题分类'
      },
      composeParam: ['id', 'parentId'],
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '新建分类' }],
      addChildRow: {},
      childrenTitle: '新增子分类',
      dialogAddChildVisible: false,
      detailChildRow: {},
      dialogDetailChildVisible: false,
      reloadChildStatus: true,
      removeRow: {},
      dialogDelChildVisible: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'customer_type_mode_list',
      page_status: 'customer_type_page_status',
      page_column: 'customer_type_column',
      select_list: 'customer_type_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'detail_child') {
        this.detailChildRow = row
        this.detailChildRow._btn = custFormBtnList(1)
        this.dialogDetailChildVisible = true
      } else if (type === 'add_child' || type === 'edit_child') {
        this.addChildRow = type === 'add_child' ? { parentId: row.id } : row
        this.childrenTitle = type === 'add_child' ? '新增子分类' : '编辑子分类'
        this.addChildRow._btn = custFormBtnList()
        this.dialogAddChildVisible = true
      } else if (type === 'del_child') {
        this.removeRow = row
        this.removeRow.message = `确定删除【${row.name}】记录。`
        this.dialogDelChildVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { parentId: 0 } })
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onListEventReomveChild(btn, row) {
      if (btn == 'ok') {
        const params = {
          id: row.id,
          parentId: row.parentId
        }

        $qaCatalogsDelete(params).then(response => {
          this.$message.success(response.message)

          this.reloadChildList(row.parentId)
        })
      }
      this.dialogDelChildVisible = false
    },
    onListEventAddChild(btn, row) {
      if (btn.type == 'ok') {
        this.$refs.addChild.$refs.addChildForm.validate((valid) => {
          if (valid) {
            const params = {
              name: row.name,
              status: row.status,
              parentId: row.parentId,
              sortOrder: row.sortOrder
            }

            if (this.currType == 'edit_child') {
              params.id = row.id
              $editQACatalogs(params).then((res) => {
                this.$message.success(res.message)

                this.reloadChildList(row.parentId)
              })
            } else {
              $addQACatalogs(params).then((res) => {
                this.$message.success(res.message)

                this.reloadChildList(row.parentId)
              })
            }
            this.dialogAddChildVisible = false
          }
        })
      } else {
        this.dialogAddChildVisible = false
      }
    },
    reloadChildList(parentId) {
      this.$nextTick(() => {
        const params = { parentId: parentId }
        this.$set(this.$refs.tables.$children[2].$refs.multipleTable.store.states.lazyTreeNodeMap, parentId, [])

        $childQACatalogsList(params).then(response => {
          const list = response.data

          this.$refs.tables.reRenderChildrenNodeAfterAdd(parentId, list)
        })
      })
    },
    onListEventDetailChild() {
      this.dialogDetailChildVisible = false
    }
  }
}
</script>
