import { formatDate, formateTData as formateTSData } from '@/utils/tools'
import { utilsContractStatus } from '@/utils/select'

// 如果要使用filters，该函数必须有
const vueFiltersInit = (value, item, scope) => {
  if (!item.formatFun) return '暂不支持格式化数据'

  const formatRules = item.formatFun

  // eslint-disable-next-line no-undef
  if (typeof formatRules === 'string') {
    const formats = formatRules.split(' ')

    const params = formats.filter((item, index) => index > 0)
    // eslint-disable-next-line no-eval
    return eval('(' + formats[0] + ')')(value, ...params, scope.row)
  } else {
    // eslint-disable-next-line no-eval
    return eval('(' + formatRules(value, scope.row) + ')')
  }
}

const gasstationImage = item => {
  return item
}

const formatGwayPrice = value => {
  return (Number(value) / 1000).toFixed(3)
}

const tableStatusToLabel = value => {
  if (value) return '已签约'
  else return '未签约'
}

const tableContractStatusToLabel = value => {
  if (value === 2) return '<a>已签约</a>'
  return utilsContractStatus[value]
}

// 单位转换 * 1000
const kiloToTon = (value) => { return value ? Number(value) * 1000 : (value === 0 ? 0 : '') }

// value为空，显示其他字段内容
const formatContent = (value, field, row) => {
  if (value) {
    return value
  } else {
    return row[field]
  }
}

// 格式化卡车对应多个司机
const truckToDriverList = (value) => {
  const result = []

  value.forEach(item => {
    result.push(item.driverName)
  })

  return result.join(' | ')
}

const roleList = (value) => {
  const result = []
  value.forEach(item => {
    result.push(item.title)
  })
  return result.join(' | ')
}

const formateTData = (date, fmt) => {
  return formateTSData(date, fmt)
}

const formateTextDeleteNULL = (value) => {
  return value ? (value === 'null' ? '-' : value) : '-'
}

const formateMoney = (value) => {
  return currency(value, '', '')
}

const currency = (value, unit, currency, decimals) => {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float +
    (unit ? ' ' + unit : '')
}
const formatCardNumber = cardNumber => {
  if (cardNumber && cardNumber.length > 8) {
    const middleStars = '*'.repeat(cardNumber.substring(4, cardNumber.length - 4).length)
    const fourStarArray = middleStars.match(/.{4}/g) || []
    fourStarArray.push('*'.repeat(middleStars.length % 4))
    return `${cardNumber.substring(0, 4)} ${fourStarArray.join(' ')} ${cardNumber.substring(cardNumber.length - 4, cardNumber.length)}`
  }
  return cardNumber
}

export {
  vueFiltersInit,
  gasstationImage,
  formateTData,
  formatDate,
  currency,
  kiloToTon,
  formatGwayPrice,
  formatContent,
  tableStatusToLabel,
  formatCardNumber,
  truckToDriverList,
  roleList,
  formateMoney,
  formateTextDeleteNULL,
  tableContractStatusToLabel
}
