<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="105px"
    >
      <el-form-item label="申诉状态" prop="appealState">
        <el-select
          v-model="queryParams.appealState"
          placeholder="请选择申诉状态"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in appealStateOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商机id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入商机id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuery"
          />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          :content="showSearch ? '隐藏搜索' : '显示搜索'"
          placement="top"
        >
          <el-button
            size="mini"
            circle
            icon="el-icon-search"
            @click="showSearch = !showSearch"
          />
        </el-tooltip>
      </div>
    </el-row>

    <el-table
      v-loading="loading"
      :data="sourceList"
      @selection-change="handleSelectionChange"
      @row-click="dialogVisibles"
      height='720'
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源id" align="center" prop="id"/>
      <el-table-column
        label="商户确认"
        align="center"
        prop="agentState"
        :formatter="agentStateFormat"
        min-width="80"
      />

      <el-table-column
        label="审核确认"
        align="center"
        prop="returnState"
        :formatter="returnStateFormat"
        min-width="80"
      />
      <el-table-column
        label="客户名称"
        align="center"
        prop="customerName"
        min-width="100"
      />


      <el-table-column
        label="业务描述"
        align="center"
        prop="categoryText"
        min-width="300"
      />

      <el-table-column
        label="客户电话"
        align="center"
        prop="customerPhone"
        min-width="120"
      >
      <!--  <template slot-scope="scope">
          <span>{{scope.row.customerPhone }}</span>
        </template>-->
      </el-table-column>

      <el-table-column
        label="客户QQ"
        align="center"
        prop="customerQQ"
        min-width="120"
      >
<!--        <template slot-scope="scope">
          <span>{{scope.row.customerQQ | phoneFiler}}</span>
        </template>-->
      </el-table-column>

      <el-table-column
        label="客户微信"
        align="center"
        prop="customerWeixin"
        min-width="160"
      >
    <!--    <template slot-scope="scope">
          <span>{{scope.row.customerWeixin | phoneFiler}}</span>
        </template>-->
      </el-table-column>

      <el-table-column label="客户来源" align="center" prop="customerSource"/>
      <el-table-column label="省" align="center" prop="prov"/>
      <el-table-column label="市" align="center" prop="city"/>
      <el-table-column
        label="接收用户"
        align="center"
        prop="userId"
        min-width="90"
      >
        <template slot-scope="scope">

            <span>{{
                scope.row.nickName ? scope.row.nickName : scope.row.userName
              }}</span>

        </template>
      </el-table-column>

      <el-table-column
        label="合作商"
        align="center"
        prop="companyName"
        min-width="300"
      />


      <el-table-column
        label="合作商接收信息时间"
        align="center"
        prop="receiveTime"
        min-width="180"
      >
        <template slot-scope="scope">

            <span>{{
                parseTime(scope.row.receiveTime, "{y}-{m}-{d} {h}:{i}:{s}")
              }}</span>

        </template>
      </el-table-column>

     <!-- <el-table-column
        label="跟进时间"
        align="center"
        prop="followTime"
        width="180"
      >
        <template slot-scope="scope">

          <span>{{ parseTime(scope.row.followTime, "{y}-{m}-{d}") }}</span>

        </template>
      </el-table-column>-->

      <el-table-column label="商机类型" align="center" min-width="120">
        <template slot-scope="scope">

          <span>{{ scope.row.categoryCity + scope.row.categoryType }}</span>

        </template>
      </el-table-column>

     <!-- <el-table-column
        label="商机级别"
        align="center"
        prop="sourceTypeLv"
        :formatter="sourceTypeLvFormat"
      />-->


      <!--<el-table-column
        label="是否成交"
        align="center"
        prop="dealState"
        :formatter="dealStateFormat"
      />
