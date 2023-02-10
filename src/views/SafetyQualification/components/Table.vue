<template>
    <div>
        <el-table v-if="userType" v-loading="loading" max-height="650" :data="tableData" class="tablex">
            <!-- <el-table-column fixed prop="userType" label="人员类型" width="200" /> -->
            <!-- <el-table-column fixed prop="baoCompany" label="公司" width="200" /> -->
            <!-- <el-table-column prop="baoDepartment" label="所在部门" width="200" /> -->
            <!-- <el-table-column prop="baoFactory" label="所在分厂" width="170" /> -->
            <!-- <el-table-column prop="recentJob" label="当前岗位" width="220" /> -->
            <el-table-column prop="icCardWorkNumber" label="工号" width="100" />
            <el-table-column prop="username" label="员工姓名" width="100" />
            <!-- <el-table-column prop="enterFactoryYear" label="进厂年" width="100" /> -->
            <!-- <el-table-column prop="enterFactoryMonth" label="进厂月" width="100" /> -->
            <el-table-column label="一级安全教育">
                <el-table-column prop="safeEdu1.trainStartDate" label="培训起始日期" width="110"></el-table-column>
                <el-table-column prop="safeEdu1.trainEndDate" label="培训结束日期" width="110"></el-table-column>
                <el-table-column prop="safeEdu1.examDate" label="考试时间" width="110"></el-table-column>
                <el-table-column prop="safeEdu1.examScore" label="考试成绩" width="90"></el-table-column>
                <el-table-column prop="safeEdu1.chiefExaminer" label="主考人" width="70"></el-table-column>
                <el-table-column prop="safeEdu1.chiefExaminerPhone" label="联系方式" width="110"></el-table-column>
                <el-table-column prop="safeEdu1.checkStatus" label="审批状态" width="90"></el-table-column>
                <el-table-column prop="safeEdu1.manageArea" label="区域" width="90"></el-table-column>
                <el-table-column label="考卷照片" width="90">
                    <template #default="scope">
                        <!-- <MyImg v-if="scope.row.safeEdu1 != null" :imgUrl="scope.row.safeEdu1.examPaper[0]"></MyImg> -->
                        <el-button v-if="scope.row.safeEdu1.examPaper != '' && scope.row.safeEdu1.examPaper"
                            @click="licenseEdit(scope.row.safeEdu1.examPaper)" size="small" type="primary" plain>查看考卷
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="二级安全教育">
                <el-table-column prop="safeEdu2.trainStartDate" label="培训起始日期" width="110"></el-table-column>
                <el-table-column prop="safeEdu2.trainEndDate" label="培训结束日期" width="110"></el-table-column>
                <el-table-column prop="safeEdu2.examDate" label="考试时间" width="110"></el-table-column>
                <el-table-column prop="safeEdu2.examScore" label="考试成绩" width="90"></el-table-column>
                <el-table-column prop="safeEdu2.chiefExaminer" label="主考人" width="70"></el-table-column>
                <el-table-column prop="safeEdu2.chiefExaminerPhone" label="联系方式" width="110"></el-table-column>
                <el-table-column prop="safeEdu2.checkStatus" label="审批状态" width="90"></el-table-column>
                <el-table-column prop="safeEdu2.manageArea" label="区域" width="90"></el-table-column>
                <el-table-column label="考卷照片" width="90">
                    <template #default="scope">
                        <!-- <MyImg v-if="scope.row.safeEdu2 != null" :imgUrl="scope.row.safeEdu2.examPaper[0]"></MyImg> -->
                        <el-button v-if="scope.row.safeEdu2.examPaper != '' && scope.row.safeEdu2.examPaper"
                            @click="licenseEdit(scope.row.safeEdu2.examPaper)" size="small" type="primary" plain>查看考卷
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="三级安全教育">
                <el-table-column prop="safeEdu3.trainStartDate" label="培训起始日期" width="110"></el-table-column>
                <el-table-column prop="safeEdu3.trainEndDate" label="培训结束日期" width="110"></el-table-column>
                <el-table-column prop="safeEdu3.examDate" label="考试时间" width="110"></el-table-column>
                <el-table-column prop="safeEdu3.examScore" label="考试成绩" width="90"></el-table-column>
                <el-table-column prop="safeEdu3.chiefExaminer" label="主考人" width="70"></el-table-column>
                <el-table-column prop="safeEdu3.chiefExaminerPhone" label="联系方式" width="110"></el-table-column>
                <el-table-column prop="safeEdu3.checkStatus" label="审批状态" width="90"></el-table-column>
                <el-table-column prop="safeEdu3.manageArea" label="区域" width="90"></el-table-column>
                <el-table-column label="考卷照片" width="90">
                    <template #default="scope">
                        <!-- <MyImg v-if="scope.row.safeEdu3 != null" :imgUrl="scope.row.safeEdu3.examPaper[0]"></MyImg> -->
                        <el-button v-if="scope.row.safeEdu3.examPaper != '' && scope.row.safeEdu3.examPaper"
                            @click="licenseEdit(scope.row.safeEdu3.examPaper)" size="small" type="primary" plain>查看考卷
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-table v-if="!userType" v-loading="loading" max-height="820" :data="tableData" border style="width: 100%">
            <el-table-column label="项目及安全教育信息" width="50">
                <el-table-column type="expand">
                    <template #default="propsx">
                        <div m="4">
                            <el-table :data="propsx.row.safeEdu1List" border>
                                <el-table-column width="50"></el-table-column>
                                <el-table-column label="一级安全教育">
                                    <el-table-column type="expand">
                                        <template #default="props">
                                            <div m="4">
                                                <el-table :data="props.row.safeEdu2List" border>
                                                    <el-table-column width="50"></el-table-column>
                                                    <el-table-column width="50"></el-table-column>
                                                    <el-table-column label="二级安全教育">
                                                        <el-table-column type="expand">
                                                            <template #default="props">
                                                                <div m="4">
                                                                    <el-table :data="props.row.safeEdu3List" border>
                                                                        <el-table-column width="50"></el-table-column>
                                                                        <el-table-column width="50"></el-table-column>
                                                                        <el-table-column width="50"></el-table-column>
                                                                        <el-table-column label="三级安全教育">
                                                                            <el-table-column label="教育时间"
                                                                                prop="eduDate" />
                                                                            <el-table-column label="教育人"
                                                                                prop="eduPerson" />
                                                                            <el-table-column label="联系电话"
                                                                                prop="eduPersonPhone" />
                                                                            <el-table-column label="所在区域"
                                                                                prop="manageArea" />
                                                                            <el-table-column label="状态"
                                                                                prop="checkStatus" />
                                                                            <el-table-column label="操作">
                                                                                <template #default="props">
                                                                                    <el-button
                                                                                        v-if="props.row.eduDate != '' && props.row.filePic.length != 0"
                                                                                        @click="licenseEdit(props.$index, props.row, 2)"
                                                                                        size="small" type="primary"
                                                                                        plain>查看附件
                                                                                    </el-button>

                                                                                    <el-button
                                                                                        v-if="props.row.checkStatus == '待审批'"
                                                                                        @click="licenseEdit(props.$index, props.row, 7, propsx.row)"
                                                                                        size="small" type="danger"
                                                                                        plain>撤销
                                                                                    </el-button>

                                                                                </template>
                                                                            </el-table-column>
                                                                        </el-table-column>
                                                                    </el-table>
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column label="教育时间" prop="eduDate" />
                                                        <el-table-column label="教育人" prop="eduPerson" />
                                                        <el-table-column label="联系电话" prop="eduPersonPhone" />
                                                        <el-table-column label="所在区域" prop="manageArea" />
                                                        <el-table-column label="状态" prop="checkStatus" />
                                                        <el-table-column label="操作">
                                                            <template #default="props">
                                                                <el-button
                                                                    @click="licenseEdit(props.$index, props.row, 2)"
                                                                    v-if="props.row.eduDate != '' && props.row.filePic.length != 0"
                                                                    type="primary" size="small" plain>查看附件
                                                                </el-button>
                                                                <el-button v-if="props.row.checkStatus == '已通过'"
                                                                    @click="licenseEdit(props.$index, props.row, 8, propsx.row, 3)"
                                                                    size="small" type="primary" plain>申报其他区域
                                                                </el-button>
                                                                <el-button v-if="props.row.checkStatus == '待审批'"
                                                                    @click="licenseEdit(props.$index, props.row, 7, propsx.row)"
                                                                    size="small" type="danger" plain>撤销
                                                                </el-button>

                                                            </template>
                                                        </el-table-column>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="教育时间" prop="eduDate" />
                                    <el-table-column label="教育人" prop="eduPerson" />
                                    <el-table-column label="联系电话" prop="eduPersonPhone" />
                                    <el-table-column label="所在区域" prop="manageArea" />
                                    <el-table-column label="状态" prop="checkStatus" />
                                    <el-table-column label="操作">
                                        <template #default="props">
                                            <el-button v-if="props.row.eduDate != '' && props.row.filePic.length != 0"
                                                @click="licenseEdit(props.$index, props.row, 2)" type="primary"
                                                size="small" plain>查看附件</el-button>
                                            <el-button v-if="props.row.checkStatus == '已通过'"
                                                @click="licenseEdit(props.$index, props.row, 8, propsx.row, 2)"
                                                size="small" type="primary" plain>申报其他区域
                                            </el-button>
                                            <el-button v-if="props.row.checkStatus == '待审批'"
                                                @click="licenseEdit(props.$index, props.row, 7, propsx.row)"
                                                size="small" type="danger" plain>撤销
                                            </el-button>

                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="项目编号" prop="projectNumber" />
                <el-table-column label="项目名称" prop="projectName" />
                <el-table-column label="协力单位" prop="assistCompany" />
                <el-table-column label="负责人" prop="safetyEducationCharge" />
                <el-table-column label="创建时间" prop="createDate" />
                <el-table-column label="开始时间" prop="workCycleStart" />
                <el-table-column label="结束时间" prop="workCycleEnd" />
                <el-table-column label="操作" width="460">
                    <template #default="scope">
                        <el-button class="bt" size="small" type="primary"
                            @click="licenseEdit(scope.$index, scope.row, 4)">
                            查看人员
                        </el-button>
                        <el-button class="bt" size="small" type="primary"
                            @click="licenseEdit(scope.$index, scope.row, 1)">
                            审批登记表
                        </el-button>
                        <el-button class="bt" size="small" type="primary"
                            @click="licenseEdit(scope.$index, scope.row, 5)">
                            人员名单
                        </el-button>
                        <el-button class="bt" v-if="scope.row.filesPath.length != 0" size="small" type="primary"
                            @click="licenseEdit(scope.$index, scope.row, 3)">
                            下载附件
                        </el-button>
                        <el-button class="bt" size="small" v-if="scope.row.safeStatus == 2" type="primary"
                            @click="getQrCode(scope.$index, scope.row)">
                            <el-icon>
                                <Picture />
                            </el-icon>
                            二维码
                        </el-button>
                        <el-button class="bt" size="small" type="danger"
                            @click="licenseEdit(scope.$index, scope.row, 6)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'
import { Delete, EditPen, Picture } from '@element-plus/icons-vue'//引入elementui 图标

// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    loading: boolean,
    userType: boolean,
    getQrCode: Function,
    licenseEdit: any
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped>
:deep(.el-table thead) {
    color: #323232;
}

.bt {
    margin: 5px;
}

@media screen and (max-width: 1500px) {
    .tablex {
        max-height: 60vh;
        height: 60vh;
        width: 100%;
        overflow-y: auto;
    }
}

@media screen and (min-width: 1500px) {
    .tablex {
        max-height: 70vh;
        height: 70vh;
        overflow-y: auto;
        width: 100%;
    }
}
</style>