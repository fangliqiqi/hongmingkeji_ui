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
      <el-form-item label="省" prop="prov">
        <el-input
          v-model="queryParams.prov"
          placeholder="请输入合作商所在的省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入合作商所在的市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item :gutter="10" class="mb8">
        <div class="top-right-btn">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
          </el-tooltip>
<!--          <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">-->
<!--            <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch"/>-->
<!--          </el-tooltip>-->
        </div>
      </el-form-item>
    </el-form>



    <el-table v-loading="loading" :data="agnetTypeList" @selection-change="handleSelectionChange" :span-method="objectSpanMethod" border>
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="省" align="center" prop="prov" />
      <el-table-column label="市" align="center" prop="city"/>
      <el-table-column label="合作商" align="center" prop="companyName" width="300"/>
      <el-table-column label="已持有商机" align="center" prop="sourceOptionsStr"/>
      <el-table-column label="余额" align="center" prop="amount">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="已购商机" align="center" prop="payOptionsStr"/>
      <el-table-column label="接单状态" align="center" prop="status" :formatter="companyStatusFlagFormat" min-width="100"/>
      <el-table-column label="合作时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}年{m}月{d}日') }}</span>
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
  import {
    rzCompanyType,
    listAgnetType,
    getAgnetType,
    delAgnetType,
    addAgnetType,
    updateAgnetType,
    exportAgnetType,
    getCompanyList,
    listAgnetCompanyType
  } from '@/api/share/agnetType'

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
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        categoryOptions:[],
        sourceTypeList:[],
        updateTypeOptions:[],
        // 查询参数
        queryParams: {
          id:null,
          pageNum: 1,
          pageSize: 30,
          companyId: null,
          companyName:null,
          payOptionsStr: null,
          sourceOptionsStr: null,
          status: null,
          deleType: null,
          createDate: null,
          updateDate: null,
          remarks: null,
          state:null
        },
        companyOptions:[],
        provMaps:[],
        // 表单参数
        form: {},
      }
    },
    created() {
      this.getList()
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
      this.getDicts("company_status").then(response => {
        this.companyStatusFlagOptions = response.data;
      });
    },
    methods: {
      /** 查询商机类型中间列表 */
      getList() {
        this.loading = true
        listAgnetCompanyType(this.queryParams).then(response => {
          console.info(response)
          let data = response.rows;
          let mapsCount=new Map();

          data.forEach((item)=>{
            const  pprov =item.prov;
            if(!mapsCount.has(pprov)){
              mapsCount.set(pprov,1);
            }else{
              mapsCount.set(pprov, mapsCount.get(pprov)+1);
            }
          });

          this.agnetTypeList =  data.map((item,index,arr)=>{
            item.pcount = mapsCount.get(item.prov);
            let pRow = 0;
            item.pRow = 0;
            mapsCount.forEach((value, key, map)=>{
            if(key==item.prov){
              item.pRow = pRow +value;
            }else if(item.pRow == 0){
              pRow += value;
            }
            })
            return item
          })
          this.total = response.total
          this.loading = false
        })
      },
      companyStatusFlagFormat(row, column) {
        return this.selectDictLabel(this.companyStatusFlagOptions, row.status);
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
          payOptionsStr: null,
          sourceOptionsStr: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateDate: null,
          remark: null,
          status:null,
          state:null
        }
        this.updateTypeOptions=[];
        this.resetForm('form')
      },

      // 远程搜索
      changeId(value){
        this.queryParams.companyId = value;
      },
      remoteMethod(query) {
        let that = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            getCompanyList({companyName:query}).then((res)=>{
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
        this.title = '添加商机类型'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids
        getAgnetType(id).then(response => {
          this.form = response.data
          let sourceTypeOptions = response.data.updateTypeOptions
          if(sourceTypeOptions){
            let sourceTypeTemp =  sourceTypeOptions.split(',');
            this.updateTypeOptions = sourceTypeTemp;
          }
          this.open = true
          this.title = '修改商机类型'
        })
      },
      /** 提交按钮 */
      submitForm() {
        this.form.updateTypeOptions = this.updateTypeOptions.join(",");
        this.$refs['form'].validate(valid => {
          if (valid) {
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
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          if (row.pRow - row.pcount - rowIndex == 0) {
            return {
              rowspan: row.pcount,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  }
</script>
