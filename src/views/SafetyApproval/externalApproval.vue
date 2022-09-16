<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="true" :departmentSelect="departmentSelect"></Search>
    <Table :userType="true" :getQrCode="getQrCode" :approval="approval" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :projectId="projectId" :dialogType="1" :dialogVisible="dialogVisible" :handle="handle"></Dialog>
    <el-dialog v-model="dialog" title="请选择下级区域" width="30%" :before-close="close">
        <el-form-item label="二级区域">
            <el-select style="width: 150px;margin-right: 20px;" v-model="nextSafeManageArea" placeholder="请选择二级区域">
                <el-option v-for="item in manageAreaList" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
        </el-form-item>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitApproval">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'//员工表格
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ref, onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { bna, EiInfo, bnaInfo, selectApproval } from '@/types';
import { selectBna, selectUpData, selectSafety } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
import { selectDepartment } from '@/api/areas'
import { ElMessageBox } from 'element-plus'
import { selectAddress } from '@/api/safety'

//部门下拉框
const departmentSelect = ref([])
//分页搜索参数
const query = reactive(new selectApproval);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
const userInfo = ref(new bnaInfo)
const dialogVisible = ref(false)
const hide = ref(false)
const dialog = ref(false)
//表格数据
const tableData = ref([]);
//总页数
const dataCount = ref(0);

const nextSafeManageArea = ref([])
const manageAreaList: any = ref([])
const loading = ref(false)
const projectId = ref(0)
// dom初始化完成请求数据操纵dom
onMounted(() => {
    // selectUserList(eilnfo);//查询用户列表
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
})
const selectUserList = () => {
    loading.value = true
    selectSafety(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.safeList == undefined ? [] : res.result.safeList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
const approval = (index, row: any) => {
    projectId.value = row.projectId
    console.log(projectId.value);
    dialogVisible.value = true

}
const close = () => {
    ElMessageBox.confirm('确定取消操作?')
        .then(() => {
            dialog.value = false
        })
        .catch(() => {
            // catch error
        })
}
const getQrCode = () => {
}

const handle = (i: any) => {
    switch (i) {
        case 1:
            ElMessageBox.confirm('确定驳回申请?')
                .then(() => {

                })
                .catch(() => {
                    // catch error
                })
            break;
        case 2:
            dialog.value = true
            break;
        case 3:
            dialogVisible.value = false
            break;
    }
}
const submitApproval = () => {

}
</script>
<style scoped>
</style>