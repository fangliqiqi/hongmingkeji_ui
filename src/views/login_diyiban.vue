<template>
  <div class="login">
   <!-- <div class="bg">
      <video autoplay="autoplay" muted="muted" volume="0" loop="loop" style="width: 100%;height: 100%;object-fit:cover;object-position:center center;z-index: 1;">
        <source type="video/mp4" :src="require('@/assets/image/bg.mp4')"/>
      </video>
    </div>-->
  <!--  <div class="title-vi">
      <img :src="require('@/assets/image/logo.png')" style="width: 72px;height: 72px;"/>
      <img class="lh" :src="require('@/assets/image/lh.png')" />
      <img :src="require('@/assets/image/hmtext.png')" style="height: 60px;">
    </div>-->
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
      <el-form-item style="width:100%;margin-top: 30px;color: #452c68">
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
    <!--  底部  -->
    <div class="el-login-footer">
      <span><a href="http://www.modewenti.com" target="_blank">www.modewenti.com</a> 泓铭网络科技有限公司<br/>
              Copyright © 2018-2020 <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备 18018391号-2</a>
        </span>
    </div>
  </div>
</template>

<script>
import { getCodeImg,getMsgCode } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { throttle } from '@/utils/ruoyi'


export default {
  name: "Login",
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

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background02.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .title-vi{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 52px;
    .lh{
      margin-left: 24px;
      margin-right: 24px;
      height: 52px;
    }
    z-index: 10;
  }
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #fff;
}

.login-form {
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
  width: 420px;
  padding: 25px 25px 5px 25px;
  z-index: 10;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }

  .el-button:not(.el-button--text){
    //background: #003dbf;
    //border-color: #003dbf;
    background: #007c7e;
    border-color: #007c7e;
  }
  .el-button--text{
    color: #007c7e;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #007c7e;
    border-color: #007c7e;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label,.el-checkbox__label{
    color: #ffffff;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
.yzm{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  .msg-bt{
    position: absolute;
    right: 10px;
    color: #452c68;
  }
}
</style>
