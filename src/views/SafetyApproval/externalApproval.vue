<template>
    <Search :select="selectUserList" :data="eilnfo" :userType="true" :departmentSelect="departmentSelect"></Search>
    <Table :userType="true" :getQrCode="getQrCode" :approval="approval" :loading="loading" :tableData="tableData">
    </Table>
    <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
        :render="selectUserList">
    </Pagination>
    <Dialog :from="[]" :tableDatax="[]" :uploadUserPic="[]" :handleDelete="[]" :isForm="[]" :manageAreaList="[]"
        :projectId="projectId" :dialogType="1" :dialogVisible="dialogVisible" :handle="handle">
    </Dialog>
    <el-dialog v-model="dialog" title="请选择下级区域" width="40%" :before-close="close">
        <el-form-item label="下级区域">
            <el-select style="width: 150px;margin-right: 20px;" multiple v-model="nextSafeManageArea"
                placeholder="请选择下级区域">
                <el-option v-for="item in manageAreaList" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="附件上传">
            <UploadImage :upload="uploadUserPic" :uploadType="true" :url="filePic"></UploadImage>
        </el-form-item>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitApproval">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="qrImgDialog" title="打印二维码" width="500px">
        <div style="text-align: center">
            <el-button type="primary" v-print="'#printTest'">打印全部</el-button>
        </div>
        <div style="text-align: center" id="printTest">
            <div style="text-align: center" v-for="item in qrImgB64" :key="item.id">
                <div style="text-align: center" class="qrDiv">
                    <h1 style="font-size: 30px;margin: 0;">宝日智慧安全</h1>
                    <!-- <br /> -->
                    <img :src="item.base64img" />
                    <div class="qrText">{{ year }}</div>
                    <div style="margin-top: -85px;">
                        <h2>姓名:{{ item.username }}</h2>
                        <h2>IC卡号:{{ item.icCardWorkNumber }}</h2>
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
import { ref, onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'//分页组件
import { bna, EiInfo, bnaInfo, selectApproval } from '@/types';
import { selectVerify, selectSafety } from '@/api/user';//api方法
import { getBase64 } from '@/utils/regexp'
import { selectDepartment } from '@/api/areas'
import UploadImage from '@/components/UploadImage.vue'
import { ElMessageBox } from 'element-plus'
import { selectAddress } from '@/api/safety'
import { piniaData } from '@/store';//引入pinia状态管理
import { ElNotification } from 'element-plus'
import jrQrcode from "jr-qrcode";
import request from '@/utils/request'
import { ElLoading } from 'element-plus'

//pinia状态管理
const store = piniaData();
//部门下拉框
const departmentSelect = ref([])
const year = ref()
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
const filePic: any = ref([])
//总页数
const dataCount = ref(0);
const base64img: any = ref([])
const qrImgB64: any = ref([])
const qrImgDialog = ref(false)
const nextSafeManageArea = ref([])
const manageAreaList: any = ref([])
const loading = ref(false)
const projectId = ref(0)
const safeEduId = ref(0)
// dom初始化完成请求数据操纵dom
onMounted(() => {
    var date = new Date;
    year.value = date.getFullYear();
    eilnfo.parameter = {}
    selectUserList();//查询用户列表
    selectDepartment().then((res: any) => {
        departmentSelect.value = res.result.departmentSelect
    })
})
const selectUserList = () => {
    loading.value = true

    eilnfo.userInfo = store.userInfo
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
//自定义上传方法
const uploadUserPic = (f) => {
    getBase64(f.file).then((res: any) => {
        filePic.value.push(res)
    });
}
const approval = (index, row: any) => {
    filePic.value = []
    if (store.userInfo.userAuth == 0) {
        ElNotification({
            message: '当前用户不具备审批权限',
            type: 'warning',
        })
    } else {

        // if (store.userInfo.userAuth == 1 && row.safetyEducation.safeLevel != '一级安全教育') {
        //     ElNotification({
        //         message: '当前用户只具备一级审批权限',
        //         type: 'warning',
        //     })
        // } else if (store.userInfo.userAuth == 2 && row.safetyEducation.safeLevel != '二级安全教育') {
        //     ElNotification({
        //         message: '当前用户只具备二级审批权限',
        //         type: 'warning',
        //     })
        // } else if (store.userInfo.userAuth == 3 && row.safetyEducation.safeLevel != '三级安全教育') {
        //     ElNotification({
        //         message: '当前用户只具备三级审批权限',
        //         type: 'warning',
        //     })
        // } else {
        projectId.value = row.projectId
        console.log(row);
        dialogVisible.value = true
        let manageAreaType: any = 0
        let s: any = 0
        switch (row.safetyEducation.safeLevel) {
            case "一级安全教育":
                if (row.safetyEducation.checkStatus == "通过" && row.safetyEducation.safeLevel == '二级安全教育') {
                    s = row.safetyEducation.manageAreaId
                    safeEduId.value = row.safetyEducation.id
                    manageAreaType = 3
                } else {
                    s = 1
                    safeEduId.value = row.safetyEducation.id
                    manageAreaType = 2
                }
                store.safeLevel = "一级安全教育"
                break;
            case "二级安全教育":
                s = row.safetyEducation.manageAreaId
                safeEduId.value = row.safetyEducation.id
                manageAreaType = 3
                store.safeLevel = "二级安全教育"
                break;
            case "三级安全教育":
                safeEduId.value = row.safetyEducation.id
                store.safeLevel = "三级安全教育"
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
        // }

    }


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
const getQrCode = (i: number, row: any) => {
    qrImgB64.value = [];
    const eiInfo = new EiInfo();
    eiInfo.parameter = {
        projectId: row.projectId,
        pageNum: -1,
    };
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    request.post("/assist/safety/status/each/user", eiInfo).then((res: any) => {
        let idList: any = [];
        for (let i = 0; i < res.result.safeList.length; i++) {
            idList.push(res.result.safeList[i].icCardWorkNumber);
        }
        let jxIdList: any = [];
        for (let i = 0; i < idList.length; i++) {
            // jxIdList.push(window.btoa(idList[i]))
            jxIdList.push(idList[i]);

            base64img.value.push(
                jrQrcode.getQrBase64(
                    `https://bnasafe.com?action=gogogo&id=${jxIdList[i]}`)
            );
            qrImgB64.value.push({
                id: res.result.safeList[i].userId,
                username: res.result.safeList[i].username,
                icCardWorkNumber: res.result.safeList[i].icCardWorkNumber,
                base64img: base64img.value[i],
            });
        }
        loading.close();
        qrImgDialog.value = true
    });

}
const handle = (i: any) => {
    switch (i) {
        case 1:
            ElMessageBox.confirm('确定驳回申请?')
                .then(() => {
                    let eiInfo = new EiInfo
                    eiInfo.parameter = {
                        result: 2,
                        safeEduId: safeEduId.value
                    }
                    eiInfo.userInfo = {
                        id: store.userInfo.id
                    }
                    selectVerify(eiInfo).then((res: any) => {
                        if (res.sys.status != -1) {
                            ElNotification({
                                message: "安全教育审批完成",
                                type: 'success',
                            })
                        }

                        dialog.value = false
                        dialogVisible.value = false
                        selectUserList()
                    })
                })
                .catch(() => {
                    // catch error
                })
            break;
        case 2:

            if (store.userInfo.userAuth == 3 || store.safeLevel == "三级安全教育") {
                submitApproval()
            } else {
                nextSafeManageArea.value = []
                filePic.value = []
                dialog.value = true
            }
            break;
        case 3:
            dialogVisible.value = false
            break;
    }
}
const submitApproval = () => {
    if (nextSafeManageArea.value.length == 0 && store.userInfo.userAuth != 3 && store.safeLevel != "三级安全教育") {
        ElNotification({
            message: "请选择下级区域",
            type: 'error',
        })
    } else {
        ElMessageBox.confirm('确定通过审批?')
            .then(() => {
                let eiInfo = new EiInfo
                eiInfo.parameter = {
                    result: 1,
                    safeEduId: safeEduId.value,
                    nextSafeManageArea: nextSafeManageArea.value,
                    filePic: filePic.value
                }
                eiInfo.userInfo = {
                    id: store.userInfo.id,
                    auth: store.userInfo.userAuth
                }
                selectVerify(eiInfo).then((res: any) => {
                    if (res.sys.status != -1) {
                        ElNotification({
                            message: "安全教育审批完成",
                            type: 'success',
                        })
                        store.countVerifySafeEduExternal = res.result.countVerifySafeEduExternal
                    }
                    dialog.value = false
                    dialogVisible.value = false
                    selectUserList()
                })

            })
            .catch(() => {
                // catch error
            })
    }
}
</script>
<style scoped>
.qrDiv {
    width: 400px;
    border-radius: 14px;
    margin: 0 auto;
    /* padding-top: 50px; */
    padding-bottom: 20px;
    margin-bottom: 30px;
}

h2 {
    margin: 0;
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