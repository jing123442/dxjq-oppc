import R from '@/utils/request'

export async function $resetPassword (data) {
  return await R({ url: 'user/user/reset_password', data })
}

export async function $editPassword (data) {
  return await R({ url: 'user/user/edit_password', data })
}

export async function $userFind (data) {
  return await R({ url: '/user/user/find', data })
}

export async function $userOrgAdd (data) {
  return await R({ url: 'user/org/add', data })
}

export async function $userOrgEdit (data) {
  return await R({ url: 'user/org/edit', data })
}

export async function $userEdit (data) {
  return await R({ url: '/user/user/edit', data })
}
export async function $userRoleList (data) {
  return await R({ url: '/user/role/list', data })
}

export async function $userUserList (data) {
  return await R({ url: 'user/user/list', data })
}
export async function $userOrgFind (data) {
  return await R({ url: 'user/org/find', data })
}

export async function $importCarrierDownloadFile (data) {
  return await R({ url: 'user/import/download_user_tpl', method: 'get', params: data, responseType: 'blob' })
}

export async function $exportCarrierUserFile (data) {
  return await R({ url: 'user/import/import_user', method: 'POST', data: data.file })
}

export async function $userOrgList (data) {
  return await R({ url: 'user/org/list', method: 'POST', data })
}

export async function $userOrgPicList (data) {
  return await R({ url: 'user/org_pic/find_org_pic_list', method: 'POST', data })
}

export async function $userOrgAddPic (data) {
  return await R({ url: 'user/org_pic/add', method: 'POST', data })
}

export async function $userOrgDeletePic (data) {
  return await R({ url: 'user/org_pic/delete_org_pic', method: 'POST', data })
}

export async function $userRegisterExport (data) {
  return await R({ url: 'user/register_manage/export', method: 'POST', data, responseType: 'blob' })
}

// 菜单树
export async function $menuTree (data) {
  return await R({ url: 'user/menu/menu_tree', method: 'POST', data })
}

// 菜单树
export async function $menuListTree (data) {
  return await R({ url: 'user/menu/menu_list', method: 'POST', data })
}

// 获取某个角色的菜单树
export async function $menuListCheckTree (data) {
  return await R({ url: 'user/menu/menu_tree_no_check', method: 'POST', data })
}

// 菜单增加
export async function $menuAdd (data) {
  return await R({ url: 'user/menu/add', method: 'POST', data })
}

// 按钮增加
export async function $buttonAdd (data) {
  return await R({ url: 'user/button/add', method: 'POST', data })
}

// 根据菜单获取button列表
export async function $menuToButtonList (data) {
  return await R({ url: 'user/button/button_list', method: 'POST', data })
}

// 根据角色配置权限
export async function $roleToMenuList (data) {
  return await R({ url: 'user/role_menu/add_list', method: 'POST', data })
}

// 根据角色配置权限
export async function $userConfigRole (data) {
  return await R({ url: 'user/user/edit_plat_user', method: 'POST', data })
}

// 获取区域列表
export async function $districtList (data) {
  return await R({ url: 'user/district/list', method: 'POST', data })
}

// 获取加气站列表
export async function $districtGasstationList (data) {
  return await R({ url: 'user/district_gasstation/list', method: 'POST', data })
}

// 区域增加加气站
export async function $districtGasstationAdd (data) {
  return await R({ url: 'user/district_gasstation/add', method: 'POST', data })
}

// 区域删除加气站
export async function $districtGasstationDelete (data) {
  return await R({ url: 'user/district_gasstation/delete', method: 'POST', data })
}

// 注册用户详情
export async function $userFindRegister(data) {
  return await R({ url: 'user/user/find_register', method: 'POST', data })
}

// 获取企业管理员信息
export async function $userFindOrgAdmin(data) {
  return await R({ url: 'user/user/find_org_admin', method: 'POST', data })
}

// 企业信息认证和驳回
export async function $userOrgPicAudit(data) {
  return await R({ url: 'user/org_pic/audit', method: 'POST', data })
}

// 企业状态修改
export async function $userOrgEnterStatus(data) {
  return await R({ url: 'user/org/enter_status_edit', method: 'POST', data })
}

// 查询司机详情信息
export async function $userDriverDetailInfo(data) {
  return await R({ url: 'user/driver/find_detail', method: 'POST', data })
}

// 增加平行加气站
export async function $userAddChildFiller(data) {
  return await R({ url: 'user/org/add_child_filler', method: 'POST', data })
}

// 能增加平行加气站列表
export async function $userParentFillerList(data) {
  return await R({ url: 'user/org/list_parent_filler', method: 'POST', data })
}

// 获取用户基本详情信息
export async function $userFindBaseDetail(data) {
  return await R({ url: 'user/user/find_detail', method: 'POST', data })
}

