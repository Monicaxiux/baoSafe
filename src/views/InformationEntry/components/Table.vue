<template>
    <div>
        <el-table border v-loading="loading" max-height="620" :data="tableData" class="tablex">
            <el-table-column prop="userType" label="人员类型" width="100" />
            <el-table-column prop="company" label="所在公司" width="200" />
            <el-table-column prop="department" label="所在部门" width="200" />
            <el-table-column prop="factory" label="所在分厂" width="200" />
            <el-table-column prop="recentJob" label="当前岗位" width="220" />
            <el-table-column prop="username" label="员工姓名" width="90" />
            <el-table-column prop="workNumber" label="IC卡号" />
            <el-table-column label="IC卡照片" width="90">
                <template #default="scope">
                    <MyImg :imgUrl="scope.row.icPic"></MyImg>
                </template>
            </el-table-column>
            <el-table-column label="个人照片" width="90">
                <template #default="scope">
                    <MyImg :imgUrl="scope.row.userPic"></MyImg>
                </template>
            </el-table-column>
            <el-table-column prop="enterFactoryYear" label="进厂年" />
            <el-table-column prop="enterFactoryMonth" label="进厂月" />
            <el-table-column label="一级安全教育级别">
                <el-table-column prop="safeEdu1.trainStartDate" width="110" label="培训开始日期">
                </el-table-column>
                <el-table-column prop="safeEdu1.trainEndDate" width="110" label="培训结束日期">
                </el-table-column>
                <el-table-column prop="safeEdu1.examDate" width="110" label="考试时间">
                </el-table-column>
                <el-table-column prop="safeEdu1.examScore" label="考试成绩" width="80">
                </el-table-column>
                <el-table-column prop="safeEdu1.chiefExaminer" label="主考人" width="80">
                </el-table-column>
            </el-table-column>
            <el-table-column label="二级安全教育级别">
                <el-table-column prop="safeEdu2.trainStartDate" width="110" label="培训开始日期">
                </el-table-column>
                <el-table-column prop="safeEdu2.trainEndDate" width="110" label="培训结束日期">
                </el-table-column>
                <el-table-column prop="safeEdu2.examDate" width="110" label="考试时间">
                </el-table-column>
                <el-table-column prop="safeEdu2.examScore" label="考试成绩" width="80">
                </el-table-column>
                <el-table-column prop="safeEdu2.chiefExaminer" label="主考人" width="80">
                </el-table-column>
            </el-table-column>
            <el-table-column label="三级安全教育级别">
                <el-table-column prop="safeEdu3.trainStartDate" width="110" label="培训开始日期">
                </el-table-column>
                <el-table-column prop="safeEdu3.trainEndDate" width="110" label="培训结束日期">
                </el-table-column>
                <el-table-column prop="safeEdu3.examDate" width="110" label="考试时间">
                </el-table-column>
                <el-table-column prop="safeEdu3.examScore" label="考试成绩" width="80">
                </el-table-column>
                <el-table-column prop="safeEdu3.chiefExaminer" label="主考人" width="80">
                </el-table-column>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">

                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'
import { Delete, EditPen } from '@element-plus/icons-vue'//引入elementui 图标

// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    loading: boolean,
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">
</style>