<template>
    <div>
        <el-card shadow="hover">
            <el-row style="text-align: left; margin-top: -5px; margin-bottom: 10px">
                <el-button type="primary" @click="updData(false)">新增部门</el-button>
            </el-row>
            <el-table max-height="760" :data="tableData" border style="width: 100%">
                <el-table-column label="部门">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="4">
                                <el-table :data="props.row.baoFactoryVOList" border>
                                    <el-table-column width="50"></el-table-column>
                                    <el-table-column label="分厂">
                                        <el-table-column width="50"></el-table-column>
                                        <el-table-column label="分厂名称" prop="baoFactoryName">
                                        </el-table-column>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="部门名称" prop="baoDepartmentName" />
                    <el-table-column label="操作" width="120">
                        <template #default="scope">
                            <el-button @click="updData(scope.row)">编辑科室</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="编辑" width="400px">
            <h4>部门名称</h4><el-input clearable placeholder="部门名称" v-model="baoFactoryVO.baoDepartmentName"></el-input>
            <el-row style="align-items: center;">
                <h4>下级分厂</h4>&nbsp;&nbsp;<el-button @click="addF" size="small">添加</el-button>
            </el-row>
            <div v-for="(item, i) in baoFactoryVO.baoFactoryVOList">
                <el-row style="align-items: center;flex-wrap:inherit;">
                    <el-input clearable placeholder="分厂名称" :disabled="item.isStatus" v-model="item.baoFactoryName">
                    </el-input>
                    &nbsp;&nbsp;<el-button @click="delF(i)"><a v-if="!item.isStatus">删除</a><a
                            v-if="item.isStatus">启用</a></el-button><br /><br />
                </el-row>
            </div>
            <div style="margin-top: 20px; text-align: right">
                <el-button @click="upd()" type="primary">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { EiInfo } from "@/types";
import { ref, onMounted } from "vue";
import { selectDepAndFac, addUpdDepAndFac } from "@/api/areas";
import { ElNotification } from 'element-plus'
const tableData: any = ref([])
const dialogVisible: any = ref(false);
const baoFactoryVO: any = ref({
    baoDepartmentId: 0,
    baoDepartmentName: "",
    baoFactoryVOList: [
        {
            baoFactoryId: 0,
            baoFactoryName: "",
            isStatus: false
        }
    ]
});
onMounted(() => {
    getData()
})
const updData = (row) => {
    if (row) {
        console.log(row);
        baoFactoryVO.value = JSON.parse(JSON.stringify(row));
    } else {
        baoFactoryVO.value = {
            baoDepartmentId: 0,
            baoDepartmentName: "",
            baoFactoryVOList: [{
                baoFactoryId: 0,
                baoFactoryName: "",
                isStatus: false
            }]
        }
    }
    dialogVisible.value = true;

}
const addF = () => {
    baoFactoryVO.value.baoFactoryVOList.push({
        baoFactoryId: 0,
        baoFactoryName: "",
        isStatus: false
    })
}
const delF = (i) => {
    console.log(i);
    baoFactoryVO.value.baoFactoryVOList[i].isStatus = !baoFactoryVO.value.baoFactoryVOList[i].isStatus
    if (baoFactoryVO.value.baoFactoryVOList[i].isStatus) {
        baoFactoryVO.value.baoFactoryVOList[i].baoFactoryId = -1
    } else {
        baoFactoryVO.value.baoFactoryVOList[i].baoFactoryId = 1
    }
    console.log(baoFactoryVO.value.baoFactoryVOList[i]);
    // baoFactoryVO.value.baoFactoryVOList.splice(i, 1);
}
const upd = () => {
    console.log(baoFactoryVO.value);
    if (baoFactoryVO.value.baoDepartmentName) {
        let eiInfo = new EiInfo;
        eiInfo.parameter = baoFactoryVO.value;
        for (let i = 0; i < baoFactoryVO.value.baoFactoryVOList.length; i++) {
            delete baoFactoryVO.value.baoFactoryVOList[i].isStatus
        }
        addUpdDepAndFac(eiInfo).then((res: any) => {
            if (res.sys.status != -1) {
                ElNotification({
                    message: `${res.sys.msg}`,
                    type: 'success',
                })
                getData();
                dialogVisible.value = false;
            }
        })
    } else {
        ElNotification({
            message: '请填写部门名称！',
            type: 'error',
        })
    }

}
const getData = () => {
    selectDepAndFac().then((res: any) => {
        tableData.value = res.result.departmentList
    })
}
</script>