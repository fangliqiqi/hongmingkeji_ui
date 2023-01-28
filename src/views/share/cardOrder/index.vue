<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="110px">
      <el-form-item label="业务员手机号码" prop="sellerId">
        <el-input
          v-model="queryParams.sellerId"
          placeholder="业务员手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="套餐类型" prop="cardId" >
        <el-select v-model="queryParams.cardId" placeholder="请选择套餐类型" style="width:100%">
          <el-option
            v-for="dict in cardList"
            :key="dict.id"
            :label="dict.title"
            :value="dict.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付方式" prop="payType">
        <el-select v-model="queryParams.payType" placeholder="请选择支付方式" style="width:100%">
          <el-option
            v-for="dict in payTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单状态" prop="orderStatus">
        <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" style="width:100%">
          <el-option
            v-for="dict in orderStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="支付时间" prop="payTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.payTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择支付时间">
        </el-date-picker>
      </el-form-item> -->
     <!-- <el-form-item label="订单时间" prop="orderTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.orderTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择订单时间">
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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:cardOrder:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:cardOrder:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDeletes"
          v-hasPermi="['share:cardOrder:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:cardOrder:export']"
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

    <el-table v-loading="loading" :data="cardOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单号" align="center" prop="idStr" width="140px"/>
      <el-table-column label="买家名称" align="center" prop="buyerName" />
      <el-table-column label="联系方式" align="center" prop="buyerPhone" width="110px"/>
      <el-table-column label="套餐类型" align="center" prop="cardName" width="120px"/>
      <el-table-column label="业务员" align="center" prop="sellerName" width="110px"/>
      <el-table-column label="业务员手机号码" align="center" prop="sellerPhone" width="110px"/>
      <el-table-column label="卡券单价(元)" align="center" prop="cardPrice" />
      <el-table-column label="购买数量" align="center" prop="cardNumber" />
      <el-table-column label="订单总价(元)" align="center" prop="payMoney" />
      <el-table-column label="支付方式" align="center" prop="payType" :formatter="payTypeFormat"/>
      <el-table-column label="付款凭证" align="center" width="200px">
        <template slot-scope="scope">
          <div style="display: flex;justify-content: center;align-items: center;">
            <el-image  v-for="(item,index) in scope.row.photoList" :key='index' style="width:60px;margin-left: 10px;"
                      :src="path+item"  fit="fill" :preview-src-list="[path+item]"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="orderStatus" :formatter="orderStatusFormat"/>
      <el-table-column label="订单时间" align="center" prop="orderTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" prop="payTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180"  fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.orderStatus!=3"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:cardOrder:edit']"
          >修改</el-button>
          <el-button
           v-if="scope.row.orderStatus==2"
            size="mini"
            type="text"
            icon="el-icon-mouse"
            @click="handleCheck(scope.row)"
          >审核</el-button>
          <el-button
            v-if="scope.row.orderStatus!=3"
            size="mini"
            type="text"
            icon="el-icon-delete"
           @click="handleDelete(scope.row)"
          >作废</el-button>
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

    <!-- 添加或修改卡券订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body :before-close="cancel">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="套餐类型" prop="cardId" >
              <el-select v-model="form.cardId" placeholder="请选择套餐类型" style="width:100%">
                <el-option
                  v-for="dict in cardList"
                  :key="dict.id"
                  :label="dict.title"
                  :value="dict.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="buyerPhone">
              <el-input v-model="form.buyerPhone" type="number" :maxlength='11'  :minlength="11"
                        @blur="userPhone" placeholder="请输入客户手机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购买数量" prop="cardNumber">
              <el-input v-model="form.cardNumber" type="number" placeholder="请输入卡券数量" style="width:80%"
                        @blur="moneySum"/>
              <span style="width:20%;text-align:right;display: inline-block;font-size: 16px;">张</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价" prop="cardPrice">
              <el-input v-model="form.cardPrice" type="number" placeholder="请输入卡券单价" style="width:80%"
                        @blur="moneySum"/>
              <span style="width:20%;text-align:right;display: inline-block;font-size: 16px;">元/张</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="订单总价" prop="payMoney">
              <el-input v-model="form.payMoney" placeholder="请输入支付金额" type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式" prop="payType">
              <el-select v-model="form.payType" placeholder="请选择支付方式" style="width:100%">
                <el-option
                  v-for="dict in payTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="付款凭证"  prop="photoList"  v-if="form.payType==2">
          <div style="display:flex;">
            <div class="pay_image" v-for="(item,index) in form.photoList" :key='index' v-if="form.photoList.length>0">
              <el-image  class="pay_image"
                        :src="path+item"  fit="fill" :preview-src-list="[path+item]"
              ></el-image>
              <i class="el-icon-circle-close del_icon" @click="handleRemove(item)"></i>
            </div>
            <el-upload
              v-if="form.photoList.length<3"
              class="license-uploader"
              :action="updateAction"
              name="file"
              :show-file-list='false'
              list-type="picture-card"
              :on-success="(res,file)=>handleAvatarSuccess(res,file)"
              :before-upload="beforeAvatarUpload">
               <i class="el-icon-upload" style="font-size:40px"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 审核 -->
    <el-dialog title="审核" :visible.sync="checkopen" width="500px" append-to-body :before-close="cancel">
      <el-form  :model="chaeckForm"  label-width="90px">
        <el-form-item label="审批" prop="orderStatus">
          <el-radio-group v-model="orderStatus" size="small">
            <el-radio :label="3">完成</el-radio>
            <el-radio :label="4">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCheck">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listCardOrder,
          getCardOrder,
          delCardOrder,
          addCardOrder,
          updateCardOrder,
          exportCardOrder,
          getCardList,
          removeFile,
          queryUserByPhone,
          check4Order
          } from "@/api/share/cardOrder";

