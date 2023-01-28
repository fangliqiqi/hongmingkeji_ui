<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <!-- <el-form-item label="业务类型ID" prop="orderType">
        <el-select v-model="queryParams.orderType" placeholder="请选择业务类型ID" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="业务名称" prop="businessName">
        <el-input
          v-model="queryParams.businessName"
          placeholder="请输入业务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="指导价" prop="guidePrice">
        <el-input
          v-model="queryParams.guidePrice"
          placeholder="请输入指导价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="客户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入客户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="客户姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户手机号" prop="userPhone">
        <el-input
          v-model="queryParams.userPhone"
          placeholder="请输入客户手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="queryParams.orderState" placeholder="请选择订单状态" clearable size="small">
          <el-option v-for="item in intorderStatusList"
                     :key="item.dictValue"
                     :label="item.dictLabel"
                     :value="item.dictValue">

          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="创建人ID" prop="finishUserId">
        <el-input
          v-model="queryParams.finishUserId"
          placeholder="请输入创建人ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="创建人姓名" prop="finishUserName">
        <el-input
          v-model="queryParams.finishUserName"
          placeholder="请输入创建人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="上级代理商ID" prop="agentId">
        <el-input
          v-model="queryParams.agentId"
          placeholder="请输入上级代理商ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="上级代理商姓名" prop="agentName">
        <el-input
          v-model="queryParams.agentName"
          placeholder="请输入上级代理商姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="省" prop="province">
        <el-input
          v-model="queryParams.province"
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
      <el-form-item label="县区" prop="county">
        <el-input
          v-model="queryParams.county"
          placeholder="请输入县区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="分销订单id" prop="agentOrderId">
        <el-input
          v-model="queryParams.agentOrderId"
          placeholder="请输入分销订单id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:agentIntentionOrder:add']"
        >新增</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:agentIntentionOrder:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:agentIntentionOrder:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:agentIntentionOrder:export']"
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

    <el-table v-loading="loading" :data="agentIntentionOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键ID" align="center" prop="id" /> -->
      <!-- <el-table-column label="业务类型ID" align="center" prop="orderType" /> -->
      <el-table-column label="业务名称" align="center" prop="businessName" />
      <el-table-column label="指导价" align="center" prop="guidePrice" />
      <!-- <el-table-column label="客户ID" align="center" prop="userId" /> -->
      <el-table-column label="客户姓名" align="center" prop="userName" />
      <el-table-column label="客户手机号" align="center" prop="userPhone" />

      <el-table-column label="订单状态" align="center" prop="orderState" :formatter="intorderStatusFormat" />
      <!-- <el-table-column label="创建人ID" align="center" prop="finishUserId" /> -->
      <el-table-column label="创建人姓名" align="center" prop="finishUserName" />
      <!-- <el-table-column label="上级代理商ID" align="center" prop="agentId" /> -->
      <!-- <el-table-column label="上级代理商姓名" align="center" prop="agentName" /> -->
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="县区" align="center" prop="county" />
      <el-table-column label="订单详情" align="center" prop="orderContent" />
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <!-- <el-table-column label="分销订单id" align="center" prop="agentOrderId" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="220">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:agentIntentionOrder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:agentIntentionOrder:remove']"
          >删除</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleOrderstatus(scope.row)"
          >修改订单状态</el-button>
          <el-button
            v-if="scope.row.orderState == 1 && !scope.row.agentOrderId"
            size="mini"
            type="text"
            icon="el-icon-sort"
            @click="handleTurnorder(scope.row)"
          >转订单</el-button>
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

    <!-- 添加或修改分销意向订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="业务类型ID">
          <el-select v-model="form.orderType" placeholder="请选择业务类型ID">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessName">
          <el-input v-model="form.businessName" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="指导价" prop="guidePrice">
          <el-input v-model="form.guidePrice" placeholder="请输入指导价" />
        </el-form-item>
        <el-form-item label="客户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="客户姓名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户手机号" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入客户手机号" />
        </el-form-item>
        <el-form-item label="订单详情" prop="orderContent">
          <el-input v-model="form.orderContent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="订单状态1有效2无效" prop="orderState">
          <el-input v-model="form.orderState" placeholder="请输入订单状态1有效2无效" />
        </el-form-item>
        <el-form-item label="创建人ID" prop="finishUserId">
          <el-input v-model="form.finishUserId" placeholder="请输入创建人ID" />
        </el-form-item>
        <el-form-item label="创建人姓名" prop="finishUserName">
          <el-input v-model="form.finishUserName" placeholder="请输入创建人姓名" />
        </el-form-item>
        <el-form-item label="上级代理商ID" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入上级代理商ID" />
        </el-form-item>
        <el-form-item label="上级代理商姓名" prop="agentName">
          <el-input v-model="form.agentName" placeholder="请输入上级代理商姓名" />
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="form.province" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="县区" prop="county">
          <el-input v-model="form.county" placeholder="请输入县区" />
        </el-form-item>
        <el-form-item label="分销订单id" prop="agentOrderId">
          <el-input v-model="form.agentOrderId" placeholder="请输入分销订单id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 转订单弹窗信息 -->
    <el-dialog :title="title" :visible.sync="Turnorderopen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="定金金额" prop="downPayment">
          <el-input v-model="form.downPayment" placeholder="请输入定金金额" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTurnorder">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改订单状态 弹窗信息-->
    <el-dialog :title="title" :visible.sync="Orderstatusopen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单状态" prop="orderState">
          <el-radio-group v-model="form.orderState">
            <el-radio
              v-for="dict in intorderStatusList"
              :key="dict.dictValue"
              :label="dict.dictValue"
              >{{dict.dictLabel}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOrderstatus">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listAgentIntentionOrder,
  getAgentIntentionOrder,
  delAgentIntentionOrder,
  addAgentIntentionOrder,
  updateAgentIntentionOrder,
  exportAgentIntentionOrder,
  Turnorder,
  modifyOrderstatus
  } from "@/api/share/threeAgent/agentIntentionOrder";