// 物流公司道路许可证图片上传
export async function $userCarrierTranPicUpload(data) {
  return await R({ url: 'user/org_pic/add_by_system_admin', method: 'POST', data })
}

// 导出物流公司列表
export async function $userExportCarrierInfo(data) {
  return await R({ url: 'user/org/export/carrier', method: 'POST', data, responseType: 'blob' })
}

// 导出加气站列表
export async function $userExportFillerInfo(data) {
  return await R({ url: 'user/org/export/filler', method: 'POST', data, responseType: 'blob' })
}

// 查询所有可配置加气站
export async function $userFindALLFillerList(data) {
  return await R({ url: 'user/district/can/gas', method: 'GET', params: data })
}

// 查询所有已配置加气站
export async function $userFindConfigFillerList(data) {
  return await R({ url: 'user/district/has/gas', method: 'GET', params: data })
}

// 配置加气站
export async function $userConfigFiller(data) {
  return await R({ url: 'user/district/bind/gasstation', method: 'POST', data })
}

// 查询所有可配置区域
export async function $userFindALLAreaList(data) {
  return await R({ url: 'user/district/areaList', method: 'GET', params: data })
}

// 查询所有已配置区域
export async function $userFindConfigAreaList(data) {
  return await R({ url: 'user/district/getAreaList', method: 'GET', params: data })
}

// 配置区域
export async function $userConfigArea(data) {
  return await R({ url: 'user/district/area', method: 'POST', data })
}

// 查询所有已配置账号
export async function $userFindConfigUserList(data) {
  return await R({ url: 'user/district/has/user', method: 'GET', params: data })
}

// 配置账号
export async function $userConfigAuthUser(data) {
  return await R({ url: 'user/district/bind/user', method: 'POST', data })
}

// 查询所有可配置物流客户
export async function $userFindALLCarrierList(data) {
  return await R({ url: 'user/district/can/carrier', method: 'GET', params: data })
}

// 查询所有已配置物流客户
export async function $userFindConfigCarrierList(data) {
  return await R({ url: 'user/district/has/carrier', method: 'GET', params: data })
}

// 配置物流客户
export async function $userConfigCarrier(data) {
  return await R({ url: 'user/district/bind/carrier', method: 'POST', data })
}

// 增加区域
export async function $userAddChildrenDistrict(data) {
  return await R({ url: 'user/district/add', method: 'POST', data })
}

// 获取distruct_log列表
export async function $userDistrictLogList(data) {
  return await R({ url: 'user/user/district_log/list', method: 'POST', data })
}

// 获取子列表
export async function $userDistrictChildList(data) {
  return await R({ url: 'user/district/district/child', method: 'GET', params: data })
}

// 申请印章并保存
export async function $orgSealApply(data) {
  return await R({ url: 'user/org_seal/seal_apply', method: 'POST', data })
}

// 企业印章停用启用
export async function $orgSealEdit(data) {
  return await R({ url: 'user/org_seal/edit_status', method: 'POST', data })
}

// 企业负责人印章停用启用
export async function $userSealEdit(data) {
  return await R({ url: 'user/user_seal/edit_status', method: 'POST', data })
}

// 企业负责人设置
export async function $userManagerSet(data) {
  return await R({ url: 'user/org_signer/manager_set', method: 'POST', data })
}

// 企业执行签署人设置
export async function $userOperatorSet(data) {
  return await R({ url: 'user/org_signer/operator_set', method: 'POST', data })
}

// 根据orgId查询企业负责人执行签署人信息
export async function $orgSealFind(data) {
  return await R({ url: 'user/org_seal/find_detail', method: 'POST', data })
}

// 上传模板
export async function $userContractTemplateAdd(data) {
  return await R({ url: 'user/contract_template/add', method: 'POST', data })
}

// 获取设置url
export async function $userContractTemplateSettingUrl(data) {
  return await R({ url: 'user/contract_template/get_component_setting_url', method: 'POST', data })
}

// 模板状态设置
export async function $userContractTemplateUpdateStatus(data) {
  return await R({ url: 'user/contract_template/update', method: 'POST', data })
}

// 查看合同
export async function $userContractView(data) {
  return await R({ url: 'user/contract/view', method: 'POST', data })
}

// 合同确认
export async function $userContractBatchConfirm(data) {
  return await R({ url: 'user/contract/batch_confirm', method: 'POST', data })
}

// 合同撤回
export async function $userContractCancel(data) {
  return await R({ url: 'user/contract/cancle', method: 'POST', data })
}

// 合同下载
export async function $userContractDownload(data) {
  return await R({ url: 'user/contract/download', method: 'POST', data })
}

// 合同签约
export async function $userContractToSign(data) {
  return await R({ url: 'user/contract/to_sign_by_platform', method: 'POST', data })
}
