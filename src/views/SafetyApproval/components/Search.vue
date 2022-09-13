<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <el-form-item label="项目编号" v-if="userType">
            <el-input class="input" v-model="data.parameter.projectNumber" clearable placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" v-if="userType">
            <el-input class="input" v-model="data.parameter.projectName" clearable placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="教育等级" v-if="userType">
            <el-select style="width: 150px;margin-right: 20px;" @change="change" v-model="data.parameter.safeLevel"
                placeholder="请选择教育等级">
                <el-option v-for="item in educationLevel" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="二级区域" v-if="userType">
            <el-select :disabled="disabled2" style="width: 150px;margin-right: 20px;" @change="change2"
                v-model="data.parameter.manageArea2" placeholder="请选择二级区域">
                <el-option v-for="item in manageArea2List" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="三级区域" v-if="userType">
            <el-select :disabled="disabled3" style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.manageArea3" placeholder="请选择三级区域">
                <el-option v-for="item in manageArea3List" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="部门" v-if="!userType">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.baoDepartment" placeholder="请选择部门">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item>
        <el-form-item label="分厂" v-if="!userType">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.baoDepartment" placeholder="请选择分厂">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item>
        <el-form-item label="科室" v-if="!userType">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.baoDepartment" placeholder="请选择科室">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="审核状态">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.baoDepartment" placeholder="请选择审核状态">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item> -->
        <el-form-item label="IC卡号" v-if="!userType">
            <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入IC卡号" />
        </el-form-item>
        <el-form-item label="员工姓名" v-if="!userType">
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
import { reactive, ref } from 'vue'
import { selectAddress } from '@/api/safety'
import { EiInfo } from '@/types';

// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法
    userType: boolean,
    departmentSelect: any,
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const disabled2 = ref(true)
const disabled3 = ref(true)
const manageArea2List: any = ref([
    {
        id: 0,
        value: '无'
    }
])
const manageArea3List: any = ref([
    {
        id: 0,
        value: '无'
    }
])
const eiInfo = reactive(new EiInfo)
const educationLevel = [
    {
        id: 1,
        value: '一级'
    },
    {
        id: 2,
        value: '二级'
    },
    {
        id: 3,
        value: '三级'
    },
]
const change = (val: any) => {
    switch (val) {
        case 1:
            disabled2.value = true
            disabled3.value = true
            props.data.parameter.manageArea2 = ''
            props.data.parameter.manageArea3 = ''
            break;
        case 2:
            disabled2.value = false
            disabled3.value = true
            props.data.parameter.manageArea3 = ''
            eiInfo.parameter = {
                manageAreaType: 2,
                previousKey: 1
            }
            selectAddress(eiInfo).then((res: any) => {
                manageArea2List.value = res.result.manageArea
            })
            break;
        case 3:
            disabled2.value = false
            disabled3.value = false
            eiInfo.parameter = {
                manageAreaType: 2,
                previousKey: 1
            }
            selectAddress(eiInfo).then((res: any) => {
                manageArea2List.value = res.result.manageArea
            })
            break;
    }
}
const change2 = (val: any) => {
    props.data.parameter.manageArea3 = ''
    eiInfo.parameter = {
        manageAreaType: 3,
        previousKey: val
    }
    selectAddress(eiInfo).then((res: any) => {
        manageArea3List.value = res.result.manageArea
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