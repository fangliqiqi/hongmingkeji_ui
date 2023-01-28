<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
          <el-select v-model="queryParams.userType" placeholder="请选择用户类型" clearable size="small">
            <el-option
              v-for="dict in userTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
      <!--  <el-form-item label="用户邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入用户邮箱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--    <el-form-item label="省" prop="prov">
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
       </el-form-item>-->
      <el-form-item label="是否代理商" prop="agentFlag">
        <el-select v-model="queryParams.agentFlag" placeholder="请选择是否代理商" clearable size="small">
          <el-option
            v-for="dict in agentFlagOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否店主" prop="relationId">
        <el-select v-model="queryParams.relationId" placeholder="请选择店主身份识别号" clearable size="small">
          <el-option
            v-for="dict in relationIdOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="门店标识" prop="posterId">
        <el-input
          v-model="queryParams.posterId"
          placeholder="请输入门店海报标识号"
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
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:user:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:user:export']"
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

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户ID" align="center" prop="userId" />
     <!-- <el-table-column label="部门ID" align="center" prop="deptId" />-->
      <el-table-column label="用户账号" align="center" prop="userName" />
      <el-table-column label="用户昵称" align="center" prop="nickName" />
      <el-table-column label="用户类型" align="center" prop="userType" :formatter="userTypeFormat" />
      <el-table-column label="手机号码" align="center" prop="phonenumber" />
      <el-table-column label="用户性别" align="center" prop="sex" :formatter="sexFormat" />
      <el-table-column label="省市区/县" align="center" prop="prov" >
        <template slot-scope="scope">
          {{scope.row.prov}}{{scope.row.city}}{{scope.row.county}}
        </template>
      </el-table-column>
      <el-table-column label="最后登陆时间" align="center" prop="loginDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司表id" align="center" prop="companyId" />
      <el-table-column label="代理商" align="center" prop="agentFlag"  :formatter="agentFlagFormat"/>
      <el-table-column label="是否店主" align="center" prop="relationId" :formatter="relationIdFormat" />
      <el-table-column label="推荐人Id" align="center" prop="recommendId" />
      <el-table-column label="门店标识" align="center" prop="posterId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:user:edit']"
          >修改</el-button>
          <el-button
            disabled="disabled"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:user:remove']"
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户账号" disabled="disabled" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="用户类型" prop="email">
          <el-input v-model="form.userType" placeholder="请选择用户类型" />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入用户邮箱" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入手机号码"  disabled="disabled" />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select v-model="form.sex" placeholder="请选择用户性别">
            <el-option
              v-for="dict in sexOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否代理商" prop="agentFlag">
          <el-select v-model="form.agentFlag" placeholder="请选择是否代理商" clearable size="small">
            <el-option
              v-for="dict in agentFlagOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="店主身份">
          <el-select v-model="form.relationId" placeholder="请选择店主身份识别号">
            <el-option
              v-for="dict in relationIdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店标识" prop="posterId">
          <el-input v-model="form.posterId" placeholder="请输入门店海报标识号" />
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
  import { listUser, getUser, delUser, addUser, updateUser, exportUser } from "@/api/share/user";

  export default {
    name: "User",
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
        // 用户信息表格数据
        userList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 用户类型字典
        userTypeOptions: [],
        // 用户性别字典
        sexOptions: [],
        // 帐号状态字典
        statusOptions: [],
        // 删除标志字典
        delFlagOptions: [],
        // 0未绑定 1 绑定 2帐号密码 10分享字典
        wxFlagOptions: [],
        // 店主身份识别号 10是 0不是字典
        relationIdOptions: [],
        //是否为代理商 10是 0不是字典
        agentFlagOptions:[],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:10,
          deptId: null,
          userName: null,
          nickName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: null,
          avatar: null,
          password: null,
          prov: null,
          city: null,
          county: null,
          status: null,
          loginIp: null,
          loginDate: null,
          companyId: null,
          accountingId: null,
          openId: null,
          wxFlag: null,
          recommendId: null,
          wxBind: null,
          agentFlag:null,
          relationId:null,
          posterId:null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          userName: [
            { required: true, message: "用户账号不能为空", trigger: "blur" }
          ],
          nickName: [
            { required: true, message: "用户昵称不能为空", trigger: "blur" }
          ],
          phonenumber: [
            { required: true, message: "手机号码不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      this.getList();
      this.getDicts("sys_user_type").then(response => {
        this.userTypeOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.sexOptions = response.data;
      });
      this.getDicts("sys_user_state").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("sys_user_state").then(response => {
        this.delFlagOptions = response.data;
      });
      this.getDicts("wx_state").then(response => {
        this.wxFlagOptions = response.data;
      });
      this.getDicts("invoic_flag").then(response => {
        this.relationIdOptions = response.data;
      });
      this.getDicts("invoic_flag").then(response => {
        this.agentFlagOptions = response.data;
      });

    },
    methods: {
      /** 查询用户信息列表 */
      getList() {
        this.loading = true;
        listUser(this.queryParams).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 用户类型字典翻译
      userTypeFormat(row, column) {
        return this.selectDictLabel(this.userTypeOptions, row.userType);
      },
      // 用户性别字典翻译
      sexFormat(row, column) {
        return this.selectDictLabel(this.sexOptions, row.sex);
      },
      // 帐号状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
      // 0未绑定 1 绑定 2帐号密码 10分享字典翻译
      wxFlagFormat(row, column) {
        return this.selectDictLabel(this.wxFlagOptions, row.wxFlag);
      },
      // 店主身份识别号 10是 20不是字典翻译
      relationIdFormat(row, column) {
        return this.selectDictLabel(this.relationIdOptions, row.relationId);
      },
      // 店主身份识别号 10是 20不是字典翻译
      agentFlagFormat(row, column) {
        return this.selectDictLabel(this.agentFlagOptions, row.agentFlag);
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          userId: null,
          deptId: null,
          userName: null,
          nickName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: null,
          avatar: null,
          password: null,
          prov: null,
          city: null,
          county: null,
          status: "0",
          delFlag: null,
          loginIp: null,
          loginDate: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          companyId: null,
          accountingId: null,
          openId: null,
          wxFlag: null,
          recommendId: null,
          remark: null,
          wxBind: null,
          relationId:null,
          posterId:null,
          agentFlag:null
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
        this.ids = selection.map(item => item.userId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加用户信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const userId = row.userId || this.ids
        getUser(userId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改用户信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.userId != null) {
              updateUser(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addUser(this.form).then(response => {
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
        const userIds = row.userId || this.ids;
        this.$confirm('是否确认删除用户信息编号为"' + userIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUser(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有用户信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportUser(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  };
</script>
