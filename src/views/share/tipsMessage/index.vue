<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主题" prop="tipsTitle">
        <el-input
          v-model="queryParams.tipsTitle"
          placeholder="请输入tips主题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内容" prop="tipsContent">
        <el-input
          v-model="queryParams.tipsContent"
          placeholder="请输入tips内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属类别" prop="tipsType">
        <el-select v-model="queryParams.tipsType" placeholder="请选择tips所属类别" clearable size="small">
          <el-option
            v-for="dict in tipsTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="tipsFlag">
        <el-select v-model="queryParams.tipsFlag" placeholder="请选择状态 10启用 1关闭" clearable size="small">
          <el-option
            v-for="dict in tipsFlagOptions"
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
          v-hasPermi="['share:tipsMessage:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:tipsMessage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:tipsMessage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:tipsMessage:export']"
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

    <el-table v-loading="loading" :data="tipsMessageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="tips主题" align="center" prop="tipsTitle" />
      <el-table-column label="tips内容" align="center" prop="tipsContent" />
      <el-table-column label="tips类别" align="center" prop="tipsType" :formatter="tipsTypeFormat" />
      <el-table-column label="tips状态" align="center" prop="tipsFlag" :formatter="tipsFlagFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:tipsMessage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:tipsMessage:remove']"
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

    <!-- 添加或修改登录小提示对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="tips主题" prop="tipsTitle">
          <el-input v-model="form.tipsTitle" placeholder="请输入tips主题" />
        </el-form-item>
        <el-form-item label="tips内容" prop="tipsContent">
          <textarea v-model="form.tipsContent" placeholder="请输入tips内容" cols="51" rows="5" />
        </el-form-item>
        <el-form-item label="tips类别">
          <el-select v-model="form.tipsType" placeholder="请选择tips所属类别">
            <el-option
              v-for="dict in tipsTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="tips状态">
          <el-radio-group v-model="form.tipsFlag">
            <el-radio
              v-for="dict in tipsFlagOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
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
import { listTipsMessage, getTipsMessage, delTipsMessage, addTipsMessage, updateTipsMessage, exportTipsMessage } from "@/api/share/tipsMessage";

export default {
  name: "TipsMessage",
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
      // 登录小提示表格数据
      tipsMessageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // tips所属类别字典
      tipsTypeOptions: [],
      // 状态 10启用 1关闭字典
      tipsFlagOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        tipsTitle: null,
        tipsContent: null,
        tipsType: null,
        tipsFlag: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("tips_message_type").then(response => {
      this.tipsTypeOptions = response.data;
    });
    this.getDicts("sys_notice_status").then(response => {
      this.tipsFlagOptions = response.data;
    });
  },
  methods: {
    /** 查询登录小提示列表 */
    getList() {
      this.loading = true;
      listTipsMessage(this.queryParams).then(response => {
        this.tipsMessageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // tips所属类别字典翻译
    tipsTypeFormat(row, column) {
      return this.selectDictLabel(this.tipsTypeOptions, row.tipsType);
    },
    // 状态 0启用 1关闭字典翻译
    tipsFlagFormat(row, column) {
      return this.selectDictLabel(this.tipsFlagOptions, row.tipsFlag);
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
        tipsTitle: null,
        tipsContent: null,
        tipsType: null,
        tipsFlag: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.title = "添加登录tips";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTipsMessage(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改登录tips";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTipsMessage(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addTipsMessage(this.form).then(response => {
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
      this.$confirm('是否确认删除登录tips编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTipsMessage(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有登录tips数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTipsMessage(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
