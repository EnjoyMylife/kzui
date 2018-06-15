import axios from 'axios'
import jsonp from 'jsonp'
import querystring from "querystring"
axios.defaults.timeout = 15000;

const parseParam = function (param) {
    let paramStr = "";
    if (typeof param == "object") {
        for (let key in param) {
            let values = "";
            try {
                values = encodeURI(encodeURI(param[key]))
            } catch (error) {
                values = param[key]
            }
            paramStr += "&" + key + "=" + values;
        }
    }
    return paramStr.substr(1);
};
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export default {
    request(config) {
        return new Promise((resolve, reject) => {
            axios.request(config).then(res => {
                resolve(res)
            }).catch(error => {
                resolve({ code: -999, msg: '系统异常', e: error })
            })
        })
    },
    jsonp(url, params = {}) {
        return new Promise((resolve, reject) => {
            jsonp(url + "?" + querystring.parse(data), (data)=>{
                resolve(data)
            },(error)=>{
                resolve({ code: -999, msg: '系统异常', e: error })
            })
        })
    }
    ,
    get(url, params = {}) {
        params = parseParam(params);
        return new Promise((resolve, reject) => {
            axios.get(url + '?' + params, params).then(res => {
                resolve(res)
            }).catch(error => {
                resolve({ code: -999, msg: '系统异常', e: error })
            })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: 'post',
                data: params,
                transformRequest: [function (data) {
                    // Do whatever you want to transform the data
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                resolve({ code: -999, msg: '系统异常', e: error })
            })
        })
    }
}