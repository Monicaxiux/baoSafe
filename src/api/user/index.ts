import request from "@/utils/request";
//用户登陆
export const login = ((eilnfo: any) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: eilnfo
    })
})
//查询协力用户列表
export const selectExternal = ((eilnfo: any) => {
    return request({
        url: '/user/assist/address/book',
        method: 'post',
        data: eilnfo
    })
})
//查询BNA用户列表
export const selectBna = ((eilnfo: any) => {
    return request({
        url: '/user/internal/address/book',
        method: 'post',
        data: eilnfo
    })
})
//查询BNA用户权限列表
export const selectManager = ((eilnfo: any) => {
    return request({
        url: '/user/query/internal/user/auth',
        method: 'post',
        data: eilnfo
    })
})
//更新前回填数据
export const selectUpData = ((eilnfo: any) => {
    return request({
        url: '/user/query/user/license/before/update',
        method: 'post',
        data: eilnfo
    })
})