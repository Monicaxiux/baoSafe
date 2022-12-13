<template>
  <el-dialog v-model="dialogVisible" :title="title" width="20%" :before-close="handleClose">
    <el-card class="card" shadow="never">
      <br />
      <UploadFile :success="success" :dialogType="dialogType" :url="url"></UploadFile>
      <el-button v-if="dialogType == 1" @click="download">示例模板</el-button>
      <br /><br /><br />
      <el-card style="width: 100%" shadow="hover">
        <h3>提交步骤</h3>
        <br />
        <div v-if="dialogType != 1" class="uploadTS">
          <b style="color: black">1.图片名称为个人IC卡号</b><br />
          <b style="color: black">2.请勿上传图片文件以外的内容</b><br />
          <b>注意：只能上传图片格式文件，且不超过500mb</b>
        </div>
        <div v-if="dialogType == 1" class="uploadTS">
          <b style="color: black">1.请下载示例模板按照规范上传</b><br />
          <b style="color: black">2.上传后请确认信息正确无误，再点击确认提交</b><br />
          <b>注意：只能上传xlsx/xls文件，且不超过500mb</b>
          <br />
        </div>
      </el-card>
    </el-card>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { ElNotification } from "element-plus";
import UploadFile from "@/components/UploadFile.vue";
// 定义Props默认数据类型
type Props = {
  dialogVisible: boolean;
  handleEditT: Function;
  dialogType: number;
  url: string;
  title: string;
  success: Function;
};
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>();
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定取消上传?")
    .then(() => {
      props.handleEditT();
      console.log(props.dialogVisible);
    })
    .catch(() => {
      // catch error
    });
};
const download = () => {
  ElNotification({
    message: "正在下载示例模板，请稍等...",
    type: "success",
  }),
    (window.location.href = "http://10.3.18.222:8189/download/license/excel");
};
</script>
<style scoped>
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