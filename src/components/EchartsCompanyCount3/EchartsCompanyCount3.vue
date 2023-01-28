<template>
    <div class="bar">
        <div id="EchartsCompanyCount3" ref="EchartsCompanyCount3" style="height:calc(60vh - 120px);width:100%"></div>
    </div>
</template>
<script >
import echarts from '../../../node_modules/echarts'
//import LogoVue from "../../layout/components/Sidebar/Logo.vue";
import {monthlyCost} from '../../api/share/companyCount'
import { mapState } from "vuex";

export default{
    
data(){
    name:'EchartsCompanyCount3'
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
      this.EchartsCompanyCount3.resize();
    },
async getStar(){
let ziyuan = []
     let myChart = echarts.init(document.getElementById("EchartsCompanyCount3"));
     let roles = this.userInfo.roles;
    // console.log(roles);
    if( roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 
      ){
          let companyId = 6
       const response = await monthlyCost({companyId:companyId})
        ziyuan.push(response.data.april,response.data.august,response.data.december,response.data.february,response.data.january,response.data. july,response.data.june,response.data.march,response.data.may,response.data.november,response.data. october,response.data.september)
      }else{
          const response = await  monthlyCost()
           ziyuan.push(response.data.april,response.data.august,response.data.december,response.data.february,response.data.january,response.data. july,response.data.june,response.data.march,response.data.may,response.data.november,response.data. october,response.data.september)
      }
  
    

    let option = {
        backgroundColor:'#70a8ef',
    title: {
        text: '2020年月均费用/条',
        left: 'center',
        top:15,
        textStyle:{
            color:'#fff',        
        }   
    },
   
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        }
    ],
    yAxis: [
        {
           
            min : 0,
            //设置y轴值之间的间隔
            splitNumber : 10,
            type: 'value'
        }
    ],
    series: [
        {
            name: '月均费用/条',
            type: 'bar',
            data: ziyuan,
            itemStyle:{
                color:'#f4b183'
            }
           
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