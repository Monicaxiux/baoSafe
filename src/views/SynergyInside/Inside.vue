<template>
  <el-form :model="form" status-icon class="demo-ruleForm from">
    <el-form-item label="协力公司">
      <el-input
        class="input"
        v-model="form.assistCompany"
        clearable
        placeholder="请输入协力公司"
      />
    </el-form-item>
    <el-form-item label="项目编号">
      <el-input
        class="input"
        v-model="form.projectNumber"
        clearable
        placeholder="请输入项目编号"
      />
    </el-form-item>
    <el-form-item label="项目名称">
      <el-input
        class="input"
        v-model="form.projectName"
        clearable
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item label="IC卡号">
      <el-input
        class="input"
        v-model="form.icCardWorkNumber"
        clearable
        placeholder="请输入IC卡号"
      />
    </el-form-item>
    <el-form-item label="员工姓名">
      <el-input
        class="input"
        v-model="form.username"
        clearable
        placeholder="请输入员工姓名"
      />
    </el-form-item>
    <el-button
      type="primary"
      class="button"
      @click="(form.pageNum = 1), getData()"
    >
      <el-icon class="i"> <Search /> </el-icon>查询
    </el-button>
    <el-button @click="select()" type="primary">
      <el-icon>
        <FolderOpened />
      </el-icon>
      上传表格
    </el-button>
  </el-form>
  <br />
  <br />
  <el-table
    v-loading="loading"
    border
    max-height="620"
    :data="tableData"
    class="tablex"
  >
    <el-table-column prop="assistCompany" label="协力公司" width="100" />
    <el-table-column prop="actualCompany" label="所在公司" width="200" />
    <el-table-column prop="username" label="姓名" />
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="phone" label="联系电话" width="110" />
    <el-table-column prop="icCardWorkNumber" label="IC卡号" width="150" />
    <el-table-column prop="projectNumber" label="项目编号" width="100" />
    <el-table-column prop="projectName" label="项目名称" width="150" />

    <el-table-column prop="projectType" label="项目性质" width="100" />
    <el-table-column
      prop="safetyEducationCharge"
      label="安全教育负责人"
      width="150"
    />
    <el-table-column prop="contactPerson" label="联系人" width="100" />
    <el-table-column label="作业周期">
      <el-table-column prop="workCycleStart" label="起始时间" width="110" />
      <el-table-column prop="workCycleEnd" label="结束时间" width="110" />
    </el-table-column>
    <el-table-column label="一级安全教育">
      <el-table-column prop="eduDate1" width="110" label="培训日期">
      </el-table-column>
      <el-table-column prop="eduPerson1" width="110" label="教育人">
      </el-table-column>
    </el-table-column>
    <el-table-column label="二级安全教育">
      <el-table-column prop="eduDate2" width="110" label="培训日期">
      </el-table-column>
      <el-table-column prop="eduPerson2" width="110" label="教育人">
      </el-table-column>
    </el-table-column>
    <el-table-column label="三级安全教育">
      <el-table-column prop="eduDate3" width="110" label="培训日期">
      </el-table-column>
      <el-table-column prop="eduPerson3" width="110" label="教育人">
      </el-table-column>
    </el-table-column>
    <el-table-column prop="leaveDate" width="110" label="离职日期">
    </el-table-column>
    <el-table-column prop="leaveHealth" width="110" label="离职体检">
    </el-table-column>
  </el-table>
  <br />
  <el-pagination
    v-if="hide"
    background
    @size-change="handleSizeChange"
    @current-change="handlePageChange"
    :page-sizes="[10, 30, 100]"
    :current-page="form.pageNum"
    :page-size="10"
    layout="total,prev, pager, next, jumper"
    :total="dataCount"
  >
  </el-pagination>
  <el-dialog v-model="dialogVisible" title="上传表格" width="20%">
    <el-card class="card" shadow="never">
      <br />
      <UploadFile
        :dialogType="1"
        :success="success"
        url="/assist/read/company/safe/excel"
      ></UploadFile>
      <el-button @click="download">示例模板</el-button>
      <br /><br /><br />
      <el-card style="width: 100%" shadow="hover">
        <h3>提交步骤</h3>
        <br />
        <div class="uploadTS">
          <b style="color: black">1.请下载示例模板按照规范上传</b><br />
          <b style="color: black">2.上传后请确认信息正确无误，再点击确认提交</b
          ><br />
          <b>注意：只能上传xlsx/xls文件，且不超过500mb</b>
          <br />
        </div>
      </el-card>
    </el-card>
  </el-dialog>
</template>
<script lang="ts" setup>
import { FolderOpened } from "@element-plus/icons-vue"; //引入elementui 图标
import { reactive, ref } from "vue";
import Pagination from "@/components/Pagination.vue"; //分页组件
import { Search, Plus } from "@element-plus/icons-vue"; //引入elementui 图标
import UploadFile from "@/components/UploadFile.vue";
import { ElNotification } from "element-plus";
import { selectSynerg } from "@/api/safety";
import { EiInfo } from "@/types";
const form: any = reactive({
  assistCompany: "",
  username: "",
  icCardWorkNumber: "",
  projectName: "",
  projectNumber: "",
  pageNum: 1,
});
const hide = ref(false);
const dataCount = ref(0);
const loading = ref(false);
const dialogVisible = ref(false);
const select = () => {
  dialogVisible.value = true;
};
// 分页导航
const handlePageChange = (val) => {
  form.pageNum = val;
  getData();
};
//切换分页条数
const handleSizeChange = (val) => {
  form.pageNum = val;
  getData();
};
const getData = () => {
  loading.value = true;
  let eiInfo = new EiInfo();
  eiInfo.parameter = form;
  selectSynerg(eiInfo).then((res: any) => {
    loading.value = false;
    //将用户信息列表数据传入子组件
    tableData.value = res.result.result == undefined ? [] : res.result.result;
    // 分页总页数
    dataCount.value =
      res.result.dataCount == undefined ? 0 : res.result.dataCount;
    // 如果只有一页则不展示分页
    hide.value = dataCount.value < 11 ? false : true;
  });
};
const tableData = ref([]);
const success = (res) => {
  form.projectNumber = res.result.parameter.projectNumber
  form.projectName =  res.result.parameter.projectName
  form.assistCompany =   res.result.parameter.assistCompany
  ElNotification({
    message: "上传成功",
    type: "success",
  });
  dialogVisible.value = false;
  getData();
};
const download = () => {
  ElNotification({
    message: "正在下载示例模板，请稍等...",
    type: "success",
  }),
    (window.location.href =
      "http://10.3.18.222:8189/download/assist/excel/safe/info");
};
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
.input {
  width: 150px;
  margin-right: 20px;
}
.from {
  display: flex;
}
</style>