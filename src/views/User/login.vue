<template>
  <div class="xp">
    <div class="dowebok" :class="{ 'right-panel-active': idA }" id="dowebok">
      <div class="form-container sign-in-container">
        <el-form :rules="rules" :model="data" ref="ruleFormRef">
          <img style="border-radius: 50%;margin: 0 auto;" src="../../assets/logo.png" width="130"
            height="100" /><br><br>
          <h1>宝日汽车板</h1><br />
          <h1>人员安全教育信息管理</h1><br />
          <span>使用您的IC帐号</span><br />
          <el-form-item label="" prop="loginName">
            <el-input v-model="data.loginName" clearable placeholder="请输入IC工号" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="data.password" type="password" show-password clearable @keyup.enter="logins"
              placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loding" class="button" @click="logins">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-container sign-up-container">
        <br>
        <br>
        <h1>{{ Status }}注册</h1>
        <br>
        <br>
        <div>
          <!-- 外部负责人注册 -->
          <!-- 内部员工注册 -->
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <span class="iconfont icon-QRcode qrCode"></span>
          <div class="qrCodeImg">
            <!-- <img class="img-qr" style="border-radius: 10%;" src="../../assets/qrCode.png"> -->
          </div>
          <div class="overlay-panel overlay-left">
            <br><br>
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button class="buttonxx" @click="signUpButton()" id="signIn">返回</button>
          </div>
          <div class="overlay-panel overlay-right">
            <br><br><br>
            <h1>没有帐号？</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="buttonxx" @click="externalButton()" id="signUp">协力人员注册</button>
            <br>
            <button class="buttonxx" @click="internalButton()" id="signUp">BNA人员注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>//使用vue3语法糖setup
import { ref, onMounted, reactive, toRefs } from 'vue'//引入vue中各种方法
import { LoginUser, EiInfo } from '@/types'//引入参数规范类型
import { login } from '@/api/user';//引入api方法
import { ElNotification } from 'element-plus'
import { validateUser, validatePassWord } from '@/utils/regexp';//引入验规则证
import { useRouter } from "vue-router";//引入路由
import { piniaData } from '@/store';//引入pinia状态管理
//pinia状态管理
const store = piniaData();
const idA = ref(false)
const switStatus = ref(false)
const Status = ref('')
//路由
const router = useRouter();
//按钮加载效果
const loding = ref(false);
//登陆表单数据
const data = reactive(new LoginUser);
//eilnfo格式参数
const eilnfo = reactive(new EiInfo);
//表单验证
const ruleFormRef = ref();
//登陆表单验证
const rules = reactive({
  loginName: [{ validator: validateUser, trigger: 'blur' }],
  password: [{ validator: validatePassWord, trigger: 'blur' }],
});
//用户登陆
const logins = () => {
  // " ? " 是指前面是underlined或者null后面的代码就不走了,也就是表单验证不通过就不走了
  ruleFormRef.value?.validate((valid) => {
    valid ? (
      //开启按钮加载动画
      loding.value = true,
      //给eilnfo参数赋值
      eilnfo.parameter = data,
      //调用登陆方法传入eilnfo对象参数
      login(eilnfo).then((res: any) => {
        res.sys.status != -1 ? (
          ElNotification({
            message: '登录成功，欢迎回来',
            type: 'success',
          }),
          //把userinfo存入pinia
          store.userInfo = res.userInfo,
          store.expiredAlarm = res.result.expiredAlarm,
          store.countVerifySafeEduInternal = res.result.countVerifySafeEduInternal,
          store.countVerifySafeEduExternal = res.result.countVerifySafeEduExternal,

          store.active == '/' ? (
            //登陆成功跳转对应页面
            router.replace({ path: '/bnaPartners' }),
            // 修改菜单选中状态
            store.active = '/bnaPartners'
          ) : (
            //登陆成功跳转对应页面
            router.replace({ path: store.active })
          )
        ) : (
          //登陆失败后重置表单
          ruleFormRef.value?.resetFields()
        )
        //关闭按钮加载动画
        loding.value = false;
      })
    ) : (
      //表单验证未通过
      false
    )
  })
};

const signUpButton = () => {
  idA.value = false
}
const externalButton = () => {
  ElNotification({
    message: '该功能暂未开放',
    type: 'warning',
  })
  // idA.value = true
  // switStatus.value = true
  // //标题切换
  // Status.value = "协力人员"
  //清除表单内容以及验证结果
  // this.$refs.externalForm.resetFields();
}
const internalButton = () => {
  ElNotification({
    message: '该功能暂未开放',
    type: 'warning',
  })
  // this.selectBaoDepartment();
  // idA.value = true
  // switStatus.value = false
  // Status.value = "BNA人员"
  // this.$refs.internalForm.resetFields();
}
</script>
<style scoped src="@/assets/css/login.css">

</style>
