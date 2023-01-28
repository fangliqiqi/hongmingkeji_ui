<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="150px">
      <el-form-item label="公司名称" prop="companyName" v-if="!queryParams.id">
        <el-select
          v-model="queryParams.companyName"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请输入公司名/公司手机号码"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.companyName + ' '+item.contactPhone"
            :value="item.companyName">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="存续状态" prop="companySubsisting">
         <el-input
           v-model="queryParams.companySubsisting"
           placeholder="请输入存续状态 10存续 20销毁"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>
       <el-form-item label="联系人" prop="companyContact">
         <el-input
           v-model="queryParams.companyContact"
           placeholder="请输入联系人"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item> -->
      <!-- <el-form-item label="联系人电话" prop="contactPhone">
        <el-input
          v-model="queryParams.contactPhone"
          placeholder="请输入联系人电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="最近跟进时间" prop="lastFolllowtime" >
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.lastFolllowtime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择最近跟进时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下次跟进时间" prop="followTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.followTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择下次跟进时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="招商专员" prop="merchantsUserId">
        <el-input
          v-model="queryParams.merchantsUserId"
          placeholder="请输入招商专员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合作意向类别" prop="businessType">
        <el-select v-model="queryParams.businessType" placeholder="请选择意向合作级别" clearable size="small">
          <el-option
            v-for="dict in businessTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
          placeholder="请输入备注"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:businessSource:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:businessSource:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:businessSource:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:busine ssSource:export']"
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

    <el-table
      v-loading="loading"
      :data="businessSourceList"
      @selection-change="handleSelectionChange"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="openTable"
      :row-style="{'max-height':'10px','overflow':'hidden'}"
    >
      <!-- 多个联系人下拉列表 -->
      <el-table-column type="expand" >
        <template slot-scope="props">
          <el-table :data="props.row.phoneData" style="width:100%" >
            <el-table-column
              prop="contact"
              align="center"
              label="联系人名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="phone"
              align="center"
              label="联系人电话"
              width="200">
            </el-table-column>
            <el-table-column
              prop="remarks"
              align="center"
              label="联系人备注"
            >
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  circle
                  @click="phoneEdit(scope.row)"
                  v-hasPermi="['share:phoneSoucre:edit']"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  circle
                  @click="phoneDelecte(scope.row)"
                  v-hasPermi="['share:phoneSoucre:remove']"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50" align="left" />
      <el-table-column label="序列号" align="center" prop="id" width="90" />
      <el-table-column label="合作商公司" align="center" prop="companyName" width="160"/>
