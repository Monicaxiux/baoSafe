<template>
    <div>
        <el-table v-loading="loading" max-height="650" :data="tableData" class="tablex">
            <el-table-column fixed prop="baoCompany" label="人员类型" width="200" />
            <el-table-column fixed prop="baoCompany" label="所在公司" width="200" />
            <el-table-column prop="baoDepartment" label="所在部门" width="200" />
            <el-table-column prop="baoFactory" label="所在分厂" width="170" />
            <el-table-column prop="recentJob" label="当前岗位" width="220" />
            <el-table-column prop="icCardWorkNumber" label="工号" width="100" />
            <el-table-column prop="username" label="员工姓名" width="100" />
            <el-table-column prop="enterFactoryYear" label="进厂年" width="100" />
            <el-table-column prop="enterFactoryMonth" label="进厂月" width="100" />
            <el-table-column label="一级安全教育">
                <el-table-column prop="trainStartDate" label="培训起始日期" width="110"></el-table-column>
                <el-table-column prop="trainEndDate" label="培训结束日期" width="110"></el-table-column>
                <el-table-column prop="examDate" label="考试时间" width="110"></el-table-column>
                <el-table-column prop="examScore" label="考试成绩" width="90"></el-table-column>
                <el-table-column prop="chiefExaminer" label="主考人" width="70"></el-table-column>
                <el-table-column prop="chiefExaminerPhone" label="联系方式" width="110"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" width="90"></el-table-column>
                <el-table-column prop="checkStatus" label="区域" width="90"></el-table-column>
                <el-table-column label="考卷照片" width="90">
                    <template #default="scope">
                        <MyImg :imgUrl="scope.row.examPaper"></MyImg>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="二级安全教育">
                <el-table-column prop="trainStartDate" label="培训起始日期" width="110"></el-table-column>
                <el-table-column prop="trainEndDate" label="培训结束日期" width="110"></el-table-column>
                <el-table-column prop="examDate" label="考试时间" width="110"></el-table-column>
                <el-table-column prop="examScore" label="考试成绩" width="90"></el-table-column>
                <el-table-column prop="chiefExaminer" label="主考人" width="70"></el-table-column>
                <el-table-column prop="chiefExaminerPhone" label="联系方式" width="110"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" width="90"></el-table-column>
                <el-table-column prop="checkStatus" label="区域" width="90"></el-table-column>
                <el-table-column label="考卷照片" width="90">
                    <template #default="scope">
                        <MyImg :imgUrl="scope.row.examPaper"></MyImg>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="三级安全教育">
                <el-table-column prop="trainStartDate" label="培训起始日期" width="110"></el-table-column>
                <el-table-column prop="trainEndDate" label="培训结束日期" width="110"></el-table-column>
                <el-table-column prop="examDate" label="考试时间" width="110"></el-table-column>
                <el-table-column prop="examScore" label="考试成绩" width="90"></el-table-column>
                <el-table-column prop="chiefExaminer" label="主考人" width="70"></el-table-column>
                <el-table-column prop="chiefExaminerPhone" label="联系方式" width="110"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" width="90"></el-table-column>
                <el-table-column prop="checkStatus" label="区域" width="90"></el-table-column>
                <el-table-column label="考卷照片" width="90">
                    <template #default="scope">
                        <MyImg :imgUrl="scope.row.examPaper"></MyImg>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'

// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    loading: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">
</style>