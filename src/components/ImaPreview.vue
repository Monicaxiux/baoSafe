<template>
    <el-image @click="preview(imgUrl)" v-if="imgUrl != ''" :src="imgUrl">
        <div slot="placeholder">
            加载中<span class="dot">...</span>
        </div>
    </el-image>
    <div v-else slot="error" class="image-slot">
        <i>无图片</i>
    </div>
</template>
<script lang="ts" setup>
import { preview } from 'vue3-preview-image'
// 定义Props默认数据类型
type Props = {
    imgUrl: any,
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>
<style scoped>
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.el-image {
    text-align: center;

    height: 100%;
}

:deep(.el-image__inner) {
    object-fit: scale-down;
}
</style>