<template>
    <Search :select="selectUserList" :userType="false" :data="eilnfo"></Search>
    <Table :licenseEdit="licenseEdit" :tableData="tableData" :loading="loading" :userType="false"></Table>
    <el-dialog v-model="dialogVisible" title="查看附件" width="30%" :before-close="handleClose">
        <MyImg v-for="(item) in filePic" :imgUrl="item"></MyImg>
    </el-dialog>
    <el-dialog v-model="dialogVisible2" title="查看人员" width="50%" :before-close="handleClose2">
        <!-- <el-form :model="data" status-icon class="demo-ruleForm from">
            <el-form-item label="工号">
                <el-input class="input" v-model="data.icCardWorkNumber" clearable placeholder="请输入工号" />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input class="input" v-model="data.username" clearable placeholder="请输入姓名" />
            </el-form-item>
            <el-button type="primary" class="button" @click="(data.pageNum = 1)">
                查询
            </el-button>
        </el-form> -->
        <el-table max-height="650" :data="tableDataUser" border class="tablex">
            <el-table-column fixed prop="icCardWorkNumber" label="IC工号" />
            <el-table-column fixed prop="username" label="员工姓名" />
        </el-table>
        <br>
        <el-pagination v-if="hide2" background @size-change="handleSizeChange" @current-change="handlePageChange"
            :page-sizes="[10, 30, 100]" :current-page="data.pageNum" :page-size="10"
            layout="total,prev, pager, next, jumper" :total="dataCount2">
        </el-pagination>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Search from './components/Search.vue'
import MyImg from '@/components/ImaPreview.vue'
import Table from './components/Table.vue'
import { selectSafetylicense, selectProjectUser } from '@/api/user'
import { EiInfo, selectSafe } from '@/types';
import { uplodUrl } from '@/utils/url'
import { ElNotification } from 'element-plus';
const data = reactive({
    projectId: '',
    // username: '',
    pageNum: 1
})
const tableDataUser = ref([]);
const dialogVisible2 = ref(false)
const quer = reactive(new selectSafe)
const dialogVisible = ref(false)
const eilnfo = reactive(new EiInfo)
eilnfo.parameter = quer
const dataCount = ref(0)
const dataCount2 = ref(0)
const hide = ref(false)
const hide2 = ref(false)
const filePic: any = ref([])
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
const licenseEdit = (i: number, row: any, type: number) => {
    switch (type) {
        case 1:
            ElNotification({
                message: '下载中，请稍后...',
                type: 'success',
            })
            window.location.href = `${uplodUrl}/download/safe/word/1?projectId=${row.projectId}`
            setTimeout(() => {
                window.location.href = `${uplodUrl}/download/safe/word/2?projectId=${row.projectId}`
            }, 2000)
            break;
        case 2:
            console.log(row.filePic);
            filePic.value = row.filePic
            dialogVisible.value = true
            break;
        case 3:
            ElNotification({
                message: '下载中，请稍后...',
                type: 'success',
            })
            for (let i = 0; i < row.filesPath.length; i++) {
                setTimeout(() => {
                    window.open(row.filesPath[i])
                }, 2000)
                console.log(row.filesPath[i]);
            }
            break;
        case 4:
            data.pageNum = 1;
            let eiInfo = new EiInfo();
            data.projectId = row.projectId
            eiInfo.parameter = data
            selectProjectUser(eiInfo).then((res: any) => {
                dialogVisible2.value = true;
                //将用户信息列表数据传入子组件
                tableDataUser.value = res.result.result == undefined ? [] : res.result.result
                // 分页总页数
                dataCount2.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
                // 如果只有一页则不展示分页
                hide2.value = dataCount2.value < 11 ? false : true
            })
            break;
    }

}
// 分页导航
const handlePageChange = (val) => {
    data.pageNum = val;
    let eiInfo = new EiInfo();
    eiInfo.parameter = data
    selectProjectUser(eiInfo).then((res: any) => {
        dialogVisible2.value = true;
        //将用户信息列表数据传入子组件
        tableDataUser.value = res.result.result == undefined ? [] : res.result.result
        // 分页总页数
        dataCount2.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide2.value = dataCount2.value < 11 ? false : true
    })
};
//切换分页条数
const handleSizeChange = (val) => {
    data.pageNum = val;
    let eiInfo = new EiInfo();
    eiInfo.parameter = data
    selectProjectUser(eiInfo).then((res: any) => {
        dialogVisible2.value = true;
        //将用户信息列表数据传入子组件
        tableDataUser.value = res.result.result == undefined ? [] : res.result.result
        // 分页总页数
        dataCount2.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide2.value = dataCount2.value < 11 ? false : true
    })
};
const handleClose = () => {
    dialogVisible.value = false
}
const handleClose2 = () => {
    dialogVisible2.value = false
}
</script>
<style scoped>
.input {
    width: 150px;
    margin-right: 20px;
}

.from {
    display: flex;
}
</style>
