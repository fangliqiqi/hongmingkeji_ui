<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="90px">
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择用户性别" clearable size="small">
          <el-option
            v-for="dict in sexOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="省" prop="prov">-->
<!--        <el-input-->
<!--          v-model="queryParams.prov"-->
<!--          placeholder="请输入省"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="市" prop="city">-->
<!--        <el-input-->
<!--          v-model="queryParams.city"-->
<!--          placeholder="请输入市"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="区县" prop="county">-->
<!--        <el-input-->
<!--          v-model="queryParams.county"-->
<!--          placeholder="请输入区县"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="帐号状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择帐号状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="最后登陆IP" prop="loginIp">-->
<!--        <el-input-->
<!--          v-model="queryParams.loginIp"-->
<!--          placeholder="请输入最后登陆IP"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="最后登陆时间" prop="loginDate">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.loginDate"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择最后登陆时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="公司表id" prop="companyId">-->
<!--        <el-input-->
<!--          v-model="queryParams.companyId"-->
<!--          placeholder="请输入公司表id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="会计表id" prop="accountingId">-->
<!--        <el-input-->
<!--          v-model="queryParams.accountingId"-->
<!--          placeholder="请输入会计表id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="0未绑定 1 绑定 2帐号密码 10分享" prop="wxFlag">-->
<!--        <el-select v-model="queryParams.wxFlag" placeholder="请选择0未绑定 1 绑定 2帐号密码 10分享" clearable size="small">-->
<!--          <el-option-->
<!--            v-for="dict in wxFlagOptions"-->
<!--            :key="dict.dictValue"-->
<!--            :label="dict.dictLabel"-->
<!--            :value="dict.dictValue"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="微信绑定 1 已绑定 0未绑定" prop="wxBind">-->
<!--        <el-select v-model="queryParams.wxBind" placeholder="请选择微信绑定 1 已绑定 0未绑定" clearable size="small">-->
<!--          <el-option-->
<!--            v-for="dict in wxBindOptions"-->
<!--            :key="dict.dictValue"-->
<!--            :label="dict.dictLabel"-->
<!--            :value="dict.dictValue"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="微信小程序openid" prop="openId">-->
<!--        <el-input-->
<!--          v-model="queryParams.openId"-->
<!--          placeholder="请输入微信小程序openid"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="推荐人user_id" prop="recommendId">-->
<!--        <el-input-->
<!--          v-model="queryParams.recommendId"-->
<!--          placeholder="请输入推荐人user_id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="用户类型" prop="userCompanyType">
        <el-select v-model="queryParams.userCompanyType" placeholder="请选择用户类型" clearable size="small">
          <el-option
            v-for="dict in userCompanyTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接收消息" prop="companyUserStatus">
        <el-select v-model="queryParams.companyUserStatus" placeholder="请选择是否接收消息" clearable size="small">
          <el-option
            v-for="dict in companyUserStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="店主身份" prop="relationId">-->
<!--         <el-select v-model="queryParams.relationId" placeholder="请选择是否为店主" clearable size="small">-->
<!--                    <el-option-->
<!--                      v-for="dict in relationIdOptions"-->
<!--                      :key="dict.dictValue"-->
<!--                      :label="dict.dictLabel"-->
<!--                      :value="dict.dictValue"-->
<!--                    ></el-option>-->
<!--                  </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="门店海报标识号" prop="posterId">-->
<!--        <el-input-->
<!--          v-model="queryParams.posterId"-->
<!--          placeholder="请输入门店海报标识号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否加盟商" prop="agentFlag">-->
<!--        <el-select v-model="queryParams.agentFlag" placeholder="请选择是否加盟商" clearable size="small">-->
<!--          <el-option-->
<!--            v-for="dict in agentFlagOptions"-->
<!--            :key="dict.dictValue"-->
<!--            :label="dict.dictLabel"-->
<!--            :value="dict.dictValue"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户等级" prop="vip">
       <el-select v-model="queryParams.vip" placeholder="请选择等级" clearable size="small">
                 <el-option-->
