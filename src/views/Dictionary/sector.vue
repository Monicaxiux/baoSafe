<template>
    <div>
        <el-card shadow="hover">
            <el-table max-height="760" :data="tableData" border style="width: 100%">
                <el-table-column label="一级区域">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="4">
                                <el-table :data="props.row.manageArea2List" border>
                                    <el-table-column width="50"></el-table-column>
                                    <el-table-column label="二级区域">
                                        <el-table-column type="expand">
                                            <template #default="props">
                                                <div m="4">
                                                    <el-table :data="props.row.manageArea3VOList" border>
                                                        <el-table-column width="50"></el-table-column>
                                                        <el-table-column width="50"></el-table-column>
                                                        <el-table-column label="三级区域">
                                                            <el-table-column width="50"></el-table-column>
                                                            <el-table-column label="名称" prop="manageArea3Value" />
                                                        </el-table-column>
                                                    </el-table>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="50"></el-table-column>
                                        <el-table-column label="名称" prop="manageArea2Value" />
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="manageArea1Value" />
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script lang="ts" setup>
import { EiInfo } from "@/types";
import { ref, onMounted } from "vue";
import { selectQueryArea, addArea, selectAll } from "@/api/areas";
import { ElNotification } from 'element-plus'
const tableData: any = ref([])
onMounted(() => {
    selectAll().then((res: any) => {
        tableData.value[0] = res.result.manageArea1VO
    })
})
</script>