<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="90px">
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卡券ID" prop="cardId">
        <el-input
          v-model="queryParams.cardId"
          placeholder="请输入卡券ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="购买时间" prop="buyTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.buyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择购买时间">
        </el-date-picker>
      </el-form-item> -->

      <!-- <el-form-item label="有效起始时间" prop="startTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择有效起始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="有效结束时间" prop="endTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择有效结束时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="是否过期" prop="isPastDue">
        <el-select v-model="queryParams.isPastDue" placeholder="请选择是否过期" style="width:100%">
          <el-option
            v-for="dict in cardpastOption"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="卡券业务是否全部使用完毕1未全部使用,2已全部使用" prop="isUseUp">
        <el-input
          v-model="queryParams.isUseUp"
          placeholder="请输入卡券业务是否全部使用完毕1未全部使用,2已全部使用"
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
          v-hasPermi="['share:userCard:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:userCard:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:userCard:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:userCard:export']"
        >导出</el-button>
      </el-col> -->
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="userCardList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键ID" align="center" prop="id" /> -->
      <el-table-column label="卡券ID" align="center" prop="cardId" />
      <el-table-column label="套餐类型" align="center" prop="cardName" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="卖家ID" align="center" prop="sellerId " />
      <el-table-column label="卖家姓名" align="center" prop="sellerName" />
      <el-table-column label="购买时间" align="center" prop="buyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.buyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买数量" align="center" prop="buyNumber" />
      <el-table-column label="有效起始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否过期" align="center" prop="isPastDue" :formatter="cardPastFormat"/>
      <!-- <el-table-column label="卡券业务是否全部使用完毕1未全部使用,2已全部使用" align="center" prop="isUseUp" /> -->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:userCard:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:userCard:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改用户卡券(未激活)对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="卡券ID" prop="cardId">
          <el-input v-model="form.cardId" placeholder="请输入卡券ID" />
        </el-form-item>
        <el-form-item label="购买时间" prop="buyTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.buyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择购买时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="购买数量" prop="buyNumber">
          <el-input v-model="form.buyNumber" placeholder="请输入购买数量" />
        </el-form-item>
        <el-form-item label="有效起始时间" prop="startTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择有效起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="有效结束时间" prop="endTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择有效结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否过期1未过期,2已过期" prop="isPastDue">
          <el-input v-model="form.isPastDue" placeholder="请输入是否过期1未过期,2已过期" />
        </el-form-item>
        <el-form-item label="卡券业务是否全部使用完毕1未全部使用,2已全部使用" prop="isUseUp">
          <el-input v-model="form.isUseUp" placeholder="请输入卡券业务是否全部使用完毕1未全部使用,2已全部使用" />
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
import { listUserCard, getUserCard, delUserCard, addUserCard, updateUserCard, exportUserCard } from "@/api/share/userCard";

export default {
  name: "UserCard",
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
      // 用户卡券(未激活)表格数据
      userCardList: [],
      // 卡券过期 1.未过期 2.已过期
      cardpastOption:[],

      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        userId: null,
        cardId: null,
        buyTime: null,
        buyNumber: null,
        startTime: null,
        endTime: null,
        isPastDue: null,
        isUseUp: null
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
    // 字典 卡券过期状态
    this.getDicts("card_past_due").then(response => {
      this.cardpastOption = response.data;
    });
  },
  methods: {
    /** 查询用户卡券(未激活)列表 */
    getList() {
      this.loading = true;
      listUserCard(this.queryParams).then(response => {
        this.userCardList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 字典翻译
    cardPastFormat(row, column) {
      return this.selectDictLabel(this.cardpastOption, row.isPastDue);
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
        cardId: null,
        buyTime: null,
        buyNumber: null,
        startTime: null,
        endTime: null,
        isPastDue: null,
        isUseUp: null
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
      this.title = "添加用户卡券(未激活)";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUserCard(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户卡券(未激活)";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUserCard(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUserCard(this.form).then(response => {
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
      this.$confirm('是否确认删除用户卡券(未激活)编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUserCard(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户卡券(未激活)数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportUserCard(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
