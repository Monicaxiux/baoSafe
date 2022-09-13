<template>
    <Search :select="selectUserList" :data="eilnfo"></Search>
    <Table :userType="true" :loading="loading" :tableData="tableData"></Table>
    <Pagination :hide="hide" :pagesize="eilnfo.parameter.limit" :total="dataCount"
        :currentpage="eilnfo.parameter.pageNum" :options="eilnfo" :render="selectUserList">
    </Pagination>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import Table from './components/Table.vue'
import Pagination from '@/components/Pagination.vue'//导入分页组件
import { EiInfo, bnaSafety, address } from '@/types';
import { selectAddress } from '@/api/safety';//引入api方法
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

}
</script>
<style>
</style>