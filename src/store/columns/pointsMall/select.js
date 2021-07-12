import { utilsGoodsType, utilsSupplierList, utilsCategoryList } from '@/utils/select'
const select = {
  pointsConfig: {
    pointsValidate: [{ value: '0', label: '年底清空' }]
  },
  ruleList: {
    rewardType: [{ value: '21', label: '邀请好友' }, { value: '20', label: '新客注册' }],
    ruleStatus: [{ value: '0', label: '启用' }, { value: '1', label: '停用' }]
  },
  supplier: {
    taxStatus: [{ value: '0', label: '含税' }, { value: '1', label: '不含税' }],
    supplierStatus: [{ value: 0, label: '启用' }, { value: 1, label: '停用' }]
  },
  order: {
    goodsType: utilsGoodsType(),
    orderStatus: [{ value: 0, label: '待发货' }, { value: 1, label: '待收货' }, { value: 2, label: '交易完成' }, { value: 3, label: '交易失败' }]
  },
  orderDetail: {
    channel: [{ value: 0, label: '积分商城' }, { value: 1, label: '积分游戏' }],
    goodsType: utilsGoodsType(),
    orderStatus: [{ value: 0, label: '待发货' }, { value: 1, label: '待收货' }, { value: 2, label: '交易完成' }, { value: 3, label: '交易失败' }]
  },
  category: {
    goodsType: [{ value: 0, label: '实体商品' }, { value: 1, label: '虚拟商品' }],
    categoryStatus: [{ value: 0, label: '启用' }, { value: 1, label: '停用' }]
  },
  goods: {
    goodsType: [{ value: 0, label: '实体商品' }, { value: 1, label: '虚拟商品' }],
    goodsStatus: [{ value: '0', label: '上架' }, { value: '1', label: '下架' }],
    imageStatus: [{ value: '0', label: '已上传' }, { value: '1', label: '未上传' }],
    supplierList: utilsSupplierList(),
    categoryList: utilsCategoryList(),
    specification: [{ value: '优惠券', label: '优惠券' }, { value: '充值', label: '充值' }]
  },
  pointsAccount: {
    pointsAccoutStatus: [{ value: 0, label: '启用' }, { value: 1, label: '停用' }],
    accountType: [{ value: 0, label: '现金账户' }, { value: 1, label: '积分账户' }]
  },
  pointsAccountLog: {
    accountLogType: [{ value: 20, label: '新客注册' }, { value: 21, label: '邀请好友' }, { value: 22, label: '积分调整' }, { value: 23, label: '系统冲正' }, { value: 24, label: '积分商城' }]
  },
  pointChange: {
    changeType: [{ value: 0, label: '增加' }, { value: 1, label: '减少' }]
  }
}

export default select
