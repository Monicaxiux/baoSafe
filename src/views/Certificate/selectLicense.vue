<template>
  <Search :select="selectUserList" :add="add" :data="eilnfo" :searchType="1"></Search>
  {{ msgTitle }}<el-tag class="tag" @click="(eilnfo.parameter.baoCompany = i, selectUserList(true))"
    v-for="i in resButton">{{
        i
    }}</el-tag>
  <br><br>
  <Table :type="true" :handleEdit="handleEdit" :licenseEdit="licenseEdit" :handleChange="handleChange"
    :loading="loading" :multipleSelection="multipleSelection" :tableType="true" :tableData="tableData"
    :license="license"></Table>
  <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
    :render="selectUserList">
  </Pagination>
  <el-dialog v-model="dialogVisible" :title="dialogType == 1 ? '编辑证书' : '添加证书'" width="40%" :before-close="handleClose">
    <el-card shadow="hover">
      <h1>作业证信息</h1>
      <el-form :model="userInfo" status-icon class="demo-ruleForm from" label-width="70px">
        <el-form-item v-if="dialogType != 1" label="IC卡号">
          <el-input class="input" v-model="userInfo.icCardWorkNumberExact" clearable placeholder="请输入IC卡号" />
        </el-form-item>
        <el-form-item v-if="dialogType != 1" label="证书类型">
          <el-select style="width: 100%" v-model="userInfo.licenseType" placeholder="请选择作业证类型">
            <el-option v-for="item in licenseTypeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="证书编号">
          <el-input class="input" v-model="userInfo.licenseNumber" clearable placeholder="请输入证书编号" />
        </el-form-item>
        <el-form-item label="证书名称">
          <el-input class="input" v-model="userInfo.licenseName" clearable placeholder="请输入证书名称" />
        </el-form-item>
        <el-form-item label="取证日期">
          <el-date-picker style="width: 100%;" v-model="userInfo.receiveDate" value-format="YYYY-MM-DD" type="date"
            placeholder="请选择取证日期" />
        </el-form-item>
        <el-form-item label="复证日期">
          <el-date-picker style="width: 100%;" v-model="userInfo.restoreDate" value-format="YYYY-MM-DD" type="date"
            placeholder="请选择复证日期" />
        </el-form-item>
        <el-form-item label="到期日期">
          <el-date-picker style="width: 100%;" v-model="userInfo.expiryDate" value-format="YYYY-MM-DD" type="date"
            placeholder="请选择到期日期" />
        </el-form-item>
        <el-form-item label="证书照片">
          <UploadImage :uploadType="true" :upload="uploadUserPic" :url="userInfo.licensePic"></UploadImage>
        </el-form-item>
      </el-form>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEditT">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="历史记录" width="80%" :before-close="handleClose2">
    <el-table border v-loading="loading" max-height="600" :data="tableDataHistory" class="tablex">
      <el-table-column prop="licenseName" label="证书名称" width="200" />
      <el-table-column prop="licenseNumber" label="证书编号" width="200" />
      <el-table-column prop="licenseType" label="证书类型" width="200" />
      <el-table-column prop="receiveDate" label="取证日期" width="110" />
      <el-table-column prop="restoreDate" label="复证日期" width="110" />
      <el-table-column prop="expiryDate" label="到期日期" width="110" />
      <el-table-column prop="modifyType" label="操作类型" width="110" />
      <el-table-column prop="modifyUser" label="操作人" width="110" />
      <el-table-column prop="modifyTime" label="操作日期" width="170" />
      <el-table-column label="证书照片" width="90">
        <template #default="scope">
          <!-- <MyImg :imgUrl="scope.row.licensePic"></MyImg> -->
          <el-button v-if="scope.row.licensePic != '' && scope.row.licensePic"
            @click="licenseEdit(scope.row.licensePic)" size="small" type="primary" plain>查看照片
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog v-model="dialogVisibleimg" title="查看作业证照片" width="30%" :before-close="handleClose3">
    <MyImg v-for="(item) in filePic" :imgUrl="item"></MyImg>
  </el-dialog>
