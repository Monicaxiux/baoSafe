<template>
    <Search :searchType="1" :select="select" :userType="false" :submitStatus="submitStatus" :buttonStatus="buttonStatus"
        :data="[]" :departmentSelect="[]"></Search>
    <Table :userType="false" :loading="false" :tableType="true" :tableData="tableData" :handleDelete="handleDelete"
        :handleChange="handleChange">
    </Table>
    <Dialog :success="success" :userType="false" :handleEditT="handleEditT" :title="title" :dialogType="dialogType"
        :url="url" :dialogVisible="dialogVisible" :departmentSelect="departmentSelect" :handleClose="handleClose">
    </Dialog>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, onMounted, reactive } from "vue";
import Dialog from './components/Dialog.vue'
import { selectDepartment } from '@/api/areas'
import { applySafe } from '@/api/user'
import { ElNotification } from 'element-plus'
import { EiInfo } from '@/types';
const departmentSelect = ref([])
const tableData: any = ref([])
const dialogVisible = ref(false)
const dialogType = ref(1)
const buttonStatus = ref(true)
const submitStatus = ref(true)
const eiInfo = reactive(new EiInfo)
const url = ref('')
const title = ref('')
const multiple: any = ref([])//多选选中内容
onMounted(() => {
    // 查询部门下拉框
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
})
const success = () => {
    console.log('上传成功');
}
// 监听表格数据来开启提交按钮
watch(tableData.value, (newValue, oldValue) => {
    console.log(newValue);
    submitStatus.value = newValue.length != 0 ? false : true
    buttonStatus.value = newValue.length != 0 ? false : true
})
// 移除按钮事件
const handleDelete = (i: any) => {
    ElMessageBox.confirm('确定移除选中项?')
        .then(() => {
            tableData.value.splice(i, 1);
        }).catch(() => { })
}
// 多选框选中事件
const handleChange = (val: any) => {
    multiple.value = val
}
// 表格移除事件
const select = (i: any) => {
    switch (i) {
        case 1:
            dialogVisible.value = true
            dialogType.value = 2
            title.value = '选择安全教育人员'
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 1
            title.value = '模板导入安全教育人员'
            break;
        case 3:
            ElMessageBox.confirm('确定移除选中项?')
                .then(() => {
                    tableData.value = []
                    // var ids = multiple.value.map(item => item.id);
                    // ids.map(Number).forEach(item => {
                    //     for (let i = tableData.value.length - 1; i >= 0; i--) {
                    //         if (tableData.value[i].id == item) {
                    //             tableData.value.splice(i, 1);
                    //         }
                    //     }
                    // });
                }).catch(() => { })
            break;
        case 4:
            ElMessageBox.confirm('确定提交名单?')
                .then(() => {
                    let List: any = []
                    for (let i = 0; i < tableData.value.length; i++) {
                        List.push(tableData.value[i].id)
                    }
                    console.log(List);

                    eiInfo.parameter = {
                        userId: List
                    }
                    applySafe(eiInfo).then((res: any) => {
                        ElNotification({
                            message: `${res.sys.msg}`,
                            type: 'success',
                        })
                        tableData.value = []
                    })
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
</style>
