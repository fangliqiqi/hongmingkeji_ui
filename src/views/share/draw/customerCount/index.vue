<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回访确认的客户名称" prop="customerNewname">
        <el-input
          v-model="queryParams.customerNewname"
          placeholder="请输入回访确认的客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户电话" prop="customerPhone">
        <el-input
          v-model="queryParams.customerPhone"
          placeholder="请输入客户电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户新手机号码" prop="customerPhoneone">
        <el-input
          v-model="queryParams.customerPhoneone"
          placeholder="请输入客户新手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务描述" prop="categoryText">
        <el-input
          v-model="queryParams.categoryText"
          placeholder="请输入业务描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户来源" prop="customerSource">
        <el-input
          v-model="queryParams.customerSource"
          placeholder="请输入客户来源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="prov">
        <el-input
          v-model="queryParams.prov"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区" prop="county">
        <el-input
          v-model="queryParams.county"
          placeholder="请输入区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接收资源的用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入接收资源的用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理商用户id(rz_company表id)" prop="receiveId">
        <el-input
          v-model="queryParams.receiveId"
          placeholder="请输入代理商用户id(rz_company表id)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理商接收信息时间" prop="receiveTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.receiveTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择代理商接收信息时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="再次跟进时间" prop="followTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.followTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择再次跟进时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="代理商确认信息的有效状态 10有效 20无效" prop="agentState">
        <el-input
          v-model="queryParams.agentState"
          placeholder="请输入代理商确认信息的有效状态 10有效 20无效"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回访专员确认信息有效状态 10有效 20无效 0待审核" prop="returnState">
        <el-input
          v-model="queryParams.returnState"
          placeholder="请输入回访专员确认信息有效状态 10有效 20无效 0待审核"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商机级别ABCD" prop="sourceTypeLv">
        <el-input
          v-model="queryParams.sourceTypeLv"
          placeholder="请输入商机级别ABCD"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商机类型id" prop="sourceTypeId">
        <el-input
          v-model="queryParams.sourceTypeId"
          placeholder="请输入商机类型id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否成交10 成交 0 未成交" prop="dealState">
        <el-input
          v-model="queryParams.dealState"
          placeholder="请输入是否成交10 成交 0 未成交"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户的QQ" prop="customerQq">
        <el-input
          v-model="queryParams.customerQq"
          placeholder="请输入客户的QQ"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户的微信" prop="customerWeixin">
        <el-input
          v-model="queryParams.customerWeixin"
          placeholder="请输入客户的微信"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['share:customerCount:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:customerCount:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:customerCount:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:customerCount:export']"
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

    <el-table v-loading="loading" :data="customerCountList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源id" align="center" prop="id" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="回访确认的客户名称" align="center" prop="customerNewname" />
      <el-table-column label="客户电话" align="center" prop="customerPhone" />
      <el-table-column label="客户新手机号码" align="center" prop="customerPhoneone" />
      <el-table-column label="业务描述" align="center" prop="categoryText" />
      <el-table-column label="客户来源" align="center" prop="customerSource" />
      <el-table-column label="省" align="center" prop="prov" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="county" />
      <el-table-column label="接收资源的用户id" align="center" prop="userId" />
      <el-table-column label="代理商用户id(rz_company表id)" align="center" prop="receiveId" />
      <el-table-column label="代理商接收信息时间" align="center" prop="receiveTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="再次跟进时间" align="center" prop="followTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.followTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商确认信息的有效状态 10有效 20无效" align="center" prop="agentState" />
      <el-table-column label="回访专员确认信息有效状态 10有效 20无效 0待审核" align="center" prop="returnState" />
      <el-table-column label="商机级别ABCD" align="center" prop="sourceTypeLv" />
      <el-table-column label="商机类型id" align="center" prop="sourceTypeId" />
      <el-table-column label="是否成交10 成交 0 未成交" align="center" prop="dealState" />
      <el-table-column label="客户的QQ" align="center" prop="customerQq" />
      <el-table-column label="客户的微信" align="center" prop="customerWeixin" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:customerCount:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:customerCount:remove']"
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

    <!-- 添加或修改客户资源分配对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="回访确认的客户名称" prop="customerNewname">
          <el-input v-model="form.customerNewname" placeholder="请输入回访确认的客户名称" />
        </el-form-item>
        <el-form-item label="客户电话" prop="customerPhone">
          <el-input v-model="form.customerPhone" placeholder="请输入客户电话" />
        </el-form-item>
        <el-form-item label="客户新手机号码" prop="customerPhoneone">
          <el-input v-model="form.customerPhoneone" placeholder="请输入客户新手机号码" />
        </el-form-item>
        <el-form-item label="业务描述" prop="categoryText">
          <el-input v-model="form.categoryText" placeholder="请输入业务描述" />
        </el-form-item>
        <el-form-item label="客户来源" prop="customerSource">
          <el-input v-model="form.customerSource" placeholder="请输入客户来源" />
        </el-form-item>
        <el-form-item label="省" prop="prov">
          <el-input v-model="form.prov" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="区" prop="county">
          <el-input v-model="form.county" placeholder="请输入区" />
        </el-form-item>
        <el-form-item label="接收资源的用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入接收资源的用户id" />
        </el-form-item>
        <el-form-item label="代理商用户id(rz_company表id)" prop="receiveId">
          <el-input v-model="form.receiveId" placeholder="请输入代理商用户id(rz_company表id)" />
        </el-form-item>
        <el-form-item label="代理商接收信息时间" prop="receiveTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.receiveTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择代理商接收信息时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="再次跟进时间" prop="followTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.followTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择再次跟进时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="代理商确认信息的有效状态 10有效 20无效" prop="agentState">
          <el-input v-model="form.agentState" placeholder="请输入代理商确认信息的有效状态 10有效 20无效" />
        </el-form-item>
        <el-form-item label="回访专员确认信息有效状态 10有效 20无效 0待审核" prop="returnState">
          <el-input v-model="form.returnState" placeholder="请输入回访专员确认信息有效状态 10有效 20无效 0待审核" />
        </el-form-item>
        <el-form-item label="商机级别ABCD" prop="sourceTypeLv">
          <el-input v-model="form.sourceTypeLv" placeholder="请输入商机级别ABCD" />
        </el-form-item>
        <el-form-item label="商机类型id" prop="sourceTypeId">
          <el-input v-model="form.sourceTypeId" placeholder="请输入商机类型id" />
        </el-form-item>
        <el-form-item label="是否成交10 成交 0 未成交" prop="dealState">
          <el-input v-model="form.dealState" placeholder="请输入是否成交10 成交 0 未成交" />
        </el-form-item>
        <el-form-item label="客户的QQ" prop="customerQq">
          <el-input v-model="form.customerQq" placeholder="请输入客户的QQ" />
        </el-form-item>
        <el-form-item label="客户的微信" prop="customerWeixin">
          <el-input v-model="form.customerWeixin" placeholder="请输入客户的微信" />
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
import { listCustomerCount, getCustomerCount, delCustomerCount, addCustomerCount, updateCustomerCount, exportCustomerCount } from "@/api/share/customerCount";

export default {
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
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
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
      },
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
        prov: [
          { required: true, message: "省不能为空", trigger: "blur" }
        ],
        city: [
          { required: true, message: "市不能为空", trigger: "blur" }
        ],
        receiveTime: [
          { required: true, message: "代理商接收信息时间不能为空", trigger: "blur" }
        ],
        agentState: [
          { required: true, message: "代理商确认信息的有效状态 10有效 20无效不能为空", trigger: "blur" }
        ],
        returnState: [
          { required: true, message: "回访专员确认信息有效状态 10有效 20无效 0待审核不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询客户资源分配列表 */
    getList() {
      this.loading = true;
      listCustomerCount(this.queryParams).then(response => {
        this.customerCountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
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
      const id = row.id || this.ids
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
      this.$confirm('是否确认删除客户资源分配编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCustomerCount(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有客户资源分配数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCustomerCount(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
