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