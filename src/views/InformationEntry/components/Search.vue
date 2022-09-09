<template>
    <div style="margin-bottom: 20px">
        <el-steps :space="500" :active="1" simple>
            <el-step title="步骤1：上传表格" />
            <el-step title="步骤2：上传IC卡照片" />
            <el-step title="步骤3：上传个人照片" />
            <el-step title="步骤4：上传考卷照片" />
            <el-step title="步骤5：提交数据" />
        </el-steps>
        <br>
        <el-button @click="select(1)" type="primary">
            <el-icon>
                <FolderOpened />
            </el-icon>
            上传表格
        </el-button>
        <el-button @click="select(2)" :disabled="store.fileStatus" type="primary">
            <el-icon>
                <Picture />
            </el-icon>
            上传IC卡照片
        </el-button>
        <el-button @click="select(3)" :disabled="store.fileStatus" type="primary">
            <el-icon>
                <Picture />
            </el-icon>
            上传个人照片
        </el-button>
        <el-button @click="select(4)" :disabled="store.fileStatus" type="primary">
            <el-icon>
                <Picture />
            </el-icon>
            上传考卷照片
        </el-button>
        <el-button @click="select(5)" :disabled="store.fileStatus" type="primary">
            <el-icon>
                <Check />
            </el-icon>
            提交
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { Search, FolderOpened, Picture, Check } from '@element-plus/icons-vue'//引入elementui 图标
import { piniaData } from '@/store';//引入pinia状态管理
//pinia状态管理
const store = piniaData();
// 定义Props默认数据类型
type Props = {
    select: Function
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>

<style scoped>
.input {
    width: 150px;
    margin-right: 20px;
}

.el-steps--simple {
    padding: 11px 30px;
}

:deep(.el-step.is-simple:not(:last-of-type) .el-step__title) {
    max-width: 234px;
    /* width: 136px; */
}

:deep(.el-step.is-simple .el-step__title) {
    font-size: 14px;
}


.from {
    display: flex;
}
</style>