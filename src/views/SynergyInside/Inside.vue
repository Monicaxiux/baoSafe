<template>
     <el-button @click="select()" type="primary">
            <el-icon>
                <FolderOpened />
            </el-icon>
            上传表格
        </el-button>
        <br>
        <br>
        <el-table border max-height="620" :data="tableData" class="tablex">
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
        </el-table>
        <el-dialog v-model="dialogVisible" title="上传表格" width="20%">
        <el-card class="card" shadow="never">
            <br>
            <UploadFile :dialogType="1" :success="success" url=""></UploadFile>
            <el-button @click="download">示例模板</el-button>
            <br><br><br>
            <el-card style="width:100%" shadow="hover">
                <h3>提交步骤</h3>
                <br />
                <div class="uploadTS">
                    <b style="color: black">1.请下载示例模板按照规范上传</b><br />
                    <b style="color: black">2.上传后请确认信息正确无误，再点击确认提交</b><br />
                    <b>注意：只能上传xlsx/xls文件，且不超过500mb</b>
                    <br />
                </div>
            </el-card>
        </el-card>
    </el-dialog>
</template>
<script lang="ts" setup>
import { FolderOpened } from '@element-plus/icons-vue'//引入elementui 图标
import { ref } from 'vue';
import UploadFile from '@/components/UploadFile.vue'
import { ElNotification } from 'element-plus'
const dialogVisible=ref(false);
const select=()=>{
    dialogVisible.value=true
}
const tableData=ref([])
const success=()=>{

}
const download=()=>{
    ElNotification({
        message: "正在下载示例模板，请稍等...",
        type: 'success',
    }),
        window.location.href =
        "https://safeedu.bnasafe.com/download/assist/excel";
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.uploadTS {
    font-size: 12px;
    line-height: 160%;
    color: red;
    text-align: left;
}

.card {
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>