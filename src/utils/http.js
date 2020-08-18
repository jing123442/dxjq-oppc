/* eslint-disable */
import Axios from 'axios'
var qs = require('qs');
import router from '@/router'

Axios.defaults.baseURL = "/api"
// Axios.defaults.baseURL = process.env.API_HOST

Axios.defaults.withCredentials = true


Axios.create({
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 20000
});

Axios.interceptors.request.use(function (config) {
  return config
})

Axios.interceptors.response.use(
  response => {
    console.log("response: ", response)
    if (response.status == 200) {
      if (response.data.code == 0) {
        console.log("请求成功")
      }
      if (response.data.code == 2814) {
        window.localStorage.clear();
        router.replace({
          path: '/',
          // query: {
          //   redirect: router.currentRoute.fullPath
          // }
        })
        alert("token过期，请重新登录！");
      }
    } else if (response.status == 404) {}
    return response;
  },
  error => {
    Toast("错误代码：" + JSON.parse(JSON.stringify(error)).response.status + "，请联系管理员！")
    var err = JSON.parse(JSON.stringify(error));
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(err.response.data) // 返回接口返回的错误信息
  });



// export default Axios;
let Base64 = require('js-base64').Base64;

export default async (apiurl = '', params = {}, type = 'GET', apicode = "", isSendRsa = false, isUcode = false, contentType = "application/json;charset=utf-8") => {
  type = type.toUpperCase();
  return new Promise((resolve, reject) => {
    if (contentType !== "application/json;charset=utf-8") {
      params = qs.stringify(params, {
        arrayFormat: 'repeat'
      })
    }
    //请求参数是否加密
    var Authorization = "";
    var identifier = "";
    if (apiurl == "/user/oauth/token") {
      Authorization = "Basic " + Base64.encode("woperation:123456");
      identifier = Base64.encode("woperation:org:user:role")
    } else {
      var access_token = localStorage.getItem("woptoken")
      var user_info = JSON.parse(localStorage.getItem("wopuser"))
      Authorization = "Bearer " + access_token;
      var user_id = user_info.user_id
      var org_id = user_info.authorities[0].orgId;
      var current_roleId = localStorage.getItem("current_roleId")
      identifier = Base64.encode("woperation:" + org_id + ":" + user_id + ":" + current_roleId)
    }
    Axios({
        method: type,
        url: apiurl,
        headers: {
          'Content-Type': contentType,
          'Authorization': Authorization,
          'identifier': identifier
        },
        data: type === 'POST' ? params : '',
        params: type === 'GET' ? params : '',
      })
      .then(res => {
        console.log("请求返回数据： ", res)
        if (res.status == 200) {
          var response = res.data;
          resolve(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
