<template>
    <div class="box">
        <div v-if="url != ''" class="img">
            <MyImg :imgUrl="url"></MyImg>
        </div>
        <div v-if="url == ''" class="img_hidd">

        </div>
        <el-upload class="img_btn" action="#" :show-file-list="false" :before-upload="beforeUpload"
            :http-request="upload">
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
    url: string,
    upload: Function
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
//上传之前过滤文件
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    return isImg(file)

}

</script>
<style scoped>
.box {
    display: flex;
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
