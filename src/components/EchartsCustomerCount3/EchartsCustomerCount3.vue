<template>
  <!-- 充值金额饼图 -->
  <div class="bar">
    <!-- 年月日选择 -->
    <div>
      <!-- 年份   -->
      <div class="year">
        <!-- <div class="yearChild">
              <span>年</span>
              <div></div>
              <span>月</span>
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
    <div
      id="EchartsCustomerCount3"
      ref="EchartsCustomerCount3"
      style="height:calc(50vh );width:95%"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import { investmentCount } from "@/api/share/customerCount";
import echarts from "../../../node_modules/echarts";

export default {
  data() {
    name: "EchartsCustomerCount3";
    return {
      Month: [],
      Year: [],
      Time: []
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
      this.EchartsCustomerCount3.resize();
    },

    //招商业绩点击选择的年份
    getyear(item) {
      if (this.Year.length == 0) {
        this.Year.push(item);
      } else {
        this.Year = [];
        this.Year.push(item);
      }
    },
    //点击月份调用接口
    async getMonth(item) {
      let myChart = echarts.init(
        document.getElementById("EchartsCustomerCount3")
      );
      if (this.Month.length == 0) {
        this.Month.push(item);
      } else {
        this.Month = [];
        this.Month.push(item);
      }

      //饼图数据集合
      let companyName = [];
      //展示数据
      let tableData = [];
      let year = this.Year;
      let month = this.Month;
      const response = await investmentCount({
        year: year.join(""),
        month: month.join("")
      });
      this.Time = response.data.year;
      let temArr = []
      if (response.data.investmentCount.length==0){
         this.tableData=[]
         this.companyName=[]  
      }
      else{
      response.data.investmentCount.forEach(item => {
        item.companyPrice.forEach(ite => {
          let temp = {
            value: ite.totalAmount,
            name: ite.companyName
          }; 
          temArr.push(temp)
        
           this.tableData= temArr
        });
  
     
        this.tableData.forEach(item => {
     
          companyName.push(item.name);
        });
      
      });
      }
      
      let option = {
        legend: {
          data: companyName
        },

        series: [
          {
            data: this.tableData
          }
        ]
      };
      myChart.setOption(option);
    },

    async getStar() {
      let myChart = echarts.init(
        document.getElementById("EchartsCustomerCount3")
      );

      //饼图数据集合
      let companyName = [];
      //展示数据
      let tableData = [];
      const response = await investmentCount();
      this.Time = response.data.year;
      response.data.investmentCount.forEach(item => {
        let tempArr = [];
        item.companyPrice.forEach(ite => {
          let temp = {
            value: ite.totalAmount,
            name: ite.companyName
          };
          tempArr.push(temp);
          this.tableData = tempArr;
        });
        
        

        this.tableData.forEach(item => {
         
          companyName.push(item.name);
         
        });
      });

      let option = {
        title: {
          text: "充值金额",
          top: 30,
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}元 ({d}%)"
        },
        grid: {
          right: "10%"
        },

        legend: {
          orient: "vertical",
          right: 10,
          top: 10,
          data: this.companyName
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.tableData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            normal: {
              label: {
                show: true,
                formatter: "{a} : {c} ({d}%)"
              },
              labelLine: { show: true }
            }
          }
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
  top: 26px;
  left: 50px;
  border: 1px solid #000;
}
.bgColor {
  background-color: skyblue;
}
</style>
