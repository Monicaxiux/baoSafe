<template>
    <div class="common-layout">
        <el-container>
            <el-aside :width="!store.isCollapse ? '240px' : '65px'">
                <Menu :addTab="addTab"></Menu>
            </el-aside>
            <el-container class="right-wrapper">
                <el-main>
                    <el-tabs v-model="store.active" type="card" class="demo-tabs" @click.keyup.right="clickRig"
                        @tab-change="change" closable @tab-remove="removeTab">
                        <div class="user_box">
                            <div @click="toggleFullscreen" class="user">
                                <i class="iconfont icon-quanping"></i>
                            </div>
                            <el-dropdown>
                                <div class="user">
                                    {{ store.userInfo.username }}({{ isUserAuth(store.userInfo.userAuth) }})
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu style="width: 128px;">
                                        <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
                                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <el-tab-pane v-for="item in store.editableTabs" :key="item.name" :label="item.title"
                            :name="item.name">
                        </el-tab-pane>
                        <el-card class="box-card box" shadow="never">
                            <router-view></router-view>
                        </el-card>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Menu from './components/Menu.vue'//引入侧边栏组件
import { piniaData } from '@/store';//引入pinia状态管理
import { useRouter } from "vue-router";//引入路由
import screenfull from 'screenfull'//引入全屏插件
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { onMounted } from 'vue';
import { isUserAuth } from '@/utils/regexp'

const store = piniaData()
//路由
const router = useRouter();
// Tab选中跳转对应路由
const change = (val: any) => {
    router.push({ path: val })
}
onMounted(() => {
    initWebSocket()
})
const clickRig = () => {
    // document.oncontextmenu = (e) => {
    //     return false
    // }
    // console.log('qwe');

}

// 添加Tab标签
const addTab = (targetName: string, targetTitle: string) => {
    // 先判是否存在相同tab
    let status = true
    for (let i = 0; i < store.editableTabs.length; i++) {
        if (store.editableTabs[i].name == targetName) {
            status = false
        }
    }
    if (status) {
        // 不存在则添加tab
        store.editableTabs.push({
            title: targetTitle,
            name: targetName
        })
    } else {

    }

}
// 删除Tab标签
const removeTab = (targetName: string) => {
    // 如果当前为最后一个则不删除
    if (store.editableTabs.length != 1) {
        const tabs = store.editableTabs
        let activeName = store.active
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }
        store.editableTabs = tabs.filter((tab) => tab.name !== targetName)
        //删除tabs自动跳转下一个tabs
        store.active = store.editableTabs[store.editableTabs.length - 1].name
    }
}
//切换全屏
const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
        screenfull.toggle()
    }
}
// 退出登录
const logOut = () => {
    ElMessageBox.confirm(
        '确定退出登录吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElNotification({
                message: '当前账号已退出',
                type: 'warning',
            })
            // 初始化pinia数据
            store.$reset();
            // 返回登录界面
            router.push({ path: "/" })
        })
        .catch(() => {

        })

}
// 代办事项 开始
const initWebSocket = () => {
    //初始化weosocket
    var websocket: any = null;
    //判断当前浏览器是否支持WebSocket
    if ("WebSocket" in window) {
        //改成你的地址
        websocket = new WebSocket("wss://safeedu.bnasafe.com//websocket");
    } else {
        console.log("当前浏览器 Not support websocket");
    }

    //连接发生错误的回调方法
    websocket.onerror = function () {
        console.log('连接失败');

    };

    //连接成功建立的回调方法
    websocket.onopen = function () {
        // console.log('连接成功');
    };

    // 2、每隔30s向后端发送一条商议好的数据
    setInterval(() => {
        // console.log('重置监测心跳')
        websocket.send("心跳")
        // 3、发送数据 2s后没有接收到返回的数据进行关闭websocket重连
        // setTimeout(() => {
        //   console.log("后台挂掉，没有心跳了....");
        //   console.log("打印websocket的地址:" + websocket);
        // }, 2000);
    }, 30000)

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        let pending = JSON.parse(event.data);
        console.log(pending.expiredLicenseNum);

        store.expiredAlarm.expiredLicenseNum = pending.expiredLicenseNum
    };
}
</script>

<style scoped src="@/assets/css/index.css">
</style>
