<template>
    <div>
        <el-table v-loading="loading" :max-height="tableType ? 530 : 400" :row-key="getRowKeys" ref="multipleTableRef"
            :data="tableData" @selection-change="handleChange" class="tablex">
            <el-table-column :label="tableType ? '安全教育保卫名单' : '员工清单'">
                <el-table-column type="selection" v-if="!tableType" reserve-selection width="55" />
                <template v-if="!userType">
                    <el-table-column fixed prop="baoCompany" label="所在公司" width="220" />
                    <el-table-column prop="baoDepartment" label="所在部门" width="220" />
                    <el-table-column prop="baoFactory" label="所在分厂" width="170" />
                    <el-table-column prop="recentJob" label="当前岗位" width="220" />
                </template>
                <template v-if="userType">
                    <el-table-column fixed prop="assistCompany" label="协力单位" width="240" />
                    <!-- <el-table-column prop="actualCompany" label="所在单位" width="240" /> -->
                </template>
                <el-table-column prop="icCardWorkNumber" :label="userType ? 'IC卡号' : '工号'" width="200" />
                <el-table-column prop="username" label="员工姓名" />
                <!-- <el-table-column prop="sex" label="性别" width="60" /> -->
                <!-- <el-table-column prop="age" label="年龄" /> -->
                <el-table-column v-if="tableType" fixed="right" label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { Delete, EditPen } from '@element-plus/icons-vue'//引入elementui 图标
const getRowKeys = (row) => {//记录每行的key值
    return row.id;//id 自己查看 row 里的数据 
}
// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    handleDelete: any,//删除
    handleChange: any,
    tableType: boolean,
    loading: boolean,
    userType: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">

</style>