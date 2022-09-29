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
    userType: number = 1
    username: string = ''
    icCardWorkNumber: string = ''
    safeLevel: number = 1
    manageArea2: number = 0
    manageArea3: number = 0
    pageNum: number = 1
}
//BNA安全资质搜索条件
export class bnaSafety {
    baoDepartment: any = 1
    baoFactory: any = ''
    icCardWorkNumber: string = ''
    pageNum: number = 1
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
    userPicModify: any = 0
    icPicModify: any = 0
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
    time: any = ""
}

// 审批前查询
export class selectApproval {
    projectNumber: string = ""
    projectName: string = ""
    safeLevel: number = 1
    manageArea2: number = 0
    manageArea3: number = 0
    pageNum: number = 1
}

// 安全资质查询
export class selectSafe {
    assistCompany: string = ""
    projectNumber: string = ""
    projectName: string = ""
    pageNum: number = 1
}

// 用户进出记录查询
export class record {
    icCardWorkNumber: string = ""
    username: string = ""
    companyId: number = 1
    areaId: number = 0
    destinationId: number = 0
    locationId: number = 0
    startTime: string = ""
    endTime: string = ""
    pageNum: number = 1
}

// 项目施工人员查询
export class recordProject {
    icCardWorkNumber: string = ""
    username: string = ""
    projectNumber: number = 1
    areaId: number = 0
    projectName: number = 0
    locationId: number = 0
    startTime: string = ""
    endTime: string = ""
    pageNum: number = 1
}

// 项目滞留人员查询
export class projectNum {
    projectNumber: any = ''
    areaId: number = 0
    projectName: any = ''
    pageNum: number = 1
}

//Bna审核人员
export class examScore {
    examScore: any = ''
    examPic: any = ''
    trainStartDate: any = ''
    trainEndDate: any = ''
    examDate: any = ''
    nextSafeManageArea: any = ''
}

//查询即将过期证书
export class expiration {
    baoDepartment: any = ''
    baoFactory: any = ''
    licenseName: any = ''
    licenseNumber: any = ''
    licenseType: any = 1
    pageNum: any = 1
}