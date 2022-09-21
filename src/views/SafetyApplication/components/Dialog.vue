<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="dialogType == 2 ? 1100 : 380" :before-close="handleClose">
        <div v-if="dialogType == 2" shadow="never">
            <Search :userType="userType" :searchType="2" :select="selectUserList" :submitStatus="true"
                :buttonStatus="true" :data="eilnfo" :departmentSelect="departmentSelect"></Search>
            <Table :userType="userType" :tableType="false" :tableData="tableData" :loading="loading" :handleDelete="[]"
                :handleChange="handleChange">
            </Table>
            <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum"
                :options="eilnfo" :render="selectUserList">
            </Pagination>
        </div>
        <el-card v-if="dialogType == 1" class="card" shadow="never">
            <br>
            <UploadFile :success="success" :dialogType="dialogType" :url="url"></UploadFile>
            <el-button @click="download">示例模板</el-button>
            <br><br><br>
            <el-card style="width:100%" shadow="hover">
                <h3>提交步骤</h3>
                <br />
                <div class="uploadTS">
                    <b style="color: black">1.请下载示例模板按照规范上传</b><br />
                    <b style="color: black">2.上传后请确认信息正确无误，再点击确认提交</b><br />
                    <b>注意：只能上传xlsx/xls文件，且不超过500mb</b>
                    <br />
                </div>
            </el-card>
        </el-card>
        <template v-if="dialogType != 1" #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleEditT(multiple)">确定</el-button>
            </span>
        </template>

    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Search from './Search.vue'
import Table from './Table.vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import UploadFile from '@/components/UploadFile.vue'
import { bna, external, EiInfo } from '@/types';
import { selectBna, selectExternal } from '@/api/user';//api方法
import { ElNotification } from 'element-plus'
// 定义Props默认数据类型
type Props = {
    dialogVisible: boolean,
    dialogType: number,
    handleEditT: Function,
    departmentSelect: any,
    handleClose: Function,
    url: string,
    title: string,
    userType: boolean,
    success: Function
}
const download = () => {
    ElNotification({
        message: "正在下载示例模板，请稍等...",
        type: 'success',
    }),
        window.location.href =
        "https://safeedu.bnasafe.com/download/assist/excel";
}
//是否展示分页
const hide = ref(false);
//总页数
const dataCount = ref(0);
//表格数据
const tableData = ref([]);
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
//加载
const loading = ref(false)
//分页搜索参数
const query = reactive(props.userType ? new external : new bna);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
const multiple = ref([])//多选选中内容

const selectUserList = (eilnfo) => {
    let select: Function
    if (props.userType) {
        select = selectExternal
    } else {
        select = selectBna
    }
    loading.value = true
    //查询用户列表
    select(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.userList == undefined ? [] : res.result.userList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}

// 多选框选中事件
const handleChange = (val: any) => {
    multiple.value = val
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.uploadTS {
    font-size: 12px;
    line-height: 160%;
    color: red;
    text-align: left;
}

.card {
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>