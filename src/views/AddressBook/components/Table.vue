<template>
    <div>
        <el-table v-loading="loading" :data="tableData" class="tablex">
            <template v-if="userType">
                <el-table-column fixed prop="assistCompany" label="协力单位" width="200" />
                <el-table-column prop="actualCompany" label="所在单位" width="200" />
                <el-table-column prop="icCardWorkNumber" label="IC工号" width="170" />
                <el-table-column prop="username" label="员工姓名" width="100" />
                <el-table-column label="个人照片" width="90">
                    <template #default="scope">
                        <MyImg :imgUrl="scope.row.userPic"></MyImg>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" />
                <el-table-column prop="age" label="年龄" />
            </template>
            <template v-if="!userType">
                <el-table-column fixed prop="baoCompany" label="所在公司" width="200" />
                <el-table-column prop="baoDepartment" label="所在部门" width="200" />
                <el-table-column prop="baoFactory" label="所在分厂" width="170" />
                <el-table-column prop="recentJob" label="当前岗位" width="220" />
                <el-table-column prop="icCardWorkNumber" label="工号" width="100" />
                <el-table-column prop="username" label="员工姓名" width="100" />
                <el-table-column label="个人照片" width="90">
                    <template #default="scope">
                        <MyImg :imgUrl="scope.row.userPic"></MyImg>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100" />
                <el-table-column prop="age" label="年龄" width="100" />
                <el-table-column prop="phone" label="联系电话" width="150" />
                <el-table-column prop="enterFactoryYear" label="进厂年" width="100" />
                <el-table-column prop="enterFactoryMonth" label="进厂月" width="100" />
                <el-table-column prop="manageArea" label="所在区域" width="100" />
            </template>
            <!-- <el-table-column label="特种作业证">
                <el-table-column prop="licenseList[0].licenseNumber" label="证书编号" width="200" />
                <el-table-column prop="licenseList[0].licenseName" label="证书名称" width="200" />
                <el-table-column prop="licenseList[0].receiveDate" label="取证日期" width="110" />
                <el-table-column prop="licenseList[0].expiryTime" label="复证日期" width="110" />
                <el-table-column prop="licenseList[0].restoreDate" label="到期日期" width="110" />
                <el-table-column label="证书照片" width="90">
                    <template #default="scope">
                        <MyImg v-if="scope.row.licenseList.length != 0" :imgUrl="scope.row.licenseList[0].licensePic">
                        </MyImg>
                    </template>
                </el-table-column>
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'
import { Delete, EditPen } from '@element-plus/icons-vue'//引入elementui 图标

// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    handleEdit: Function,//编辑
    handleDelete: Function,//删除
    loading: boolean,
    userType: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">
</style>