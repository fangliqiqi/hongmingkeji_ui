<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="公司名称" prop="companyName">
        <el-select
          v-model="queryParams.companyName"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请输入公司名/手机号码"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.companyName + ' '+item.principalPhone"
            :value="item.companyName">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责的省" prop="prov">
        <el-input
          v-model="queryParams.prov"
          placeholder="请输入负责的省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负责的市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入负责的市"
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
          v-hasPermi="['share:company:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:company:edit']"
        >修改
        </el-button>
      </el-col>
     <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:company:remove']"
        >删除
        </el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:company:export']"
        >导出
        </el-button>
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch"/>
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="companyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="公司id" align="center" prop="id" />
    <!--  <el-table-column label="用户id" align="center" prop="userId" />-->
      <el-table-column label="用户昵称" align="center" prop="nickName" min-width="120"/>
      <el-table-column label="公司名称" align="center" prop="companyName" min-width="220"/>
      <el-table-column label="统一社会信用代码" align="center" prop="creditCode" min-width="220"/>
<!--      <el-table-column label="营业执照地址" align="center" prop="address" min-width="320"/>-->
      <el-table-column label="公司地址" align="center" prop="enaddr" min-width="320"/>
      <el-table-column label="法人代表" align="center" prop="contacts" min-width="120"/>
<!--      <el-table-column label="法人电话" align="center" prop="contactsPhone" min-width="120"/>-->
      <el-table-column label="负责人代表" align="center" prop="principal" min-width="120"/>
      <el-table-column label="负责人电话" align="center" prop="principalPhone" min-width="120"/>
      <el-table-column label="代账许可证" align="center" prop="permitImg" min-width="100">
        <template slot-scope="scope">
          <el-image v-if="scope.row.permitImg" style="height: 30px" :src="require('@/assets/image/daizhang-02.png')" fit="contain" :preview-src-list="[path+scope.row.permitImg]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/daizhang-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="营业执照" align="center" prop="licenseImg" min-width="100">
        <template slot-scope="scope">
          <el-image v-if="scope.row.licenseImg" style="height: 30px" :src="require('@/assets/image/yingyezhizhao-02.png')" fit="contain" :preview-src-list="[path+scope.row.licenseImg]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/yingyezhizhao-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="法人身份证(正)" align="center" prop="cardFront" min-width="120">
        <template slot-scope="scope">
          <el-image v-if="scope.row.cardFront" style="height: 30px" :src="require('@/assets/image/faren-02.png')" fit="contain" :preview-src-list="[path+scope.row.cardFront]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/faren-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="法人身份证(反)" align="center" prop="cardReverse" min-width="120">
        <template slot-scope="scope">
          <el-image v-if="scope.row.cardReverse" style="height: 30px" :src="require('@/assets/image/shenfenzheng-02.png')" fit="contain" :preview-src-list="[path+scope.row.cardReverse]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/shenfenzheng-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="省" align="center" prop="prov" min-width="80"/>
      <el-table-column label="市" align="center" prop="city" min-width="80"/>
      <el-table-column label="区县" align="center" prop="county" min-width="80"/>
      <el-table-column label="合作状态" align="center" prop="delFlag" :formatter="companyStatusFlagFormat" min-width="100" />
      <el-table-column label="终止时间" align="center" prop="delTime" min-width="180"/>
      <el-table-column label="备注" align="center" prop="remark" min-width="220"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:company:edit']"
          >修改
          </el-button>
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:company:remove']"
          >删除
          </el-button>-->
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

    <!-- 添加或修改加盟商信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px"  :close-on-click-modal="false" :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="营业执照" prop="licenseImg"  v-if="!form.licenseImg">
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :data="{'type':'licenseImg'}"
                :show-file-list="false"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'licenseImg')"
                :before-upload="beforeAvatarUpload">
                <el-image
                  v-if="form.licenseImg" :src="updateImg.licenseImg" class="img-cl"
                  fit="contain" :disabled='flag' slot="error"></el-image>
<!--                <img v-if="form.licenseImg" :src="form.licenseImg" class="img-cl">-->
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.licenseImg" hidden />
            </el-form-item>
            <el-form-item label="营业执照" v-else >
              <el-image :preview-src-list="[updateImg.licenseImg]"
                v-if="form.licenseImg" :src="updateImg.licenseImg" class="img-cl license-uploader"  :disabled='flag'  fit="contain"></el-image>
            </el-form-item>
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName"   :disabled="flag" placeholder="请输入公司名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="代账许可证" prop="permitImg" v-if="!form.permitImg">
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :show-file-list="false"
                :data="{'type':'permitImg'}"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'permitImg')"
                :before-upload="beforeAvatarUpload">
