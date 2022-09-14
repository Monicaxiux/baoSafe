<template>
    <!-- <h1>方式一</h1>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
            <template #default="props">
                <div m="4">
                    <el-table :data="props.row.family" border>
                        <el-table-column label="一级安全教育">
                            <el-table-column type="expand">
                                <template #default="props">
                                    <div m="4">
                                        <el-table :data="props.row.family2" border>
                                            <el-table-column label="二级安全教育">
                                                <el-table-column type="expand">
                                                    <template #default="props">
                                                        <div m="4">
                                                            <el-table :data="props.row.family3" border>
                                                                <el-table-column label="三级安全教育">
                                                                    <el-table-column label="审核人" prop="name" />
                                                                    <el-table-column label="电话" prop="state" />
                                                                    <el-table-column label="区域" prop="city" />
                                                                    <el-table-column label="状态" prop="address" />
                                                                </el-table-column>
                                                            </el-table>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="审核人" prop="name" />
                                                <el-table-column label="电话" prop="state" />
                                                <el-table-column label="区域" prop="city" />
                                                <el-table-column label="状态" prop="address" />
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="审核人" prop="name" />
                            <el-table-column label="电话" prop="state" />
                            <el-table-column label="区域" prop="city" />
                            <el-table-column label="状态" prop="address" />
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="date" />
        <el-table-column label="项目名称" prop="name" />
    </el-table>
    <br><br>
    <h1>方式二</h1>
    <br><br><br>
    <div style="display: flex;justify-content: space-between;">
        <el-tree :data="data" accordion :props="defaultProps" @node-click="handleNodeClick" />
        <el-table v-if="status" :data="tableData2" border style="width: 80%;float: right;">
            <el-table-column label="项目信息">

                <el-table-column label="项目名称" prop="name" />
                <el-table-column label="项目编号" prop="state" />
                <el-table-column label="项目性质" prop="city" />
            </el-table-column>

        </el-table>
        <el-table v-if="!status" :data="tableData2" border style="width: 80%;float: right;">
            <el-table-column :label="label">
                <el-table-column label="审核人" prop="name" />
                <el-table-column label="电话" prop="state" />
                <el-table-column label="区域" prop="city" />
                <el-table-column label="状态" prop="city" />
            </el-table-column>
        </el-table>
    </div> -->
    <Search :select="selectUserList" :userType="false" :data="eilnfo"></Search>
    <Table :tableData="tableData" :loading="loading" :userType="false"></Table>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import { selectSafetylicense } from '@/api/user'
import { EiInfo, selectSafe } from '@/types';
const quer = reactive(new selectSafe)
const eilnfo = reactive(new EiInfo)
eilnfo.parameter = quer
const dataCount = ref(0)
const hide = ref(false)
const tableData = ref([])
const selectUserList = () => {
    loading.value = true
    selectSafetylicense(eilnfo).then((res: any) => {
        loading.value = false
        //将用户信息列表数据传入子组件
        tableData.value = res.result.assistInfo == undefined ? [] : res.result.assistInfo
        // 分页总页数
        dataCount.value = res.result.dataCount == undefined ? 0 : res.result.dataCount
        // 如果只有一页则不展示分页
        hide.value = dataCount.value < 11 ? false : true
    })
}
const status = ref(false)
const loading = ref(false)

const label = ref('')
const tableData2 = [
    {
        name: '1111',
        state: '111',
        city: '111'
    }
]
interface Tree {
    label: string
    children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
    if (data.label == '项目1' || data.label == '项目2') {
        status.value = true
    } else {
        status.value = false
        label.value = data.label
    }
}

const data: Tree[] = [
    {
        label: '项目1',
        children: [
            {
                label: '一级安全教育',
                children: [
                    {
                        label: '二级安全教育-1',
                        children: [
                            {
                                label: '三级安全教育-1-1',
                            },
                            {
                                label: '三级安全教育-1-2',
                            },
                            {
                                label: '三级安全教育-1-3',
                            },
                            {
                                label: '三级安全教育-1-4',
                            },
                        ],
                    },
                    {
                        label: '二级安全教育-2',
                        children: [
                            {
                                label: '三级安全教育-2-1',
                            },
                            {
                                label: '三级安全教育-2-2',
                            },
                            {
                                label: '三级安全教育-2-3',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        label: '项目2',
        children: [
            {
                label: '一级安全教育',
                children: [
                    {
                        label: '二级安全教育-1',
                        children: [
                            {
                                label: '三级安全教育-1-1',
                            },
                            {
                                label: '三级安全教育-1-2',
                            },
                            {
                                label: '三级安全教育-1-3',
                            },
                            {
                                label: '三级安全教育-1-4',
                            },
                        ],
                    },
                    {
                        label: '二级安全教育-2',
                        children: [
                            {
                                label: '三级安全教育-2-1',
                            },
                            {
                                label: '三级安全教育-2-2',
                            },
                            {
                                label: '三级安全教育-2-3',
                            },
                        ],
                    },
                ],
            },
        ],
    },
]

const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>
        <style>
        </style>
