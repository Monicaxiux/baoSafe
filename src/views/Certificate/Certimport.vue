<template>
    <Search :data="[]" :add="null" :searchType="2" :select="select"></Search>
    <Table :licenseEdit="licenseEdit" :type="false" :handleEdit="null" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eiInfo.parameter.pageNum" :options="eiInfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :success="success" :fileList="fileList" :dialogVisible="dialogVisible" :title="title"
        :dialogType="dialogType" :url="url" :handleEditT="handleEditT"></Dialog>
    <el-dialog v-model="dialogVisibleimg" title="查看作业证照片" width="30%" :before-close="handleClose">
        <MyImg v-for="(item) in filePic" :imgUrl="item"></MyImg>
    </el-dialog>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import MyImg from "@/components/ImaPreview.vue";
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
const fileList = ref([])
eiInfo.parameter = params
const dialogVisibleimg = ref(false);
const filePic: any = ref([])

const handleClose = () => {
    dialogVisibleimg.value = false;
};
const licenseEdit = (row: any) => {
    filePic.value = row
    dialogVisibleimg.value = true
}
const select = (i) => {
    switch (i) {
        case 1:
            dialogVisible.value = true
            dialogType.value = 1
            url.value = '/license/read/excel'
            title.value = '上传作业证表格'
            fileList.value = []
            break;
        case 2:
            dialogVisible.value = true
            dialogType.value = 2
            url.value = '/license/upload/license/pic'
            title.value = '上传作业证照片'
            fileList.value = []
            break;
        case 3:
            ElMessageBox.confirm('确认提交数据?')
                .then(() => {
                    store.lsfileStatus = true
                    ElNotification({
                        message: '正在导入中...',
                        type: 'success',
                    })
                    eiInfo.userInfo = {
                        username: store.userInfo.username
                    }
                    internalLicense(eiInfo).then((res: any) => {
                        ElNotification({
                            message: res.sys.msg,
                            type: 'success',
                        })
                        tableData.value = []
                        selectUserList()
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
    fileList.value = []
    setTimeout(() => {
        selectUserList();
    }, 600)
    dialogVisible.value = false
    selectUserList();

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
        store.lsfileStatus = dataCount.value != 0 ? false : true
    })
}
</script>
<style scoped>

</style>