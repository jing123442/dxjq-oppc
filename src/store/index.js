import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import file from './modules/file'
import tagsView from './modules/tagsView'

// columns
import mine from './columns/mine/index'
import userList from './columns/user/index'
import business from './columns/business/index'
import filler from './columns/filler/index'
import carrier from './columns/carrier/index'
import price from './columns/price/index'
import market from './columns/market/index'
import settlement from './columns/settlement/index'
import setting from './columns/setting/index'
import message from './columns/message/index'
import order from './columns/order/index'
import customer from './columns/customer/index'
import authority from './columns/authority/index'
import common from './columns/common/index'
import cockpit from './columns/cockpit/index'
import pointsMall from './columns/pointsMall/index'
import voucher from './columns/voucher/index'
import contract from './columns/contract/index'
import equipment from './columns/equipment/index'
import checkup from './columns/checkup/index'

const PAGE_CONFIG = {
  debug: state => state.app.debug,
  woptoken: state => state.user.woptoken,
  wopidntf: state => state.user.wopidntf,
  wopuser: state => state.user.wopuser,
  woprole: state => state.user.woprole,
  woporg: state => state.user.woporg,

  // dialog width
  add_edit_dialog_form: stare => '80%',
  dialog_table: stare => '60%',
  del_dialog_form: stare => '40%',

  // layout
  permission_routers: state => state.user.routers,
  sidebar: state => state.app.sidebar,
  prefix: state => state.app.systemprefix,
  suffix: state => state.app.systemsuffix,

  // list 参数
  query_params: state => state.app.queryParams,
  response_success: state => state.app.responseSuccess,

  subpage_full_screen: state => state.app.subPageFullScreen
}

const getters = Object.assign(PAGE_CONFIG, mine.getters, userList.getters, business.getters, filler.getters, carrier.getters, price.getters, settlement.getters, market.getters, setting.getters, message.getters, order.getters, customer.getters, authority.getters, common.getters, cockpit.getters, pointsMall.getters, voucher.getters, contract.getters, equipment.getters, checkup.getters)

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    user,
    file,
    tagsView,
    mine,
    userList,
    business,
    filler,
    carrier,
    price,
    market,
    settlement,
    setting,
    message,
    order,
    customer,
    authority,
    cockpit,
    pointsMall,
    voucher,
    contract,
    equipment,
    checkup
  },
  getters: getters
})
