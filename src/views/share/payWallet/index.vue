<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="公司名称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="公司名称" prop="companyId" v-if="!queryParams.id">
        <el-select
          v-model="queryParams.companyId"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请输入公司名称"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账户余额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入账户余额"
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
     <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:payWallet:add']"
        >新增</el-button>
      </el-col>-->
      <!-- <el-col :span="1.5">
         <el-button
           type="success"
           disabled="disabled"
           icon="el-icon-edit"
           size="mini"
           :disabled="single"
           @click="handleUpdate"
           v-hasPermi="['share:payWallet:edit']"
         >修改</el-button>
       </el-col>
       <el-col :span="1.5">
         <el-button
           type="danger"
           icon="el-icon-delete"
           size="mini"
           :disabled="multiple"
           @click="handleDelete"
           v-hasPermi="['share:payWallet:remove']"
         >删除</el-button>
       </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:payWallet:export']"
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

    <el-table v-loading="loading" :data="payWalletList" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName"  >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="账户余额" align="center" prop="amount" />
      <!-- 账户金额最低预警 -->
      <!-- <el-table-column label="最低金额预警" align="center"  prop="warningAmount" >
        <template slot-scope="scope">
           <el-input placeholder="最低额预警" class="textcen"  v-model="scope.row.warningAmount" @blur="blurtevent(scope.row)"></el-input>
        </template>
      </el-table-column> -->

      <el-table-column label="累计充值金额" align="center" prop="totalAmount" />
      <el-table-column label="累计满赠金额" align="center" prop="givenAmount" />
      <el-table-column label="累计消费金额" align="center" prop="expendAmount" />
      <el-table-column label="创建时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         <!-- <el-button
            disabled="disabled"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:payWallet:edit']"
          >修改</el-button>-->
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:payWallet:remove']"
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

    <!-- 添加或修改用户钱包对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司id" disabled="disabled" />
        </el-form-item>
        <el-form-item label="账户余额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入账户余额" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
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
import { listPayWallet, getPayWallet, delPayWallet, addPayWallet, updatePayWallet, exportPayWallet ,addFundWarning , getCompanyList} from "@/api/share/payWallet";

export default {
  name: "PayWallet",
  data() {
    return {
      title:null,
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
        companyName:null,
        warningAmount:null
      },
      companyOptions:[],
      // 表单参数
      form: {},
      warningForm:{},
      oldwarningAmount:null,
      warning:false,
      error:false,
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
      listPayWallet(this.queryParams).then(response => {
        // console.log(response)
        this.payWalletList = response.rows;
        this.payWalletList.map((item,index)=>{
          item.oldwarningAmount = item.warningAmount;
          return item
        })
        // console.log(this.payWalletList)
        this.total = response.total;
        this.loading = false;
      });
    },
    //设置资金预警
    blurtevent(row){
      // console.log(row)
      const oldwarningAmount = row.oldwarningAmount;
      const newwarningAmount = row.warningAmount;
      if(newwarningAmount){
        if(oldwarningAmount == newwarningAmount){
          return
        }
        this.warningForm.companyId = row.companyId;
        this.warningForm.warningAmount = row.warningAmount;
        this.warningForm.id = row.warningId;
        var data  = this.warningForm;
        addFundWarning(data).then(res => {
          // console.log(res)
          if(res.code == 200){
            // this.msgSuccess('修改成功')
            this.getList()
          }
        })
      }
    },

    //预警颜色显示
    // tableRowClassName({row, rowIndex}) {
    //   // console.log(row)
    //   //差值小于0 也就是余额 低于 预警值 就是红色   差值小于500 预警黄色
    //   if(row.warningAmount){
    //     const difference = row.amount - row.warningAmount;
    //     if (difference <= 0) {
    //       return 'error-row' ;
    //     } else if (difference > 0 && difference <= 500) {
    //       return 'warning-row';
    //     }else{
    //        return '';
    //     }
    //   }
    // },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
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
        companyName:null,
        warningAmount:null
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
          getCompanyList({companyName:query}).then((res)=>{
            if(res.code==200){
              this.companyOptions = res.rows||[];
            }
            console.info(res)
          }).catch((err)=>{
          })
        }, 200);
      } else {
        this.companyOptions = [];
      }
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户钱包";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayWallet(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户钱包";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayWallet(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPayWallet(this.form).then(response => {
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
      this.$confirm('是否确认删除用户钱包编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPayWallet(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户钱包数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPayWallet(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-table .warning-row {
      background: oldlace;
    }

  .el-table .error-row {
      background: #fef0f0;
    }

  .textcen .el-input__inner{
     text-align: center;
 }

</style>
