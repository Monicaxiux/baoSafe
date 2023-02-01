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
                                                        <el-table-column label="操作" prop="manageArea1Value">
                                                            <template #default="scoped">
                                                                <el-button type="primary"
                                                                    @click="slot(scoped.row, 2, 3)">编辑</el-button>
                                                                <el-button type="danger"
                                                                    @click="slot(scoped.row, 3, 3)">删除</el-button>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="50"></el-table-column>
                                        <el-table-column label="名称" prop="manageArea2Value" />
                                        <el-table-column label="操作" prop="manageArea1Value">
                                            <template #default="scoped">
                                                <el-button type="primary" @click="slot(scoped.row, 1, 3)">新增</el-button>
                                                <el-button type="primary" @click="slot(scoped.row, 2, 2)">编辑</el-button>
                                                <el-button type="danger" @click="slot(scoped.row, 3, 2)">删除</el-button>
                                            </template>

                                        </el-table-column>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="manageArea1Value" />
                    <el-table-column label="操作" prop="manageArea1Value">
                        <template #default="scoped">
                            <el-button type="primary" @click="slot(scoped.row, 1, 2)">新增</el-button>
                            <el-button type="primary" @click="slot(scoped.row, 2, 1)">编辑</el-button>
                            <el-button type="danger" @click="slot(scoped.row, 3, 1)">删除</el-button>
                        </template>

                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <el-dialog v-model="Dialog" :title="title" width="20%">
        <el-input v-model="value"></el-input>
        <br><br>
        <el-button @click="Dialog = false">取消</el-button>
        <el-button type="primary" @click="eitl(modify)">确定</el-button>
    </el-dialog>

</template>
<script lang="ts" setup>
import { EiInfo } from "@/types";
import { ref, onMounted } from "vue";
import { selectQueryArea, addArea, selectAll, addUpdManage } from "@/api/areas";
import { ElMessageBox, ElNotification } from 'element-plus'
const tableData: any = ref([])
onMounted(() => {
    getData();
})
const title = ref("")
const Dialog = ref(false)
const value = ref("")
const form = ref()
const modify = ref()
const manageAreaType = ref()
const slot = (row: any, i, e) => {
    value.value = ""
    form.value = JSON.parse(JSON.stringify(row))
    manageAreaType.value = e
    switch (i) {
        case 1:
            title.value = `新增${e}级区域`
            Dialog.value = true;
            modify.value = 1
            break;
        case 2:
            title.value = `编辑${e}级区域`
            value.value = form.value.manageArea1Value || form.value.manageArea2Value || form.value.manageArea3Value
            Dialog.value = true;
            modify.value = 2
            break;
        case 3:
            ElMessageBox.confirm('确认删除?')
                .then(() => {
                    modify.value = 3
                    eitl(modify.value);
                })
                .catch(() => {
                    // catch error
                })

            break;
    }
}
//操作
const eitl = (i) => {
    console.log(value.value, i, 'asdasdas');
    if (value.value || i == 3) {
        let eiInfo = new EiInfo;
        eiInfo.parameter = {
            manageAreaType: manageAreaType.value,
            modify: i,
            key: form.value.manageArea1Id || form.value.manageArea2Id || form.value.manageArea3Id,
            value: value.value,
            previousKey: form.value.manageArea1Id || form.value.manageArea2Id || form.value.manageArea3Id,
            previousValue: form.value.manageArea1Value || form.value.manageArea2Value || form.value.manageArea3Value
        }
        addUpdManage(eiInfo).then((res: any) => {
            console.log(res);
            if (res.sys.status != -1) {
                ElNotification({
                    message: res.sys.msg,
                    type: 'success',
                })
                Dialog.value = false;
            }
            value.value = ""
            getData();
        })
    } else {
        ElNotification({
            message: '区域信息不能为空',
            type: 'error',
        })
    }

}
const getData = () => {
    selectAll().then((res: any) => {
        tableData.value[0] = res.result.manageArea1VO
    })
}
</script>