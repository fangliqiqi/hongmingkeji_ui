<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="receivingList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="主键id" align="center" prop="id" />-->
      <el-table-column label="消息标题" align="center" prop="title" min-width="120"/>
      <el-table-column label="消息类型" align="center" prop="messageType" :formatter="messageTypeFormat" min-width="80"/>
      <el-table-column label="消息内容" align="center" prop="msgcontent" min-width="300"/>
      <el-table-column label="发送时间" align="center" prop="createTime" min-width="120"/>
      <el-table-column label="信息来源" align="center" prop="sourse" min-width="120"/>
      <!--      <el-table-column label="是否接收" align="center" prop="receive" :formatter="receiveFormat" />-->
      <!--      <el-table-column label="是否查看" align="center" prop="state" :formatter="stateFormat" />-->
      <el-table-column label="消息接收人" align="center" prop="recipientId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" v-if="false">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:receiving:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:receiving:remove']"
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

  </div>
</template>

<script>
import { listReceiving, getReceiving, delReceiving, addReceiving, updateReceiving, exportReceiving } from "@/api/share/receiving";

export default {
  name: "Receiving",
  props: {
    mtype: {
      type: String,
      default: '0'
    }
  },
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
      // 消息下发记录表格数据
      receivingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 消息类型字典
      messageTypeOptions: [],
      // 是否接收成功字典
      receiveOptions: [],
      // 是否查看标识字典
      stateOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        sourse: null,
        messageType: null,
        msgcontent: null,
        receive: null,
        state: null,
        title: null,
        recipientId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        messageType: [
          { required: true, message: "消息类型（0系统提示，10商机提示。20代理商更新，30活动购买，40业务下发）不能为空", trigger: "blur" }
        ],
        msgcontent: [
          { required: true, message: "消息内容不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "消息标题不能为空", trigger: "blur" }
        ],
        recipientId: [
          { required: true, message: "消息接收人id不能为空", trigger: "blur" }
        ],
        createBy: [
          { required: true, message: "创建人发送人id不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.queryParams.messageType = this.mtype;
    this.getList();
    this.getDicts("message_type").then(response => {
      this.messageTypeOptions = response.data;
    });
    this.getDicts("message_receive").then(response => {
      this.receiveOptions = response.data;
    });
    this.getDicts("message_state").then(response => {
      this.stateOptions = response.data;
    });
  },
  watch: {
    mtype: function(t){
      this.queryParams.messageType = t;
      this.getList();
    }
  },
  methods: {
    /** 查询消息下发记录列表 */
    getList() {
      this.loading = true;
      listReceiving(this.queryParams).then(response => {
        this.receivingList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 消息类型字典翻译
    messageTypeFormat(row, column) {
      return this.selectDictLabel(this.messageTypeOptions, row.messageType);
    },
    // 是否接收成功字典翻译
    receiveFormat(row, column) {
      return this.selectDictLabel(this.receiveOptions, row.receive);
    },
    // 是否查看标识字典翻译
    stateFormat(row, column) {
      return this.selectDictLabel(this.stateOptions, row.state);
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
        sourse: null,
        messageType: null,
        msgcontent: null,
        target: null,
        infosourceip: null,
        receive: null,
        state: null,
        title: null,
        recipientId: null,
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
      this.title = "添加消息下发记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getReceiving(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改消息下发记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateReceiving(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addReceiving(this.form).then(response => {
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
      this.$confirm('是否确认删除消息下发记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delReceiving(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有消息下发记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportReceiving(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
