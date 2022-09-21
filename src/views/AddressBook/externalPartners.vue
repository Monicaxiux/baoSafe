<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="userType" :departmentSelect="[]" :handleAdd="handleAdd">
    </Search>
    <Table :handleEdit="handleEdit" :userType="userType" :loading="loading" :handleDelete="handleDelete"
        :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :licenseEdit="licenseEdit" :licenseDelete="licenseDelete" :uploadUserPic="uploadUserPic"
        :uploadIcPic="uploadIcPic" :userInfo="userInfo" :userType="userType" :dialogVisible="dialogVisible"
        :dialogType="dialogType" :handleEditT="handleEditT">
    </Dialog>
</template>
<script setup lang="ts">
import Table from './components/Table.vue'//员工表格
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { external, EiInfo, externalInfo } from '@/types';
import { selectExternal, selectUpData } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
//正常用const定义，ref和reactive都是用来定义vue3响应式数据，ref定义的要用.value来控制
const userType = true;
//总页数
const dataCount = ref(0);
//表格数据
const tableData = ref([]);
//对话框显示隐藏
const dialogVisible = ref(false)
//对话框类型
const dialogType = ref(0)
//是否展示分页
const hide = ref(false);
//加载
const loading = ref(false)
//分页搜索参数
const query = reactive(new external);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
// 新增/编辑  表单
const userInfo = ref(new externalInfo);
// dom初始化完成请求数据操纵dom
onMounted(() => {
    selectUserList(eilnfo);//查询协力用户列表
})
//查询协力用户列表
const selectUserList = (eilnfo) => {
    loading.value = true
    //调用查询协力员工方法传入eilnfo参数
    selectExternal(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.userList == undefined ? [] : res.result.userList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}

// 编辑协力员工
const handleEdit = (index, row) => {
    let eilnfo = new EiInfo
    eilnfo.parameter = {
        userId: row.id
    }
    selectUpData(eilnfo).then((res: any) => {
        console.log(res.result.userLicense);
        userInfo.value = res.result.userLicense
        dialogType.value = 1
        dialogVisible.value = true;
    })

}

// 新增协力员工
const handleAdd = () => {
    userInfo.value = new externalInfo
    dialogType.value = 2
    dialogVisible.value = true;
}

// 确认编辑协力员工
const handleEditT = () => {
    dialogVisible.value = false;
}

// 删除协力员工
const handleDelete = (index, row) => {
    ElMessageBox.confirm('确定要删除该员工?')
        .then(() => {
            console.log(row.id, "删除按钮");
        })
        .catch(() => {
            // catch error
        })
}

//自定义上传方法
const uploadUserPic = (f) => {
    getBase64(f.file).then((res: any) => {
        userInfo.value.userPic = res
    });
}

//自定义上传方法
const uploadIcPic = (f) => {
    getBase64(f.file).then((res: any) => {
        userInfo.value.icPic = res
    });
}

const licenseDelete = () => {

}

const licenseEdit = () => {

}
</script>
