<template>
    <div class="box_plus">
        <img style="border-radius: 50%;cursor: pointer;" @click="onIsCollapse" src="../../../assets/logo.png" width="26"
            height="26" />
        <h3 v-show="!store.isCollapse" class="mb-2">宝日安全教育</h3>
        <el-icon v-show="!store.isCollapse" class="i-plus" @click="onIsCollapse">
            <Fold />
        </el-icon>
    </div>
    <el-menu unique-opened :default-active="store.active" :collapse="store.isCollapse" class="el-menu-vertical-demo">
        <el-sub-menu v-for="(item, index) in menus" :key="index" :index="item.index">
            <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(i, ix) in item.children" :key="ix"
                @click="store.active = i.path, addTab(i.path, i.name)" :index="i.path">
                <el-icon>
                    <Grid />
                </el-icon>
                {{ i.name }}
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { Grid, Fold } from '@element-plus/icons-vue'//引入elementui 图标
import { useRouter } from "vue-router";//引入路由
import { piniaData } from '@/store';//引入pinia状态管理
import { ref } from 'vue'
// 定义Props默认数据类型
type Props = {
    addTab: Function
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const store = piniaData()
const router = useRouter();
const menus = ref([
    {
        index: '1',
        title: '三级安全教育信息',
        icon: 'iconfont icon-document-copy i',
        children: [
            {
                path: '/bnaEntry',
                name: '安全教育录入'
            },
            {
                path: '/bnaPartners',
                name: 'BNA员工信息维护'
            },
            {
                path: '/bnaSafety',
                name: '安全教育查询'
            },
            {
                path: '/bnaApplication',
                name: '安全教育申报'
            },
            {
                path: '/bnaApproval',
                name: '安全教育审批'
            },
        ]
    },
    {
        index: '2',
        title: '年度安全教育信息',
        icon: 'iconfont icon-tianshenpi i',
        children: [
            {
                path: '/externalPartners',
                name: '协力员工信息维护'
            },
            {
                path: '/externalSafety',
                name: '年度安全教育查询'
            },
            {
                path: '/externalApplication',
                name: '年度安全教育申报'
            },
            {
                path: '/externalApproval',
                name: '年度安全教育审批'
            },
            {
                path: '/q',
                name: '项目过期查询'
            },
        ]
    },
    {
        index: '3',
        title: '证书管理',
        icon: 'iconfont icon-zhengshu-copy i',
        children: [
            {
                path: '/',
                name: '证书导入'
            },
            {
                path: '/',
                name: '证书查询'
            },
            {
                path: '/',
                name: '证书过期查询'
            },
        ]
    },
    {
        index: '4',
        title: '作业登记管理',
        icon: 'iconfont icon-fenghuangxiangmutubiao_dengjichu i',
        children: [
            {
                path: '/recordSearch',
                name: '作业登记查询'
            },
            {
                path: '/projectSearch',
                name: '施工记录查询'
            },
            {
                path: '/projectIsSearch',
                name: '项目查询'
            },
        ]
    },
    {
        index: '5',
        title: '其他管理',
        icon: 'iconfont icon-zidianguanli i',
        children: [
            {
                path: '/manager',
                name: '权限管理'
            },
            {
                path: '/',
                name: '区域管理'
            },
            {
                path: '/',
                name: '部门分厂管理'
            },
        ]
    }
])
const onIsCollapse = () => {
    store.isCollapse = !store.isCollapse;
}

</script>
<style scoped src="@/assets/css/menu.css">
</style>
