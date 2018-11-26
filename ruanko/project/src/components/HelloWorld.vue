<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-container>
      <el-header>
          <div id="logo">
            <!-- <img src="./assets/logo.png" alt="商标"> -->
            <span>饿了吧</span>
          </div>
          <div id="search">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchInput"
              >
            </el-input>
          </div>
          <div id="login" style="float:right;">
            
            <el-button type="text" @click="orderManagement">我的订单</el-button>
            <el-button type="text" @click="loginDialogVisible = true">登录 | 注册</el-button>
            <el-button type="success" round @click="shopRegisterDialogVisible=true">我要开店</el-button>
          </div>

          <!-- 登录弹出框开始 -->
          <el-dialog
              title="登录界面"
              :visible.sync="loginDialogVisible"
              width="40%"
              :before-close="handleClose">
              <el-tabs v-model="loginActiveName" @tab-click="handleClick">
                <el-tab-pane label="手机登录" name="tel">
                  <el-form :model="loginTelForm" ref="loginTelForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item
                      label="手机号"
                      prop="tell"
                      :rules="[
                        { required: true, message: '手机号不能为空'},
                        { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机格式'}
                      ]"
                    >
                      <el-input type="text" v-model="loginTelForm.tell"></el-input>
                    </el-form-item>
                    <el-form-item 
                      label="验证码"
                      prop="checkNumber"
                      :rules="[
                        { required: true, message: '验证码不能为空'},
                      ]">
                        <el-input type="text" v-model="loginTelForm.checkNumber">
                          <el-button slot="append" @click="getCheckNum(loginTelForm.tel)">获取验证码</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="registerDialogVisible=true,loginDialogVisible=false">注 册</el-button>
                      <el-button type="primary" @click="telLoginSubmitForm('loginTelForm')">登 录</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                
                <el-tab-pane label="账号登录" name="account">
                  <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRuleForm" label-width="100px">
                    <el-form-item label="账 号" prop="username">
                      <el-input v-model="loginRuleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码" prop="password">
                      <el-input type="password" v-model="loginRuleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录角色" prop="sole">
                      <el-radio-group v-model="loginSoleRadio">
                        <el-radio :label="0">用户</el-radio>
                        <el-radio :label="1">商家</el-radio>
                        <el-radio :label="2">管理员</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="registerDialogVisible=true,loginDialogVisible=false">注 册</el-button>
                      <el-button type="primary" @click="loginSubmitForm('loginRuleForm',loginRuleForm,loginSoleRadio)">登 录</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>  
              
          </el-dialog>
          <!-- 登录弹出框结束 -->
          <!-- 用户注册弹出框开始 -->
          <el-dialog
              title="用户注册界面"
              :visible.sync="registerDialogVisible"
              width="40%"
              :before-close="handleClose">
              <el-form :model="registerRuleForm" :rules="registerRules" ref="registerRuleForm" label-width="100px">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="registerRuleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="registerRuleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="registerRuleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tell">
                  <el-input type="text" v-model="registerRuleForm.tell"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="registerDialogVisible=false,loginDialogVisible=true">返 回</el-button>
                <el-button type="primary" @click="registerSubmitForm('registerRuleForm',registerRuleForm,1)">注 册</el-button>
              </span>
          </el-dialog>
          <!-- 用户注册弹出框结束 -->

          <!-- 店家注册弹出框开始 -->
          <el-dialog
              title="店家注册界面"
              :visible.sync="shopRegisterDialogVisible"
              width="40%"
              :before-close="handleClose">
              <el-form :model="registerRuleForm" :rules="registerRules" ref="registerRuleForm" label-width="100px">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="registerRuleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="registerRuleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="registerRuleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店铺类别" prop="shopType">
                  <el-select v-model="registerRuleForm.shopType" placeholder="请选择">
                    <el-option
                      v-for="item in shopOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="tell">
                  <el-input type="text" v-model="registerRuleForm.tell"></el-input>
                </el-form-item>
                
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="shopRegisterDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="registerSubmitForm('registerRuleForm',registerRuleForm,1)">审 核</el-button>
              </span>
          </el-dialog>
          <!-- 店家注册弹出框结束 -->
      </el-header>
      <el-container>
        <el-aside>
          <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
            <el-menu-item index="/mainIndex">首页</el-menu-item>
            <el-menu-item index="">美食</el-menu-item>
            <el-menu-item index="">便利</el-menu-item>
            <el-menu-item index="">水果</el-menu-item>
            <el-menu-item index="">药品</el-menu-item>
            <el-menu-item index="">甜食饮品</el-menu-item>
          </el-menu>
        </el-aside> 
        <el-main style="height:600px">
          <router-view/>  
        </el-main>
      </el-container> 
      <el-footer>
        <p>
          <el-button type="text">联系我们</el-button>
          <el-button type="text">服务条款和协议</el-button>
          <el-button type="text">隐私条款</el-button>
          <el-button type="text">营业执照</el-button>
          <el-button type="text">关于我们</el-button>
          <el-button type="text">常见问题</el-button>
          <el-button type="text">加入我们</el-button>
        </p>
        <p>
          Copyright ©2008-2018 广东海洋大学313团队, All Rights Reserved.
        </p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import qs from "qs";
// import zizujian from "zizujian";
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    // 百度地图api调用 
    // myapi.getLocationByName('湛江','广东海洋大学');
    let url = '/mapapi/geocoder'
    this.$http.get(url,{
      params:{
        city: '湛江',
        address: '广东海洋大学',
        output: 'json',
        key: 'MPz0YWb32SRcAbWPGE5CI8TBIOwjtAFF',
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  },
  comments:{
    // zizujian
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
