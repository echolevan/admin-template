import axiosInstance from './base/index'

/**
 * @description: 用户登录
 * @return {Promise}
 */
export function apiLogin(user: string, password: string) {
    return new Promise<{
        code: number | string;
        data: any;
        message: string;
    }>((resolve, reject) => {
        axiosInstance.post(`api/mock/v1/auth/login`, {
            user: user,
            password: password,
        }).then(({data}) => {
            return resolve(data)
        }).catch((error) => {
            return reject(error)
        })
    })
}

/**
 * @description: 获取用户信息
 * @return {Promise}
 */
export function apiUserInfo() {
    return new Promise<{
        code: number | string;
        data: any;
        message: string;
    }>((resolve, reject) => {
        axiosInstance.post(`api/mock/v1/auth/user`).then(({data}) => {
            return resolve(data)
        }).catch((error) => {
            return reject(error)
        })
    })
}
