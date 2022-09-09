<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <el-form-item label="部门">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.baoDepartment" placeholder="请选择部门">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item>
        <el-form-item label="工号">
            <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="员工姓名">
            <el-input class="input" v-model="data.parameter.username" clearable placeholder="请输入员工姓名" />
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

// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法
    departmentSelect: any
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