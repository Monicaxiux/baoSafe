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
import { ElMessageBox, ElNotification } from 'element-plus';
import { selectAddress } from '@/api/safety';
//pinia状态管理
const store = piniaData();
// 部门下拉框数据
const departmentSelect = ref([])
const loading = ref(false)
const tableData = ref([])
const from = reactive({
    userId: <any>0,
    userAuth: <any>'',
    authArea: <any>'',
    authArea2: <any>'',
    manageArea: <any>[],
    addressList: <any>[],
    addressList3: <any>[]
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
    from.authArea = ''
    from.addressList = []
    from.authArea2 = ''
    from.addressList3 = []
    console.log(row);
    from.userAuth = row.userAuth;
    let eiInfo = new EiInfo

    for (let i = 0; i < row.authAreaList.length; i++) {
        if (row.authAreaList[i].type == 'manageArea2') {
            from.authArea = row.authAreaList[i].id;
            eiInfo.parameter = {
                previousKey: 1,
                manageAreaType: 2
            }
            selectAddress(eiInfo).then((res: any) => {
                from.addressList = res.result.manageArea
            })
        }
        if (row.authAreaList[i].type == 'manageArea3') {
            from.authArea2 = row.authAreaList[i].id;
            // from.addressList3.push(row.authAreaList[i]);
            eiInfo.parameter = {
                manageAreaType: 3
            }
            selectAddress(eiInfo).then((res: any) => {
                from.addressList3 = res.result.manageArea
            })
        }
    }
    if (row.userAuth == '三级安全教育') {
        eiInfo.parameter = {
            manageAreaType: 3
        }
        selectAddress(eiInfo).then((res: any) => {
            from.addressList3 = res.result.manageArea
        })
    }
    if (row.userAuth == '二级安全教育') {
        eiInfo.parameter = {
            manageAreaType: 2
        }
        selectAddress(eiInfo).then((res: any) => {
            from.addressList = res.result.manageArea
        })
    }
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
                case "无权限" || "普通员工":
                    eiInfo.parameter.userAuth = -1;
                    break;
            }
            if (from.authArea2.length != 0) {
                eiInfo.parameter.authArea = from.authArea2
            }
            if (from.authArea.length == 0 && from.userAuth == 1) {
                eiInfo.parameter.authArea = 1
            } else {
                // delete eiInfo.parameter.authArea
            }
            // eiInfo.parameter.authArea.push(1)
            eiInfo.userInfo = store.userInfo
            console.log(from.userAuth);

            // if (from.userAuth == 1) {
            //     ElNotification({
            //         message: '请选择权限!',
            //         type: 'error',
            //     })
            // } else {
                updateUserAuth(eiInfo).then((res: any) => {
                    selectUserList()
                    if (res.sys.status != -1) {
                        ElNotification({
                            message: res.sys.msg,
                            type: 'success',
                        })
                    } else {
                        // ElNotification({
                        //     message: res.sys.msg,
                        //     type: 'error',
                        // })
                        // ElMessageBox.confirm('该区域已有其他人负责，是否强制修改?')
                        //     .then(() => {
                        //         eiInfo.parameter.force = 1
                        //         updateUserAuth(eiInfo).then((res: any) => {
                        //             selectUserList()
                        //             if (res.sys.status != -1) {
                        //                 ElNotification({
                        //                     message: res.sys.msg,
                        //                     type: 'success',
                        //                 })
                        //             }
                        //         })
                        //     }).catch(() => {

                        //     })
                    }

                    dialogVisible.value = false

                })
            // }

            break;
        case 2:
            dialogVisible.value = false
            break;
    }

}
</script>
<style scoped>

</style>