<template>
    <el-table :data="tableData" max-height="700" :row-key="getRowKeys" ref="multipleTableRef" border v-loading="loading"
        class="tablex" @selection-change="handleChange">
        <template v-if="tableType">
            <el-table-column type="selection" v-if="tableType" reserve-selection width="55" />
            <el-table-column fixed label="状态" width="100">
                <template #default="scope">
                    <el-tag size="large" v-if="scope.row.expiryStatus == 1" class="ml-2" type="warning">快过期</el-tag>
                    <el-tag size="large" v-if="scope.row.expiryStatus == 2" class="ml-2" type="danger">已过期</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="员工姓名" width="130" />
            <el-table-column prop="icCardWorkNumber" label="IC工号" width="200" />
            <el-table-column prop="licenseNumber" label="证书编号" width="280" />
            <el-table-column prop="licenseName" label="证书名称" width="280" />
            <el-table-column prop="receiveDate" label="取证日期" width="110" />
            <el-table-column prop="expiryTime" label="复证日期" width="130" />
            <el-table-column prop="restoreDate" label="到期日期" width="130" />
            <el-table-column label="证书照片" width="90">
                <template #default="scope">
                    <MyImg :imgUrl="scope.row.licensePic"></MyImg>
                </template>
            </el-table-column>
        </template>
        <!-- <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
                <el-button size="small" type="primary" @click="license(scope.$index, scope.row)">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    确认
                </el-button>
            </template>
        </el-table-column> -->
    </el-table>
</template>
<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'
import { Delete, EditPen } from '@element-plus/icons-vue'//引入elementui 图标
const getRowKeys = (row) => {//记录每行的key值
    return row.licenseId;//id 自己查看 row 里的数据 
}
// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    license: Function,//确认
    tableType: boolean,
    loading: boolean,
    multipleSelection: any
    handleChange: Function,
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
//判断证书是否过期
const tableRowClassName = ({ row }) => {
    var status = row.expiryStatus;
    if (status == 2) {
        return {
            "background-color": "red",
            color: "black",
        };
    } else if (status == 1) {
        return {
            "background-color": "yellow",
            color: "black",
        };
    } else {
        return true;
    }
}
</script>
<style>
:deep(.el-table tbody tr:hover>td) {
    background-color: red
}
</style>