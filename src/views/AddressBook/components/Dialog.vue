<template>
    <el-dialog v-model="dialogVisible" :title="dialogType == 1 ? '编辑员工' : '添加员工'" width="75%"
        :before-close="handleClose">
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
                    <!-- <el-form-item label="部门" v-if="!userType">
                    <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                        v-model="data.parameter.baoDepartment" placeholder="请选择部门">
                        <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId"
                            :label="item.baoDepartmentName" :value="item.baoDepartmentId" />
                    </el-select>
                </el-form-item> -->
                    <el-form-item label="所在单位" v-if="userType">
                        <el-input class="input" v-model="userInfo.actualCompany" clearable placeholder="请输入所在单位" />
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
            <el-card shadow="hover" style="width: 1020px">
                <h1>特种作业证</h1>
                <el-button type="primary" @click="handleEditT">添加证书</el-button>
                <el-button type="primary" @click="handleEditT">查看换证历史记录</el-button>
                <br><br>
                <LicenseTable :licenseData="userInfo.licenseUpdateList" :licenseDelete="licenseDelete"
                    :licenseEdit="licenseEdit"></LicenseTable>
            </el-card>
        </div>
        <template #footer>
            <span class=" dialog-footer">
                <el-button @click="handleEditT">取消</el-button>
                <el-button type="primary" @click="handleEditT">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="licenseDialog" :title="licenseDialogType == 1 ? '新增特种作业证' : '编辑特种作业证'" width="75%"></el-dialog>
</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { ElMessageBox } from 'element-plus'
import LicenseTable from './licenseTable.vue'
import UploadImage from '@/components/UploadImage.vue'//分页组件
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
    licenseEdit: Function
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const licenseDialog = ref(false)
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