<!--      <el-table-column label="存续状态" align="center" prop="companySubsisting" :formatter="companySubsistingFormat" width="80"/>-->
      <el-table-column label="决策人" align="center" prop="companyContact" width="90"/>
      <el-table-column label="决策人电话" align="center" prop="contactPhone" width="110"/>
      <el-table-column label="最近一次跟进" align="center" prop="lastFolllowtime" min-width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastFolllowtime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计下次跟进" align="center" prop="followTime" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.followTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="招商专员" align="center" prop="businessnNicknName" min-width="200" />
      <el-table-column label="意向合作级别" align="center" prop="businessType" :formatter="businessTypeFormat" width="100" />
      <el-table-column label="备注" align="center"  min-width="220"  >
        <template slot-scope="scope">
          <el-popover
            placement="bottom-start"
            width="220"
            trigger="hover"
            :content="scope.row.remarks">
            <span slot="reference" class="wsn">{{scope.row.remarks}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width='320'>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:businessSource:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleShowFollowList(scope.row)"
            v-hasPermi="['share:businessSource:business']"
          >跟进记录</el-button>
          <!-- <el-button
             size="mini"
             type="text"
             icon="el-icon-delete"
             @click="handleDelete(scope.row)"
             v-hasPermi="['share:businessSource:remove']"
           >删除</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-plus-outline"
            @click="phonesAdd(scope.row)"
            v-hasPermi="['share:phoneSoucre:add']"
          >添加联系人</el-button>
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

    <!-- 添加/修改多个联系人弹框对话框 -->
    <el-dialog
      :title="addtitle"
      :visible.sync="dialogadd"
      width="700px"
      style="margin-top:22vh;"
      append-to-body
      :close-on-click-modal='false'
    >
      <el-form ref="phoneform" :model="phoneform" :rules="phonerules" label-width="110px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact" >
              <el-input v-model="phoneform.contact" placeholder="请输入联系人名称"  />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="phone"  >
              <el-input v-model="phoneform.phone" placeholder="请输入联系人电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系人备注" prop="remarks" >
          <el-input type="textarea" :rows="2" class="resizeNone" v-model="phoneform.remarks" placeholder="请输入联系人备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">

        <el-button type="primary" @click="submitphoneForm">确 定</el-button>
        <el-button @click="canceladd">取 消</el-button>
      </span>
    </el-dialog>


    <!-- 添加或修改招商意向资源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px"  style="margin-top: 15vh;" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="合作商公司"  prop="companyName" >
              <el-input v-model="form.companyName" placeholder="请输入合作商公司名称" :disabled="noedit"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存续状态" prop="companySubsisting">
              <el-select v-model="form.companySubsisting" placeholder="存续状态 10存续 20销毁" style="width:100%">
                <el-option
                  v-for="dict in companySubsistingOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">

            <el-form-item label="联系人" prop="companyContact" >
              <el-input v-model="form.companyContact" placeholder="请输入联系人" :disabled="noedit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="联系人电话" prop="contactPhone" >
              <el-input v-model="form.contactPhone" placeholder="请输入联系人电话"  :disabled="noedit"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 添加招商意向资源对话框中增加多个联系人 -->
        <el-form-item v-show="addPhonebtn">
          <el-button @click="addPhone" size="small">+多个联系人</el-button>
        </el-form-item>

        <div class="follow-add">
          <div v-for="(phones, index) in form.phoneSoucreList" :key='index'>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="'联系人' + (index+1)"  prop="contact">
                  <el-input v-model="phones.contact"  placeholder="请输入联系人" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="电话"  prop="phone">
                  <el-input v-model="phones.phone" placeholder="请输入联系人电话" />
                </el-form-item>
              </el-col>
              <el-col :span="2" style="display:flex;justify-content: center;align-items: center;">
                <el-button
                  size="mini"
                  type="delete"
                  icon="el-icon-delete"
                  @click="removePhone(index)"
                />
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="最后一次跟进" prop="lastFolllowtime" >
              <el-date-picker
                clearable
                v-model="form.lastFolllowtime"
                type="datetime"
                :disabled="noedit"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                placeholder="选择最后一次跟进时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
             <el-form-item label="意向合作级别">
               <el-select v-model="form.businessType" placeholder="请选择意向合作级别10A,20B,30C,40D">
                 <el-option
                   v-for="dict in businessTypeOptions"
                   :key="dict.dictValue"
                   :label="dict.dictLabel"
                   :value="dict.dictValue"
                 ></el-option>
               </el-select>
             </el-form-item>
           </el-col>
          <el-col :span="12">
             <el-form-item label="下次跟进时间" prop="followTime">
               <el-date-picker clearable size="small"
                 v-model="form.followTime"
                 type="date"
                 value-format="yyyy-MM-dd"
                 placeholder="选择下次跟进时间">
               </el-date-picker>
             </el-form-item>
           </el-col>
           </el-col>
           </el-col> -->
          <el-col :span="12">
            <el-form-item label="合作意向类别" >
              <el-select v-model="form.businessType" placeholder="请选择意向合作级别" style="width: 100%;">
                <el-option
                  v-for="dict in businessTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="录入该信息的招商专员id"   prop="merchantsUserId">
          <el-input v-model="form.merchantsUserId" placeholder="请输入录入该信息的招商专员id" />
        </el-form-item> -->

        <!-- <el-form-item label="录入该信息的招商专员id"   prop="merchantsUserId">
          <el-input v-model="form.merchantsUserId" placeholder="请输入录入该信息的招商专员id" />
        </el-form-item> -->

        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="2"
            class="resizeNone"
            v-model="form.remarks"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 跟进记录 -->
    <el-dialog title="跟进记录" :visible.sync="followsOpen" width="700px"  style="margin-top: 15vh;" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" >
        <el-form-item label="跟进内容：" prop="content" >
          <el-input
            type="textarea"
            :rows="2"
            class="resizeNone"
            v-model="form.content"
            placeholder="请输入跟进内容"
            style="width:90%;"
          />
        </el-form-item>
        <el-form-item prop="followTime" style="display: flex;justify-content: flex-end;padding-right: 8%;" >
          <span style="font-weight: 700;">下次跟进记录：</span>
          <el-date-picker clearable size="small"
                          v-model="form.followTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择下次跟进时间">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div class="follow-div">
        <div class="follow-item " v-for="(item,index) in followlistAll" :key="index">
          <div>
            <div>
              <span>{{item.nick_name}}</span>
              <span>({{item.role_name}})</span>
            </div>
            <span>{{item.phonenumber}}</span>
          </div>
          <div>
            <div>
              <span>{{item.content}}</span>
            </div>

            <span style=" float: left;margin-left:0;">下次跟进时间:{{item.bcfollow_time,'yyyy-MM-dd ' | format }} <span style="margin-left:280px">{{item.create_time,'yyyy-MM-dd hh:mm:ss' | format}}</span></span>

          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="followSubmitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { listBusinessSource, getBusinessSource, delBusinessSource, addBusinessSource, updateBusinessSource, exportBusinessSource,getBusinessnameList,getFollowupList,addFollowup} from "@/api/share/businessSource";
  import {listPhoneSoucre,getlistPhoneSoucre,getPhoneSoucre,addPhoneSoucre,updatePhoneSoucre,delPhoneSoucre} from "@/api/share/phoneSoucre";
  export default {
    name: "BusinessSource",
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
        // 招商意向资源表格数据
        businessSourceList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 存续状态 10存续 20销毁字典
        companySubsistingOptions: [],
        // 意向合作级别10A,20B,30C,40D字典
        businessTypeOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:10,
          companyName: null,
          companySubsisting: null,
          companyContact: null,
          contactPhone: null,
          lastFolllowtime: null,
          followTime: null,
          // merchantsUserId: null,
          businessnNicknName:null,
          businessType: null,
          remarks: null,
          businessName:null,

        },
        // 添加按钮显示
        addPhonebtn:true,
        // 表单参数
        form: {},
        phones:{
          contact:null,
          phone:null,
          remarks:null
        },
        // 多个联系人联系方式表单数组
        phoneData:[],
        // 多联系人展开行id
        expands: [],

        // 添加联系人弹窗
        dialogadd:false,
        //添加联系人弹窗标题
        addtitle:'',
        //添加联系人表单
        phoneform:{
          contact:null,
          phone:null,
          remarks:null,
          id:null
        },
        companyOptions:[],
        //跟进记录
        followsOpen: false,
        followData: {},
        followlistAll: [],
        // 修改的时候某些内容禁止修改
        noedit:false,

        // 表单校验
        rules: {
          id: [
            { required: true, message: "招商意向资源表id不能为空", trigger: "blur" }
          ],
          companyName: [
            { required: true, message: "合作商公司名称不能为空", trigger: "blur" }
          ],
          companySubsisting: [
            { required: true, message: "存续状态 10存续 20销毁不能为空", trigger: "blur" }
          ],
          companyContact: [
            { required: true, message: "联系人不能为空", trigger: "blur" }
          ],
          contactPhone: [
            { required: true, message: "联系人电话不能为空", trigger: "blur" }
          ],
          content: [{ required: true, message: '跟进内容不能为空', trigger: 'blur' }],
          followTime: [
            { required: true, message: "下次跟进时间不能为空", trigger: "blur" }
          ]
        },
        phonerules:{
          contact:[
            { required: true, message: "联系人不能为空", trigger: "blur" }
          ],
          phone:[
            { required: true, message: "联系人电话不能为空", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.getList();
      this.getDicts("company_subsisting").then(response => {
        this.companySubsistingOptions = response.data;
      });
      this.getDicts("business_type").then(response => {
        this.businessTypeOptions = response.data;
      });
      this.cellFun()
    },
    methods: {
      /** 查询招商意向资源列表 */
      getList() {
        this.loading = true;
        listBusinessSource(this.queryParams).then(response => {
          // console.log(response)
          //给每行数据强制追加一个数据项phoneData
          response.rows.map(item => {
            item.phoneData = [];
          });
          this.businessSourceList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 存续状态 10存续 20销毁字典翻译
      companySubsistingFormat(row, column) {
        return this.selectDictLabel(this.companySubsistingOptions, row.companySubsisting);
      },
      // 意向合作级别10A,20B,30C,40D字典翻译
      businessTypeFormat(row, column) {
        return this.selectDictLabel(this.businessTypeOptions, row.businessType);
      },

      // 新增弹窗中添加多个联系人按钮
      addPhone(){
        // console.log('123')
        this.form.phoneSoucreList.push(this.phones);
        this.phones={}
      },

      //新增弹窗中删除多个联系人按钮
      removePhone(index) {
        // console.log(index)
        this.form.phoneSoucreList.splice(index,1);
      },

      getRowKeys (row) {
        return row.id
      },
      //获取多联系人联系方式列表
      phoneList(id){
        getlistPhoneSoucre(id).then(response => {
          const {data} = response;
          this.businessSourceList.forEach((temp, index) => {
            // 找到当前点击的行，把动态获取到的数据赋值进去
            if (temp.id === id) {
              this.businessSourceList[index].phoneData = data;
            }
          })
        })
      },
      //表格展开事件 获取手机联系方式
      openTable(row,expandedRows){
        // 每次点击只展示一行
        var that = this
        if (expandedRows.length){
          that.expands = []
          if (row) {
            that.expands.push(row.id)
          }
        } else {
          that.expands = []
        }
        //获取数据展示
        const bsId = row.id;
        // console.log(row)
        if(expandedRows.length > 0){
          this.phoneList(bsId)
        }
      },
      //多个联系人删除事件
      phoneDelecte(row,expandedRows){
        const ids = row.id;
        this.$confirm('是否确认联系人方式?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPhoneSoucre(ids);
        }).then(() => {
          this.msgSuccess("删除成功");
          this.phoneList(row.businessSourceId)
        }).catch(function() {});
      },
      // 多联系人 编辑修改事件
      phoneEdit(row){
        this.dialogadd = true;
        const id = row.id
        this.phoneform.businessSourceId = row.businessSourceId;
        getPhoneSoucre(id).then(res=>{
          // console.log(res)
          this.phoneform = res.data;
        })
        this.addtitle='修改'+row.contact+'的联系方式'
      },
      //多联系人弹窗
      phonesAdd(row){
        this.dialogadd = true
        // console.log(row)
        this.resetpone();
        this.phoneform.businessSourceId = row.id;
        this.addtitle='添加'+row.companyName+'的联系人'
      },
      // 添加联系人表单重置
      resetpone(){
        this.phoneform={
          contact:null,
          phone:null,
          remarks:null,
          id:null
        }
      },
      //添加多联系人弹窗取消
      canceladd(){
        this.resetpone();
        this.dialogadd = false;
      },
      cellFun(){
       return {
        background: "#000000",
        color: "#ffffff",
    };

          // return {
          //   height:"80px",
          //   overflow:'auto' }
      },

      //多联系人 弹窗提交
      submitphoneForm(){
        console.log(this.phoneform)
        this.$refs["phoneform"].validate(valid => {
          if (valid) {
            if (this.phoneform.id != null) {
              updatePhoneSoucre(this.phoneform).then(response => {
                // console.log(response)
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.dialogadd = false;
                  this.phoneList(this.phoneform.businessSourceId)
                }
              });
            } else {
              addPhoneSoucre(this.phoneform).then(response => {
                // console.log(response)
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.dialogadd = false;
                  this.phoneList(this.phoneform.businessSourceId)
                }
              });
            }
          }
        })
      },

      // 取消按钮
      cancel() {
        this.open = false;
        this.followsOpen=false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          companyName: null,
          companySubsisting: null,
          companyContact: null,
          contactPhone: null,
          lastFolllowtime: null,
          followTime: null,
          // merchantsUserId: null,
          businessType: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remarks: null,
          businessName:null,
          phoneSoucreList:[],
          content:null
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
        this.addPhonebtn=true;
        this.open = true;
        this.noedit = false;
        this.title = "添加招商意向资源";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        this.addPhonebtn=false;
        this.noedit = true;
        const id = row.id || this.ids
        getBusinessSource(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改招商意向资源";
        });
      },
      //跟进记录

      /** 资源表添加/编辑 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateBusinessSource(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                  this.phoneList(this.form.id)
                }
              });
            } else {
              //判断多个联系人号码是否重复
              const phonesid = this.form.phoneSoucreList.map(value=>value.phone);
              const idsSet = new Set(phonesid);
              if(this.form.phoneSoucreList){
                if(idsSet.size!= phonesid.length){
                  this.msgSuccess("联系人电话号码重复了");
                  return;
                }
              }
              addBusinessSource(this.form).then(response => {
                // console.log(response)
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
      // handleDelete(row) {
      //   const ids = row.id || this.ids;
      //   this.$confirm('是否确认删除招商意向资源编号为"' + ids + '"的数据项?', "警告", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning"
      //     }).then(function() {
      //       return delBusinessSource(ids);
      //     }).then(() => {
      //       this.getList();
      //       this.msgSuccess("删除成功");
      //     }).catch(function() {});
      // },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有招商意向资源数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBusinessSource(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
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
            getBusinessnameList({businessName:query}).then((res)=>{
              console.log(res)
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

      /**获取该用户的所有跟进信息*/
      handleShowFollowList(row) {
        this.loading = true
        this.followData = { 'businessId': row.id }
        getFollowupList(row.id).then(response => {
            console.log(response)
            this.followlistAll = response.follow || []
            this.loading = false
            this.followsOpen = true
          }
        )
        console.info(row)
      },
      /** 跟进记录提交按钮 */
      followSubmitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var data = this.followData
            data.followTime = this.form.followTime
            data.content = this.form.content
            addFollowup(data).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.followsOpen= false
                getFollowupList(data.businessId).then(response => {
                    console.log(this.followData)
                    this.followlistAll = response.follow || []
                    // console.log(this.followlistAll)
                    this.loading = false
                    this.reset()
                  }
                )
              }
            })
          }
        })
      }
    }
  };
