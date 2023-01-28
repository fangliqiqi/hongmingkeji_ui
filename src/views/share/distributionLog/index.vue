<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!--<el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上级ID" prop="pid">
        <el-input
          v-model="queryParams.pid"
          placeholder="请输入上级ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分佣比例(0-100)" prop="commissionProportion">
        <el-input
          v-model="queryParams.commissionProportion"
          placeholder="请输入分佣比例(0-100)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="订单来源" prop="orderSource">
        <el-select v-model="queryParams.orderSource" placeholder="请选择订单来源" clearable size="small">
          <el-option
            v-for="dict in orderSourceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单ID" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="订单总额" prop="orderAmount">
        <el-input
          v-model="queryParams.orderAmount"
          placeholder="请输入订单总额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分佣金额" prop="commission">
        <el-input
          v-model="queryParams.commission"
          placeholder="请输入分佣金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="订单创建时间" prop="orderCreateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.orderCreateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择订单创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单完成时间" prop="orderFinishTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.orderFinishTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择订单完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分佣时间" prop="commissionTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.commissionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择分佣时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="可提现时间" prop="canWithdrawTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.canWithdrawTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择可提现时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:distributionLog:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:distributionLog:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:distributionLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:distributionLog:export']"
        >导出</el-button>
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

    <el-table v-loading="loading" :data="distributionLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="角色ID" align="center" prop="roleId" />
      <el-table-column label="上级ID" align="center" prop="pid" />
      <el-table-column label="上级角色ID" align="center" prop="rolePid" />
      <el-table-column label="分佣比例(0-100)" align="center" prop="commissionProportion" />
      <el-table-column label="订单来源:1crm,2莫的问题小程序,3商城" align="center" prop="orderSource" :formatter="orderSourceFormat" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="订单总额" align="center" prop="orderAmount" />
      <el-table-column label="分佣金额" align="center" prop="commission" />
      <el-table-column label="订单创建时间" align="center" prop="orderCreateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderCreateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单完成时间" align="center" prop="orderFinishTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderFinishTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分佣时间" align="center" prop="commissionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.commissionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可提现时间" align="center" prop="canWithdrawTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.canWithdrawTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:distributionLog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:distributionLog:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改分佣记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="角色ID" prop="roleId">
          <el-input v-model="form.roleId" placeholder="请输入角色ID" />
        </el-form-item>
        <el-form-item label="上级ID" prop="pid">
          <el-input v-model="form.pid" placeholder="请输入上级ID" />
        </el-form-item>
        <el-form-item label="上级角色ID" prop="rolePid">
          <el-input v-model="form.rolePid" placeholder="请输入上级角色ID" />
        </el-form-item>
        <el-form-item label="分佣比例(0-100)" prop="commissionProportion">
          <el-input v-model="form.commissionProportion" placeholder="请输入分佣比例(0-100)" />
        </el-form-item>
        <el-form-item label="订单来源:1crm,2莫的问题小程序,3商城">
          <el-select v-model="form.orderSource" placeholder="请选择订单来源:1crm,2莫的问题小程序,3商城">
            <el-option
              v-for="dict in orderSourceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单总额" prop="orderAmount">
          <el-input v-model="form.orderAmount" placeholder="请输入订单总额" />
        </el-form-item>
        <el-form-item label="分佣金额" prop="commission">
          <el-input v-model="form.commission" placeholder="请输入分佣金额" />
        </el-form-item>
        <el-form-item label="订单创建时间" prop="orderCreateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.orderCreateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择订单创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单完成时间" prop="orderFinishTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.orderFinishTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择订单完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分佣时间" prop="commissionTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.commissionTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择分佣时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可提现时间" prop="canWithdrawTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.canWithdrawTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择可提现时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDistributionLog, getDistributionLog, delDistributionLog, addDistributionLog, updateDistributionLog, exportDistributionLog } from "@/api/share/distributionLog";

export default {
  name: "DistributionLog",
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
      // 分佣记录表格数据
      distributionLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 订单来源:1crm,2莫的问题小程序,3商城字典
      orderSourceOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        userId: null,
        roleId: null,
        pid: null,
        rolePid: null,
        commissionProportion: null,
        orderSource: null,
        orderId: null,
        orderAmount: null,
        commission: null,
        orderCreateTime: null,
        orderFinishTime: null,
        commissionTime: null,
        canWithdrawTime: null
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
    this.getDicts("order_source").then(response => {
      this.orderSourceOptions = response.data;
    });
  },
  methods: {
    /** 查询分佣记录列表 */
    getList() {
      this.loading = true;
      listDistributionLog(this.queryParams).then(response => {
        this.distributionLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 订单来源:1crm,2莫的问题小程序,3商城字典翻译
    orderSourceFormat(row, column) {
      return this.selectDictLabel(this.orderSourceOptions, row.orderSource);
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
        userId: null,
        roleId: null,
        pid: null,
        rolePid: null,
        commissionProportion: null,
        orderSource: null,
        orderId: null,
        orderAmount: null,
        commission: null,
        orderCreateTime: null,
        orderFinishTime: null,
        commissionTime: null,
        canWithdrawTime: null
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
      this.title = "添加分佣记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDistributionLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分佣记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDistributionLog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDistributionLog(this.form).then(response => {
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
      this.$confirm('是否确认删除分佣记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDistributionLog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有分佣记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDistributionLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
