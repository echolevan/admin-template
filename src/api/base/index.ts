import axios from 'axios';
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import { showMessage } from "./status";

let axiosInstance:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    timeout: 60000
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.headers.authorization) {
            localStorage.setItem('app_token', response.headers.authorization);
        } else {
            if (response.data && response.data.token) {
                localStorage.setItem('app_token', response.data.token);
            }
        }

        if (response.status === 200) {
            showMessage(response.status);
            // @ts-ignore
            window.$LoadingBar && window.$LoadingBar.error()
            return response;
        } else {
            showMessage(response.status);
            // @ts-ignore
            window.$LoadingBar && window.$LoadingBar.error()
            return response;
        }
    },
    // 请求失败
    (error: any) => {
        const {response} = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            showMessage(response.status);
            return Promise.reject(response.data);
        } else {
            // ElMessage.warning('网络连接异常,请稍后再试!');
        }
    }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
    // @ts-ignore
    (config: AxiosRequestConfig) => {
        // @ts-ignore
        window.$LoadingBar && window.$LoadingBar.start()
        // const { user } = store.state
        let token = localStorage.getItem('userToken')
        if (token) {
          // @ts-ignore
            config.headers.Authorization = `${token}`
        }
        return config;
    },
    (error:any) => {
        // @ts-ignore
        window.$LoadingBar && window.$LoadingBar.error()
        return Promise.reject(error);
    }
)

export default axiosInstance
