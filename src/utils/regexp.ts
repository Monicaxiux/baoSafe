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
    const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXlsx) {
        ElNotification({
            message: '请上传.xlsx表格文件',
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