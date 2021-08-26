/*
 * @author: HMS
 * @create: 2021-08-17 16:21 PM
 * @license: MIT
 * @lastAuthor: HMS
 * @lastEditTime: 2021-08-17 16:45 PM
 * @desc:
 */
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    let append = document.getElementsByName("body");
    append.innerHTML = `<img style="position:fixed;\n' +
      " left:47%;\n" +
      " top:40%;\n" +
      ' transform: translateY(-50%),translateX(-50%);"' +
      ' src="../../static/img/loading2.gif"/>`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

let base = ""; //接口域名

export const request = (url, params, method, Func, isJson) => {
  axios({
    method: method,
    url: `${base}${url}`,
    data: method === "post" ? params : "",
    transformRequest: [
      function(data) {
        if (isJson === 1) {
          return JSON.stringify(data);
        }
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: {
      "content-Type":
        isJson === 1 ? "application/json" : "application/x-www-form-urlencoded",
      authorization: sessionStorage.getItem("principal"),
      token: sessionStorage.getItem("token"),
    },
    params: method === "get" ? params : "",
  }).then((data) => {
    console.log(data);
    if(data.data.code===200){
        Func(data.data.data)
    }else if(data.data.code===406){
confirm(data.data.message)
    }else if(data.data.code===401){
        window.onload.href='' //上线时使用这个地址
    }else if(data.data.code===400||data.data.code===505||data.data.code===404data.data.code===500){
        confirm('网络异常')
    }else if(data.data.code===4011){
        window.onload.href='' //线上
    }else if(data.data.code===4012){
        console.log(1111);
        request('token/refresh',{
            'authorization':sessionStorage.getItem('principal'),
            'refreshToken':sessionStorage.getItem('refreshToken')
        })
    }
  });
};