</script>
<style rel="stylesheet/scss"   lang="scss">
  .el-table__expanded-cell[class*=cell] {
    padding:10px 0px 10px 200px;
  }
  .follow-div {
    max-height: 30vh;
    display: flex;
    flex-direction: column;
    padding: 15px;
    overflow-y: auto;
  }
  .follow-add{
    max-height:180px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .follow-item {
    display: flex;
    flex-direction: column;
    padding: 12px 12px;
    border-radius: 8px;
    box-shadow: 0 0 15px 3px rgba(24, 60, 150, 0.1) !important;
    margin-bottom: 15px;
  }

  .follow-item > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .follow-item > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    margin-top: 8px;
  }

  .follow-item > div:nth-child(2) > div {
    border: 1px #eee solid;
    border-radius: 5px;
    padding: 8px;
  }

  .follow-item > div:nth-child(2) > span {
    margin-top: 8px;
    margin-left: auto;
  }

  .input_w{
    .el-select,.el-input,.el-date-editor{
      width: 160px !important;
    }
  }
  .el-dialog__footer{
    padding-top: 0px;
  }

  .resizeNone{
    .el-textarea__inner{ //el_input中的隐藏属性
      resize: none;  //主要是这个样式
    }
  }
 .cells{height: 88px !important;overflow: auto !important;}
</style>