<!--                    v-for="dict in vipOptions"-->
<!--                    :key="dict.dictValue"-->
<!--                    :label="dict.dictLabel"-->
<!--                    :value="dict.dictValue"-->
<!--                  />-->
<!--                </el-select>-->
<!--      </el-form-item>-->
<!--     <el-form-item label="宣传业务类别 10广告位 20宣传册" prop="posterType">-->
<!--        <el-select v-model="queryParams.posterType" placeholder="请选择宣传业务类别 10广告位 20宣传册" clearable size="small">-->
<!--          <el-option-->
<!--            v-for="dict in posterTypeOptions"-->
<!--            :key="dict.dictValue"-->
<!--            :label="dict.dictLabel"-->
<!--            :value="dict.dictValue"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
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
          v-hasPermi="['share:companyUser:add']"
        >新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['share:companyUser:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['share:companyUser:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:companyUser:export']"
        >导出</el-button>
      </el-col>-->
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="companyUserList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" fixed="left"/>-->
<!--      <el-table-column label="用户ID" align="center" prop="userId" />-->
<!--      <el-table-column label="部门ID" align="center" prop="deptId" />-->
      <el-table-column label="用户昵称" align="center" prop="nickName" min-width="120"/>
      <el-table-column label="用户账号" align="center" prop="userName" min-width="120"/>
      <!--      <el-table-column label="用户类型" align="center" prop="userType" :formatter="userTypeFormat" />-->
<!--      <el-table-column label="用户邮箱" align="center" prop="email" />-->
      <el-table-column label="手机号码" align="center" prop="phonenumber" min-width="120"/>
      <el-table-column label="用户性别" align="center" prop="sex" :formatter="sexFormat" />
<!--      <el-table-column label="头像地址" align="center" prop="avatar" />-->
<!--      <el-table-column label="密码" align="center" prop="password" />-->
      <el-table-column label="省" align="center" prop="prov" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区县" align="center" prop="county" />
<!--      <el-table-column label="帐号状态" align="center" prop="status" :formatter="statusFormat" />-->
<!--      <el-table-column label="最后登陆IP" align="center" prop="loginIp" />-->
<!--      <el-table-column label="最后登陆时间" align="center" prop="loginDate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.loginDate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="公司表id" align="center" prop="companyId" />-->
<!--      <el-table-column label="会计表id" align="center" prop="accountingId" />-->
<!--      <el-table-column label="0未绑定 1 绑定 2帐号密码 10分享" align="center" prop="wxFlag" :formatter="wxFlagFormat" />-->
<!--      <el-table-column label="微信绑定 1 已绑定 0未绑定" align="center" prop="wxBind" :formatter="wxBindFormat" />-->
<!--      <el-table-column label="微信小程序openid" align="center" prop="openId" />-->
<!--      <el-table-column label="推荐人user_id" align="center" prop="recommendId" />-->
      <el-table-column label="用户类型" align="center" prop="userCompanyType" :formatter="userCompanyTypeFormat" />
      <el-table-column label="接收消息" align="center" prop="companyUserStatus" :formatter="companyUserStatusFormat"  >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateState(scope.row,scope.row.companyUserStatus)"
            v-hasPermi="['share:companyUser:edit']"
          >{{companyUserStatusFormat(scope.row,scope.row.companyUserStatus)}}</el-button>
        </template>
      </el-table-column>
<!--      <el-table-column label="是否为店主" align="center" prop="relationId" :formatter="relationIdFormat" min-width="120"/>-->
<!--      <el-table-column label="门店海报标识号" align="center" prop="posterId" />-->
      <el-table-column label="是否合作商" align="center" prop="agentFlag" :formatter="agentFlagFormat" min-width="120"/>
       <el-table-column label="客户等级" align="center" prop="vip" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.vip==1?'VIP用户':'普通用户' }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="客户等级" align="center" prop="vip" :formatter="vipFormat" min-width="120"/>-->
