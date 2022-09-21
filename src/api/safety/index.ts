import request from "@/utils/request";
//查询安全教育区域
export const selectAddress = ((eilnfo: any) => {
    return request({
        url: '/area/query/manage/area',
        method: 'post',
        data: eilnfo
    })
})