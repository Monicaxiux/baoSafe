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
//创建项目前导入人员信息
export const beforeProjectUser = ((eilnfo: any) => {
    return request({
        url: '/assist/import/user/before/create/project',
        method: 'post',
        data: eilnfo
    })
})

//查询导入项目中的人员
export const getProjectUser = ((eilnfo: any) => {
    return request({
        url: '/assist/query/import/user',
        method: 'post',
        data: eilnfo
    })
})

//删除导入项目中的人员
export const deleteProjectUser = ((eilnfo: any) => {
    return request({
        url: '/assist/delete/import/user',
        method: 'post',
        data: eilnfo
    })
})

//创建项目
export const createProject = ((eilnfo: any) => {
    return request({
        url: '/assist/create/project',
        method: 'post',
        data: eilnfo
    })
})