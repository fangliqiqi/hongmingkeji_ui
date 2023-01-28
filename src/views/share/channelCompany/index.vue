<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
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
          :loading="loading"
        >
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.companyName + ' ' + item.principalPhone"
            :value="item.companyName"
          >
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

    <!--    <el-row :gutter="10" class="mb8">-->
    <!-- 新增键 -->
    <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:channelCompany:add']"
        >新增</el-button>
      </el-col> -->

    <!-- 修改键 -->
    <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:channelCompany:edit']"
        >修改</el-button>
      </el-col> -->

    <!-- 删除键 -->
    <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:channelCompany:remove']"
        >删除</el-button>
      </el-col> -->
    <!--<el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:channelCompany:export']"
          >导出</el-button
        >
      </el-col>-->
    <!-- <div class="top-right-btn">
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
    </el-row>-->

    <el-table
      v-loading="loading"
      :data="channelCompanyList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="公司id" align="center" prop="id" /> -->
      <!--  <el-table-column label="用户id" align="center" prop="userId" />-->
      <!-- <el-table-column label="用户昵称" align="center" prop="nickName" min-width="120"/> -->
      <el-table-column label="下发按钮" align="center" min-width="220">
        <template slot-scope="scope">
          <el-button
           type="primary" plain
            size="mini"
            @click="businessOpportunities(scope.row)"
            >测试商机
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="资源总数"
        align="center"
        prop="remark"
        min-width="220"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleSource(scope.row)">{{
            scope.row.count
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="公司名称"
        align="center"
        prop="companyName"
        min-width="220"
      />
      <!-- <el-table-column label="统一社会信用代码" align="center" prop="creditCode" min-width="220"/> -->
      <!--      <el-table-column label="营业执照地址" align="center" prop="address" min-width="320"/>-->
      <el-table-column
        label="公司地址"
        align="center"
        prop="enaddr"
        min-width="320"
      />
      <!-- <el-table-column label="法人代表" align="center" prop="contacts" min-width="120"/> -->
      <!--      <el-table-column label="法人电话" align="center" prop="contactsPhone" min-width="120"/>-->
      <el-table-column
        label="负责人代表"
        align="center"
        prop="principal"
        min-width="120"
      />
      <el-table-column
        label="负责人电话"
        align="center"
        prop="principalPhone"
        min-width="120"
      />
      <el-table-column
        label="代账许可"
        align="center"
        prop="permitImg"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.permitImg"
            style="height: 30px"
            :src="require('@/assets/image/daizhang-02.png')"
            fit="contain"
            :preview-src-list="[path + scope.row.permitImg]"
          ></el-image>
          <el-image
            v-else
            style="height: 30px"
            :src="require('@/assets/image/daizhang-01.png')"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="营业执照"
        align="center"
        prop="licenseImg"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.licenseImg"
            style="height: 30px"
            :src="require('@/assets/image/yingyezhizhao-02.png')"
            fit="contain"
            :preview-src-list="[path + scope.row.licenseImg]"
          ></el-image>
          <el-image
            v-else
            style="height: 30px"
            :src="require('@/assets/image/yingyezhizhao-01.png')"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="法人身份证(正)"
        align="center"
        prop="cardFront"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.cardFront"
            style="height: 30px"
            :src="require('@/assets/image/faren-02.png')"
            fit="contain"
            :preview-src-list="[path + scope.row.cardFront]"
          ></el-image>
          <el-image
            v-else
            style="height: 30px"
            :src="require('@/assets/image/faren-01.png')"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="法人身份证(反)"
        align="center"
        prop="cardReverse"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.cardReverse"
            style="height: 30px"
            :src="require('@/assets/image/shenfenzheng-02.png')"
            fit="contain"
            :preview-src-list="[path + scope.row.cardReverse]"
          ></el-image>
          <el-image
            v-else
            style="height: 30px"
            :src="require('@/assets/image/shenfenzheng-01.png')"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="省" align="center" prop="prov" min-width="120" />
      <el-table-column label="市" align="center" prop="city" min-width="120" />
      <el-table-column
        label="区县"
        align="center"
        prop="county"
        min-width="120"
      />

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        min-width="220"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <el-button
                v-if="scope.row.dealState != 10 && scope.row.agentState != 20"
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handleShowFollowList(scope.row)"
                >跟进记录
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-dropdown trigger="click">
                <el-button
                  size="mini"
                  type="text"
                  @click="getCommand(scope.row)"
                >
                  <div>
                    <span v-text="getName(scope.row)"></span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="dict in companyStatus"
                    :key="dict.dictValue"
                    @click.native="handleCommand(dict.dictValue)"
                    v-if="
                      scope.row.status == 10
                        ? dict.dictValue == 20 || dict.dictValue == 50
                        : scope.row.status == 20
                        ? dict.dictValue == 30 || dict.dictValue == 40
                        : scope.row.status == 40
                        ? dict.dictValue == 20 || dict.dictValue == 50
                        : scope.row.status == 30
                        ? dict.dictValue == 20 || dict.dictValue == 40
                        : scope.row.status == 50
                        ? dict.dictValue == 20 || dict.dictValue == 40
                        : false
                    "
                    >{{ dict.dictLabel }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>

          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:channelCompany:edit']"
          >修改</el-button> -->

          <!-- 删除键 -->
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:channelCompany:remove']"
          >删除</el-button> -->
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

    <!-- 测试商机弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-row :gutter="20">
        <el-form :model="testSalesman" label-width="100px">
          <el-col :span="24">
            <el-form-item label="姓名" >
              <el-select v-model="testSalesman.userId" placeholder="请选择姓名">
                <el-option
                  v-for="item in salesman"
                  :key="item.userId"
                  :label="item.nickName"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibleNickName">确 定</el-button>
    </span>

    </el-dialog>

    <!-- 用户资源弹出框 -->
    <el-dialog
      title="合作商资源"
      :visible.sync="sourceOpen"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
      :before-close="bfCloseFun"
    >
      <div>
        <el-form
          :model="queryParamsInner"
          ref="queryFormInner"
          :inline="true"
          v-show="showSearch"
          label-width="105px"
        >
          <el-form-item label="接收信息时间" prop="receiveTime">
            <el-date-picker
              clearable
              style="width: 200px"
              v-model="queryParamsInner.receiveTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择合作商接收信息时间"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="下次跟进时间" prop="followTime">
            <el-date-picker
              clearable
              style="width: 200px"
              v-model="queryParamsInner.followTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择跟进时间"
            >
            </el-date-picker>
          </el-form-item>-->
          <!--  <el-form-item label="当天跟进时间" prop="createTime">
            <el-date-picker
              clearable
              style="width: 200px"
              v-model="queryParamsInner.createTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择最近跟进时间"
            >
            </el-date-picker>
          </el-form-item>-->
          <el-form-item label="申诉状态" prop="returnState">
            <el-select
              v-model="queryParamsInner.returnState"
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
          <el-form-item label="是否成交" prop="dealState">
            <el-select
              v-model="queryParamsInner.dealState"
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
              @click="channelQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetChQuery"
              >重置</el-button
            >
          </el-form-item>
        </el-form>

        <!-- 功能显示模块改成数据展示 -->
        <el-row :gutter="10" class="mb8">
          <!--<el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['share:channelCompany:export']"
              >导出</el-button
            >
          </el-col>-->
          <el-col
            v-for="item of sourTypeCount"
            :key="item.id"
            :span="4"
            :offset="1"
          >
            <div>
              <span style="color: #00afff;font-size: 14px;">{{
                item.categoryType
              }}</span>
              <span
                style="color: #48D1CC;margin-left: 8px;font-weight: bold;"
                >{{ item.count || 0 }}</span
              >
            </div>
          </el-col>
          <div class="top-right-btn">
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="top"
            >
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
        >
          <el-table-column type="selection" width="55" align="center" />
          <!-- <el-table-column label="资源id" align="center" prop="id"/> -->
          <el-table-column
            label="客户名称"
            align="center"
            prop="customerName"
            min-width="120"
          />
          <!-- <el-table-column label="客户电话" align="center" prop="customerPhone" min-width="120"/> -->
          <!-- <el-table-column label="客户电话" align="center" prop="customerPhone" min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.customerPhone | phoneFiler}}</span>
        </template>
      </el-table-column> -->
          <el-table-column
            label="业务描述"
            align="center"
            prop="categoryText"
            min-width="400"
          />

          <el-table-column
            label="客户来源"
            align="center"
            prop="customerSource"
          />
          <el-table-column label="省" align="center" prop="prov" />
          <el-table-column label="市" align="center" prop="city" />
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
          <el-table-column
            label="备注"
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
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handleChannelFollowList(scope.row)"
                >跟进记录</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="totalId"
          :page.sync="queryParamsInner.pageNum"
          :limit.sync="queryParamsInner.pageSize"
          @pagination="handleSourceFenye"
        />

        <!-- 资源列表里的跟进记录，只展示数据 -->
        <!-- 跟进记录 -->
        <el-dialog
          title="跟进记录"
          :visible.sync="ziyuanOpen"
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
              <!-- <el-input
                      type="textarea"
                      :rows="2"
                      class="resizeNone"
                      v-model="form.content"
                      placeholder="请输入跟进内容"
                      style="width:90%;"
                    /> -->
            </el-form-item>
          </el-form>

          <div class="follow-div">
            <div
              class="follow-box "
              v-for="(item, index) in followList"
              :key="index"
            >
              <div>
                <div>
                  <span>{{ item.nick_name }}</span>
                  <span>({{ item.role_name }})</span>
                </div>
                <span>{{ item.phonenumber }}</span>
              </div>
              <div>
                <div class="content">
                  <span>{{ item.content }}</span>
                </div>

                <div class="time">
                  <div>
                    <span>下次跟进时间：</span>
                    <span>{{
                      (item.bcfollow_time, "yyyy-MM-dd" | format)
                    }}</span>
                  </div>
                  <span>{{
                    (item.create_time, "yyyy-MM-dd hh:mm:ss" | format)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="followSubmitForm"
                    >提 交</el-button
                  >
                  <el-button @click="cancel">取 消</el-button>
                </div> -->
        </el-dialog>
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
              <span>{{ item.createBy }}</span>
              <span>({{ item.role_name }})</span>
            </div>
            <span>{{ item.phonenumber }}</span>
          </div>
          <div>
            <div class="content">
              <span>{{ item.content }}</span>
            </div>

            <div class="time">
              <div>
                <span>下次跟进时间：</span>
                <span>{{ item.bcfollowTime }}</span>
              </div>

              <span>{{
                (item.createTime, "yyyy-MM-dd hh:mm:ss" | format)
              }}</span>
            </div>
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
  listChannelCompany,
  getChannelCompany,
  delChannelCompany,
  addChannelCompany,
  updateChannelCompany,
  exportChannelCompany,
  getChannelCompanyList,
  listChannelCompanyType,
  listChannelCompanyfinAll,
  updateStatus,
  getUserList,
  issueTest
} from "@/api/share/channelCompany";

import {
  listSource,
  rzCompanyType,
  getSource,
  delSource,
  addSource,
  updateSource,
  exportSource,
  getSourceAgent,
  getUserlist,
  listSourceType,
  getCustomerList,
  getCompanyList
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

import {
  getChannelCompanyFollowlist,
  addChannelCompanyFollow,
  getChannelCompanyMulv
} from "@/api/share/follow";
export default {
  name: "ChannelCompany",
  data() {
    return {

      companyCommand: [],
      //测试商机弹出框
      dialogVisible: false,
      //合作商状态
      Command: [],
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
      //弹出表单条数
      totalId: 0,
      // 回访专员确认信息有效状态 10有效 20无效 0待审核字典
      returnStateOptions: [],
      // 加盟商信息表格数据
      channelCompanyList: [],
      // 资源分配表格数据
      sourceList: [],
      // 弹出层标题
      title: "",
      // 是否成交10 成交 0 未成交字典
      dealStateOptions: [],
      testSalesman:{},
      //测试商机的业务员
      salesman: [],
      // 是否显示弹出层
      open: false,
      companyStatus: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: 1,
        categoryText: null,
        customerPhone: null,
        customerSource: null,
        prov: null,
        receiveTime: null,
        receiveId: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        dealState: null,
        categoryCity: null,
        categoryType: null,
        createTime: null,
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
        city: null,
        county: null,
        nickName: null,
        contactsIdcard: null,
        principalPhone: null,
        principal: null,
        expendAmount: null
      },
      companyOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        creditCode: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: "blur"
          }
        ],
        prov: [
          { required: true, message: "负责的省不能为空", trigger: "blur" }
        ],
        city: [
          { required: true, message: "负责的市不能为空", trigger: "blur" }
        ],
        principalPhone: [
          { required: true, message: "负责人电话不能为空", trigger: "blur" }
        ],
        principal: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ],
        followTime: [
          { required: true, message: "请选择下次跟进时间", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请填写跟进内容", trigger: "blur" }
        ]
      },
      followRules: {
        content: [{ message: "跟进内容不能为空", trigger: "blur" }],
        followTime: [
          { required: true, message: "下次跟进时间不能为空", trigger: "blur" }
        ]
      },
      sourTypeCount: [],
      path: process.env.VUE_APP_BASE_API,
      followData: {},
      followsOpen: false,
      sourceOpen: false,
      ziyuanOpen: false,
      followlistAll: [],
      followList: null,
      agentStateOptions: [],
      sourceTypeLvOptions: [],
      receiveId: null,
      queryParamsInner: {
        pageNum: 1,
        pageSize: 10,
        receiveTime: null,
        companyId: null,
        followTime: null,
        createTime: null,
        returnState: null,
        dealState: null,
        receiveId: null
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("deal_state").then(response => {
      // console.info(response)
      if (response.code) {
        this.dealStateOptions = response.data;
      }
    });
    this.getDicts("source_type_lv").then(response => {
      this.sourceTypeLvOptions = response.data;
    });
    this.getDicts("refer_state").then(response => {
      this.agentStateOptions = response.data;
      this.returnStateOptions = response.data;
      this.followStateOptions = response.data;
    });
    this.getDicts("company_status").then(response => {
      this.companyStatus = response.data;
    });
  },
  methods: {
    //测试商机按钮
    dialogVisibleNickName() {
      issueTest(this.testSalesman).then(response=>{
        if(response.code==200){
          this.dialogVisible=false
        }
      })
    },

    disabledFun(row){
      let date =  new Date(row.createTime.split(' ')[0]).getTime();
      let curDate = new Date();
      let mm = curDate.getMonth()+1;
      let dd = curDate.getDate();
      let yy = curDate.getFullYear();
      let now = new Date(yy+'-'+mm+'-'+dd).getTime();
      return (now - date) / 1000 /60/60/24>30
    },
    //测试商机获得业务员信息
    businessOpportunities(row) {
      let id = row.id;
      this.dialogVisible = true;
      this.testSalesman = {userId:null,id:row.id};
      let tempArr = [];
      getUserList({ id: id }).then(response => {
        this.salesman = response.data;
      });
    },

    getName(row) {
      return this.selectDictLabel(this.companyStatus, row.status);
    },
    getCommand(row) {
      if (this.Command.length) {
        this.Command = row;
      } else {
        this.Command = [];
        this.Command = row;
      }
      delete this.Command.params;
    },
    //合作商状态
    handleCommand(item) {
      this.Command.status = item;
      updateStatus(this.Command).then(response => {
        console.log(response);
      });
    },
    /**获取该用户的所有跟进信息*/
    handleShowFollowList(row) {
      this.loading = true;
      this.followData = { customerId: row.id };
      getChannelCompanyFollowlist(this.followData).then(response => {
        this.followlistAll = response.follows || [];
        this.total = response.total || 0;
        this.loading = false;
        this.followsOpen = true;
        console.log(response);
        // this.ziyuanOpen=true;
      });
      // console.info(row);
    },
    // 获取资源列表用户跟进信息
    handleChannelFollowList(row) {
      this.ziyuanOpen = true;
      this.followData = { customerId: row.id };
      getChannelCompanyMulv(this.followData).then(response => {
        this.followList = response.follows;
        // console.log(response.follows);
        this.total = response.total || 0;
        this.loading = false;
      });
    },
    /** 跟进记录提交按钮 */
    followSubmitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = this.followData;
          data.content = this.form.content;
          data.bcfollowTime = this.form.followTime;
          addChannelCompanyFollow(data).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
              getChannelCompanyFollowlist(data).then(response => {
                this.followlistAll = response.follows || [];
                this.total = response.total || 0;
                this.loading = false;
                this.reset();
              });
            }
          });
        }
      });
    },

    /** 查询加盟商信息列表 */
    getList() {
      this.loading = true;
      listChannelCompany(this.queryParams).then(response => {
        this.channelCompanyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });

      // listSource(this.queryParams).then(response => {
      //   // console.log(response)
      //   this.sourceList = response.rows;
      //   // this.total = response.total
      //   // this.loading = false
      // });
    },
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
    //合作商状态
    companyStatusFormat(row, column) {
      return this.selectDictLabel(this.companyStatus, row.companyStatus);
    },

    // 备注点击弹框
    handleSource(row) {
      this.sourceOpen = true;
      this.receiveId = row.id;
      let receiveId = row.id;
      const pageNum = this.queryParamsInner.pageNum;
      const pageSize = this.queryParamsInner.pageSize;
      listChannelCompanyType({
        receiveId: receiveId,
        pageSize: pageSize,
        pageNum: pageNum
      }).then(response => {
        this.sourTypeCount = response.rows[0].sourTypeCount;
        console.info(response.rows[0]);
        this.sourceList = response.rows;
        this.totalId = response.total || 0;
        this.queryParamsInner.receiveId = row.id;
        // this.loading = false
      });
    },

    // 备注点击弹框分页
    handleSourceFenye(row) {
      this.sourceOpen = true;
      const receiveId = this.receiveId;
      const pageNum = this.queryParamsInner.pageNum;
      const pageSize = this.queryParamsInner.pageSize;
      listChannelCompanyType({
        receiveId: receiveId,
        pageSize: pageSize,
        pageNum: pageNum
      }).then(response => {
        this.sourTypeCount = response.rows[0].sourTypeCount;
        console.info(response.rows[0]);
        this.sourceList = response.rows;
        this.totalId = response.total || 0;
        this.queryParamsInner.receiveId = row.id;
        // this.loading = false
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.followsOpen = false;
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        agentState: null,
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
        receiveTime: null,
        nickName: null,
        county: null,
        contactsIdcard: null,
        principalPhone: null,
        principal: null,
        createBy: null,
        bcfollowTime: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        customerSource: null,
        expendAmount: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    //  资源用户搜索按钮操作
    channelQuery() {
      listChannelCompanyfinAll(this.queryParamsInner).then(response => {
        this.sourceList = response.rows;
        this.totalId = response.total;

        this.loading = false;
      });
    },
    bfCloseFun: function(done) {
      this.resetForm("queryFormInner");
      this.sourceList = [];
      done();
    },
    resetChQuery: function() {
      this.resetForm("queryFormInner");
      this.channelQuery();
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
    // 远程搜索
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
          getChannelCompanyList({ companyName: query })
            .then(res => {
              // console.log(res)
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

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加合作商信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getChannelCompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合作商信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChannelCompany(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addChannelCompany(this.form).then(response => {
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
        '是否确认删除合作商信息编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delChannelCompany(ids);
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
      this.$confirm("是否确认导出所有合作商信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportChannelCompany(queryParams);
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

.follow-box {
  display: flex;
  flex-direction: column;
  padding: 12px 12px;
  border-radius: 8px;
  box-shadow: 0 0 15px 3px rgba(24, 60, 150, 0.1) !important;
  margin-bottom: 10px;
}

.follow-box > div:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.follow-box > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  margin-top: 8px;
}

.follow-box > div:nth-child(2) > .content {
  border: 1px #eee solid;
  border-radius: 5px;
  padding: 8px;
  margin: 5px 0 5px 0;
}

.follow-box > div:nth-child(2) > .time {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
