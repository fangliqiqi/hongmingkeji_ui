<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:companyWallet:export']"
        >导出</el-button>
      </el-col> -->
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="payWalletList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="钱包主键id" align="center" prop="id" />-->
      <el-table-column label="公司名" align="center" prop="companyName" />
      <el-table-column label="账户余额" align="center" prop="amount" />
      <el-table-column label="累计充值金额" align="center" prop="totalAmount" />
<!--      <el-table-column label="累计满赠金额" align="center" prop="givenAmount" />-->
      <el-table-column label="累计消费金额" align="center" prop="expendAmount" />
<!--      <el-table-column label="创建时间" align="center" prop="createDate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>-->
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
  import { listCompanyWallet, addCompanyWallet, updateCompanyWallet, exportCompanyWallet } from "@/api/share/companyWallet";

  export default {
    name: "PayWallet",
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
        // 用户钱包表格数据
        payWalletList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:10,
          companyId: null,
          amount: null,
          createDate: null,
          updateDate: null,
          remarks: null,
          nickName:null,
          companyName:null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询用户钱包列表 */
      getList() {
        this.loading = true;
        listCompanyWallet(this.queryParams).then(response => {
          this.payWalletList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

      // 表单重置
      reset() {
        this.form = {
          id: null,
          companyId: null,
          amount: null,
          createDate: null,
          createBy: null,
          updateDate: null,
          updateBy: null,
          remarks: null,
          nickName:null,
          companyName:null
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
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateCompanyWallet(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addCompanyWallet(this.form).then(response => {
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
      /** 导出按钮操作 */
      // handleExport() {
      //   const queryParams = this.queryParams;
      //   this.$confirm('是否确认导出所有用户钱包数据项?', "警告", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }).then(function() {
      //     return exportCompanyWallet(queryParams);
      //   }).then(response => {
      //     this.download(response.msg);
      //   }).catch(function() {});
      // }
    }
  };
</script>