<!--      <el-table-column label="宣传业务类别 10广告位 20宣传册" align="center" prop="posterType" :formatter="posterTypeFormat" />
      <el-table-column label="备注" align="center" prop="remark" min-width="320"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="220" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:companyUser:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:companyUser:remove']"
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="部门ID" prop="deptId">-->
<!--          <el-input v-model="form.deptId" placeholder="请输入部门ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="手机号码" prop="userName">-->
<!--          <el-input v-model="form.userName" placeholder="请输入手机号码" maxlength="11" />-->
<!--        </el-form-item>-->
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" :disabled="!!form.userId&&userInfo.userCompanyType!=10"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
<!--        <el-form-item label="用户类型">-->
<!--          <el-select v-model="form.userType" placeholder="请选择用户类型">-->
<!--            <el-option-->
<!--              v-for="dict in userTypeOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <!--        <el-form-item label="用户邮箱" prop="email">-->
        <!--          <el-input v-model="form.email" placeholder="请输入用户邮箱" />-->
        <!--        </el-form-item>-->
        <el-form-item label="用户性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择用户性别">
            <el-option
              v-for="dict in sexOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="头像地址" prop="avatar">-->
<!--          <el-input v-model="form.avatar" type="textarea" placeholder="请输入内容" />-->
<!--        </el-form-item>-->
        <el-form-item label="密码" >
          <el-input disabled placeholder="请输入密码" value="123456"/>
        </el-form-item>
<!--        <el-form-item label="省" prop="prov">-->
<!--          <el-input v-model="form.prov" placeholder="请输入省" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="市" prop="city">-->
<!--          <el-input v-model="form.city" placeholder="请输入市" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="区县" prop="county">-->
<!--          <el-input v-model="form.county" placeholder="请输入区县" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="帐号状态" >-->
<!--          <el-select v-model="form.status" placeholder="请选择帐号状态">-->
<!--            <el-option-->
<!--              v-for="dict in statusOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="删除标志" prop="delFlag">-->
<!--          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="最后登陆IP" prop="loginIp">-->
<!--          <el-input v-model="form.loginIp" placeholder="请输入最后登陆IP" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="最后登陆时间" prop="loginDate">-->
<!--          <el-date-picker clearable size="small" style="width: 200px"-->
<!--            v-model="form.loginDate"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择最后登陆时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="公司表id" prop="companyId">-->
<!--          <el-input v-model="form.companyId" placeholder="请输入公司表id" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会计表id" prop="accountingId">-->
<!--          <el-input v-model="form.accountingId" placeholder="请输入会计表id" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="0未绑定 1 绑定 2帐号密码 10分享">-->
<!--          <el-select v-model="form.wxFlag" placeholder="请选择0未绑定 1 绑定 2帐号密码 10分享">-->
<!--            <el-option-->
<!--              v-for="dict in wxFlagOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="微信绑定 1 已绑定 0未绑定">-->
<!--          <el-select v-model="form.wxBind" placeholder="请选择微信绑定 1 已绑定 0未绑定">-->
<!--            <el-option-->
<!--              v-for="dict in wxBindOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="微信小程序openid" prop="openId">-->
<!--          <el-input v-model="form.openId" placeholder="请输入微信小程序openid" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="推荐人user_id" prop="recommendId">-->
<!--          <el-input v-model="form.recommendId" placeholder="请输入推荐人user_id" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户类型">-->
<!--          <el-select v-model="form.userCompanyType" placeholder="请选择用户类型">-->
<!--            <el-option-->
<!--              v-for="dict in userCompanyTypeOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <!--<el-form-item label="接收消息" v-if="form.userId">
          <el-select v-model="form.companyUserStatus" placeholder="请选择用户是否接收消息">
            <el-option
              v-for="dict in companyUserStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>-->
