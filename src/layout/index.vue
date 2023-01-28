<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar/>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main v-if="isRouterAlive"/>
      <right-panel v-if="showSettings">
        <settings/>
      </right-panel>
    </div>
  </div>
</template>

<script>
  import RightPanel from '@/components/RightPanel'
  import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapState } from 'vuex'
  import { connectionSocket } from '@/utils/websocket'

  export default {
    data(){
      return {
        webS:'',
        isRouterAlive: true
      }
    },
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      RightPanel,
      Settings,
      Sidebar,
      TagsView
    },
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        showSettings: state => state.settings.showSettings,
        needTagsView: state => state.settings.tagsView,
        fixedHeader: state => state.settings.fixedHeader,
        userInfo:state => state.user,
        userId:state => state.user.id
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    watch: {

    },
    mounted() {
      this.notifyFun()
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      },
      notifyFun(){
        var that = this;
        console.info(console)
        var user = this.$store.state.user;
        if(user.id){
          this.closeWebS()
          this.webS =  connectionSocket('/'+user.id+'/'+user.roles[0],(res)=>{
            console.info(res)
            let msg = JSON.parse(res.data);
            if(msg.sourse){
              this.$notify({
                title: msg.sourse||'',
                message: msg.msgContent,
                duration:0,
                type: 'info',
                onClick:function(res) {
                  that.$router.push("/massage?t="+msg.messageType);
                  this.close()
                }
              });
              that.reload()
            }
          })
        }else{
          // this.connSockJS(null,(res)=>{
          //   console.info(res)
          //   this.$notify({
          //     title: '商机提示',
          //     message: res.data,
          //     duration:0,
          //     type: 'info'
          //   });
          // })
        }
      },
      closeWebS:function() {
        if(this.webS){
          this.webS.close();
        }
      },
      reload () {
        if(this.$route.path!='/index'){
this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;         //再打开
        })
        }
        
      }
    },
    beforeDestroy() {
      this.closeWebS()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
