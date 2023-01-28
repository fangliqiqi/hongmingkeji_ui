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
          <div class="top" style="color:red">合作商总数</div>
          <div class="bottom" style="color:blue">{{ companyTotal }}</div>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="boxa">
          <div class="top">月新增总数</div>
          <div class="bottom">{{ companyMonthTotal }}</div>
        </div></el-col
      >

      <el-col :span="4"
        ><div class="boxa">
          <div class="top">月总成交额</div>
          <div class="bottom">{{ priceTotal }}</div>
        </div></el-col
      >
      <el-col :span="4"
        ><div class="boxa">
          <div class="top">月总续费额</div>
          <div class="bottom">{{ priceMonthTotal }}</div>
        </div></el-col
      >
    </el-row>

    <el-row :gutter="24" style="margin-bottom:480px">
      <!-- 合作商续费 -->
      <el-col :span="10" class="box">
        <div style="text-align:center;font-weight:800; font-size: 18px;">
          合作商续费与消费分析报告
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
          :summary-method="getSummaries"
          show-summary
          :header-cell-style="{
            background: 'rgba(27,63,202, 0.5)',
            color: '#fff',
            textAlign: 'center'
          }"
          :data="Consumption"
        >
          <el-table-column prop="companyName" label="合作商"> </el-table-column>
          <el-table-column prop="monthPrice" label="月初余额">
          </el-table-column>
          <el-table-column prop="renew" label="续费金额"> </el-table-column>
          <el-table-column prop="consume" label="消费金额"> </el-table-column>
          <el-table-column prop="proportion" label="消费比"> </el-table-column>
        </el-table>
      </el-col>

      <!-- 招商业绩数据展示 -->

      <el-col :span="10" class="box" style="margin-left:120px">
        <div style="text-align:center;font-weight:800; font-size: 18px;">
          招商业绩数据展示
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
          :span-method="objectSpanMethod"
          show-summary
          :summary-method="getZhaoSummaries"
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
          <el-table-column prop="userName" label="招商专员" align="center">
          </el-table-column>
          <el-table-column prop="companyName" label="合作商名称" align="center">
          </el-table-column>
          <el-table-column prop="count" label="合作商数" align="center">
          </el-table-column>
          <el-table-column prop="totalAmount" label="充值金额" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="时间" align="center">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom:150px">
      <el-col class="box" :span="10" style="margin-right:150px">
        <!-- 横向柱状图 -->
        <echarts-customer-count-1></echarts-customer-count-1>
      </el-col>

      <el-col class="box" :span="10">
        <!-- 象形柱图 -->
        <echarts-customer-count-2></echarts-customer-count-2>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:200px" :gutter="20">
      <!--饼状图 -->
        <echarts-customer-count-3></echarts-customer-count-3>
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
import {
  listCustomerCount,
  CustomerCountNumber,
  Consumption,
  investmentCount
} from "@/api/share/customerCount";
import LogoVue from "../../../layout/components/Sidebar/Logo.vue";
import EchartsCustomerCount1 from "../../../components/EchartsCustomerCount1/EchartsCustomerCount1";
import EchartsCustomerCount2 from "../../../components/EchartsCustomerCount2/EchartsCustomerCount2";
import EchartsCustomerCount3 from "../../../components/EchartsCustomerCount3/EchartsCustomerCount3";