-->
      <el-table-column
        label="驳回原因"
        align="center"
        prop="remark"
        min-width="320"
      />
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        class-name="small-padding fixed-width"
        min-width="220"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.appealState==20"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlePass(scope.row)"
            v-hasPermi="['share:source:edit']"
          >通过</el-button>
          <el-button
            v-if="scope.row.appealState==20"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleReject(scope.row)"
          >驳回</el-button>
          <el-button
            v-if="(scope.row.appealState == 30)&&scope.row.agentState==20 || scope.row.returnState==20"
            size="mini"
            type="text"
            disabled=""
          >审核已通过</el-button>
          <el-button
            v-if="(scope.row.appealState == 30)&&(scope.row.agentState== 10 || scope.row.returnState ==10) "
            size="mini"
            type="text"
            disabled=""
          >审核已驳回</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleShowFollowList(scope.row)"
            >跟进记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 审核驳回 -->
    <el-dialog
      title="审核驳回"
      :visible.sync="appealOpen"
      width="700px"
      style="margin-top:15vh;"
      append-to-body
    >
      <el-form
        ref="appealform"
        :model="appealform"
        :rules="appealRules"
        label-width="120px"
      >
        <el-form-item label="驳回原因:" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            class="resizeNone"
            v-model="appealform.remark"
            placeholder="请输入驳回原因"
            style="width:90%;"
          />
        </el-form-item>
        <!-- 文件上传 -->
        <el-form-item label="上传文件:" prop="textFilePath"
                      :rules="{
                             // required: form.reason==reasonOptions[0] ? true : false,
                              message: '上传文件不能为空',
                              trigger: ['blur', 'change']
                         }"
        >
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="updateAction"
            :on-remove="handleRemove"
            :on-success="(res,file)=>handleAvatarSuccess(res,file)"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :limit="5"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">图片只能上传jpg/png格式,音频只能上传mp3/wav/mp4格式</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="appealSubmitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 跟进记录 -->
    <el-dialog
      title="跟进记录"
      :visible.sync="followsOpen"
      width="700px"
      style="margin-top:15vh;"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="followRules"
        label-width="120px"
      >
        <el-form-item label="跟进内容：" prop="content">
          <el-input
            type="textarea"
            :rows="2"
            class="resizeNone"
            v-model="form.content"
            placeholder="请输入跟进内容"
            style="width:90%;"
          />
        </el-form-item>
        <!-- <el-form-item prop="followTime" style="display: flex;justify-content: flex-end;padding-right: 8%;" >
            <span style="font-weight: 700;">下次跟进记录：</span>
            <el-date-picker clearable size="small"
              v-model="form.followTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择下次跟进时间">
            </el-date-picker>
          </el-form-item> -->
      </el-form>

      <div class="follow-div">
        <div
          class="follow-item "
          v-for="(item, index) in followlistAll"
          :key="index"
        >
          <div>
            <div>
              <span>{{item.nick_name }}</span>
              <span>({{item.role_name }})</span>
            </div>

            <span>{{item.phonenumber }}</span>
          </div>
          <div>
            <div>
              <div>
                  <span v-if="item.reason">{{ item.reason }}-</span>
                   <span>{{ item.content }}</span>
               </div>
              <div v-if="item.img" style="display: flex;align-items: center;margin-top: 10px;">
                <span>申诉无效图片：</span>
                <el-image
                    v-for='(i,iindex) in item.img'
                    :key='iindex'
                    style="width:100px;height: 100px"
                    :src="path + '/profile'+ i"
                    :preview-src-list="[(path + '/profile'+ i)]"
                    >
                 </el-image>
              </div>
              <div v-if="item.audio" style="display: flex;align-items: center;margin-top: 10px;">
                <span>申诉无效音频：</span>
                <audio
                      style="height: 30px;"
                      v-for="(a,aindex) in item.audio"
                      :key="aindex"
                       controls="controls"
                       preload="auto"
                       :src="path + '/profile'+a"
                    >
                </audio>
              </div>
              <div v-if="item.video" style="display: flex;align-items: center;margin-top: 10px;">
                <span>申诉无效音频：</span>
                <video
                  style="width:200px;height:100px;"
                  v-for="(v,vindex) in item.video"
                  :key="vindex"
                  controls
                  :src="path + '/profile'+v"
                    >
                </video>
              </div>
            </div>
            <span style=" float: left;margin-left:0;">
              下次跟进时间：{{item.bcfollow_time, "yyyy-MM-dd " | format}}
               <span style="margin-left:340px">{{ item.create_time, "yyyy-MM-dd hh:mm:ss" | format }}</span>
            </span>
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
import {
  listSource,
  getSource,
  delSource,
  addSource,
  updateSource,
  exportSource,
  getSourceAgent,
  getUserlist,
  getCustomerList,
  getCompanyList,
  listAuditSource,
  updateAppeal
} from "@/api/share/source";
import {
  listFollow,
  getFollow,
  getFollowlist,
  delFollow,
  addFollow,
  updateFollow,
  exportFollow
} from "@/api/share/follow";

import { throttle } from "@/utils/ruoyi";

