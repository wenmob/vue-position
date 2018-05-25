import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { getToken, removeToken, getDomain } from '@/utils/auth'

import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';

let statuc = 0;
export function getStatuc() {
    return statuc;
}
export function setStatuc(val) {
    statuc = val;
}
// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

// respone拦截器
service.interceptors.request.use(config => {
    config.headers['X-Token'] = getToken();
    config.data = qs.stringify(config.data);
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

//判断是否登入
service.interceptors.response.use(
    response => {

        const res = response.data;
        // if (response.config.url === '/user/status/login') {
        //     return response.data
        // }
        
        if (res.code === 100000) {
            if (statuc == 0){
             statuc = 1;  
             MessageBox.alert("你还未登录或者重新登录",{
                confirmButtonText: '确定',
                callback: action => {
                    let domain = getDomain();
                    if (domain) {
                        window.parent.postMessage('reload', '*');
                    } else {
                        // window.location.href = '#/login'
                        router.push('/login')
                    }
                }
             
             })
           }
        } else if (res.code === 100001) {
            if (statuc == 0){
            statuc = 1;    
            MessageBox.alert("登入超时，请重新登入", {
                confirmButtonText: '确定',
                callback: action => {
                    let domain = getDomain();
                    if (domain) {
                        window.parent.postMessage('reload', '*');
                    } else {
                        router.push('/login')
                    }
                }

            })
          }
        } else if (res.code === 100002) {
            if (statuc == 0){
            statuc = 1;    
            MessageBox.alert("抱歉你无权操作", {
                confirmButtonText: '确定',
                callback: action => {
                    let domain = getDomain();
                    if (domain) {
                        window.parent.postMessage('reload', '*');
                    } else {
                        router.push('/login')
                    }
                }

            })
          } 
        } else {
            return response.data
        }
        return Promise.reject('error');
    },
    error => {
        Message.error(error);
        return Promise.reject(error)
    }
)

export default service