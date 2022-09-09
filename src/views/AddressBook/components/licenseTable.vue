<template>
    <el-table :data="licenseData" class="tablex">
        <el-table-column prop="licenseNumber" label="证书编号" width="200" />
        <el-table-column prop="licenseName" label="证书名称" width="200" />
        <el-table-column prop="receiveDate" label="取证日期" width="110" />
        <el-table-column prop="expiryTime" label="复证日期" width="110" />
        <el-table-column prop="restoreDate" label="到期日期" width="110" />
        <el-table-column label="证书照片" width="90">
            <template #default="scope">
                <MyImg :imgUrl="scope.row.licensePic">
                </MyImg>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
                <el-button size="small" type="primary" @click="licenseEdit(scope.$index, scope.row)">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    编辑
                </el-button>
                <el-button size="small" type="danger" @click="licenseDelete(scope.$index, scope.row)">
                    <el-icon>
                        <Delete />
                    </el-icon>
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'
import { Delete, EditPen } from '@element-plus/icons-vue'//引入elementui 图标

// 定义Props默认数据类型
type Props = {
    licenseData: Array<any>,//表格数据
    licenseEdit: Function,//编辑
    licenseDelete: Function,//删除
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped>
</style>