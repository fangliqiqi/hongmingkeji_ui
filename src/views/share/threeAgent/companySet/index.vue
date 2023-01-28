<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
          v-hasPermi="['share:companyCount:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:companyCount:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:companyCount:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:companyCount:export']"
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

    <el-table v-loading="loading" :data="companyCountList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <!-- <el-table-column label="客户姓名" align="center" prop="userId" /> -->
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="营业执照" align="center" prop="businessLicenseUrl" min-width="120">
        <template slot-scope="scope">
          <el-image v-if="scope.row.businessLicenseUrl" style="height: 30px" :src="require('@/assets/image/yingyezhizhao-02.png')" fit="contain" :preview-src-list="[path+scope.row.businessLicenseUrl]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/yingyezhizhao-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="法人身份证(正)" align="center" prop="legalPersonIdcardFrontUrl" min-width="120">
        <template slot-scope="scope">
          <el-image v-if="scope.row.legalPersonIdcardFrontUrl" style="height: 30px" :src="require('@/assets/image/faren-02.png')" fit="contain" :preview-src-list="[path+scope.row.legalPersonIdcardFrontUrl]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/faren-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="法人身份证(反)" align="center" prop="legalPersonIdcardBackUrl" min-width="120">
        <template slot-scope="scope">
          <el-image v-if="scope.row.legalPersonIdcardBackUrl" style="height: 30px" :src="require('@/assets/image/shenfenzheng-02.png')" fit="contain" :preview-src-list="[path+scope.row.legalPersonIdcardBackUrl]"></el-image>
          <el-image v-else style="height: 30px" :src="require('@/assets/image/shenfenzheng-01.png')" fit="contain" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="负责人姓名" align="center" prop="chargePersonName" />
      <el-table-column label="负责人手机号" align="center" prop="chargePersonPhone" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:companyCount:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:companyCount:remove']"
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

    <!-- 添加或修改合作商统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px"  append-to-body :close-on-click-modal="false" :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span='12' v-if="onshow">
            <el-form-item label="客户名称" prop="userId" style="width: 100%">
              <el-select
                v-model="form.userId"
                filterable
                remote
                clearable
                reserve-keyword
                style="width: 100%;"
                placeholder="请输入客户名称"
                :remote-method="remoteMethod"
                :loading="loading"
                >
                <el-option
                  v-for="item in userOptions"
                  :key="item.userId"
                  :label="item.nickName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName"   placeholder="请输入公司名称"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12" >
            <el-form-item label="营业执照" prop="businessLicenseUrl"  v-if="!form.businessLicenseUrl" >
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :data="{'type':'licenseImg'}"
                :show-file-list="false"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'licenseImg')"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="form.businessLicenseUrl" :src="updateImg.licenseImg" class="img-cl"
                  fit="contain"  slot="error"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.businessLicenseUrl" hidden />
            </el-form-item>
            <el-form-item label="营业执照" v-else  prop="businessLicenseUrl">
              <el-image :preview-src-list="[updateImg.licenseImg]"
                v-if="form.businessLicenseUrl" :src="updateImg.licenseImg" class="img-cl license-uploader" fit="contain"></el-image>
                <div  class="el-icon-close close"  @click="closeFun"  :data-type="1"></div>
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
                <el-image
                  v-if="form.permitImg" :src="updateImg.permitImg" class="img-cl"
                  fit="contain"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.permitImg" hidden />
            </el-form-item>
            <el-form-item label="代账许可证" v-else  prop="permitImg">
              <el-image :preview-src-list="[updateImg.permitImg]"
                        v-if="form.permitImg" :src="updateImg.permitImg" class="img-cl license-uploader"  fit="contain"></el-image>
              <div  class="el-icon-close close"  @click="closeFun"  :data-type="2"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身份证正面" prop="legalPersonIdcardFrontUrl" v-if="!form.legalPersonIdcardFrontUrl">
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :show-file-list="false"
                :data="{'type':'cardFront'}"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'cardFront')"
                :before-upload="beforeAvatarUpload">
                <el-image
                  v-if="form.legalPersonIdcardFrontUrl" :src="updateImg.cardFront" class="img-cl"
                  fit="contain"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.legalPersonIdcardFrontUrl" hidden />
            </el-form-item>
            <el-form-item label="身份证正面" v-else prop="legalPersonIdcardFrontUrl">
              <el-image :preview-src-list="[updateImg.cardFront]"
                        v-if="form.legalPersonIdcardFrontUrl" :src="updateImg.cardFront" class="img-cl license-uploader"  fit="contain"></el-image>
               <div  class="el-icon-close close"  @click="closeFun"  :data-type="3"></div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证反面" prop="legalPersonIdcardBackUrl" v-if="!form.legalPersonIdcardBackUrl">
              <el-upload
                class="license-uploader"
                :action="updateAction"
                name="file"
                :show-file-list="false"
                :data="{'type':'cardReverse'}"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'cardReverse')"
                :before-upload="beforeAvatarUpload">
                <el-image
                  v-if="form.legalPersonIdcardBackUrl" :src="updateImg.cardReverse" class="img-cl"
                  fit="contain"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <input v-model="form.legalPersonIdcardBackUrl" hidden />
            </el-form-item>
            <el-form-item label="身份证反面" v-else  prop="legalPersonIdcardBackUrl">
              <el-image :preview-src-list="[updateImg.cardReverse]"
                        v-if="form.legalPersonIdcardBackUrl" :src="updateImg.cardReverse" class="img-cl license-uploader"  fit="contain"></el-image>
               <div  class="el-icon-close close"  @click="closeFun"  :data-type="4"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="负责人姓名" prop="chargePersonName">
              <el-input v-model="form.chargePersonName" placeholder="请输入负责人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人手机号" prop="chargePersonPhone">
              <el-input v-model="form.chargePersonPhone"   placeholder="请输入负责人手机号" maxlength='11'/>
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
import { listCompanyCount, getCompanyCount, delCompanyCount, addCompanyCount, updateCompanyCount, exportCompanyCount,getUserList } from "@/api/share/threeAgent/companySet.js";

