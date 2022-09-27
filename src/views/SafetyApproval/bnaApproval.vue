<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="false" :departmentSelect="departmentSelect"></Search>
    <Table :userType="false" :getQrCode="getQrCode" :approval="approval" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :from="from" :tableDatax="tableDatax" :uploadUserPic="uploadUserPic" :handleDelete="handleDelete"
        :isForm="isForm" :manageAreaList="manageAreaList" :projectId="0" :dialogType="2" :dialogVisible="dialogVisible"
        :handle="handle">
    </Dialog>
    <el-dialog v-model="dialog" title="请输入驳回原因" width="30%">
        <el-form-item label="驳回原因">
            <el-input class="input" v-model="remark" clearable placeholder="请输入驳回原因" />
        </el-form-item>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="warning" @click="handle(4)">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="qrImgDialog" title="打印二维码" width="500px">
        <div style="text-align: center">
            <el-button style="margin: 0 auto;" type="primary" v-print="'#printTest'">打印全部</el-button>
        </div>
        <div id="printTest">
            <div>
                <div style="text-align: center" class="qrDiv">
                    <h1 style="font-size: 27px">BNA安全</h1>
                    <img :src="qrImgB64" />
                    <div class="qrText">2022</div>
                    <div style="margin-top: -50px;line-height: 17px;font-size: 13px;">
                        <h2>部门:{{ baoDepartment }}</h2>
                        <h2>姓名:{{ userName }}</h2>
                        <h2>工号:{{ icCardWorkNumber }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import Table from './components/Table.vue'//员工表格
import Search from './components/Search.vue'
import Dialog from './components/Dialog.vue'
import { ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { bna, EiInfo, bnaInfo, examScore } from '@/types';
import { selectBnaSafety, selectBnaVerify, selectVerify } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
import { selectDepartment } from '@/api/areas'
import { ElNotification } from 'element-plus'
import { piniaData } from '@/store';//引入pinia状态管理
import { selectAddress } from '@/api/safety'
import jrQrcode from "jr-qrcode";

const store = piniaData();

//部门下拉框内容
const departmentSelect = ref([])
//分页搜索参数
const query = reactive(new bna);
const dialog = ref(false)
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//将分页搜索参数赋予eilnfo的parameter模块
eilnfo.parameter = query
const hide = ref(false)
//表格数据
const tableData = ref([]);
//总页数
const dataCount = ref(0);
const loading = ref(false)
const dialogVisible = ref(false)
const safeEduId = ref(0)
const manageAreaList: any = ref([])
const tableDatax: any = ref([])
const from = reactive(new examScore)
const remark = ref('')
const qrImgDialog = ref(false)
const baoDepartment = ref('')
const icCardWorkNumber = ref('')
const userName = ref('')
const qrImgB64 = ref('')
// 监听表格数据来开启提交按钮
watch(from, (newValue, oldValue) => {
    newValue.examPic != '' ? addExam() : false
})
// dom初始化完成请求数据操纵dom
onMounted(() => {

})
const handleClose = () => {
    dialog.value = false
}
const selectUserList = () => {
    loading.value = true
    selectBnaSafety(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.userSafeList == undefined ? [] : res.result.userSafeList
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
const approval = (index, row: any) => {
    if (store.userInfo.userAuth == 0) {
        ElNotification({
            message: '当前用户不具备审批权限',
            type: 'warning',
        })
    } else {
        if (store.userInfo.userAuth == 2 && row.safetyEducation1.checkStatus == '待审批' || row.safetyEducation1.checkStatus == '') {
            ElNotification({
                message: '上级审核未通过或不具备审批权限',
                type: 'warning',
            })
        } else if (store.userInfo.userAuth == 3 && (row.safetyEducation2.checkStatus == '待审批' || row.safetyEducation2.checkStatus == '未申请')) {
            ElNotification({
                message: '上级审核未通过或不具备审批权限',
                type: 'warning',
            })
        } else if (row.safetyEducation1.checkStatus == '通过' && row.safetyEducation2.checkStatus == '通过' && row.safetyEducation3.checkStatus == '通过') {
            ElNotification({
                message: '当前项目已经完成安全教育',
                type: 'warning',
            })
        } else if (store.userInfo.userAuth == 1 && row.safetyEducation1.checkStatus == '通过') {
            ElNotification({
                message: '当前已完成一级安全教育',
                type: 'warning',
            })
        } else if (store.userInfo.userAuth == 2 && row.safetyEducation2.checkStatus == '通过') {
            ElNotification({
                message: '当前已完成二级安全教育',
                type: 'warning',
            })
        } else {
            console.log(row);
            // 清空表单
            for (let i in from) { from[i] = '' }
            tableDatax.value = []
            dialogVisible.value = true
            let manageAreaType: any = 0
            let s: any = 0
            switch (store.userInfo.userAuth) {
                case 1:
                    s = 1
                    safeEduId.value = row.safetyEducation1.safeId
                    manageAreaType = 2
                    break;
                case 2:
                    s = row.safetyEducation2.manageAreaId
                    safeEduId.value = row.safetyEducation2.safeId
                    manageAreaType = 3
                    break;
                case 3:
                    safeEduId.value = row.safetyEducation3.safeId
                    break;
            }
            let eiInfo = new EiInfo
            eiInfo.parameter = {
                previousKey: s,
                manageAreaType: manageAreaType
            }
            selectAddress(eiInfo).then((res: any) => {
                manageAreaList.value = res.result.manageArea
            })
        }
    }
}
const getQrCode = (i: number, row: any) => {
    qrImgB64.value = jrQrcode.getQrBase64(
        `https://bnasafe.com?action=gogogo&id=${row.icCardWorkNumber}`
    );
    console.log(qrImgB64.value);

    userName.value = row.username;
    icCardWorkNumber.value = row.icCardWorkNumber;
    baoDepartment.value = row.baoDepartment;
    qrImgDialog.value = true;
}
const handle = (i: any) => {
    switch (i) {
        case 1:
            dialog.value = true
            break;
        case 2:
            if (from.trainStartDate != '' && from.trainEndDate != '' && from.examScore != '' && from.examDate != '' && from.nextSafeManageArea != '' && tableDatax.value.length != 0) {
                if (store.userInfo.userAuth == 3) {
                    submitApproval()
                } else {
                    submitApproval()
                    // nextSafeManageArea.value = 0
                }
            } else {
                ElNotification({
                    message: '请填写完整并添加考卷照片！',
                    type: 'warning',
                })
            }
            break;
        case 3:
            dialogVisible.value = false
            break;
        case 4:
            if (remark.value != '') {
                ElMessageBox.confirm('确定驳回申请?')
                    .then(() => {
                        let eiInfo = new EiInfo
                        eiInfo.parameter = {
                            result: 2,
                            safeEduId: safeEduId.value,
                            remark: remark.value,
                            trainStartDate: '',
                            trainEndDate: '',
                            examDate: '',
                            examScore: 0,
                            examPaperList: [],
                            nextSafeManageArea: 0,
                        }
                        eiInfo.userInfo = {
                            id: store.userInfo.id
                        }
                        selectBnaVerify(eiInfo).then((res: any) => {
                            if (res.sys.status != -1) {
                                ElNotification({
                                    message: "安全教育审批完成",
                                    type: 'success',
                                })
                            }
                            dialogVisible.value = false
                            dialog.value = false
                            selectUserList()
                        })
                    })
                    .catch(() => {
                        // catch error
                    })
            } else {
                ElNotification({
                    message: '请填写驳回原因！',
                    type: 'warning',
                })
            }
            break;
    }
}
const submitApproval = () => {
    ElMessageBox.confirm('确定通过审核?')
        .then(() => {
            let eiInfo = new EiInfo
            let examPaperList: any = []
            for (let i = 0; i < tableDatax.value.length; i++) {
                examPaperList.push(tableDatax.value[i].examPic)
            }
            eiInfo.parameter = {
                result: 1,
                safeId: safeEduId.value,
                trainStartDate: from.trainStartDate,
                trainEndDate: from.trainEndDate,
                examDate: from.examDate,
                examScore: from.examScore,
                examPaperList: examPaperList,
                nextSafeManageArea: from.nextSafeManageArea,
            }
            eiInfo.userInfo = {
                id: store.userInfo.id
            }
            console.log(eiInfo.parameter);

            selectBnaVerify(eiInfo).then((res: any) => {
                if (res.sys.status != -1) {
                    ElNotification({
                        message: "安全教育审批完成",
                        type: 'success',
                    })
                }
                dialogVisible.value = false
                selectUserList()
            })
        })
        .catch(() => {
            // catch error
        })
}

//自定义上传方法
const uploadUserPic = (f) => {
    getBase64(f.file).then((res: any) => {
        from.examPic = res
    });
}
// 移除按钮事件
const handleDelete = (i: any) => {
    ElMessageBox.confirm('确定移除选中项?')
        .then(() => {
            tableDatax.value.splice(i, 1);
        }).catch(() => { })
}
const addExam = () => {
    if (from.examPic != '') {
        tableDatax.value.push({
            examScore: from.examScore,
            examPic: from.examPic
        })
        from.examPic = ''
        ElNotification({
            message: '添加成功！',
            type: 'success',
        })
    } else {
        ElNotification({
            message: '请选择考卷照片！',
            type: 'warning',
        })
    }

}

// 表单验证
const isForm = (obj) => {
    for (let key in obj) {
        if (!obj[key]) {
            return false
        }
    }
    return true
};
</script>
<style scoped>
.qrDiv {
    width: 400px;
    border-radius: 14px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 20px;
    margin-bottom: 30px;
}

.qrText {
    width: 70px;
    text-align: center;
    line-height: 70px;
    position: relative;
    border-radius: 10px;
    top: -160px;
    font-size: 25px;
    font-weight: bold;
    left: 165px;
    height: 70px;
    background-color: white;
}
</style>