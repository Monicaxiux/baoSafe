<template>
    <Search :userType="true" :select="selectUserList" :data="eilnfo"></Search>
    <Table :userType="true" :loading="loading" :tableData="tableData"></Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import Table from './components/Table.vue'
import Pagination from '@/components/Pagination.vue'//导入分页组件
import { EiInfo, bnaSafety, address } from '@/types';
import { selectAddress, } from '@/api/safety';//引入api方法
import { selectBnasafe, } from '@/api/user';//引入api方法
//分页搜索参数
const query = reactive(new bnaSafety);
//分厂搜索参数
const queryAddress = reactive(new address);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
eilnfo.parameter = query
//表格数据
const tableData = ref([]);
//总页数
const dataCount = ref(0);
const loading = ref(false)
//是否展示分页
const hide = ref(false);
onMounted(() => {
    // select();
})
//加载
const select = () => {
    eilnfo.parameter = queryAddress
    selectAddress(eilnfo).then((res) => {
        console.log(res);
    })
}
const selectUserList = () => {
    loading.value = true
    selectBnasafe(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.userSafeList == undefined ? [] : res.result.userSafeList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true

    })
}
</script>
<style>
</style>