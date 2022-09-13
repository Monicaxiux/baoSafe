<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="true"></Search>
    <Table :tableType="false" :tableData="tableData" :license="license"></Table>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'
import Search from './components/Search.vue'
import { ref, reactive } from 'vue'
import { external, EiInfo, externalInfo } from '@/types';
const eilnfo = reactive(new EiInfo);

const tableData = ref([])

const license = () => {

}

const selectUserList = () => {

}
</script>
<style scoped>
</style>
