<template>
    <div style="margin-bottom: 20px">
        <div v-if="searchType == 1">
            <el-steps v-if="!userType" :space="500" :active="1" simple>
                <el-step title="步骤1：系统导入 | 模板导入" />
                <el-step title="步骤2：确认安全教育名单" />
                <el-step title="步骤3：提交申报" />
            </el-steps>
            <br v-if="!userType">
            <el-button v-if="!userType" @click="select(1)" type="primary">
                <i class="iconfont icon-iconfonticon02"></i>
                系统导入
            </el-button>
            <el-button v-if="userType" @click="select(2)" type="primary">
                <el-icon>
                    <FolderOpened />
                </el-icon>
                模板导入
            </el-button>
            <el-button @click="select(3)" :disabled="buttonStatus" type="danger">
                <el-icon>
                    <Delete />
                </el-icon>
                全部移除
            </el-button>
            <el-button @click="select(4)" :disabled="submitStatus" type="primary">
                <el-icon>
                    <Check />
                </el-icon>
                提交申报
            </el-button>
        </div>
        <el-form v-if="searchType == 2" :model="data.parameter" status-icon class="demo-ruleForm from">
            <el-form-item v-if="!userType" label="部门">
                <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                    v-model="data.parameter.baoDepartment" placeholder="请选择部门">
                    <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId"
                        :label="item.baoDepartmentName" :value="item.baoDepartmentId" />
                </el-select>
            </el-form-item>
            <el-form-item label="协力单位" v-if="userType">
                <el-input class="input" v-model="data.parameter.assistCompany" clearable placeholder="请输入协力单位" />
            </el-form-item>
            <el-form-item label="工号">
                <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入工号" />
            </el-form-item>
            <el-form-item label="员工姓名">
                <el-input class="input" v-model="data.parameter.username" clearable placeholder="请输入员工姓名" />
            </el-form-item>
            <el-button type="primary" class="button" @click="(data.parameter.pageNum = 1), select(data)">
                <el-icon class="i">
                    <Search />
                </el-icon>查询
            </el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { Search, Delete, FolderOpened, Check, EditPen } from '@element-plus/icons-vue'//引入elementui 图标
import { piniaData } from '@/store';//引入pinia状态管理
//pinia状态管理
const store = piniaData();
// 定义Props默认数据类型
type Props = {
    select: Function,
    buttonStatus: boolean,
    submitStatus: boolean,
    searchType: number,
    data: any,
    departmentSelect: any,
    userType: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>

<style scoped>
.input {
    width: 150px;
    margin-right: 20px;
}

.from {
    display: flex;
}

.el-steps--simple {
    padding: 11px 30px;
}

:deep(.el-step.is-simple:not(:last-of-type) .el-step__title) {
    width: 100% !important;
}

:deep(.el-step.is-simple .el-step__title) {
    font-size: 14px;
}
</style>