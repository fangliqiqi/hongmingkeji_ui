<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-row
      type="flex"
      class="row-bg"
      justify="space-around"
      style="margin-bottom:80px"
    >
      <el-col :span="4"
        ><div class="boxa">
          <div class="top" style="color:red">资源总数</div>
          <div class="bottom" style="color:blue">{{ zongTotal }}</div>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="boxa">
          <div class="top">月新增资源数</div>
          <div class="bottom">{{ monthTotal }}</div>
        </div></el-col
      >

      <el-col :span="4"
        ><div class="boxa">
          <div class="top">周新增资源数</div>
          <div class="bottom">{{weekTotal }}</div>
        </div></el-col
      >
      <el-col :span="4"
        ><div class="boxa">
          <div class="top">月无效数</div>
          <div class="bottom">{{ invalidTotal }}</div>
        </div></el-col
      >
    </el-row>

    <el-row :gutter="24" style="margin-bottom:80px">
      <!-- 网络资源数据展示 -->
      <el-col :span="10" class="box">
        <div style="text-align:center;font-weight:800; font-size: 18px;">
         网络资源数据展示
        </div>

        <!-- 年月日选择
        <div class="aaa">
       
          <div class="year">
            <div class="yearChild">
              <span>年</span>
              <div></div>
              <span>月</span>
            </div>
            <div v-for="item in Time" :key="item.id">
              <span
                class="itemYears"
                ref="itemYear"
                @click="getHezuoYear(item)"
                :class="{ bgColor: hezuoYear == item }"
                >{{ item + "年" }}</span
              >
            </div>
          </div>
       
          <div class="month">
            <span
              v-for="item in 12"
              :key="item.id"
              @click="getHezuoMonth(item)"
              :class="{ bgColor: hezuoMonth == item }"
              >{{ item + "月" }}</span
            >
          </div>
        </div> -->

        <el-table
          class="zhaoshang"
          style="width: 100%"
          maxHeight="300"
          border
         
           show-summary
          :header-cell-style="{
            background: 'rgba(27,63,202, 0.5)',
            color: '#fff',
            textAlign: 'center'
          }"
          :data="Consumption"
        >
          <el-table-column prop="businessName" label="招商专员"> </el-table-column>
          <el-table-column prop="total" label="资源总数">
          </el-table-column>
          <el-table-column prop="monthTotal" label="月总数"> </el-table-column>
          <el-table-column prop="weekTotal" label="周总数"> </el-table-column>
          <el-table-column prop="dayTotal" label="日总数"> </el-table-column>
        </el-table>
      </el-col>

      <!-- 招商业绩数据展示 -->

      <el-col :span="10" class="box" style="margin-left:120px">
        <div style="text-align:center;font-weight:800; font-size: 18px;">
          资源数据明细表
        </div>

        <!-- 年月日选择
        <div>
      
          <div class="year">
            <div class="yearChild">
              <span>年</span>
              <div></div>
              <span>月</span>
            </div>
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
         
          <div class="month">
            <span
              v-for="item in 12"
              :key="item.id"
              @click="getMonth(item)"
              :class="{ bgColor: Month == item }"
              >{{ item + "月" }}</span
            >
          </div>
        </div> -->

        <el-table
          show-summary
          style="width: 100%"
          border
          maxHeight="300"
          class="zhaoshang"
          :data="investmentCount"
          :header-cell-style="{
            background: 'rgba(27,63,202, 0.5)',
            color: '#fff',
            textAlign: 'center'
          }"
        >
          <el-table-column prop="cateTypeLv" :formatter="cateTypeLvFormat" label="数据类型" align="center"/>
          <el-table-column prop="total" label="资源总数" align="center"/>
          <el-table-column prop="monthTotal" label="月总数" align="center"/>
          <el-table-column prop="weekTotal" label="周总数" align="center"/>
          <el-table-column prop="dayTotal" label="日总数" align="center"/>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:400px;margin-bottom:350px">
      <el-col class="box"  :span="10" style="margin-right:150px">
    <!-- 堆叠柱状图 -->
    <echarts-customer-count-show-1></echarts-customer-count-show-1>
      </el-col>

      <el-col class="box" :span="10">
        <!-- 折线图 -->
  <echarts-customer-count-show-2 ></echarts-customer-count-show-2>
      </el-col>
    </el-row>

<el-row  style="margin-bottom:260px">
  <!-- 堆叠柱状图 -->
  <el-col class="box" :span="10" style="margin-right:150px">
  <echarts-customer-count-show-3 ></echarts-customer-count-show-3>
  </el-col>
   <el-col class="box" :span="10">
        <!-- 折线图 -->
  <!-- <echarts-customer-count-show-4 ></echarts-customer-count-show-4> -->
  <div style="text-align:center;font-weight:800; font-size: 18px;">
         网络资源数据展示
        </div>

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
        <el-table
         class="zhaoshang"
          style="width: 100%"
          maxHeight="300"
          border
           show-summary
          :header-cell-style="{
            background: 'rgba(27,63,202, 0.5)',
            color: '#fff',
            textAlign: 'center'
          }"
          :data="Consumption">
          <el-table-column prop="businessName" label="招商专员"> </el-table-column>
          <el-table-column prop="total" label="资源总数">
          </el-table-column>
          <el-table-column prop="monthTotal" label="月总数"> </el-table-column>
          <el-table-column prop="weekTotal" label="周总数"> </el-table-column>
          <el-table-column prop="monthValidTotal" label="月有效数"> </el-table-column>
        </el-table>

      </el-col>