/*获取省市区信息*/
import {
  regionData,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  name: "Source",
  data() {
    return {
      path:process.env.VUE_APP_BASE_API,
      dialogVisible: false,
      VisiblesList: {},
      remark: null,
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
      // 资源分配表格数据
      sourceList: [],
      // 弹出层标题
      title: "",
      //代理商信息列表
      rzCompanyList: [],
      // 是否显示弹出层
      open: false,
      // 代理商接收状态 10 已接收 20未接收 字典
      followStateOptions: [],
      // 代理商确认信息的有效状态 10有效 20无效字典
      agentStateOptions: [],
      // 回访专员确认信息有效状态 10有效 20无效 0待审核字典
      returnStateOptions: [],
      // 商机级别ABCD字典
      sourceTypeLvOptions: [],
      // 是否成交10 成交 0 未成交字典
      dealStateOptions: [],
      followlistAll: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        customerName: null,
        customerPhone: null,
        categoryText: null,
        customerSource: null,
        prov: null,
        city: null,
        county: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        dealState: null,
        categoryCity: null,
        categoryType: null,
        customerQQ: null,
        customerWeixin: null,
        createTime: null,
        appealState:null
      },
      querComParams: {
        createDate: null
      },
      customerOptions: [],
      companyOptions: [],
      // 表单参数
      form: {},
      isResouceShow: 1,
      // 表单校验
      rules: {
        customerName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        customerPhone: [{ message: "客户电话不能为空", trigger: "blur" }],
        customerSource: [
          { required: true, message: "客户来源不能为空", trigger: "blur" }
        ],
        prov: [{ required: true, message: "省不能为空", trigger: "blur" }],
        county: [{ required: true, message: "区不能为空", trigger: "blur" }],
        receiveId: [
          { required: true, message: "请选择合作商", trigger: "blur" }
        ],
        returnState: [
          {
            required: true,
            message: "回访确认信息状态不能为空",
            trigger: "blur"
          }
        ],
        selectedOptions: [
          { required: true, message: "省市区信息不能为空", trigger: "blur" }
        ],
        sourceTypeArr: [
          { required: true, message: "请选择商业类型", trigger: "blur" }
        ]
        // userId:[{ required: true, message: '请选择业务员', trigger: 'blur' }]
      },
      followRules: {
        content: [
          { required: true, message: "跟进内容不能为空", trigger: "blur" }
        ],
        followTime: [
          { required: true, message: "下次跟进时间不能为空", trigger: "blur" }
        ]
      },
      options: regionData,
      typeOption: [],
      followsOpen: false,
      followData: {},
      agentOptions: [],
      userOptions: [],
      agentFrom: [],
      //申诉状态  因为不确定所以就直接写不加字典了
      appealStateOptions:[
        {id:20,name:'申诉中'},
        {id:30,name:'已审核'},
      ],
      appealOpen:false,
      appealform:{},
      appealRules:{
        remark: [
          { required: true, message: "驳回原因不能为空", trigger: "blur" }
        ],
      },
      appealType:0,
      // 文件上传
      updateAction: process.env.VUE_APP_BASE_API + '/share/follow/uploadFile',
      updateImg: {},
      fileList:[]
    };
  },
  created() {
    this.getList();
    this.getSourceType();

    this.getDicts("refer_state").then(response => {
      this.agentStateOptions = response.data;
      this.returnStateOptions = response.data;
      this.followStateOptions = response.data;
    });
    this.getDicts("source_type_lv").then(response => {
      this.sourceTypeLvOptions = response.data;
    });
    this.getDicts("deal_state").then(response => {
      if (response.code) {
        this.dealStateOptions = response.data;
      }
    });
    this.getDicts("agent_from").then(response => {
      this.agentFrom = response.data;
    });

  },
  // 手机号码过滤
  filters: {
    phoneFiler(val) {
      if (val) {
        let start = val.slice(0, 3);
        let end = val.slice(-4);
        return `${start}****${end}`;
      } else {
        return ``;
      }
    }
  },
  methods: {
    dialogVisibles(row, column, event) {
      if(column.property){
        let id = row.id;
        this.dialogVisible = true;
        getSource(id).then(response => {
          let data = response.data
          data.agentStateName = this.selectDictLabel(this.agentStateOptions,data.agentState)
          data.returnStateName = this.selectDictLabel(this.returnStateOptions,data.returnState)
          data.dealStateName = this.selectDictLabel( this.dealStateOptions,data.dealState)
          this.VisiblesList = data;

        });
      }
    },

    /** 查询资源分配列表 */
    getList() {
      this.loading = true;
      listAuditSource(this.queryParams).then(response => {
        console.log(response)

        this.sourceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 远程搜索客户名称电话
    remoteMethod(query) {
      let that = this;
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          // this.companyOptions = this.list.filter(item => {
          //   return item.label.toLowerCase()
          //     .indexOf(query.toLowerCase()) > -1;
          // });
          getCustomerList({ customerName: query })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.customerOptions = res.rows || [];
              }
              console.info(res);
            })
            .catch(err => {});
        }, 200);
      } else {
        this.customerOptions = [];
      }
    },
    // 选择客户姓名的同时把手机也传给后台进行搜索
    handleChangeName(val){
      // console.log(this.customerOptions)
      // console.log(val)
      this.customerOptions.map(item=>{
        if(item.id == val){
          this.queryParams.customerName = item.customerName
          this.queryParams.customerPhone = item.customerPhone
        }
        return item
      })
      this.getList()
    },
    // 文件删除
    handleRemove(file, fileList){
      console.log(file)
      let imgUrl = file.response.imgUrl
      this.form.textFilePath = this.form.textFilePath.filter(item=>item=!file.response.imgUrl)
      // console.log(this.form.textFilePath)
    },
    // 文件上传成功
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        let imgUrl = res.imgUrl
        let arr = [];
        //arr = this.form.textFilePath
        //arr.push(imgUrl)
        //this.form.textFilePath = arr
        this.form.textFilePath.push(imgUrl)
        console.log(this.form)
      } else {
        this.$message.error('文件上传失败!')
      }
    },
    // 文件上传传前
    beforeAvatarUpload(file) {
      // console.info(file)
      let testmsg = file.name.substring(file.name.lastIndexOf('.')+1);
      console.log(testmsg)
      // let arr = ['mp3','mp4','mav','jpeg','png','jpg']
      let arr = ['mp3','MP3','mp4','MP4','mav','MAV','jpeg','JPEG','png','PNG','jpg','JPG']
      // // 检验是不是符合格式
      if (arr.indexOf(testmsg) == -1) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!上传音频只能是mp3/wav/mp4格式');
        return false;
      }else{
        return true;
      }
    },

    // 清除选择的客户名称和电话 内容
    handleClear(){
      this.queryParams.customerName = null
      this.queryParams.customerPhone = null
      this.getList()
    },
    //远程搜索代理商
    remoteMethodt(query) {
      // console.log(query)
      let that = this;
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          // this.companyOptions = this.list.filter(item => {
          //   return item.label.toLowerCase()
          //     .indexOf(query.toLowerCase()) > -1;
          // });
          getCompanyList({ companyName: query })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.companyOptions = res.rows || [];
              }
              console.info(res);
            })
            .catch(err => {});
        }, 200);
      } else {
        this.companyOptions = [];
      }
    },
    // 选择代理商同时进行搜索
    handleChangereceiveId(val){
      // console.log(this.customerOptions)
      console.log(val)
      this.queryParams.receiveId = val;
      this.getList()
    },

    // 清除代理商 内容
    handleClear1(){
      this.queryParams.receiveId = null
      this.getList()
    },

    // 根据省市区选择商机类型
    getSourceType() {
      var data = {
        prov: this.form.prov || "",
        city: this.form.city || "",
        county: this.form.county || ""
      };
      if (data.prov && data.city && data.county) {
        getSourceAgent(data).then(res => {
          if (res.code == 200) {
            console.log(res);
            let data = res.sourceType || [];
            let tempList = [],
              temp = [];
            data.map((item, index, array) => {
              let city = item.categoryCity;
              if (temp.includes(city)) {
              } else {
                temp.push(city);
                let ch = array.filter((x, y, a) => {
                  x.label = x.categoryType + " (" + x.content + ")";
                  return x.categoryCity == city;
                });
                tempList.push({ label: city, id: index, children: ch || [] });
              }
            });
            this.typeOption = tempList || [];
          } else {
            this.typeOption = [];
          }
        });
      }
    },
    //根据省市区 + 商机 获取代理商
    getAgentList() {
      var data = {
        prov: this.form.prov || "",
        city: this.form.city || "",
        county: this.form.county || "",
        sourceTypeId: this.form.sourceTypeId || ""
      };
      if (data.prov && data.city && data.county && data.sourceTypeId) {
        getSourceAgent(data).then(response => {
          // console.info(response)
          if (response.code == 200) {
            this.form.receiveId = null;
            this.form.userId = null;
            this.agentOptions = response.customerSources || [];
          } else {
            this.agentOptions = [];
          }
        });
      }
    },
    //根据代理商 获取 业务员
    getSalesman() {
      var data = {
        companyId: this.form.companyId || ""
      };
      if (data.companyId) {
        getUserlist(data).then(response => {
          // console.info(response)

          if (response.code == 200) {
            this.remark = response.companyAndUser.companyRemark;
            console.log(response.companyAndUser.companyRemark);

            this.userOptions = response.companyAndUser.sharUser || [];
          } else {
            this.userOptions = [];
          }
        });
      }
    },

    /* 省市选择 */
    handleChange(value) {
      // console.log(value)
      (this.remark = null), (this.form.sourceTypeArr = null);
      (this.form.receiveId = null),
        (this.form.userId = null),
        ++this.isResouceShow;
      this.form.selectedOptions = value;
      this.form.prov = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
      if (this.form.county == "市辖区") {
        this.$message.error("请选择具体的市辖区");
        this.typeOption = [];
        this.userOptions = [];
        this.agentOptions = [];
        return;
      } else {
        this.getSourceType();
      }
    },

    handleChange2: function(value) {
      (this.remark = null),
        // console.log(value)
        (this.form.receiveId = null),
        (this.form.userId = null),
        (this.form.sourceTypeId = value[1]);
      this.form.sourceTypeArr = value;
      this.getAgentList();
    },

    handleUser: function(value) {
      console.log(value);
      (this.form.userId = null), (this.form.companyId = value);
      this.getSalesman();
    },

    // getCompUserlist: function() {
    //   var data = {
    //     companyId: this.form.companyId || ''
    //   }
    //   if (data.companyId) {
    //     getUserlist(data).then(response => {
    //       console.info(response)
    //       console.info(response.sharUser)
    //       if (response.code == 200) {
    //         this.userOptions = response.sharUser || []
    //       } else {
    //         this.userOptions = []
    //       }

    //     })
    //   }
    // },

    // 代理商接收状态 10 已接收 20未接收 字典翻译
    followStateFormat(row, column) {
      return this.selectDictLabel(this.followStateOptions, row.followState);
    },
    // 代理商确认信息的有效状态 10有效 20无效字典翻译
    agentStateFormat(row, column) {
      return this.selectDictLabel(this.agentStateOptions, row.agentState);
    },
    // 回访专员确认信息有效状态 10有效 20无效 0待审核字典翻译
    returnStateFormat(row, column) {
      return this.selectDictLabel(this.returnStateOptions, row.returnState);
    },
    // 商机级别ABCD字典翻译
    sourceTypeLvFormat(row, column) {
      return this.selectDictLabel(this.sourceTypeLvOptions, row.sourceTypeLv);
    },
    // 是否成交10 成交 0 未成交字典翻译
    dealStateFormat(row, column) {
      return this.selectDictLabel(this.dealStateOptions, row.dealState);
    },
    // 取消按钮
    cancel() {
      this.dialogVisible = false;
      this.VisiblesList = [];
      this.remark = null;
      this.open = false;
      this.followsOpen = false;
      this.appealOpen = false
      this.reset();
    },
    // bfclose:function(done){
    //   this.reset();
    //   done();
    // },
    // 表单重置
    reset() {
        this.form = {
          id: null,
          customerName: null,
          customerPhone: null,
          categoryText: null,
          customerSource: null,
          prov: null,
          city: null,
          county: null,
          receiveId: null,
          receiveTime: null,
          followTime: null,
          agentState: null,
          returnState: null,
          sourceTypeLv: null,
          dealState: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          content: null,
          selectedOptions: null,
          sourceTypeId: null,
          sourceTypeArr: null,
          userId: null,
          customerQQ: null,
          customerWeixin: null,
          turnover:null,
          textFilePath:[]
        }
        this.appealform = {
          id:null,
          remark:null
        }
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
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },

    /** 提交按钮 */
    submitForm: throttle(function() {
      this.remark = null;
      console.info(this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSource(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addSource(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        } else {
          console.info(valid);
        }
      });
    }, 6000),

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除资源分配编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delSource(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },

     // 审核通过
     handlePass(row){
      this.appealType = 1
      let id = row.id;
      let data= {
        id:id,
        type:1
      }
      this.$confirm(
        '是否确认编号为"' + id + '"的商机为无效?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return updateAppeal(data);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("审核通过");
        })
        .catch(function() {});
     },

     // 审核驳回
     handleReject(row){
       this.reset();
       // this.appealType = 2
       this.appealOpen = true
       this.appealform.id = row.id
       var data = new Date();
       var month =
         data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
       var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
       this.appealform.value = data.getFullYear() + "-" + month + "-" + date;
     },
     // 审核驳回提交
     appealSubmitForm(){
      this.appealform.type = 0
       let textFilePath = this.form.textFilePath.toString();
      var data = {
        content: this.appealform.remark,
        customerId: this.appealform.id,
        bcfollowTime: this.appealform.value,
        reason:9999,
        textFilePath:textFilePath
      };
      this.$refs["appealform"].validate(valid => {
        if (valid) {
          updateAppeal(this.appealform).then(response => {
            if (response.code === 200) {
              addFollow(data).then(res=>{
                this.$refs.upload.clearFiles();
                console.log('跟进记录添加成功')
              })
              this.msgSuccess("审核驳回");
              this.appealOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      });
     },
     /**获取该用户的所有跟进信息*/
    handleShowFollowList(row) {
      this.loading = true;
      this.followData = { customerId: row.id };
      let img = [];
      let audio = [];
      let video = [];
      getFollowlist(this.followData).then(response => {
        console.log(response)
        response.follows.map(items=>{
          if(items.text_filePath &&items.text_filePath.length>0){
            items.text_filePath = items.text_filePath.split(',')

            items.text_filePath.forEach(item=>{
              let testmsg = item.substring(item.lastIndexOf('.')+1);
              console.info(testmsg)
              if(testmsg=='jpg'||testmsg=='png'){
                img.push(item)
                items.img = img
              }
              if(testmsg=='mp3'|| testmsg=='mav'){
                audio.push(item)
                items.audio = audio
              }
              if(testmsg=='mp4'){
                video.push(item)
                items.video = video
              }
            })
          }
          img = []
          audio = []
          video = []
          return items
        })
        // console.log(response.follows);
        console.log(this.path)
        this.followlistAll = response.follows || [];

        this.loading = false;
        this.followsOpen = true;
      });
      console.info(row);
    },

		// 跟进记录
		getFollowlists(follow){
		  let img = [];
		  let audio = [];
		  let video = [];
		  getFollowlist(follow).then(response => {
		    response.follows.map(items=>{
		      if(items.text_filePath &&items.text_filePath.length>0){
		        items.text_filePath = items.text_filePath.split(',')

		        items.text_filePath.forEach(item=>{
		          let testmsg = item.substring(item.lastIndexOf('.')+1);
		          // console.info(testmsg)
		          if(testmsg=='jpg'||testmsg=='png'){
		            img.push(item)
		            items.img = img
		          }
		          if(testmsg=='mp3'|| testmsg=='mav'){
		            audio.push(item)
		            items.audio = audio
		          }
		          if(testmsg=='mp4'){
		            video.push(item)
		            items.video = video
		          }
		        })
		      }
		      img = []
		      audio = []
		      video = []
		      return items
		    })
		    this.followlistAll = response.follows || [];
		    this.loading = false;
		    // this.reset();
		  });
		},

    /** 跟进记录提交按钮 */
    followSubmitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = this.followData;
          data.content = this.form.content;
          // data.followTime = this.form.followTime
          console.log(data);
          addFollow(data).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
							this.reset();
							let follow = {
							  customerId: data.customerId
							}
							this.getFollowlists(follow)
              // getFollowlist(data).then(response => {
              //   this.followlistAll = response.follows || [];
              //   console.log(this.followlistAll);
              //   this.loading = false;
              //   this.reset();
              // });
            }
          });
        }
      });
    },



  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.follow-div {
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  padding: 15px;
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
.el-dialog__footer {
  padding-top: 0px;
}
.resizeNone {
  .el-textarea__inner {
    //el_input中的隐藏属性
    resize: none; //主要是这个样式

  }
}
.searchform{
  position:relative;
  height:58px;
  overflow: hidden;
}
.searchform1{
  position:relative;
  height: auto;
}
.searchform1 .icon{
  font-size: 22px;
  color:gray;
  transform:rotate(-90deg);
  position: absolute;
  left: 50%;
  bottom: -3px;
  display: block;
  cursor: pointer;
}
.searchform .icon{
  font-size: 22px;
  color:gray;
  transform:rotate(90deg);
  position: absolute;
  left: 50%;
  bottom: -3px;
  display: block;
  cursor: pointer;
}
</style>