<!--                <img v-if="form.permitImg" :src="form.permitImg" class="img-cl">-->
                <el-image
                  v-if="form.permitImg" :src="updateImg.permitImg" class="img-cl"
                  fit="contain"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.permitImg" hidden />
            </el-form-item>
            <el-form-item label="代账许可证" v-else>
              <el-image :preview-src-list="[updateImg.permitImg]"
                        v-if="form.permitImg" :src="updateImg.permitImg" class="img-cl license-uploader"  fit="contain"></el-image>
            </el-form-item>
            <el-form-item label="社会信用代码" prop="creditCode">
              <el-input v-model="form.creditCode"  :disabled="flag" placeholder="请输入统一社会信用代码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="办公地址" prop="enaddr">
          <el-input v-model="form.enaddr" placeholder="请输入办公地址"/>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身份证正面" prop="cardFront" v-if="!form.cardFront">
              <!--          <el-input v-model="form.address" placeholder="请输入营业执照地址" />-->
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :show-file-list="false"
                :data="{'type':'cardFront'}"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'cardFront')"
                :before-upload="beforeAvatarUpload">
<!--                <img v-if="form.cardFront" :src="form.cardFront" class="img-cl">-->
                <el-image
                  v-if="form.cardFront" :src="updateImg.cardFront" class="img-cl"
                  fit="contain"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.cardFront" hidden />
            </el-form-item>
            <el-form-item label="身份证正面" v-else>
              <el-image :preview-src-list="[updateImg.cardFront]"
                        v-if="form.cardFront" :src="updateImg.cardFront" class="img-cl license-uploader"  fit="contain"></el-image>
            </el-form-item>
            <el-form-item label="法人姓名" prop="contacts">
              <el-input v-model="form.contacts" placeholder="请输入法人代表"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证反面" prop="cardReverse" v-if="!form.cardReverse">
              <!--          <el-input v-model="form.address" placeholder="请输入营业执照地址" />-->
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :show-file-list="false"
                :data="{'type':'cardReverse'}"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'cardReverse')"
                :before-upload="beforeAvatarUpload">
