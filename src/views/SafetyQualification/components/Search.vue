<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <template v-if="userType">
            <el-form-item label="部门">
                <el-select style="width: 150px;margin-right: 20px;" @change="change"
                    v-model="data.parameter.baoDepartment" clearable placeholder="请选择部门">
                    <el-option v-for="item in departmentList" :key="item.baoDepartmentId"
                        :label="item.baoDepartmentName" :value="item.baoDepartmentId" />
                </el-select>
            </el-form-item>
            <el-form-item label="分厂">
                <el-select style="width: 150px;margin-right: 20px;" @change="(data.parameter.pageNum = 1), select(data)"
                    v-model="data.parameter.baoFactory" clearable placeholder="请选择分厂">
                    <el-option v-for="item in baoFactoryList" :key="item.baoFactoryId" :label="item.baoFactoryName"
                        :value="item.baoFactoryId" />
                </el-select>
            </el-form-item>
        </template>
        <template v-if="!userType">
            <el-form-item label="所在公司">
                <el-input class="input" v-model="data.parameter.assistCompany" clearable placeholder="所在公司" />
            </el-form-item>
            <el-form-item label="项目/合同 编号">
                <el-input class="input" v-model="data.parameter.projectNumber" clearable placeholder="项目编号/合同编号" />
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input class="input" v-model="data.parameter.projectName" clearable placeholder="项目名称" />
            </el-form-item>
        </template>
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
import { ref, onMounted, reactive } from 'vue'
import { selectDepartment, selectFactory } from '@/api/areas'
import { EiInfo } from '@/types'
const departmentList: any = ref([])
const baoFactoryList: any = ref([])
const eiInfo = reactive(new EiInfo)
// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法
    userType: boolean
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
onMounted(() => {
    selectDepartment().then((res: any) => {
        departmentList.value = res.result.departmentSelect
    })
    change(1);
})
const change = (val) => {
    props.data.parameter.baoFactory = ''
    props.data.parameter.pageNum = 1
    props.select(props.data)
    eiInfo.parameter = {
        departmentId: val
    }
    selectFactory(eiInfo).then((res: any) => {
        baoFactoryList.value = res.result.factorySelect
    })
}
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