export default {
  name: "CardOrder",
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
      // 卡券订单表格数据
      cardOrderList: [],
      // 支付方式:1线上支付,2线下支付
      payTypeOptions:[],
      // 订单状态:待付款 待审核 已完成 审核不成功
      orderStatusOptions:[],
      // 套餐类型
      cardList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        buyerId: null,
        sellerId: null,
        cardId: null,
        cardName: null,
        cardPrice: null,
        cardNumber: null,
        payType: null,
        payMoney: null,
        payStatus: null,
        payTime: null,
        orderTime: null
      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules:{
        cardId: [
          { required: true, message: "套餐类型不能为空", trigger: "blur" }
        ],
        buyerPhone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
        cardNumber: [
          { required: true, message: "购买数量不能为空", trigger: "blur" }
        ],
        cardPrice: [
          { required: true, message: "单价不能为空", trigger: "blur" }
        ],
        payMoney: [
          { required: true, message: "订单总价不能为空", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "支付方式不能为空", trigger: "blur" }
        ],

      },
      path:process.env.VUE_APP_BASE_API,
      updateAction:process.env.VUE_APP_BASE_API + '/share/cardOrder/cardPayVoucher/upload',
      // 删除判断   1是新增 2是修改
      delType:1,
      checkopen:false,
      chaeckForm:{},
      orderStatus:3

    };
  },
  created() {
    this.getList();
    this.getCardList()
    this.getDicts("card_pay_type").then(response => {
      this.payTypeOptions = response.data;
    });
    this.getDicts("card_order_status").then(response => {
      this.orderStatusOptions = response.data;
    });
  },
  methods: {
    /** 查询卡券订单列表 */
    getList() {
      this.loading = true;
      listCardOrder(this.queryParams).then(response => {
        this.cardOrderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /**获取套餐类型**/
    getCardList(){
      getCardList().then(res=>{
        console.log(res)
        this.cardList = res.data;
      })
    },

    // 翻译 支付方式
    payTypeFormat(row, column) {
      return this.selectDictLabel(this.payTypeOptions, row.payType);
    },
    // 翻译 订单状态
    orderStatusFormat(row, column) {
      return this.selectDictLabel(this.orderStatusOptions, row.orderStatus);
    },

    // 取消按钮
    cancel(){
      this.open = false;
      this.checkopen = false
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        buyerId: null,
        sellerId: null,
        cardId: null,
        cardName: null,
        cardPrice: null,
        cardNumber: null,
        payType: null,
        payMoney: null,
        payStatus: 0,
        payTime: null,
        orderTime: null
      };
      this.orderStatus = 3
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
      this.ids = selection.map(item => item.idStr)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.form.photoList = []
      this.delType = 1;
      this.title = "添加卡券订单";
    },

    // 校验手机号码  获取buyId
    userPhone(){
      console.log(this.form.buyerPhone)
      if(this.form.buyerPhone){
        queryUserByPhone({phone:this.form.buyerPhone}).then(res=>{
          if(res.data){
            this.form.buyerId = res.data.userId
          }else{
            this.$message.error('请输入正确的手机号码')
            this.form.buyerPhone = null
          }
        })
      }
    },
    // 输入单价和数量计算总价
    moneySum(){
      if(this.form.cardPrice&&this.form.cardNumber){
        this.form.payMoney = this.form.cardNumber*this.form.cardPrice
      }
    },

    // 上传传前
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

    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        let imgUrl = res.url;
        this.form.photoList.push(imgUrl)
        this.$forceUpdate()
      } else {
        this.$message.error('文件上传失败!')
      }
    },

    // 删除  需要判断是否哪个删除
    handleRemove(e) {
      if(this.delType==1){
        this.form.photoList = this.form.photoList.filter(item=>item!=e)
        this.$message.success("图片删除成功");
        this.$forceUpdate()
      }else if(this.delType==2){
        let data = {
          orderId:this.form.idStr,
          url:e
        }
        removeFile(data).then(res=>{
          this.form.photoList = this.form.photoList.filter(item=>item!=e)
          this.$message.success("图片删除成功");
        })
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.idStr || this.ids
      this.delType = 2;
      getCardOrder({orderId:id}).then(response => {
        this.form = response.data;
        this.form.payType = response.data.payType.toString()
        this.open = true;
        this.title = "修改卡券订单";
      });
    },
    /** 提交按钮 */
    submitForm(){
      console.log(this.form)
      this.$refs["form"].validate(valid =>{
        if (valid) {
          if(this.form.payType==2&&this.form.photoList.length==0){
            this.$message.error('请上传转账凭证')
          }else{
            if (this.form.id != null) {
              updateCardOrder(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addCardOrder(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                }
              });
            }
          }
        }
      });
    },
    // 审核操作
    handleCheck(row){
      console.log(row)
      this.chaeckForm.orderId = row.idStr;
      this.checkopen = true;
    },
    // 审核提交
    submitCheck(){
      this.chaeckForm.orderStatus = this.orderStatus;
      check4Order(this.chaeckForm).then(res=>{
        if (res.code === 200) {
          this.msgSuccess("审核成功");
          this.checkopen = false;
          this.getList();
        }
      })
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.idStr || this.ids;
      let arr  = []
      arr.push(row.idStr)
      this.$confirm('是否确认删除卡券订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function(){
          return delCardOrder(arr);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    handleDeletes() {
      const ids = this.ids;
      this.$confirm('是否确认删除卡券订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function(){
          return delCardOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },



    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有卡券订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCardOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<style>
  .pay_image{
    background-color: #fbfdff;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px !important;
    height: 148px !important;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    margin-right: 10px;
    position: relative;
  }
  .del_icon{
    font-size:26px;
    color:gray;
    position: absolute;
    right:-10px;
    top:-10px;
    background-color: #FFFFFF;
    border-radius: 50%;
    z-index: 999;
  }
</style>
