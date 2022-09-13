<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="true" :departmentSelect="departmentSelect"></Search>
    <Table :userType="true" :getQrCode="getQrCode" :approval="approval" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'//员工表格
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { bna, EiInfo, bnaInfo, selectApproval } from '@/types';
import { selectBna, selectUpData, selectSafety } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
import { selectDepartment } from '@/api/areas'

//部门下拉框
const departmentSelect = ref([])

//分页搜索参数
const query = reactive(new selectApproval);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
const userInfo = ref(new bnaInfo)
const hide = ref(false)
//表格数据
const tableData = ref([]);
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
    loading.value = true
    selectSafety(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.safeList == undefined ? [] : res.result.safeList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
const approval = () => {

}
const getQrCode = () => {

}
</script>
<style scoped>
</style>