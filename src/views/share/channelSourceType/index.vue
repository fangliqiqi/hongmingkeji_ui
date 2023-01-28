<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
       <el-form-item label="合作商" prop="companyId">
        <el-select
          v-model="queryParams.companyId"
          placeholder="请输入合作商名称"
          remote
          clearable
          size="small"
          filterable
          reserve-keyword
          @change="changeId"
          :remote-method="remoteMethod"
          :loading="loading"
          >
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    
     
      <el-form-item label="审核状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in stateOptions"
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
          v-hasPermi="['share:channelSourceType:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:channelSourceType:edit']"
        >修改</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:channelSourceType:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:channelSourceType:export']"
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

    <el-table v-loading="loading" :data="channelSourceTypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="数据id" align="center" prop="id" />

      <!-- <el-table-column label="加盟商id" align="center" prop="companyId" /> -->
       <el-table-column label="合作商" align="center" prop="companyName"/>
      <el-table-column label="已持有商机" align="center" prop="sourceOptionsStr"/>
      <el-table-column label="待生效商机" align="center" prop="updateOptionsStr"/>
      <el-table-column label="已购商机" align="center" prop="payOptionsStr"/>

      <!-- <el-table-column label="商机类目级别id(多个商机类型标识)" align="center" prop="sourceTypeOptions" />
      <el-table-column label="今日更新的多个商机类型标识" align="center" prop="updateTypeOptions" />
   
      <el-table-column label="已购买过的 类目标签" align="center" prop="payOptions" />
      <el-table-column label="删除新增状态" align="center" prop="deleType" /> -->
         <el-table-column label="商机审核状态" align="center" prop="state" :formatter="stateFormat" />
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
            v-hasPermi="['share:channelSourceType:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:channelSourceType:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改商机类型中间对话框
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="加盟商id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入加盟商id" />
        </el-form-item>
        <el-form-item label="商机类目级别id(多个商机类型标识)" prop="sourceTypeOptions">
          <el-input v-model="form.sourceTypeOptions" placeholder="请输入商机类目级别id(多个商机类型标识)" />
        </el-form-item>
        <el-form-item label="今日更新的多个商机类型标识" prop="updateTypeOptions">
          <el-input v-model="form.updateTypeOptions" placeholder="请输入今日更新的多个商机类型标识" />
        </el-form-item>
        <el-form-item label="状态0审核通过  1审核未通过 2审核中">
          <el-select v-model="form.state" placeholder="请选择状态0审核通过  1审核未通过 2审核中">
            <el-option
              v-for="dict in stateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已购买过的 类目标签" prop="payOptions">
          <el-input v-model="form.payOptions" placeholder="请输入已购买过的 类目标签" />
        </el-form-item>
        <el-form-item label="删除新增状态">
          <el-select v-model="form.deleType" placeholder="请选择删除新增状态">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->
  

  <!-- 添加或修改商机类型中间对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :destroy-on-close="true" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">

        <el-form-item label="手机号码" prop="phonenumber" v-if="!form.id">
          <el-input v-model="form.phonenumber" placeholder="请输入手机号码" :disabled="!!form.id" maxlength="11"/>
        </el-form-item>
        <el-form-item label="合作商" prop="companyName" v-if="!!form.id">
          <el-input v-model="form.companyName" placeholder="请输入合作商" :disabled="true"/>
        </el-form-item>

        <el-form-item label="已持有商机"  v-if="!!form.id">
          <el-input v-model="form.sourceOptionsStr" :disabled="true"/>
        </el-form-item>

        <el-form-item label="待生效商机"  v-if="!!form.id">
          <el-input v-model="form.updateOptionsStr" :disabled="true"/>
        </el-form-item>
        <el-form-item label="已购商机"  v-if="!!form.id">
          <el-input v-model="form.payOptionsStr" :disabled="true"/>
        </el-form-item>
        <el-form-item label="商机类目" prop="updateTypeOptions">
          <el-checkbox-group   v-model="updateTypeOptions" @change="checkBoxChange" >
            <el-checkbox v-for="item in sourceTypeList" :key="item.id" :label="item.cateTypeLv" :checked="item.checked">{{item.categoryType}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="审核状态" v-if="!!form.id">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option
              v-for="dict in stateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注"/>
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
import { listChannelSourceType, getChannelSourceType, delChannelSourceType, addChannelSourceType, updateChannelSourceType, exportChannelSourceType,getCompanyList,rzCompanyType } from "@/api/share/channelSourceType";

export default {
  name: "ChannelSourceType",
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
      // 商机类型中间表格数据
      channelSourceTypeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态0审核通过  1审核未通过 2审核中字典
      stateOptions: [],
      sourceTypeList:[],
      categoryOptions:[],
        updateTypeOptions:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        companyId: null,
        sourceTypeOptions: null,
        updateTypeOptions: null,
        state: null,
        companyName:null,
        payOptions: null,
        deleType: null,
        createDate: null,
        updateDate: null,
        remarks: null
      },
      querComParams: {
          createDate: null
        },
      companyOptions:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyId: [
          { required: true, message: "合作商id不能为空", trigger: "blur" }
        ],
         phonenumber:[
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            {min:11,max:11,message:'手机号格式错误',trigger:'blur'}
          ],
          updateTypeOptions:[
            { required: true, message: '请选择商机目录', trigger: 'blur' }
          ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sjsh_state").then(response => {
      this.stateOptions = response.data;
    });
      this.getDicts("category_type").then(response => {
        this.categoryOptions = response.data;
        this.sourceTypeList = this.categoryOptions.map((e)=>{
          let temp = {}
          temp.checked = false;
          temp.categoryType = e.dictLabel;
          temp.cateTypeLv = e.dictValue;
          return temp;
        })
      });
  },
  methods: {
    /** 查询商机类型中间列表 */
    getList() {
      this.loading = true;
      listChannelSourceType(this.queryParams).then(response => {
        this.channelSourceTypeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
        rzCompanyType(this.querComParams).then(response => {
          // this.rzCompanyList = response.rows
          // this.total = response.total
          // this.loading = false
        })
    },
    // 状态0审核通过  1审核未通过 2审核中字典翻译
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
        companyId: null,
        sourceTypeOptions: null,
        updateTypeOptions: null,
        state: null,
        companyName:null,
        payOptions: null,
        deleType: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null
      };
         this.updateTypeOptions=[];
      this.resetForm("form");
    },

      // 远程搜索
      changeId(value){
        // console.log(value)
        this.queryParams.companyId = value;
      },
       remoteMethod(query) {
        // console.log(query)
        let that = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            // this.companyOptions = this.list.filter(item => {
            //   return item.label.toLowerCase()
            //     .indexOf(query.toLowerCase()) > -1;
            // });
            getCompanyList({companyName:query}).then((res)=>{
              // console.log(res)
              if(res.code==200){
                this.companyOptions = res.rows||[];
              }
              console.info(res)
            }).catch((err)=>{
            })
          }, 200);
        } else {
          this.companyOptions = [];
        }
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
      this.title = "添加商机类型中间";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChannelSourceType(id).then(response => {
        this.form = response.data;
         let sourceTypeOptions = response.data.sourceTypeOptions
          if(sourceTypeOptions){
            let sourceTypeTemp =  sourceTypeOptions.split(',');
            this.updateTypeOptions = sourceTypeTemp;
          }
        this.open = true;
        this.title = "修改商机类型中间";
      });
    },
    /** 提交按钮 */
    submitForm() {
       this.form.updateTypeOptions = this.updateTypeOptions.join(",");
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChannelSourceType(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addChannelSourceType(this.form).then(response => {
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
      this.$confirm('是否确认删除商机类型中间编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delChannelSourceType(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有商机类型中间数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportChannelSourceType(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
     checkBoxChange:function(e) {
        console.info(arguments)
      }
  }
};
</script>