<!--                <img v-if="form.cardReverse" :src="form.cardReverse" class="img-cl">-->
                <el-image
                  v-if="form.cardReverse" :src="updateImg.cardReverse" class="img-cl"
                  fit="contain"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.cardReverse" hidden />
            </el-form-item>
            <el-form-item label="身份证反面" v-else>
              <el-image :preview-src-list="[updateImg.cardReverse]"
                        v-if="form.cardReverse" :src="updateImg.cardReverse" class="img-cl license-uploader"  fit="contain"></el-image>
            </el-form-item>
            <el-form-item label="法人身份证号" prop="contactsIdcard">
              <el-input v-model="form.contactsIdcard" placeholder="请输入法人身份证号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司省市区" prop="selectedOptions"  >
              <el-cascader
                style="width: 100%"
                size="large"
                :options="options"
                :disabled='flag'
                v-model="form.selectedOptions"
                @visible-change="handleVChange"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="translate" label="是否独家" >
              <el-radio-group v-model="form.translate">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="负责人姓名" prop="principal" >
              <el-input v-model="form.principal"  :disabled="flag"  placeholder="输入负责人姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人电话" prop="principalPhone"  >
              <el-input v-model="form.principalPhone" :disabled="flag" placeholder="输入负责人手机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!form.id">
          <el-col :span="12">
            <el-form-item label="业务员姓名" prop="salesman">
              <el-input v-model="form.salesman" placeholder="输入业务员姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务员电话" prop="salesmanPhone">
              <el-input v-model="form.salesmanPhone" placeholder="输入业务员手机号码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="特别业务备注" prop="remark">
              <textarea v-model="form.remark" cols="90" rows="3" placeholder="特殊需求说明,每个需求请使用斜杠或逗号间隔.例如:无地址提供,不做代账,不做许可证"/>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listCompany, getCompany, delCompany, addCompany, updateCompany, exportCompany, getCompanyList } from '@/api/share/company'
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
    name: 'Company',
    data() {
      return {
        flag:false,
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
        // 加盟商信息表格数据
        companyList: [],
        //公司删除状态
        companyStatusFlagOptions:[],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          companyName: null,
          creditCode: null,
          address: null,
          enaddr: null,
          contacts: null,
          contactsPhone: null,
          permitImg: null,
          licenseImg: null,
          cardFront: null,
          cardReverse: null,
          prov: null,
          city: null,
          county: null,
          nickName: null,
          status:null,
          remark:null
        },
        companyOptions:[],
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          companyName: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' }
          ],
          licenseImg:[
            { required: true, message: '营业执照不能为空', trigger: 'blur' }
          ],

          creditCode:[
            { required: true, message: '统一社会信用代码不能为空', trigger: 'blur' }
          ],
          principal:[
            { required: true, message: '负责人姓名不能为空', trigger: 'blur' }
          ],

          principalPhone:[
            { required: true, message: '负责人电话不能为空', trigger: 'blur' },
             { min: 11, max: 11, message: '负责人电话格式错误', trigger: 'blur' }
          ],
          translate:[
             { required: true, message: '是否独家不能为空', trigger: 'blur' },
          ],
          // salesman:[
          //   { required: true, message: '业务员姓名不能为空', trigger: 'blur' }
          // ],
          // salesmanPhone:[
          //   { required: true, message: '业务员手机号码不能为空', trigger: 'blur' }
          // ],
          // enaddr:[
          //   { required: true, message: '办公地址不能为空', trigger: 'blur' }
          // ],
          selectedOptions:[
            { required: true, message: '办公省市区不能为空', trigger: 'blur' }
          ]
        },
        path : process.env.VUE_APP_BASE_API,
        updateAction:process.env.VUE_APP_BASE_API+"/share/company/uploadAgent",
        updateImg:{},
        options: regionData
      }
    },
    created() {
      this.getList();
      this.getDicts("company_status").then(response => {
        this.companyStatusFlagOptions = response.data;
      });
    },

    methods: {
      /** 查询加盟商信息列表 */
      getList() {
        this.loading = true
        listCompany(this.queryParams).then(response => {
          this.companyList = response.rows
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
          userId: null,
          companyName: null,
          creditCode: null,
          address: null,
          enaddr: null,
          contacts: null,
          contactsPhone: null,
          permitImg: null,
          licenseImg: null,
          cardFront: null,
          cardReverse: null,
          prov: null,
          city: null,
          county: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          nickName: null,
          contactsNumber: null,
          selectedOptions:null,
          principal:null,
          principalPhone:null,
          contactsIdcard:null,
          salesman:null,
          salesmanPhone:null,
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

      // 远程搜索
      remoteMethod(query) {
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

      /** 新增按钮操作 */
      handleAdd() {
        this.flag=false
        this.reset()
        this.open = true
        this.title = '添加合作商信息'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.flag = true
        this.reset()
        const id = row.id || this.ids
        const path = process.env.VUE_APP_BASE_API;
        getCompany(id).then(response => {
          console.info(response)
          if(response.code==200){
            let data = response.data;
            let selectedOptions = []
            selectedOptions.push(TextToCode[data.prov].code)
            selectedOptions.push(TextToCode[data.prov][data.city].code)
            if(data.county){
              selectedOptions.push(TextToCode[data.prov][data.city][data.county].code)
            }else{
              selectedOptions.push(TextToCode[data.prov][data.city]['市辖区'].code)
            }
            data.selectedOptions = selectedOptions
            data.translate = Number(data.translate)
            
            this.updateImg = {
              permitImg: path+data.permitImg,
              licenseImg: path+data.licenseImg,
              cardFront: path+data.cardFront,
              cardReverse: path+data.cardReverse,
            };
            this.form = data;
            this.title = '修改合作商信息';
            this.open = true;
          }else{
            this.msgError(response.msg);
          }

        })
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateCompany(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                }
              })
            } else {
              addCompany(this.form).then(response => {
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
        this.$confirm('是否确认删除合作商信息编号为"' + ids + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delCompany(ids)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有合作商信息数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return exportCompany(queryParams)
        }).then(response => {
          this.download(response.msg)
        }).catch(function() {
        })
      },
      handleChange(value) {
        console.info(value)
        this.form.prov = CodeToText[value[0]]
        this.form.city = CodeToText[value[1]]
        this.form.county = CodeToText[value[2]]
        this.form.selectedOptions = value;
      },
      handleVChange(){
        console.info(arguments)
      },
      handleAvatarSuccess(res, file,type) {
        console.info(res)
        console.info(file)
        console.info(type)
        if(res.code==200){
          this.form[type] = res.imgUrl;
          this.updateImg[type] = URL.createObjectURL(file.raw);
          // console.log(this.updateImg)
          let jsonList = res.jsonMap;
          console.info(jsonList)
          if(type=="licenseImg"&&jsonList&&jsonList!='null'){
            jsonList.forEach((e,i,a)=>{
              if(e["单位名称"]){
                this.form.companyName = e["单位名称"];
              }else if(e["社会信用代码"]){
                this.form.creditCode = e["社会信用代码"];
              }else if(e["地址"]){
                this.form.enaddr = e["地址"];
              }
            })
          }else if(type=="cardFront"&&jsonList&&jsonList!='null'){
            jsonList.forEach((e,i,a)=>{
              if(e["姓名"]){
                this.form.contacts = e["姓名"];
              }else if(e["公民身份号码"]){
                this.form.contactsIdcard = e["公民身份号码"];
              }
            })
          }
        }else{
          this.$message.error('上传图片失败!')
        }
      },
      beforeAvatarUpload(file) {
        console.info(file)
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 10

        if (!(+isJPG || isPNG)) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!')
        }
        return (isJPG || isPNG) && isLt2M
      }
    }
  }
</script>
<style>
  .license-uploader {
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px #eee solid;
    border-radius: 8px;
  }

  .el-upload {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .el-upload .img-cl{
    width: 100%;
    height: 100%;
  }
</style>
