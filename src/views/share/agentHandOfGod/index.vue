<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户姓名" prop="userId">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleId">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充值金额" prop="rechargeMoney">
        <el-input
          v-model="queryParams.rechargeMoney"
          placeholder="请输入充值金额"
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
          v-hasPermi="['share:agentHandOfGod:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:agentHandOfGod:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:agentHandOfGod:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:agentHandOfGod:export']"
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

    <el-table v-loading="loading" :data="agentHandOfGodList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="用户姓名" align="center" prop="nickName" />
      <el-table-column label="角色名称" align="center" prop="roleName" />
      <el-table-column label="充值金额" align="center" prop="rechargeMoney" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:agentHandOfGod:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:agentHandOfGod:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-finished"
            @click="handleImmediate(scope.row)"
          >立即生效</el-button>
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

    <!-- 添加或修改特殊价格设置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户姓名" prop="userId" style="width: 100%">
          <el-select
            v-model="form.userId"
            filterable
            remote
            clearable
            reserve-keyword
            style="width: 100%;"
            placeholder="请输入用户名称"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="handleUser"
            >
            <el-option
              v-for="item in userOptions"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleId" >
          <el-select
            v-model="form.roleId"
            style="width: 100%;"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请选择角色名称"
            @change="handleUser2"
            >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额" prop="rechargeMoney">
          <el-input v-model="form.rechargeMoney" placeholder="请输入充值金额" />
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
import { listAgentHandOfGod, getAgentHandOfGod, delAgentHandOfGod, addAgentHandOfGod,
        updateAgentHandOfGod, exportAgentHandOfGod ,getUserList,getRoleList,getImmediate
        } from "@/api/share/agentHandOfGod";

export default {
  name: "AgentHandOfGod",
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
      // 特殊价格设置表格数据
      agentHandOfGodList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        userId: null,
        roleId: null,
        nickName:null,
        roleName:null,
        rechargeMoney: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        rechargeMoney: [
          { required: true, message: '充值金额不能为空', trigger: 'blur' }
        ],
      },
      userOptions:[],
      roleOptions:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询特殊价格设置列表 */
    getList() {
      this.loading = true;
      listAgentHandOfGod(this.queryParams).then(response => {
        console.log(response.rows)
        this.agentHandOfGodList = response.rows;
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
        userId: null,
        roleId: null,
        rechargeMoney: null
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
      this.title = "添加特殊价格设置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAgentHandOfGod(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改特殊价格设置";
      });
    },

    // 远程搜索
    remoteMethod(query) {
      let that = this;
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          getUserList({keyword:query}).then((res)=>{
            if(res.code==200){
              this.userOptions = res.data||[];
            }

          }).catch((err)=>{
          })
        }, 200);
      } else {
        this.userOptions = [];
      }
    },

    // 选择用户名 得到userid 同时过滤得到nickName
    handleUser: function(value) {
      // console.log(value)
      // console.log(this.userOptions)
      let arr =  this.userOptions.filter(item=>item.userId == value)[0]
      this.form.nickName = arr.nickName;
      this.form.userId = value
      this.getRolename()
    },

    // 根据用户姓名的id 搜索得到角色名称
    getRolename(){
       let data ={
         userId:this.form.userId || ''
       }
     if (data.userId) {
       getRoleList(data).then(response => {
         // console.log("角色名称")
         console.info(response)
         if (response.code == 200) {
            this.roleOptions = response.data;
         } else {
            this.roleOptions = []
         }
       })
     }
    },
    // 选择角色id的时候 同时过滤得到角色名字
    handleUser2: function(value) {
      // console.log(value)
      // console.log( this.roleOptions)
      let arr1 =  this.roleOptions.filter(item=>item.roleId == value)[0]
      // console.log(arr1)
      this.form.roleName = arr1.roleName;
    },


    /** 提交按钮 */
    submitForm() {
      console.log(this.form)
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAgentHandOfGod(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
                this.reset()
              }
            });
          } else {
            addAgentHandOfGod(this.form).then(response => {
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
     /** 立即生效按钮操作 */
    handleImmediate(row){
      // console.log(row)
      const ids = row.id || this.ids;
      this.$confirm('是否确认特殊价格设置编号为"' + ids + '"的数据项立即生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         return getImmediate({id:ids});
      }).then(() => {
          this.getList();
          this.msgSuccess("生效成功");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },


    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除特殊价格设置编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAgentHandOfGod(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有特殊价格设置数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportAgentHandOfGod(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
