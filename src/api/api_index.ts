/**
 Created by  lanjian   on 2021/3/4  16:59
 Copyright 奥尔特云（深圳）智慧科技有限公司. All rights reserved.
 */
import message from '@/components/message/Message';
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';

const commonAxios: AxiosInstance = axios.create();
commonAxios.defaults.timeout = 10000; // 请求超时时间

// axios 请求拦截器
commonAxios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const token: string = window.sessionStorage.getItem('token') as string;
        config.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        // return Promise.error(error);
    },
);
// axios respone拦截器
commonAxios.interceptors.response.use(
    (response: AxiosResponse) => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
        if (response.status === 200) {
            if (response.data.code === 4100) {
                window.sessionStorage.clear();
                return Promise.reject(response.data.msg || '4100参数错误');
            }
            // if (response.data.code === 4100) {
            //   if (window.global && !!window.global.is_cordova) {
            //     window.androidFunUtils.tokenOverdue()
            //     return Promise.reject('当前网络繁忙，请稍候重试 token 失效 4100')
            //   } else {
            //     window.sessionStorage.clear()
            //     setTimeout(()=>{
            //       window.location.href = './#/login'
            //     },1500)
            //     return Promise.reject('当前网络繁忙，请稍候重试 token 失效 4100')
            //   }
            // }
            if (response.data.code === 4001 && !!response.data.errcode) {
                return Promise.reject('当前用户无操作权限，请联系管理员');
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error: AxiosError) => {
        if (!!error.message) {
            if (error.message.includes('timeout')) {
                return Promise.reject('网络请求超时，请稍候重试');
            }
            if (error.message.includes('404')) {
                return Promise.reject('糟糕页面丢失了，请稍候重试404');
            }
            if (error.message.includes('500')) {
                return Promise.reject('当前服务异常，请稍候重试500');
            }
        }
        return Promise.reject('当前网络繁忙，errorcode' + error.message);
    },
);

function http({ url, method = 'post', data = {}, params = {} }: ReqInt) {
    return new Promise((resolve, reject) => {
        commonAxios({ url, method, data, params })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
interface ReqInt {
    url: string;
    method?: string;
    data?: object;
    params?: object;
}

export default http;
