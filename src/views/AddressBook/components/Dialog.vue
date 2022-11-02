<template>
    <el-dialog v-model="dialogVisible" :title="dialogType == 1 ? '编辑员工' : '添加员工'" width="20%"
        :before-close="handleCloseLis">
        <!-- <span v-if="dialogType == 1">当前为<a v-if="userType">协力</a><a v-if="!userType">Bna</a>编辑</span>
        <span v-if="dialogType == 2">当前为<a v-if="userType">协力</a><a v-if="!userType">Bna</a>新增</span> -->
        <div style=" display: flex;
    justify-content: space-between;">
            <el-card shadow="hover" style="width: 330px">
                <h1>基本信息</h1>
                <el-form :model="userInfo" status-icon class="demo-ruleForm from" label-width="70px">
                    <el-form-item label="协力单位" v-if="userType">
                        <el-input class="input" v-model="userInfo.assistCompany" clearable placeholder="请输入协力单位" />
                    </el-form-item>
                    <el-form-item label="部门" v-if="!userType">
                        <el-select @change="change" v-model="userInfo.baoDepartment" placeholder="请选择部门">
                            <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId"
                                :label="item.baoDepartmentName" :value="item.baoDepartmentId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分厂">
                        <el-select v-model="userInfo.baoFactory" clearable placeholder="请选择分厂">
                            <el-option v-for="item in baoFactoryList" :key="item.baoFactoryId"
                                :label="item.baoFactoryName" :value="item.baoFactoryId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在单位" v-if="userType">
                        <el-input class="input" v-model="userInfo.actualCompany" clearable placeholder="请输入所在单位" />
                    </el-form-item>
                    <el-form-item label="当前岗位">
                        <el-input class="input" v-model="userInfo.recentJob" clearable placeholder="请输入当前岗位" />
                    </el-form-item>
                    <el-form-item label="IC卡号">
                        <el-input class="input" v-model="userInfo.icCardWorkNumber" clearable placeholder="请输入IC卡号" />
                    </el-form-item>
                    <el-form-item label="员工姓名">
                        <el-input class="input" v-model="userInfo.username" clearable placeholder="请输入员工姓名" />
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input class="input" v-model="userInfo.age" clearable placeholder="请输入员工年龄" />
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="userInfo.sex" class="ml-4">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input class="input" v-model="userInfo.phone" clearable placeholder="请输入联系电话" />
                    </el-form-item>
                    <el-form-item label="个人照片">
                        <UploadImage :upload="uploadUserPic" :url="userInfo.userPic"></UploadImage>
                    </el-form-item>
                    <el-form-item label="IC卡照片">
                        <UploadImage :upload="uploadIcPic" :url="userInfo.icPic"></UploadImage>
                    </el-form-item>
                </el-form>
            </el-card>
            <!-- <el-card shadow="hover" style="width: 1020px">
                <h1>特种作业证</h1>
                <el-button type="primary" @click="handleEditLis">添加证书</el-button>
                <el-button type="primary" @click="handleEditT">查看换证历史记录</el-button>
                <br><br>
                <LicenseTable :licenseData="userInfo.licenseUpdateList" :licenseDelete="licenseDelete"
                    :licenseEdit="licenseEdit"></LicenseTable>
            </el-card> -->
            <el-drawer v-model="drawer" :title="status ? '新增特种作业证' : '修改特种作业证'" direction="rtl"
                :before-close="handleCloseLis">
                <el-form-item label="证书编号">
                    <el-input class="input" v-model="licenseList.licenseNumber" clearable placeholder="请输入证书编号" />
                </el-form-item>
                <el-form-item label="证书名称">
                    <el-input class="input" v-model="licenseList.licenseName" clearable placeholder="请输入证书名称" />
                </el-form-item>
                <el-form-item label="取证日期">
                    <el-date-picker v-model="licenseList.receiveDate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择取证日期" />
                </el-form-item>
                <el-form-item label="复证日期">
                    <el-date-picker v-model="licenseList.restoreDate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择复证日期" />
                </el-form-item>
                <el-form-item label="到期日期">
                    <el-date-picker v-model="licenseList.expiryDate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择到期日期" />
                </el-form-item>
                <el-form-item label="证书照片">
                    <UploadImage :upload="uploadUserPic" :url="licenseList.licensePic"></UploadImage>
                </el-form-item>
                <template #footer>
                    <span class=" dialog-footer">
                        <el-button @click="handleCloseLis">取消</el-button>
                        <el-button type="primary" @click="handleEditTLis()">确定</el-button>
                    </span>
                </template>
            </el-drawer>
        </div>
        <template #footer>
            <span class=" dialog-footer">
                <el-button @click="handleCloseLis">取消</el-button>
                <el-button type="primary" @click="handleEditT(dialogType)">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="licenseDialog" :title="licenseDialogType == 1 ? '新增特种作业证' : '编辑特种作业证'" width="75%"></el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRefs, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import LicenseTable from './licenseTable.vue'
import UploadImage from '@/components/UploadImage.vue'
import { selectDepartment, selectFactory } from '@/api/areas';
import { EiInfo } from '@/types';
// 定义Props默认数据类型
type Props = {
    dialogVisible: boolean,
    dialogType: number,
    userType: boolean,
    handleEditT: Function,
    userInfo: any,
    uploadUserPic: Function,
    uploadIcPic: Function,
    licenseDelete: Function,
    licenseEdit: Function,
    handleCloseLis: Function
    baoFactoryList: any,
    change: Function
}
const props = defineProps<Props>()

onMounted(() => {
    // 查询部门下拉框
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
    // let eiInfo = new EiInfo
    // eiInfo.parameter = {
    //     departmentId: props.userInfo.baoDepartment
    // }
    // selectFactory(eiInfo).then((res: any) => {
    //     baoFactoryList.value = res.result.factorySelect
    // })
})
// 监听表格数据来开启提交按钮
// watch(props.userInfo.baoDepartment, (newValue, oldValue) => {
//     console.log(newValue);
//     let eiInfo = new EiInfo
//     eiInfo.parameter = {
//         departmentId: newValue
//     }
//     selectFactory(eiInfo).then((res: any) => {
//         props.baoFactoryList.baoFactoryList.value = res.result.factorySelect
//     })
// })
const status = ref(false)
// 使用defineProps接收父组件的传递值
const drawer = ref(false)
const licenseList: any = ref({})
const handleEditLis = () => {
    status.value = true
    drawer.value = true
}

const handleEditTLis = () => {

}
// const handleCloseLis = () => {
//     ElMessageBox.confirm('确定取消操作?')
//         .then(() => {
//             drawer.value = false
//         })
//         .catch(() => {
//             // catch error
//         })
// }
const licenseDialog = ref(false)
const departmentSelect: any = ref([])
// const baoFactoryList: any = ref([])
const licenseDialogType = ref(1)
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定取消操作?')
        .then(() => {
            props.handleEditT();
            console.log(props.dialogVisible);
        })
        .catch(() => {
            // catch error
        })
}

</script>
<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.el-dialog {
    margin-top: 8vh;
}
</style>