<template>
    <div>
        <el-table v-loading="loading" :data="tableData" class="tablex">
            <template v-if="!userType && userx == 1">
                <!-- <el-table-column fixed prop="baoCompany" label="公司" width="200" /> -->
                <el-table-column prop="baoDepartment" label="所在部门" width="200" />
                <el-table-column prop="baoFactory" label="所在分厂" width="170" />
                <el-table-column prop="icCardWorkNumber" label="工号" />
                <el-table-column prop="recentJob" label="当前岗位" width="220" />
                <el-table-column prop="enterFactoryYear" label="进厂年" width="100" />
                <el-table-column prop="enterFactoryMonth" label="进厂月" width="100" />
                <el-table-column prop="manageArea" label="所在区域" width="100" />
            </template>
            <template v-if="userx == 2">
                <el-table-column fixed prop="assistCompany" label="协力公司" width="230" />
                <el-table-column prop="icCardWorkNumber" label="IC卡号/身份证号" />

            </template>
            <el-table-column prop="username" label="员工姓名" width="100" />
            <el-table-column label="个人照片" width="90">
                <template #default="scope">
                    <MyImg :imgUrl="scope.row.userPic"></MyImg>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="100" />
            <el-table-column prop="age" label="年龄" width="100" />
            <el-table-column prop="phone" label="联系电话" />

            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <el-button size="small"
                        :disabled="scope.row.username == 'admin0' || scope.row.username == 'admin1' || scope.row.username == 'admin2' || scope.row.username == 'admin3'"
                        type="primary" @click="handleEdit(scope.$index, scope.row)">
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
    userType: boolean,
    userx: number
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css"></style>