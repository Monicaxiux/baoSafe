<template>
    <el-steps :space="500" :active="1" simple>
        <el-step title="步骤1：系统导入 | 模板导入" />
        <el-step title="步骤2：确认安全教育名单" />
        <el-step title="步骤3：提交申报" />
    </el-steps>
    <br>
    <el-card>
        <div class="box">
            <div class="left">
                <el-card shadow="hover">
                    <h1>项目信息</h1>
                    <!-- <Project :change="change" :form="form"></Project> -->
                    <el-form status-icon class="demo-ruleForm from" label-width="70px">
                        <h6 style="color: red;">注意：如果没有项目编号，则输入合同编号</h6>
                        <el-form-item label="项目编号" prop="projectNumber">
                            <el-input class="input" v-model="form.projectNumber" clearable placeholder="请输入项目编号" />
                        </el-form-item>
                        <el-form-item label="合同编号" prop="contractNumber">
                            <el-input class="input" v-model="form.contractNumber" clearable placeholder="请输入合同编号" />
                        </el-form-item>
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input class="input" v-model="form.projectName" clearable placeholder="请输入项目名称" />
                        </el-form-item>
                        <el-form-item label="项目性质" prop="projectType">
                            <el-input class="input" v-model="form.projectType" clearable placeholder="请输入项目性质" />
                        </el-form-item>
                        <el-form-item label="协力公司" prop="assistCompany">
                            <el-input class="input" v-model="form.assistCompany" clearable placeholder="请输入协力公司" />
                        </el-form-item>
                        <el-form-item label="负责人" prop="contactPerson">
                            <el-input class="input" v-model="form.contactPerson" clearable placeholder="请输入安全负责人" />
                        </el-form-item>
                        <el-form-item label="联系电话" prop="safetyEducationCharge">
                            <el-input class="input" v-model="form.safetyEducationCharge" clearable
                                placeholder="请输入联系电话" />
                        </el-form-item>
                        <el-form-item label="项目周期" prop="projectCycle">
                            <el-date-picker v-model="form.time" @change="change" value-format="YYYY-MM-DD"
                                type="daterange" range-separator="-" start-placeholder="起始日期" end-placeholder="结束日期"
                                size="default" />
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
            <div class="right">
                <el-card shadow="hover">
                    <Search :searchType="1" :select="select" :userType="true" :submitStatus="submitStatus"
                        :buttonStatus="buttonStatus" :data="[]" :departmentSelect="[]"></Search>
                    <Table :userType="true" :loading="loading" :tableType="true" :tableData="tableData"
                        :handleDelete="handleDelete" :handleChange="handleChange">
                    </Table>
                    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfox.parameter.pageNum"
                        :options="eilnfox" :render="getProjectUsers">
                    </Pagination>
                </el-card>
            </div>
        </div>
    </el-card>
    <Dialog :success="success" :fileList="fileList" :userType="true" :handleEditT="handleEditT" :title="title"
        :dialogType="dialogType" :url="url" :url2="url2" :dialogVisible="dialogVisible"
        :departmentSelect="departmentSelect" :handleClose="handleClose">
    </Dialog>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, onMounted, reactive } from "vue";
import Dialog from './components/Dialog.vue'
import Project from './components/Project.vue';
import { project, EiInfo } from '@/types'
import Pagination from '@/components/Pagination.vue'//分页组件
import { piniaData } from '@/store';//引入pinia状态管理
import { beforeProjectUser, getProjectUser, deleteProjectUser, createProject } from '@/api/user'
import { ElNotification } from 'element-plus'

