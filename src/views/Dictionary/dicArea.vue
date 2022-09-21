<template>
    <div>
        <el-card shadow="hover">
            <el-row style="text-align: left; margin-top: -5px; margin-bottom: 10px">
                <el-button type="primary" @click="dialogVisible = true">新增</el-button>
            </el-row>
            <el-table border height="70vh" :data="areaList" style="width: 100%" row-click="as">
                <el-table-column fixed="left" prop="id" label="区域编号" width="100px"></el-table-column>
                <el-table-column fixed="left" prop="name" label="区域名称"></el-table-column>
                <el-table-column fixed="left" prop="type" label="类型"></el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="新增区域" width="400px">
            <el-input clearable placeholder="区域名称" v-model="name"></el-input>
            <div style="margin-top: 20px; text-align: right">
                <el-button @click="add()" type="primary">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { EiInfo } from "@/types";
import { ref, onMounted } from "vue";
import { selectQueryArea, addArea } from "@/api/areas";
import { ElNotification } from 'element-plus'

const areaList = ref([])
const name = ref("")
const dialogVisible = ref(false)

onMounted(() => {
    selectLicenseArea();

})
// 查询区域
const selectLicenseArea = () => {
    const eiInfo = new EiInfo;
    eiInfo.parameter = {
        select: 2,
        companyId: 1,
    };
    selectQueryArea(eiInfo).then((res: any) => {
        areaList.value = res.result.areaInfo;
    })
}
// 新增区域
const add = () => {
    if (name.value == "") {
        ElNotification({
            message: "请输入区域名称",
            type: "warning",
        });
    } else {
        const eiInfo = new EiInfo();
        eiInfo.parameter = {
            areaName: name.value,
        };
        addArea(eiInfo).then((res) => {
            ElNotification({
                message: "新增成功",
                type: "success",
            });
            selectLicenseArea();
            name.value = "";
            dialogVisible.value = false;
        })

    }
}
</script>
<style lang="less" scoped>
:deep(.cell:empty::before) {
    content: "- -";
    color: gray;
}

:deep(.el-table .cell) {
    text-align: center;
}
</style>