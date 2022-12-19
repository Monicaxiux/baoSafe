<template>
    <div>
        <el-table v-loading="loading" max-height="650" :data="tableData" class="tablex">
            <template v-if="!userType">
                <!-- <el-table-column fixed prop="baoCompany" label="公司" width="160" /> -->
                <!-- <el-table-column prop="baoDepartment" label="所在部门" width="160" /> -->
                <!-- <el-table-column prop="baoFactory" label="所在分厂" /> -->
                <!-- <el-table-column prop="recentJob" label="当前岗位" /> -->
                <el-table-column prop="icCardWorkNumber" label="工号" />
                <el-table-column prop="username" label="员工姓名" width="100" />
                <el-table-column label="安全教育">
                    <el-table-column prop="safetyEducation.safeLevel" label="教育等级" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.chiefExaminer" label="教育人" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.chiefExaminerPhone" label="联系电话" width="110">
                    </el-table-column>
                    <el-table-column prop="safetyEducation.examScore" label="考试分数" width="110">
                    </el-table-column>
                    <el-table-column prop="safetyEducation.examDate" label="考试日期" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.trainStartDate" label="开始日期" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.trainEndDate" label="结束日期" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.checkStatus" label="状态" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.manageArea" label="区域" width="110"></el-table-column>
                </el-table-column>
            </template>
            <template v-if="userType">
                <el-table-column fixed prop="assistCompany" label="协力公司" width="140" />
                <el-table-column fixed prop="projectNumber" label="项目编号" width="140" />
                <el-table-column prop="projectName" label="项目名称" width="440" />
                <el-table-column prop="projectType" label="项目类型" width="140" />
                <el-table-column prop="safetyEducationCharge" label="负责人" width="140" />
                <el-table-column prop="projectCreateTime" label="项目创建时间" width="260" />
                <el-table-column prop="safeStatus" label="项目状态" width="140" />
                <el-table-column prop="workCycle" label="项目周期" width="260" />
                <el-table-column prop="contactPerson" label="联系人" width="140" />
                <el-table-column label="安全教育">
                    <el-table-column prop="safetyEducation.safeLevel" label="教育等级" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.eduDate" label="教育时间" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.eduPerson" label="教育人" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.eduPersonPhone" label="联系电话" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.manageArea" label="区域" width="110"></el-table-column>
                    <el-table-column prop="safetyEducation.checkStatus" label="状态" width="110"></el-table-column>
                </el-table-column>
            </template>
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button size="small" v-if="scope.row.safetyEducation.checkStatus != '通过'" type="primary"
                        @click="approval(scope.$index, scope.row)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        审批
                    </el-button>
                    <el-button size="small"
                        v-if="scope.row.safetyEducation.safeLevel == '三级安全教育' && scope.row.safetyEducation.checkStatus == '通过'"
                        type="primary" @click="getQrCode(scope.$index, scope.row)">
                        <el-icon>
                            <Picture />
                        </el-icon>
                        二维码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { Delete, EditPen, Picture } from '@element-plus/icons-vue'//引入elementui 图标
// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    loading: boolean,
    getQrCode: Function,
    approval: Function,
    userType: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">

</style>