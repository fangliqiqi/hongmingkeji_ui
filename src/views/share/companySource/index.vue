<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      class="input_w"
      :inline="true"
      v-show="showSearch"
      label-width="105px"
      :class="[formShow?'searchform':'searchform1']"
    >
      <!--      <el-form-item label="资源id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入资源id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <i class="el-icon-d-arrow-right icon" @click="formShow = !formShow"></i>
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          style="width:160px"
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="客新名称" prop="customerNewName">
        <el-input
          v-model="queryParams.customerNewName"
          placeholder="请输入客新名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="客户电话" prop="customerPhone">
        <el-input
          style="width:160px"
          v-model="queryParams.customerPhone"
          placeholder="请输入客户电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="客户手机" prop="customerPhoneOne">
        <el-input
          v-model="queryParams.customerPhoneOne"
          placeholder="请输入客户新的联系手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="业务描述" prop="categoryText">
        <el-input
          style="width:160px"
          v-model="queryParams.categoryText"
          placeholder="请输入业务描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--  <el-form-item label="省" prop="prov">
        <el-input
          v-model="queryParams.prov"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="客户QQ" prop="customerQQ">
        <el-input
          style="width:160px"
          v-model="queryParams.customerQQ"
          placeholder="请输入客户QQ"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户微信" prop="customerWeixin">
        <el-input
          style="width:160px"
          v-model="queryParams.customerWeixin"
          placeholder="请输入客户微信"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="接收用户"
        prop="nickName"
        v-if="form.userCompanyType == 10"
      >
        <el-input
          style="width:160px"
          v-model="queryParams.nickName"
          placeholder="请输入接收资源的用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="代理商用户id" prop="receiveId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.receiveId"-->
      <!--          placeholder="请输入代理商用户id"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="接收信息时间" prop="receiveTime">
        <!--        <el-date-picker clearable size="small" style="width: 200px"-->
        <!--                        v-model="queryParams.receiveTime"-->
        <!--                        type="date"-->
        <!--                        value-format="yyyy-MM-dd"-->
        <!--                        placeholder="选择代理商接收信息时间">-->
        <!--        </el-date-picker>-->
        <el-date-picker
          style="width:240px;"
          v-model="queryParams.messageTime"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下次跟进时间" prop="followTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 150px"
          v-model="queryParams.followTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择跟进时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="当天跟进时间" prop="createTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 160px"
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择当天跟进时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="有效状态" prop="agentState">
        <el-select
          v-model="queryParams.agentState"
          placeholder="请选择合作商确认的有效状态"
          clearable
          size="small"
          style="width: 160px"
        >
          <el-option
            v-for="dict in agentStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="回访状态" prop="returnState">
        <el-select v-model="queryParams.returnState" placeholder="请选择回访专员确认的有效状态" clearable size="small">
          <el-option
            v-for="dict in returnStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item label="商机级别" prop="sourceTypeLv">
        <el-select
          v-model="queryParams.sourceTypeLv"
          placeholder="请选择商机级别"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in sourceTypeLvOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="成交状态" prop="dealState">
        <el-select
          v-model="queryParams.dealState"
          placeholder="请选择是否成交"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in dealStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['share:companySource:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
        <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:companySource:export']"
        >导出
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">

  </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="start"
          v-show="status ==10"
          >预约接单</el-button
        >
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-download"
          size="mini"
          @click="stop"
          v-show="status==20"
          >预约停止接单
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <template>
          <div class="yuyue" v-show="yuyueTime !== null && status==10">
            {{ `预约时间为: ` + yuyueTime }}
          </div>
        </template>
      </el-col>
 <el-col :span="1.5">
        <template>
          <div class="yuyue" v-show="startTime !== null && overTime !==null &&status ==20 ">
            {{ `停止时间为: ` + startTime +` 至 ` + overTime }}
          </div>
        </template>
      </el-col>


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
      :data="companySourceList"
      @selection-change="handleSelectionChange"
      @row-click="dialogVisibles"
      height='720'
    >
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="资源序号" align="center" prop="id"/>


      <el-table-column
        label="客户名称"
        align="center"
        prop="customerName"
        min-width="100"
      />


      <el-table-column
        label="客户名称(新)"
        align="center"
        prop="customerNewName"
        min-width="100"
      />

      <el-table-column
        label="客户电话"
        align="center"
        prop="customerPhone"
        min-width="110"
      />

      <el-table-column
        label="客户电话(新)"
        align="center"
        prop="customerPhoneOne"
        min-width="110"
      />


      <el-table-column
        label="QQ"
        align="center"
        prop="customerQQ"
        min-width="100"
      />


      <el-table-column
        label="微信"
        align="center"
        prop="customerWeixin"
        min-width="120"
      />

      <el-table-column
        label="业务描述"
        align="center"
        prop="categoryText"
        min-width="320"
     />


      <!--      <el-table-column
        label="客户来源"
        align="center"
        prop="customerSource"
        min-width="80"
      />-->
      <el-table-column label="省" align="center" prop="prov" min-width="80"/>

      <el-table-column label="市" align="center" prop="city" min-width="80"/>


      <!--      <el-table-column label="区" align="center" prop="county" />-->
      <el-table-column
        label="商机处理人"
        align="center"
        prop="userId"
        min-width="120"
      >
        <template slot-scope="scope">

            <span>{{
              scope.row.nickName ? scope.row.nickName : scope.row.userName
            }}</span>

        </template>
      </el-table-column>
      <!--      <el-table-column label="代理商用户id(rz_company表id)" align="center" prop="receiveId" />-->
      <el-table-column
        label="接收信息时间"
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
      <el-table-column
        label="预计下次跟进时间"
        align="center"
        prop="followTime"
        min-width="180"
      >
        <template slot-scope="scope">

            <span>{{ parseTime(scope.row.followTime, "{y}-{m}-{d}") }}</span>

        </template>
      </el-table-column>
      <el-table-column
        label="信息有效状态"
        align="center"
        prop="agentState"
        :formatter="agentStateFormat"
        min-width="120"
      />


      <el-table-column
        label="申诉状态"
        align="center"
        prop="returnState"
        :formatter="returnStateFormat"
        min-width="120"
     />


      <el-table-column
        label="商机级别"
        align="center"
        prop="sourceTypeLv"
        :formatter="sourceTypeLvFormat"
        min-width="120"
      />
      <el-table-column
        label="商机类型"
        align="center"
        prop="categoryType"
        min-width="120"
      />

      <el-table-column
        label="成交状态"
        align="center"
        prop="categoryType"
        :formatter="dealStateFormat"
        min-width="120"
      />

     <!-- <el-table-column
        label="备注"
        align="center"
        prop="remark"
        min-width="320"
      />-->

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.returnState == 10 && scope.row.dealState != 10"
            size="mini"
            type="text"
            icon="el-icon-question"
            @click="handleStateFun(scope.row, 0)"
            v-hasPermi="['share:companySource:edit']"
            >申诉无效
          </el-button>
          <el-button
            v-if="scope.row.dealState != 10 && scope.row.agentState == 10"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleConFun(scope.row)"
            v-hasPermi="['share:companySource:edit']"
            >确认成交
          </el-button>

          <el-button
            v-if="scope.row.dealState != 10 && scope.row.agentState != 20"
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleShowFollowList(scope.row)"
            >跟进记录
          </el-button>
          <el-button
            v-if="scope.row.agentState == 20"
            size="mini"
            type="text"
            disabled
            >无效
          </el-button>
          <el-button
            v-if="scope.row.agentState != 20"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:companySource:edit']"
            >修改
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
    <!-- 预约时间选择 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="startData" ref="startData">
        <el-form-item>
          <el-date-picker
            clearable
            size="small"
            style="width: 150px"
            v-model="startData.followTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择接单时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="dialogFormStart"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 停止预约时间 -->
    <el-dialog :visible.sync="dialogStop" width="300px">
      <el-form :model="startData" ref="startData">
        <el-form-item>
          <div style="color: red">
            停止预约时间:
          </div>
          <el-date-picker
            style="width:240px;"
            v-model="startData.messageTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <div style="color: red" disabled="block">
            预约后次日生效
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStop = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="dialogFormStop"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 申述无效 -->
    <el-dialog
      title="申述无效"
      :visible.sync="stateOpen"
      width="600px"
      append-to-body
      :show-close='false'
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item  prop="reason" label="申诉理由">
          <el-select
            v-model="form.reason"
            filterable
            placeholder="请选择申诉原因"
            style="width: 100%"
            @change="handleReason"
          >
            <el-option
              v-for="(item,index) in reasonOptions"
              :key="item.index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申诉备注：" prop="content">
          <el-input
            type="textarea"
            resize="none"
            v-model="form.content"
            placeholder="点击此处录入申述缘由，详尽的申述缘由可以提高您的审批率"
          />
        </el-form-item>
      <!-- 文件上传 -->
        <el-form-item label="上传文件:" prop="textFilePath"
                   :rules="{
                              required: form.reason==reasonOptions[0] ? true : false,
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
        <el-button type="primary" @click="stateSubmitForm">提 交</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>

		<!-- 确认成交 -->
		<el-dialog
		  title="确认成交"
		  :visible.sync="confirmationOpen"
		  width="600px"
		  append-to-body
		  :close-on-click-modal="false"
		>
      <!-- <div style="margin-bottom: 20px;">确认当前商机成交(注：成交后不可再修改！！)</div> -->
      <el-form ref="form" :model="form" :rules="rules" style="display: flex;flex-direction: column;align-items:center;">
        <h4>确认当前商机成交.注:成交后不可再修改！！</h4>
        <el-form-item label="成交金额：" prop="turnover" style="width: 50%;" label-width="100px">
          <el-input
            v-model="form.turnover"
            type='number'
            placeholder="请输入成交金额"
          />
        </el-form-item>
      </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="comSubmitForm">提 交</el-button>
		    <el-button @click="cancel">取 消</el-button>
		  </div>
		</el-dialog>




    <!-- 用户展示框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="700px"
      style="margin-top:22vh;"
      append-to-body
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="VisiblesList"
        label-width="100px"
        :status-icon="true"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="VisiblesList.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户电话">
              <el-input
                v-model="VisiblesList.customerPhone"
                maxLength="12"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户QQ" prop="customerQQ">
              <el-input v-model="VisiblesList.customerQQ" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户微信" prop="customerWeixin">
              <el-input
                v-model="VisiblesList.customerWeixin"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属区域" prop="customerQQ">
              <el-input v-model="VisiblesList.prov" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户来源" prop="customerWeixin">
              <el-input
                v-model="VisiblesList.customerSource"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合作商" prop="customerQQ">
              <el-input v-model="VisiblesList.companyName" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接收时间" prop="customerWeixin">
              <el-input
                v-model="VisiblesList.receiveTime"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="接收业务员" prop="customerQQ">
              <el-input v-model="VisiblesList.nickName" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下次跟进时间" prop="customerWeixin">
              <el-input
                v-model="VisiblesList.followTime"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="业务描述" prop="categoryText">
          <el-input
            type="textarea"
            :rows="2"
            class="resizeNone"
            v-model="VisiblesList.categoryText"
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合作商确认" prop="customerQQ">
              <el-input v-model="VisiblesList.agentStateName" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务顾问确认" prop="customerWeixin" >
              <el-input
                v-model="VisiblesList.returnStateName"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商机类型" prop="customerQQ">
              <el-input v-model="VisiblesList.categoryType" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成交状态" prop="customerWeixin">
              <el-input
                v-model="VisiblesList.dealStateName"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 跟进记录 -->
    <el-dialog
      title="跟进记录"
      :visible.sync="followsOpen"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-col :span="23">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="跟进内容：" prop="content">
            <el-input
              type="textarea"
              v-model="form.content"
              placeholder="请输入跟进内容"
            />
          </el-form-item>
          <el-form-item label="跟进时间：" prop="followTime">
            <el-date-picker
              clearable
              size="small"
              style="width: 200px"
              v-model="form.followTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择再次跟进时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
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
          <span style="width: 100%; display: flex;justify-content: space-between;margin-top:10px;">
            <span v-if="item.bcfollow_time" style="flex:1;">下次跟进时间：{{item.bcfollow_time, "yyyy-MM-dd " | format}}</span>
             <span  style="flex: 1;text-align: right;">{{item.create_time, "yyyy-MM-dd hh:mm:ss" | format }}</span>
          </span>
       </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="followSubmitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改资源分配对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        :status-icon="true"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-input
                v-model="form.customerName"
                placeholder="请输入客户名称"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户电话">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入客户电话"
                maxLength="11"
                :show-word-limit="true"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="客户名称(新)" prop="dealState">
              <el-input
                v-model="form.customerPhoneOne"
                placeholder="请输入客户新的手机号码"
                maxLength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户手机(新)">
              <el-input
                v-model="form.customerNewName"
                placeholder="请输入客户新的手机号码"
                maxLength="11"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="QQ">
              <el-input v-model="form.customerQQ" placeholder="请输入QQ" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信">
              <el-input
                v-model="form.customerWeixin"
                placeholder="请输入微信"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="12">
            <el-form-item label="客户来源" prop="customerSource">
              &lt;!&ndash;          <el-input v-model="form.customerSource" placeholder="请输入客户来源"/>&ndash;&gt;
              <el-autocomplete
                :disabled="true"
                style="width: 100%"
                class="inline-input"
                v-model="form.customerSource"
                :fetch-suggestions="querySearch"
                placeholder="请输入客户来源"
                value-key="dictLabel"
                label="dictLabel"
                @select="handleSelectAgentFrom"
              ></el-autocomplete>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="省市区" prop="selectedOptions">
              <el-cascader
                :disabled="true"
                placeholder="请选择信息所在省市"
                style="width: 100%"
                size="large"
                :options="options"
                v-model="form.selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申诉状态" prop="returnState">
              <el-select
                v-model="form.returnState"
                placeholder="请选择回访专员确认的申诉状态"
                :disabled="true"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="dict in returnStateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="商机类型" prop="sourceTypeArr" v-if="!form.id">
          <el-cascader
            placeholder="请选择商机级别类型"
            style="width: 100%"
            size="large"
            :disabled="!!form.id"
            v-model="form.sourceTypeArr"
            :props="{
              value: 'id',
              label: 'label'
            }"
            :options="typeOption"
            @change="handleChange2"
          ></el-cascader>
        </el-form-item>
        <!--<el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合作商" prop="receiveId" v-if="!form.id">
              <el-select
                v-model="form.receiveId"
                filterable
                placeholder="请选择合作商"
                @change="handleUser"
                style="width: 100%"
              >
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
            <el-form-item label="业务员" prop="userId" v-if="!form.id">
              <el-select
                v-model="form.userId"
                placeholder="请选择业务员"
                style="width: 100%"
                :disabled="!!form.id"
              >
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
        </el-row>-->
        <el-form-item label="业务描述">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.categoryText"
            placeholder="请输入业务描述"
            :disabled="true"
          />
        </el-form-item>

        <el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="是否成交" prop="dealState">
              <el-select
                v-model="form.dealState"
                placeholder="请选择成交状态"
                :disabled="form.dealState == 10"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="dict in dealStateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商机级别" prop="sourceTypeLv">
              <el-select
                v-model="form.sourceTypeLv"
                placeholder="请选择商机级别"
                clearable
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="dict in sourceTypeLvOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!!form.id">

        </el-row>
       <!-- <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.remark"
            placeholder="请输入备注信息"
          />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listCompanySource,
  getCompanySource,
  delCompanySource,
  addCompanySource,
  updateCompanySource,
  exportCompanySource,
  getAppointment,
  getSuspendAppointment,
  getAppointmentList
} from "@/api/share/companySource";
import {
  getSourceAgent,
  getUserlist,
  listSourceType
} from "@/api/share/source";
import { getFollowlist, addFollow } from "@/api/share/follow";

