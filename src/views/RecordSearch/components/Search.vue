<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <el-form-item v-if="userType != 3 && userType != 1" label="所在区域">
            <el-select class="select" @change="change1" v-model="data.parameter.areaId" placeholder="所在区域">
                <el-option v-for="item in manageArea1List" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNumber" v-if="userType == 1 || userType == 3">
            <el-input class="input" v-model="data.parameter.projectNumber" clearable placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName" v-if="userType == 1 || userType == 3">
            <el-input class="input" v-model="data.parameter.projectName" clearable placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="所在位置" v-if="userType == 2">
            <el-select class="select" @change="change2" v-model="data.parameter.destinationId" placeholder="所在位置">
                <el-option v-for="item in manageArea2List" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="所在地点" v-if="userType == 2">
            <el-select class="select" @change="select(data)" v-model="data.parameter.locationId" placeholder="所在地点">
                <el-option v-for="item in manageArea3List" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="IC卡号" v-if="userType == 1">
            <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入IC卡号" />
        </el-form-item>
        <el-form-item label="员工姓名" v-if="userType == 1">
            <el-input class="input" v-model="data.parameter.username" clearable placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item v-if="userType != 3" style="width:300px;margin-right: 20px;" label="时间" prop="projectCycle">
            <el-date-picker v-model="data.parameter.time" @change="changeTime" value-format="YYYY-MM-DD" type="daterange"
                range-separator="-" start-placeholder="起始日期" end-placeholder="结束日期" size="default" />
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
import { reactive, ref, onMounted } from 'vue'
import { EiInfo } from '@/types';
import { selectQueryArea } from '@/api/areas'

// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法
    changeTime: Function,
    userType: number
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const eiInfo = reactive(new EiInfo)

const manageArea1List: any = ref([
    {
        id: 0,
        name: '全部'
    }
])
const manageArea2List: any = ref([
    {
        id: 0,
        name: '全部'
    }
])
const manageArea3List: any = ref([
    {
        id: 0,
        name: '全部'
    }
])
const areaId = ref(0)
const change1 = (val: any) => {
    props.data.parameter.destinationId = ''
    props.data.parameter.locationId = ''
    eiInfo.parameter = {
        select: 3,
        companyId: 1,
        areaId: val
    }
    areaId.value = val
    selectQueryArea(eiInfo).then((res: any) => {
        manageArea2List.value = res.result.areaInfo
    })

}
const change2 = (val: any) => {
    props.data.parameter.locationId = ''
    eiInfo.parameter = {
        select: 4,
        companyId: 1,
        areaId: areaId,
        destinationId: val
    }
    selectQueryArea(eiInfo).then((res: any) => {
        manageArea3List.value = res.result.areaInfo
    })
}
onMounted(() => {
    eiInfo.parameter = {
        select: 2,
        companyId: 1
    }
    selectQueryArea(eiInfo).then((res: any) => {
        manageArea1List.value = res.result.areaInfo
    })
})
</script>

<style scoped>
.input {
    width: 150px;
    margin-right: 20px;
}

.from {
    display: flex;
}

.select {
    width: 150px;
    margin-right: 20px;
}
</style>