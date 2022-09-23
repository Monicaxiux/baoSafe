<template>
    <Search :select="selectUserList" :data="eilnfo" :departmentSelect="departmentSelect">
    </Search>
    <Table :handleEdit="handleEdit" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :from="from" :dialogVisible="dialogVisible" :handleEditT="handleEditT"></Dialog>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import Pagination from '@/components/Pagination.vue'
import { bna, EiInfo } from '@/types';
import { selectManager, updateUserAuth } from '@/api/user';//api方法
import { selectDepartment } from '@/api/areas';//api方法
import { ref, onMounted, reactive } from 'vue';
import { piniaData } from '@/store';//引入pinia状态管理
import { th } from 'element-plus/es/locale';
import { ElNotification } from 'element-plus';
//pinia状态管理
const store = piniaData();
// 部门下拉框数据
const departmentSelect = ref([])
const loading = ref(false)
const tableData = ref([])
const from = reactive({
    userId: <any>0,
    userAuth: <any>'',
    authArea: <any>[],
    authArea2: <any>'',
    manageArea: <any>[]
})
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
const handleEdit = (index: number, row: any) => {
    // 清空表单
    from.authArea = []
    console.log(row);
    from.userAuth = row.userAuth;
    // if (row.authAreaList[0].id == 0) {
    //     from.manageArea = [];
    // } else {
    //     for (let i = 0; i < row.authAreaList.length; i++) {
    //         from.manageArea.push(row.authAreaList[i].id);
    //     }
    // }
    from.userId = row.userId;
    dialogVisible.value = true
}
// 确认编辑
const handleEditT = (i) => {
    switch (i) {
        case 1:
            console.log(from);
            let eiInfo = new EiInfo
            eiInfo.parameter = {
                userId: from.userId,
                userAuth: from.userAuth,
                authArea: from.authArea
            }
            switch (from.userAuth) {
                case "管理员":
                    eiInfo.parameter.userAuth = 0;
                    break;
                case "一级安全教育":
                    eiInfo.parameter.userAuth = 1;
                    break;
                case "二级安全教育":
                    eiInfo.parameter.userAuth = 2;
                    break;
                case "三级安全教育":
                    eiInfo.parameter.userAuth = 3;
                    break;
                case "普通员工":
                    eiInfo.parameter.userAuth = -1;
                    break;
            }
            if (from.authArea2.length != 0) {
                eiInfo.parameter.authArea = from.authArea2
            }
            eiInfo.userInfo = store.userInfo
            updateUserAuth(eiInfo).then((res: any) => {
                selectUserList()
                ElNotification({
                    message: res.sys.msg,
                    type: 'success',
                })
                dialogVisible.value = false

            })
            break;
        case 2:
            dialogVisible.value = false
            break;
    }

}
</script>
<style scoped>
</style>