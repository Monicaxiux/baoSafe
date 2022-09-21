<template>
    <el-upload v-if="dialogType == 1" v-model:file-list="fileList" name="excelFile" class="upload-demo"
        :action="uplodUrl + url" :on-remove="handleRemove" :limit="1" :before-upload="beforeUpload"
        :on-success="success">
        <el-button type="primary">点击上传</el-button>
    </el-upload>
    <el-upload v-if="dialogType != 1" v-model:file-list="fileList" name="imgFiles" class="upload-demo"
        :action="uplodUrl + url" :on-remove="handleRemove" multiple :before-upload="beforeUpload" :on-success="success">
        <el-button type="primary">点击上传</el-button>
    </el-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { uplodUrl } from '@/utils/url'
import { isImg, isXlsx } from '@/utils/regexp'
import type { UploadProps, UploadUserFile } from 'element-plus'
// 定义Props默认数据类型
type Props = {
    dialogType: number//上传类型
    url: string,//上传路径
    success: Function//成功后的回调
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
//文件列表
const fileList = ref<UploadUserFile[]>([])
//删除文件
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}
//上传之前过滤文件
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    //判断是文件上传还是表格上传
    if (props.dialogType != 1) {
        return isImg(file)
    } else {
        return isXlsx(file)
    }
}
</script>
<style scoped>
</style>