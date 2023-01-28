<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="手机号码" prop="userId">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务类型" prop="category">
        <el-select v-model="queryParams.category" placeholder="请选择业务类型,1.会计上门 2.财务外包 3.税务筹划" clearable size="small">
          <el-option
            v-for="dict in categoryOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="有效状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择推荐是否有效 1有效 2无效" clearable size="small">
          <el-option
            v-for="dict in stateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="跟进状态" prop="followState">
        <el-select v-model="queryParams.followState" placeholder="请选择跟进状态 10已跟进 0待跟进" clearable size="small">
          <el-option
            v-for="dict in followStateOptions"
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
      <!--<el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:relation:add']"
        >新增</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:relation:edit']"
        >修改</el-button>
      </el-col>
     <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:relation:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:relation:export']"
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

    <el-table v-loading="loading" :data="relationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户姓名" align="center" prop="nickName" />
      <el-table-column label="手机号码" align="center" prop="phonenumber" />
      <el-table-column label="业务类型" align="center" prop="category" :formatter="categoryFormat" />
      <el-table-column label="有效状态" align="center" prop="state" :formatter="stateFormat" />
      <el-table-column label="跟进状态" align="center" prop="followState" :formatter="followStateFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:relation:edit']"
          >修改</el-button>
          <el-button
            disabled="disabled"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:relation:remove']"
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

    <!-- 添加或修改推荐人关系信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" disabled="disabled" />
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.category" placeholder="请选择业务类型,1.会计上门 2.财务外包 3.税务筹划">
            <el-option
              v-for="dict in categoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效状态">
          <el-select v-model="form.state" placeholder="请选择推荐是否有效 10有效 20无效 0审核中">
            <el-option
              v-for="dict in stateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
       <!-- <el-form-item label="跟进状态">
          <el-select v-model="form.followState" placeholder="请选择跟进状态 10已跟进 0待跟进">
            <el-option
              v-for="dict in followStateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listRelation, getRelation, delRelation, addRelation, updateRelation, exportRelation } from "@/api/share/relation";

  export default {
    name: "Relation",
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
        // 推荐人关系信息表格数据
        relationList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 业务类型,1.会计上门 2.财务外包 3.税务筹划字典
        categoryOptions: [],
        // 推荐是否有效 10有效 20无效 0审核中字典
        stateOptions: [],
        // 跟进状态 10已跟进 0待跟进字典
        followStateOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          recommendId: null,
          category: null,
          state: null,
          followState: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          recommendId: [
            { required: true, message: "推荐人的userId不能为空", trigger: "blur" }
          ],
          category: [
            { required: true, message: "业务类型,1.会计上门 2.财务外包 3.税务筹划不能为空", trigger: "blur" }
          ],
          state: [
            { required: true, message: "推荐是否有效 10有效 20无效 0审核中不能为空", trigger: "blur" }
          ],
          followState: [
            { required: true, message: "跟进状态 10已跟进 0待跟进不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      this.getList();
      this.getDicts("share_category").then(response => {
        this.categoryOptions = response.data;
      });
      this.getDicts("refer_state").then(response => {
        this.stateOptions = response.data;
      });
      this.getDicts("refer_relation").then(response => {
        this.followStateOptions = response.data;
      });
    },
    methods: {
      /** 查询推荐人关系信息列表 */
      getList() {
        this.loading = true;
        listRelation(this.queryParams).then(response => {
          this.relationList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 业务类型,1.会计上门 2.财务外包 3.税务筹划字典翻译
      categoryFormat(row, column) {
        return this.selectDictLabel(this.categoryOptions, row.category);
      },
      // 推荐是否有效 1有效 2无效字典翻译
      stateFormat(row, column) {
        return this.selectDictLabel(this.stateOptions, row.state);
      },
      // 跟进状态 10已跟进 0待跟进字典翻译
      followStateFormat(row, column) {
        return this.selectDictLabel(this.followStateOptions, row.followState);
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
          recommendId: null,
          category: null,
          state: null,
          followState: null,
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
        this.ids = selection.map(item => item.recommendId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加推荐人关系信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const userId = row.userId || this.ids
        getRelation(userId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改推荐人关系信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.recommendId != null) {
              updateRelation(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addRelation(this.form).then(response => {
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
        const recommendIds = row.recommendId || this.ids;
        this.$confirm('是否确认删除推荐人关系信息编号为"' + recommendIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRelation(recommendIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有推荐人关系信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRelation(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  };
</script>
