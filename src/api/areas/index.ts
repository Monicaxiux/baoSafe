import request from "@/utils/request";
//查询部门下拉框
export const selectDepartment = (() => {
    return request({
        url: '/area/department/select',
        method: 'post',
    })
})
//查询分厂下拉框
export const selectFactory = ((eiInfo: any) => {
    return request({
        url: '/area/factory/select',
        method: 'post',
        data: eiInfo
    })
})
//查询用户进出记录
export const selectRecord = ((eiInfo: any) => {
    return request({
        url: '/user/in/out/record/area',
        method: 'post',
        data: eiInfo
    })
})

//查询位置区域
export const selectQueryArea = ((eiInfo: any) => {
    return request({
        url: '/area/query/select',
        method: 'post',
        data: eiInfo
    })
})

//查询项目施工人员
export const selectRecordProject = ((eiInfo: any) => {
    return request({
        url: '/user/in/out/record/project',
        method: 'post',
        data: eiInfo
    })
})

//查询项目滞留人员
export const selectLeave = ((eiInfo: any) => {
    return request({
        url: '/user/in/out/record/project/not/leave/num',
        method: 'post',
        data: eiInfo
    })
})

//新增区域
export const addArea = ((eiInfo: any) => {
    return request({
        url: '/area/add/new/area',
        method: 'post',
        data: eiInfo
    })
})

//查询部门与分厂
export const selectDepAndFac = (() => {
    return request({
        url: '/area/query/all/department/factory',
        method: 'post'
    })
})

//查询全部安全教育区域
export const selectAll = (() => {
    return request({
        url: '/area/query/all/manage/area',
        method: 'post'
    })
})