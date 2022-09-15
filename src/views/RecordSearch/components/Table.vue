<template>
    <div>
        <el-table v-loading="loading" max-height="650" border :data="tableData" class="tablex">
            <template v-if="tableType == 2">
                <el-table-column fixed prop="locationInfo" label="位置" />
                <el-table-column fixed prop="assistCompany" label="所在单位" width="160" />
                <el-table-column prop="icCardWorkNumber" label="IC卡号" width="160" />
                <el-table-column prop="username" label="姓名" width="140" />
                <el-table-column prop="signTime" label="记录时间" width="200" />
                <el-table-column prop="inOut" label="登记状态" width="100" />
                <el-table-column prop="remark" label="登记备注" width="100" />
                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <!-- <el-button size="small" type="primary" @click="approval(scope.$index, scope.row)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        审批
                    </el-button> -->
                    </template>
                </el-table-column>
            </template>
            <template v-if="tableType == 1">
                <el-table-column fixed prop="projectNumber" label="项目编号" />
                <el-table-column fixed prop="projectName" label="项目名称" width="160" />
                <el-table-column prop="icCardWorkNumber" label="IC卡号" width="160" />
                <el-table-column prop="username" label="姓名" width="140" />
                <el-table-column prop="remark" label="备注" width="200" />
                <el-table-column prop="signInTime" label="进时间" width="100" />
                <el-table-column prop="signOutTime" label="出时间" width="100" />
            </template>
            <template v-if="tableType == 3">
                <el-table-column fixed prop="projectNumber" label="项目编号" />
                <el-table-column fixed prop="projectName" label="项目名称" />
                <el-table-column prop="notLeaveNum" label="正在作业人数" />
                <el-table-column prop="beginTime" label="更新时间" />
            </template>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { Delete, EditPen, Picture } from '@element-plus/icons-vue'//引入elementui 图标
// 定义Props默认数据类型
type Props = {
    tableData: Array<any>,//表格数据
    loading: boolean,
    tableType: number
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped src="@/assets/css/table.css">
</style>