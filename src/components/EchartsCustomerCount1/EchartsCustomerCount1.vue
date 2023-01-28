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
                @click=" getHezuoYear(item)"
                :class="{ bgColor: hezuoYear == item }"
                >{{ item + "年" }}</span
              >
            </div>
          </div>
      <!-- 月份  -->
          <div class="month">
            <span
              v-for="item in 12"
              :key="item.id"
              @click="getHezuoMonth(item)"
              :class="{ bgColor: hezuoMonth == item }"
              >{{ item + "月" }}</span
            >
          </div>
        </div> 
    <div id="EchartsCustomerCount1" ref="EchartsCustomerCount1" style="height:calc(40vh );width:100%" class="zhaoshang"></div>
  </div>
</template>
<script>
import { Consumption } from "@/api/share/customerCount";
import echarts from "../../../node_modules/echarts";

export default {
  data() {
    name: "EchartsCustomerCount1";
    return {
       Time: [],
        //合作商消费比
      proportionTotal: [],
        //合作商续费年份
      hezuoYear: [],
      //合作商续费月份
      hezuoMonth: [],
    };
  },
  created() {},

  mounted() {
     this.$nextTick(() => {
      this.getStar();
    });
  },

  methods: {
     resize() {
      this.EchartsCustomerCount1.resize();
    },
     //合作商续费年份
    getHezuoYear(item, index) {
      if (this.hezuoYear.length == 0) {
        this.hezuoYear.push(item);
      } else {
        this.hezuoYear = [];
        this.hezuoYear.push(item);
      }
    },
     //合作商续费月份
   async  getHezuoMonth(item) {
      let myChart = echarts.init(
        document.getElementById("EchartsCustomerCount1")
      );
      if (this.hezuoMonth.length == 0) {
        this.hezuoMonth.push(item);
      } else {
        this.hezuoMonth = [];
        this.hezuoMonth.push(item);
      }
      let year = this.hezuoYear;
      let month = this.hezuoMonth;
        //y轴公司名称
      let companyName = [];
      //公司消费比
      let proportion = [];
     const response = await Consumption({  year: year.join(""), month: month.join("")})
    //  this.Time = response.data.year
    console.log('ddddddd');
    console.log(response.data.year);
    this.Time=response.data.year
     response.data.consumeCount.forEach(item=>{
        companyName.push(item.companyName)
      proportion.push(parseFloat(item.proportion)) 
     

     })
     
      let option = {
    yAxis: {
        data: companyName,     
    },

   series: [{
        data:proportion
    }]
 }
  myChart.setOption(option);
    },
 
    async getStar() {
      let myChart = echarts.init(
        document.getElementById("EchartsCustomerCount1")
      );
      //y轴公司名称
      let companyName = [];
      //公司消费比
      let proportion = [];
 
      const response = await Consumption()
       this.Time=response.data.year
      response.data.consumeCount.forEach(item => {
      companyName.push(item.companyName)
      proportion.push(parseFloat(item.proportion)) 
    
      });
     
      let option = {
          backgroundColor: '#262626',
    title: {
        text: '消费比',
        left: 'center',
       textStyle: {
            color: '#fff',
            fontSize: 24
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        
        axisLine: {
            show: true,
            lineStyle: {
                color: 'white'
            }
        },
        // boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: companyName,
       axisLine: {
            show: true,
            lineStyle: {
                color: 'white'
            }
        },
    },
    
    series: [
        {
            itemStyle: {//柱图背景色
       　　normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
              
                // 定制显示（按顺序）
                color: function(params) { 
                    var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                    return colorList[params.dataIndex] 
                }
            },
       },    
          label:{
        color:'#fff'
    },

            type: 'bar',
           data:proportion
             //data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
       
    ]
};


      myChart.setOption(option);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    // off(window, "resize", this.resize);
  }

};
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
