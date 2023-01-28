<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="105px"
      :class="[formShow?'searchform':'searchform1']"
    >
      <i class="el-icon-d-arrow-right icon" @click="formShow = !formShow"></i>
      <el-form-item label="客户名/电话" prop="customerName">
        <el-select
          v-model="queryParams.id"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请输入客户名/手机号码"
          style="width:200px"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="handleChangeName"
          @clear="handleClear"
        >
          <el-option
            v-for="item in customerOptions"
            :key="item.id"
            :label="item.customerName + ' ' + item.customerPhone"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="客户来源" prop="customerSource">
        <el-input
          v-model="queryParams.customerSource"
          placeholder="请输入客户来源"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户所在省" prop="prov">
        <el-input
          v-model="queryParams.prov"
          placeholder="请输入省"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户所在市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <!--<el-form-item label="代理商" prop="receiveId">
        <el-select v-model="queryParams.receiveId" placeholder="请选择状态" clearable style="width: 200px">
          <el-option
            v-for="(item,index) in rzCompanyList"
            :key="'key'+index"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->

      <el-form-item label="合作商" prop="receiveId">
        <el-select
          v-model="queryParams.receiveId"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请输入合作商"
          style="width:200px"
          :remote-method="remoteMethodt"
          :loading="loading"
          @change="handleChangereceiveId"
          @clear="handleClear1"
        >
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户QQ" prop="customerQQ">
        <el-input
          v-model="queryParams.customerQQ"
          placeholder="请输入客户QQ"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户微信" prop="customerWeixin">
        <el-input
          v-model="queryParams.customerWeixin"
          placeholder="请输入客户微信"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接收信息时间" prop="receiveTime">
        <el-date-picker
          clearable
          style="width: 200px"
          v-model="queryParams.receiveTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择合作商接收信息时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下次跟进时间" prop="followTime">
        <el-date-picker
          clearable
          style="width: 200px"
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
          style="width: 200px"
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择最近跟进时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申诉状态" prop="returnState">
        <el-select
          v-model="queryParams.returnState"
          placeholder="请选择回访专员确认的申诉状态"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in returnStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="成交状态" prop="dealState">
        <el-select
          v-model="queryParams.dealState"
          placeholder="请选择"
          clearable
          style="width: 200px"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:source:add']"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handlenewAdd"
          v-hasPermi="['share:source:add']"
          >新商机分配
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleBusinessAdd"
          v-hasPermi="['share:source:addhz']"
        >安庆新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:source:edit']"
          >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:source:export']"
          >月数据导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleNowExport"
          v-hasPermi="['share:source:export']"
        >当日数据导出
        </el-button>
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
      :data="sourceList"
      @selection-change="handleSelectionChange"
      @row-click="dialogVisibles"
      height='720'
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源id" align="center" prop="id"/>

      <el-table-column
        label="客户名称"
        align="center"
        prop="customerName"
        min-width="120"
      />

      <el-table-column
        label="客户电话"
        align="center"
        prop="customerPhone"
        min-width="120"
      >
        <template slot-scope="scope">
            <span>{{scope.row.customerPhone | phoneFiler}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务描述"
        align="center"
        prop="categoryText"
        min-width="400"
      />


      <el-table-column
        label="客户QQ"
        align="center"
        prop="customerQQ"
        min-width="120"
      >
        <template slot-scope="scope">
              <span>{{scope.row.customerQQ | phoneFiler}}</span>
          </template>
        </el-table-column>



      <el-table-column
        label="客户微信"
        align="center"
        prop="customerWeixin"
        min-width="120"
       >
        <template slot-scope="scope">
              <span>{{scope.row.customerWeixin | phoneFiler}}</span>
          </template>
        </el-table-column>



      <el-table-column label="客户来源" align="center" prop="customerSource"/>


      <el-table-column label="省" align="center" prop="prov"/>


      <el-table-column label="市" align="center" prop="city"/>


      <el-table-column
        label="接收用户"
        align="center"
        prop="userId"
        min-width="200"
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
        min-width="120"
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

      <el-table-column
        label="跟进时间"
        align="center"
        prop="followTime"
        width="180"
      >
        <template slot-scope="scope">
            <span>{{ parseTime(scope.row.followTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="合作商确认"
        align="center"
        prop="agentState"
        :formatter="agentStateFormat"
        min-width="120"
      />

      <el-table-column
        label="回访专员确认"
        align="center"
        prop="returnState"
        :formatter="returnStateFormat"
        min-width="120"
      />


      <el-table-column label="商机类型" align="center" min-width="120">
        <template slot-scope="scope">

            <span>{{ scope.row.categoryCity + scope.row.categoryType }}</span>

        </template>
      </el-table-column>

      <el-table-column
        label="商机级别"
        align="center"
        prop="sourceTypeLv"
        :formatter="sourceTypeLvFormat"
      />

      <el-table-column
        label="是否成交"
        align="center"
        prop="dealState"
        :formatter="dealStateFormat"
     />


      <!--<el-table-column
        label="备注"
        align="center"
        prop="remark"
        min-width="320"
      />
-->

      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        class-name="small-padding fixed-width"
        min-width="220"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:source:edit']"
            >修改</el-button
          >
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--            v-hasPermi="['share:source:remove']"-->
          <!--          >删除</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleShowFollowList(scope.row)"
            >跟进记录</el-button
          >
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
            <el-form-item label="合作商" prop="customerQQ" >
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
            <el-form-item label="合作商确认" prop="customerQQ" :formatter="agentStateFormat">
              <el-input v-model="VisiblesList.agentStateName" maxLength="15" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务顾问确认" prop="customerWeixin" >
              <el-input
                v-model="VisiblesList.returnStateName"
                maxLength="30"
                :show-word-limit="true"  />
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

    <!-- 添加或修改资源分配对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="700px"
      style="margin-top:22vh;"
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
                maxlength='20'
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户电话">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入客户电话"
                maxLength="12"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户QQ" prop="customerQQ">
              <el-input
                v-model="form.customerQQ"
                placeholder="请输入客户QQ"
                maxLength="15"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户微信" prop="customerWeixin">
              <el-input
                v-model="form.customerWeixin"
                placeholder="请输入客户微信"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户来源" prop="customerSource">
              <!--          <el-input v-model="form.customerSource" placeholder="请输入客户来源"/>-->
              <!-- <el-autocomplete
                style="width: 100%"
                class="inline-input"
                v-model="form.customerSource"
                :fetch-suggestions="querySearch"
                placeholder="请输入客户来源"
                value-key="dictLabel"
                label="dictLabel"
                @select="handleSelectAgentFrom"
              ></el-autocomplete> -->
              <el-select
                v-model="form.customerSource"
                filterable
                placeholder="请输入客户来源"
                style="width: 100%"
              >
                <el-option
                  v-for="item in agentFrom"
                  :key="item.id"
                  :label="item.dictLabel"
                  :value="item.dictLabel"
                >
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
                :key="isResouceShow"
                :disabled="!!form.id"
                :options="options"
                v-model="form.selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
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
        <el-row :gutter="20">
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
        </el-row>
        <el-form-item label="业务描述" prop="categoryText">
          <el-input
            type="textarea"
            :rows="2"
            maxlength='20'
            show-word-limit
            class="resizeNone"
            v-model="form.categoryText"
            placeholder="请输入业务描述(限制20个字符内)"
          />
        </el-form-item>
        <!--新增运营数据补充-->
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="来询方式" prop="inquiryMode" >
              <el-input
                v-model="form.inquiryMode"
                placeholder="请输入来询方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="搜索词" prop="searchTerms" >
              <el-input
                v-model="form.searchTerms"
                placeholder="请输入搜索词"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="关键词" prop="customerKeyword" >
              <el-input
                v-model="form.customerKeyword"
                placeholder="请输入关键词"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item v-show="remark !== null">
          <template>
            <div style="color:red;font-size:22px">
              {{ `特殊提示:` + remark }}
            </div>
          </template>
        </el-form-item>
        <el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="回访状态" prop="returnState">
              <el-select
                v-model="form.returnState"
                placeholder="请选择回访专员确认信息有效状态"
                clearable
                size="small"
                style="width: 100%"
                disabled=""
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
          <!--<el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="是否成交" prop="dealState" >
              <el-select v-model="form.dealState" placeholder="请选择成交状态" clearable
                         size="small" style="width: 100%">
                <el-option
                  v-for="dict in dealStateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改资源分配对话框(新) -->
    <el-dialog
      :title="title"
      :visible.sync="newopen"
      width="700px"
      style="margin-top:22vh;"
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
                maxlength='20'
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户电话">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入客户电话"
                maxLength="12"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户QQ" prop="customerQQ">
              <el-input
                v-model="form.customerQQ"
                placeholder="请输入客户QQ"
                maxLength="15"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户微信" prop="customerWeixin">
              <el-input
                v-model="form.customerWeixin"
                placeholder="请输入客户微信"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户来源" prop="customerSource">
              <!--          <el-input v-model="form.customerSource" placeholder="请输入客户来源"/>-->
              <!-- <el-autocomplete
                style="width: 100%"
                class="inline-input"
                v-model="form.customerSource"
                :fetch-suggestions="querySearch"
                placeholder="请输入客户来源"
                value-key="dictLabel"
                label="dictLabel"
                @select="handleSelectAgentFrom"
              ></el-autocomplete> -->
              <el-select
                v-model="form.customerSource"
                filterable
                placeholder="请输入客户来源"
                style="width: 100%"
              >
                <el-option
                  v-for="item in agentFrom"
                  :key="item.id"
                  :label="item.dictLabel"
                  :value="item.dictLabel"
                >
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
                :key="isResouceShow"
                :disabled="!!form.id"
                :options="options"
                v-model="form.selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
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
        <el-row :gutter="20">
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
        </el-row>
        <el-form-item label="业务描述" prop="categoryText">
          <el-input
            type="textarea"
            :rows="2"
            maxlength='20'
            show-word-limit
            class="resizeNone"
            v-model="form.categoryText"
            placeholder="请输入业务描述(限制20个字符内)"
          />
        </el-form-item>
        <!--新增运营数据补充-->
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="来询方式" prop="inquiryMode" >
              <el-input
                v-model="form.inquiryMode"
                placeholder="请输入来询方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="搜索词" prop="searchTerms" >
              <el-input
                v-model="form.searchTerms"
                placeholder="请输入搜索词"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item prop="give" label="是否为赠送" v-if="!form.id" >
              <!-- <el-radio-group @change="radioChange"  v-model="form.give">
                <el-radio :label="0" >不赠送</el-radio>
                <el-radio :label="1">赠送</el-radio>
              </el-radio-group> -->
              <el-radio :label="0" v-model="form.give" @change="radioChange">不赠送</el-radio>
              <el-radio :label="1" v-model="form.give" @change="radioChange">赠送</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关键词" prop="customerKeyword" >
              <el-input
                v-model="form.customerKeyword"
                placeholder="请输入关键词"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item v-show="remark !== null">
          <template>
            <div style="color:red;font-size:22px">
              {{ `特殊提示:` + remark }}
            </div>
          </template>
        </el-form-item>
        <el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="回访状态" prop="returnState">
              <el-select
                v-model="form.returnState"
                placeholder="请选择回访专员确认信息有效状态"
                clearable
                size="small"
                style="width: 100%"
                disabled=""
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
          <!--<el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="是否成交" prop="dealState" >
              <el-select v-model="form.dealState" placeholder="请选择成交状态" clearable
                         size="small" style="width: 100%">
                <el-option
                  v-for="dict in dealStateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormnew">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改资源分配对话框(安庆专用) -->
    <el-dialog
      :title="title"
      :visible.sync="openBusiness"
      width="700px"
      style="margin-top:22vh;"
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
                maxlength='20'
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户电话">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入客户电话"
                maxLength="12"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户QQ" prop="customerQQ">
              <el-input
                v-model="form.customerQQ"
                placeholder="请输入客户QQ"
                maxLength="15"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户微信" prop="customerWeixin">
              <el-input
                v-model="form.customerWeixin"
                placeholder="请输入客户微信"
                maxLength="30"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户来源" prop="customerSource">
              <!--          <el-input v-model="form.customerSource" placeholder="请输入客户来源"/>-->
              <el-autocomplete
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="省市区" prop="selectedOptions">
              <el-cascader
                placeholder="请选择信息所在省市"
                style="width: 100%"
                size="large"
                :key="isResouceShow"
                :disabled="!!form.id"
                :options="options"
                v-model="form.selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
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

        <el-form-item label="业务描述" prop="categoryText">
          <el-input
            type="textarea"
            :rows="2"
            maxlength='20'
            show-word-limit
            class="resizeNone"
            v-model="form.categoryText"
            placeholder="请输入业务描述(限制20个字符内)"
          />
        </el-form-item>
        <!--新增运营数据补充-->
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="来询方式" prop="inquiryMode" >
              <el-input
                v-model="form.inquiryMode"
                placeholder="请输入来询方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="搜索词" prop="searchTerms" >
              <el-input
                v-model="form.searchTerms"
                placeholder="请输入搜索词"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="关键词" prop="customerKeyword" >
              <el-input
                v-model="form.customerKeyword"
                placeholder="请输入关键词"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item v-show="remark !== null">
          <template>
            <div style="color:red;font-size:22px">
              {{ `特殊提示:` + remark }}
            </div>
          </template>
        </el-form-item>
        <el-row :gutter="20" v-if="!!form.id">
          <el-col :span="12">
            <el-form-item label="回访状态" prop="returnState">
              <el-select
                v-model="form.returnState"
                placeholder="请选择回访专员确认信息有效状态"
                clearable
                size="small"
                style="width: 100%"
                disabled=""
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
        <!--<el-row :gutter="20" v-if="!!form.id">
        <el-col :span="12">
          <el-form-item label="是否成交" prop="dealState" >
            <el-select v-model="form.dealState" placeholder="请选择成交状态" clearable
                       size="small" style="width: 100%">
              <el-option
                v-for="dict in dealStateOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBusinessForm">确 定</el-button>
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
  rzCompanyType,
  getSource,
  delSource,
  addSource,
  updateSource,
  exportSource,
  getSourceAgent,
  getSourceAgentnew,
  getUserlist,
  listSourceType,
  getCustomerList,
  getCompanyList,
  addSourceBusiness,
  exportNowSource,
  addSourcenew,
  updateSourcenew
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
  // provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  name: "Source",
  data() {
    return {
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
      // 是否显示弹出层(安庆)
      openBusiness: false,
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
        inquiryMode: null,
        customerKeyword: null,
        searchTerms: null,
        createTime: null
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
        give:[
          { required: true, message: "是否赠送不能为空", trigger: "blur" }
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
      formShow:true,
      path:process.env.VUE_APP_BASE_API,
      newopen:false,
      news:true
    };
  },
  created() {
    this.getList();
    // this.getType()
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
      // console.info(response)
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
      listSource(this.queryParams).then(response => {
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
    getSourceType(){
      var data = {
        prov: this.form.prov || "",
        city: this.form.city || "",
        county: this.form.county || ""
      };
      if (data.prov && data.city && data.county) {
        if(this.newopen){
          getSourceAgentnew(data).then(res => {
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
        }else{
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
        if(this.newopen){
          getSourceAgentnew(data).then(response => {
            // console.info(response)
            if (response.code == 200) {
              this.form.receiveId = null;
              this.form.userId = null;
              this.agentOptions = response.customerSources || [];
            } else {
              this.agentOptions = [];
            }
          });
        }else{
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

    // 商机类型选择
    handleChange2: function(value) {
      (this.remark = null),
        (this.form.receiveId = null),
        (this.form.userId = null),
        (this.form.sourceTypeId = value[1]);
        this.form.sourceTypeArr = value;

      // 选择个人户默认赠送 但是老规格的全是0
      if(this.newopen){
        if(this.form.sourceTypeArr[0]=='7'){
          // this.form.give = 1 这种写法有问题
          this.$set(this.form,'give',1)
        }else{
           this.$set(this.form,'give',0)
        }
      }else{
        this.$set(this.form,'give',0)
      }

      this.getAgentList();
    },
    radioChange(value){

      this.$set(this.form,'give',value)
    },
    handleUser: function(value) {

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
      this.newopen = false;
      this.followsOpen = false;
      this.reset();
    },
    // bfclose:function(done){
    //   this.reset();
    //   done();
    // },
    // 表单重置
    reset() {
      (this.remark = null),
        (this.form = {
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
          inquiryMode: null,
          customerKeyword: null,
          searchTerms: null
        });
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // guan(){
    //   this.remark=null
    // },
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

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加资源分配";
    },
    /** 新增按钮操作 */
    handlenewAdd() {
      this.reset();
      this.newopen = true;
      this.title = "添加资源分配(新)";
    },

    /** 新增按钮操作(安庆专用) */
    handleBusinessAdd() {
      this.reset();
      this.openBusiness = true;
      this.title = "添加资源分配(安庆专用)";
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log(row)
      this.reset();
      const id = row.id || this.ids;

      getSource(id).then(response => {
        console.info(response);
        let data = response.data;
        let selectedOptions = [];
        selectedOptions.push(TextToCode[data.prov].code);
        selectedOptions.push(TextToCode[data.prov][data.city].code);
        selectedOptions.push(
          TextToCode[data.prov][data.city][data.county].code
        );
        data.selectedOptions = selectedOptions;
        data.sourceTypeArr = data.sourceTypeId ? [data.sourceTypeId] : null;

        if(row.createTime){
          let data1 = new Date(row.createTime).getTime()/1000;
          let data2 = new Date("2021-06-08 00:00:00").getTime()/1000;
          if(data1-data2>0){
            this.newopen = true
            this.title = "修改资源分配(新)";
            data.give = Number(data.give)
          }else{
            this.open = true
            this.title = "修改资源分配";
          }
        }
        this.form = data;
      });
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

    // 商机分配(新)
    /** 提交按钮 */
    submitFormnew: throttle(function() {
      this.remark = null;
      console.info(this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSourcenew(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.newopen = false;
                this.getList();
              }
            });
          } else {
            addSourcenew(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.newopen = false;
                this.getList();
              }
            });
          }
        } else {
          console.info(valid);
        }
      });
    }, 6000),

    /** 提交按钮（安庆专用） */
    submitBusinessForm: throttle(function() {
      this.remark = null;
      console.info(this.form);
      this.$refs["form"].validate(valid => {
        console.log(valid)
        if (valid) {
          addSourceBusiness(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.openBusiness = false;
                this.getList();
              }
            });
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
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有资源分配数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportSource(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    handleNowExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出今日分配数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportNowSource(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
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
          video=[]
          return items
        })
        // console.log(response.follows);
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
    handleSelectAgentFrom(item) {
      console.log(item);

    }
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
.audio{
  height: 30px;
  border:none;
  outline: none;
}
</style>
