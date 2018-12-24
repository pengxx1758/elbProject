<template>
  <div class="bg">
    <div id="loginBlock">
      <span class="title">欢迎，请登录</span>
      <!-- <h1>{{isLogin}}</h1> -->
      <el-tabs v-model="loginActiveName" @tab-click="handleClick">
        <el-tab-pane label="手机登录" name="tel">
          <el-form
            :model="loginTelForm"
            ref="loginTelForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
            ref="tell"
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
            >
              <el-input type="text" v-model="loginTelForm.checkNumber">
                <el-button ref="check" slot="append" @click="getCheckNum(loginTelForm.tell)">获取验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="toReigster">注 册</el-button>
              <el-button type="primary" @click="telLoginSubmitForm('loginTelForm',loginTelForm)">登 录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="账号登录" name="account">
          <el-form
            :model="loginRuleForm"
            :rules="loginRules"
            ref="loginRuleForm"
            label-width="100px"
          >
            <el-form-item label="账 号" prop="username">
              <el-input v-model="loginRuleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
              <el-input type="password" v-model="loginRuleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录角色" prop="role">
              <el-radio-group v-model="loginRoleRadio">
                <el-radio :label="0">用户</el-radio>
                <el-radio :label="1">商家</el-radio>
                <el-radio :label="2">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="toReigster">注 册</el-button>
              <el-button
                type="primary"
                @click="loginSubmitForm('loginRuleForm',loginRuleForm,loginRoleRadio)"
              >登 录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import foot from "@/components/foot";
import router from "../../router";
import { mapState, mapMutations } from "vuex";
export default {
  name: "login",
  components: { foot },
  computed: {
    ...mapState({
      isLogin: state => {
        return state.customer.isLogin;
      }
    })
  },
  data() {
    return {
      // 登录表单
      loginActiveName: "tel",
      checkSendFlag: false,
      loginRoleRadio: 0,
      loginTelForm: {
        tell: "",
        checkNumber: ""
      },
      loginRuleForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名应为 6 到 15 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码应为 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      },

      // 手机验证倒数定时器
      timer: null,
      // 秒数
      second: 30,

      // 用户输入的手机和收到的验证码
      acceptTelephone: 0,
      VerificationCode: 0
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  computed: {},
  methods: {
    ...mapMutations(["loginIn"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    telLoginSubmitForm(formName, data) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // 请求登录.....
          if(data.checkNumber != ''){
            if(data.checkNumber == this.VerificationCode && data.tell == this.acceptTelephone){
              let url = "/idea/loginByTel";
              this.$http.get(url,{
                params:{
                  tel: data.tell
                }
              })
              .then(res => {
                console.log(res);
                if(res.data.tag){
                  this.$message({
                    type: 'success',
                    message: '登录成功'
                  })
                  // vuex保存信息
                  this.$session.setItem('loginRole','0');
                  this.$session.setItem('uid',1); // 未完成
                  router.push('/mainIndex');
                }else{
                  this.$message({
                    type: 'warning',
                    message: '该手机号码未曾注册，请进行注册'
                  })
                  router.push('/regist');
                }
              })
            }else{
              this.$message.error('手机或验证码错误');
            }
          }else{
            this.$message.error('请输入验证码');
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginSubmitForm(formName, data, role) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // data["role"] = role;
          console.log(data);
          // console.log(this.$isLogin);
          // alert("submit!");
          // 请求登录.....
          let url = "";
          if(role == '0'){
url = "/idea/login"
          }else if(role == '1'){
            url = "/idea/MerchantLogin";
          }else{
            url = "/idea/managerLogin";
          }

          this.$http
            .get(url, {
              params: {
                username: data.username,
                password: data.password,
                role: role
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.status == "0") {
                this.$message({
                  type: "success",
                  message: res.data.message
                });
                //  此处应用vuex 进行全局保存
                this.loginIn();
                this.$session.set("isLogin",true);
                if(role == '0'){
                  this.$session.set("loginRole",'0');
                  this.$session.set("uid",res.data.record.id);
                  this.$session.set("username",res.data.record.username);
                  router.push('/mainIndex');
                }else if(role == '1'){
                  this.$session.set('loginRole','1');
                  this.$session.set('mid',res.data.record.id); // 未完成
                  router.push('/mainIndex');
                }else{
                  this.$session.set('loginRole','2');  
                  this.$session.set('aid',res.data.manager.id) 
                  this.$session.set('manager',res.data.manager.username); 
                  router.push('/manager');
                }

              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
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
          this.checkSendFlag = false;
        }
        console.log(this.checkSendFlag);
        return this.checkSendFlag;
      });
    },
    getCheckNum(telNum) {
      console.log(telNum);
      this.checkSendTel("loginTelForm");
      if (this.checkSendFlag) {
        var checkElement = event.target;
        checkElement.innerText = "再次发送(" + this.second + "秒)";
        this.$refs.check.disabled = "disabled";
        this.checkSendFlag = false;
        this.timer = setInterval(_ => {
          if (this.second < 1) {
            // that.timer;
            clearInterval(this.timer);
            this.timer = null;
            this.$refs.check.disabled = "";
            checkElement.innerText = "获得验证码";
            this.second = 30;
          } else {
            this.second--;
            checkElement.innerText = "再次发送(" + this.second + "秒)";
          }
        }, 1000);
        let url = "/idea/registerByTel";
        this.$http
          .get(url, {
            params: {
              tel: telNum
            }
          })
          .then(res => {
            console.log(res);
            this.VerificationCode = res.data.VerificationCode;
            this.acceptTelephone = res.data.tel;
          });

        // :rules="[
        //   { required: true, message: '验证码不能为空'},
        // ]"
        //调用短信验证API
        // let url = "/idea/registerByTel";
        // this.$http
        //   .get(url, {
        //     params: {
        //       tel: telNum
        //     }
        //   })
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      }
    },
    toReigster() {
      router.push("/regist");
    }
  }
};
</script>

<style >
.bg {
  width: 100%;
  height: 600px;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;
}
#loginBlock {
  float: right;
  width: 350px;
  margin: 100px 100px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  /* background-color: red; */
}
#loginBlock .title {
  font-size: 18px;
  font-weight: 700;
}
.el-form-item__label {
  text-align: left;
}
</style>