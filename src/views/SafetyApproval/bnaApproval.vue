<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="false" :departmentSelect="departmentSelect"></Search>
    <Table :userType="false" :getQrCode="getQrCode" :approval="approval" :loading="loading" :tableData="tableData">
    </Table>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'//员工表格
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { bna, EiInfo, bnaInfo } from '@/types';
import { selectBna, selectUpData } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
import { selectDepartment } from '@/api/areas'

//部门下拉框内容
const departmentSelect = ref([])
//分页搜索参数
const query = reactive(new bna);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
const userInfo = ref(new bnaInfo)
//表格数据
const tableData = ref([{
    name: 'aaa'
}]);
//总页数
const dataCount = ref(0);
const loading = ref(false)
// dom初始化完成请求数据操纵dom
onMounted(() => {
    // selectUserList(eilnfo);//查询用户列表
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
})
const selectUserList = () => {

}
const approval = () => {

}
const getQrCode = () => {

}
</script>
<style scoped>
</style>