</template>
<script lang="ts" setup>
import Table from "./components/Table.vue";
import Pagination from "@/components/Pagination.vue"; //分页组件
import Search from "./components/Search.vue";
import MyImg from "@/components/ImaPreview.vue";
import { ref, reactive } from "vue";
import { EiInfo, expiration } from "@/types";
import {
  selectExpira,
  licenseUpdate,
  licenseInsert,
  selectHistory,
  selectHistoryPic
} from "@/api/user";
import { ElNotification } from "element-plus";
import UploadImage from "@/components/UploadImage.vue";
import { getBase64 } from "@/utils/regexp";
import { piniaData } from "@/store"; //引入pinia状态管理
import { title } from "process";
//pinia状态管理
const store = piniaData();
const quer = reactive(new expiration());
const eilnfo = reactive(new EiInfo());
const resButton = ref([])
const msgTitle = ref('');

eilnfo.parameter = quer;
const tableData = ref([]);
const tableDataHistory = ref([]);
const loading = ref(false);
const dataCount = ref(0);
const hide = ref(false);
const multipleSelection = ref([]);
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogVisibleimg = ref(false);
const filePic: any = ref([])

const dialogType = ref(1);
const userInfo: any = ref({
  icCardWorkNumberExact: "",
  licenseNumber: "",
  licenseName: "",
  receiveDate: "",
  restoreDate: "",
  expiryDate: "",
  licensePic: "",
});
const licenseTypeList = ref([
  {
    id: 1,
    name: "特种作业证",
  },
  {
    id: 2,
    name: "生产经营单位负责人证",
  },
  {
    id: 3,
    name: "安全生产管理人员证",
  },
  {
    id: 4,
    name: "特种设备操作证",
  },
]);

const license = () => { };
// 多选框选中事件
const handleChange = (val: any) => {
  multipleSelection.value = val.map((item) => item.licenseId);
};

const licenseEdit = (row: any) => {
  filePic.value = row
  dialogVisibleimg.value = true
}
const selectUserList = (n) => {
  if (!n) {
    console.log(n);
    tableData.value = []
    dataCount.value = 0
    hide.value = false
    msgTitle.value = ''
  } else {
    eilnfo.parameter.overdue = 0;
    loading.value = false;
    selectExpira(eilnfo).then((res: any) => {
      loading.value = false;
      if (res.sys.status == 2) {
        msgTitle.value = res.sys.msg;
        resButton.value = res.result.result;
        tableData.value = []
        dataCount.value = 0
        hide.value = false
      } else {
        msgTitle.value = res.sys.msg;
        //将用户信息列表数据传入子组件
        tableData.value = res.result.result == undefined ? [] : res.result.result;
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount;
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true;
      }
    });
  }

};

//自定义上传方法
const uploadUserPic = (f) => {
  getBase64(f.file).then((res: any) => {
    userInfo.value.licensePic.push(res);
  });
};

