/* eslint-disable */
import file from '../../modules/file';

const columns = {
  op: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', hide: true, fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 0 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'select', style: 'width: 90%;', ou: 1, isDisabled: true, obj: 'roleList', placeholder: '请选择账号角色' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号类型' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 120, filters: [{ value: 0, text: '启用' }, { value: 1, text: '停用' }], show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'reset_pwd', name: '重置密码' }] }
  ],
  carrier: [
    { field: 'userId', name: '11', stype: 'checkbox', align: 'center', hide: true, fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 2 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'radio', value: 'driver', ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号角色' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号角色' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'reset_pwd', name: '重置密码' }] }
  ],
  cashier: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', hide: true, width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'lastLoginDate', name: '最后登录时间', ispush: false },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 1 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'radio', value: 'cashier', ou: 1, isDisabled: true, obj: 'baseRole', placeholder: '请选择账号角色' }, search: { type: 'select', obj: 'baseRole', placeholder: '请选择账号角色' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 80, show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 110, list: [{ type: 'edit', name: '编辑' }, { type: 'reset_pwd', name: '重置密码' }] }
  ],
  business: [
    { field: 'orgId', stype: 'mapping', name: '企业名称', nameSpan: 6, mapping: 'orgName', show: { type: 'select', remote: true, findKey: 'orgName', paramKey: 'param', subField: 'orgName', ou: 1, obj: 'orgId', style: 'width: 90%;', placeholder: '请选择企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] }
  ],
  intention: [
    {
      field: 'userId', name: '客户ID', fixed: 'left', nameSpan: 6,
      detail: { type: 'span', placeholder: '客户ID', ou: 0 }
    }, {
      field: 'openId', name: '微信openid', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '微信openid', ou: 0 }
    }, {
      field: 'userName', name: '姓名(昵称)', nameSpan: 6,
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入姓名' },
      detail: { type: 'span', placeholder: '客户姓名', ou: 0 }
    }, {
      field: 'baseRole', name: '类型', nameSpan: 6, hide: true, formatter: 'baseRole',
      detail: { type: 'span', model: 'select', obj: 'baseRole', placeholder: '类型', ou: 0 }
    }, {
      field: 'nickname', name: '微信昵称', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '微信昵称', ou: 0 }
    }, {
      field: 'mobile', name: '手机号', nameSpan: 6,
      detail: { type: 'span', placeholder: '手机号', ou: 0 },
      search: { type: 'text', style: 'width: 200px;', placeholder: '请输入手机号' },
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: 'isValidateMobile', message: '请输入正确格式的手机号', trigger: 'blur' }]
    }, {
      field: 'province', name: '省份', nameSpan: 6, hide: true,
      detail: { type: 'span', ou: 0 }
    }, {
      field: 'city', name: '城市', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '城市', ou: 0 }
    }, {
      field: 'createDate', name: '注册时间', nameSpan: 6, hide: true,
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 0 }
    }, {
      field: 'lastLoginDate', name: '最后登录时间', nameSpan: 6, stype: 'format', formatFun: 'formateTData all',
      detail: { type: 'span', stype: 'format', formatFun: 'formateTData all', ou: 0 }
    }, {
      field: 'status', name: '状态', formatter: 'status', nameSpan: 6, width: 80,
      detail: { type: 'span', model: 'select', obj: 'status', ou: 0 }
    }, {
      field: 'sex', name: '性别', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', obj: 'sex', ou: 0 }
    }, {
      field: 'realname', name: '姓名', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'select', obj: 'sex', ou: 1 }
    }, {
      field: 'idcardNo', name: '身份证号', nameSpan: 6, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', obj: 'sex', ou: 1 }
    }, {
      field: 'authDate', name: '身份认证时间', xs: 24, sm: 24, md: 24, lg: 24, xl: 24, nameSpan: 3, hide: true,
      detail: { type: 'span', placeholder: '性别', model: 'select', style: 'width: 40.7%;', obj: 'sex', ou: 1 }
    }, {
      field: 'idcardFaceUrl', name: '身份证人物面', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img',vague: true, vagueType: 'style', ou: 1, fileHost: file.state.fileHost }
    }, {
      field: 'idcardBackUrl', name: '身份证国徽面', nameSpan: 6, hide: true,
      detail: { type: 'span', model: 'img',vague: true, vagueType: 'style', ou: 1 }
    }, {
      field: 'useropts', stype: 'opt', ispush: false, name: '操作', align: 'center', fixed: 'right',
      list: [{ type: 'detail', size: 'small', icon: '', style: '', name: '详情' }]
    }
  ]
}

export default columns
