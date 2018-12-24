<template>
  <div id="app">
    <el-container>
      <el-header>
        <div id="logo">
          <!-- <img src="./assets/logo.png" alt="商标"> -->
          <span @click="toIndex">
            <img src=".\assets\logo.png" alt="商标">饿了吧
          </span>
          <span class="index" @click="toIndex">首页</span>
        </div>
        <div id="search">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
        </div>
        <div class="location">
          <i class="el-icon-location-outline"></i> {{location}}
        </div>
        <div id="login" style="float:right;">
          <div v-if="this.loginRole == '0'">
            <el-dropdown @command="handleCommand">  
              <span class="el-dropdown-link">
                我的信息
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="/profile/order">我的订单</el-dropdown-item>
                <el-dropdown-item command="/profile/favor">收藏中心</el-dropdown-item>
                <el-dropdown-item command="/profile/address">地址管理</el-dropdown-item>
                <!-- <el-dropdown-item v-if="isLogin" command="" @click="loginOut">退出登录</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button v-if="this.$isLogin" type="text" @click="toOrder">我的订单</el-button> -->
            <el-button v-if="!isLogin" type="text" @click="toLogin">登录 | 注册</el-button>
            <el-button v-if="isLogin" type="text" @click="Out">登出</el-button>
            <!-- <el-button v-if="this.$isLogin" type="text" @click="toLogin">我 的</el-button> -->
            <!-- <router-link to="/login">登录/注册</router-link> -->
            <el-button type="success" round @click="toRegistShop">我要开店</el-button>
          </div>
          <div v-else-if="this.loginRole == '1'">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                我的店铺
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/merchant">店铺中心</el-dropdown-item>
                <el-dropdown-item command="/merchant/merchant_info">我的商品</el-dropdown-item>
                <el-dropdown-item command="/merchant/merchant_order">我的订单</el-dropdown-item>
                <!-- <el-dropdown-item v-if="isLogin" command="" @click="loginOut">退出登录</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if="!isLogin" type="text" @click="toLogin">登录 | 注册</el-button>
            <el-button v-if="isLogin" type="text" @click="Out">登出</el-button>
          </div>
          <div v-else-if="this.loginRole == '2'">
            你好，管理员 {{this.$session.get('manager')}} &nbsp;&nbsp;
            <el-button v-if="isLogin" type="text" @click="Out">登出</el-button>
          </div>
          <div v-else>
            <el-button v-if="!isLogin" type="text" @click="toLogin">登录 | 注册</el-button>
            <el-button v-if="isLogin" type="text" @click="Out">登出</el-button>
            <el-button type="success" round @click="toRegistShop">我要开店</el-button>
          </div>
        </div>
      </el-header>

      <el-main style="height:100%;min-height:600px;">
        <router-view></router-view>
      </el-main>

      <foot></foot>
    </el-container>
  </div>
</template>

