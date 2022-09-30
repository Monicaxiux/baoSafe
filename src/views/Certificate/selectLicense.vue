<template>
    <Search :select="selectUserList" :add="add" :data="eilnfo" :searchType="1"></Search>
    <Table :handleEdit="handleEdit" :handleChange="handleChange" :loading="loading"
        :multipleSelection="multipleSelection" :tableType="true" :tableData="tableData" :license="license"></Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <el-dialog v-model="dialogVisible" :title="dialogType == 1 ? '编辑证书' : '添加证书'" width="40%"
        :before-close="handleClose">
        <el-card shadow="hover" style="width: 330px">
            <h1>作业证信息</h1>
            <el-form :model="userInfo" status-icon class="demo-ruleForm from" label-width="70px">
                <el-form-item v-if="dialogType != 1" label="IC卡号">
                    <el-input class="input" v-model="userInfo.icCardWorkNumberExact" clearable placeholder="请输入IC卡号" />
                </el-form-item>
                <el-form-item v-if="dialogType != 1" label="证书类型">
                    <el-select style="width: 100%" v-model="userInfo.licenseType" placeholder="请选择作业证类型">
                        <el-option v-for="item in licenseTypeList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证书编号">
                    <el-input class="input" v-model="userInfo.licenseNumber" clearable placeholder="请输入证书编号" />
                </el-form-item>
                <el-form-item label="证书名称">
                    <el-input class="input" v-model="userInfo.licenseName" clearable placeholder="请输入证书名称" />
                </el-form-item>
                <el-form-item label="取证日期">
                    <el-date-picker v-model="userInfo.receiveDate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择取证日期" />
                </el-form-item>
                <el-form-item label="复证日期">
                    <el-date-picker v-model="userInfo.restoreDate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择复证日期" />
                </el-form-item>
                <el-form-item label="到期日期">
                    <el-date-picker v-model="userInfo.expiryDate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择到期日期" />
                </el-form-item>
                <el-form-item label="证书照片">
                    <UploadImage :upload="uploadUserPic" :url="userInfo.licensePic"></UploadImage>
                </el-form-item>
            </el-form>
        </el-card>
        <template #footer>
            <span class=" dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleEditT">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import Search from './components/Search.vue'
import { ref, reactive } from 'vue'
import { EiInfo, expiration } from '@/types';
import { selectExpira, licenseUpdate, licenseInsert } from '@/api/user'
import { ElNotification } from 'element-plus'
import UploadImage from '@/components/UploadImage.vue'
import { getBase64 } from '@/utils/regexp'
import { piniaData } from '@/store';//引入pinia状态管理
//pinia状态管理
const store = piniaData();
const quer = reactive(new expiration)
const eilnfo = reactive(new EiInfo);
eilnfo.parameter = quer
const tableData = ref([])
const loading = ref(false)
const dataCount = ref(0)
const hide = ref(false)
const multipleSelection = ref([])
const dialogVisible = ref(false)
const dialogType = ref(1)
const userInfo: any = ref({
    icCardWorkNumberExact: '',
    licenseNumber: '',
    licenseName: '',
    receiveDate: '',
    restoreDate: '',
    expiryDate: '',
    licensePic: '',
})
const licenseTypeList = ref([
    {
        id: 1,
        name: '特种作业证'
    },
    {
        id: 2,
        name: '生产经营单位负责人证'
    },
    {
        id: 3,
        name: '安全生产管理人员证'
    },
    {
        id: 4,
        name: '特种设备操作证'
    }
])


const license = () => {

}
// 多选框选中事件
const handleChange = (val: any) => {
    multipleSelection.value = val.map(item => item.licenseId)
}
const selectUserList = () => {
    eilnfo.parameter.overdue = 0
    loading.value = false
    selectExpira(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.result == undefined ? [] : res.result.result
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}

//自定义上传方法
const uploadUserPic = (f) => {
    getBase64(f.file).then((res: any) => {
        userInfo.value.licensePic = res
    });
}

// 下载特种作业证
const download = () => {
    multipleSelection.value.length != 0 ? (
        ElNotification({
            message: "正在导出作业证表格，请稍等...",
            type: 'success',
        }),
        window.location.href =
        `https://safeedu.bnasafe.com/download/soon/overdue/license/excel?licenseId=${multipleSelection.value}`
    ) : (
        ElNotification({
            message: '请选择要导出的证书',
            type: 'warning',
        })
    )
}
const handleEdit = (index, row) => {
    console.log(row);
    dialogType.value = 1
    userInfo.value = JSON.parse(JSON.stringify(row))
    dialogVisible.value = true
}
const handleEditT = () => {
    let eiInfo = new EiInfo
    eiInfo.parameter = {
        id: userInfo.value.licenseId,
        licenseNumber: userInfo.value.licenseNumber,
        licenseName: userInfo.value.licenseName,
        receiveDate: userInfo.value.receiveDate,
        expiryDate: userInfo.value.expiryDate,
        restoreDate: userInfo.value.restoreDate,
        licensePic: userInfo.value.licensePic,
        userId: userInfo.value.userId,
        licenseType: userInfo.value.licenseType
    }
    eiInfo.userInfo = {
        username: store.userInfo.username
    }
    if (dialogType.value != 1) {
        eiInfo.parameter.icCardWorkNumberExact = userInfo.value.icCardWorkNumberExact
        if (isForm(userInfo.value)) {
            licenseInsert(eiInfo).then((res: any) => {
                if (res.sys.status != -1) {
                    ElNotification({
                        message: "添加成功",
                        type: 'success',
                    })
                } else {

                }
                dialogVisible.value = false
                selectUserList()
            })
        } else {
            ElNotification({
                message: "请填写完整！",
                type: 'warning',
            })
        }
    } else {
        delete eiInfo.parameter.licenseType
        delete eiInfo.parameter.icCardWorkNumberExact
        console.log(eiInfo);
        licenseUpdate(eiInfo).then((res: any) => {
            if (res.sys.status != -1) {
                ElNotification({
                    message: "修改成功",
                    type: 'success',
                })
            } else {

            }
            dialogVisible.value = false
            selectUserList()
        })
    }

}
const handleClose = () => {
    dialogVisible.value = false
}
const isForm = (obj) => {
    for (let key in obj) {
        if (!obj[key]) {
            return false
        }
    }
    return true
};
const add = () => {
    // 清空表单
    for (let i in userInfo.value) { userInfo.value[i] = '' }
    dialogType.value = 2
    dialogVisible.value = true

}
const imageUrlToBase64 = (url: any) => {
    let homeImage = new Image();
    let dataURL;
    // 解决跨域问题
    homeImage.setAttribute("crossOrigin", "anonymous");
    homeImage.src = url;
    //homeImage.onload为异步加载
    homeImage.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = homeImage.width;
        canvas.height = homeImage.height;
        let context: any = canvas.getContext("2d");
        context.drawImage(homeImage, 0, 0, homeImage.width, homeImage.height);
        let quality = 0.8;
        // 这里的dataurl就是base64类型
        dataURL = canvas.toDataURL("image/jpeg", quality);
    };
    return dataURL
}
</script>
<style scoped>
</style>
