import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { el } from "element-plus/es/locale";

// 声明模型参数
type TAxiosOption = {
    timeout: number;
    baseURL: string;
};

// 默认参数
const config: TAxiosOption = {
    timeout: 5000,
    baseURL: "http://localhost:5278",  // 本地api url 端口号：5278
};

// axios实例
class Http {
    service;
    constructor(options: TAxiosOption) {
        this.service = axios.create(config);
        /* 请求拦截 */
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                //可以在这里做请求拦截处理 如：请求接口前，需要传入的token
                //debugger;
                return config;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );
        /* 响应拦截 */
        this.service.interceptors.response.use(
            (response: AxiosResponse<any>) => {
                //debugger;
                switch (response.data.code) {
                    case 200:
                        return response.data;
                    case 500:
                        ElMessage({
                            message: response.data.msg,
                            type: "error",
                        });
                        break;
                    case 99991:
                        ElMessage({
                            message: response.data.msg,
                            type: "warning",
                        });
                        break;
                    case 99992:
                        ElMessage({
                            message: response.data.msg,
                            type: "info",
                        });
                        break;
                    case 99998:
                        return response.data;
                    default:
                        break;
                }
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
    

    // get请求
    get<T>(url: string, params?: object, _object = {}) : Promise<any> {
        return this.service.get(url, { params, ..._object });
    }

    // post请求 
    post<T>(url: string, data?: object, _object = {}) : Promise<any> {
        return this.service.post(url, data, _object);
    }

    // put请求
    put<T>(url: string, data?: object, _object = {}) : Promise<any> {
        return this.service.put(url, data, _object);
    }

    // delete请求
    delete<T>(url: string, data?: any, _object = {}) : Promise<any> {
        return this.service.delete(url, { data, ..._object });
    }
}

export default new Http(config);