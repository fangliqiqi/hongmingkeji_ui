<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="活动推广表id" prop="activityId">-->
<!--        <el-input-->
<!--          v-model="queryParams.activityId"-->
<!--          placeholder="请输入活动推广表id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="业务员手机号码" prop="activitySalesmanPhone" label-width="100">
        <el-input
          v-model="queryParams.activitySalesmanPhone"
          placeholder="请输入活动对接业务员手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动价格" prop="activityPrice">
        <el-input
          v-model="queryParams.activityPrice"
          placeholder="请输入活动价格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实付金额" prop="paymentAmount">
        <el-input
          v-model="queryParams.paymentAmount"
          placeholder="请输入实付金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="actState">
        <el-select v-model="queryParams.actState" placeholder="请选择订单状态" clearable size="small">
          <el-option
            v-for="dict in actStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="json格式数据 表单信息" prop="jsonInfo">-->
<!--        <el-input-->
<!--          v-model="queryParams.jsonInfo"-->
<!--          placeholder="请输入json格式数据 表单信息"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="订单号" prop="actOrderNo">
        <el-input
          v-model="queryParams.actOrderNo"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款方式" prop="actPayMethod">
        <el-select v-model="queryParams.actPayMethod" placeholder="请选择付款方式" clearable size="small">
          <el-option
            v-for="dict in actPayMethodOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动类型" prop="actType">
        <el-select v-model="queryParams.actType" placeholder="请选择活动类型" clearable size="small">
          <el-option
            v-for="dict in actTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="processState">
        <el-select v-model="queryParams.processState" placeholder="请选择处理状态" clearable size="small">
          <el-option
            v-for="dict in orderStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
            />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['share:activityOrder:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:activityOrder:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:activityOrder:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:activityOrder:export']"
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

    <el-table v-loading="loading" :data="activityOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="递增id" align="center" prop="id" />-->
<!--      <el-table-column label="活动推广表id" align="center" prop="activityId" />-->
      <el-table-column label="用户名称" align="center" prop="userName" />
      <el-table-column label="用户联系方式" align="center" prop="userPhone" />
      <el-table-column label="活动类型" align="center" prop="activityTitle" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="业务员手机号码" align="center" prop="activitySalesmanPhone" />
      <el-table-column label="活动价格" align="center" prop="activityPrice" />
      <el-table-column label="实付金额" align="center" prop="paymentAmount" />
      <el-table-column label="订单状态" align="center" prop="actState" :formatter="actStateFormat" />
<!--      <el-table-column label="json格式数据 表单信息" align="center" prop="jsonInfo" />-->
      <el-table-column label="订单号" align="center" prop="actOrderNo" />
      <el-table-column label="付款方式" align="center" prop="actPayMethod" :formatter="actPayMethodFormat" />
      <el-table-column label="处理状态" align="center" prop="processState" :formatter="orderStateFormat"/>
      <el-table-column label="活动类型" align="center" prop="actType" :formatter="actTypeFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="活动名称标题" align="center" prop="actTitle" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:activityOrder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:activityOrder:remove']"
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

    <!-- 添加或修改活动订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动推广表id" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动推广表id" />
        </el-form-item>
        <el-form-item label="业务员手机号码" prop="activitySalesmanPhone">
          <el-input v-model="form.activitySalesmanPhone" placeholder="请输入活动对接业务员手机号码" />
        </el-form-item>
        <el-form-item label="活动价格" prop="activityPrice">
          <el-input v-model="form.activityPrice" placeholder="请输入活动价格" />
        </el-form-item>
        <el-form-item label="实付金额" prop="paymentAmount">
          <el-input v-model="form.paymentAmount" placeholder="请输入实付金额" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.actState" placeholder="请选择订单状态">
            <el-option
              v-for="dict in actStateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号" prop="actOrderNo">
          <el-input v-model="form.actOrderNo" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="form.actPayMethod" placeholder="请选择付款方式">
            <el-option
              v-for="dict in actPayMethodOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="form.actType" placeholder="请选择活动类型">
            <el-option
              v-for="dict in actTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称标题" prop="actTitle">
          <el-input v-model="form.actTitle" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="处理状态" prop="processState">
          <el-select v-model="form.processState" placeholder="请选择活动类型">
            <el-option
              v-for="dict in orderStateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
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
import { listActivityOrder, getActivityOrder, delActivityOrder, addActivityOrder, updateActivityOrder, exportActivityOrder } from "@/api/share/activityOrder";

export default {
  name: "ActivityOrder",
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
      // 活动订单表格数据
      activityOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 订单状态字典
      actStateOptions: [],
      // 付款方式字典
      actPayMethodOptions: [],
      // 订单处理状态
      orderStateOptions: [],
      // 活动类型字典
      actTypeOptions: [],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        activityId: null,
        activitySalesmanPhone: null,
        activityPrice: null,
        paymentAmount: null,
        actState: null,
        jsonInfo: null,
        actOrderNo: null,
        actPayMethod: null,
        actType: null,
        actTitle: null,
        processState: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        activityId: [
          { required: true, message: "活动推广表id不能为空", trigger: "blur" }
        ],
        paymentAmount: [
          { required: true, message: "实付金额不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("activity_order_status").then(response => {
      this.actStateOptions = response.data;
    });
    this.getDicts("foupr_form_order_act_pay_method").then(response => {
      this.actPayMethodOptions = response.data;
    });
    this.getDicts("foupr_form_order_process_state").then(response => {
      this.orderStateOptions = response.data;
    });
    this.getDicts("foupr_activity_type").then(response => {
      this.actTypeOptions = response.data;
    });

  },
  methods: {
    /** 查询活动订单列表 */
    getList() {
      this.loading = true;
      listActivityOrder(this.queryParams).then(response => {
        this.activityOrderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 订单状态字典翻译
    actStateFormat(row, column) {
      return this.selectDictLabel(this.actStateOptions, row.actState);
    },
    // 付款方式字典翻译
    actPayMethodFormat(row, column) {
      return this.selectDictLabel(this.actPayMethodOptions, row.actPayMethod);
    },
    // 活动订单状态类型字典翻译
    orderStateFormat(row, column) {
      return this.selectDictLabel(this.orderStateOptions, row.processState);
    },
    // 活动类型字典翻译
    actTypeFormat(row, column) {
      return this.selectDictLabel(this.actTypeOptions, row.actType);
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
        activityId: null,
        activitySalesmanPhone: null,
        activityPrice: null,
        paymentAmount: null,
        actState: null,
        jsonInfo: null,
        actOrderNo: null,
        actPayMethod: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        actType: null,
        actTitle: null,
        processState: null
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
      this.title = "添加活动订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getActivityOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改活动订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addActivityOrder(this.form).then(response => {
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
      this.$confirm('是否确认删除活动订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delActivityOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有活动订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportActivityOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
