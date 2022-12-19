<template>
    <el-form :model="form" ref="form" status-icon class="demo-ruleForm from" label-width="70px">
        <el-form-item label="项目编号" prop="projectNumber">
            <el-input class="input" v-model="form.projectNumber" clearable placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="合同编号" prop="projectNumber">
            <el-input class="input" v-model="form.contractNumber" clearable placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
            <el-input class="input" v-model="form.projectName" clearable placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目性质" prop="projectType">
            <el-input class="input" v-model="form.projectType" clearable placeholder="请输入项目性质" />
        </el-form-item>
        <el-form-item label="协力公司" prop="assistCompany">
            <el-input class="input" v-model="form.assistCompany" clearable placeholder="请输入协力公司" />
        </el-form-item>
        <el-form-item label="负责人" prop="contactPerson">
            <el-input class="input" v-model="form.safetyEducationCharge" clearable placeholder="请输入安全负责人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="safetyEducationCharge">
            <el-input class="input" v-model="form.contactPerson" clearable placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="项目周期" prop="projectCycle">
            <el-date-picker v-model="form.time" @change="change" value-format="YYYY-MM-DD" type="daterange"
                range-separator="-" start-placeholder="起始日期" end-placeholder="结束日期" size="default" />
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// 定义Props默认数据类型
type Props = {
    change: Function//新增方法
    form: any
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
// const time = ref([])
</script>
<style scoped>

</style>