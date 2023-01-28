<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户姓名" prop="custName">
        <el-input
          v-model="queryParams.custName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="custPhone">
        <el-input
          v-model="queryParams.custPhone"
          placeholder="请输入客户联系方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称或关键字"
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
      <el-form-item label="需求类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择客户需求类型" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合作意向" prop="intention">
        <el-select v-model="queryParams.intention" placeholder="请选择合作商合作意向" clearable size="small">
          <el-option
            v-for="dict in intentionOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="需求描述" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入需求描述"
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
          v-hasPermi="['share:voicemessage:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:voicemessage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:voicemessage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:voicemessage:export']"
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

    <el-table v-loading="loading" :data="voicemessageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" min-width="20px" />
      <el-table-column label="是否跟进" align="center" prop="status" min-width="45px" :formatter="statusFormat" />
      <el-table-column label="客户姓名" align="center" prop="custName" min-width="45px" />
      <el-table-column label="联系方式" align="center" prop="custPhone" min-width="58px" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="省" align="center" prop="prov" min-width="40px" />
      <el-table-column label="市" align="center" prop="city"  min-width="40px"/>
      <el-table-column label="区" align="center" prop="county" min-width="40px" />
      <el-table-column label="需求类型" align="center" prop="type" :formatter="typeFormat"  min-width="60px"/>
      <el-table-column label="合作意向" align="center" prop="intention" :formatter="intentionFormat"  min-width="40px"/>
      <el-table-column label="需求描述" align="center" prop="content"/>
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="80px"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:voicemessage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:voicemessage:remove']"
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

    <!-- 添加或修改官网留言对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户姓名" prop="custName">
          <el-input v-model="form.custName" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户联系方式" prop="custPhone">
          <el-input v-model="form.custPhone" placeholder="请输入客户联系方式" />
        </el-form-item>
        <el-form-item label="公司名称或关键字" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称或关键字" />
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
        <el-form-item label="需求类型">
          <el-select v-model="form.type" placeholder="请选择客户需求类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作意向">
          <el-select v-model="form.intention" placeholder="请选择合作商合作意向">
            <el-option
              v-for="dict in intentionOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="需求描述" prop="content">
          <el-input v-model="form.content" placeholder="请输入需求描述" />
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
import { listVoicemessage, getVoicemessage, delVoicemessage, addVoicemessage, updateVoicemessage, exportVoicemessage } from "@/api/share/voicemessage";

export default {
  name: "Voicemessage",
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
      // 官网留言表格数据
      voicemessageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 客户需求类型10核名20合作商30公司注册40财税私人订制50联系我们字典
      typeOptions: [],
      // 合作商合作意向10代理商20合作商30服务商字典
      intentionOptions: [],
      // 删除状态0正常 1删除字典
      delFlagOptions: [],
      // 跟进状态 0 待跟进 10 已跟进
      statusOptions: [],


      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        custName: null,
        custPhone: null,
        companyName: null,
        prov: null,
        city: null,
        county: null,
        type: null,
        intention: null,
        content: null,
        delFlag: null,
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
    this.getDicts("cust_requirement_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("cooperation_intention").then(response => {
      this.intentionOptions = response.data;
    });
    this.getDicts("sys_user_state").then(response => {
      this.delFlagOptions = response.data;
    });
    this.getDicts("refer_relation").then(response => {
      this.statusOptions = response.data;
    });


  },
  methods: {
    /** 查询官网留言列表 */
    getList() {
      this.loading = true;
      listVoicemessage(this.queryParams).then(response => {
        this.voicemessageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 客户需求类型10公司注册与核名20合作商30财税私人订制40联系我们50股权转让字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 合作商合作意向10代理商20合作商30服务商字典翻译
    intentionFormat(row, column) {
      return this.selectDictLabel(this.intentionOptions, row.intention);
    },
    // 删除状态0正常 1删除字典翻译
    delFlagFormat(row, column) {
      return this.selectDictLabel(this.delFlagOptions, row.delFlag);
    },
    //跟进状态 0 待跟进 10 已跟进
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
        custName: null,
        custPhone: null,
        companyName: null,
        prov: null,
        city: null,
        county: null,
        type: null,
        intention: null,
        content: null,
        status: null,
        delFlag: null,
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
      this.title = "添加官网留言";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVoicemessage(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改官网留言";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVoicemessage(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addVoicemessage(this.form).then(response => {
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
      this.$confirm('是否确认删除官网留言编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delVoicemessage(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有官网留言数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportVoicemessage(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
