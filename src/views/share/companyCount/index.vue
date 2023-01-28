<template>
  <div class="app-container" style="margin-top:50px;">
   
    <el-row type="flex" class="row-bg" justify="space-around" style="margin-bottom:100px;">
      <el-col :span="6"
        ><div class="box">
          <div class="top" style="color:red">月资源数</div>
          <div class="bottom" style="color: blue;">{{sourceMonthTotal}}</div></div
      ></el-col>
      <el-col :span="6"
        ><div class="box">
          <div class="top">月成交数</div>
          <div class="bottom">{{monthSuccess}}</div></div
      ></el-col>

      <el-col :span="6"
        ><div class="box">
          <div class="top">月消费额</div>
          <div class="bottom">{{monthConsume}}</div></div
      ></el-col>
    </el-row>

    <el-row style="margin-bottom:100px">
      <echarts-company-count-1></echarts-company-count-1>
    </el-row>

     <el-row :gutter="24" style="margin-bottom:100px">
       <el-col :span="12">
      <echarts-company-count-2 ></echarts-company-count-2>
       </el-col>
      <el-col :span="12">
<echarts-company-count-3 ></echarts-company-count-3>
      </el-col>
    </el-row>

    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
  </div>
</template>

<script>
import { listCompanyCount,monthlyCount,monthConsumption,monthlyCost } from "@/api/share/companyCount";
import EchartsCompanyCount1 from '../../../components/EchartsCompanyCount1/EchartsCompanyCount1.vue';
import EchartsCompanyCount2 from '../../../components/EchartsCompanyCount2/EchartsCompanyCount2'
import EchartsCompanyCount3 from '../../../components/EchartsCompanyCount3/EchartsCompanyCount3'
import { mapState } from "vuex";

export default {
  components: { EchartsCompanyCount1 ,EchartsCompanyCount2,EchartsCompanyCount3},
  name: "CompanyCount",
  data() {
    return {
     
      //月消费额
      monthConsume:null,
      //月资源数
      sourceMonthTotal:null,
      //月成交数
      monthSuccess:null,
      // companyTotal: {
        // companytotal:null,
        // companymonth:null,
        // companyday:null
      // },
      // 查询参数
      // queryParams: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   companyName: null,
      //   businessLicenseUrl: null,
      //   legalPersonIdcardFrontUrl: null,
      //   legalPersonIdcardBackUrl: null,
      //   chargePersonName: null,
      //   chargePersonPhone: null,
      //   nickName: null
      // },
      // 表单参数
      // form: {},
      // 当前页面默认为隐藏
      // sourceOpen: false,
      // 表单校验
      // rules: {}
    };
  },
  created() {
    this.getList();
  },
   computed: {
   
    ...mapState({
      userInfo: state => state.user
    })
  },
  methods: {
    /** 查询合作商统计列表 */
    getList() {
      let roles = this.userInfo.roles;
       if( roles.indexOf("admin") != -1 ||
      roles.indexOf("boss") != -1 
      ){
          let companyId = 6
      monthConsumption({companyId:companyId}).then(response=>{
        this.monthConsume = response.data.monthConsume
        this.monthSuccess= response.data.monthSuccess
        this. sourceMonthTotal=response.data. sourceMonthTotal 
        })
      }else{
         monthConsumption().then(response=>{
        this.monthConsume = response.data.monthConsume
        this.monthSuccess= response.data.monthSuccess
        this. sourceMonthTotal=response.data. sourceMonthTotal 
        })
      }
    },
   

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    // reset() {
    //   this.form = {
    //     id: null,
    //     companyName: null,
    //     businessLicenseUrl: null,
    //     legalPersonIdcardFrontUrl: null,
    //     legalPersonIdcardBackUrl: null,
    //     chargePersonName: null,
    //     chargePersonPhone: null,
    //     remark: null
    //   };
    //   this.resetForm("form");
    // },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 导出按钮操作 */
    showTable() {
      this.sourceOpen = true;
    }
  }
};
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.box {
  /* min-width:120px ; */
  min-height: 100px;
  border: 1px solid #ccc;
  text-align: center;
  
}
.top {
  width: 100px;
  height: 44px;
  background-color:rgba(233,233,233) ;

  margin-bottom: 12px;
  line-height: 44px;
   border: 1px solid #ccc;
   border-top:0px;
   border-left:0px;
}
.bottom {
  margin: auto;
  width: 100px;
  height: 44px;
  background-color: rgba(233,233,233);
  color: blue;
  line-height: 44px;
  border: 1px solid #ccc;
  border-bottom: 0px;
}
</style>
