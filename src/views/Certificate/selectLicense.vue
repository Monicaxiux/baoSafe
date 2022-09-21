<template>
    <Search :data="eiInfo" :searchType="1" :select="select"></Search>
    <Table :loading="loading" :tableData="tableData"></Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eiInfo.parameter.pageNum" :options="eiInfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :success="success" :dialogVisible="dialogVisible" :title="title" :dialogType="dialogType" :url="url"
        :handleEditT="handleEditT"></Dialog>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import Table from './components/Table.vue'//员工表格
import { ElNotification } from 'element-plus'
import Pagination from '@/components/Pagination.vue'//分页组件
import { ref, reactive, onMounted } from "vue";
import { piniaData } from '@/store';//引入pinia状态管理
import { internalLicense, selectLicense } from '@/api/user'
import { EiInfo } from '@/types'
//pinia状态管理
const store = piniaData();
const dialogVisible = ref(false)
const dialogType = ref(1)
const tableData = ref([])
const loading = ref(false)
const hide = ref(false)
const dataCount = ref(0)
const url = ref('')
const title = ref('')
const params = reactive({ pageNum: 1 })
const eiInfo = reactive(new EiInfo)
eiInfo.parameter = params
const select = (i) => {
    switch (i) {
        case 1:
            dialogVisible.value = true
            dialogType.value = 1
            url.value = '/license/read/excel'
            title.value = '上传作业证表格'
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 2
            url.value = '/license/upload/license/pic'
            title.value = '上传作业证照片'
            break;
        case 3:
            ElMessageBox.confirm('确认提交数据?')
                .then(() => {
                    eiInfo.userInfo = {
                        username: store.userInfo.username
                    }
                    internalLicense(eiInfo).then((res: any) => {
                        ElNotification({
                            message: res.sys.msg,
                            type: 'success',
                        })
                        tableData.value = []
                    })
                })
                .catch(() => {

                })
            break;
    }
}
onMounted(() => {
    selectUserList()
})
const handleEditT = () => {
    dialogVisible.value = false
}
//文件导入成功
const success = (val: any) => {
    ElNotification({
        message: val.sys.msg,
        type: 'success',
    })
    selectUserList();
    dialogVisible.value = false
}
const selectUserList = () => {
    loading.value = true
    selectLicense(eiInfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.excelData == undefined ? [] : res.result.excelData
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
        store.fileStatus = tableData.value != [] ? false : true
    })
}
</script>
<style scoped>
</style>