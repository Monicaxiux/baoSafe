import request from "@/utils/request";
//查询部门下拉框
export const selectDepartment = (() => {
    return request({
        url: '/area/department/select',
        method: 'post',
    })
})