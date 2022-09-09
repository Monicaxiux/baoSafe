import request from "@/utils/request";
//查询地区
export const selectAddress = ((eilnfo: any) => {
    return request({
        url: '/area/query/manage/area',
        method: 'post',
        data: eilnfo
    })
})