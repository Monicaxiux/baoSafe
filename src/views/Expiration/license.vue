<template>
    <Search :select="selectUserList" :data="eilnfo" :download="download" :userType="false"></Search>
    <Table :handleChange="handleChange" :loading="loading" :multipleSelection="multipleSelection" :tableType="true"
        :tableData="tableData" :license="license"></Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import Search from './components/Search.vue'
import { ref, reactive } from 'vue'
import { EiInfo, expiration } from '@/types';
import { selectExpira } from '@/api/user'
import { ElNotification } from 'element-plus'

const quer = reactive(new expiration)
const eilnfo = reactive(new EiInfo);
eilnfo.parameter = quer
const tableData = ref([])
const loading = ref(false)
const dataCount = ref(0)
const hide = ref(false)
const multipleSelection = ref([])

const license = () => {

}
// 多选框选中事件
const handleChange = (val: any) => {
    multipleSelection.value = val.map(item => item.licenseId)
}
const selectUserList = () => {
    loading.value = false
    selectExpira(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.result == undefined ? [] : res.result.result
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
// 下载特种作业证
const download = () => {
    multipleSelection.value.length != 0 ? (
        ElNotification({
            message: "正在导出作业证表格，请稍等...",
            type: 'success',
        }),
        window.location.href =
        `https://safeedu.bnasafe.com/download/soon/overdue/license/excel?licenseId=${multipleSelection.value}`
    ) : (
        ElNotification({
            message: '请选择要导出的证书',
            type: 'warning',
        })
    )
}
</script>
<style scoped>
</style>
