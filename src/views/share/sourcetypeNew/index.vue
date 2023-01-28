<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
     <el-form-item label="城市类型" prop="parentId">
        <el-select v-model="queryParams.parentId" placeholder="请选择城市类型" clearable size="small">
          <el-option
            v-for="dict in categoryCityOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
     <el-form-item label="商机类目" prop="categoryType">
        <el-select v-model="queryParams.categoryType" placeholder="请选择商机名称类目" clearable size="small">
          <el-option
            v-for="dict in categoryOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="商机价格" prop="categoryPrice">
        <el-input
          v-model="queryParams.categoryPrice"
          placeholder="请输入商机价格"
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
          v-hasPermi="['share:new:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:new:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:new:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:new:export']"
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

    <el-table v-loading="loading" :data="newList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="自增id" align="center" prop="id" />
      <el-table-column label="城市类型" align="center" prop="categoryCity" />
      <el-table-column label="商机类目" align="center" prop="categoryType" />
      <!-- <el-table-column label="商机类目代号" align="center" prop="cateTypeLv" /> -->
      <el-table-column label="商机细化类目标签" align="center" prop="content" />
      <el-table-column label="商机价格" align="center" prop="categoryPrice" />
      <el-table-column label="起充条数" align="center" prop="startCondition" />
      <el-table-column label="满送详情介绍" align="center" prop="setMeal" />
      <el-table-column label="增值服务类目" align="center" prop="valueAdd" />
      <!-- <el-table-column label="商机分类父id" align="center" prop="parentId" /> -->
      <el-table-column label="创建时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:new:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:new:remove']"
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

    <!-- 添加或修改商机类型（6.7新的）对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="城市类型" prop="categoryCity">
          <el-select v-model="form.categoryCity" placeholder="请选择城市类型" >
            <el-option
              v-for="dict in categoryCityOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商机类目" prop="categoryType">
          <el-select v-model="form.categoryType" placeholder="请选择商机类目" >
            <el-option
              v-for="dict in categoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="商机类目代号" prop="cateTypeLv">
          <el-input v-model="form.cateTypeLv" placeholder="请输入商机类目代号" />
        </el-form-item> -->
        <el-form-item label="商机细化类目标签" prop="content">
          <el-input v-model="form.content" placeholder="请输入商机细化类目标签" />
        </el-form-item>
        <el-form-item label="商机价格" prop="categoryPrice">
          <el-input v-model="form.categoryPrice" placeholder="请输入商机价格" />
        </el-form-item>
        <el-form-item label="起充条数" prop="startCondition">
          <el-input v-model="form.startCondition" placeholder="请输入起充条数" />
        </el-form-item>
        <el-form-item label="满送详情" prop="setMeal">
          <el-input v-model="form.setMeal" placeholder="请输入满送详情介绍 例如:10000送800" />
        </el-form-item>
        <el-form-item label="增值服务" prop="valueAdd">
          <el-input v-model="form.valueAdd" placeholder="请输入增值服务" />
        </el-form-item>
        <!-- <el-form-item label="商机分类父id" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入商机分类父id" />
        </el-form-item> -->
        <!-- <el-form-item label="创建时间" prop="createDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="更新时间" prop="updateDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
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
import { listNew, getNew, delNew, addNew, updateNew, exportNew } from "@/api/share/sourcetypeNew.js";

export default {
  name: "New",
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
      // 商机类型（6.7新的）表格数据
      newList: [],
      // 城市类型字典
      categoryCityOptions: [],
      // 商机类目字典
      categoryOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        categoryCity: null,
        categoryType: null,
        cateTypeLv: null,
        content: null,
        categoryPrice: null,
        startCondition: null,
        setMeal: null,
        valueAdd: null,
        parentId: null,
        createDate: null,
        updateDate: null,
        remarks: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        categoryCity:[
           { required: true, message: '城市类型不能为空', trigger: 'blur' }
        ],
        categoryType:[
          { required: true, message: '商机类目不能为空', trigger: 'change' }
        ],
        content:[
          { required: true, message: '类目标签不能为空', trigger: 'blur' }
        ],
        categoryPrice:[
          { required: true, message: '商机价格不能为空', trigger: 'blur' }
        ],
        startCondition:[
          { required: true, message: '起充条数不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("city_category").then(response => {
      this.categoryCityOptions = response.data;
    });
    this.getDicts("category_type_new").then(response => {
      this.categoryOptions = response.data;
    });
  },
  methods: {
    /** 查询商机类型（6.7新的）列表 */
    getList() {
      this.loading = true;
      listNew(this.queryParams).then(response => {
        this.newList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 城市类型字典翻译
    categoryCityFormat(row, column) {
      return this.selectDictLabel(this.categoryCityOptions, row.categoryCity);
    },
    // 商机类目字典翻译
    categoryFormat(row, column) {
      return this.selectDictLabel(this.categoryOptions, row.categoryType);
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
        categoryCity: null,
        categoryType: null,
        cateTypeLv: null,
        content: null,
        categoryPrice: null,
        startCondition: null,
        setMeal: null,
        valueAdd: null,
        parentId: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null
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
      this.title = "添加商机类型(新)";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNew(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商机类型(新)";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateNew(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addNew(this.form).then(response => {
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
      this.$confirm('是否确认删除商机类型(新)编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNew(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有商机类型(新)数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportNew(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
