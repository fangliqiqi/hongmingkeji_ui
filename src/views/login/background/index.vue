<template>
  <div class="background">
   <!-- <div class="bg">
      <video autoplay="autoplay" muted="muted" volume="0" loop="loop" style="width: 100%;height: 100%;object-fit:cover;object-position:center center;z-index: 1;">
        <source type="video/mp4" :src="require('@/assets/image/bg.mp4')"/>
      </video>
    </div>-->
    <div class="introduce-vi">
      <div>
        <span>{{ msgTitle||'商机跟进' }}</span>
        <p>{{msgContent}}</p>
      </div>
    </div>
    <div>
      <div class="title-vi">
        <img :src="require('@/assets/image/logo.png')" style="width: 72px;height: 72px;"/>
        <img class="lh" :src="require('@/assets/image/lh.png')" />
        <img :src="require('@/assets/image/hmtext.png')" style="height: 60px;">
      </div>
      <slot></slot>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span><a href="http://www.modewenti.com" target="_blank">www.modewenti.com</a>泓铭网络科技有限公司<br/>
              Copyright © 2018-2021 <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备 18018391号-2</a>
        </span>
    </div>
  </div>
</template>

<script>
import {getTips} from '@/api/login'
export default {
  name: "LoginBackground",
  data() {
    return {
      timer:null,
      msgContent:'',
      msgTitle:''
    };
  },
  watch: {

  },
  created() {

    getTips().then(res=>{
      console.info(res)
      let msg = res.tips.tipsContent;
      this.msgTitle = res.tips.tipsTitle;
      this.timerFun(msg);
    }).catch(err=>{
      console.info(err)
    })
  },
  computed:{

  },
  methods: {
    timerFun(msg){
      // msg = "在众多的商机线索中,您需要严格要求自己的工作人员。让他们养成良好的信息跟进习惯并且时常回顾跟进记录。\t\n学习、总结和分享，可以更快帮助您建立高效的业务团队.";
      let len = msg.length,seq=0,content='';
      this.timer=setInterval(
         ()=>{
          this.msgContent = msg.substring(0,seq>=len?seq=0:seq++);
          // console.info(len,seq,content)
        },120
      )
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
.background {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../../assets/image/login_background.jpg");
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
  /*介绍*/
  .introduce-vi{
    margin-right: 120px;
    margin-bottom: 100px;
    min-height: 400px;
    min-width: 300px;
    position: relative;
    perspective:520;
    -webkit-perspective:520; /* Safari and Chrome */
    &>div{
      position: absolute;
      min-height: 400px;
      min-width: 360px;
      border-width: 5px;
      border-color: rgba(#fff,0.4);
      border-style: solid;
      transform: rotateY(12deg);
      padding: 12px;
      span{
        font-family:"Microsoft YaHei";
        font-size: 24px;
        color: #ffffff;
      }
      p{
        font-family:"Microsoft YaHei";
        font-size: 18px;
        color: #ffffff;
        line-height: 1.5;
      }
    }
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
  width: 400px;
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
    //background: #007c7e;
    //border-color: #007c7e;
    background: -webkit-gradient(linear,left top,right bottom ,from(#ce9d52),to(#ce9d52),color-stop(0.1,#ce9d52));
    border-color: #ce9d52;
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
    color: #ce9d52;
  }
}
</style>
