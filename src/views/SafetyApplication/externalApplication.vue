<template>
    <el-steps :space="500" :active="1" simple>
        <el-step title="步骤1：系统导入 | 模板导入" />
        <el-step title="步骤2：确认安全教育名单" />
        <el-step title="步骤3：提交申报" />
    </el-steps>
    <br>

    <el-card>
        <div class="box">
            <div class="left">
                <el-card shadow="hover">
                    <h1>项目信息</h1>
                    <Project :handleAdd="handleAdd"></Project>
                </el-card>
            </div>
            <div class="right">
                <el-card shadow="hover">
                    <Search :searchType="1" :select="select" :userType="true" :submitStatus="submitStatus"
                        :buttonStatus="buttonStatus" :data="[]" :departmentSelect="[]"></Search>
                    <Table :userType="true" :loading="false" :tableType="true" :tableData="tableData"
                        :handleDelete="handleDelete" :handleChange="handleChange">
                    </Table>
                </el-card>
            </div>
        </div>
    </el-card>

    <Dialog :userType="true" :handleEditT="handleEditT" :title="title" :dialogType="dialogType" :url="url"
        :dialogVisible="dialogVisible" :departmentSelect="departmentSelect" :handleClose="handleClose"></Dialog>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, onMounted } from "vue";
import Dialog from './components/Dialog.vue'
import Project from './components/Project.vue';
const departmentSelect = ref([])
const tableData: any = ref([])
const dialogVisible = ref(false)
const dialogType = ref(1)
const buttonStatus = ref(true)
const submitStatus = ref(true)
const url = ref('')
const title = ref('')
const multiple: any = ref([])//多选选中内容
onMounted(() => {
})
// 监听表格数据来开启提交按钮
watch(tableData.value, (newValue, oldValue) => {
    console.log(newValue);
    submitStatus.value = newValue.length != 0 ? false : true
})
// 移除按钮事件
const handleDelete = (i: any) => {
    ElMessageBox.confirm('确定移除选中项?')
        .then(() => {
            tableData.value.splice(i, 1);
        }).catch(() => { })
}
const handleAdd = () => {

}
// 多选框选中事件
const handleChange = (val: any) => {
    multiple.value = val
    buttonStatus.value = multiple.value.length != 0 ? false : true
}
// 表格移除事件
const select = (i: any) => {
    switch (i) {
        case 1:
            dialogVisible.value = true
            dialogType.value = 1
            title.value = '选择安全教育人员'
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 2
            title.value = '模板导入安全教育人员'
            break;
        case 3:
            ElMessageBox.confirm('确定移除选中项?')
                .then(() => {
                    var ids = multiple.value.map(item => item.id);
                    ids.map(Number).forEach(item => {
                        for (let i = tableData.value.length - 1; i >= 0; i--) {
                            if (tableData.value[i].id == item) {
                                tableData.value.splice(i, 1);
                            }
                        }
                    });
                }).catch(() => { })
            break;
        case 4:
            ElMessageBox.confirm('确定提交名单?')
                .then(() => {

                }).catch(() => { })
            break;
    }
}
// 确认添加人员
const handleEditT = (val: any) => {
    for (let i = 0; i < val.length; i++) {
        tableData.value.push(val[i])
    }
    dialogVisible.value = false
}
// 关闭Dialog
const handleClose = () => {
    ElMessageBox.confirm('确定取消导入?')
        .then(() => {
            dialogVisible.value = false
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style scoped >
.left {
    width: 28%;
}

.right {
    width: 70%;
    float: right;
}

.box {
    justify-content: space-between;
    display: flex;
}
</style>
