<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <el-form-item label="人员类型" v-if="!userType">
            <el-select style="width: 150px;margin-right: 20px;" @change="typeChange" v-model="data.parameter.userType"
                placeholder="请选择人员类型">
                <el-option v-for="item in userTypeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="所在公司" v-if="!userType">
            <el-input class="input" :disabled="data.parameter.userType == 1" v-model="data.parameter.baoCompany"
                clearable placeholder="请输入所在公司" />
        </el-form-item>
        <el-form-item label="部门" v-if="!userType">
            <el-select style="width: 150px;margin-right: 20px;" :disabled="data.parameter.userType == 2"
                @change="change" v-model="data.parameter.baoDepartment" clearable placeholder="请选择部门">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item>
        <el-form-item label="分厂">
            <el-select style="width: 150px;margin-right: 20px;" :disabled="data.parameter.userType == 2"
                v-model="data.parameter.baoFactory" clearable placeholder="请选择分厂">
                <el-option v-for="item in baoFactoryList" :key="item.baoFactoryId" :label="item.baoFactoryName"
                    :value="item.baoFactoryId" />
            </el-select>
        </el-form-item>
        <el-form-item label="IC卡号">
            <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入IC卡号" />
        </el-form-item>
        <el-form-item label="员工姓名">
            <el-input class="input" v-model="data.parameter.username" clearable placeholder="请输入员工姓名" />
        </el-form-item>
        <el-button type="primary" class="button" @click="(data.parameter.pageNum = 1), select(data)">
            <el-icon class="i">
                <Search />
            </el-icon>查询
        </el-button>
        <el-button type="primary" class="button" @click="handleAdd">
            <i class="iconfont icon-iconfonticon02 i"></i>
            添加
        </el-button>
    </el-form>
</template>

<script setup lang="ts">
import { selectFactory } from '@/api/areas';
import { EiInfo } from '@/types';
import { Search, Plus } from '@element-plus/icons-vue'//引入elementui 图标
import { ref } from 'vue';

// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法
    handleAdd: Function//新增方法
    userType: boolean,
    departmentSelect: any
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const baoFactoryList: any = ref([])
const change = (val) => {
    if (val) {
        props.select(props.data)
        let eiInfo = new EiInfo
        props.data.parameter.baoFactory = ''
        eiInfo.parameter = {
            departmentId: val
        }
        selectFactory(eiInfo).then((res: any) => {
            baoFactoryList.value = res.result.factorySelect
        })
    }

}
const typeChange = (val) => {
    switch (val) {
        case 1:
            props.data.parameter.baoDepartment = 1
            props.data.parameter.baoFactory = ''
            props.data.parameter.baoCompany = ''
            break;
        case 2:
            delete props.data.parameter.baoDepartment
            delete props.data.parameter.baoFactory
            break;
    }

    props.data.parameter.pageNum = 1
    props.select(props.data)
}
const userTypeList = [
    {
        id: 1,
        name: 'BNA内部'
    },
    {
        id: 2,
        name: '常驻协力'
    }
]
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