<!--        <el-form-item label="店主身份识别号 10是 20不是">-->
<!--          <el-select v-model="form.relationId" placeholder="请选择店主身份识别号 10是 20不是">-->
<!--            <el-option label="请选择字典生成" value="" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="门店海报标识号" prop="posterId">-->
<!--          <el-input v-model="form.posterId" placeholder="请输入门店海报标识号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="是否是加盟商 10是 0不是">-->
<!--          <el-select v-model="form.agentFlag" placeholder="请选择是否是加盟商 10是 0不是">-->
<!--            <el-option-->
<!--              v-for="dict in agentFlagOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户等级0默认 1VIP" prop="vip">-->
<!--          <el-input v-model="form.vip" placeholder="请输入客户等级0默认 1VIP" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="宣传业务类别 10广告位 20宣传册">-->
<!--          <el-select v-model="form.posterType" placeholder="请选择宣传业务类别 10广告位 20宣传册">-->
<!--            <el-option-->
<!--              v-for="dict in posterTypeOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCompanyUser, 
          getCompanyUser, 
          delCompanyUser, 
          addCompanyUser, 
          updateCompanyUser, 
          exportCompanyUser } from "@/api/share/companyUser";

export default {
  name: "CompanyUser",
  data() {
    return {
      userInfo:this.$store.state.user,
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
      // 用户信息表格数据
      companyUserList: [],
      // 店主身份识别号 10是 20不是字典
      relationIdOptions: [],
      // 客户等级0默认 1VIP字典
      vipOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 用户类型字典
      userTypeOptions: [],
      // 用户性别字典
      sexOptions: [],
      // 帐号状态字典
      statusOptions: [],
      // 删除标志字典
      delFlagOptions: [],
      // 0未绑定 1 绑定 2帐号密码 10分享字典
      wxFlagOptions: [],
      // 微信绑定 1 已绑定 0未绑定字典
      wxBindOptions: [],
      // 公司用户是否接收消息  10正常 20停用字典
      companyUserStatusOptions: [],
      // 公司用户类型标识 10负责任 20法人 30业务员字典
      userCompanyTypeOptions: [],
      // 是否是加盟商 10是 0不是字典
      agentFlagOptions: [],
      // 宣传业务类别 10广告位 20宣传册字典
      posterTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:10,
        deptId: null,
        userName: null,
        nickName: null,
        userType: null,
        email: null,
        phonenumber: null,
        sex: null,
        avatar: null,
        password: null,
        prov: null,
        city: null,
        county: null,
        status: null,
        loginIp: null,
        loginDate: null,
        companyId: null,
        accountingId: null,
        wxFlag: null,
        wxBind: null,
        openId: null,
        recommendId: null,
        userCompanyType: null,
        companyUserStatus: null,
        relationId: null,
        posterId: null,
        agentFlag: null,
        vip: null,
        posterType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        phonenumber:[
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
        sex:[
          { required: true, message: "请选择用户性别", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_user_type").then(response => {
      this.userTypeOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
    this.getDicts("sys_user_state").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_state").then(response => {
      this.delFlagOptions = response.data;
    });
    this.getDicts("user_relation_id").then(response => {
      this.relationIdOptions = response.data;
    });
    this.getDicts("sys_user_vip").then(response => {
      this.vipOptions = response.data;
    });
    this.getDicts("wx_state").then(response => {
      this.wxFlagOptions = response.data;
    });
    this.getDicts("wx_state").then(response => {
      this.wxBindOptions = response.data;
    });
    this.getDicts("company_user_status").then(response => {
      this.companyUserStatusOptions = response.data;
    });
    this.getDicts("user_company_type").then(response => {
      this.userCompanyTypeOptions = response.data;
    });


    this.getDicts("invoic_flag").then(response => {
      this.agentFlagOptions = response.data;
    });
    this.getDicts("poster_type").then(response => {
      this.posterTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询用户信息列表 */
    getList() {
      this.loading = true;
      listCompanyUser(this.queryParams).then(response => {
        this.companyUserList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
   // 店主身份识别号 10是 20不是字典翻译
    relationIdFormat(row, column) {
      return this.selectDictLabel(this.relationIdOptions, row.relationId);
    },
    // 客户等级0默认 1VIP字典翻译
    vipFormat(row, column) {
      return this.selectDictLabel(this.vipOptions, row.vip);
    },
    // 用户类型字典翻译
    userTypeFormat(row, column) {
      return this.selectDictLabel(this.userTypeOptions, row.userType);
    },
    // 用户性别字典翻译
    sexFormat(row, column) {
      return this.selectDictLabel(this.sexOptions, row.sex);
    },
    // 帐号状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 删除标志字典翻译
    delFlagFormat(row, column) {
      return this.selectDictLabel(this.delFlagOptions, row.delFlag);
    },
    // 0未绑定 1 绑定 2帐号密码 10分享字典翻译
    wxFlagFormat(row, column) {
      return this.selectDictLabel(this.wxFlagOptions, row.wxFlag);
    },
    // 微信绑定 1 已绑定 0未绑定字典翻译
    wxBindFormat(row, column) {
      return this.selectDictLabel(this.wxBindOptions, row.wxBind);
    },
    // 公司用户是否接收消息  10正常 20停用字典翻译
    companyUserStatusFormat(row, column) {
      return this.selectDictLabel(this.companyUserStatusOptions, row.companyUserStatus);
    },
    // 公司用户类型标识 10负责任 20法人 30业务员字典翻译
    userCompanyTypeFormat(row, column) {
      return this.selectDictLabel(this.userCompanyTypeOptions, row.userCompanyType);
    },
    // 是否是加盟商 10是 0不是字典翻译
    agentFlagFormat(row, column) {
      return this.selectDictLabel(this.agentFlagOptions, row.agentFlag);
    },
    // 宣传业务类别 10广告位 20宣传册字典翻译
    posterTypeFormat(row, column) {
      return this.selectDictLabel(this.posterTypeOptions, row.posterType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: null,
        deptId: null,
        userName: null,
        nickName: null,
        userType: null,
        email: null,
        phonenumber: null,
        sex: null,
        avatar: null,
        password: null,
        prov: null,
        city: null,
        county: null,
        status: null,
        delFlag: null,
        loginIp: null,
        loginDate: null,
        companyId: null,
        accountingId: null,
        wxFlag: null,
        wxBind: null,
        openId: null,
        recommendId: null,
        userCompanyType: null,
        companyUserStatus: null,
        relationId: null,
        posterId: null,
        agentFlag: null,
        vip: null,
        posterType: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
      this.ids = selection.map(item => item.userId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids
      getCompanyUser(userId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },
    handleUpdateState(row) {
      let data = {
        userId:row.userId,
        companyUserStatus:row.companyUserStatus==10?20:10
      }
      this.$confirm('是否确认"' + (row.companyUserStatus==10?'停止':'打开') + '"接收消息?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return updateCompanyUser(data);
      }).then(() => {
        this.msgSuccess("修改成功");
        this.getList();
      }).catch(function() {});
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let form = this.form;
          if (this.form.userId != null) {
            let data = {
              userId:form.userId,
              userCompanyType : form.userCompanyType,
              nickName:form.nickName,
              phonenumber:form.phonenumber,
              sex:form.sex,
              companyUserStatus:form.companyUserStatus
            }
            updateCompanyUser(data).then(response => {
              if (response.code == 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            let data = {
              userCompanyType : '30',
              nickName:form.nickName,
              phonenumber:form.phonenumber,
              sex:form.sex
            }

            addCompanyUser(data).then(response => {
              if (response.code == 200) {
                this.msgSuccess(response.msg?response.msg:"新增成功");
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
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除用户信息编号为"' + userIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCompanyUser(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCompanyUser(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
