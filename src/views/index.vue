<template>
  <div class="dashboard-editor-container">
    <!-- 消息轮播 -->
    <div class="vs-div">
      <vue-seamless-scroll
        :data="newsList"
        :class-option="optionLeft"
        class="seamless-warp2"
        v-if="newsList.length !== 0"
      >
        <ul class="item">
          <li v-for="item in newsList" :key="item.id">{{ item }}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <!-- 中国地图 -->
    <china-echarts v-if="MapShow"></china-echarts>

    <!-- Echarts图表 -->
    <!-- <panel-group
      @handleSetLineChartData="handleSetLineChartData"
      v-if="check"
    />

    <el-row
      style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"
      v-if="check"
    >
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32" v-if="check">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    <!-- 省市区合作商数量表格 -->
    <!-- <div v-if="flag" class="box">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        style="width:100%"
        border
      >
        <el-table-column label="省份" width="320" align="center">
          <template v-slot="scope">
            <span style=" font-weight: bold">
              {{ scope.row.prov }}
            </span>
            <span style="color:#0092E0;font-weight: bold">
              {{ scope.row.provCount }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="市区" width="320" align="center">
          <template v-slot="scope">
            <span>
              {{ scope.row.city }}
            </span>
            <span style="color:#0092E0;font-weight: bold">
              {{ scope.row.cityCount }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="区县" width="300" align="center">
          <template v-slot="scope">
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content">
                <el-table :data="companyName" style="width: 100%">
                  <el-table-column
                    label="公司名称"
                    prop="companyName"
                    width="280"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <span @mouseenter="enter(scope.row)">
                {{ scope.row.county }}
                <span style="color:#0092E0;font-weight: bold">
                  {{ scope.row.countyCount }}
                </span>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <div class="titles" style="margin-top:60px"  v-if="heZuoLoading"><h2>网销数据展示</h2></div>
    <company-count v-if="heZuoLoading"></company-count>
    <div class="titles" v-if="quDaoLoading"><h2>渠道招商数据展示</h2></div>
    <customer-count v-if="quDaoLoading"></customer-count>
    <div class="titles" v-if="loading"><h2>网运部数据展示</h2></div>
    <customer-countShow v-if="loading"></customer-countShow>
  </div>
</template>

<script>
import PanelGroup from "./dashboard/PanelGroup";
import LineChart from "./dashboard/LineChart";
import RaddarChart from "./dashboard/RaddarChart";
import PieChart from "./dashboard/PieChart";
import BarChart from "./dashboard/BarChart";
import {
  mapDataID,
  countyID,
  getRoleCount,
  getCompanyMessage
} from "@/api/index";
import { mapState } from "vuex";
import ChinaEcharts from "../components/Echarts/ChinaEcharts";
import LogoVue from "../layout/components/Sidebar/Logo.vue";
import CompanyCount from "../../src/views/share/companyCount/index";
import CustomerCount from "../../src/views/share/customerCount/index";
import CustomerCountShow from "../../src/views/share/customerCountShow";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "Index",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    ChinaEcharts,
    CompanyCount,
    CustomerCount,
    CustomerCountShow
  },
  data() {
    return {
      //合作商网销图表是否展示
      heZuoLoading: false,
      //渠道图表是否展示
      quDaoLoading: false,
      //网运图表是否展示
      loading: false,
      //if 判断表格显示
      flag: false,
      check: true,
      //判断地图是否显示
      MapShow: false,
      //角色
      roles: null,
      roleKey: [],
      //消息轮播数据
      newsList: [],
      //后台传过来的信息
      Message: null,
      dailiId: null,
      lineChartData: lineChartData.newVisitis,
      tableData: [],
      companyName: []
    };
  },
  created() {
    let roles = this.userInfo.roles;
    this.roles = roles;

    this.dailiId = this.userInfo.id;
    // this.dailiId = dailiId;
    //判断用户是否发送展示省市区表格
    if (
      roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 ||
      roles.indexOf("businessman") != -1 ||
      roles.indexOf("manger") != -1 ||
      roles.indexOf("channelService") != -1 ||
      roles.indexOf("kefu") != -1
    ) {
      this.getMap();
    }
    //判断用户是否展示图表
    if( roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 ||
      roles.indexOf("dailishang") != -1 
      ){
        this.heZuoLoading=true
      }
      if( roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 ||
      roles.indexOf("manger") != -1 ||
      roles.indexOf("businessman") != -1||
      roles.indexOf("channelService") != -1 
      ){
        this.quDaoLoading=true
      }
      if(roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 ||
       roles.indexOf("kefuzhuguan") != -1||
       roles.indexOf("kefu") != -1
       ){
         this.loading=true
       }

    //判断用户是否发送展示轮播消息
    let rolesName = [
      "admin",
      "boss",
      "dailiManger",
      "businessman",
      "channelService",
      "kefumanger",
      "kefu",
      "neizhangkuaiji"
    ];
    if (
      (this.roleKey = rolesName.filter(item => {
        return roles.indexOf(item) != -1;
      }))
    ) {
      this.roleCount();
    }

    //判断代理商
    //let dailiName = ["dailishang"];
    if (roles.indexOf("dailishang") != -1) {
      this.CompanyMessage();
    }
  },
  computed: {
    //轮播
    optionLeft() {
      return {
        //滚动的方向，2为左
        direction: 2,
        //滚动的数据量，改为获得的数组的长度
        limitMoveNum: 1
      };
    },
    ...mapState({
      userInfo: state => state.user
    })
  },
  methods: {
    //根据不同代理商展示不同数据
    CompanyMessage() {
      let userId = this.dailiId;
      getCompanyMessage({ userId: userId }).then(response => {
        this.newsList = response.rows || [];
      });
    },

    //展示用户轮播信息
    roleCount() {
      let roleKey = this.roleKey || [];
      if (roleKey.length > 0) {
        getRoleCount({ roleKey: this.roleKey.join(",") }).then(response => {
          this.newsList = response.rows || [];
        });
      }
    },

    //获取区县合作商公司名
    enter(row) {
      const tableDataCounty = row.county;
      const prov = row.prov;
      const city = row.city;

      countyID({ city: city, prov: prov, county: tableDataCounty }).then(
        response => {
          this.companyName = response.data;
        }
      );
    },
    //省市区合作商数量表格
    getMap() {
      this.MapShow = true;
      this.flag = true;
      this.check = false;
      mapDataID(this.countysData).then(response => {
        let data = response.data;
        let tempArr = [],
          ccount = 0,
          pcount = 0;

        data.forEach((item, index, arr) => {
          // let pc = 0;
          let cityC = 0;
          item.citys.forEach(a => {
            pcount += a.countys.length;
            cityC += a.countys.length;
          });
          item.citys.forEach((cc, cidx, ca) => {
            // pc +=  ca.length
            ccount += cc.countys.length;
            cc.countys.forEach((ccc, ccidx, cca) => {
              let temp = {
                prov: item.prov,
                provCount: item.provCount,
                provRow: arr.length,
                city: cc.city,
                cityCount: cc.cityCount,
                cityRow: ca.length,
                county: ccc.county,
                countyCount: ccc.countyCount,
                countyRow: cca.length,
                countyC: ccount,
                countyP: pcount,
                cityC: cityC
              };
              tempArr.push(temp);
            });
          });
        });
        this.tableData = tempArr;
      });
    },

    //表单合成
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let rpc = row.provRow;
      let cityRow = row.cityRow;
      let countyRow = row.countyRow;
      let countyC = row.countyC;
      let countyP = row.countyP;
      let cityC = row.cityC;
      if (columnIndex === 0) {
        if (countyP - cityC - rowIndex == 0) {
          return {
            rowspan: cityC,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 1) {
        if (countyC - countyRow - rowIndex == 0) {
          return {
            rowspan: countyRow,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },

    handleShowFollowList(a) {
      // console.log(a);
    }
  }
};
</script>

<style lang="scss" scoped>
.seamless-warp2 {
  font-size: 16px;
  font-weight: 600;
  height: 50px;
  overflow: hidden;
  max-width: 80%;
  margin-bottom: 35px;
  margin-left: 40px;

  .item {
    display: flex;
    min-width: 480px;
    li {
      color: #cc3333;
      list-style: none;
      margin-right: 200px;
      white-space: nowrap;
      font-family: "Times New Roman", Georgia, Serif;
    }
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.box {
  width: 942px;
  margin: auto;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.vs-div {
  background: url("./../assets/image/bg_index.jpg");
  background-size: 100% 100%;

  background-repeat: no-repeat;
}
.dashboard-editor-container{
  .titles{ 
      margin: 0 auto 40px auto;
      text-align: center;
      color: #000;
  }
}
</style>
