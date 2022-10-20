<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="userType" :departmentSelect="departmentSelect"
        :handleAdd="handleAdd">
    </Search>
    <Table :handleEdit="handleEdit" :userType="userType" :loading="loading" :handleDelete="handleDelete"
        :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :change="change" :baoFactoryList="baoFactoryList" :licenseEdit="licenseEdit" :licenseDelete="licenseDelete"
        :uploadUserPic="uploadUserPic" :uploadIcPic="uploadIcPic" :userInfo="userInfo" :userType="userType"
        :dialogVisible="dialogVisible" :dialogType="dialogType" :handleEditT="handleEditT"
        :handleCloseLis="handleCloseLis">
    </Dialog>
</template>
<script setup lang="ts">
import Table from './components/Table.vue'//员工表格
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { bna, EiInfo, bnaInfo } from '@/types';
import { addUser, deleteUser, selectBna, selectUpData, updateUser } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
import { selectDepartment, selectFactory } from '@/api/areas'
import { piniaData } from '@/store';//引入pinia状态管理
//pinia状态管理
const store = piniaData();
//正常用const定义，ref和reactive都是用来定义vue3响应式数据，ref定义的要用.value来控制
const userType = false;
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
const query = reactive(new bna);
//部门下拉框
const departmentSelect = ref([])
const baoFactoryList = ref([])
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
const userInfo = ref(new bnaInfo)
// dom初始化完成请求数据操纵dom
onMounted(() => {
    // selectUserList(eilnfo);//查询协力用户列表
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
})
const change = (val) => {
    let eiInfo = new EiInfo
    userInfo.value.baoFactory = ''
    eiInfo.parameter = {
        departmentId: val
    }
    selectFactory(eiInfo).then((res: any) => {
        baoFactoryList.value = res.result.factorySelect
    })
}
//查询用户列表
const selectUserList = (eilnfo) => {
    loading.value = true
    //传入eilnfo参数
    selectBna(eilnfo).then((res: any) => {
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
    // 查询数据，回滚页面
    selectUpData(eilnfo).then((res: any) => {
        userInfo.value = res.result.userLicense
        let eiInfo = new EiInfo
        eiInfo.parameter = {
            departmentId: userInfo.value.baoDepartment
        }
        selectFactory(eiInfo).then((res: any) => {
            baoFactoryList.value = res.result.factorySelect
        })
        dialogType.value = 1
        dialogVisible.value = true;
    })
}
// 新增协力员工
const handleAdd = () => {
    userInfo.value = new bnaInfo
    dialogType.value = 2
    dialogVisible.value = true;
}
// 确认编辑协力员工
const handleEditT = () => {
    if (userInfo.value.icCardWorkNumber.length == 0 || userInfo.value.username.length == 0) {
        ElNotification({
            message: "请填写IC卡号和员工姓名！",
            type: 'warning',
        })
    } else {
        let eiInfo = new EiInfo
        eiInfo.parameter = userInfo.value
        eiInfo.userInfo = store.userInfo
        switch (dialogType.value) {
            case 1:
                updateUser(eiInfo).then((res: any) => {
                    selectUserList(eilnfo)
                })
                break;
            case 2:
                addUser(eiInfo).then((res: any) => {
                    selectUserList(eilnfo)
                })
                break;
        }
        dialogVisible.value = false;
    }

}
const handleCloseLis = () => {
    ElMessageBox.confirm('确定取消操作?')
        .then(() => {
            dialogVisible.value = false;
        })
        .catch(() => {
            // catch error
        })
}
// 删除协力员工
const handleDelete = (index, row) => {
    ElMessageBox.confirm('确定要删除该员工?')
        .then(() => {
            let eiInfo = new EiInfo
            eiInfo.parameter = {
                userId: row.id
            }
            deleteUser(eiInfo).then((res: any) => {
                selectUserList(eilnfo)
                ElNotification({
                    message: '删除成功！',
                    type: 'success',
                })
            })
        })
        .catch(() => {
            // catch error
        })
}

//自定义上传方法
const uploadUserPic = (f) => {
    getBase64(f.file).then((res: any) => {
        userInfo.value.userPic = res
        userInfo.value.userPicModify = 1
    });
}
//自定义上传方法
const uploadIcPic = (f) => {
    getBase64(f.file).then((res: any) => {
        userInfo.value.icPicModify = 1
        userInfo.value.icPic = res
    });
}

const licenseDelete = () => {

}

const licenseEdit = () => {

}
</script>
