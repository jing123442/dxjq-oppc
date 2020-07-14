import { formatDate } from '@/utils/tools'

const gasstationImage = item => {
  return item
}

const formateTData = (date, fmt) => {
  if (date) {
    const sign = date.indexOf('T') >= 0 ? 'T' : ' '
    const times = date.split(sign)
    const time = times[1] && times[1].split(':')

    if (fmt == 'date') {
      return times[0]
    }
    return times[0] + ' ' + (time[0] || '00') + ':' + (time[1] || '00') + (fmt == 'all' ? (':' + (time[1] || '00')) : '')
  }

  return ''
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

export {
  gasstationImage,
  formateTData,
  formatDate,
  currency
}
