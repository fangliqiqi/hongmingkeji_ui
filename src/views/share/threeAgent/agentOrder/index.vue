<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="订单类型" prop="orderType">
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型"    clearable size="small">
          <el-option v-for="item in orderTypeList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable size="small">
          <el-option v-for="item in orderStatusList"
                     :key="item.dictValue"
                     :label="item.dictLabel"
                     :value="item.dictValue">

          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="订单总额" prop="totalAmount">
        <el-input
          v-model="queryParams.totalAmount"
          placeholder="请输入订单总额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="支出总额" prop="paidAmount">
        <el-input
          v-model="queryParams.paidAmount"
          placeholder="请输入支出总额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
<!--      <el-form-item label="订单完成人" prop="finishUserId">-->
<!--        <el-input-->
<!--          v-model="queryParams.finishUserId"-->
<!--          placeholder="请输入订单完成人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <!-- <el-form-item label="归属人姓名" prop="finishUserName">
        <el-input
          v-model="queryParams.finishUserName"
          placeholder="请输入归属人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="完成时间" prop="finishTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.finishTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付状态" prop="payStatus">
        <el-select v-model="queryParams.payStatus" placeholder="请选择支付状态" clearable size="small">

          <el-option v-for="item in paystatusList"
                     :key="item.dictValue"
                     :label="item.dictLabel"
                     :value="item.dictValue">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="checkUserId">
        <el-input
          v-model="queryParams.checkUserId"
          placeholder="请输入审核人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="审核状态" prop="checkStatus">
        <el-select v-model="queryParams.checkStatus" placeholder="请选择审核状态" clearable size="small">

          <el-option v-for="item in checkStatusList"
                     :key="item.dictValue"
                     :label="item.dictLabel"
                     :value="item.dictValue">

          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="客服" prop="stewardUserId">
        <el-input
          v-model="queryParams.stewardUserId"
          placeholder="请输入客服"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="服务商" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入服务商"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!--<el-form-item label="业务员" prop="salesmanId">
        <el-input
          v-model="queryParams.salesmanId"
          placeholder="请输入业务员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="处理状态" prop="disposeStatus">
        <el-select v-model="queryParams.disposeStatus" placeholder="请选择处理状态" clearable size="small">
          <el-option v-for="item in disposeStatusList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue">

          </el-option>
        </el-select>
      </el-form-item>-->
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
          v-hasPermi="['share:order:add']"
        >新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['share:order:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['share:order:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:order:export']"
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

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
      <el-table-column label="订单类型" align="center" prop="orderType" :formatter="orderTypeFormat" min-width="120"/>
      <el-table-column label="订单详情" align="center" prop="orderContent" min-width="320"/>
      <el-table-column label="订单状态" align="center" prop="orderStatus" :formatter="orderStatusFormat" min-width="120"/>
      <el-table-column label="订单总额" align="center" prop="totalAmount" min-width="120"/>
      <el-table-column label="订单总额" align="center" prop="totalAmount" min-width="120"/>
      <el-table-column label="支出总额" align="center" prop="paidAmount" min-width="120"/>
      <el-table-column label="指导价" align="center" prop="guidePrice" min-width="120"/>
<!--      <el-table-column label="订单完成人" align="center" prop="finishUserId" />-->
      <el-table-column label="订单完成人" align="center" prop="finishUserName" min-width="120"/>
      <el-table-column label="完成时间" align="center" prop="finishTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.finishTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" min-width="120"/>
      <el-table-column label="支付状态" align="center" prop="payStatus" :formatter="payStatusFormat" min-width="120"/>
      <el-table-column label="审核人" align="center" prop="checkUserId" min-width="120"/>
      <el-table-column label="审核状态" align="center" prop="checkStatus" :formatter="checkStatusFormat" min-width="120"/>
      <!--<el-table-column label="客服" align="center" prop="stewardUserId" min-width="120"/>
      <el-table-column label="服务商" align="center" prop="companyName" min-width="320"/>
      <el-table-column label="业务员" align="center" prop="salesmanName" min-width="120"/>
      <el-table-column label="处理状态" align="center" prop="disposeStatus" :formatter="disposeStatusFormat" min-width="120"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="220">
        <template slot-scope="scope">
          <!-- <el-button
            v-if="scope.row.checkStatus==3"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-if="scope.row.checkStatus!=1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button> -->

          <el-button
            size="mini"
            type="text"
            icon="el-icon-refresh"
            @click="handleOrderLoss(scope.row)"
          >订单流失</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-mouse"
            @click="handleOrderSuspend(scope.row)"
          >订单暂停</el-button>
          <el-button
            v-if="(deptId == 149 || deptId == 148) && scope.row.checkStatus == 3 && (scope.row.payStatus == 1 ||scope.row.payStatus == 4 || scope.row.payStatus == 5 )"
            size="mini"
            type="text"
            icon="el-icon-timer"
            @click="checkStatusChangeFun(scope.row)"
          >内帐审核</el-button>
         <el-button
            v-if="(deptId == 151|| deptId == 152) && scope.row.openWq == 10  "
            size="mini"
            type="text"
            icon="el-icon-monitor"
            @click="checkLegwork(scope.row)"
          >主管审核</el-button>

          <!--<el-button
            v-if=" deptId == 150  && scope.row.open == 10 && scope.row.pairState == null"
             size="mini"
             type="text"
             icon="el-icon-share"
             @click="handleRules(scope.row)"
           >业务下发</el-button>-->
          <el-button
            v-if="deptId == 155 && scope.row.open == 10"
            size="mini"
            type="text"
            icon="el-icon-position"
            @click="handleDispatch(scope.row)"
          >业务调度</el-button>
          <el-button
            v-if=" deptId == 147 && scope.row.open == 10 "
            size="mini"
            type="text"
            icon="el-icon-top-right"
            @click="handleExternal(scope.row)"
          >外账指派</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleShowFollowList(scope.row)"
          >业务跟踪记录</el-button>
          <el-button
            v-if="(deptId == 150 || deptId == 153) && scope.row.open == 10"
            size="mini"
            type="text"
            icon="el-icon-paperclip"
            @click="handleOver(scope.row)"
          >流程业务完成</el-button>
          <el-button
            v-if="deptId == 152  && scope.row.open == 10"
            size="mini"
            type="text"
            icon="el-icon-place"
            @click="handleOutworker(scope.row)"
          >指派外勤专员</el-button>
          <el-button
            v-if=" deptId == 153 && scope.row.open == 10"
            size="mini"
            type="text"
            icon="el-icon-guide"
            @click="handleCirculation(scope.row)"
          >流转外勤办事员</el-button>
          <el-button
            v-if=" deptId == 153 && scope.row.open == 10 "
            size="mini"
            type="text"
            icon="el-icon-edit-outline"
            @click="handleFollowrecords(scope.row)"
          >新增跟进记录</el-button>
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


    <!-- 业务下发-->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
         <el-col :span="24">
            <el-form-item label="订单类型" >
              <el-select v-model="form.businessName" placeholder="请选择订单类型" style="width: 100%">
                <!-- <el-option v-for="item in orderTypeList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" >

          <!-- <el-col :span="12">
            <el-form-item label="代理商" prop="receiveId"  >
              <el-select v-model="form.companyId" filterable placeholder="请选择代理商" @change="handleUser"  style="width: 100%">
                <el-option
                  v-for="item in agentOptions"
                  :key="item.id"
                  :label="item.companyName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="业务员" prop="salesmanId" >
              <el-select v-model="form.salesmanId" placeholder="请选择业务员"  style="width: 100%" >
                <el-option
                 v-for="item in relatedList"
                 :key="item.userId"
                 :label="item.nickName"
                 :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="业务流程配置" prop="matchingRulesId" >
                <el-select v-model="form.matchingRulesId" filterable placeholder="请选择业务流程配置"  style="width: 100%">
                  <el-option
                    v-for="item in rulesOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注理由" prop="externalRemarks">
                <el-input
                  type="textarea"
                  :rows="3"
                  resize='none'
                  placeholder="请输入备注理由"
                  v-model="form.externalRemarks">
                </el-input>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRules">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 内账审核对话框 -->
    <el-dialog :title="title" :visible.sync="auditOpen" width="600px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules"  label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="订单类型" >
              <el-select v-model="form.businessName" placeholder="请选择订单类型" style="width: 100%">
                <!-- <el-option v-for="item in orderTypeList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="选择审核状态" prop="type">
          <el-radio-group v-model="form.type" @change="auditFun">
              <el-radio :label="1">审核通过</el-radio>
              <el-radio :label="2">审核驳回</el-radio>
              <el-radio :label="4">追加尾款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="业务流程配置" prop="matchingRulesId" >
              <el-select v-model="form.matchingRulesId" filterable placeholder="请选择业务流程配置"  style="width: 100%">
                <el-option
                  v-for="item in rulesOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注理由"  prop="auditRemarks">
          <el-input
            type="textarea"
            :rows="3"
            resize='none'
            placeholder="请输入审核内容"
            v-model="form.auditRemarks">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAudit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 主管审核 对话框 -->
    <el-dialog :title="title" :visible.sync="legworkOpen" width="600px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules"  label-width="120px">
        <el-form-item label="选择审核状态" prop="type">
          <el-radio-group v-model="form.type" @change="auditFun">
              <el-radio :label="1">审核通过</el-radio>
              <el-radio :label="2">审核拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注理由"  prop="legworkRemarks">
          <el-input
            type="textarea"
            :rows="3"
            resize='none'
            placeholder="请输入审核理由"
            v-model="form.legworkRemarks">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitLegwork">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 业务调度 对话框 -->
    <el-dialog :title="title" :visible.sync="dispatchOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
           <el-col :span="24">
             <el-form-item label="订单类型" prop="orderType">
               <el-select v-model="form.orderType" placeholder="请选择订单类型" style="width: 100%">
                 <el-option v-for="item in orderTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                 </el-option>
               </el-select>
             </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
           <el-col :span="12">
              <el-form-item label="调度人员类型" prop="lableType">
                <el-select v-model="form.lableType" placeholder="请选择调度人员类型"  @change = "disChange" style="width: 100%">
                  <el-option v-for="item in lableTypeList"
                             :key="item.label"
                             :label="item.name"
                             :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调度人员" prop="dispatchId" >
                <el-select v-model="form.dispatchId" placeholder="请选择调度人员"  style="width: 100%" >
                  <el-option
                    v-for="item in dispatchOptions"
                    :key="item.userId"
                    :label="item.business?(item.business+ ':'+item.name):item.nickName"
                    :value="item.userId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>

         <el-row :gutter="24">
             <el-col :span="24">
               <el-form-item label="备注理由" prop="externalRemarks">
                 <el-input
                   type="textarea"
                   :rows="3"
                   resize='none'
                   placeholder="请输入备注理由"
                   v-model="form.externalRemarks">
                 </el-input>
               </el-form-item>
             </el-col>
         </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDispatch">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 外账指派  对话框-->
    <el-dialog :title="title" :visible.sync="externalOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="外账人员" prop="externalId" >
                <el-select v-model="form.externalId" placeholder="请选择外账人员"  style="width: 100%" >
                  <el-option
                    v-for="item in externalOptions"
                    :key="item.userId"
                    :label="item.business + ':'+item.name"
                    :value="item.userId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注理由" prop="externalRemarks">
                <el-input
                  type="textarea"
                  :rows="3"
                  resize='none'
                  placeholder="请输入备注理由"
                  v-model="form.externalRemarks">
                </el-input>
              </el-form-item>
            </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitExternal">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 订单业务完结  对话框-->
    <el-dialog :title="title" :visible.sync="compleOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注理由" prop="externalRemarks">
              <el-input
                type="textarea"
                :rows="3"
                resize='none'
                placeholder="请输入备注理由"
                v-model="form.externalRemarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitComple">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 流程业务完结  对话框-->
    <el-dialog :title="title" :visible.sync="overOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注理由" prop="externalRemarks">
              <el-input
                type="textarea"
                :rows="3"
                resize='none'
                placeholder="请输入备注理由"
                v-model="form.externalRemarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOver">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 订单流失完结  对话框-->
    <el-dialog :title="title" :visible.sync="lossOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注理由" prop="externalRemarks">
              <el-input
                type="textarea"
                :rows="3"
                resize='none'
                placeholder="请输入备注理由"
                v-model="form.externalRemarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitLoss">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 订单暂停完结  对话框-->
    <el-dialog :title="title" :visible.sync="suspendOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注理由" prop="externalRemarks">
              <el-input
                type="textarea"
                :rows="3"
                resize='none'
                placeholder="请输入备注理由"
                v-model="form.externalRemarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSuspend">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 指派办事员 对话框-->
    <el-dialog :title="title" :visible.sync="outworkerOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="外勤办事员" prop="externalId" >
              <el-select v-model="form.externalId" placeholder="请选择外勤办事员"  style="width: 100%" >
                <el-option
                  v-for="item in externalOptions"
                  :key="item.userId"
                  :label="item.business + ':'+item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注理由" prop="externalRemarks">
              <el-input
                type="textarea"
                :rows="3"
                resize='none'
                placeholder="请输入备注理由"
                v-model="form.externalRemarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOutworker">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 流转办事员 对话框-->
    <el-dialog :title="title" :visible.sync="circulationOpen" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="外勤办事员" prop="externalId" >
              <el-select v-model="form.externalId" placeholder="请选择外勤办事员"  style="width: 100%" >
                <el-option
                  v-for="item in externalOptions"
                  :key="item.userId"
                  :label="item.business + ':'+item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注理由" prop="externalRemarks">
              <el-input
                type="textarea"
                :rows="3"
                resize='none'
                placeholder="请输入备注理由"
                v-model="form.externalRemarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCirculation">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 业务跟踪 记录 弹窗 -->
    <el-dialog :title="title" :visible.sync="processOpen" width="800px"  class="process"  append-to-body :close-on-click-modal="false" >
      <el-timeline v-loading="loadings">
        <el-timeline-item  :timestamp="(item.createDate) | sub(10)"  placement="top"  v-for="(item,index) in processList">
          <el-card>
            <h4>{{item.remarks}}</h4>
            <p>[{{item.deptName}}] - {{item.userName}}  提交于 {{item.createDate}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-if='noshow'>
          <h4>暂时无跟踪记录</h4>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>

    <!-- 跟进记录 -->
    <el-dialog title="跟进记录" :visible.sync="followsOpen" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
         <el-row :gutter="24">
           <el-col :span="24">
             <el-form-item label="跟进记录" prop="followsRemarks">
               <el-input
               type="textarea"
               :rows="3"
               resize='none'
               v-model="form.followsRemarks"
               placeholder="请输入跟进内容"/>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row :gutter="24">
           <el-col :span="24">
            <el-form-item label="下次跟进时间" prop="followsTime">
              <el-date-picker clearable
                              v-model="form.followsTime"
                              type="datetime"
                              style="width: 50%;"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择下次跟进时间">
              </el-date-picker>
            </el-form-item>
           </el-col>
         </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="followSubmitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 新增 修改对话框
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body :close-on-click-modal="false" >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px"> -->
        <!-- <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入客户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="userPhone">
              <el-input v-model="form.userPhone" placeholder="请输入客户联系方式" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row :gutter="24">
         <el-col :span="12">
            <el-form-item label="订单类型" prop="orderType">
              <el-select v-model="form.orderType" placeholder="请选择订单类型" style="width: 100%">
                <el-option v-for="item in orderTypeList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">

                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="省市区" prop="selectedOptions">
              <el-cascader
                placeholder="请选择信息所在省市"
                style="width: 100%"
                size="large"

                :options="regionData"
                v-model="form.selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="定金" prop="downPayment">
              <el-input v-model="form.downPayment" placeholder="请输入定金" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支出总额" prop="paidAmount">
              <el-input v-model="form.paidAmount" placeholder="请输入支出总额" />
            </el-form-item>
          </el-col>
        </el-row>


       <el-form-item label="订单状态">-->
<!--          <el-radio-group v-model="form.orderStatus">-->
<!--            <el-radio v-for="item in orderStatusList"-->
<!--                      :key="item.dictValue"-->
<!--                      :label="item.dictLabel"-->
<!--                      :value="item.dictValue">-->

<!--            </el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->


        <!-- <el-form-item label="订单详情" prop="orderContent">
          <el-input v-model="form.orderContent" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
<!--        <el-form-item label="订单完成人ID" prop="finishUserId">-->
<!--          <el-input v-model="form.finishUserId" placeholder="请输入订单完成人ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="订单完成人姓名" prop="finishUserName">-->
<!--          <el-input v-model="form.finishUserName" placeholder="请输入订单完成人姓名" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="完成时间" prop="finishTime">-->
<!--          <el-date-picker clearable size="small" style="width: 200px"-->
<!--            v-model="form.finishTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择完成时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="支付状态">-->
<!--          <el-radio-group v-model="form.payStatus">-->
<!--            <el-radio v-for="item in paystatusList"-->
<!--                       :key="item.dictValue"-->
<!--                       :label="item.dictLabel"-->
<!--                       :value="item.dictValue">-->

<!--            </el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="审核人ID" prop="checkUserId">-->
<!--          <el-input v-model="form.checkUserId" placeholder="请输入审核人ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="审核状态">-->
<!--          <el-radio-group v-model="form.checkStatus">-->
<!--            <el-radio v-for="item in checkStatusList"-->
<!--                       :key="item.dictValue"-->
<!--                       :label="item.dictLabel"-->
<!--                       :value="item.dictValue">-->

<!--            </el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客服ID" prop="stewardUserId">-->
<!--          <el-input v-model="form.stewardUserId" placeholder="请输入客服ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="处理订单的公司ID" prop="companyId">-->
<!--          <el-input v-model="form.companyId" placeholder="请输入处理订单的公司ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="处理订单的业务员ID" prop="salesmanId">-->
<!--          <el-input v-model="form.salesmanId" placeholder="请输入处理订单的业务员ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="处理状态">-->
<!--          <el-radio-group v-model="form.disposeStatus">-->
<!--            <el-radio v-for="item in disposeStatusList"-->
<!--                      :key="item.dictValue"-->
<!--                      :label="item.dictLabel"-->
<!--                      :value="item.dictValue">-->

<!--            </el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <!-- <el-row :gutter="24" v-if="!!form.id&&form.checkStatus==1">
          <el-col :span="12">
            <el-form-item label="代理商" prop="receiveId" >
              <el-select v-model="form.companyId" filterable placeholder="请选择代理商" @change="handleUser" style="width: 100%">
                <el-option
                  v-for="item in agentOptions"
                  :key="item.id"
                  :label="item.companyName"
                  :value="item.id"
                >
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务员" prop="userId" >
              <el-select v-model="form.salesmanId" placeholder="请选择业务员" style="width: 100%" >
                <el-option
                  v-for="item in userOptions"
                  :key="item.userId"
                  :label="item.nickName"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->



  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
  list4Order,
  checkStatusChange,
  allocationAgent,
  companyListByAddr,
  AgentCustomerFollowAdd,
  AgentCustomerFollowList,
  BusinessprocessList,
  BusinessprocessPost,
  examineSuccess,
  flowList,
  ExaminePost,
  ServiceList,
  OutworkerList,
  dispatchPost,
  ExternalList,
  ExternalPost,
  flowLogList,
  orderOverPost,
  outworkerList,
  followsPost,
  circulationPost,
  legworkPost,
  getCrmrelatedList,
  updateStatePost
 } from "@/api/share/threeAgent/agentOrder";
import {
  getSourceAgent,
  getUserlist
} from '@/api/share/source'
/*获取省市区信息*/
import {
  // provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'

//vuex的信息
import { mapState } from 'vuex'

export default {
  name: "Order",
  data() {
    return {
      // 遮罩层
      loading: true,
      loadings:true,
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
      // 分销订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        orderType: null,
        orderContent: null,
        orderStatus: null,
        totalAmount: null,
        paidAmount: null,
        finishUserId: null,
        finishUserName: null,
        finishTime: null,
        payStatus: null,
        checkUserId: null,
        checkStatus: null,
        stewardUserId: null,
        companyId: null,
        salesmanId: null,
        disposeStatus: null,

      },
      followRules:[],
      followlistAll:[],
      //业务流程下拉框数据
      rulesOptions:[],
      //审核
      audit:{},
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userName:[ { required: true, message: '客户姓名不能为空', trigger: 'blur' }],
        userPhone:[ { required: true, message: '客户联系方式不能为空', trigger: 'blur' }],
        orderType:[ { required: true, message: '请选择订单类型', trigger: 'change' }],
        selectedOptions:[ { required: true, message: '请选择所在省市区', trigger: 'change' }],
        downPayment:[ { required: true, message: '定金不能为空', trigger: 'blur' }],
        lableType:[{required: true, message: '请选择调度人员类型', trigger: 'change'}],
        dispatchId:[{required: true, message: '请选择调度人员', trigger: 'change'}],
        externalId:[{required: true, message: '请选择外账人员', trigger: 'change'}],
        externalRemarks:[{required: true, message: '备注理由不能为空', trigger: 'blur'}],
        followsRemarks:[{required: true, message: '跟进记录不能为空', trigger: 'blur'}],
        followsTime:[{required: true, message: '跟进记录不能为空', trigger: 'blur'}],
        legworkRemarks:[{required: true, message: '审核理由不能为空', trigger: 'blur'}],
        type:[{  required: true, message: '审核结果不能为空',  trigger: 'change' }],
        auditRemarks:[{ required: true, message: '审核理由不能为空', trigger: 'blur' }],
        matchingRulesId:[{required: true, message: '请选择业务流程配置', trigger: 'change'}],
        salesmanId:[{required: true, message: '请选择业务员', trigger: 'change'}]

      },
      orderTypeList:[],
      orderStatusList:[],
      paystatusList:[],
      checkStatusList:[],
      disposeStatusList:[],
      regionData: regionData,
      userOptions:[],
      agentOptions: [],
      auditOpen:false,
      dispatchOpen:false,
      followsOpen:false,
      //调度人员类型
      lableTypeList:[
        {name:'客服',label:1},
        {name:'外勤',label:2}
      ],
      dispatchOptions:[],
      externalOpen:false,
      compleOpen:false,
      overOpen:false,
      lossOpen:false,
      suspendOpen:false,
      outworkerOpen:false,
      circulationOpen:false,
      externalOptions:[],
      processOpen:false,
      processList:[],
      legworkOpen:false,
      //部门ID
      deptId:0,
      relatedList:[],
      userPairId:null,
      noshow:false
    };
  },
  created() {

    this.getDicts('agent_order_status').then(response => {
      this.orderStatusList = response.data
    })
    this.getDicts('agent_pay_status').then(response => {
      this.paystatusList = response.data
    })
    this.getDicts('agent_check_status').then(response => {
      this.checkStatusList = response.data
    })
    this.getDicts('agent_dispose_status').then(response => {
      this.disposeStatusList = response.data
    })


    this.deptId = this.$store.getters.deptId


    this.getList();
    this.getTypeList();
    this.getBusinessprocess();
  },

  computed:{
    ...mapState({
      userInfo:state => state.user,
      userId:state => state.user.id
    })
  },
  // 局部过滤
  filters:{
    sub(e,num) {
      return e.substring(0,num);
    }
  },

  methods: {
    /** 查询分销订单列表 */
    getList() {
      this.loading = true;
      console.log(this.queryParams)
      listOrder(this.queryParams).then(response => {
        console.log(response.rows)
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    getTypeList() {
      this.loading = true;
      list4Order().then(response => {
        this.orderTypeList = response.data;
        // console.log(this.orderTypeList)
      });
    },

    orderTypeFormat(row, column) {
      let orderTypeList = this.orderTypeList;
      let temp = []
      Object.keys(orderTypeList).some((key)=>{
        if(row.orderType == orderTypeList[key].id+''){
          temp.push(orderTypeList[key].name)
          return true
        }
      })
      return temp.join('')
    },

    orderStatusFormat(row, column) {
      return this.selectDictLabel(this.orderStatusList, row.orderStatus)
    },

    payStatusFormat(row, column) {
      return this.selectDictLabel(this.paystatusList, row.payStatus)
    },
    checkStatusFormat(row, column) {
      return this.selectDictLabel(this.checkStatusList, row.checkStatus)
    },
    disposeStatusFormat(row, column) {
      return this.selectDictLabel(this.disposeStatusList, row.disposeStatus)
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.followsOpen = false;
      this.reset();
      this.auditOpen = false;
      this.dispatchOpen = false;
      this.externalOpen = false;
      this.overOpen = false;
      this.outworkerOpen = false;
      this.circulationOpen = false;
      this.legworkOpen = false;
      this.compleOpen = false;
      this.lossOpen = false;
      this.suspendOpen =false
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        orderType: null,
        orderContent: null,
        orderStatus: null,
        totalAmount: null,
        paidAmount: 0,
        finishUserId: null,
        finishUserName: null,
        createTime: null,
        finishTime: null,
        remark: null,
        payStatus: null,
        checkUserId: null,
        checkStatus: null,
        stewardUserId: null,
        companyId: null,
        salesmanId: null,
        disposeStatus: null,
        downPayment:null,
        province:null,
        city:null,
        county:null,
        selectedOptions:null,
        userPhone:null,
        userName:null,
        matchingRulesId:null,
        dispatchId:null,
        lableType:null,
        externalId:null,
        externalRemarks:null,
        followsRemarks:null,
        followsTime:null,
        legworkRemarks:null,
        auditRemarks:null,
        type:1,
        userPairId:null
      };
      this.processList = [];
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
      this.title = "添加分销订单";
    },


    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        let data = response.data
        let selectedOptions = []
        selectedOptions.push(TextToCode[data.province].code)
        selectedOptions.push(TextToCode[data.province][data.city].code)
        selectedOptions.push(TextToCode[data.province][data.city][data.county].code)
        data.selectedOptions = selectedOptions;
        data.sourceTypeArr = data.sourceTypeId?[data.sourceTypeId]:null
        this.form = data
        this.open = true;
        this.title = "修改分销订单";
        this.getAgentList();
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOrder(this.form).then(response => {
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

    // 获取业务流程配置
    getBusinessprocess(){
      BusinessprocessList().then(res=>{
        console.log(res)
        this.rulesOptions = res.data;
      })
    },

    // 根据部门 ID获取相关专员
    getrelatedList(){
      getCrmrelatedList({deptId:151}).then(res=>{
        console.log(res.rows)
        if(res.code == 200){
          this.relatedList = res.rows;
        }else{
          this.relatedList = []
        }
      })
    },

     /** 业务下发按钮 弹窗操作 */
    handleRules(row){
      console.log(row)
      this.form.businessName = row.businessName
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        let data = response.data
        let selectedOptions = []
        // selectedOptions.push(TextToCode[data.province].code)
        // selectedOptions.push(TextToCode[data.province][data.city].code)
        // selectedOptions.push(TextToCode[data.province][data.city][data.county].code)
        // data.selectedOptions = selectedOptions;
        // data.sourceTypeArr = data.sourceTypeId?[data.sourceTypeId]:null
        this.form = data
        this.open = true;
        this.title = "业务下发";
        this.getAgentList();
        this.getSalesman();
      });
       this.getrelatedList()
    },

    // 业务下发 确认提交
    submitRules(){
      this.form.remark = this.form.externalRemarks;
      this.$refs["form"].validate(valid => {
        if (valid) {
          BusinessprocessPost(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.open = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
             this.open = false;
              this.getList();
              this.reset()
            }
          });
        }
      });
    },


    /** 内账审核按钮 弹窗*/
    checkStatusChangeFun(row){
      console.log(row)
      this.reset()
      this.form.businessName = row.businessName
      this.auditOpen = true;
      this.title = "内账审核";
      // const id = row.id || this.ids;
      this.form.orderId = row.id || this.ids;
      // flowList({orderId:id}).then(res=>{
      //   if(res.data.length>0){
      //     this.form.userPairId = res.data[0].id
      //   }
      // })
    },

    // 审核弹窗 中的单选按钮事件
    auditFun:function(e){
      this.form.type = e;
    },

    // 内帐审核确定按钮
    submitAudit:function(){
      let data = {
        // userPairId:this.form.userPairId,
        type:this.form.type,
        userId:this.userId,
        remarks:this.form.auditRemarks,
        matchingId:this.form.matchingRulesId,
        orderId:this.form.orderId
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          ExaminePost(data).then(res=>{
            console.log(res)
            if (res.code === 200) {
              this.msgSuccess("提交成功");
              this.auditOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.auditOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },


    /** 主管审核按钮 弹窗*/
    checkLegwork(row){
      this.reset()
      this.legworkOpen = true;
      const id = row.id || this.ids;
      this.title = "主管审核";
      flowList({orderId:id}).then(res=>{
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
          this.form.label = res.data[0].label
        }
      })
    },

    // 外勤审核确定按钮
    submitLegwork:function(){
      let data = {
        label:this.form.label,
        userPairId:this.form.userPairId,
        type:this.form.type,
        remarks:this.form.legworkRemarks
      }
      this.$refs['form'].validate(valid => {
        if (valid){
          legworkPost(data).then(res=>{
            console.log(res)
            if (res.code === 200) {
              this.msgSuccess("提交成功");
              this.legworkOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.legworkOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })

    },


    // 业务调度 按钮 弹窗
    handleDispatch(row){
      this.reset()
      const id = row.id || this.ids;
      getOrder(id).then(response => {
        let data = response.data
        this.form = data
        this.dispatchOpen = true;
        this.title = "业务调度";
        // this.getAgentList();
        // this.getSalesman();
      });
      flowList({orderId:id}).then(res=>{
        console.log(res.data[0].id)
        // console.log(this.userPairId)
        if(res.data){
          this.userPairId = res.data[0].id
        }
      })
    },

    // 选择调度人员类型
    disChange(e){
      console.log(e)
      this.form.lableType = e;
      //选择调度人员类型选择的同时清空调度人员的内容
      if(this.form.dispatchId){
        this.form.dispatchId = null
      }
      if(this.form.lableType == 1){
        ServiceList().then(res=>{
          this.dispatchOptions = res.rows;
        })
      }else{
        OutworkerList().then(res=>{
          this.dispatchOptions = res.data;
        })
    }
   },

    // 业务调度的确认提交按钮
    submitDispatch(){
      var data = {
        userPairId:this.userPairId,
        lable:this.form.lableType,
        userId:this.form.dispatchId,
        remarks:this.form.externalRemarks
      }
      console.log(data)
      this.$refs["form"].validate(valid => {
        if (valid) {
            dispatchPost(data).then(response => {
              // console.log(response)
              if (response.code == 200) {
                this.msgSuccess("提交成功");
                this.dispatchOpen = false;
                this.getList();
                this.reset()
              }else{
                this.msgSuccess("提交失败");
                this.dispatchOpen = false;
                this.getList();
                this.reset()
              }
            });
        }
      });
    },

    // 外账指派弹窗
    handleExternal(row){
      this.externalOpen = true;
      const id = row.id || this.ids;
      ExternalList().then(res=>{
        this.externalOptions = res.rows;
      })
      flowList({orderId:id}).then(res=>{
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
          this.form.lableType = res.data[0].label
        }
      })
    },

  // 外账指派 提交按钮
  submitExternal(){
    // console.log(this.form)
    let data = {
      userPairId:this.form.userPairId,
      lable:this.form.lableType,
      userId:this.form.externalId,
      remarks:this.form.externalRemarks
    }
    this.$refs['form'].validate(valid => {
      if (valid){
        ExternalPost(data).then(res=>{
          // console.log(res)
          if (res.code == 200) {
            this.msgSuccess("提交成功");
            this.externalOpen = false;
            this.getList();
            this.reset()
          }else{
            this.msgSuccess("提交失败");
            this.externalOpen = false;
            this.getList();
            this.reset()
          }
        })
      }
     })
    },

    // 流程业务完成弹窗
    handleOver(row){
      this.reset()
      this.overOpen = true;
      this.title = '流程业务完成'
      const id = row.id || this.ids;
      flowList({orderId:id}).then(res=>{
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
          this.form.lableType = res.data[0].label
        }
      })
    },

    // 流程业务完成 提交按钮
    submitOver(){
      // console.log(this.form)
      let data = {
        userPairId:this.form.userPairId,
        lable:this.form.lableType,
        userId: this.userId,
        remarks:this.form.externalRemarks
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          orderOverPost(data).then(res=>{
            console.log(res)
            if (res.code == 200) {
              this.msgSuccess("提交成功");
              this.overOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.overOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },

    /** 订单业务完成弹窗 */
    handleComplete(row) {
      this.reset()
      this.compleOpen = true;
      this.title = '订单业务完成'
      this.audit.userId = this.userId;
      const id = row.id || this.ids;
      flowList({orderId:id}).then(res=>{
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
          this.form.lableType = res.data[0].label
        }
      })
    },

    // 订单业务完成 提交按钮
    submitComple(){
      let data = {
        userPairId:this.form.userPairId,
        lable:this.form.lableType,
        userId: this.userId,
        remarks:this.form.externalRemarks
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          examineSuccess(data).then(res=>{
            console.log(res)
            if (res.code == 200) {
              this.msgSuccess("提交成功");
              this.compleOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.compleOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },

    // 订单流失 弹窗
    handleOrderLoss(row){
      this.reset()
      this.lossOpen = true;
      this.title = '订单流失'
      const id = row.id || this.ids;
      flowList({orderId:id}).then(res=>{
        console.log(res)
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
        }
      })
    },
    // 订单流失提交
    submitLoss(){
      let data = {
        userPairId:this.form.userPairId,
        remarks:this.form.externalRemarks,
        state:5
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          updateStatePost(data).then(res=>{
            console.log(res)
            if (res.code == 200) {
              this.msgSuccess("提交成功");
              this.lossOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.lossOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },
    // 订单暂停 弹窗
    handleOrderSuspend(row){
      this.reset()
      this.suspendOpen = true;
      this.title = '订单暂停'
      const id = row.id || this.ids;
      flowList({orderId:id}).then(res=>{
        console.log(res)
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
        }
      })
    },
    // 订单暂停提交
    submitSuspend(){
      let data = {
        userPairId:this.form.userPairId,
        remarks:this.form.externalRemarks,
        state:4
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          updateStatePost(data).then(res=>{
            console.log(res)
            if (res.code == 200) {
              this.msgSuccess("提交成功");
              this.suspendOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.suspendOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },

    // 外勤办事员指派弹窗
    handleOutworker(row){
      this.title='指派外勤专员'
      this.reset()
      this.outworkerOpen = true;
      const id = row.id || this.ids;
      outworkerList().then(res=>{
        // console.log(res)
        this.externalOptions = res.rows;
      })
      flowList({orderId:id}).then(res=>{
        // console.log(res)
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
          this.form.lableType = res.data[0].label
        }
      })
    },

    // 外勤办事员 提交按钮
    submitOutworker(){
      let data = {
        userPairId:this.form.userPairId,
        lable:this.form.lableType,
        userId:this.form.externalId,
        remarks:this.form.externalRemarks
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          ExternalPost(data).then(res=>{
            console.log(res)
            if (res.code === 200) {
              this.msgSuccess("提交成功");
              this.outworkerOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.outworkerOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },

    // 业务跟踪  按钮
    handleShowFollowList(row){
      // console.log(row)
      this.loadings = true
      const ids = row.id || this.ids;
      flowList({orderId:ids}).then(res=>{
        let arr1 = res.data;
        if(res.data.length == 0){
          flowLogList({orderId:ids}).then(res=>{
            if(res.data.length == 0){
              this.noshow = true
              this.loadings = false;
            }else{
              this.loadings = false;
              this.noshow = false;
              this.processList = res.data;
            }
          })
        }else{
          flowLogList({orderId:ids}).then(res=>{
            if(res.data.length == 0){
              this.noshow = true
              this.loadings = false;
            }else{
              this.noshow = false;
              this.loadings = false;
              this.processList = res.data;
              arr1.map(item=>{
                console.log(item)
                this.processList.push(item)
              })
            }
          })
        }
      })
      this.reset();
      this.processOpen = true
      this.title="业务跟踪流程"
    },

// 流转外勤办事员弹窗
    handleCirculation(row){
      this.circulationOpen = true;
      let userId = this.userId;
      // console.log(userId)
      this.reset()
      this.title = "流转外勤办事员"
      const id = row.id || this.ids;
      outworkerList().then(res=>{
        console.log(res)
        let arr = res.rows;
        this.externalOptions = arr.filter(item => item.userId!=userId);
      })
      flowList({orderId:id}).then(res=>{
        // console.log(res)
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
          this.form.lableType = res.data[0].label
        }
      })
    },

    /**跟进记录弹窗按钮**/
    handleFollowrecords(row){
      // console.log(row)
      this.reset()
      this.followsOpen = true;
      const id = row.id || this.ids;
      this.form.orderId = id;
      flowList({orderId:id}).then(res=>{
        if(res.data.length>0){
          this.form.userPairId = res.data[0].id
        }
      })
    },

    /** 跟进记录提交按钮 */
    followSubmitForm() {
      let data = {
        pairId:this.form.userPairId,
        orderId:this.form.orderId,
        nextDate:this.form.followsTime,
        remarks:this.form.followsRemarks
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          followsPost(data).then(res=>{
            console.log(res)
            if (res.code === 200) {
              this.msgSuccess("提交成功");
              this.followsOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.followsOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },

    // 流转外勤办事员 提交按钮
    submitCirculation(){
      // console.log(this.form)
      let data = {
        userPairId:this.form.userPairId,
        lable:this.form.lableType,
        userId:this.form.externalId,
        remarks:this.form.externalRemarks
      }
      console.log(data)
      this.$refs['form'].validate(valid => {
        if (valid){
          circulationPost(data).then(res=>{
            console.log(res)
            if (res.code === 200) {
              this.msgSuccess("提交成功");
              this.circulationOpen = false;
              this.getList();
              this.reset()
            }else{
              this.msgSuccess("提交失败");
              this.circulationOpen = false;
              this.getList();
              this.reset()
            }
          })
        }
      })
    },



    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除分销订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有分销订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },

    /* 省市选择 */
    handleChange(value) {
      // console.log(value)
      this.form.selectedOptions = value
      this.form.province = CodeToText[value[0]]
      this.form.city = CodeToText[value[1]]
      this.form.county = CodeToText[value[2]]
      if(this.form.county == '市辖区'){
        this.$message.error('请选择具体的市辖区');
        this.typeOption = [];
        this.userOptions = [];
        this.agentOptions = [];
        return
      }else{
        this.getAgentList()
      }
    },

  //根据省市区 + 商机 获取代理商
    getAgentList() {
      let data = {
        prov: this.form.province || '',
        city: this.form.city || '',
        county:this.form.county || ''
      }

      if (data.prov && data.city && data.county) {
        companyListByAddr(data).then(response => {
          // console.info(response)
          if (response.code == 200) {
            this.form.receiveId = null
            this.form.userId = null
            this.agentOptions = response.rows || []
            ++this.isResouceShow
          } else {
            this.agentOptions = []
          }
        })
      }
    },

    handleUser: function(value) {
      console.log(value)
      this.form.companyId = value
      this.getSalesman()
    },

    //根据代理商 获取 业务员
    getSalesman(){
      var data = {
        companyId: this.form.companyId || ''
      }
      if (data.companyId) {
        getUserlist(data).then(response => {
          // console.info(response)
          console.info(response.companyAndUser.sharUser)
          if (response.code == 200) {
            this.userOptions = response.companyAndUser.sharUser || []
          } else {
            this.userOptions = []
          }
        })
      }
    },


  }
};
</script>
<style >
  .follow-div {
    max-height: 50vh;
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

  .follow-item > div:nth-child(2) > .content {
    border: 1px #eee solid;
    border-radius: 5px;
    padding: 8px;
  }

  .follow-item > div:nth-child(2) > .time {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .process .el-dialog__body{
    max-height: 600px !important;
    overflow-y: scroll;
  }
</style>
