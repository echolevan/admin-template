import axiosInstance from './base/index'

/**
 * @description: 用户登录
 * @return {Promise}
 */
export function apiLogin(user: string, password: string) {
    return new Promise<{
        token: any;
        message: string;
    }>((resolve, reject) => {
        axiosInstance.post(`api/admin/auth/sign-up`, {
            username: user,
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
        axiosInstance.post(`api/admin/auth/info`).then(({data}) => {
            return resolve(data)
        }).catch((error) => {
            return reject(error)
        })
    })
}