<script>
import router from "./router";
import foot from "@/components/foot";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    foot
  },
  computed: {
    // ...mapState({
    //   isLogin: state => {
    //     return state.customer.isLogin;
    //   }
    // })
    // loginRole: function() {
    //   return this.getLoginRole();
    // }
    // isLogin(){
    //   return this.$session.isLogin;
    // }
  },
  mounted() {
    // console.log(this.$session.isLogin);
    this.isLogin = this.$session.get("isLogin");
    // console.log(this.isLogin);
  },
  created() {
    this.getLocation();
    // console.log('created');
    this.loginRole = this.$session.get("loginRole");
  },
  beforeUpdate() {
    // console.log('beforeupdate');
    this.isLogin = this.$session.get("isLogin");
    this.loginRole = this.$session.get("loginRole");
  },
  updated() {
    // console.log("updated");
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerRuleForm.checkPass !== "") {
          this.$refs.registerRuleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerRuleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 菜单默认项
      activeIndex: "/mainIndex",
      // 登录弹框
      loginRole: "",
      // 搜索块
      searchInput: "",
      // 当前所在市级单位
      location: '',
      //
      isLogin: false
    };
  },
  methods: {
    ...mapMutations(["loginIn", "loginOut"]),

    getLocation() {
      var _this = this;
      function myFun(result) {
        var cityName = result.name;
        // alert("当前定位城市:" + cityName);
        _this.location = cityName;
      }
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
    },
    // getLoginRole() {
    //   if(this.$session.getItem('loginRole') != null){
    //     return this.$session.getItem('loginRole');
    //   }
    //   return '';
    // },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 下拉菜单 route
    handleCommand(command) {
      // this.$message("click on item " + command);
      router.push(command);
    },
    telLoginSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // 请求登录.....
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginSubmitForm(formName, data, sole) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          data["sole"] = sole;
          alert("submit!");
          // 请求登录.....
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    registerSubmitForm(formName, data, sole) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(data);
          alert("submit!");
          if (sole == 1) {
            // 普通用户注册
            // let url = this.HOST + '/register'
            // this.$http.post(url,data)
            // .then(res => {
            //   console.log(res);
            // })
            // .catch(error => {
            //   console.log(error);
            // })
          } else {
            // 店铺注册
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkSendTel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.checkSendFlag = !this.checkSendFlag;
        } else {
          console.log("error send telephone!");
          this.checkSendFlag = !this.checkSendFlag;
        }
      });
    },
    getCheckNum(telNum) {
      if (this.checkSendTel("loginTelForm")) {
        console.log(telNum);
        //调用短信验证API
      }
    },
    // isLogin() {
    //   console.log(this.$isLogin);
    //   if (this.$isLogin) {
    //     router.push("/home");
    //   } else {
    //     router.push("/login");
    //   }
    // },
    Out() {
      // console.log('111');
      // this.loginOut();
      this.$session.clear();
      console.log(444);
      router.push("/login");
      this.$message({
        type: "info",
        message: "登出成功，欢迎下次登录"
      });
    },
    orderManagement() {
      console.log(333);
      // this.isLogin();
      console.log(111);
    },
    toLogin() {
      router.push("/login");
    },
    toOrder() {
      router.push("/order");
    },
    toRegistShop() {
      router.push("/shopRegist");
    },
    toIndex() {
      router.push("/mainIndex/index_content");
    },
    clearSession() {
      this.$session.set("isLogin", false);
      this.$session.set("loginRole", null);
      this.$session.set("uid", null);
      this.$session.set("username", null);
      this.$session.set("mid", null);
      this.$session.set("aid", null);
      this.$session.set("manager", null);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #f3f7fa; */
  /* margin-top: 60px; */
}

body {
  margin: 0;
}

.el-button--text {
  color: #fff;
}
.el-dropdown {
  color: #fff;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  line-height: 35px;
}

.el-header,
.el-footer {
  background-color: #409eff;
  color: rgb(251, 251, 251);
  text-align: center;
  line-height: 60px;
}
.el-footer p {
  padding: 0;
  margin: 0;
  line-height: 25px;
}
.el-footer {
  height: 100%;
  background-color: rgb(224, 220, 220);
  color: #333;
  font-size: 12px;
}

.el-footer .el-button--text {
  color: #333;
  font-size: 12px;
  padding: 0 7px;
}
.el-footer .el-button--text + .el-button--text {
  margin-left: 0;
  border-left: 1px solid #ccc;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0;

  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/* 商标块 */
#logo {
  float: left;
  height: 60px;
}
#logo img {
  display: inline-block;
  width: 60px;
  height: 60px;
  vertical-align: top;
}
#logo > span {
  vertical-align: middle;
  font-size: 30px;
  line-height: 60px;
  font-weight: 1000;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 3px;
}
#logo > .index {
  margin-left: 20px;
  font-weight: normal;
  font-size: 20px;
  padding: 0 30px;
}
#logo > .index:hover {
  background-color: #006bc7;
}
.location {
  margin-left: 20px;
  float: left;
}
/* 搜索块 */
#search {
  margin-left: 200px;
  float: left;
}

/* 登录注册块 */
#login {
  float: right;
}
</style>
