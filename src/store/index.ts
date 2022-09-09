import { defineStore } from "pinia";
import { userInfo } from "./type";
export const piniaData = defineStore("piniaData", {
    state: () => {
        return {
            userInfo: <userInfo>{},
            isCollapse: <boolean>false,
            active: <string>'/bnaPartners',
            editableTabs: <any>[{
                title: 'BNA员工信息维护',
                name: '/bnaPartners',
            }],
            fileStatus: <boolean>true
        };
    },
    getters: {},
    actions: {},
    persist: {
        // 开启数据存储持久化（刷新页面不丢失）
        enabled: true,
        strategies: [
            {
                key: 'piniaData',
                storage: localStorage
            }
        ]
    }
});