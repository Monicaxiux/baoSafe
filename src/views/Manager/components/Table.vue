<template>
    <div>
        <el-table border v-loading="loading" max-height="650" :data="tableData" class="tablex">
            <el-table-column prop="icCardWorkNumber" label="工号" />
            <el-table-column prop="username" label="员工姓名" />
            <el-table-column prop="authAreaList[0].name" label="权限区域" />
            <el-table-column label="当前权限" prop="userAuth"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
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
    loading: boolean,
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">
</style>