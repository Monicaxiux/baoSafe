<template>
    <Search :select="select"></Search>
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
import { selectQueryExcel, internalExcel } from '@/api/user'
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
            url.value = '/internal/read/excel'
            title.value = '上传安全教育表格'
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 2
            url.value = '/internal/upload/ic/pic'
            title.value = '上传IC卡照片'
            break;
        case 3:
            dialogVisible.value = true
            dialogType.value = 3
            url.value = '/internal/upload/user/pic'
            title.value = '上传个人照片'
            break;
        case 4:
            dialogVisible.value = true
            dialogType.value = 4
            url.value = '/e'
            title.value = '上传考卷照片'
            break;
        case 5:
            ElMessageBox.confirm('确认提交数据?')
                .then(() => {
                    store.fileStatus = true
                    ElNotification({
                        message: '正在提交中.....',
                        type: 'success',
                    })
                    eiInfo.userInfo = {
                        username: store.userInfo.username
                    }
                    internalExcel(eiInfo).then((res: any) => {
                        ElNotification({
                            message: res.sys.msg,
                            type: 'success',
                        })
                        selectUserList()
                    })
                })
                .catch(() => {
                    // catch error
                })
            break;
    }
}
const handleEdit = () => {

}
const handleEditT = () => {
    dialogVisible.value = false
}
onMounted(() => {
    selectUserList()
})
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
    selectQueryExcel(eiInfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.excelData == undefined ? [] : res.result.excelData
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
        if (dataCount.value == 0) {
            store.fileStatus = true
        } else {
            store.fileStatus = false
        }
    })
}
</script>
<style scoped>
</style>