export default {
  name: "AgentIntentionOrder",
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
      // 分销意向订单表格数据
      agentIntentionOrderList: [],
      intorderStatusList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      Turnorderopen:false,
      Orderstatusopen:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        orderType: null,
        businessName: null,
        guidePrice: null,
        userId: null,
        userName: null,
        userPhone: null,
        orderContent: null,
        orderState: null,
        finishUserId: null,
        finishUserName: null,
        agentId: null,
        agentName: null,
        province: null,
        city: null,
        county: null,
        agentOrderId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderState:[{ required: true, message: '订单状态不能为空', trigger: 'blur' }],
        downPayment:[{ required: true, message: '定金金额不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.getList();
    
    // 字典查询 意向订单状态
    this.getDicts('int_order_status').then(response => {
       this.intorderStatusList = response.data
     })
  },
  methods: {
    /** 查询分销意向订单列表 */
    getList() {
      this.loading = true;
      listAgentIntentionOrder(this.queryParams).then(response => {
        this.agentIntentionOrderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 字典翻译
    intorderStatusFormat(row, column) {
      return this.selectDictLabel(this.intorderStatusList, row.orderState)
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.Orderstatusopen = false;
      this.Turnorderopen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        orderType: null,
        businessName: null,
        guidePrice: null,
        userId: null,
        userName: null,
        userPhone: null,
        orderContent: null,
        orderState: null,
        finishUserId: null,
        finishUserName: null,
        createTime: null,
        agentId: null,
        agentName: null,
        province: null,
        city: null,
        county: null,
        remark: null,
        agentOrderId: null,
        orderState:null,
        downPayment:null
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
      this.title = "添加分销意向订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAgentIntentionOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分销意向订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAgentIntentionOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addAgentIntentionOrder(this.form).then(response => {
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
    // 修改订单状态 弹窗
    handleOrderstatus(row){
      this.reset()
      let id =  row.id;
      getAgentIntentionOrder(id).then(res=>{
        if(res.code==200){
          this.form = res.data;
          this.form.orderState = String(res.data.orderState)
        }
      })
      this.Orderstatusopen = true;
    },
    // 修改订单 提交
    submitOrderstatus(){
      // console.log(this.form)
      var data = {
        id:this.form.id,
        orderState:this.form.orderState
      }
      modifyOrderstatus(data).then(res=>{
        if(res.code == 200){
          this.msgSuccess("修改成功");
          this.getList();
          this.Orderstatusopen = false;
        }
      })
    },

    // 转订单
    handleTurnorder(row){
      this.reset()
      let id =  row.id;
      getAgentIntentionOrder(id).then(res=>{
        if(res.code==200){
          this.form = res.data;
        }
      })
      this.Turnorderopen = true;

    },
    // 转订单提交
    submitTurnorder(){
      var data = {
        userName: this.form.userName,
        userPhone: this.form.userPhone,
        orderType:this.form.orderType,
        province:this.form.province,
        city:this.form.city,
        county:this.form.county,
        downPayment:this.form.downPayment,
        paidAmount:0,
        orderContent:this.form.orderContent,
        intentionOrderId:this.form.id,
      }
      console.log(data)
      this.$refs["form"].validate(valid => {
        if (valid) {
           Turnorder(data).then(response => {
              if (response.code === 200) {
                this.msgSuccess("转订单成功");
                this.Turnorderopen = false;
                this.getList();
              }
            })
          }
      })
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除分销意向订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAgentIntentionOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有分销意向订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportAgentIntentionOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
