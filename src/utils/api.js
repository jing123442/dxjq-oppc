/* eslint-disable */
import request from './http';
import Axios from 'axios'

import  {
    getDefaultHeader
  } from "@/utils/auth.js"

/* API接口 */
/**
 * vhttp(url,params,httpType,method)
 * @url APIurl的地址。
 * @params 请求的参数。
 * @httpType 请求的类型 GET POST。
 * @method 请求方法 ajax（jsonp) 或者 axios 默认axios。
 * @return Promise;
 * 规范 ： 命名前缀需要 type_*  getBaidu  postBaidu。接口地址需要添加注释.
 */

/**
 *  vhttp(piurl = '', params = {} ,  type = 'GET', apicode = "" 接口编号, isSendRsa = false, 发送数据是否加密， isUcode = false 是否使用ucode, contentType = "application/json;charset=utf-8" 请求头类型);
 */

// *******************************************加气站企业管理****************************************************//
// 加气站企业列表
export const request_user_org_list = params => request("/user/org/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_user_org_add = params => request("/user/org/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_gasstation_add = params => request("/gasstation/gasstation/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_user_org_edit = params => request("/user/org/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_org_account_add = params => request("/account/org_account/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 加气站
export const request_gasstation_list_for_org = params => request("/gasstation/gasstation/list_for_org", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_cashier_add = params => request("/gasstation/cashier/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_gasstation_find = params => request("/gasstation/gasstation/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_gasstation_edit = params => request("/gasstation/gasstation/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const bash_modify_default_binding = params => request("/gasstation/gasstation/bash_modify_default_binding", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_gasstation_account_add = params => request("/account/gasstation_account/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 收银员
export const request_cashier_list = params => request("/gasstation/cashier/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_cashier_find = params => request("/gasstation/cashier/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_cashier_edit = params => request("/gasstation/cashier/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const request_cashier_info = params => request("/gasstation/cashier/info", params, "POST", 80009, true, false, "application/json;charset=utf-8");




// 服务费设置
export const request_gasstation_set_service_set_fees = params => request("/gasstation/gasstation/set_fees", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_service_fee_log_list = params => request("/gasstation/service_fee_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 服务费列表
export const request_gas_order_list = params => request("/business/gas_order/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_gas_order_find = params => request("/business/gas_order/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_gas_order_list_withtime = params => request("/business/gas_order/list_withtime", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const gasstation_set_list_price = params => request("/gasstation/gasstation/set_list_price", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const request_list_price_log_list = params => request("/gasstation/list_price_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");


// *******************************************物流公司管理****************************************************//
export const carrier_truck_add = params => request("/carrier/truck/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const carrier_driver_add = params => request("/carrier/driver/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const carrier_truck_list = params => request("/carrier/truck/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

//物流公司列表
// export const user_org_list = params => request("/user/org/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

//添加公司
// export const user_org_add = params => request("/user/org/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");


// 充值
export const recharge_order_add = params => request("/business/recharge_order/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 获取卡车信息
export const get_truck_info = params => request("/carrier/truck/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
//充值记录
export const business_recharge_order_list = params => request("/business/recharge_order/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 获取司机列表
export const get_carrier_driver_list = params => request("/carrier/driver/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const carrier_driver_edit = params => request("/carrier/driver/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const carrier_truck_driver_add = params => request("/carrier/truck_driver/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const carrier_truck_driver_list_all = params => request("/carrier/driver/list_all", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const carrier_truck_edit = params => request("/carrier/truck/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const truck_account_add = params => request("/account/truck_account/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const business_recharge_order_audit = params => request("/business/recharge_order/audit", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const business_transfer_order_list = params => request("/business/transfer_order/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const gas_order_list = params => request("/business/gas_order/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");



export const user_user_list = params => request("/user/user/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const user_user_add = params => request("/user/user/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const user_user_edit = params => request("/user/user/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const user_user_reset_password = params => request("/user/user/reset_password", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const business_transfer_order_show = params => request("/business/transfer_order/show", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const business_transfer_order_add = params => request("/business/transfer_order/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");



export const user_user_find = params => request("/user/user/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const user_user_edit_password = params => request("/user/user/edit_password", params, "POST", 80009, true, false, "application/json;charset=utf-8");


// ********************************************************************************************** //
// 登录接口
export const loginOauth = params => request("/user/oauth/token", params, "POST", 80009, true, false, "application/x-www-form-urlencoded");
// 司机
// 卡车账户账单列表
// 获取待支付订单
export const request_find_nopayfordriver = params => request("/business/gas_order/find_nopayfordriver", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 获取二维码
export const get_qrcode = params => request("/carrier/driver/get_qrcode/" + params.truckId, {}, "POST", 80009, true, false, "application/json;charset=utf-8");
// 获取司机信息
export const get_driver_info = params => request("/carrier/driver/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 获取车牌号
export const get_car_number = params => request("/carrier/truck/get_car_number", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 获取周边加气站
export const get_gasstation_list = params => request("/gasstation/gasstation/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 获取城市列表
export const get_city_list = params => request("/gasstation/city_list/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 确认支付
export const payGasOrder = params => request("business/gas_order/pay", params, "POST", 80009, true, false, "application/json;charset=utf-8");


// 创建订单
export const gas_order = params => request("/business/gas_order/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 待支付详情收银员
export const find_nopayforcashier = params => request("business/gas_order/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");
//取消支付
export const cancel_forcashier = params => request("/business/gas_order/cancel_forcashier", params, "POST", 80009, true, false, "application/json;charset=utf-8");
//挂牌价
// export const gasstation_set_list_price = params => request("/gasstation/gasstation/set_list_price", params, "POST", 80009, true, false, "application/json;charset=utf-8");
//收银员信息
export const cashier_info = params => request("/gasstation/cashier/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const get_current_gasstation = params => request("/gasstation/gasstation/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const get_user_find = params => request("/user/user/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");



// 2020 0324

export const gasstation_gasstation_cashier_list = params => request("/gasstation/gasstation_cashier/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const gasstation_gasstation_cashier_list_all = params => request("/gasstation/gasstation_cashier/list_all", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const gasstation_gasstation_cashier_list_default = params => request("/gasstation/gasstation_cashier/list_default", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const gasstation_gasstation_cashier_add = params => request("/gasstation/gasstation_cashier/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const gasstation_gasstation_cashier_del = params => request("/gasstation/gasstation_cashier/del", params, "POST", 80009, true, false, "application/json;charset=utf-8");




// 结算模块
// 物流公司结算单
export const settle_account_month_carrier_settle = params => request("/settle/account_month/carrier_settle", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 物流公司结算单-公司本期充值列表
export const settle_account_month_carrier_settle_orgaccountlist = params => request("/settle/account_month/carrier_settle_orgaccountlist", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 物流公司结算单-卡车本期加气列表
export const settle_account_month_carrier_settle_truckaccountlist= params => request("/settle/account_month/carrier_settle_truckaccountlist", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 卡车结算单
export const settle_account_month_truck_settle= params => request("/settle/account_month/truck_settle", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 加气企业结算单
export const settle_account_month_gasstation_enterprise_settle= params => request("/settle/account_month/gasstation_enterprise_settle", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 加气站结算单
export const settle_account_month_gasstation_settle= params => request("/settle/account_month/gasstation_settle", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 加气站结算单列表
export const settle_account_month_gasstation_settle_list= params => request("/settle/account_month/gasstation_settle_list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 资金归集
export const transfer_order_collect= params => request("/business/transfer_order/collect", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const carrier_truck_driver_del = params => request("/carrier/truck_driver/del", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const request_gasstation_list_price_log = params => request("/gasstation/list_price_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const account_org_account_list = params => request("/account/org_account/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const account_truck_account_list = params => request("/account/truck_account/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const account_gasstation_account_list = params => request("/account/gasstation_account/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const account_org_account_log_list = params => request("/account/org_account_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const account_gasstation_account_log_list = params => request("/account/gasstation_account_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const account_truck_account_log_list = params => request("/account/truck_account_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");



//20200422
export const settle_gas_order_sum_fee = params => request("/settle/gas_order/sum_fee", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 卡车汇总
export const settle_gas_order_sum_truck = params => request("/settle/gas_order/sum_truck", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 物流公司充值对账单
export const settle_recharge_order_list_withtime= params => request("/settle/recharge_order/list_withtime", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 物流公司加气汇总
export const settle_gas_order_sum_cost= params => request("/settle/gas_order/sum_cost", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 物流公司卡车加气对账
export const settle_gas_order_list_withtime= params => request("/settle/gas_order/list_withtime", params, "POST", 80009, true, false, "application/json;charset=utf-8");





//20200427

export const strategy_platform_price_list= params => request("/strategy/platform_price/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const strategy_platform_price_find= params => request("/strategy/platform_price/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const strategy_platform_price_edit= params => request("/strategy/platform_price/edit", params, "POST", 80009, true, false, "application/json;charset=utf-8");

export const strategy_platform_price_log_list= params => request("/strategy/platform_price_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");



// 20200509
export const gasstation_gasstation_set_cashierid= params => request("/gasstation/gasstation/set_cashierid", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 20200511
export const account_org_account_edit_auto_account= params => request("/account/org_account/edit_auto_account", params, "POST", 80009, true, false, "application/json;charset=utf-8");


export const user_org_find= params => request("/user/org/find", params, "POST", 80009, true, false, "application/json;charset=utf-8");


// 20200523

export const uploadFile = params => request("/message/upload/file", params, "POST", 80009, true, false, "multipart/form-data");


export const downExcelFile = params => request("/settle/excel/download", params, "GET", 80009, true, false, "application/json;charset=utf-8");

export function downExcelFileMethod(params) {
    Axios({
        method: 'post',
        url: "/settle/excel/download",
        data: params,
        responseType: 'blob',
        headers:getDefaultHeader()
      })
      .then(res => {
          console.log("----", res)
        const content = res.data
        const blob = new Blob([content])
        var fileName = Date.parse(new Date()) + '.xlsx'
        if (params.fileName != "") {
            fileName = params.fileName + Date.parse(new Date())  + '.xlsx'
        }
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
}


// 2020611 策略管理页面接口
// 物流公司列表
export const strategy_carrier_list= params => request("/strategy/carrier/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 加气站列表
export const strategy_gasstation_list= params => request("/strategy/gasstation/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 某物流公司的加气站气价列表
export const strategy_carrier_gasstation_price_gasstation_list= params => request("/strategy/carrier_gasstation_price/gasstation_list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 某加气站的物流公司气价列表
export const strategy_carrier_gasstation_price_org_list= params => request("/strategy/carrier_gasstation_price/org_list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 新增物流公司加气站气价
export const strategy_carrier_gasstation_price_add= params => request("/strategy/carrier_gasstation_price/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 修改物流公司加气站气价
export const strategy_carrier_gasstation_price_edit_price= params => request("/strategy/carrier_gasstation_price/edit_price", params, "POST", 80009, true, false, "application/json;charset=utf-8");
// 物流公司加气站气价维护日志列表
export const strategy_carrier_gasstation_price_log_list= params => request("/strategy/carrier_gasstation_price_log/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");

// 打印机
export const printer_list= params => request("/websocket/printer/list", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const printer_add= params => request("/websocket/printer/add", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const printer_edit= params => request("/websocket/printer/update", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const printer_delete= params => request("/websocket/printer/del", params, "POST", 80009, true, false, "application/json;charset=utf-8");
export const printer_status= params => request("/websocket/printer/status", params, "POST", 80009, true, false, "application/json;charset=utf-8");








