<template>
  <div class="login">
    <background >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">商机后台管理系统</h3>
        <el-form-item prop="phonenumber">
          <el-input v-model.number="loginForm.phonenumber" type="tel" auto-complete="off" placeholder="手机号码" :maxlength="11">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <!--      <el-form-item prop="password">-->
        <!--        <el-input-->
        <!--          v-model="loginForm.password"-->
        <!--          type="password"-->
        <!--          auto-complete="off"-->
        <!--          placeholder="密码"-->
        <!--          @keyup.enter.native="handleLogin"-->
        <!--        >-->
        <!--          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
        <!--        </el-input>-->
        <!--      </el-form-item>-->
        <el-form-item prop="msgCode">
          <el-row class ="yzm">
            <el-input
              v-model="loginForm.msgCode"
              auto-complete="off"
              placeholder="短信验证码"
              style="width: 100%"
              :maxlength="6"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <el-button type="text" class="msg-bt" v-if="count==61" @click="getMsgCode">获取短信验证码</el-button>
            <el-button type="text" class="msg-bt" v-else>重新发送({{count}}s)</el-button>
            <!--          <div class="login-code">-->
            <!--            <img :src="codeUrl" @click="getCode" class="login-code-img"/>-->
            <!--          </div>-->
          </el-row>
        </el-form-item>
        <!--      <el-form-item prop="code">-->
        <!--        <el-input-->
        <!--          v-model="loginForm.code"-->
        <!--          auto-complete="off"-->
        <!--          placeholder="验证码"-->
        <!--          style="width: 63%"-->

        <!--          @keyup.enter.native="handleLogin"-->
        <!--        >-->
        <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
        <!--        </el-input>-->
        <!--        <div class="login-code">-->
        <!--          <img :src="codeUrl" @click="getCode" class="login-code-img"/>-->
        <!--        </div>-->
        <!--      </el-form-item>-->
        <!--      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;margin-top: 30px;color: #452c68" >
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </background>
  </div>
</template>

<script>
import { getCodeImg,getMsgCode } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { throttle } from '@/utils/ruoyi'
import Background from './background'

export default {
  name: "Login",
  components:{
    Background
  },
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        msgCode:"",
        uuid: "",
        phonenumber:null
      },
      loginRules: {
        phonenumber: [
          { required: true, trigger: "blur", message: "手机号码不能为空"},
          { type: 'number', message: '手机号码必须为数字值'}
        ],
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        msgCode: [
          { required: true, trigger: "blur", message: "短信验证码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,
      count:61,
      timer:null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getMsgCode:throttle(function(){
      let phonenumber = this.loginForm.phonenumber;
      if(phonenumber){
        let data = {
          phone:phonenumber,
          phonenumber:phonenumber
        }
        getMsgCode(data).then(res=>{
          this.loginForm.uuid = res.uuid;
        })
        this.setCountFun();
      }else{
        this.$message({
          message: '请正确填写手机号码',
          type: 'warning'
        });
      }
    }),
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("msgLogin", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    setCountFun:function() {
      let count = this.count;
     this.timer = setInterval(()=>{
        this.count = --count;
        if(count<=0){
          if(this.timer){
            clearInterval(this.timer)
          }
          this.count = 61
        }
      },1000)
    }
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
    }
  }
};
</script>
<style lang="scss">
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
  }
</style>
