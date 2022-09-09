<template>
    <Search :select="select"></Search>
    <Table :loading="loading" :tableData="tableData"></Table>
    <!-- <Pagination :hide="hide" :pagesize="eilnfo.parameter.limit" :total="dataCount"
        :currentpage="eilnfo.parameter.pageNum" :options="eilnfo" :render="selectUserList">
    </Pagination> -->
    <Dialog :success="success" :dialogVisible="dialogVisible" :title="title" :dialogType="dialogType" :url="url"
        :handleEditT="handleEditT"></Dialog>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import Table from './components/Table.vue'//员工表格
import { ElNotification } from 'element-plus'
import Pagination from '@/components/Pagination.vue'//分页组件
import { ref, reactive } from "vue";
import { piniaData } from '@/store';//引入pinia状态管理
//pinia状态管理
const store = piniaData();
const dialogVisible = ref(false)
const dialogType = ref(1)
const tableData = ref([])
const loading = ref(false)
const url = ref('')
const title = ref('')
const select = (i) => {
    switch (i) {
        case 1:
            dialogVisible.value = true
            dialogType.value = 1
            url.value = '/q'
            title.value = '上传安全教育表格'
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 2
            url.value = '/w'
            title.value = '上传IC卡照片'
            break;
        case 3:
            dialogVisible.value = true
            dialogType.value = 3
            url.value = '/e'
            title.value = '上传个人照片'
            break;
        case 4:
            dialogVisible.value = true
            dialogType.value = 4
            url.value = '/e'
            title.value = '上传考卷照片'
            break;
        case 4:
            ElMessageBox.confirm('确认提交数据?')
                .then(() => {

                })
                .catch(() => {
                    // catch error
                })
            break;
    }
}
const handleEdit = () => {

}
const handleEditT = () => {
    dialogVisible.value = false
}
//文件导入成功
const success = () => {
    ElNotification({
        message: '导入成功！',
        type: 'warning',
    })
    dialogVisible.value = false
}
</script>
<style scoped>
</style>