//pinia状态管理
const store = piniaData();
const fileList = ref([])
const form = reactive(new project)
const loading = ref(false)
const departmentSelect = ref([])
const tableData: any = ref([])
const dialogVisible = ref(false)
const dialogType = ref(1)
const buttonStatus = ref(true)
const submitStatus = ref(true)
const url = ref(`/assist/read/excel?userOnly=1&uploadUserId=${store.userInfo.id}`)
const url2 = ref(`/assist/upload/project/file/before/create?userInfoId=${store.userInfo.id}`)
const title = ref('')
const multiple: any = ref([])//多选选中内容
const params = reactive({
    pageNum: 1
})
const dataCount = ref(0);
//是否展示分页
const hide = ref(false);
//eilnfo格式参数
const eilnfox = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfox.parameter = params
onMounted(() => {
    getProjectUsers(eilnfox)
})
//文件导入成功
const success = () => {
    ElNotification({
        message: '导入成功！',
        type: 'success',
    })
    fileList.value = []
    dialogVisible.value = false
    getProjectUsers(eilnfox)
}
// 监听表格数据来开启提交按钮
watch(dataCount, (newValue, oldValue) => {
    submitStatus.value = newValue != 0 ? false : true
    buttonStatus.value = newValue != 0 ? false : true
})
// 移除按钮事件
const handleDelete = (i: any, row: any) => {
    ElMessageBox.confirm('确定移除选中项?')
        .then(() => {
            console.log(row.id);
            let eiInfo = new EiInfo
            eiInfo.parameter = {
                deleteUserId: row.id,
                deleteAll: 0
            }
            eiInfo.userInfo = {
                id: store.userInfo.id
            }
            deleteProjectUser(eiInfo).then((res) => {
                console.log(res);
                getProjectUsers(eilnfox)
            })
        }).catch(() => { })
}
// 多选框选中事件
const handleChange = (val: any) => {
    multiple.value = val
}
// 项目周期选择
const change = (val) => {
    if (!val) {
        form.workCycleStart = ""
        form.workCycleEnd = ""
    } else {
        form.workCycleStart = val[0]
        form.workCycleEnd = val[1]
    }
}
// 表格移除事件
const select = (i: any) => {
    switch (i) {
        case 1:
            dialogVisible.value = true
            dialogType.value = 2
            title.value = '选择安全教育人员'
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 1
            title.value = '模板导入安全教育人员'
            fileList.value = []
            console.log(fileList.value);

            break;
        case 3:
            ElMessageBox.confirm('确定全部移除?')
                .then(() => {
                    let eiInfo = new EiInfo
                    eiInfo.parameter = {
                        deleteUserId: 0,
                        deleteAll: 1
                    }
                    eiInfo.userInfo = {
                        id: store.userInfo.id
                    }
                    deleteProjectUser(eiInfo).then((res) => {
                        console.log(res);
                        getProjectUsers(eilnfox)
                    })
                }).catch(() => { })
            break;
        case 4:
            if (form.projectNumber == "" && form.contractNumber == "") {
                ElNotification({
                    message: '请将项目信息填写完整！',
                    type: 'warning',
                })
            } else {
                ElMessageBox.confirm('确定提交项目申报?')
                    .then(() => {
                        let eiInfo = new EiInfo
                        eiInfo.parameter = form
                        eiInfo.userInfo = {
                            id: store.userInfo.id
                        }
                        createProject(eiInfo).then((res) => {
                            ElNotification({
                                message: '项目创建成功',
                                type: 'success',
                            })
                            getProjectUsers(eilnfox)
                            // 清空表单
                            for (let i in form) { form[i] = '' }
                        })
                    }).catch(() => { })
            }
            break;
        case 5:
            dialogVisible.value = true
            dialogType.value = 3
            title.value = '上传附件'
            break;
    }
}
// 表单验证
const isForm = (obj) => {
    for (let key in obj) {
        if (!obj[key]) {
            return false
        }
    }
    return true
};
// 确认添加人员
const handleEditT = (val: any) => {
    if (val.length != 0) {
        let ids = val.map(item => item.id);
        let eiInfo = new EiInfo
        eiInfo.parameter = {
            userId: ids
        }
        eiInfo.userInfo = {
            id: store.userInfo.id
        }
        beforeProjectUser(eiInfo).then((res) => {
            console.log(res);
            eiInfo.parameter = {
                pageNum: 1
            }
            getProjectUsers(eilnfox)
        })
    }

    dialogVisible.value = false
}
// 查询已选择或已导入的人员
const getProjectUsers = (eilnfox: any) => {
    loading.value = true
    eilnfox.userInfo = {
        id: store.userInfo.id
    }
    getProjectUser(eilnfox).then((res: any) => {
        setTimeout(() => {
            loading.value = false
            //将用户信息列表数据传入子组件
            tableData.value = res.result.result == undefined ? [] : res.result.result
            // 分页总页数
            dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
            // 如果只有一页则不展示分页
            hide.value = dataCount.value < 11 ? false : true
        }, 500)
    })
}
// 关闭Dialog
const handleClose = () => {
    ElMessageBox.confirm('确定取消导入?')
        .then(() => {
            dialogVisible.value = false
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style scoped >
.left {
    width: 22%;
}

.right {
    width: 75%;
    float: right;
}

.box {
    justify-content: space-between;
    display: flex;
}

:deep(.el-step.is-simple:not(:last-of-type) .el-step__title) {
    width: 100% !important;
}

:deep(.el-step.is-simple .el-step__title) {
    font-size: 14px;
}
</style>
