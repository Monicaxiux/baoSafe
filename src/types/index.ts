//登陆参数
export class LoginUser {
    loginName: string = 'Admin0'
    password: string = '0'
}
//eiInfo参数
export class EiInfo {
    parameter: any = {};
    userInfo: any = {};
    result: any = {};
    sys: any = {};
}
//协力员工搜索条件
export class external {
    username: string = ''
    icCardWorkNumber: string = ''
    pageNum: number = 1
    assistCompany: string = '宝'
    limit: number = 10
}
//BNA员工搜索条件
export class bna {
    baoDepartment: number = 1
    username: string = ''
    icCardWorkNumber: string = ''
    pageNum: number = 1
    limit: number = 10
}
//BNA安全资质搜索条件
export class bnaSafety {
    safetyLevel: string = ''
    icCardWorkNumber: string = ''
    pageNum: number = 1
    limit: number = 10
}
//查询分厂及科室
export class address {
    manageAreaType: number = 2
    previousKey: number = 1
}
// 协力编辑/新增
export class externalInfo {
    assistCompany: string = ""
    actualCompany: string = ""
    username: string = ""
    icCardWorkNumber: string = ""
    icPic: string = ""
    sex: string = "男"
    age: any = ""
    phone: any = ""
    licenseList: any = []
    userPic: string = ""
}
// BNA编辑/新增
export class bnaInfo {
    baoDepartment: number = 1
    baoFactory: string = ""
    recentJob: string = ""
    username: string = ""
    icCardWorkNumber: string = ""
    enterFactoryYearAndMonth: string = ""
    icPic: string = ""
    sex: string = "男"
    age: any = ""
    phone: any = ""
    licenseList: any = []
    userPic: string = ""
}
//项目信息
export class project {
    projectNumber: string = ""
    projectName: string = ""
    projectType: string = ""
    assistCompany: string = ""
    contactPerson: string = ""
    safetyEducationCharge: string = ""
    workCycleEnd: string = ""
    workCycleStart: string = ""
}