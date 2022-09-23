<template>
    <div>
        <el-card shadow="hover">
            <!-- <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px;">
                <el-table-column type="expand">
                    <el-table :data="tableData2" style="margin-left: 46px;width: 92% !important;">
                        <el-table-column prop="baoFactory" label="分厂名称" width="100">
                        </el-table-column>
                        <el-table-column label="操作" width="160">
                            <el-button size="mini" type="primary">编辑</el-button>
                            <el-button size="mini" type="danger">停用</el-button>
                        </el-table-column>
                    </el-table>
                </el-table-column>
                <el-table-column prop="baoDepartment" label="部门名称" width="100">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <el-button type="primary">编辑</el-button>
                    <el-button type="danger">停用</el-button>
                </el-table-column>
            </el-table> -->
            <el-table max-height="820" :data="tableData" border style="width: 100%">
                <el-table-column label="部门">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="4">
                                <el-table :data="props.row.baoFactoryVOList" border>
                                    <el-table-column width="50"></el-table-column>

                                    <el-table-column label="分厂">
                                        <el-table-column width="50"></el-table-column>
                                        <el-table-column label="分厂编号" prop="baoFactoryId" />
                                        <el-table-column label="分厂名称" prop="baoFactoryName" />
                                        <!-- <el-table-column label="操作" width="160">

                                        </el-table-column> -->
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="部门编号" prop="baoDepartmentId" />
                    <el-table-column label="部门名称" prop="baoDepartmentName" />
                    <!-- <el-table-column label="操作" width="160">
                        <el-button type="primary">编辑</el-button>
                    </el-table-column> -->
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script lang="ts" setup>
import { EiInfo } from "@/types";
import { ref, onMounted } from "vue";
import { selectQueryArea, addArea, selectDepAndFac } from "@/api/areas";
import { ElNotification } from 'element-plus'
const tableData = ref([])
onMounted(() => {
    selectDepAndFac().then((res: any) => {
        console.log(res.result.departmentList);
        tableData.value = res.result.departmentList
    })
})
</script>