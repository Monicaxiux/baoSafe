<template>
    <div v-if="searchType == 2" style="margin-bottom: 20px;">
        <el-steps :space="500" :active="1" simple>
            <el-step title="步骤1：上传作业证表格" />
            <el-step title="步骤2：上传作业证照片" />
            <el-step title="步骤3：提交数据" />
        </el-steps>
        <br>
        <el-button @click="select(1)" type="primary">
            <el-icon>
                <FolderOpened />
            </el-icon>
            上传作业证表格
        </el-button>
        <el-button @click="select(2)" :disabled="store.fileStatus" type="primary">
            <el-icon>
                <Picture />
            </el-icon>
            上传作业证照片
        </el-button>
        <el-button @click="select(3)" :disabled="store.fileStatus" type="primary">
            <el-icon>
                <Check />
            </el-icon>
            提交
        </el-button>
    </div>
    <div v-if="searchType == 1" style="margin-bottom: 20px;display: flex;">
        <el-form-item label="作业证类型">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.licenseType" placeholder="请选择作业证类型">
                <el-option v-for="item in licenseTypeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="证书编号">
            <el-input class="input" v-model="data.parameter.licenseNumber" clearable placeholder="请输入作业证编号" />
        </el-form-item>
        <el-form-item label="证书名称">
            <el-input class="input" v-model="data.parameter.licenseName" clearable placeholder="请输入作业证名称" />
        </el-form-item>
        <el-button type="primary" class="button" @click="(data.parameter.pageNum = 1), select(data)">
            <el-icon class="i">
                <Search />
            </el-icon>查询
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { Search, FolderOpened, Picture, Check } from '@element-plus/icons-vue'//引入elementui 图标
import { piniaData } from '@/store';//引入pinia状态管理
import { ref } from 'vue';
//pinia状态管理
const store = piniaData();
// 定义Props默认数据类型
type Props = {
    data: any,
    select: Function,
    searchType: number
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const licenseTypeList: any = ref([
    {
        id: 1,
        name: '特种作业证'
    },
    {
        id: 2,
        name: '生产经营单位负责人证'
    },
    {
        id: 3,
        name: '安全生产管理人员证'
    },
    {
        id: 4,
        name: '特种设备操作证'
    }
])
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