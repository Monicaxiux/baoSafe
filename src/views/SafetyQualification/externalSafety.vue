<template>
    <Search :select="selectUserList" :userType="false" :data="eilnfo"></Search>
    <Table :getQrCode="getQrCode" :licenseEdit="licenseEdit" :tableData="tableData" :loading="loading" :userType="false"></Table>
    <br />
    <el-pagination background @size-change="handleSizeChange" @current-change="handlePageChange"
        :page-sizes="[10, 30, 100]" :current-page="data.pageNum" :page-size="10" layout="total,prev, pager, next"
        :total="dataCount">
    </el-pagination>
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
        <el-pagination v-if="hide2" background @size-change="handleSizeChange2" @current-change="handlePageChange2"
            :page-sizes="[10, 30, 100]" :current-page="data.pageNum" :page-size="10"
            layout="total,prev, pager, next, jumper" :total="dataCount2">
        </el-pagination>
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
                        <h2>IC卡号:{{ item.icCardWorkNumber }}</h2 >
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Search from './components/Search.vue'
import MyImg from '@/components/ImaPreview.vue'
import Table from './components/Table.vue'
import { selectSafetylicense, selectProjectUser } from '@/api/user'
import {deleteProject} from '@/api/safety'
import { EiInfo, selectSafe } from '@/types';
import { uplodUrl } from '@/utils/url'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { piniaData } from '@/store';//引入pinia状态管理
import { ElLoading } from 'element-plus'
import request from '@/utils/request'
import jrQrcode from "jr-qrcode";
//pinia状态管理
const store = piniaData();
const data = reactive({
    projectId: '',
    // username: '',
    pageNum: 1
})
const year = ref()
const tableDataUser = ref([]);
const base64img: any = ref([])
const qrImgB64: any = ref([])
const dialogVisible2 = ref(false)
const qrImgDialog = ref(false)
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
onMounted(()=>{
    var date = new Date;
    year.value = date.getFullYear();
})
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
        console.log("来了");

    })
}
const getQrCode = (i: number, row: any) => {
    qrImgB64.value=[];
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
const loading = ref(false)
const licenseEdit = (i: number, row: any, type: number) => {
    let eiInfo = new EiInfo();
    switch (type) {
        case 1:
            ElNotification({
                message: '下载中，请稍后...',
                type: 'success',
            })
            window.location.href = `${uplodUrl}/download/safe/word/1?projectId=${row.projectId}`
            break;
        case 5:
            ElNotification({
                message: '下载中，请稍后...',
                type: 'success',
            })
            window.location.href = `${uplodUrl}/download/safe/word/2?projectId=${row.projectId}`
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
        case 6:
            console.log(row);
            eiInfo.parameter={
                projectId:row.projectId
            }
            eiInfo.userInfo={
                id:store.userInfo.id
            }
            ElMessageBox.confirm(
                '确定删除该项目？',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                ).then(() => {
                    deleteProject(eiInfo).then((res:any)=>{
                        console.log(res);
                        if(res.sys.status!=-1){
                            ElMessage({
                                type: 'success',
                                message: '删除成功',
                            })
                            selectUserList();
                            console.log(res.result.countVerifySafeEduExternal);
                            
                            store.countVerifySafeEduExternal=res.result.countVerifySafeEduExternal;
                        }
                    })
                }).catch(() => {
                   
                })
        break;
    }

}
// 分页导航
const handlePageChange = (val) => {
    data.pageNum = val;
    selectUserList();
};
const handleSizeChange = (val) => {
    data.pageNum = val;
    selectUserList();
}
// 分页导航
const handlePageChange2 = (val) => {
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
const handleSizeChange2 = (val) => {
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

.qrDiv {
    width: 400px;
    border-radius: 14px;
    margin: 0 auto;
    /* padding-top: 50px; */
    padding-bottom: 20px;
    margin-bottom: 30px;
}
h2{
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
