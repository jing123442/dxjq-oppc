import { utilsSealStatus, utilsCooperationApplyDetail } from '@/utils/select'
import file from "../../modules/file";
/* eslint-disable */
const columns = {
  contractValid: [
    { field: 'contractId', name: '合同编号', hide: true},
    { field: 'type', name: '合同类型', formatter: 'contractType', search: { type: 'select', obj: 'contractType', placeholder: '合同类型' } },
    { field: 'code', name: '合同编号' },
    { field: 'status', name: '合同状态', formatter: 'contractStatus', search: { type: 'select', obj: 'contractStatus', placeholder: '合同状态' } },
    { field: 'partyaName', name: '甲方公司名称', search: { type: 'text', placeholder: '请输入甲方公司名称' } },
    { field: 'partyaCompleteDate',  formatFun: 'formateTData all', stype: 'format', name: '甲方签约合同日期' },
    { field: 'partybName', name: '乙方公司名称', search: { type: 'text', placeholder: '请输入乙方公司名称' } },
    { field: 'partybCompleteDate',  formatFun: 'formateTData all',  stype: 'format', name: '乙方签约合同日期' },
    { field: 'partybContactName', name: '业务负责人', search: { type: 'text', placeholder: '请输入业务负责人' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 220, list: params => {
        const optsList = [{ type: 'details', name: '查看'}]
        if (params.row.status === 2) {
          optsList.push({type: 'confirm', name: '确认签约'}, {type: 'recall', name: '撤回'})
        } else if (params.row.status === 5) {
          optsList.push({type: 'download', name: '下载'})
        }
        return optsList
      } }
  ],
  contractSign: [
    { field: 'contractId', name: '合同编号', hide: true},
    { field: 'code', name: '合同编号', fixed: 'left' },
    { field: 'type', name: '合同类型', formatter: 'contractType', search: { type: 'select', obj: 'contractType', placeholder: '合同类型' } },
    { field: 'status', name: '合同状态', formatter: 'contractStatus', search: { type: 'select', obj: 'contractStatus', placeholder: '合同状态' } },
    { field: 'partyaName', name: '甲方公司名称', search: { type: 'text', placeholder: '请输入甲方公司名称' } },
    { field: 'partyaCompleteDate',  formatFun: 'formateTData all',  stype: 'format', name: '甲方签约合同日期' },
    { field: 'partybName', name: '乙方公司名称', search: { type: 'text', placeholder: '请输入乙方公司名称' } },
    { field: 'partybCompleteDate',  formatFun: 'formateTData all', stype: 'format', name: '乙方签约合同日期' },
    { field: 'partybContactName', name: '业务负责人',width: 100, search: { type: 'text', placeholder: '请输入业务负责人' } },
    { field: 'cooperationApplyDetail', name: '业务合作申请', align: 'center', width: 100, stype: 'link-status', value: [0], obj: utilsCooperationApplyDetail() },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 180, list: params => {
        const optsList = [{ type: 'details', name: '查看'}]
        if (params.row.status === 5) {
          optsList.push({type: 'download', name: '下载'})
        } else if (params.row.status === 3 || params.row.status === 4) {
          optsList.push({type: 'sign', name: '去签约'})
        }
          return optsList
      } }
  ],
  contractTemplate: [
    { field: 'type', name: '模板类型', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, fixed: 'left', formatter: 'contractType', show: { type: 'select', obj: 'contractType', placeholder: '请选择模板类型' }, rules: [{ required: true, message: '请选择模板类型', trigger: 'blur' }] },
    { field: 'outerTemplateId', name: '模板编号'},
    { field: 'partyaType', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, name: '甲方客户类型', width: 200, formatter: 'partyaType', show: { type: 'select', obj: 'partyaType', placeholder: '请选择甲方客户类型', isDisabled: true }, rules: [{ required: true, message: '请选择甲方客户类型', trigger: 'blur' }] },
    { field: 'orgId', name: '乙方签署企业', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, hide: true, show: { type: 'select', subField: 'partybOrgName', obj: 'plateformOrgList', placeholder: '请选择乙方签署企业' }, rules: [{ required: true, message: '请选择乙方签署企业', trigger: 'blur' }]},
    { field: 'partybOrgName', name: '乙方签署企业' },
    { field: 'managerName', name: '乙方企业负责人', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, hide: true,  show: { type: 'text', isDisabled: true, placeholder: '暂无乙方企业负责人' }, rules: [{ required: true, message: '暂无乙方企业负责人,请去印章管理设置', trigger: 'blur' }] },
    { field: 'signerName', name: '乙方执行签署人', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, show: { type: 'text', placeholder: '暂无乙方执行签署人', isDisabled: true }, rules: [{ required: true, message: '暂无乙方执行签署人,请去印章管理设置', trigger: 'blur' }] },
    { field: 'url', name: '上传模板', filefield: 'file', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, hide: true, show: { type: 'file', iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl1, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'text', accept: '.pdf', style: 'width: 90%;', placeholder: '请上传模板文件(仅支持PDF格式文件)', node: [], rules: [{ required: true, message: '请上传模板文件', trigger: 'change' }] } },
    { field: 'status', name: '模板状态', formatter: 'status' },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      width: 250,
      fixed: 'right',
      list: params => {
        var optsList = []
        if (params.row.status === 0) {
          optsList = [{ type: 'limit', name: '设置' }, { type: 'updateStatus', name: '停用'}, { type: 'limit', name: '删除' }]
        } else if (params.row.status === 1) {
          optsList = [{ type: 'setting', name: '设置' }, { type: 'updateStatus', name: '启用'}, { type: 'del', name: '删除' }]
        }
        return optsList
      }
    }
  ],
  orgSealList: [
    { field: 'orgId', name: '', stype: 'checkbox', align: 'center', fixed: 'left', width: 50, hide: true },
    { field: 'orgName', name: '企业名称', width: 250, fixed: 'left', stype: 'link'},
    { field: 'orgManager', name: '企业负责人', width: 150, stype: 'link' },
    { field: 'orgSealStatus', name: '企业印章', width: 150, stype: 'link-status', value: [0 , 1], obj: utilsSealStatus() },
    { field: 'orgManagerSealStatus', name: '企业负责人印章', width: 150, stype: 'link-status', value: [0 , 1], obj: utilsSealStatus() },
    { field: 'orgOpeator', name: '执行签署人', width: 150 },
    {
      field: 'useropts',
      stype: 'opt',
      ispush: false,
      name: '操作',
      fixed: 'right',
      list: params => {
        const optsList = [{ type: 'orgManagerSet', name: '企业负责人管理'}, { type: 'orgOpeatorSet', name: '执行签署人管理'}]
        if (params.row.orgSealStatus === 2) {
          optsList.unshift({type: 'orgSealApply', name: '企业印章申请'})
        }
        return optsList
      }
    }
  ],
  orgSealApply: [
    { field: 'orgName', nameSpan: 8, name: '企业名称', show: { type: 'text', placeholder: '请输入企业名称', isDisabled: true}, rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }] },
    { field: 'taxpayer', nameSpan: 8, name: '社会统一信用代码', show: { type: 'text', placeholder: '请输入社会统一信用代码', isDisabled: true}, rules: [{ required: true, message: '请输入社会统一信用代码', trigger: 'blur' }] },
    { field: 'lastQuarter', nameSpan: 8, name: '印章下弦文', show: { type: 'text', placeholder: '请输入印章下弦文'}},
    { field: 'applierName', nameSpan: 8, name: '申请人姓名', show: { type: 'text', placeholder: '请输入申请人姓名', isDisabled: true }, rules: [{ required: true, message: '请输入申请人姓名', trigger: 'blur' }] },
    { field: 'applierIdCard', nameSpan: 8, name: '申请人身份证', show: { type: 'text', placeholder: '请去平台用户列表维护身份证号', isDisabled: true }, rules: [{ required: true, message: '请去平台用户列表维护身份证号', trigger: 'blur' }] },
  ],
  orgManagerSet: [
    { field: 'idCardNo', name: '企业负责人', nameSpan: 8, stype: 'mapping', mapping: 'userName', show: { type: 'select', obj: 'userList', subField: 'userName', findKey: 'keyword', remote: true, placeholder: '请选择企业负责人' } },
    { field: 'idCardNo', name: '身份证号', nameSpan: 8, show: { type: 'text', placeholder: '企业负责人身份证号', isDisabled: true }},
  ],
  orgOpeatorSet: [
    { field: 'idCardNo', name: '执行签署人', nameSpan: 8, stype: 'mapping', mapping: 'userName', show: { type: 'select', obj: 'userList', subField: 'userName', findKey: 'keyword', remote: true, placeholder: '请选择执行签署人' } },
    { field: 'idCardNo', name: '身份证号', nameSpan: 8, show: { type: 'text', placeholder: '执行签署人身份证号', isDisabled: true }}
  ],
  cooperationApplyDetail: [
    { field: 'url', name: '合作申请审批流程', filefield: 'file', nameSpan: 8, xs: 20, sm: 20, md: 20, lg: 20, xl: 20, hide: true, show: { type: 'file', iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl1, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'text', accept: '.pdf', style: 'width: 90%;', placeholder: '请上传合作申请审批流程(仅支持PDF格式文件)', node: [], rules: [{ required: true, message: '请上传合作申请审批流程(仅支持PDF格式文件)', trigger: 'change' }] } }
  ]
}

export default columns
