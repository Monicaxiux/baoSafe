<template>
    <el-dialog v-model="dialogVisible" title="审核安全教育" :width="dialogType == 1 ? '80%' : '50%'"
        :before-close="handleClose">
        <ESearch :from="from" :isForm="isForm" :handleDelete="handleDelete" :uploadUserPic=uploadUserPic
            :manageAreaList="manageAreaList" :tableDatax="tableDatax" :type="dialogType" :data="eiInfo"
            :select="selectUserList">
        </ESearch>
        <ETable v-if="dialogType == 1" :tableData="tableData" :loading="loading"></ETable>
        <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eiInfo.parameter.pageNum"
            :options="eiInfo" :render="selectUserList">
        </Pagination>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="warning" @click="handle(1)">驳回申请</el-button>
                <el-button type="primary" @click="handle(2)">同意申请</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted, watch } from 'vue'
import ESearch from './ESearch.vue'//员工表格
import ETable from './ETable.vue'//员工表格
import Pagination from '@/components/Pagination.vue'//分页组件
import { ElMessageBox } from 'element-plus'
import { EiInfo } from '@/types'
import { selectEachUser } from '@/api/user'
// 定义Props默认数据类型
type Props = {
    dialogVisible: boolean,
    dialogType: number,
    handle: Function,
    projectId: number,
    manageAreaList: any,
    from: any,
    isForm: any,
    handleDelete: any,
    uploadUserPic: any,
    tableDatax: any,
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const loading = ref(false)
const tableData = ref([])
const eiInfo = reactive(new EiInfo)
const dataCount = ref(0)
const hide = ref(false)
eiInfo.parameter = reactive({
    projectId: props.projectId,
    icCardWorkNumber: '',
    username: '',
    pageNum: 1
})
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定结束审核?')
        .then(() => {
            props.handle(3)
        })
        .catch(() => {
            // catch error
        })
}
// 监听项目变化查询内容
watch(props, (newValue, oldValue) => {
    eiInfo.parameter.projectId = newValue.projectId
    if (props.dialogType != 1) {

    } else {
        selectUserList();
    }
})
const selectUserList = () => {
    loading.value = true
    selectEachUser(eiInfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.safeList == undefined ? [] : res.result.safeList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
onMounted(() => {
    // selectUserList();
})
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>