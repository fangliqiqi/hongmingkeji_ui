<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="订单编号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合作商" prop="companyId" v-if="!queryParams.id">
        <el-select
          v-model="queryParams.companyId"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请输入合作商/手机号码"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in phoneOptions"
            :key="item.id"
            :label="item.companyName + ' '+item.phonenumber"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="用户手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="用户手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="充值金额" prop="totalAmount">
        <el-input
          v-model="queryParams.totalAmount"
          placeholder="请输入充值金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款方式" prop="paymentMethod">
        <el-select v-model="queryParams.paymentMethod" placeholder="请选择付款的方式" clearable size="small">
          <el-option
            v-for="dict in paymentMethodOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

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


      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--<el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:payEpetOrder:add']"
        >新增</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          disabled="disabled"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:payEpetOrder:edit']"
        >修改</el-button>
      </el-col>
    <!--  <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:payEpetOrder:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:payEpetOrder:export']"
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

    <el-table v-loading="loading" :data="payEpetOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
<!--      <el-table-column label="钱包表id" align="center" prop="walletId" />-->
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="充值金额" align="center" prop="totalAmount" />
      <el-table-column label="赠送金额" align="center" prop="givenAmount" />
      <el-table-column label="支入支出金额" align="center" prop="expendAmount" />
      <el-table-column label="付款的方式" align="center" prop="paymentMethod" :formatter="paymentMethodFormat" />
      <el-table-column label="钱包余额" align="center" prop="amount" />
      <el-table-column label="支入支出" align="center" prop="type" :formatter="typeFormat" />
      <el-table-column label="付款时间" align="center" prop="paymentDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentDate, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="orderState" :formatter="orderStateFormat" />
      <el-table-column label="是否开票" align="center" prop="invoicFlag" :formatter="invoicFlagFormat" />
      <el-table-column label="商机类型" align="center" prop="categoryCity" >
      <template slot-scope="scope">
          <span>{{scope.row.categoryCity+scope.row.categoryType}}</span>
      </template>
      </el-table-column>
      <el-table-column label="合作商" align="center" prop="companyName" />
      <el-table-column label="资源id" align="center" prop="customerSourceId" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            disabled="disabled"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:payEpetOrder:edit']"
          >修改</el-button>
       <!--   <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:payEpetOrder:remove']"
          >删除</el-button>-->
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

    <!-- 添加或修改出入账记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号码" prop="phonenumber" >
          <el-input v-model="form.phonenumber" placeholder="请输入手机号码"  />
        </el-form-item>
<!--        <el-form-item label="订单编号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
        </el-form-item>-->
        <el-form-item label="充值金额" prop="totalAmount">
          <el-input v-model="form.totalAmount" placeholder="请输入充值金额" />
        </el-form-item>
        <el-form-item label="赠送金额" prop="givenAmount">
          <el-input v-model="form.givenAmount" placeholder="请输入赠送金额" />
        </el-form-item>
<!--        <el-form-item label="支出金额" prop="expendAmount">
          <el-input v-model="form.expendAmount" placeholder="请输入支出金额" />
        </el-form-item>-->

       <!-- <el-form-item label="付款的方式">
          <el-select v-model="form.paymentMethod" placeholder="请选择付款的方式">
            <el-option
              v-for="dict in paymentMethodOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>-->
      <!--  <el-form-item label="钱包余额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入钱包余额" />
        </el-form-item>-->
       <!-- <el-form-item label="支入支出">
          <el-select v-model="form.type" placeholder="请选择支入支出">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="付款时间" prop="paymentDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.paymentDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择付款时间">
          </el-date-picker>
        </el-form-item>
        <!--<el-form-item label="订单状态">
          <el-select v-model="form.orderState" placeholder="请选择订单状态">
            <el-option
              v-for="dict in orderStateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>-->
      <!--  <el-form-item label="入账时间" prop="creditTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.creditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入账时间">
          </el-date-picker>
        </el-form-item>-->
        <el-form-item label="是否开票">
          <el-select v-model="form.invoicFlag" placeholder="请选择是否开票">
            <el-option
              v-for="dict in invoicFlagOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商机类目" prop="sourceTypeId">
          <el-select v-model="form.sourceTypeId" filterable placeholder="商机类目">
            <el-option
              v-for="item in agentOptions"
              :key="item.id"
              :label="item.categoryType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="代理商id" prop="companyId">-->
<!--          <el-input v-model="form.companyId" placeholder="请输入代理商id" />-->
<!--        </el-form-item>-->
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
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
import { listPayEpetOrder, getPayEpetOrder, delPayEpetOrder, addPayEpetOrder, updatePayEpetOrder, exportPayEpetOrder ,getAgentTypeLv ,getEpetOrderList} from "@/api/share/payEpetOrder";
export default {
  name: "PayEpetOrder",
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
      // 出入账记录表格数据
      payEpetOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 付款的方式字典
      paymentMethodOptions: [],
      // 支入支出字典
      typeOptions: [],
      // 订单状态字典
      orderStateOptions: [],
      // 是否开票字典
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
        sourceTypeId: null,
        companyId: null,
        customerSourceId:null,
        createDate: null,
        updateDate: null,
        remarks: null,
        companyName:null,
        categoryCity:null,
        categoryType:null,
        phonenumber:null
      },
      phoneOptions:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        paymentMethod: [
          { required: true, message: "付款的方式不能为空", trigger: "blur" }
        ],
        sourceTypeId: [
          { required: true, message: "商机类目不能为空", trigger: "blur" }
        ],
        totalAmount: [
          { required: true, message: "充值金额不能为空", trigger: "blur" }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
      },
      agentOptions:[]
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
  methods: {
    /** 查询出入账记录列表 */
    getList() {
      this.loading = true;
      listPayEpetOrder(this.queryParams).then(response => {
        // console.log(this.queryParams)
        this.payEpetOrderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 付款的方式字典翻译
    paymentMethodFormat(row, column) {
      return this.selectDictLabel(this.paymentMethodOptions, row.paymentMethod);
    },
    // 支入支出字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 订单状态字典翻译
    orderStateFormat(row, column) {
      return this.selectDictLabel(this.orderStateOptions, row.orderState);
    },
    // 是否开票字典翻译
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
        sourceTypeId: null,
        companyId: null,
        customerSourceId: null,
        createDate: null,
        createBy: null,
        updateDate: null,
        updateBy: null,
        remarks: null,
        companyName:null,
        categoryCity:null,
        categoryType:null,
        phonenumber:null,
        agentOptions:null
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

    // 远程搜索
    remoteMethod(query) {
      let that = this;
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          // this.companyOptions = this.list.filter(item => {
          //   return item.label.toLowerCase()
          //     .indexOf(query.toLowerCase()) > -1;
          // });
          getEpetOrderList({name:query}).then((res)=>{
            // console.log(res)
            if(res.code==200){
              this.phoneOptions = res.rows||[];
            }
            console.info(res)
          }).catch((err)=>{
          })
        }, 200);
      } else {
        this.phoneOptions = [];
      }
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加出入账记录";
      let data = {};
      getAgentTypeLv(data).then(response => {
        console.info(response)
        if(response.code==200){
          this.agentOptions = response.rows || []
        }else{
          this.agentOptions =[]
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayEpetOrder(id).then(response => {
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
            updatePayEpetOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPayEpetOrder(this.form).then(response => {
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
          return delPayEpetOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有出入账记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPayEpetOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
