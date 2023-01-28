<template>
    <div class="bar">
         <!-- 年月日选择 -->
        <div>
    <!-- 年份   -->
          <div class="year">
            <!-- <div class="yearChild">
              <span>月</span>
              <div></div>
              <span>年</span>
            </div> -->
            <div v-for="item in Time" :key="item.id">
              <span
                class="itemYears"
                ref="itemYear"
                @click="getyear(item)"
                :class="{ bgColor: Year == item }"
                >{{ item + "年" }}</span
              >
            </div>
          </div>
      <!-- 月份  -->
          <div class="month">
            <span
              v-for="item in 12"
              :key="item.id"
              @click="getMonth(item)"
              :class="{ bgColor: Month == item }"
              >{{ item + "月" }}</span
            >
          </div>
        </div> 
        <!-- 日折线图 -->
        <div id="EchartsCustomerCountShow4"  ref="EchartsCustomerCountShow4" style="height:calc(70vh - 120px);width:100%" class="zhaoshang "></div>
    </div>
</template>
<script >
import echarts from '../../../node_modules/echarts'
import {DetailResource,getYears} from '../../api/share/customerCountShow'
export default{
    
data(){
    name:'EchartsCustomerCountShow4'
    return {
  //传给后台的年份
      Year: [],
      //传给后台的月份
      Month: [],
      Time:[]
    }
},
created(){
},

mounted(){
  this.$nextTick(() => {
      this.getStar();
       this.nian()
    });

},


methods:{
   resize() {
      this.EchartsCustomerCountShow4.resize();
    },
     nian(){
     getYears().then(response=>{
      this.Time = response.data.years
      console.log(this.Time);
    })
    }
    ,
  //点击选择的年份
      getyear(item,index) {
      if (this.Year.length == 0) {
      this.Year.push(item)
      } else {
        this.Year = [];
        this.Year.push(item)
      }
    },
    //点击选择月份
async getMonth(item){
 if (this.Month.length == 0) {
        this.Month.push(item);
      } else {
        this.Month = [];
        this.Month.push(item);
      }
      let year = this.Year;
      let month = this.Month;
       //  日期
     let days = [];
      // 资源数展示
      let count = [];
        let myChart = echarts.init(document.getElementById("EchartsCustomerCountShow4"));

    const response = await DetailResource({
        year: year.join(""),
        month: month.join("")
      })
   response.data.DetailResource.forEach(item=>{
      count.push(item.count)
      days.push(item.time+'号')
   })
     let option = {
   xAxis: {
        data: days,     
    },
   series: [{
        data:count
    }]
 }
  myChart.setOption(option);
},



 async getStar(){

     let myChart = echarts.init(document.getElementById("EchartsCustomerCountShow4"));
    const res = await getYears()
    this.Time.push(res.data.years)
   //  日期
     let days = [];
      // 资源数展示
      let count = [];
    const response = await DetailResource()
    response.data.DetailResource.forEach(item=>{
      count.push(item.count)
      days.push(item.time+'号')
   })

    let option = {
      title: {
        text: '资源数据明细表 日总数',
        left:'center',
        top:10
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: days
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: count,
        type: 'line'
    }]
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
.month {
  display: flex;
  width: 50px;
  flex-direction: column;
  
}

.month > span {
  width: 50px;
  height: 28px;
line-height: 28px;
  text-align: center;
  border: 1px solid #000;
  border-bottom: 0px;
}
.month > span:last-child {
  border-bottom: 1px solid #000;
}
.year {
  display: flex;
   margin-left: 50px;
}
.yearChild {
  display: flex;
  width: 70px;
  border: 1px solid #000;
  border-bottom: 0;
  position: relative;
  /* height: 50px; */
}
.yearChild > div {
  width: 72px;
  height: 1px;
  transform-origin: center;
  position: absolute;
  top: 12px;
  left: -3px;
  transform: rotate(21deg);
  line-height: 1px;
  overflow: hidden;
  font-size: 0px; /*这个是关键 */
  margin: auto;
  border-bottom: 1px solid #000;
}
.yearChild > span {
  flex: 1;
  text-align: center;
}
.yearChild > span:first-child {
  padding-top: 8px;
}
.year > span {
  width: 50px;
  text-align: center;
  border: 1px solid #000;
  border-left: 0px;
}
.box {
  position: relative;
  padding: 0 !important;
  border: 0px !important;
}
.itemYears {
  white-space: nowrap;
  min-width: 50px !important;
  border: 1px solid #000;
  
  height: 26px;
  display: flex;
  line-height: 26px;
  padding: 0 3px 0 3px;
 
}
.zhaoshang {
  position: absolute;
  top:26px;
  left: 50px;
  border: 1px solid #000;
}
.bgColor {
  background-color: skyblue;
}
</style>