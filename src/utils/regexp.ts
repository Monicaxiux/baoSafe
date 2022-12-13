import { ElNotification } from 'element-plus'
// 验证IC工号
export const validateUser = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入IC工号！'))
    } else {
        callback();
    }
}

// 验证密码
export const validatePassWord = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码！'))
    } else {
        callback();
    }
}

//图片转换Base64
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let imgResult: any = "";
        reader.readAsDataURL(file);
        reader.onload = () => {
            imgResult = reader.result;
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.onloadend = () => {
            resolve(imgResult);
        };
    });
}

//图片类型文件判断
export const isImg = (file) => {
    const isImg =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
    if (!isImg) {
        ElNotification({
            message: '请上传jpeg/jpg/png/webp图片文件',
            type: 'warning',
        })
        return false;
    }
}

// xlsx类型文件判断
export const isXlsx = (file) => {
    console.log(file.type);
    const isXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isXls = file.type === "application/vnd.ms-excel"
    if (!isXlsx && !isXls) {
        ElNotification({
            message: '请上传.xlsx/.xls表格文件',
            type: 'warning',
        })
        return false;
    }
}
//判断权限
export const isUserAuth = (i) => {
    let res = ''
    switch (i) {
        case 0:
            res = "管理员";
            break;
        case 1:
            res = "一级";
            break;
        case 2:
            res = "二级";
            break;
        case 3:
            res = "三级";
            break;
        case -1:
            res = "普通员工";
            break;
    }
    return res
}

// 验证项目名称
export const validateProject = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入项目名称！'))
    } else {
        callback();
    }
}
// 验证项目编号
export const validateProjectNumber = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入项目编号！'))
    } else {
        callback();
    }
}
// 验证项目性质
export const validateProjectCharacteristic = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入项目性质！'))
    } else {
        callback();
    }
}
// 验证协力单位
export const validateAssistCompany = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入协力单位！'))
    } else {
        callback();
    }
}
// 验证项目周期
export const validateProjectCycle = (rule: any, value: any, callback: any) => {
    console.log(value);

    if (value === '' || null) {
        callback(new Error('请选择项目周期！'))
    } else {
        callback();
    }
}