</el-row>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
// import {
//   listCustomerCount,
//   CustomerCountNumber,
//   Consumption,
//   investmentCount
// } from "@/api/share/customerCount";
import {
 customerCount,
 resourceShow,
 resourceDetail,
 getYears
} from "@/api/share/customerCountShow";
import LogoVue from "../../../layout/components/Sidebar/Logo.vue";
import EchartsCustomerCountShow1 from "../../../components/EchartsCustomerCountShow1/EchartsCustomerCountShow1";
import EchartsCustomerCountShow2 from '../../../components/EchartsCustomerCountShow2/EchartsCustomerCountShow2';
import EchartsCustomerCountShow3 from '../../../components/EchartsCustomerCountShow3/EchartsCustomerCountShow3';
import EchartsCustomerCountShow4 from '../../../components/EchartsCustomerCountShow4/EchartsCustomerCountShow4';
 

export default {
  components: { EchartsCustomerCountShow1,EchartsCustomerCountShow2,EchartsCustomerCountShow3,EchartsCustomerCountShow4, },
  name: "CustomerCount",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 客户资源分配表格数据
      customerCountList: [],
      // 弹出层标题
      title: "",
      //年月
      Time: [],
      //合作商消费比
      proportionTotal: [],
      //资源数
      zongTotal: null,
      //月新增总数
      monthTotal: null,
      //无效数
      invalidTotal:null,

      //总成交额
      priceMonthTotal: null,
      //周资源数
     weekTotal: null,

      // 是否显示弹出层
      open: false,
      counts:[],
      count: null,
      nowCount: null,
      //招商传给后台的年份
      Year: [],
      //招商传给后台的月份
      Month: [],
      //合作商续费年份
      hezuoYear: [],
      //合作商续费月份
      hezuoMonth: [],
      monthValidTotal:null,
      cateTypeLvOptions:[],
      
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerName: null,
        customerNewname: null,
        customerPhone: null,
        customerPhoneone: null,
        categoryText: null,
        customerSource: null,
        prov: null,
        city: null,
        county: null,
        userId: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        dealState: null,
        customerQq: null,
        customerWeixin: null
      },
      //网络资源

      Consumption: [],
      //招商业绩数据
      investmentCount: [],

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        customerSource: [
          { required: true, message: "客户来源不能为空", trigger: "blur" }
        ],
        prov: [{ required: true, message: "省不能为空", trigger: "blur" }],
        city: [{ required: true, message: "市不能为空", trigger: "blur" }],
        receiveTime: [
          {
            required: true,
            message: "代理商接收信息时间不能为空",
            trigger: "blur"
          }
        ],
        agentState: [
          {
            required: true,
            message: "代理商确认信息的有效状态 10有效 20无效不能为空",
            trigger: "blur"
          }
        ],
        returnState: [
          {
            required: true,
            message: "回访专员确认信息有效状态 10有效 20无效 0待审核不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    
    this.getDicts("category_type").then(response => {
      this.cateTypeLvOptions = response.data;
      this.getList();
    }).catch(err=>{
      this.getList();
    });
  },
  methods: {
    /** 查询合作商资源分配列表 */
    getList() {
      //首行资源
      customerCount().then(response => {
        this.invalidTotal = response.data.invalidTotal;
        this.monthTotal = response.data.monthTotal;
        this.zongTotal = response.data.total;
        this.weekTotal = response.data.weekTotal;
        this.monthValidTotal = response.data.monthValidTotal
        
      })
      getYears().then(response =>{
     this.Time=response.data.years
    }),
      //网络资源展示
      resourceShow().then(response=>{
        // console.log(response.data.resourceShow);
        this.Consumption=response.data.resourceShow
      })

      //资源数据明细表
      resourceDetail().then(response=>{
 this.investmentCount=response.data.sourceTypeTotal
      })
    },
    //商机类型
     cateTypeLvFormat(row, column) {
      //  console.info(arguments)
      return this.selectDictLabel(this.cateTypeLvOptions, row.cateTypeLv);
    },
    //表单合成
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let countNum = row.countNum;

      //  console.log(countNum);
      if (columnIndex === 0) {
        if (countNum - row.count - rowIndex === 0) {
          return {
            rowspan: row.count,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }

      if (columnIndex === 2) {
        if (countNum - row.count - rowIndex === 0) {
          return {
            rowspan: row.count,
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
    // //合作商续费年份
    // getHezuoYear(item, index) {
    //   if (this.hezuoYear.length == 0) {
    //     this.hezuoYear.push(item);
    //   } else {
    //     this.hezuoYear = [];
    //     this.hezuoYear.push(item);
    //   }
    // },

    //合作商续费月份
    // getHezuoMonth(item) {
    //   if (this.hezuoMonth.length == 0) {
    //     this.hezuoMonth.push(item);
    //   } else {
    //     this.hezuoMonth = [];
    //     this.hezuoMonth.push(item);
    //   }
    //   let year = this.hezuoYear;
    //   let month = this.hezuoMonth;
    //   Consumption({ year: year, month: month }).then(response => {
    //     this.Consumption = response.data.consumeCount;
      
        
    //   });
    // },

    
   //点击选择的年份
      getyear(item,index) {
      if (this.Year.length == 0) {
      this.Year.push(item)
      } else {
        this.Year = [];
        this.Year.push(item)
      }
    },
    //点击月份调用接口
    getMonth(item) {
      if (this.Month.length == 0) {
        this.Month.push(item);
      } else {
        this.Month = [];
        this.Month.push(item);
      }
       resourceShow( {year: this.Year.join(""),
        month: this.Month.join("")}).then(response=>{
        // console.log(response.data.resourceShow);
        this.Consumption=response.data.resourceShow
        
      })
      },
   
    // //招商业绩点击选择的月份
    // getMonth(item) {
    //   //  console.log(item);
    //   if (this.Month.length == 0) {
    //     this.Month.push(item);
    //   } else {
    //     this.Month = [];
    //     this.Month.push(item);
    //   }
    //   let year = this.Year;
    //   let month = this.Month;
    //   investmentCount({ year: year.join(""), month: month.join("") }).then(
    //     response => {
    //       this.Time = response.data.year;
    //       // console.log(this.Time);

    //       let tempArr = [];
    //       let countNum = 0;

    //       response.data.investmentCount.forEach(item => {
    //         countNum += item.companyPrice.length;
    //         // console.log(countNum);
    //         item.companyPrice.forEach(value => {
    //           let number = {
    //             countNum: countNum,
    //             userName: item.userName,
    //             count: item.count,
    //             companyName: value.companyName,
    //             createTime: value.createTime,
    //             totalAmount: value.totalAmount
    //           };
    //           tempArr.push(number);
    //         });
    //         this.investmentCount = tempArr;
    //         //console.log(this.investmentCount);
    //       });
    //     }
    //   );
    //   this.investmentCount = [];
    // },
    //合作商消费比合计 ！！！！
  //  getSummaries(param) {
  //       const { columns, data } = param;
  //       const sums = [];
  //       columns.forEach((column, index) => {
  //         if (index === 0) {
  //           sums[index] = '合计';
  //           return;
  //         }
  //         // console.log('00000');
  //         // console.log(this.proportionTotal);
  //         if (index === 4) {
  //           sums[index] = this.proportionTotal;
  //           return;
  //         }
  //         const values = data.map(item => Number(item[column.property]));
  //         if (!values.every(value => isNaN(value))) {
  //           sums[index] = values.reduce((prev, curr) => {
  //             const value = Number(curr);
  //             if (!isNaN(value)) {
  //               return prev + curr;
  //             } else {
  //               return prev;
  //             }
  //           }, 0);
  //           sums[index] += ' 元';
  //         } else {
  //           sums[index] = 'N/A';
  //         }
  //       });

  //       return sums;
     
  //   },

// 是否成交10 成交 0 未成交字典翻译
    dealStateFormat(row, column) {
      return this.selectDictLabel(this.dealStateOptions, row.dealState);
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        customerName: null,
        customerNewname: null,
        customerPhone: null,
        customerPhoneone: null,
        categoryText: null,
        customerSource: null,
        prov: null,
        city: null,
        county: null,
        userId: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        dealState: null,
        customerQq: null,
        customerWeixin: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加客户资源分配";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCustomerCount(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改客户资源分配";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCustomerCount(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCustomerCount(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除客户资源分配编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delCustomerCount(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有客户资源分配数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportCustomerCount(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
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
.boxa {
  /* min-width:120px ; */
  min-height: 100px;
  border: 1px solid #ccc;
  text-align: center;
}
.top {
  width: 100px;
  height: 44px;
  background-color: rgba(233, 233, 233);
  /* color: red; */
  margin-bottom: 12px;
  line-height: 44px;
  border: 1px solid #ccc;
  border-top: 0px;
  border-left: 0px;
}
.bottom {
  margin: auto;
  width: 100px;
  height: 44px;
  background-color: rgba(233, 233, 233);
  /* color: blue; */
  line-height: 44px;
  border: 1px solid #ccc;
  border-bottom: 0px;
}
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
  top: 46px;
  left: 50px;
  border: 1px solid #000;
}
.bgColor {
  background-color: skyblue;
}
</style>
