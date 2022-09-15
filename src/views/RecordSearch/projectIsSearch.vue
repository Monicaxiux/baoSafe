<template>
    <Search :userType="3" :data="eiInfo" :select="selectUser" :changeTime="changeTime"></Search>
    <Table :tableType="3" :loading="loading" :tableData="tableData"></Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eiInfo.parameter.pageNum" :options="eiInfo"
        :render="selectUser">
    </Pagination>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import { selectLeave } from '@/api/areas'
import { projectNum, EiInfo } from '@/types'
import Pagination from '@/components/Pagination.vue'//分页组件
import { reactive, ref } from 'vue';
const quer = reactive(new projectNum)
const eiInfo = reactive(new EiInfo)
eiInfo.parameter = quer
const loading = ref(false)
const tableData = ref([])
const dataCount = ref(0)
const hide = ref(false)
// 查询项目施工人员
const selectUser = () => {
    loading.value = true
    selectLeave(eiInfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.record == undefined ? [] : res.result.record
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
// 周期选择
const changeTime = (val) => {
    if (!val) {
        eiInfo.parameter.startTime = ""
        eiInfo.parameter.endTime = ""
    } else {
        eiInfo.parameter.startTime = val[0]
        eiInfo.parameter.endTime = val[1]
    }
}
</script>
<style scoped>
</style>