/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import LogoVue from "../../../layout/components/Sidebar/Logo.vue";
import { Message } from "element-ui";

export default {
  name: "CompanySource",
  data() {
    return {
      //判断合作商接单状态
      status:null,
      dialogVisible: false,
      VisiblesList:{},
      //返回的预约时间

      //预约时间
      dialogFormVisible: false,
      //停止时间
      dialogStop: false,
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
      // 分配资源表格数据
      companySourceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //确认成交弹窗
      confirmationOpen:false,
      // 代理商确认信息的有效状态 10有效 20无效 字典
      agentStateOptions: [],
      // 回访专员确认信息有效状态 10有效 20无效 0待审核 字典
      returnStateOptions: [],
      // 商机级别ABCD字典
      sourceTypeLvOptions: [],
      // 是否成交10 成交 0 未成交字典
      dealStateOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerName: null,
        customerPhone: null,
        categoryText: null,
        customerSource: null,
        prov: null,
        city: null,
        county: null,
        userId: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        nickName: null,
        dealState: null,
        customerQQ: null,
        customerWeixin: null,
        customerPhoneOne: null,
        customerNewName: null,
        createTime: null,
        messageTime: null
      },
      nowtime: null,
      //返回的预约时间
      yuyueTime: null,
      //  //返回的停止时间
        startTime:null,
        overTime:null,
      // 预约时间选择
      startData: {
        followTime: null,
        messageTime: null,
        id: null
      },

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        /* customerPhone: [
            { required: true, message: '客户电话不能为空', trigger: 'blur' }
          ],*/
        categoryText: [
          { required: true, message: "业务描述不能为空", trigger: "blur" }
        ],
        customerSource: [
          { required: true, message: "客户来源不能为空", trigger: "blur" }
        ],
        prov: [{ required: true, message: "省不能为空", trigger: "blur" }],
        city: [{ required: true, message: "市不能为空", trigger: "blur" }],
        turnover: [{ required: true, message: "成交金额不能为空", trigger: "blur" }],
        userId: [{required: true,message: "接收资源的用户id不能为空", trigger: "blur"}],
        receiveId: [{required: true, message: "合作商用户id(rz_company表id)不能为空",trigger: "blur"}],
        sourceTypeId: [{ required: true, message: "商机类型id不能为空", trigger: "blur" }],
        followTime: [{ required: true, message: "请选择下次跟进时间", trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        selectedOptions: [{ required: true, message: "省市区信息不能为空", trigger: "blur" }],
        reason:[{ required: true, message: "申诉理由不能为空", trigger: "blur" }]
      },
      formShow:true,
      options: regionData,
      followData: {},
      agentOptions: [],
      typeOption: [],
      userOptions: [],
      followsOpen: false,
      stateOpen: false,
      followlistAll: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //申诉原因下拉选择
      reasonOptions:['同行','电话为空号/不接电话/微信未通过 ','城市地域不符','重复推送'],
      // 文件上传
      path: process.env.VUE_APP_BASE_API,
      updateAction: process.env.VUE_APP_BASE_API + '/share/follow/uploadFile',
      updateImg: {},
      fileList:[]
    };
  },
  created() {
    this.getList();
    this.getType();
    this.getDicts("agent_state").then(response => {
      this.agentStateOptions = response.data;
    });
    this.getDicts("return_state").then(response => {
      this.returnStateOptions = response.data;
    });

    this.getDicts("source_type_lv").then(response => {
      this.sourceTypeLvOptions = response.data;
    });
    this.getDicts("deal_state").then(response => {
      this.dealStateOptions = response.data;
    });
    this.getDicts("agent_from").then(response => {
      this.agentFrom = response.data;
    });
  },
  methods: {
    dialogVisibles(row, column, event) {
      console.info(arguments)
      if(column.property){
        let id = row.id;
        this.dialogVisible = true;
      listCompanySource({id:id}).then(response => {
          let data = response.rows[0];
          data.agentStateName = this.selectDictLabel(this.agentStateOptions,data.agentState)
          data.returnStateName = this.selectDictLabel(this.returnStateOptions,data.returnState)
           data.dealStateName = this.selectDictLabel( this.dealStateOptions,data.dealState)
          this.VisiblesList =data;

        });
      }
    },
    /** 查询分配资源列表 */
    getList() {
      this.loading = true;
      let searchData = this.queryParams;
      listCompanySource(searchData).then(response => {
        this.companySourceList = response.rows;
        this.status = response.data.status
        console.log(response.data.status);
        this.total = response.total;

        this.loading = false;
      });
    },
    getCompUserlist: function() {
      var data = {
        companyId: this.form.companyId || ""
      };
      if (data.companyId) {
        getUserlist(data).then(response => {
          console.info(response);
          console.info(response.sharUser);
          if (response.code == 200) {
            this.userOptions = response.sharUser || [];
          } else {
            this.userOptions = [];
          }
        });
      }
    },

    //日期选择错误提示
    openError() {
      this.$message.error("日期不能为当日及之前的日期");
    },
    // 判断预约时间是否为当前日期
    dialogFormStart() {
      this.dialogFormVisible = false;
      //当前时间戳
      let nowtime = new Date().getTime();
      //选择的时间戳
      const followTime = new Date(this.startData.followTime).getTime();
      const id = this.startData.id;
      if (
        followTime !== null &&
        followTime > nowtime &&
        followTime !== nowtime
      ) {
        getAppointment({
          appointmentTime: this.startData.followTime,
          id: id
        }).then(response => {
          this.yuyueTime = response.data.date;

          console.info(this.yuyueTime);
        });
      } else {
        this.openError();
      }
    },
    // 预约时间按钮
    start() {
      this.dialogFormVisible = true;
      getAppointmentList().then(response => {
        this.startData.id = response.data.id;
      });
    },

    //判断停止时间是否为当前时间段
    dialogFormStop() {
      this.dialogStop = false;
      //当前时间戳
      let nowtime = new Date().getTime();
      //选择的时间戳
      const messageTime1 = new Date(this.startData.messageTime[0]).getTime();
      const messageTime2 = new Date(this.startData.messageTime[1]).getTime();
      const id = this.startData.id;
      if (
        messageTime1 !== null &&
        messageTime2 !== null &&
        messageTime1 > nowtime &&
        messageTime2 > nowtime &&
        messageTime2 !== nowtime &&
        messageTime2 !== nowtime
      ) {

        getSuspendAppointment({
          startTime: this.startData.messageTime[0],
          overTime: this.startData.messageTime[1],
          id: id
        }).then(response => {
          this.startTime=response.data.startTime
          this.overTime= response.data.overTime
         //console.log(this.starTime);
         console.log(response.data);
        });
      } else {
        this.openError();
      }
    },

    //停止预约按钮
    stop() {
      this.dialogStop = true;
      getAppointmentList().then(response => {
        this.startData.id = response.data.id;
      });
    },

    /** 获取代理商信息 */
    getAgentList: function() {
      var data = {
        prov: this.form.prov || "",
        city: this.form.city || "",
        sourceTypeId: this.form.sourceTypeId || ""
      };
      if (data.prov && data.city && data.sourceTypeId) {
        getSourceAgent(data).then(response => {
          console.info(response);
          if (response.code == 200) {
            this.form.receiveId = null;
            this.form.userId = null;
            this.agentOptions = response.customerSources || [];
          }
        });
      }
    },

    /* 省市选择 */
    handleChange(value) {
      this.form.selectedOptions = value;
      this.form.prov = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
      this.getAgentList();
    },
    handleChange2: function(value) {
      this.form.sourceTypeId = value[1];
      this.form.sourceTypeArr = value;
      this.getAgentList();
    },
    handleUser: function(value) {
      this.form.companyId = value;
      console.info(value);
      this.getCompUserlist();
    },
    handleSelectAgentFrom(item) {
      console.log(item);
    },
    // 查询出商机类型列表
    getType() {
      listSourceType().then(response => {
        console.log(response);
        if (response.code == 200) {
          let data = response.rows || [];
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
        }
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.agentFrom;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.dictLabel
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
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
      this.VisiblesList = {};
      (this.dialogVisible = false), (this.open = false);
      this.followsOpen = false;
      this.confirmationOpen = false;
      this.reset();
      this.getList();
    },
    cancel1() {
      this.stateOpen = false;
      this.reset();
      this.$refs.upload.clearFiles();
      // this.getList();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        customerName: null,
        customerPhone: null,
        categoryText: null,
        customerSource: null,
        selectedOptions: null,
        prov: null,
        city: null,
        county: null,
        userId: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        dealState: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        content: null,
        customerQQ: null,
        customerWeixin: null,
        customerPhoneOne: null,
        customerNewName: null,
        turnover:null,
        textFilePath:[]
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
      this.queryParams.messageTime = null;
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加分配资源";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCompanySource(id).then(response => {
        let data = response.data;
        let selectedOptions = [];
        selectedOptions.push(TextToCode[data.prov].code);
        selectedOptions.push(TextToCode[data.prov][data.city].code);
        selectedOptions.push(
          TextToCode[data.prov][data.city][data.county].code
        );
        data.selectedOptions = selectedOptions;
        data.sourceTypeArr = data.sourceTypeId ? [data.sourceTypeId] : null;
        this.form = data;
        this.open = true;
        this.title = "修改资源分配";
      });
    },

    //申诉无效弹窗
    handleStateFun(row) {
      console.log('sssssssssssss')
      console.log(row)
      if(row.give=='1'){
        this.$message.error('属于赠送商机，无法申述哦~');
      }else{
        this.reset();
        this.stateOpen = true;
        this.form.id = row.id;
        var data = new Date();
        var month =
          data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
        var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
        this.form.value = data.getFullYear() + "-" + month + "-" + date;
        // console.log(this.form.value)
      }

    },

    // 文件上传传前
    beforeAvatarUpload(file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.')+1);
      let arr = ['mp3','MP3','mp4','MP4','mav','MAV','jpeg','JPEG','png','PNG','jpg','JPG']
      // // 检验是不是符合格式
      if (arr.indexOf(testmsg) == -1) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!上传音频只能是mp3/wav/mp4格式');
          return false;
        }
    },

    // 文件上传成功
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        let imgUrl = res.imgUrl
        this.form.textFilePath.push(imgUrl)
        console.log(this.form)
      } else {
        this.$message.error('文件上传失败!')
      }
    },
    // 文件删除
    handleRemove(file, fileList){
      console.log(file)
      let imgUrl = file.response.imgUrl
      this.form.textFilePath = this.form.textFilePath.filter(item=>item=!file.response.imgUrl)
      console.log(this.form.textFilePath)
    },
    // 选择申诉理由
    handleReason(e){
      console.log(this.form.reason== this.reasonOptions[0])
    },
    // 申诉提交
    stateSubmitForm() {
      console.log(this.form)
      let textFilePath = this.form.textFilePath.toString();
      var data = {
        reason:this.form.reason,
        content: this.form.content,
        textFilePath:textFilePath,
        customerId: this.form.id,
        bcfollowTime: this.form.value
      };
      console.log(data)
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateCompanySource({ id:this.form.id, returnState: 0 }).then(response => {
              if (response.code === 200) {
                addFollow(data).then(res=>{
                  console.log('跟进记录添加成功')
                  this.$refs.upload.clearFiles();
                })
                this.msgSuccess("修改成功");
                this.stateOpen = false;
                this.reset();
                this.getList();
              }else{
                this.stateOpen = false;
                this.reset();
              }
            }).catch(rej=>{
              console.log()
            this.stateOpen = false;
            this.reset();
          })

        }
      });
    },
    // 确认成交 弹窗
    handleConFun(row){
      this.reset()
      this.confirmationOpen = true,
      this.form.id = row.id;

    },
    // 确认成交 提交
    comSubmitForm(){

      var data = {
        dealState:10,
        id:this.form.id,
        turnover:this.form.turnover
      }
      console.log(data)
      updateCompanySource(data).then(res=>{
        if(res.code==200){
          this.msgSuccess("修改成功");
          this.confirmationOpen = false;
          this.reset();
          this.getList();
        }
      })
    },


    /**获取该用户的所有跟进信息*/
    handleShowFollowList(row) {
      this.loading = true;
      this.followData = { customerId: row.id };
      let img = [];
      let audio = [];
      let video = [];
      getFollowlist(this.followData).then(response => {
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
        console.log(response.follows);
        // console.log(this.path)
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
     followSubmitForm() {
//       if(this.timeId){
//         clearInterval(this.timeId)
//       }
//       this.timeId = setTimeout(() => {
        this.$refs["form"].validate(valid => {
          if (valid) {
            var data = this.followData;
            data.content = this.form.content;
            data.bcfollowTime = this.form.followTime;
            // console.log(data)
            addFollow(data).then(response => {
              if (response.code == 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.reset();
                let follow = {
                  customerId: data.customerId
                }
                this.getFollowlists(follow)
//                 getFollowlist({}).then(response => {
//                   this.followlistAll = response.follows || [];
//                   this.total = response.total || 0;
//                   this.loading = false;
//                   
//                 });
              }
            });
          }
        })
//       },500);
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompanySource(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCompanySource(this.form).then(response => {
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
      this.$confirm(
        '是否确认删除分配资源编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delCompanySource(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有分配资源数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportCompanySource(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
};
</script>
<style scoped>
.yuyue {
  height: 29px;
  line-height: 29px;
  font-size: 14px;
}
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

.license-uploader {
    width: 50%;
    height: 160px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px #eee solid;
    border-radius: 8px;
 }
.el-upload {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .el-upload .img-cl {
    width: 100%;
    height: 100%;
  }

</style>
