import request from "@/utils/request";
//查询安全教育区域
export const selectAddress = ((eilnfo: any) => {
    return request({
        url: '/area/query/manage/area',
        method: 'post',
        data: eilnfo
    })
})
// 查询协力人员安全教育
export const selectSynerg = ((eilnfo: any) => {
    return request({
        url: '/assist/company/inside/safe',
        method: 'post',
        data: eilnfo
    })
})
// 删除年度安全教育项目
export const deleteProject = ((eilnfo: any) => {
    return request({
        url: '/assist/delete/project',
        method: 'post',
        data: eilnfo
    })
})

// 为已经申请的安全教育申报其他区域的安全教育
export const addSafeEdu = ((eilnfo: any) => {
    return request({
        url: '/assist/add/safe/edu',
        method: 'post',
        data: eilnfo
    })
})

// 撤销已经申请的年度安全教育
export const cancelSafeEdu = ((eilnfo: any) => {
    return request({
        url: '/assist/cancel/safe/edu',
        method: 'post',
        data: eilnfo
    })
})