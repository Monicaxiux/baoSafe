<template>
    <el-form :model="form" status-icon class="demo-ruleForm from" label-width="70px">
        <el-form-item label="项目编码">
            <el-input class="input" v-model="form.projectNumber" clearable placeholder="请输入项目编码" />
        </el-form-item>
        <el-form-item label="项目名称">
            <el-input class="input" v-model="form.projectName" clearable placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目性质">
            <el-input class="input" v-model="form.projectType" clearable placeholder="请输入项目性质" />
        </el-form-item>
        <el-form-item label="协力公司">
            <el-input class="input" v-model="form.assistCompany" clearable placeholder="请输入协力公司" />
        </el-form-item>
        <el-form-item label="联系人">
            <el-input class="input" v-model="form.contactPerson" clearable placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input class="input" v-model="form.safetyEducationCharge" clearable placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="项目周期">
            <el-date-picker v-model="time" @change="change" value-format="YYYY-MM-DD" type="daterange"
                range-separator="-" start-placeholder="起始日期" end-placeholder="结束日期" size="default" />
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { project } from '@/types'
const form = reactive(new project)
// 定义Props默认数据类型
type Props = {
    handleAdd: Function//新增方法
}
const time = ref('')
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const change = (val) => {
    if (!val) {
        form.workCycleStart = ""
        form.workCycleEnd = ""
    } else {
        form.workCycleStart = val[0]
        form.workCycleEnd = val[1]
    }
}
</script>
<style scoped>
</style>