// 下载特种作业证表格
const download = () => {
  multipleSelection.value.length != 0
    ? (ElNotification({
      message: "正在导出作业证表格，请稍等...",
      type: "success",
    }),
      // (window.location.href = `http://10.3.18.222:8189/download/soon/overdue/license/excel?licenseId=${multipleSelection.value}`))
      (window.location.href = `http://10.3.18.222:8189:8189/download/soon/overdue/license/excel?licenseId=${multipleSelection.value}`))
    : ElNotification({
      message: "请选择要导出的证书",
      type: "warning",
    });
};
const handleEdit = (index, row, i) => {
  switch (i) {
    case 1:
      dialogType.value = 1;
      let eiInfox = new EiInfo();
      eiInfox.parameter = {
        licenseNumber: row.licenseNumber,
        licenseName: row.licenseName,
      };
      userInfo.value = JSON.parse(JSON.stringify(row));
      selectHistoryPic(eiInfox).then((res: any) => {
        userInfo.value.licensePic = res.result.result;
      })
      dialogVisible.value = true;
      break;
    case 2:
      console.log(row.licenseNumber);
      let eiInfo = new EiInfo();
      eiInfo.parameter = {
        licenseNumber: row.licenseNumber,
        pageNum: 1,
      };

      selectHistory(eiInfo).then((res: any) => {
        tableDataHistory.value = res.result.recordHistory;
      });
      dialogVisible2.value = true;

      break;
  }
};
const handleEditT = () => {
  let eiInfo = new EiInfo();
  eiInfo.parameter = {
    id: userInfo.value.licenseId,
    licenseNumber: userInfo.value.licenseNumber,
    licenseName: userInfo.value.licenseName,
    receiveDate: userInfo.value.receiveDate,
    expiryDate: userInfo.value.expiryDate,
    restoreDate: userInfo.value.restoreDate,
    licensePic: userInfo.value.licensePic,
    userId: userInfo.value.userId,
    // licenseType: userInfo.value.licenseType,
  };
  eiInfo.userInfo = {
    username: store.userInfo.username,
  };
  if (dialogType.value != 1) {
    eiInfo.parameter.icCardWorkNumberExact =
      userInfo.value.icCardWorkNumberExact;
    if (isForm(userInfo.value)) {
      licenseInsert(eiInfo).then((res: any) => {
        if (res.sys.status != -1) {
          ElNotification({
            message: "添加成功",
            type: "success",
          });
        } else {
        }
        dialogVisible.value = false;
        selectUserList(true);
      });
    } else {
      ElNotification({
        message: "请填写完整！",
        type: "warning",
      });
    }
  } else {
    if (eiInfo.parameter.licensePic.length == 0) {
      eiInfo.parameter.licensePic.push('noPic')
    }
    delete eiInfo.parameter.licenseType;
    delete eiInfo.parameter.icCardWorkNumberExact;
    // for (let i = 0; i < eiInfo.parameter.licensePic.length; i++) {
    //   if (isBase64(eiInfo.parameter.licensePic[i])) {
    //   } else {
    //     let a = imageUrlToBase64(eiInfo.parameter.licensePic[i])
    //     console.log(a);
    //     // eiInfo.parameter.licensePic[i] = imageUrlToBase64(eiInfo.parameter.licensePic[i])
    //   }
    // }
    licenseUpdate(eiInfo).then((res: any) => {
      if (res.sys.status != -1) {
        ElNotification({
          message: "修改成功",
          type: "success",
        });
      } else {
      }
      dialogVisible.value = false;
      selectUserList(true);
    });
  }
};
const handleClose = () => {
  dialogVisible.value = false;
};
const handleClose2 = () => {
  dialogVisible2.value = false;
};
const handleClose3 = () => {
  dialogVisibleimg.value = false;
};
const isForm = (obj) => {
  for (let key in obj) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
};
const add = () => {
  // 清空表单
  for (let i in userInfo.value) {
    userInfo.value[i] = "";
  }
  dialogType.value = 2;
  dialogVisible.value = true;
};
//判断是否是base64
const isBase64 = (str) => {
  if (str === '' || str.trim() === '') { return false; }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}
//将路径图片转换为base64
const imageUrlToBase64 = (url: any) => {
  let homeImage = new Image();
  let dataURL;
  // 解决跨域问题
  homeImage.setAttribute("crossOrigin", "anonymous");
  homeImage.src = url;
  //homeImage.onload为异步加载
  homeImage.onload = () => {
    let canvas = document.createElement("canvas");
    canvas.width = homeImage.width;
    canvas.height = homeImage.height;
    let context: any = canvas.getContext("2d");
    context.drawImage(homeImage, 0, 0, homeImage.width, homeImage.height);
    let quality = 0.8;
    // 这里的dataurl就是base64类型
    dataURL = canvas.toDataURL("image/jpeg", quality);
  };
  return dataURL;
};
</script>
<style scoped>
.tag {
  margin: 0 5px;
  cursor: pointer;
}
</style>
