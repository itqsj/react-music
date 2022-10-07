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
        config.params.realIP = '81.68.189.27';

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
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error.response?.data);
    },
);

function http({ url, method = 'post', data, params }: ReqInt) {
    return new Promise((resolve, reject) => {
        commonAxios({ url, method, data, params })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                message.warning({ content: err.message, duration: 2 });
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