export default {
  name: "CompanySet",
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
      // 合作商统计表格数据
      companyCountList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        companyName: null,
        creditCode: null,
        chargePersonName: null,
        chargePersonPhone: null,
        contacts: null,
        contactsPhone: null,
        permitImg: null,
        businessLicenseUrl: null,
        legalPersonIdcardFrontUrl: null,
        legalPersonIdcardBackUrl: null,
      },
      userOptions:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          {required: true, message: '客户姓名不能为空', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        licenseImg:[
          { required: true, message: '营业执照不能为空', trigger: 'blur' }
        ],
        businessLicenseUrl:[
          { required: true, message: '营业执照不能为空', trigger: 'blur' }
        ],
        legalPersonIdcardFrontUrl:[
           { required: true, message: '身份证正面不能为空', trigger: 'blur' }
        ],
        legalPersonIdcardBackUrl:[
          { required: true, message: '身份证正面不能为空', trigger: 'blur' }
        ],
       chargePersonName:[
          { required: true, message: '负责人姓名不能为空', trigger: 'blur' }
        ],
        chargePersonPhone:[
          { required: true, message: '负责人电话不能为空', trigger: 'blur' },
          { min: 11, max: 11, message: '负责人电话格式错误', trigger: 'blur' }
        ]
      },
      onshow:true,
      updateImg:{},
      path : process.env.VUE_APP_BASE_API,
      updateAction:process.env.VUE_APP_BASE_API+"/share/AgentCompany/uploadAgentCompany",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询合作商统计列表 */
    getList() {
      this.loading = true;
      listCompanyCount(this.queryParams).then(response => {
        console.log(response.rows)
        this.companyCountList = response.rows;
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
        companyName: null,
        chargePersonName: null,
        chargePersonPhone: null,
        remark: null,
        creditCode: null,
        contacts: null,
        contactsPhone: null,
        permitImg: null,
        businessLicenseUrl: null,
        legalPersonIdcardFrontUrl: null,
        legalPersonIdcardBackUrl: null,
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
      this.onshow= true;
      this.reset();
      this.open = true;
      this.title = "添加合作商公司";
    },

    handleAvatarSuccess(res, file,type) {
      console.info(res)
      console.info(file)
      console.info(type)
      if(res.code==200){
        this.form[type] = res.imgUrl;
        this.updateImg[type] = URL.createObjectURL(file.raw);
        console.log(this.updateImg)
        let jsonList = res.jsonMap;
        // console.info(jsonList)
        if(type=="licenseImg"&&jsonList&&jsonList!='null'){
          // jsonList.forEach((e,i,a)=>{
          //   if(e["单位名称"]){
          //     this.form.companyName = e["单位名称"];
          //   }else if(e["社会信用代码"]){
          //     this.form.creditCode = e["社会信用代码"];
          //   }else if(e["地址"]){
          //     this.form.enaddr = e["地址"];
          //   }
          // })
          this.form.businessLicenseUrl = res.imgUrl;

        }else if(type=="cardFront"&&jsonList&&jsonList!='null'){
          // jsonList.forEach((e,i,a)=>{
          //   if(e["姓名"]){
          //     this.form.contacts = e["姓名"];
          //   }else if(e["公民身份号码"]){
          //     this.form.contactsIdcard = e["公民身份号码"];
          //   }
          // })
          this.form.legalPersonIdcardFrontUrl = res.imgUrl
      }else if(type=="cardReverse"&&jsonList&&jsonList!='null'){
          // jsonList.forEach((e,i,a)=>{
          //   if(e["姓名"]){
          //     this.form.contacts = e["姓名"];
          //   }else if(e["公民身份号码"]){
          //     this.form.contactsIdcard = e["公民身份号码"];
          //   }
          // })
          this.form.legalPersonIdcardBackUrl= res.imgUrl
      }else if(type=="cardReverse"&&jsonList&&jsonList!='null'){

          this.form.permitImg= res.imgUrl
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
    },

    // 客户名称远程搜索
    remoteMethod(query) {
      let that = this;
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          getUserList({keyword:query}).then((res)=>{
            if(res.code==200){
              this.userOptions = res.data||[];
            }
          }).catch((err)=>{
          })
        }, 200);
      } else {
        this.userOptions = [];
      }
    },

    // 删除图片按钮
    closeFun(e){
      // console.log(e.target.dataset.type)
      let type = e.target.dataset.type
      if(type == 1){
        this.form.businessLicenseUrl = null
      }else if(type == 2){
        this.form.permitImg = null
      }else if(type == 3){
        this.form.legalPersonIdcardFrontUrl = null
      }else if(type == 4){
        this.form.legalPersonIdcardBackUrl = null
      }
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.onshow= false;
      this.reset();
      const id = row.id || this.ids
      getCompanyCount(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合作商公司";
      });
    },

    /** 提交按钮 */
    submitForm() {
      console.log(this.form)
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompanyCount(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCompanyCount(this.form).then(response => {
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
      this.$confirm('是否确认删除合作商统计编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCompanyCount(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有合作商统计数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCompanyCount(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
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
    position: relative;
  }
  .close{
    position: absolute;
    top:-10px;
    right:-10px;
    border-radius: 50%;
    padding: 5px;
    background-color: #FFFFFF;
    border: 1px solid #e5e5e5;
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
