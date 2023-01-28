<template>
  <div class="bar">
    <!-- 年月日选择 -->
    <div>
      <!-- 年份   -->
       <div class="year">
            
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
      id="EchartsCustomerCountShow1"
      ref="EchartsCustomerCountShow1"
      style="height:calc(70vh - 120px);width:100%"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import echarts from "../../../node_modules/echarts";
import { resourceShow,getYears } from "../../api/share/customerCountShow";

export default {
  data() {
    name: "EchartsCustomerCountShow1";
    return {
      //传给后台的年份
      Year: [],
      //传给后台的月份
      Month: [],
      Time: []
    };
  },
  created() {
  
  },

  mounted() {
     this.$nextTick(() => {
      this.getStar();
        this.nian()
    });
  },

  methods: {
    resize() {
      this.EchartsCustomerCountShow1.resize();
    },
    nian(){
     getYears().then(response=>{
      this.Time = response.data.years
      console.log(this.Time);
    })
    }
    ,
     //点击选择的年份
    getyear(item) {
      if (this.Year.length == 0) {
        this.Year.push(item);
      } else {
        this.Year = [];
        this.Year.push(item);
      }
    },
    //点击选择月份
    async getMonth(item) {
      if (this.Month.length == 0) {
        this.Month.push(item);
      } else {
        this.Month = [];
        this.Month.push(item);
      }
      let year = this.Year;
      let month = this.Month;
      let businessName = [];
      let total = [];
      let monthTotal = [];
      let oneWeek = [];
      let twoWeek = [];
      let threeWeek = [];
      let fourWeek = [];
      let fiveWeek = [];
      let sixWeek = [];
      let myChart = echarts.init(
        document.getElementById("EchartsCustomerCountShow1")
      );

      const response = await resourceShow({
        year: year.join(""),
        month: month.join("")
      });
     
      response.data.resourceShow.forEach(item => {
        businessName.push(item.businessName);
        total.push(item.total);
        monthTotal.push(item.monthTotal);
        oneWeek.push(item.oneWeek);
        twoWeek.push(item.twoWeek);
        threeWeek.push(item.threeWeek);
        fourWeek.push(item.fourWeek);
        fiveWeek.push(item.fiveWeek);
        sixWeek.push(item.sixWeek);
 });
        let option = {
          xAxis: [{ data: businessName }],
          series: [
            {
              data: total
            },
            {
              data: monthTotal
            },
            {
              data: oneWeek
            },
            {
              data: twoWeek
            },
            {
              data: threeWeek
            },
            {
              data: fourWeek
            },
            {
              data: fiveWeek
            },
            {
              data: sixWeek
            }
          ]
        };
        myChart.setOption(option);
     
    },

    async getStar() {
      let businessName = [];
      let total = [];
      let monthTotal = [];
      let oneWeek = [];
      let twoWeek = [];
      let threeWeek = [];
      let fourWeek = [];
      let fiveWeek = [];
      let sixWeek = [];
      let myChart = echarts.init(
        document.getElementById("EchartsCustomerCountShow1")
      );
        const res = await getYears()
        this.Time.push(res.data.years)
        
      const response = await resourceShow();
      response.data.resourceShow.forEach(item => {
        businessName.push(item.businessName);
        total.push(item.total);
        monthTotal.push(item.monthTotal);
        oneWeek.push(item.oneWeek);
        twoWeek.push(item.twoWeek);
        threeWeek.push(item.threeWeek);
        fourWeek.push(item.fourWeek);
        fiveWeek.push(item.fiveWeek);
        sixWeek.push(item.sixWeek);

        // console.log(response.data);
      });

      let option = {
        title: {
          text: "网络资源数据展示",
          left: "center",
          top: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
        //  left:'50%',
          top: 30,
          data: [
            "总资源数",
            "月资源数",
            "第一周资源",
            "第二周资源",
            "第三周资源",
            "第四周资源",
            "第五周资源",
            "第六周资源"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top:100,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: businessName
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总资源数",
            type: "bar",
            data: total
          },
          {
            name: "月资源数",
            type: "bar",
            data: monthTotal,
          },
          {
            name: "第一周资源",
            type: "bar",
            barWidth: 5,
            stack: "月资源数",
            data: oneWeek
          },
          {
            name: "第二周资源",
            type: "bar",
            stack: "月资源数",
            data: twoWeek
          },
          {
            name: "第三周资源",
            type: "bar",
            stack: "月资源数",
            data: threeWeek
          },
          {
            name: "第四周资源",
            type: "bar",
            stack: "月资源数",
            data: fourWeek
          },
          {
            name: "第五周资源",
            type: "bar",
            stack: "月资源数",
            data: fiveWeek
          },
          {
            name: "第六周资源",
            type: "bar",
            stack: "月资源数",
            data: sixWeek
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
/* .bar {
  margin-top: 100px;
 margin-bottom:300px;
} */
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
