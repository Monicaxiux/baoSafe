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

//年度审批前查询人员
export const selectSafety = ((eilnfo: any) => {
    return request({
        url: '/assist/safety/status',
        method: 'post',
        data: eilnfo
    })
})

//年度安全资质查询
export const selectSafetylicense = ((eilnfo: any) => {
    return request({
        url: '/assist/query/project/user/safe/license',
        method: 'post',
        data: eilnfo
    })
})

//表格导入查询
export const selectQueryExcel = ((eilnfo: any) => {
    return request({
        url: '/internal/query/excel',
        method: 'post',
        data: eilnfo
    })
})

//作业证导入查询
export const selectLicense = ((eilnfo: any) => {
    return request({
        url: '/license/query/excel',
        method: 'post',
        data: eilnfo
    })
})

// 将表格数据写入数据库
export const internalExcel = ((eilnfo: any) => {
    return request({
        url: '/internal/insert/excel/data',
        method: 'post',
        data: eilnfo
    })
})

// 将作业证数据写入数据库
export const internalLicense = ((eilnfo: any) => {
    return request({
        url: '/license/insert/excel/data',
        method: 'post',
        data: eilnfo
    })
})

// 查询bna安全资质
export const selectBnasafe = ((eilnfo: any) => {
    return request({
        url: '/internal/query/project/user/safe/license',
        method: 'post',
        data: eilnfo
    })
})

// bna安全教育申报
export const applySafe = ((eilnfo: any) => {
    return request({
        url: '/internal/apply/safe/edu',
        method: 'post',
        data: eilnfo
    })
})

// 年度安全教育查询项目中每个员工的安全教育状态
export const selectEachUser = ((eilnfo: any) => {
    return request({
        url: '/assist/safety/status/each/user',
        method: 'post',
        data: eilnfo
    })
})


// 审批年度安全教育
export const selectVerify = ((eilnfo: any) => {
    return request({
        url: '/assist/verify/safe/edu',
        method: 'post',
        data: eilnfo
    })
})

//BNA审批前查询人员
export const selectBnaSafety = ((eilnfo: any) => {
    return request({
        url: '/internal/query/safe/before/verify',
        method: 'post',
        data: eilnfo
    })
})

// 审批BNA安全教育
export const selectBnaVerify = ((eilnfo: any) => {
    return request({
        url: '/internal/verify/safe/edu',
        method: 'post',
        data: eilnfo
    })
})

// 查询过期作业证
export const selectExpira = ((eilnfo: any) => {
    return request({
        url: '/license/query/soon/overdue',
        method: 'post',
        data: eilnfo
    })
})

// 查询作业证历史记录
export const selectHistory = ((eilnfo: any) => {
    return request({
        url: '/license/record/history',
        method: 'post',
        data: eilnfo
    })
})

// 修改作业证
export const licenseUpdate = ((eilnfo: any) => {
    return request({
        url: '/license/update',
        method: 'post',
        data: eilnfo
    })
})

// 添加作业证
export const licenseInsert = ((eilnfo: any) => {
    return request({
        url: '/license/insert',
        method: 'post',
        data: eilnfo
    })
})

// 修改人员权限
export const updateUserAuth = ((eilnfo: any) => {
    return request({
        url: '/user/update/internal/user/auth',
        method: 'post',
        data: eilnfo
    })
})

// 修改人员信息
export const updateUser = ((eilnfo: any) => {
    return request({
        url: '/user/update',
        method: 'post',
        data: eilnfo
    })
})
// 新增人员信息
export const addUser = ((eilnfo: any) => {
    return request({
        url: '/user/add/internal/address/book',
        method: 'post',
        data: eilnfo
    })
})

// 删除人员信息
export const deleteUser = ((eilnfo: any) => {
    return request({
        url: '/user/delete',
        method: 'post',
        data: eilnfo
    })
})

// 设置过期期限
export const updexpiryLimit = ((eilnfo: any) => {
    return request({
        url: `/license/update/expiry/limit?expiryLimit=${eilnfo}`,
        method: 'post'
    })
})

// 查询项目中的人员
export const selectProjectUser = ((eilnfo: any) => {
    return request({
        url: '/assist/query/project/user/info',
        method: 'post',
        data: eilnfo
    })
})