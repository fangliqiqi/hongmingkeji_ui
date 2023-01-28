<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="提现申请人" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入提现申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单号" prop="drawOrder">
        <el-input
          v-model="queryParams.drawOrder"
          placeholder="请输入提现订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行卡编号" prop="drawBankId">
        <el-input
          v-model="queryParams.drawBankId"
          placeholder="请输入用户对应的卡的编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现金额" prop="drawRealityTotal">
        <el-input
          v-model="queryParams.drawRealityTotal"
          placeholder="请输入实际提现金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现时间" prop="drawApplyTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.drawApplyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请提现时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提现状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择提现状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="完成时间" prop="drawDealTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.drawDealTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择提现完成时间">
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
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:draw:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:draw:export']"
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

    <el-table v-loading="loading" :data="drawList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="提现申请人" align="center" prop="drawalBank" >
        <template slot-scope="scope">
          <span>{{ scope.row.drawalBank.cname }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="提现订单号" align="center" prop="drawOrder" />-->
      <el-table-column label="银行卡号码" align="center" prop="drawalBank" >
        <template slot-scope="scope">
          <span>{{ scope.row.drawalBank.bankNumber }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="实际提现金额" align="center" prop="drawRealityTotal" />-->
      <el-table-column label="申请提现的金额" align="center" prop="drawApplyTotal" />
      <el-table-column label="申请提现时间" align="center" prop="drawApplyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.drawApplyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="提现完成时间" align="center" prop="drawDealTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.drawDealTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" align="center" prop="remarks" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:draw:edit']"
          >修改</el-button>

          <el-button
            disabled="disabled"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:draw:remove']"
          >删除</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUser(scope.row)"
          >用户余额</el-button>
          <el-button
            size="mini"
            v-if="scope.row.status == 0"
            type="text"
            icon="el-icon-delete"
            @click="handleSuccess(scope.row)"
          >审核通过</el-button>
          <el-button
            size="mini"
            v-if="scope.row.status == 0"
            type="text"
            icon="el-icon-delete"
            @click="handleError(scope.row)"
          >审核不通过</el-button>
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

    <!-- 添加或修改提现信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="提现申请人" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入提现申请人" />
        </el-form-item>-->
        <el-form-item label="提现订单号" prop="drawOrder">
          <el-input v-model="form.drawOrder" placeholder="请输入提现订单号" />
        </el-form-item>
        <el-form-item label="银行卡编号" prop="drawBankId">
          <el-input v-model="form.drawBankId" placeholder="请输入用户的银行卡编号" />
        </el-form-item>
     <!--   <el-form-item label="实际提现金额" prop="drawRealityTotal">
          <el-input v-model="form.drawRealityTotal" placeholder="请输入实际提现金额" />
        </el-form-item>-->
     <!--   <el-form-item label="申请提现的金额" prop="drawApplyTotal">
          <el-input v-model="form.drawApplyTotal" placeholder="请输入申请提现的金额" />
        </el-form-item>-->
      <!--  <el-form-item label="申请提现时间" prop="drawApplyTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.drawApplyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请提现时间">
          </el-date-picker>
        </el-form-item>-->
        <el-form-item label="提现状态">
          <el-select v-model="form.status" placeholder="请选择提现状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现完成时间" prop="drawDealTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.drawDealTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择提现完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户余额-->
    <el-dialog :title="title" :visible.sync="openUser" width="500px" append-to-body>
      <el-form ref="form" :model="formUser" :rules="rules" label-width="80px">
        <el-form-item label="累计佣金" prop="drawOrder" label-width="150px">
          <el-input v-model="formUser.totalCommission" disabled  />
        </el-form-item>
        <el-form-item label="可提现佣金" prop="drawBankId" label-width="150px" >
          <el-input v-model="formUser.canWithdrawCommission"  disabled  />
        </el-form-item>
        <el-form-item label="冻结佣金" prop="remarks" label-width="150px">
          <el-input v-model="formUser.freezeCommission" disabled  />
        </el-form-item>


      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { listDraw, getDraw, delDraw, addDraw, updateDraw, exportDraw,examine ,getUser} from "@/api/share/draw";

export default {
  name: "Draw",
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
      // 提现信息表格数据
      drawList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openUser: false,
      // 提现状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        userId: null,
        drawOrder: null,
        drawBankId: null,
        drawCharge: null,
        drawRealityTotal: null,
        drawApplyTotal: null,
        drawApplyTime: null,
        status: null,
        drawDealTime: null,
        remarks: null
      },
      // 表单参数
      form: {},
      // 表单参数
      formUser: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "提现申请人不能为空", trigger: "blur" }
        ],
        drawOrder: [
          { required: true, message: "提现订单号不能为空", trigger: "blur" }
        ],
        drawBankId: [
          { required: true, message: "用户对应的卡的编号不能为空", trigger: "blur" }
        ],
        drawCharge: [
          { required: true, message: "提现手续费不能为空", trigger: "blur" }
        ],
        drawRealityTotal: [
          { required: true, message: "实际提现金额不能为空", trigger: "blur" }
        ],
        drawApplyTotal: [
          { required: true, message: "申请提现的金额不能为空", trigger: "blur" }
        ],
        drawApplyTime: [
          { required: true, message: "申请提现时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("draw_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询提现信息列表 */
    getList() {
      this.loading = true;
      listDraw(this.queryParams).then(response => {
        this.drawList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 提现状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
        drawOrder: null,
        drawBankId: null,
        drawCharge: null,
        drawRealityTotal: null,
        drawApplyTotal: null,
        drawApplyTime: null,
        status: null,
        drawDealTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
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
      this.title = "添加提现信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDraw(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改提现信息";
      });
    },
    /** 查看用户余额信息操作 */
    handleUser(row) {
      this.reset();
      this.formUser ={
        totalCommission:0,
        canWithdrawCommission:0,
        freezeCommission:0
      }
      const id = row.userId
      getUser(id).then(response => {

        if(response.rows.length > 0){
          console.log(response.rows[0])
          this.formUser = response.rows[0];
        }
        this.openUser = true;
        this.title = "查看用户余额信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDraw(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDraw(this.form).then(response => {
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
      this.$confirm('是否确认删除提现信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDraw(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 审核通过 */
    handleSuccess(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认审核成功提现信息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return examine({id:ids,status:10});
      }).then(() => {
        this.getList();
        this.msgSuccess("操作成功");
      }).catch(function() {});
    },
    /** 审核失败 **/
    handleError(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认审核不成功提现信息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {

        return examine({id:ids,status:20});
      }).then(() => {
        this.getList();
        this.msgSuccess("操作成功");
      }).catch(function() {});
    },


    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有提现信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDraw(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
