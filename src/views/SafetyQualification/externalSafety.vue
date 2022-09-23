<template>
    <Search :select="selectUserList" :userType="false" :data="eilnfo"></Search>
    <Table :licenseEdit="licenseEdit" :tableData="tableData" :loading="loading" :userType="false"></Table>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import { selectSafetylicense } from '@/api/user'
import { EiInfo, selectSafe } from '@/types';
import { uplodUrl } from '@/utils/url'
import { ElNotification } from 'element-plus';

const quer = reactive(new selectSafe)
const eilnfo = reactive(new EiInfo)
eilnfo.parameter = quer
const dataCount = ref(0)
const hide = ref(false)
const tableData = ref([])
const selectUserList = () => {
    loading.value = true
    selectSafetylicense(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.assistInfo == undefined ? [] : res.result.assistInfo
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
const loading = ref(false)
const licenseEdit = (i: number, row: any) => {
    ElNotification({
        message: '下载中，请稍后...',
        type: 'success',
    })
    window.location.href = `${uplodUrl}/download/safe/word/1?projectId=${row.projectId}`
    setTimeout(() => {
        window.location.href = `${uplodUrl}/download/safe/word/2?projectId=${row.projectId}`
    }, 2000)
}
</script>
<style>
</style>
