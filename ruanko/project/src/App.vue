<template>
  
  <div id="app">
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
              
              <el-button type="text" @click="toOrder">我的订单</el-button>
              <el-button v-if="!this.$isLogin" type="text" @click="toLogin">登录 | 注册</el-button>
              <el-button v-if="this.$isLogin" type="text" @click="toLogin" >我 的</el-button>
               

              <!-- <router-link to="/login">登录/注册</router-link> -->
              <el-button type="success" round @click="toRegistShop">我要开店</el-button>
            </div>
      </el-header>
      <el-main style="height:600px">
        <router-view></router-view>
      </el-main>
      <foot></foot>
    </el-container>    
  </div>  
  
</template>

<script>
import router from "./router";
import foot from '@/components/foot'
export default {
  name: "App",
  components:{
    foot,
  },
  created() {
    // this.route.push('/mainIndex');
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
      
      // 搜索块
      searchInput: "",

     
    };
  },
  methods: {
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
    isLogin() {
      console.log(this.$isLogin);
      if (this.$isLogin) {
        router.push("/home");
      }else{
        router.push('/login');
      }
    },
    orderManagement() {
      console.log(333);
      this.isLogin();
      console.log(111);
    },
    toLogin(){
      router.push('/login');
    },
    toOrder(){
      router.push('/order');
    },
    toRegistShop(){
      router.push('/shopRegist');
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
.el-button--text {
  color: #fff;
}
.el-header,
.el-footer {
  background-color: #409eff;
  color: rgb(251, 251, 251);
  text-align: center;
  line-height: 60px;
}
.el-footer p{
  line-height: 25px;
}
.el-footer {
  background-color: #fff;
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
}
#logo > img {
  width: 60px;
  height: 60px;
}
#logo > span {
  font-weight: 1000;
}

/* 搜索块 */
#search {
  float: left;
  margin-left: 500px;
}

/* 登录注册块 */
#login {
  float: right;
}
</style>
