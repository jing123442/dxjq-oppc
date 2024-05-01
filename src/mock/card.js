const UTIL_MONEY = '元'
const UTIL_KILO = '吨'

const amountTotal = [{
  class: '',
  style: '',
  list: [
    { type: 1, key: null, value: require('@/assets/images/cockpit/icon-amount.png'), style: '', class: 'card-images' }
  ]
}, {
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `交易金额(${UTIL_MONEY})`, style: '', class: 'title__size font-weight__bold' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo font-weight__bold' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const rechargeTotal = [{
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `充值金额(${UTIL_MONEY})`, style: '', class: 'title__size' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const balnaceTotal = [{
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `账户余额(${UTIL_MONEY})`, style: '', class: 'title__size' },
    { type: 9, key: 'total', value: '0', style: 'color: #FF9845;', class: 'big__size font-family__fbo' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const gasQtyTotal = [{
  class: '',
  style: '',
  list: [
    { type: 1, key: null, value: require('@/assets/images/cockpit/icon-gas.png'), style: '', class: 'card-images' }
  ]
}, {
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `加气量(${UTIL_KILO})`, style: '', class: 'title__size font-weight__bold' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo font-weight__bold' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const storeTotal = [{
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `进气量(${UTIL_KILO})`, style: '', class: 'title__size' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const stockTotal = [{
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `站端库存(${UTIL_KILO})`, style: '', class: 'title__size' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const wayTotal = [{
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: `在途库存(${UTIL_KILO})`, style: '', class: 'title__size' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const liveTruckTotal = [{
  class: '',
  style: '',
  list: [
    { type: 1, key: null, value: require('@/assets/images/cockpit/icon-truck.png'), style: '', class: 'card-images' }
  ]
}, {
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: '活跃车辆数', style: '', class: 'title__size font-weight__bold' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo font-weight__bold' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const addTruckTotal = [{
  class: 'text__color',
  style: '',
  list: [
    { type: 9, key: null, value: '新增车辆数', style: '', class: 'title__size' },
    { type: 9, key: 'total', value: '0', style: '', class: 'big__size font-family__fbo' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const orderTotal = [{
  class: 'text__color order__info',
  style: '',
  list: [
    { type: 9, key: null, value: '总订单', style: '', class: 'title__size history-info__text-8' },
    { type: 5, key: 'total', icon: require('@/assets/images/cockpit/icon-order-total.png'), value: '0', style: '', class: 'text__size font-family__fb' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const nopayOrderTotal = [{
  class: 'text__color order__info',
  style: '',
  list: [
    { type: 9, key: null, value: '待支付', style: '', class: 'title__size history-info__text-8' },
    { type: 5, key: 'total', icon: require('@/assets/images/cockpit/icon-order-unpaid.png'), value: '0', style: 'color: #FF9845;', class: 'text__size font-family__fb' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: '0', sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const successOrderTotal = [{
  class: 'text__color order__info',
  style: '',
  list: [
    { type: 9, key: null, value: '已支付', style: '', class: 'title__size history-info__text-8' },
    { type: 5, key: 'total', icon: require('@/assets/images/cockpit/icon-order-paid.png'), value: '0', style: '', class: 'text__size font-family__fb' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: 0, sign: '%', style: '', class: 'small__size rate' }
  ]
}]

const cancelOrderTotal = [{
  class: 'text__color order__info',
  style: '',
  list: [
    { type: 9, key: null, value: '已取消', style: '', class: 'title__size history-info__text-8' },
    { type: 5, key: 'total', icon: require('@/assets/images/cockpit/icon-order-cancel.png'), value: '0', style: '', class: 'text__size font-family__fb' },
    { type: 3, key: 'contrast', curr: '前一日 ', value: 0, style: '', class: 'small__size history-info__text' },
    { type: 4, key: 'rate', isNotShow: true, value: 0, sign: '%', style: '', class: 'small__size rate' }
  ]
}]

export {
  amountTotal,
  rechargeTotal,
  balnaceTotal,
  gasQtyTotal,
  storeTotal,
  stockTotal,
  wayTotal,
  liveTruckTotal,
  addTruckTotal,
  orderTotal,
  nopayOrderTotal,
  successOrderTotal,
  cancelOrderTotal
}
