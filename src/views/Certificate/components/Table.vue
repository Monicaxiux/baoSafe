<template>
    <div>
        <el-table border v-loading="loading" max-height="600" :data="tableData" class="tablex">
            <el-table-column prop="username" label="员工姓名" width="90" />
            <el-table-column prop="icCardWorkNumber" label="IC卡号" />
            <el-table-column prop="licenseName" label="证书名称" />
            <el-table-column prop="licenseNumber" label="证书编号" />
            <el-table-column prop="licenseType" label="证书类型" width="200" />
            <el-table-column prop="receiveDate" label="取证日期" width="110" />
            <el-table-column prop="restoreDate" label="复证日期" width="110" />
            <el-table-column prop="expiryDate" label="到期日期" width="110" />
            <el-table-column label="证书照片" width="90">
                <template #default="scope">
                    <MyImg :imgUrl="scope.row.licensePic[0]"></MyImg>
                </template>
            </el-table-column>
            <el-table-column v-if="type" label="操作" width="190">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row, 1)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row, 2)">
                        历史记录
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
    loading: boolean,
    handleEdit: any,
    type: any
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">

</style>