import axiosInstance from './base/index'

/**
 * @return {Promise}
 */
export function apiGetUser(page: number, size: number, searchParams: any) {
    console.log(searchParams);
    return new Promise<{
        data: any;
        total: number;
    }>((resolve, reject) => {
        axiosInstance.get(`api/admin/user?address=${searchParams.address || ''}`).then(({data}) => {
            return resolve(data)
        }).catch((error) => {
            return reject(error)
        })
    })
}

/**
 * @return {Promise}
 */
export function apiChangeStatus(id: number) {
    return new Promise<{
        data: any;
        total: number;
    }>((resolve, reject) => {
        axiosInstance.put(`api/admin/user/changeStatus/${id}`).then(({data}) => {
            return resolve(data)
        }).catch((error) => {
            return reject(error)
        })
    })
}
