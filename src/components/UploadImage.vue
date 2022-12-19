<template>
    <div class="box">
        <div v-if="url != '' && !uploadType" class="img">
            <MyImg :imgUrl="url"></MyImg>
        </div>
        <div v-if="url == '' && !uploadType" class="img_hidd">

        </div>
        <div v-if="url != [] && uploadType" v-for="(i, item) in url" :key="i" class="img">
            <MyImg :imgUrl="url[item]"></MyImg>
            <el-button size="small" @click="delImg(item)" type="danger">删除</el-button>
        </div>
        <div v-if="url == [] && uploadType" class="img_hidd">

        </div>
        <el-upload class="img_btn" action="#" :multiple="uploadType" :show-file-list="false"
            :before-upload="beforeUpload" :http-request="upload">
            <div class="upload">
                <el-icon>
                    <Plus />
                </el-icon>
            </div>
        </el-upload>
    </div>
</template>

<script lang="ts" setup>
import MyImg from '@/components/ImaPreview.vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { isImg } from '@/utils/regexp'

// 定义Props默认数据类型
type Props = {
    url: any,
    upload: Function,
    uploadType: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const delImg = (i) => {
    console.log(i);
    props.url.splice(i, 1)
}
//上传之前过滤文件
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    return isImg(file)
}

</script>
<style scoped>
.box {
    display: flex;
    width: 800px;
    /* overflow: auto; */
    flex-flow: wrap;
}

.upload {
    cursor: pointer;
    padding: 25px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
    border: 1px dashed #cdd0d6;
    border-radius: 6px;
}

.img_btn {
    width: 0;
    height: 0;
}

.img {
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    padding: 5px;
    width: 80px;
    height: 80px;
    margin-right: 20px;
    margin-bottom: 10px;
    text-align: center;
}

.img_hidd {
    height: 80px;
}

.upload:hover {
    border-color: #409eff;
}

icon {
    height: 20px;
    color: #303133;
}

svg {
    width: 20px;
}
</style>
