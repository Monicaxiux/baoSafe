<template>
    <div>
        <el-table v-loading="loading" max-height="450" :data="tableData" class="tablex">
            <el-table-column fixed prop="assistCompany" label="单位" width="140" />
            <el-table-column fixed prop="username" label="姓名" width="160" />
            <el-table-column prop="sex" label="性别" width="160" />
            <el-table-column prop="age" label="年龄" width="140" />
            <el-table-column prop="icCardWorkNumber" label="IC卡号" width="200" />
            <el-table-column prop="currentCheckStatus" label="当前状态"></el-table-column>
            <el-table-column prop="safetyCheckStatus1" label="一级审批"></el-table-column>
            <el-table-column prop="safetyCheckStatus2" label="二级审批"></el-table-column>
            <el-table-column prop="safetyCheckStatus3" label="三级审批"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">

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
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">
</style>