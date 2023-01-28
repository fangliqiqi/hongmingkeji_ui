<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="手机号码" prop="userId">
        <el-input
          v-model="queryParams.phoneNumber"
          placeholder="请输入订单手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单类型" prop="category">
        <el-select v-model="queryParams.category" placeholder="请选择订单类型1.会计上门 2.财务外包 3.税务筹划" clearable size="small">
          <el-option
            v-for="dict in categoryOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="queryParams.orderState" placeholder="请选择订单状态0:待付款 10:已完成 20：已取消" clearable size="small">
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:order:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:order:edit']"
        >修改</el-button>
      </el-col>
     <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:order:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:order:export']"
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

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="用户姓名" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.shareUser.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center" prop="phonenumber" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="订单类型" align="center" prop="category" :formatter="categoryFormat" />
      <el-table-column label="订单状态" align="center" prop="orderState" :formatter="orderStateFormat" />
      <el-table-column label="有效佣金" align="center" prop="state" :formatter="stateFormat" />
      <el-table-column label="服务金额" align="center" prop="realAmount" >
        <template slot-scope="scope">
          <span> {{scope.row.realAmount}}￥</span>
        </template>
      </el-table-column>
      <el-table-column label="付款金额" align="center" prop="dealAmount" >
        <template slot-scope="scope">
          <span> {{scope.row.dealAmount}}￥</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金比例" align="center" prop="returnRatio" >
      <template slot-scope="scope">
        <span> {{scope.row.returnRatio}}%</span>
      </template>
      </el-table-column>
      <el-table-column label="佣金收益" align="center" prop="returnAmount" >
      <template slot-scope="scope">
        <span> {{scope.row.returnAmount}}￥</span>
      </template>
      </el-table-column>
      <el-table-column label="服务开始时间" align="center" prop="dealTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dealTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务结束时间" align="center" prop="dealEndtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dealEndtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务内容" align="center" prop="serContent" />
      <el-table-column label="服务团队" align="center" prop="serTeam" />
      <el-table-column label="催办事项" align="center" prop="urgeFlag" :formatter="urgeFlagFormat" />
      <el-table-column label="客服跟进状态" align="center" prop="followFlag" :formatter="followFlagFormat" />
      <el-table-column label="服务团队跟进" align="center" prop="teamFlag" :formatter="teamFlagFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            disabled="disabled"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:order:remove']"
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

    <!-- 添加或修改订单列表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select v-model="form.category" placeholder="请选择订单类型1.会计上门 2.财务外包 3.税务筹划">
            <el-option
              v-for="dict in categoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.orderState" placeholder="请选择订单状态0:待付款 10:已完成 20：已取消">
            <el-option
              v-for="dict in orderStateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效佣金">
          <el-select v-model="form.state" placeholder="请选择有效佣金:10有效 20无效  0审核中">
            <el-option
              v-for="dict in stateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报价金额" prop="realAmount">
          <el-input v-model="form.realAmount" placeholder="请输入服务金额，报价" />
        </el-form-item>
        <el-form-item label="付款金额" prop="dealAmount">
          <el-input v-model="form.dealAmount" placeholder="请输入付款金额" />
        </el-form-item>
        <el-form-item label="订单成交时间" prop="dealTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.dealTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择订单成交时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="服务结束时间" prop="dealEndtime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.dealEndtime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择服务结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="返现比例" prop="returnRatio">
          <el-input v-model="form.returnRatio" placeholder="请输入返现比例99.99" />
        </el-form-item>
        <el-form-item label="服务内容" prop="serContent">
          <el-input v-model="form.serContent" placeholder="请输入服务内容" />
        </el-form-item>
        <el-form-item label="服务团队" prop="serTeam">
          <el-input v-model="form.serTeam" placeholder="请输入服务团队" />
        </el-form-item>
        <el-form-item label="客服跟进状态">
          <el-select v-model="form.followFlag" placeholder="请选择客服跟进状态">
            <el-option
              v-for="dict in followFlagOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务团队跟进">
          <el-select v-model="form.teamFlag" placeholder="请选择服务团队跟进">
            <el-option
              v-for="dict in teamFlagOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
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
  import { listOrder, getOrder, delOrder, addOrder, updateOrder, exportOrder } from "@/api/share/order";

  export default {
    name: "Order",
    data() {
      var vueObj = this;
      return {
        // 遮罩层
        loading: true,
        programs: {},
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
        // 用户订单表格数据
        orderList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 订单类型1.会计上门 2.财务外包 3.税务筹划字典
        categoryOptions: [],
        // 订单状态0:待付款 10:已完成 20：已取消字典
        orderStateOptions: [],
        // 有效佣金:10有效 20无效  0审核中字典
        stateOptions: [],
        // 催办事项字典
        urgeFlagOptions: [],
        // 客服跟进状态字典
        followFlagOptions: [],
        // 服务团队跟进字典
        teamFlagOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:10,
          userId: null,
          orderNo: null,
          phonenumber: null,
          companyName: null,
          category: null,
          orderState: null,
          state: null,
          realAmount: null,
          dealAmount: null,
          dealTime: null,
          dealEndtime: null,
          returnRatio: null,
          returnAmount: null,
          serContent: null,
          serTeam: null,
          urgeFlag: null,
          followFlag: null,
          teamFlag: null,
          teamId: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          phonenumber: [
            { required: true, message: "手机号码不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      this.getList();
      this.getDicts("share_category").then(response => {
        this.categoryOptions = response.data;
      });
      this.getDicts("sys_order_state").then(response => {
        this.orderStateOptions = response.data;
      });
      this.getDicts("refer_state").then(response => {
        this.stateOptions = response.data;
      });
      this.getDicts("refer_relation").then(response => {
        this.urgeFlagOptions = response.data;
      });
      this.getDicts("refer_relation").then(response => {
        this.followFlagOptions = response.data;
      });
      this.getDicts("refer_relation").then(response => {
        this.teamFlagOptions = response.data;
      });
    },

    methods: {
      /** 查询用户订单列表 */
      getList() {
        this.loading = true;
        listOrder(this.queryParams).then(response => {
          this.orderList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 订单类型1.会计上门 2.财务外包 3.税务筹划字典翻译
      categoryFormat(row, column) {
        return this.selectDictLabel(this.categoryOptions, row.category);
      },
      // 订单状态0:待付款 10:已完成 20：已取消字典翻译
      orderStateFormat(row, column) {
        return this.selectDictLabel(this.orderStateOptions, row.orderState);
      },
      // 有效佣金:10有效 20无效  0审核中字典翻译
      stateFormat(row, column) {
        return this.selectDictLabel(this.stateOptions, row.state);
      },
      // 催办事项字典翻译
      urgeFlagFormat(row, column) {
        return this.selectDictLabel(this.urgeFlagOptions, row.urgeFlag);
      },
      // 客服跟进状态字典翻译
      followFlagFormat(row, column) {
        return this.selectDictLabel(this.followFlagOptions, row.followFlag);
      },
      // 服务团队跟进字典翻译
      teamFlagFormat(row, column) {
        return this.selectDictLabel(this.teamFlagOptions, row.teamFlag);
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
          orderNo: null,
          phonenumber: null,
          companyName: null,
          category: null,
          orderState: null,
          state: null,
          realAmount: null,
          dealAmount: null,
          dealTime: null,
          dealEndtime: null,
          returnRatio: null,
          returnAmount: null,
          serContent: null,
          serTeam: null,
          urgeFlag: null,
          followFlag: null,
          teamFlag: null,
          teamId: null,
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
        this.title = "添加用户订单";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getOrder(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改用户订单";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateOrder(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addOrder(this.form).then(response => {
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
        this.$confirm('是否确认删除用户订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有用户订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      },




    },

  };


</script>
