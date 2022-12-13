<template>
  <Search :select="selectUserList" :data="eilnfo" :download="download" :Limit="Limit"></Search>
  {{ msgTitle }}<el-tag class="tag" @click="(eilnfo.parameter.baoCompany = i, selectUserList(true))"
    v-for="i in resButton">{{
        i
    }}</el-tag>
  <br><br>
  <Table :handleChange="handleChange" :loading="loading" :multipleSelection="multipleSelection" :tableType="true"
    :tableData="tableData" :license="license"></Table>
  <Pagination :hide="hide" :pagesize="10" :total="dataCount" :currentpage="eilnfo.parameter.pageNum" :options="eilnfo"
    :render="selectUserList">
  </Pagination>
  <el-dialog v-model="dialogVisible" title="设置过期期限" width="30%" :before-close="handleClose">
    <el-form-item label="过期期限/月">
      <el-input v-model.number="expiryLimit" oninput="value=value.replace(/[^\d]/g,''),age=value.replace(/[^\d]/g,'')"
        clearable placeholder="请输入过期期限" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEditTLis()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Table from "./components/Table.vue";
import Pagination from "@/components/Pagination.vue"; //分页组件
import Search from "./components/Search.vue";
import { ref, reactive } from "vue";
import { EiInfo, expiration } from "@/types";
import { selectExpira, updexpiryLimit } from "@/api/user";
import { ElNotification } from "element-plus";

const quer = reactive(new expiration());
const eilnfo = reactive(new EiInfo());
eilnfo.parameter = quer;
const tableData = ref([]);
const dialogVisible = ref(false);
const loading = ref(false);
const dataCount = ref(0);
const hide = ref(false);
const expiryLimit = ref(null);
const multipleSelection = ref([]);
const resButton = ref([])
const msgTitle = ref('');
const license = () => { };
const Limit = () => {
  dialogVisible.value = true;
};
const handleEditTLis = () => {
  if (expiryLimit.value) {
    updexpiryLimit(expiryLimit.value).then((res) => {
      ElNotification({
        message: "设置成功",
        type: "success",
      });
      dialogVisible.value = false;
      expiryLimit.value = null;
    });
  } else {
    ElNotification({
      message: "请输入过期期限",
      type: "warning",
    });
  }
};
// 多选框选中事件
const handleChange = (val: any) => {
  multipleSelection.value = val.map((item) => item.licenseId);
};
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
// 下载特种作业证
const download = () => {
  multipleSelection.value.length != 0
    ? (ElNotification({
      message: "正在导出作业证表格，请稍等...",
      type: "success",
    }),
      (window.location.href = `http://10.3.18.222:8189/download/soon/overdue/license/excel?licenseId=${multipleSelection.value}`))
    : ElNotification({
      message: "请选择要导出的证书",
      type: "warning",
    });
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>
<style scoped>
.tag {
  margin: 0 5px;
  cursor: pointer;
}
</style>
