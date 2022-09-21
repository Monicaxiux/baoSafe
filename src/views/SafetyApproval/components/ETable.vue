<template>
    <div>
        <el-table v-loading="loading" max-height="450" :data="tableData" class="tablex">
            <el-table-column fixed prop="assistCompany" label="单位" />
            <el-table-column fixed prop="username" label="姓名" width="160" />
            <el-table-column prop="sex" label="性别" width="160" />
            <el-table-column prop="age" label="年龄" width="140" />
            <el-table-column prop="icCardWorkNumber" label="IC卡号" width="200" />
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