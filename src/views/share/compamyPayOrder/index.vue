<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
           <el-form-item label="订单编号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充值金额" prop="totalAmount">
        <el-input
          v-model="queryParams.totalAmount"
          placeholder="请输入充值金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
   <!--   <el-form-item label="付款方式" prop="paymentMethod">
        <el-select v-model="queryParams.paymentMethod" placeholder="请选择付款的方式" clearable size="small">
          <el-option
            v-for="dict in paymentMethodOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
          <el-form-item label="支入支出" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择支入支出" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付款时间" prop="paymentDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.paymentDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择付款时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="queryParams.orderState" placeholder="请选择订单状态" clearable size="small">
          <el-option
            v-for="dict in orderStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="商机类目表id" prop="sourceTypeId">
        <el-input
          v-model="queryParams.sourceTypeId"
          placeholder="请输入商机类目表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
     <!-- <el-form-item label="资源ID" prop="customerSourceId">
        <el-input
          v-model="queryParams.customerSourceId"
          placeholder="请输入资源分配id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">

      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:compamyPayOrder:export']"
        >导出</el-button>
      </el-col> -->

      <el-col v-for="item of categoryTypeAmount" :key="item.id" :span="4" :offset="1">
        <div >
          <span style="color: #00afff;font-size: 14px;">{{item.categoryType}}:</span>
          <span style="color: #48D1CC;margin-left: 8px;font-weight: bold;">{{item.expendAmount||0}}</span>
        </div>
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="compamyPayOrderList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="主键id" align="center" prop="id" />-->
<!--      <el-table-column label="钱包表id" align="center" prop="walletId" />-->
      <el-table-column label="订单编号" align="center" prop="orderNo" min-width="200"/>
      <el-table-column label="赠送金额" align="center" prop="givenAmount" min-width="120"/>
      <el-table-column label="支出金额" align="center" prop="expendAmount" min-width="120"/>
      <el-table-column label="充值金额" align="center" prop="totalAmount" min-width="120"/>
      <el-table-column label="付款的方式" align="center" prop="paymentMethod" :formatter="paymentMethodFormat" min-width="120"/>
      <el-table-column label="钱包实时余额" align="center" prop="amount" min-width="120"/>
      <el-table-column label="支入支出" align="center" prop="type" :formatter="typeFormat" min-width="120"/>
      <el-table-column label="付款时间" align="center" prop="paymentDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="orderState" :formatter="orderStateFormat" min-width="120"/>
<!--      <el-table-column label="入账时间" align="center" prop="creditTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.creditTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="是否需要开票 0 否  10是" align="center" prop="invoicFlag" :formatter="invoicFlagFormat" />-->
<!--      <el-table-column label="代理商公司" align="center" prop="companyId" min-width="120"/>-->
      <el-table-column label="商机类目" align="center" prop="categoryType" min-width="120"/>
      <el-table-column label="我的资源id" align="center" prop="customerSourceId" min-width="120"/>
<!--      <el-table-column label="创建时间" align="center" prop="createDate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="备注信息" align="center" prop="remarks" min-width="220"/>-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['share:compamyPayOrder:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['share:compamyPayOrder:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listCompamyPayOrder, getCompamyPayOrder, delCompamyPayOrder, addCompamyPayOrder, updateCompamyPayOrder, exportCompamyPayOrder,getCategoryTypeAmount } from "@/api/share/compamyPayOrder";

export default {
  name: "CompamyPayOrder",
  data() {
    return {
      userInfo:this.$store.state.user,
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
      // 出入账记录表格数据
      compamyPayOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 付款的方式字典
      paymentMethodOptions: [],
      // 支入支出( -1支出  1 支入 2 退费)字典
      typeOptions: [],
      // 订单状态(0已创建，1支付中，2支付成功，3支付 失败)字典
      orderStateOptions: [],
      // 是否需要开票 0 否  10是字典
      invoicFlagOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        walletId: null,
        orderNo: null,
        givenAmount: null,
        expendAmount: null,
        totalAmount: null,
        paymentMethod: null,
        amount: null,
        type: null,
        paymentDate: null,
        orderState: null,
        creditTime: null,
        invoicFlag: null,
        companyId: null,
        sourceTypeId: null,
        customerSourceId: null,
        createDate: null,
        updateDate: null,
        remarks: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        paymentMethod: [
          { required: true, message: "付款的方式（0.微信，1.支付宝，2.对公转账，3.其他）不能为空", trigger: "blur" }
        ],
      },
      categoryTypeAmount:null
    };
  },
  created() {
    this.getList();
    this.getDicts("payment_method").then(response => {
      this.paymentMethodOptions = response.data;
    });
    this.getDicts("pay_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("pay_order_state").then(response => {
      this.orderStateOptions = response.data;
    });
    this.getDicts("invoic_flag").then(response => {
      this.invoicFlagOptions = response.data;
    });
  },
  watch:{

  },
  methods: {
    /** 查询出入账记录列表 */
    getList() {
      this.loading = true;
      listCompamyPayOrder(this.queryParams).then(response => {
        this.compamyPayOrderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      let comId = this.userInfo.companyId;
      getCategoryTypeAmount({companyId:comId}).then(response => {
        // console.info(response)
        this.categoryTypeAmount = response.data;
      });
    },
    // 付款的方式字典翻译
    paymentMethodFormat(row, column) {
      return this.selectDictLabel(this.paymentMethodOptions, row.paymentMethod);
    },
    // 支入支出( -1支出  1 支入 2 退费)字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 订单状态(0已创建，1支付中，2支付成功，3支付 失败)字典翻译
    orderStateFormat(row, column) {
      return this.selectDictLabel(this.orderStateOptions, row.orderState);
    },
    // 是否需要开票 0 否  10是字典翻译
    invoicFlagFormat(row, column) {
      return this.selectDictLabel(this.invoicFlagOptions, row.invoicFlag);
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
        walletId: null,
        orderNo: null,
        givenAmount: null,
        expendAmount: null,
        totalAmount: null,
        paymentMethod: null,
        amount: null,
        type: null,
        paymentDate: null,
        orderState: null,
        creditTime: null,
        invoicFlag: null,
        companyId: null,
        sourceTypeId: null,
        customerSourceId: null,
        createDate: null,
        createBy: null,
        updateDate: null,
        updateBy: null,
        remarks: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加出入账记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompamyPayOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出入账记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompamyPayOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCompamyPayOrder(this.form).then(response => {
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
      this.$confirm('是否确认删除出入账记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCompamyPayOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
  //   handleExport() {
  //     const queryParams = this.queryParams;
  //     this.$confirm('是否确认导出所有出入账记录数据项?', "警告", {
  //         confirmButtonText: "确定",
  //         cancelButtonText: "取消",
  //         type: "warning"
  //       }).then(function() {
  //         return exportCompamyPayOrder(queryParams);
  //       }).then(response => {
  //         this.download(response.msg);
  //       }).catch(function() {});
  //   }
}
};
</script>
