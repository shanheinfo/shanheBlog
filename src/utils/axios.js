import axios from 'axios';
import dbUtils from "../libs/util.storage";
import { ZyNotification } from "../libs/util.toast";
import router from '@/router'

// 创建 Axios 实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 从本地存储获取 token
        const token = dbUtils.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        const res = response.data;
        
        // 这里可以根据后端的响应结构进行调整
        if (res.code === 200) {
            return res.data;
        } else {
            ZyNotification.error({
                title: '错误',
                message: res.message || '请求失败'
            });
            return Promise.reject(new Error(res.message || '请求失败'));
        }
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // token 过期或无效
                    dbUtils.remove('token');
                    router.push('/login');
                    break;
                case 403:
                    ZyNotification.error({
                        title: '权限不足',
                        message: '您没有权限访问该资源'
                    });
                    break;
                case 404:
                    ZyNotification.error({
                        title: '请求失败',
                        message: '请求的资源不存在'
                    });
                    break;
                case 500:
                    ZyNotification.error({
                        title: '服务器错误',
                        message: '服务器内部错误'
                    });
                    break;
                default:
                    ZyNotification.error({
                        title: '请求失败',
                        message: error.response.data.message || '未知错误'
                    });
            }
        } else {
            ZyNotification.error({
                title: '网络错误',
                message: '请检查您的网络连接'
            });
        }
        return Promise.reject(error);
    }
);

// 封装请求方法
class AxiosService {
    constructor() {
        if (AxiosService.instance) {
            return AxiosService.instance;
        }
        AxiosService.instance = this;
    }

    // GET 请求
    async get(url, params = null) {
        try {
            const response = await instance.request({
                method: 'get',
                url,
                params,
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // GET Blob 请求
    async getBlob(url, params = null, responseType = 'blob') {
        try {
            const response = await instance.request({
                method: 'get',
                url,
                params,
                responseType
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // POST 请求
    async post(url, data = null, params = null, responseType) {
        try {
            const response = await instance.request({
                method: 'post',
                url,
                data,
                params,
                responseType
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // PUT 请求
    async put(url, data = null, params = null) {
        try {
            const response = await instance.request({
                method: 'put',
                url,
                data,
                params,
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // DELETE 请求
    async delete(url, data = null, params = null) {
        try {
            const response = await instance.request({
                method: 'delete',
                url,
                params,
                data
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

// 创建单例
const axiosService = new AxiosService();

export default axiosService; 