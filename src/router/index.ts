import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import { piniaData } from '@/store';//引入pinia状态管理
import Login from '@/views/User/login.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/index',//首页
		name: 'index',
		component: () => import('../views/Index/index.vue'),
		children: [
			// 人员管理
			{
				path: '/externalPartners',
				name: 'externalPartners',
				component: () => import('../views/AddressBook/externalPartners.vue'),
			},
			{
				path: '/bnaPartners',
				name: 'bnaPartners',
				component: () => import('../views/AddressBook/bnaPartners.vue'),
			},
			//安全教育录入
			{
				path: '/bnaEntry',
				name: 'bnaEntry',
				component: () => import('../views/InformationEntry/bnaEntry.vue'),
			},
			// 安全教育/年度安全教育 查询
			{
				path: '/bnaSafety',
				name: 'bnaSafety',
				component: () => import('../views/SafetyQualification/bnaSafety.vue'),
			},
			{
				path: '/externalSafety',
				name: 'externalSafety',
				component: () => import('../views/SafetyQualification/externalSafety.vue'),
			},
			// 安全教育/年度安全教育 申报
			{
				path: '/bnaApplication',
				name: 'bnaApplication',
				component: () => import('../views/SafetyApplication/bnaApplication.vue'),
			},
			{
				path: '/externalApplication',
				name: 'externalApplication',
				component: () => import('../views/SafetyApplication/externalApplication.vue'),
			},
			// 安全教育/年度安全教育 审批
			{
				path: '/bnaApproval',
				name: 'bnaApproval',
				component: () => import('../views/SafetyApproval/bnaApproval.vue'),
			},
			{
				path: '/externalApproval',
				name: 'externalApproval',
				component: () => import('../views/SafetyApproval/externalApproval.vue'),
			},
			// 作业登记管理
			{
				path: '/recordSearch',
				name: 'recordSearch',
				component: () => import('../views/RecordSearch/recordSearch.vue'),
			},
			{
				path: '/projectSearch',
				name: 'projectSearch',
				component: () => import('../views/RecordSearch/projectSearch.vue'),
			},
			{
				path: '/projectIsSearch',
				name: 'projectIsSearch',
				component: () => import('../views/RecordSearch/projectIsSearch.vue'),
			},
			//其他管理 
			//权限管理
			{
				path: '/manager',
				name: 'manager',
				component: () => import('../views/Manager/manager.vue'),
			},
			{
				path: '/license',
				name: 'license',
				component: () => import('../views/Expiration/license.vue'),
			},
			{
				path: '/certimport',
				name: 'certimport',
				component: () => import('../views/Certificate/certimport.vue'),
			},
			{
				path: '/dicArea',
				name: 'dicArea',
				component: () => import('../views/Dictionary/dicArea.vue'),
			},
			{
				path: '/sector',
				name: 'sector',
				component: () => import('../views/Dictionary/sector.vue'),
			},
			{
				path: '/selectLicense',
				name: 'selectLicense',
				component: () => import('../views/Certificate/selectLicense.vue'),
			},
			// {
			// 	path: '/test',
			// 	name: 'test',
			// 	component: () => import('../views/test.vue'),
			// },
			{
				path: '/SynergyInside',
				name: 'SynergyInside',
				component: () => import('../views/SynergyInside/Inside.vue'),
			}
		]
	},
	{
		path: '/',//登录
		name: 'login',
		component: Login
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404/404.vue')
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404'
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// 路由全局守卫：登录拦截 本地没有用户信息, 请重新登录
router.beforeEach((to, from, next) => {
	const store = piniaData()
	// 判断有没有登录
	if (!store.userInfo.id) {
		if (to.name == "login") {
			next();
		} else {
			ElNotification({
				message: '请先登录！',
				type: 'error',
			})
			router.push('/')
		}
	} else {
		next();
	}
});

export default router