export default {
  components: {
    EchartsCustomerCount1,
    EchartsCustomerCount2,
    EchartsCustomerCount3
  },
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
      //合作商总数
      companyMonthTotal: null,
      //月新增总数
      companyTotal: null,
      //总成交额
      priceMonthTotal: null,
      //本月续费金额
      priceTotal: null,

      // 是否显示弹出层
      open: false,
      counts: [],
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
      //合作商消费续费数据
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
    this.getList();
  },
  methods: {
    /** 查询合作商资源分配列表 */
    getList() {
      // this.loading = true;
      // listCustomerCount(this.queryParams).then(response => {
      //   this.customerCountList = response.rows;
      //   this.count = response.data.total;
      //   this.nowCount = response.data.nowTotal;

      //   this.total = response.total;
      //   this.loading = false;
      // });

      //首行合作商、新增总数、总成交额、续费总额
      CustomerCountNumber().then(response => {
        this.companyMonthTotal = response.data.companyMonthTotal;
        this.companyTotal = response.data.companyTotal;
        this.priceMonthTotal = response.data.priceMonthTotal;
        this.priceTotal = response.data.priceTotal;
      });

      //合作商续费消费数据
      Consumption().then(response => {
        this.Consumption = response.data.consumeCount;
        this.proportionTotal = response.data.proportionTotal;
      });

      //招商业绩数据展示
      investmentCount().then(response => {
        this.Time = response.data.year;
        this.counts = response.data.companyTotal;

        let tempArr = [];
        let countNum = 0;

        response.data.investmentCount.forEach(item => {
          countNum += item.companyPrice.length;
          item.companyPrice.forEach(value => {
            let number = {
              countNum: countNum,
              userName: item.userName,
              count: item.count,
              companyName: value.companyName,
              createTime: value.createTime,
              totalAmount: value.totalAmount
            };
            tempArr.push(number);
          });
          this.investmentCount = tempArr;
        });
      });
    },
    //表单合成
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let countNum = row.countNum;

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
    getHezuoMonth(item) {
      if (this.hezuoMonth.length == 0) {
        this.hezuoMonth.push(item);
      } else {
        this.hezuoMonth = [];
        this.hezuoMonth.push(item);
      }
      let year = this.hezuoYear;
      let month = this.hezuoMonth;
      Consumption({ year: year, month: month }).then(response => {
        this.Consumption = response.data.consumeCount;
      });
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
    //招商业绩点击选择的月份
    getMonth(item) {
      if (this.Month.length == 0) {
        this.Month.push(item);
      } else {
        this.Month = [];
        this.Month.push(item);
      }
      let year = this.Year;
      let month = this.Month;
      investmentCount({ year: year.join(""), month: month.join("") }).then(
        response => {
          this.Time = response.data.year;
          let tempArr = [];
          let countNum = 0;

          response.data.investmentCount.forEach(item => {
            countNum += item.companyPrice.length;
            item.companyPrice.forEach(value => {
              let number = {
                countNum: countNum,
                userName: item.userName,
                count: item.count,
                companyName: value.companyName,
                createTime: value.createTime,
                totalAmount: value.totalAmount
              };
              tempArr.push(number);
            });
            this.investmentCount = tempArr;
          });
        }
      );
      this.investmentCount = [];
    },
    //合作商消费比合计 ！！！！
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 4) {
          sums[index] = this.proportionTotal;
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },

    //招商业绩数据展示合计
    getZhaoSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }

        if (index === 2) {
          sums[index] = this.counts;
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
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
    // handleQuery() {
    //   this.queryParams.pageNum = 1;
    //   this.getList();
    // },
    /** 重置按钮操作 */
    // resetQuery() {
    //   this.resetForm("queryForm");
    //   this.handleQuery();
    // },
    // 多选框选中数据
    // handleSelectionChange(selection) {
    //   this.ids = selection.map(item => item.id);
    //   this.single = selection.length !== 1;
    //   this.multiple = !selection.length;
    // },
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加客户资源分配";
    // },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const id = row.id || this.ids;
    //   getCustomerCount(id).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改客户资源分配";
    //   });
    // },
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
  text-align: center;
  border: 1px solid #000;
  border-bottom: 0px;
}
.month > span:last-child {
  border-bottom: 1px solid #000;
}
.year {
  display: flex;
}
.yearChild {
  display: flex;
  width: 50px;
  border: 1px solid #000;
  border-bottom: 0;
}
.yearChild {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 50px;
}
.yearChild > div {
  width: 70px;
  height: 1px;
  transform-origin: center;
  position: absolute;
  top: 24px;
  left: -10px;
  transform: rotate(45deg);
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
.yearChild > span:last-child {
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
  border-left: 0px;
  height: 24px;
  display: flex;
  line-height: 24px;
}
.zhaoshang {
  position: absolute;
  top: 44px;
  left: 50px;
  border: 1px solid #000;
}
.bgColor {
  background-color: skyblue;
}
</style>
