<template>
    <el-upload v-model:file-list="fileList" name="excelFile" class="upload-demo" :action="uplodUrl + url"
        :on-remove="handleRemove" :limit="1" :before-upload="beforeUpload" :on-success="success">
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
    dialogType: number
    url: string,
    success: Function
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}
//上传之前过滤文件
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    if (props.dialogType != 1) {
        return isImg(file)
    } else {
        return isXlsx(file)
    }
}
</script>
<style scoped>
</style>