<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

    </el-form>

    <el-row :gutter="10" class="mb8">
     <!-- <el-col :span="1.5">
       <el-button
         type="success"
         icon="el-icon-edit"
         size="mini"
         :disabled="single"
         @click="handleUpdate"
         v-hasPermi="['share:companyAgeSouType:edit']"
       >修改
       </el-button>
     </el-col> -->

      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
        </el-tooltip>

      </div>
    </el-row>

    <el-table v-loading="loading" :data="agnetTypeList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column label="已持有商机" align="center" prop="sourceOptionsStr"/>
      <el-table-column label="待生效商机" align="center" prop="updateOptionsStr"/>
      <el-table-column label="已购商机" align="center" prop="payOptionsStr"/>
      <el-table-column label="商机审核状态" align="center" prop="state" :formatter="stateFormat"/>
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
<!--      <el-table-column label="备注" align="center" prop="remarks"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:companyAgeSouType:edit']"
          >修改
          </el-button>

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

    <!-- 添加或修改商机类型中间对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="680px" append-to-body :close-on-click-modal="false">

      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="合作商id" prop="companyId" style="display:none">
          <el-input v-model="form.companyId"/>
        </el-form-item>
        <el-form-item label="" prop="sourceTypeOptions" style="display:none">
          <el-input v-model="form.sourceTypeOptions"/>
        </el-form-item>
<!--        <el-form-item label="" prop="updateTypeOptions" style="display:none">-->
<!--          <el-input v-model="form.updateTypeOptions"/>-->
<!--        </el-form-item>-->
        <el-form-item label="已持有商机" prop="sourceOptionsStr">
          <el-input v-model="form.sourceOptionsStr" placeholder="请输入待生效商机" auto-complete="off" :disabled="true"/>
        </el-form-item>

        <el-form-item label="待生效商机" prop="updateOptionsStr">
          <el-input v-model="form.updateOptionsStr" placeholder="请输入待生效商机" auto-complete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="已购商机" prop="payOptionsStr">
          <el-input v-model="form.payOptionsStr" placeholder="您还没有购买商机" auto-complete="off" :disabled="true"/>
        </el-form-item>

        <el-form-item label="审核状态">
          <el-select v-model="form.state" placeholder="请选择状态" auto-complete="off" :disabled="true">
            <el-option
              v-for="dict in stateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="可选商机类目">
          <el-checkbox-group   v-model="updateTypeOptions" @change="checkBoxChange">
            <el-checkbox v-for="item in sourceTypeList" :key="item.id" :label="item.cateTypeLv" :checked="item.checked">{{item.categoryType}}</el-checkbox>
          </el-checkbox-group>
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
  import { listAgnetType, getAgnetType, updateAgnetType, sourceTypeList } from '@/api/share/companyAgeSouType'

  export default {
    name: 'AgnetType',
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
        agnetTypeList: [],
        //代理商信息列表
        rzCompanyList: [],
        //商机类目
        sourceTypeList: [],
        categoryOptions:[],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 状态0审核通过  1 审核未通过,2审核中字典
        stateOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          companyId: null,
          updateTypeOptions: [],
          sourceTypeOptions: null,
          state: null,
          deleType: null,
          createDate: null,
          updateDate: null,
          remarks: null
        },
        querComParams: {
          createDate: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          companyId: [
            { required: true, message: '合作商id不能为空', trigger: 'blur' }
          ]
        },
        updateTypeOptions: [],
      }
    },
    created() {
      this.getList()
      this.getDicts('sjsh_state').then(response => {
        this.stateOptions = response.data
      })
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
        this.loading = true
        listAgnetType(this.queryParams).then(response => {
          this.agnetTypeList = response.rows
          this.total = response.total
          this.loading = false
        })
        // sourceTypeList().then(response => {
        //   this.sourceTypeList = this.categoryOptions.map((e)=>{
        //     let temp = {}
        //     temp.checked = false;
        //     temp.categoryType = e.dictLabel;
        //     temp.cateTypeLv = e.dictValue;
        //     return temp;
        //   })
        //
        // })

      },
      // 状态0审核通过  1审核未通过 2审核中字典翻译
      stateFormat(row, column) {
        return this.selectDictLabel(this.stateOptions, row.state)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          companyId: null,
          companyName: null,
          sourceTypeOptions: null,
          updateTypeOptions: [],
          state: null,
          deleType: null,
          createBy: null,
          createDate: null,
          updateBy: null,
          updateDate: null,
          remarks: null
        }
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加商机类型中间'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids
        getAgnetType(id).then(response => {
          this.form = response.data
          if(response.data.sourceTypeOptions !=null){
            let sourceTypeTemp =  response.data.updateTypeOptions.split(',');
            console.log(sourceTypeTemp);
            this.updateTypeOptions = sourceTypeTemp;

          }
          this.open = true
          this.title = '更改商机类型'

        })
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.updateTypeOptions = this.updateTypeOptions.join(",");
            if (this.form.id != null) {
              updateAgnetType(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                }
              })
            } else {
              addAgnetType(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
                  this.open = false
                  this.getList()
                }
              })
            }
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids
        this.$confirm('是否确认删除商机类型中间编号为"' + ids + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delAgnetType(ids)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有商机类型中间数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return exportAgnetType(queryParams)
        }).then(response => {
          this.download(response.msg)
        }).catch(function() {
        })
      },
      checkBoxChange:function(e) {
        console.info(arguments)
      }
    }
  }
</script>
