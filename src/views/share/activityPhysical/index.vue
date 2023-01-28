<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="活动ID" prop="actId">
        <el-input
          v-model="queryParams.actId"
          placeholder="请输入活动ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input
          v-model="queryParams.userPhone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="企业性质:10一般纳税人,20小规模" prop="companyType">
        <el-select v-model="queryParams.companyType" placeholder="请选择企业性质:10一般纳税人,20小规模" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="企业性质" prop="companyType">
        <el-select v-model="queryParams.companyType" placeholder="请选择企业性质" clearable size="small">
          <el-option
            v-for="dict in companyTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="创建人id" prop="createUserId">
        <el-input
          v-model="queryParams.createUserId"
          placeholder="请输入创建人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="创建人姓名" prop="createUserName">
        <el-input
          v-model="queryParams.createUserName"
          placeholder="请输入创建人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="创建人手机号" prop="createUserPhone">
        <el-input
          v-model="queryParams.createUserPhone"
          placeholder="请输入创建人手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="订单ID" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="删除状态1未删除2已删除" prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入删除状态1未删除2已删除"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="删除状态" prop="delTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.delTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择删除状态">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:activity:export']"
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

    <el-table v-loading="loading" :data="activityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="活动ID" align="center" prop="actId" /> -->
      <el-table-column label="办理人姓名" align="center" prop="username"/>
      <el-table-column label="办理人手机号" align="center" prop="userPhone" min-width="120"/>
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="企业性质" align="center" prop="companyType" :formatter="companyTypeFormat" />
      <!-- <el-table-column label="创建人id" align="center" prop="createUserId" /> -->
      <el-table-column label="购买人姓名" align="center" prop="createUserName"/>
      <el-table-column label="购买人手机号" align="center" prop="createUserPhone"/>
      <el-table-column label="订单号" align="center" prop="actOrderNo" min-width="200"/>
      <el-table-column label="实付金额" align="center" prop="paymentAmount"/>
      <el-table-column label="付款时间" align="center" prop="orderUpdateTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderUpdateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="actState" :formatter="actStateFormat"/>
      <el-table-column label="付款方式" align="center" prop="actPayMethod" :formatter="actPayMethodFormat"/>
      <el-table-column label="处理状态" align="center" prop="processState" :formatter="orderStateFormat"/>
      <!-- <el-table-column label="订单ID" align="center" prop="orderId" /> -->
      <!-- <el-table-column label="删除状态1未删除2已删除" align="center" prop="isDel" /> -->
      <!-- <el-table-column label="删除状态" align="center" prop="delTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.delTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:activity:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:activity:remove']"
          >删除</el-button> -->
          <el-button v-if="scope.row.processState==10&&isKefu"
                     size="mini"
                     type="text"
                     @click="showNetSalesmanFun(scope.row)"
          >
            业务下发
          </el-button>

          <el-button v-if="scope.row.processState==20&&isSaleM"
                     size="mini"
                     type="text"
                     @click="showFollow(scope.row)"
          >
            业务跟进
          </el-button>
          <el-button v-if="scope.row.processState==30||(scope.row.processState==10&&isKefu)"
                     size="mini"
                     type="text"
                     @click="showFollow(scope.row)"
          >
            跟进记录
          </el-button>
          <el-button v-if="scope.row.processState==20&&isSaleM"
                     size="mini"
                     type="text"
                     @click="sureFun(scope.row)"
          >
            完成
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

    <el-dialog :title="saleTitle" :visible.sync="saleOpen" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="业务员" prop="userId">
          <el-select v-model="form.userId" placeholder="请选择">
            <el-option
              v-for="item in salesArr"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSaleForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 跟进记录 -->
    <el-dialog title="跟进记录" :visible.sync="followsOpen" width="600px" append-to-body :close-on-click-modal="false">
      <el-col :span="23">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-if="form.processState!=30&&!(form.processState==10&&isKefu)">
          <el-form-item label="跟进内容：" prop="content">
            <el-input type="textarea" v-model="form.content" placeholder="请输入跟进内容"/>
          </el-form-item>
          <el-form-item label="跟进时间：" prop="followTime">
            <el-date-picker clearable size="small" style="width: 200px"
                            v-model="form.followTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择再次跟进时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <div class="follow-div">
        <div class="follow-item " v-for="(item,index) in followlistAll">
          <div>
            <div>
              <span>{{item.nickName}}</span>
              <!--<span>({{item.role_name}})</span>-->
            </div>
            <span>{{item.phonenumber}}</span>
          </div>
          <div>
            <div class="content">
              <span>{{item.content}}</span>
            </div>
            <div class="time">
              <div>
                <span>下次跟进时间：</span>
                <span>{{item.bcfollowTime,'yyyy-MM-dd'| format}}</span>
              </div>
              <span>{{item.createTime,'yyyy-MM-dd hh:mm:ss' | format}}</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="form.processState!=30&&!(form.processState==10&&isKefu)">
        <el-button type="primary" @click="followSubmitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listActivity,
        getActivity,
        delActivity,
        addActivity,
        updateActivity,
        exportActivity,
        netSalesmanList,
        upfouprBookkeepingAgency,
        getFollowList,
        addFollowOrder
    } from "@/api/share/activityPhysical.js";
