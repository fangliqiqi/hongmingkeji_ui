<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm"  :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="选择省市区" prop="selectedOptions" style="width:25%;">
        <el-cascader
          style="width: 150%;"
          placeholder="请选择信息所在省市"
          clearable
          size="large"
          :options="options"
          v-model="queryParams.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="24">
      <el-col :md="12" :xs="24" >
        <el-tabs v-model="activeName" >
          <el-tab-pane label="代理商分成比例" name="first"></el-tab-pane>
        </el-tabs>
        <el-table v-loading="loading" :data="AgentParamList" @selection-change="handleSelectionChange" class="mb20">
          <el-table-column label="代理商名称" align="center" prop="roleName" min-width="120"/>
          <el-table-column label="预充金额" align="center" prop="prepareRecharge"  min-width="120"/>
          <el-table-column label="累计成本" align="center" prop="cumulativeCostAmount" min-width="120"/>
          <el-table-column label="成本比例" align="center" prop="costProportion"  min-width="120"/>
          <el-table-column label="分成比例" align="center" prop="commissionProportion"  min-width="120"/>
          <el-table-column label="续费比例" align="center" prop="renewProportion"  min-width="120"/>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width"  min-width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row,10)"
                v-hasPermi="['share:order:edit']"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :md="12" :xs="24" >
        <el-tabs v-model="activeName" >
          <el-tab-pane label="代理人分成比例" name="first"></el-tab-pane>
        </el-tabs>
        <el-table v-loading="loading" :data="AgentParamArr" @selection-change="handleSelectionChange" >
          <el-table-column label="参与人数" align="center" prop="level"  min-width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="无代理商参与分成时，平台分成比例设置" placement="right">
                <span>{{scope.row.level}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="成本比例" align="center" prop="systemCost"  min-width="120"/>
          <el-table-column label="一级分成" align="center" prop="clientOne"  min-width="120"/>
          <el-table-column label="二级分成" align="center" prop="clientTwo"  min-width="120"/>
          <el-table-column label="三级分成" align="center" prop="clientThree"  min-width="120"/>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width"  min-width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row,20)"
                v-hasPermi="['share:order:edit']"
              >修改</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 添加或修改业务名称指导价设置对话框 -->
    <el-dialog :title="title" :visible.sync="openAgent" width="500px" append-to-body :close-on-click-modal="false" :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="预充金额" prop="prepareRecharge">
          <el-input v-model="form.prepareRecharge" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="累计成本" prop="cumulativeCostAmount"  v-if="show">
          <el-input v-model="form.cumulativeCostAmount" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="成本比例" prop="costProportion">
          <el-input v-model="form.costProportion" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="分成比例" prop="commissionProportion">
          <el-input v-model="form.commissionProportion" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="续费比例" prop="renewProportion" v-if="show1">
          <el-input v-model="form.renewProportion" placeholder="请输入指导价格" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(10)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改业务名称指导价设置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false" :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="成本比例" prop="systemCost">
          <el-input v-model="form.systemCost" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="一级分成" prop="clientOne">
          <el-input v-model="form.clientOne" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="二级分成" prop="clientTwo">
          <el-input v-model="form.clientTwo" placeholder="请输入业务名称" />
        </el-form-item>
        <el-form-item label="三级分成" prop="clientThree">
          <el-input v-model="form.clientThree" placeholder="请输入指导价格" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(20)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getAgentList, getAgentArr,updateAgentList,updateAgentArr ,getAgentlist ,postAgentlist} from "@/api/share/threeAgent/agentParam";
  /*获取省市区信息*/
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'


  export default {
    name: "AgentParam",
    data() {
      return {
        activeName:'first',
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
        //代理商
        AgentParamList: [],
        //代理人
        AgentParamArr: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        //代理商
        openAgent: false,
        //代理人
        open: false,
        // 查询参数
        queryParams: {
          // pageNum: 1,
          // pageSize:10,
          name: null,
          guidePrice: null,
          province: "安徽省",
          city: "合肥市",
          county: null

        },
        // 表单参数
        form:{

        },
        show:true,
        show1:true,
        options: provinceAndCityData,
        // 表单校验
        rules: {
          cumulativeCostAmount:[]
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询业务名称指导价设置列表 */
      getList() {
        this.loading = true;
        this.getAgentArrFun();
        this.getAgentListFun();
      },
      //获取代理商
      getAgentListFun:function(){
        // console.log(this.queryParams)
        let qdata = JSON.parse(JSON.stringify(this.queryParams));
        qdata.selectedOptions = '';
        getAgentlist(qdata).then(response => {
          console.info(response)
          let data = response.rows;
          let selectedOptions = [];
          if(data.length>0){
            selectedOptions.push(TextToCode[data[0].province].code);
            selectedOptions.push(TextToCode[data[0].province][data[0].city].code);
            this.queryParams.city = data[0].city;
            this.queryParams.province = data[0].province;
          }

          this.queryParams.selectedOptions = selectedOptions
          this.AgentParamList = data;
          this.loading = false;
        });
      },
      // 获取代理人
      getAgentArrFun:function(){
        let qdata = JSON.parse(JSON.stringify(this.queryParams));
        qdata.selectedOptions = '';
        getAgentArr(qdata).then(response => {
          this.AgentParamArr= response.rows;
          this.loading = false;
        });
      },

      /** 搜索按钮操作 */
      handleQuery() {
        this.getList();
        // console.log(this.queryParams)
      },


      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },


      // 取消按钮
      cancel() {
        this.open = false;
        this.openAgent = false;
        this.reset();
      },

      // 表单重置
      reset() {
        this.form = {
          id: null,
          roleName: null,
          prepareRecharge: null,
          costProportion: null,
          commissionProportion: null,
          renewProportion: null,
          level:null,
          systemCost: null,
          clientOne: null,
          clientTwo: null,
          clientThree: null,
          selectedOptions: null,
        };
        this.resetForm("form");
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

      /* 省市选择 */
      handleChange(value) {
        // console.log(value)
        // ++this.isResouceShow
        this.queryParams.selectedOptions = value
        this.queryParams.province = CodeToText[value[0]]
        this.queryParams.city = CodeToText[value[1]]
        // this.queryParams.county = CodeToText[value[2]]
        // console.log(this.form)
        if(this.queryParams.county == '市辖区'){
           this.$message.error('请选择具体的市辖区');
           this.typeOption = [];
           this.userOptions = [];
           this.agentOptions = [];
           return
        }else{

        }
      },

      /** 修改按钮操作 弹窗 */
      handleUpdate(row,type) {
        this.reset();
        if(type==10){
          console.log(row)
          if(row.roleName == "C级代理商"){
            // console.log('hahah')
            this.show = false
            this.show1 = false
          }else if(row.roleName == "B级代理商"){
            this.show1 = false
          }else{
            this.show =true
            this.show1 =true
          }

          this.form = {
            id:row.id,
            province:row.province,
            city:row.city,
            roleId: row.roleId,
            roleName: row.roleName,
            cumulativeCostAmount:row.cumulativeCostAmount,
            prepareRecharge: row.prepareRecharge,
            costProportion: row.costProportion,
            commissionProportion: row.commissionProportion,
            renewProportion: row.renewProportion,

          }
          this.openAgent = true;
          this.title = "修改"+row.roleName+"分成比例";
        }else if(type==20){
          this.form ={
            id: row.id,
            level:row.level,
            systemCost: row.systemCost,
            clientOne: row.clientOne,
            clientTwo: row.clientTwo,
            clientThree: row.clientThree
          }
          this.open = true;
          this.title = "修改代理人分成比例";
        }
        //const id = row.id || this.ids
        // getAgentBusinessType(id).then(response => {
        //   this.form = response.data;
        //   this.open = true;
        //   this.title = "修改业务名称指导价设置";
        // });
      },
      /** 提交按钮 */
      submitForm(type) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            console.log(this.form)
            if(type==10){
              postAgentlist(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.openAgent = false;
                  this.getAgentListFun();
                }
              });
            }else if(type==20){
              updateAgentArr(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getAgentArrFun();
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
