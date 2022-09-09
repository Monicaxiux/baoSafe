<template>
    <Search :select="selectUserList" :data="eilnfo" :departmentSelect="departmentSelect">
    </Search>
    <Table :handleEdit="handleEdit" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="eilnfo.parameter.limit" :total="dataCount"
        :currentpage="eilnfo.parameter.pageNum" :options="eilnfo" :render="selectUserList">
    </Pagination>
    <Dialog :dialogVisible="dialogVisible" :handleEditT="handleEditT"></Dialog>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import Pagination from '@/components/Pagination.vue'
import { bna, EiInfo } from '@/types';
import { selectManager } from '@/api/user';//api方法
import { selectDepartment } from '@/api/areas';//api方法
import { ref, onMounted, reactive } from 'vue';
// 部门下拉框数据
const departmentSelect = ref([])
const loading = ref(false)
const tableData = ref([])
// 查询条件
const query = reactive(new bna);
const eilnfo = reactive(new EiInfo);
const dialogVisible = ref(false)
const hide = ref(false);
//总页数
const dataCount = ref(0);
eilnfo.parameter = query
onMounted(() => {
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
})
const selectUserList = () => {
    loading.value = true
    selectManager(eilnfo).then((res: any) => {
        loading.value = false
        tableData.value = res.result.userAuthList == undefined ? [] : res.result.userAuthList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
// 编辑
const handleEdit = (row) => {
    console.log(row);

    dialogVisible.value = true
}
// 确认编辑
const handleEditT = () => {
    dialogVisible.value = false

}
</script>
<style scoped>
</style>