import { processStateFun } from '@/api/share/activityOrder'

export default {
  name: "Activity",
  data() {
    return {
      // 遮罩层
      loading: true,
      userRole: this.$store.state.user.roles,
      isKefu: false,
      isSaleM: false,
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
      // 财务体检活动表格数据
      activityList: [],
      // 企业性质:10一般纳税人,20小规模字典
      companyTypeOptions: [],
      // 订单状态字典
      actStateOptions: [],
      // 付款方式字典
      actPayMethodOptions: [],
      // 订单处理状态
      orderStateOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        actId: null,
        username: null,
        userPhone: null,
        dataTransfer: null,
        companyType: null,
        businessLicensePositive: null,
        createUserId: null,
        createUserName: null,
        createUserPhone: null,
        actOrderNo: null,
        actState: null,
        orderId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderId: [
          { required: true, message: "订单ID不能为空", trigger: "blur" }
        ],
      },
      saleTitle: '',
      saleOpen: false,
      followsOpen: false,
      salesArr: [],
      followlistAll: []
    };
  },
  created() {
    this.getList();
    this.getDicts('foupr_form_order_act_state').then(response => {
      this.actStateOptions = response.data
    })
    this.getDicts('foupr_bookkeeping_agency_activity_company_type').then(response => {
      this.companyTypeOptions = response.data
    })
    this.getDicts('foupr_form_order_act_pay_method').then(response => {
      this.actPayMethodOptions = response.data
    })
    this.getDicts('foupr_form_order_process_state').then(response => {
      this.orderStateOptions = response.data
    })
    let roles = this.userRole
    this.isKefu = roles.filter((e, i, a) => {
      return e == 'kefu'
    }).length > 0
    this.isSaleM = roles.filter((e, i, a) => {
      return e == 'net_salesman'
    }).length > 0
  },
  methods: {
    /** 查询财务体检活动列表 */
    getList() {
      this.loading = true;
      listActivity(this.queryParams).then(response => {
        console.log(response)
        this.activityList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 订单状态字典翻译
    actStateFormat(row, column) {
      return this.selectDictLabel(this.actStateOptions, row.actState)
    },
    // 付款方式字典翻译
    actPayMethodFormat(row, column) {
      return this.selectDictLabel(this.actPayMethodOptions, row.actPayMethod)
    },
    // 活动订单状态类型字典翻译
    orderStateFormat(row, column) {
      return this.selectDictLabel(this.orderStateOptions, row.processState)
    },
    // 企业性质:10一般纳税人,20小规模字典翻译
    companyTypeFormat(row, column) {
      return this.selectDictLabel(this.companyTypeOptions, row.companyType)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.saleOpen = false
      this.followsOpen = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        actId: null,
        username: null,
        userPhone: null,
        companyName: null,
        companyType: null,
        createUserId: null,
        createUserName: null,
        createUserPhone: null,
        createTime: null,
        orderId: null,
        isDel: null,
        delTime: null
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
      this.title = "添加财务体检活动";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getActivity(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改财务体检活动";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addActivity(this.form).then(response => {
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
      this.$confirm('是否确认删除财务体检活动编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delActivity(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有财务体检活动数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportActivity(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    // 完成
    sureFun: function(row) {
      this.$confirm('是否确认当前订单已完成?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return processStateFun({ id: row.orderId })
      }).then(response => {
        this.getList()
        this.msgSuccess('订单完成')
      }).catch(function() {
      })
    },
    /** 业务列表 */
    showNetSalesmanFun: function(row) {
      netSalesmanList({}).then((res) => {
        console.info(res)
        if (res.code == 200) {
          this.saleOpen = true
          this.saleTitle = '业务下发'
          this.salesArr = res.data || []
          this.form.id = row.id
        }
      })
    },
    // 业务下发
    submitSaleForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          upfouprBookkeepingAgency(this.form.id, this.form.userId).then(response => {
            if (response.code === 200) {
              this.msgSuccess('下发成功')
              this.saleOpen = false
              this.getList()
            }
          })
        }
      })
    },
    //跟进
    showFollow: function(row) {
      console.info(row)
      this.followsOpen = true
      this.form.userId = row.salesmanId
      this.form.orderId = row.orderId
      this.form.processState = row.processState
      this.form.actType = null
      this.getFollow({ orderId: row.orderId, userId: row.salesmanId })
    },
    getFollow: function(row) {
      getFollowList({ orderId: row.orderId, userId: row.salesmanId }).then((res) => {
        if (res.code == 200) {
          this.followlistAll = res.rows
        }
      })
    },
    // 提交跟进/
    followSubmitForm: function(row) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let data = {
            orderId: this.form.orderId,
            actType: 50,
            content: this.form.content,
            userId: this.form.userId,
            bcfollowTime: this.form.followTime
          }
          addFollowOrder(data).then((res) => {
            console.info(res)
            this.reset()
            this.getList()
            this.msgSuccess('跟进成功')
            this.followsOpen = false
          }).catch()
        }
      })
    }
  }
};
</script>
