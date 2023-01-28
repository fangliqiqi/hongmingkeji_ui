<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="guidePrice">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
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
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['share:AgentBusinessType:add']"-->
      <!--        >新增</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['share:AgentBusinessType:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['share:AgentBusinessType:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:AgentBusinessType:export']"
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

    <el-table v-loading="loading" :data="tableData"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!--      <el-table-column type="selection" width="55" align="center" />-->
<!--            <el-table-column label="主键id" align="center" prop="id" width="180"/>-->
      <el-table-column label="姓名" align="left" prop="nickName" min-width="180"/>
      <el-table-column label="下级数量" align="left" prop="subNumber" min-width="180"/>
      <el-table-column label="手机号码" align="center" prop="phonenumber" min-width="180"/>
      <el-table-column label="省" align="center" prop="prov" min-width="180"/>
      <el-table-column label="市" align="center" prop="city" min-width="180"/>
      <el-table-column label="县区" align="center" prop="county" min-width="180"/>
      <el-table-column label="成单数量" align="center" prop="orderNumber" min-width="180"/>
<!--      <el-table-column label="成单数量" align="center" prop="children" >-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.children[0].nickName}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['share:AgentBusinessType:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['share:AgentBusinessType:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改业务名称指导价设置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="业务名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="指导价格" prop="guidePrice">
          <el-input v-model="form.guidePrice" placeholder="请输入指导价格" />
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
  import { listAgentBusinessType, getAgentBusinessType, delAgentBusinessType, addAgentBusinessType, updateAgentBusinessType, exportAgentBusinessType } from "@/api/share/threeAgent/AgentBusinessType";
  import {agentUserList} from "@/api/share/threeAgent/subordinate";
  export default {
    name: "Subordinate",
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
        // 业务名称指导价设置表格数据
        AgentBusinessTypeList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:10,
          name: null,
          guidePrice: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        },
        tableData: [],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询业务名称指导价设置列表 */
      getList() {
        this.loading = true;
        let i = 1;
        agentUserList(this.queryParams).then(response => {
          this.tableData = response.rows.map(item=>{
            let temp = {
              id:i++,
              nickName:item.nickName,
              subNumber:item.subNumber,
              phonenumber:item.phonenumber,
              prov:item.prov,
              city:item.city,
              county:item.county,
              orderNumber:item.orderNumber,
              children: item.subordinateUserList != null ? item.subordinateUserList.map(items=>{
                let aobj = {
                  id:i++,
                  nickName:items.nickName,
                  subNumber:item.subNumber,
                  phonenumber:items.phonenumber,
                  prov:items.prov,
                  city:items.city,
                  county:items.county,
                  orderNumber:items.orderNumber
                }
                return aobj
              }):{},
              // hasChildren:true
            }
            return temp
          });
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
          name: null,
          guidePrice: null
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
        this.title = "添加业务名称指导价设置";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getAgentBusinessType(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改业务名称指导价设置";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateAgentBusinessType(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addAgentBusinessType(this.form).then(response => {
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
        this.$confirm('是否确认删除业务名称指导价设置编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAgentBusinessType(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有业务名称指导价设置数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportAgentBusinessType(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  };
</script>
