<template>
    <div class="bar">
        <div id="EchartsCompanyCount2"  ref="EchartsCompanyCount2" style="height:calc(60vh - 120px);width:100%"></div>
    </div>
</template>
<script >
import echarts from '../../../node_modules/echarts'
import {resourceConsumption} from '../../api/share/companyCount'
import { mapState } from "vuex";
export default{
    
data(){
    name:'EchartsCompanyCount2'
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
      this.EchartsCompanyCount2.resize();
    },
async getStar(){ 

let myChart = echarts.init(document.getElementById("EchartsCompanyCount2"));
     let ziyuan = []
let months = []
 let roles = this.userInfo.roles;
    if( roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 
      ){
          let companyId = 6
       const response = await  resourceConsumption({companyId:companyId})
       let temArr=[]
response.data.forEach(item=>{
    
let temp ={
    value:item.consume,
    name:item.month,  
}
temArr.push(temp)
this.ziyuan = temArr
})
this.ziyuan.forEach(item=>{
  months.push(item.name) 
})
      }else{
          const response = await  resourceConsumption()
          let temArr=[]
response.data.forEach(item=>{
    
let temp ={
    value:item.consume,
    name:item.month,  
}
temArr.push(temp)
this.ziyuan = temArr
})

this.ziyuan.forEach(item=>{
  months.push(item.name)
  
})
      }
    let option = {
        backgroundColor:'#262626',
    title: {
        text: '2020年资源月消费额',
        left: 'center',
         top:15,
        textStyle:{
            color:'#fff',
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}元 ({d}%)'
    },
    legend: {
        orient: 'vertical',
        // left: 'left',
        right:'5',
        top:'center',
        data: months,
        textStyle:{
            color:'#fff',
            
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
           
            data: this.ziyuan,
         
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
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