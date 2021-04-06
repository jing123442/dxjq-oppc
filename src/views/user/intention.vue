<template>
  <div class="template-main">
    <em-table-list
      ref="tables"
      :tableListName="'intention'"
      :mode_list="mode_list"
      :authButtonList="authButtonList"
      :axios="axios"
      :queryCustURL="queryCustURL"
      :responseSuccess="response_success"
      :queryParam="queryParams"
      :page_column="page_column"
      :buttonsList="buttonsList"
      :select_list="select_list"
      :page_status="page_status"
      @onListEvent="onListEvent"
      @onReqParams="onReqParams"
      @onListFormEvent="onListFormEvent"
    ></em-table-list>
    <el-dialog title="查看清晰图片验证码" :visible.sync="dialogMessageVisible" width="400px" :append-to-body="true">
      <el-form ref="messageRow" v-if="dialogMessageVisible" size="small" :model="messageRow" label-position="left" :rules="messageRule">
        <input-verify-code :data="dataBtn" :row="messageRow"></input-verify-code>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in messageRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem, messageRow)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { isTypeof, initVueDataOptions, callbackPagesInfo } from '@/utils/tools'
import { $verifySendMessage, $checkVerifyCode } from '@/service/message'
import { InputVerifyCode } from '@/components/'
import { mapGetters } from 'vuex'

export default {
  name: 'intention',
  components: { InputVerifyCode },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        detail: {
          url: 'user/user/find_register',
          parse: ['data'],
          key: 'userId',
          value: 'userId',
          concat: ['user', 'userInfo']
        },
        list: {
          url: 'user/user/page_list_register',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '平台用户管理'
      },
      buttonsList: [],
      messageRow: {},
      messageRule: { code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }] },
      dialogMessageVisible: false,
      dataBtn: {
        defaultText: '获取验证码',
        btnText: '获取验证码',
        mobile: 'mobile',
        code: 'code',
        type: 0
      }
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'user_intention_column',
      mode_list: 'user_intention_mode_list',
      page_status: 'user_intention_page_status',
      page_business_column: 'user_business_column',
      select_list: 'user_intention_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg',
      user: 'wopuser'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {},
    btnClickEvent(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.messageRow.validate(valid => {
          if (valid) {
            const params = {
              userId: this.user.user_id,
              verifyCode: row.code,
              mobile: row.mobile
            }

            $checkVerifyCode(params).then(response => {
              const ou = row.currMode.ou
              row.currColumn && row.currColumn.forEach(item => {
                if (item[row.inputType] && (item[row.inputType].ou === ou)) {
                  item[row.inputType].vague = false
                }
              })
              this.dialogMessageVisible = false
            })
          } else {
            return null
          }
        })
      } else {
        this.dialogMessageVisible = false
      }
    },
    onListFormEvent(mode, column, inputType, row) {
      this.messageRow = row
      this.$set(this.messageRow, 'code', '')
      this.messageRow.currMode = mode
      this.messageRow.inputType = inputType
      this.messageRow.currColumn = column
      this.messageRow._btn = this.formBtnList
      this.dialogMessageVisible = true
    },
    onReqParams(type, _this, callback) {
      const query = { param: {} }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') query.param[k] = v
        }
      }

      this.currParams = query.param

      const params = Object.assign({}, callbackPagesInfo(_this), query)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
