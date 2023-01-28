<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="活动推广表id" prop="activityId">
        <el-input
          v-model="queryParams.activityId"
          placeholder="请输入活动推广表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需要填写材料名称" prop="material">
        <el-input
          v-model="queryParams.material"
          placeholder="请输入需要填写材料名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否需要上传资料开关" prop="uploadingSwitch">
        <el-select v-model="queryParams.uploadingSwitch" placeholder="请选择是否需要上传资料开关" clearable size="small">
          <el-option
            v-for="dict in uploadingSwitchOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上传资料类型(uploading_switch = 20 开启单选框图片" prop="switchType">
        <el-select v-model="queryParams.switchType" placeholder="请选择上传资料类型(uploading_switch = 20 开启单选框图片" clearable size="small">
          <el-option
            v-for="dict in switchTypeOptions"
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
          v-hasPermi="['share:datum:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:datum:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:datum:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:datum:export']"
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

    <el-table v-loading="loading" :data="datumList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键递增id" align="center" prop="id" />
      <el-table-column label="活动推广表id" align="center" prop="activityId" />
      <el-table-column label="需要填写材料名称" align="center" prop="material" />
      <el-table-column label="是否需要上传资料开关" align="center" prop="uploadingSwitch" :formatter="uploadingSwitchFormat" />
      <el-table-column label="上传资料类型(uploading_switch = 20 开启单选框图片" align="center" prop="switchType" :formatter="switchTypeFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:datum:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:datum:remove']"
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

    <!-- 添加或修改购买活动单填写资料信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动推广表id" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动推广表id" />
        </el-form-item>
        <el-form-item label="需要填写材料名称" prop="material">
          <el-input v-model="form.material" placeholder="请输入需要填写材料名称" />
        </el-form-item>
        <el-form-item label="是否需要上传资料开关">
          <el-radio-group v-model="form.uploadingSwitch">
            <el-radio
              v-for="dict in uploadingSwitchOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传资料类型(uploading_switch = 20 开启单选框图片">
          <el-select v-model="form.switchType" placeholder="请选择上传资料类型(uploading_switch = 20 开启单选框图片">
            <el-option
              v-for="dict in switchTypeOptions"
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
import { listDatum, getDatum, delDatum, addDatum, updateDatum, exportDatum } from "@/api/share/datum";

export default {
  name: "Datum",
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
      // 购买活动单填写资料信息表格数据
      datumList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否需要上传资料开关字典
      uploadingSwitchOptions: [],
      // 上传资料类型(uploading_switch = 20 开启单选框图片字典
      switchTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        activityId: null,
        material: null,
        uploadingSwitch: null,
        switchType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        activityId: [
          { required: true, message: "活动推广表id不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("foupr_form_datum_uploading_switch").then(response => {
      this.uploadingSwitchOptions = response.data;
    });
    this.getDicts("foupr_form_datum_switch_type").then(response => {
      this.switchTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询购买活动单填写资料信息列表 */
    getList() {
      this.loading = true;
      listDatum(this.queryParams).then(response => {
        this.datumList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 是否需要上传资料开关字典翻译
    uploadingSwitchFormat(row, column) {
      return this.selectDictLabel(this.uploadingSwitchOptions, row.uploadingSwitch);
    },
    // 上传资料类型(uploading_switch = 20 开启单选框图片字典翻译
    switchTypeFormat(row, column) {
      return this.selectDictLabel(this.switchTypeOptions, row.switchType);
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
        activityId: null,
        material: null,
        uploadingSwitch: "0",
        switchType: null,
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
      this.title = "添加购买活动单填写资料信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDatum(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改购买活动单填写资料信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDatum(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDatum(this.form).then(response => {
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
      this.$confirm('是否确认删除购买活动单填写资料信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDatum(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有购买活动单填写资料信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDatum(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
