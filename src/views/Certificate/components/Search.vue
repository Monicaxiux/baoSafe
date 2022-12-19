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
        <el-button @click="select(2)" :disabled="store.lsfileStatus" type="primary">
            <el-icon>
                <Picture />
            </el-icon>
            上传作业证照片
        </el-button>
        <el-button @click="select(3)" :disabled="store.lsfileStatus" type="primary">
            <el-icon>
                <Check />
            </el-icon>
            提交
        </el-button>
    </div>
    <div v-if="searchType == 1" style="display: flex;flex-wrap: wrap;">
        <el-form-item label="人员类型">
            <el-select style="width: 150px;margin-right: 20px;" @change="typeChange" v-model="data.parameter.userType"
                placeholder="请选择人员类型">
                <el-option v-for="item in userTypeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="证书类型">
            <el-select style="width: 150px;margin-right: 20px;" @change="select(data)"
                v-model="data.parameter.licenseType" placeholder="请选择作业证类型">
                <el-option v-for="item in licenseTypeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item> -->
        <el-form-item label="部门" v-if="(data.parameter.userType == 1)">
            <el-select style="width: 150px;margin-right: 20px;" @change="change" clearable
                v-model="data.parameter.baoDepartment" placeholder="请选择部门">
                <el-option v-for="item in departmentSelect" :key="item.baoDepartmentId" :label="item.baoDepartmentName"
                    :value="item.baoDepartmentId" />
            </el-select>
        </el-form-item>
        <el-form-item label="分厂" v-if="(data.parameter.userType == 1)">
            <el-select style="width: 150px;margin-right: 20px;" @change="(data.parameter.pageNum = 1), select(data)"
                v-model="data.parameter.baoFactory" clearable placeholder="请选择分厂">
                <el-option v-for="item in baoFactoryList" :key="item.baoFactoryId" :label="item.baoFactoryName"
                    :value="item.baoFactoryId" />
            </el-select>
        </el-form-item>
        <el-form-item label="协力公司" v-if="(data.parameter.userType == 2)">
            <el-input class="input" v-model="data.parameter.baoCompany" clearable placeholder="协力公司" />
        </el-form-item>
        <el-form-item label="IC卡号">
            <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="IC卡号" />
        </el-form-item>
        <el-form-item label="姓名">
            <el-input class="input" v-model="data.parameter.username" clearable placeholder="姓名" />
        </el-form-item>
        <el-form-item label="编号">
            <el-input class="input" v-model="data.parameter.licenseNumber" clearable placeholder="证书编号" />
        </el-form-item>
        <el-form-item label="名称">
            <el-input class="input" v-model="data.parameter.licenseName" clearable placeholder="证书名称" />
        </el-form-item>
        <div style="float: right;">
            <el-button type="primary" class="button" @click="(data.parameter.pageNum = 1), select(data)">
                <el-icon class="i">
                    <Search />
                </el-icon>查询
            </el-button>
            <el-button type="primary" class="button" @click="add">
                添加
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search, FolderOpened, Picture, Check } from '@element-plus/icons-vue'//引入elementui 图标
import { piniaData } from '@/store';//引入pinia状态管理
import { onMounted, reactive, ref } from 'vue';
import { EiInfo } from '@/types';
import { selectDepartment, selectFactory } from '@/api/areas';
import { ElNotification } from 'element-plus';
//pinia状态管理
const store = piniaData();
// 定义Props默认数据类型
type Props = {
    data: any,
    select: Function,
    searchType: number,
    add: any
}
// const userType = ref(1)
const eiInfo = reactive(new EiInfo)
const baoFactoryList: any = ref([])
const departmentSelect: any = ref([])
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
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
const typeChange = (val) => {
    switch (val) {
        case 1:
            props.data.parameter.baoDepartment = 1
            props.data.parameter.baoFactory = ''
            delete props.data.parameter.baoCompany
            break;
        case 2:
            delete props.data.parameter.baoDepartment
            delete props.data.parameter.baoFactory
            break;
    }
    props.data.parameter.pageNum = 1
    if (props.data.parameter.baoCompany || val != 2) {
        props.select(props.data)
    } else if (val != 1) {
        // ElNotification({
        //     message: `请输入协力公司`,
        //     type: 'error',
        // })
        props.select(false)

    }
}
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
onMounted(() => {
    if (props.searchType != 2) {
        // 查询部门下拉框
        selectDepartment().then((res: any) => {
            departmentSelect.value = res.result.departmentSelect
        })
        change(1)
    }

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