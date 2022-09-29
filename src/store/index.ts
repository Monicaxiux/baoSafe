import { defineStore } from "pinia";
import { userInfo } from "./type";
export const piniaData = defineStore("piniaData", {
    state: () => {
        return {
            userInfo: <userInfo>{},
            isCollapse: <boolean>false,
            expiredAlarm: <any>{},
            active: <string>'/bnaPartners',
            editableTabs: <any>[{
                title: 'BNA员工信息维护',
                name: '/bnaPartners',
            }],
            fileStatus: <boolean>true,
            lsfileStatus: <boolean>true,
            countVerifySafeEduInternal: <any>0,
            countVerifySafeEduExternal: <any>0
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