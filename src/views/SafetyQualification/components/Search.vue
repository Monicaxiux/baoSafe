<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <el-form-item label="安全教育级别">
            <el-select style="width: 150px;margin-right: 20px;" v-model="data.parameter.safetyLevel" clearable
                placeholder="安全教育级别">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="分厂">
            <el-select style="width: 150px;margin-right: 20px;" v-model="data.parameter.safetyLevel" clearable
                placeholder="请选择分厂">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="科室">
            <el-select style="width: 150px;margin-right: 20px;" v-model="data.parameter.safetyLevel" clearable
                placeholder="请选择科室">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="工号">
            <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="姓名">
            <el-input class="input" v-model="data.parameter.username" clearable placeholder="请输入姓名" />
        </el-form-item>
        <el-button type="primary" class="button" @click="(data.parameter.pageNum = 1), select(data)">
            <el-icon class="i">
                <Search />
            </el-icon>查询
        </el-button>
    </el-form>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'//引入elementui 图标
const options = [
    {
        value: '1',
        label: '一级',
    },
    {
        value: '2',
        label: '二级',
    },
    {
        value: '3',
        label: '三级',
    },
]
// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法

}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
</script>

<style scoped>
.input {
    width: 150px;
    margin-right: 20px;
}

.from {
    display: flex;
}
</style>