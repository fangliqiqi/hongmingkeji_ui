<template>
    <div class="bar">
        <div id="EchartsCompanyCount1"  ref="EchartsCompanyCount1" style="height:calc(80vh - 120px);width:100%"></div>
    </div>
</template>
<script >
import echarts from '../../../node_modules/echarts'
import{ monthlyCount} from '../../api/share/companyCount' 
import { mapState } from "vuex";
//import LogoVue from "../../layout/components/Sidebar/Logo.vue";
export default{
    
data(){
    name:'EchartsCompanyCount1'
    return {

    }
},
created(){
    


},
 computed: {
   
    ...mapState({
      userInfo: state => state.user
    })
  },
mounted(){
    this.$nextTick(() => {
      this.getStar();
    });
},


methods:{
      resize() {
      this.EchartsCompanyCount1.resize();
    },
  async getStar(){

     let myChart = echarts.init(document.getElementById("EchartsCompanyCount1"));
     let ziyuan = []
     let chengjiao = []
     let roles = this.userInfo.roles;
    // console.log(roles);
    if( roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 
      ){
          let companyId = 6
       const response = await monthlyCount({companyId:companyId})
       //资源数
        ziyuan.push(response.data.aprilTotal,response.data. januaryTotal,response.data. februaryTotal,response.data. marchTotal,response.data. aprilTotal,response.data. mayTotal,response.data. juneTotal,response.data. augustTotal,response.data. septemberTotal,response.data. octoberTotal,response.data. novemberTotal,response.data. decemberTotal)
    
    //成交数
chengjiao.push(response.data.aprilTotalDeal,response.data. januaryTotalDeal,response.data. februaryTotalDeal,response.data. marchTotalDeal,response.data. aprilTotalDeal,response.data. mayTotalDeal,response.data. juneTotalDeal,response.data. augustTotalDeal,response.data. septemberTotalDeal,response.data. octoberTotalDeal,response.data. novemberTotalDeal,response.data. decemberTotalDeal)
      }else{
          const response = await monthlyCount()
          //资源数
           ziyuan.push(response.data.aprilTotal,response.data. januaryTotal,response.data. februaryTotal,response.data. marchTotal,response.data. aprilTotal,response.data. mayTotal,response.data. juneTotal,response.data. augustTotal,response.data. septemberTotal,response.data. octoberTotal,response.data. novemberTotal,response.data. decemberTotal)
    
    //成交数
chengjiao.push(response.data.aprilTotalDeal,response.data. januaryTotalDeal,response.data. februaryTotalDeal,response.data. marchTotalDeal,response.data. aprilTotalDeal,response.data. mayTotalDeal,response.data. juneTotalDeal,response.data. augustTotalDeal,response.data. septemberTotalDeal,response.data. octoberTotalDeal,response.data. novemberTotalDeal,response.data. decemberTotalDeal)
      }

    

 



    let option = {
    title: {
        text: '2020资源数据统计表',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['资源数', '成交数'],
        top:30
    },
    toolbox: {
        show: true,
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '资源数',
            type: 'bar',
            data: ziyuan,
            
        },
        {
            name: '成交数',
            type: 'bar',
            data: chengjiao,
           
        }
    ]
    };
     myChart.setOption(option)
}
},

beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    // off(window, "resize", this.resize);
  }


}
    

</script>
<style scoped>

</style>